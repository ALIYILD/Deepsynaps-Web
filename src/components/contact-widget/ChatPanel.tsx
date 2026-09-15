/**
 * The chat tab: a transcript, an input, and a permanent way to reach a person.
 *
 * THE HANDOFF IS PERSISTENT, NOT CONDITIONAL. Once there is any answer at all,
 * "Send this to Dr. Ali" stays on screen. It is not shown only when the
 * assistant fails, because the visitor who most wants a human is often the one
 * who got a perfectly good answer and now has a real question about their own
 * clinic — and making them hunt for the exit is how a lead is lost.
 *
 * The assistant's failure is still marked: a `needs_human` turn nudges the same
 * button rather than introducing a second one.
 */
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { Loader2, Send, UserRound } from 'lucide-react';
import type { ChatTurn } from './types';
import { ERROR_COPY, FALLBACK_ERROR } from './types';
import { ask, type SiteId } from './api';
import { CONTACT } from '@/config/contact';

interface ChatPanelProps {
  site: SiteId;
  history: ChatTurn[];
  onHistoryChange: (history: ChatTurn[]) => void;
  onHandoff: () => void;
}

const GREETING: Record<SiteId, string> = {
  web: `Hello — I am the DeepSynaps website assistant. Ask me about the services, the OS, the Lab or the Academy, and I can pass a message to ${CONTACT.founder} whenever you want a person.`,
  academy: `Hello — I am the DeepSynaps Academy assistant. Ask me about formats, tracks or who the teaching is for, and I can put you on the notify list or pass a message to ${CONTACT.founder}.`,
  lab: `Hello — I am the DeepSynaps Lab assistant. Ask me about the HAC chips, the science behind them or the research programme, and I can pass a message to ${CONTACT.founder}.`,
};

export function ChatPanel({ site, history, onHistoryChange, onHandoff }: ChatPanelProps) {
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const hasAnswer = history.some((turn) => turn.role === 'assistant');
  const needsHuman = history[history.length - 1]?.needsHuman === true;

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [history, pending]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    const question = draft.trim();
    if (!question || pending) return;

    const withQuestion: ChatTurn[] = [...history, { role: 'user', content: question }];
    onHistoryChange(withQuestion);
    setDraft('');
    setPending(true);
    setError('');

    try {
      const outcome = await ask(site, question, history);
      if (outcome.ok) {
        onHistoryChange([
          ...withQuestion,
          {
            role: 'assistant',
            content: outcome.value.answer,
            needsHuman: outcome.value.state === 'needs_human',
          },
        ]);
      } else {
        setError(ERROR_COPY[outcome.code] ?? FALLBACK_ERROR);
      }
    } catch {
      setError(FALLBACK_ERROR);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  };

  // Enter sends, Shift+Enter breaks the line. A chat box that needs a mouse to
  // send is a chat box people abandon.
  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
        role="log"
        aria-live="polite"
        aria-label="Conversation"
      >
        <Bubble role="assistant">{GREETING[site]}</Bubble>
        {history.map((turn, index) => (
          <Bubble key={`${turn.role}-${index}`} role={turn.role}>
            {turn.content}
          </Bubble>
        ))}
        {pending && (
          <div className="flex items-center gap-2 text-[12px] text-ds-text-secondary px-1">
            <Loader2 size={13} className="animate-spin" />
            Thinking…
          </div>
        )}
        {error && (
          <div role="alert" className="text-[12px] text-red-200 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        <div ref={endRef} />
      </div>

      {hasAnswer && (
        <div className="px-4 pb-2">
          <button
            type="button"
            onClick={onHandoff}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12.5px] font-medium transition-colors ${
              needsHuman
                ? 'bg-ds-amber/20 border border-ds-amber/40 text-ds-amber hover:bg-ds-amber/30'
                : 'bg-white/[0.04] border border-white/10 text-ds-text-secondary hover:text-ds-text hover:border-white/20'
            }`}
          >
            <UserRound size={14} />
            Send this to {CONTACT.founder}
          </button>
        </div>
      )}

      <form onSubmit={submit} className="border-t border-white/8 px-3 py-3 flex items-end gap-2">
        <label htmlFor="cw-chat-input" className="sr-only">Your message</label>
        <textarea
          id="cw-chat-input"
          ref={inputRef}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          maxLength={1800}
          placeholder="Ask about services, tracks, research…"
          className="flex-1 resize-none max-h-24 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2 text-[13px] text-ds-text placeholder:text-ds-text-secondary/50 outline-none focus:border-ds-amber/50"
        />
        <button
          type="submit"
          disabled={pending || draft.trim().length === 0}
          aria-label="Send message"
          className="w-9 h-9 flex-shrink-0 rounded-lg bg-ds-amber text-[#050A14] flex items-center justify-center transition-opacity disabled:opacity-35 disabled:cursor-not-allowed hover:opacity-90"
        >
          <Send size={15} />
        </button>
      </form>

      <p className="px-4 pb-3 text-[10.5px] text-ds-text-secondary/60 text-center leading-relaxed">
        Powered by the DeepSynaps assistant. Not a clinician — no medical advice.
      </p>
    </div>
  );
}

function Bubble({ role, children }: { role: 'user' | 'assistant'; children: React.ReactNode }) {
  const mine = role === 'user';
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-[1.6] whitespace-pre-wrap break-words ${
          mine
            ? 'bg-ds-amber/15 border border-ds-amber/25 text-ds-text rounded-br-sm'
            : 'bg-white/[0.05] border border-white/8 text-ds-text-secondary rounded-bl-sm'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
