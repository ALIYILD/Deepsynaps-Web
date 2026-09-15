/**
 * The DeepSynaps contact widget, for pages that are not the React app.
 *
 * WHY A SECOND IMPLEMENTATION. deepsynapsacademy.com and deepsynapslab.com are
 * single hand-written HTML files deployed to their own Netlify sites with no
 * build step at all. They cannot import the React component, and giving them a
 * build step to share one would be a far larger change than this file. So this
 * is the same widget, same three tabs, same request contract — and it is the
 * contract, not the code, that must stay in step with `src/components/`.
 *
 * WHERE IT TALKS. Always the absolute endpoint on deepsynaps.com, because the
 * two static sites have no functions of their own. That is a cross-origin call,
 * which is exactly why the function carries a closed CORS allow-list.
 *
 *   <script defer src="https://deepsynaps.com/contact-widget.js"
 *           data-site="academy" data-whatsapp="447429910079"
 *           data-phone="+447429910079" data-linkedin=""
 *           data-email="ali.yildirim@deepsynaps.com" data-prefill="Hi ..."></script>
 *
 * `data-linkedin` is optional and the LinkedIn link is rendered only when it
 * holds a URL, so an unset profile shows nothing rather than a dead link.
 *
 * `data-endpoint` overrides the function URL, so a preview of one of these
 * pages can be pointed at a preview function rather than the live one.
 */
(function () {
  'use strict';

  var DEFAULT_ENDPOINT = 'https://deepsynaps.com/.netlify/functions/deepy';
  var SESSION_KEY = 'deepsynaps.contact.session';
  var MOUNT_ID = 'ds-contact-widget';
  if (document.getElementById(MOUNT_ID)) return;

  /* ------------------------------------------------------------- config */

  var script = document.currentScript || document.querySelector('script[src*="contact-widget.js"]');
  function attr(name, fallback) {
    var value = script && script.getAttribute(name);
    return value && value.trim() ? value.trim() : fallback;
  }

  var SITE = attr('data-site', 'web');
  if (SITE !== 'web' && SITE !== 'academy' && SITE !== 'lab') SITE = 'web';

  /**
   * Where to send. Production is the function on deepsynaps.com, because these
   * pages have none of their own. `data-endpoint` overrides it so a PREVIEW of
   * the academy or lab page can be pointed at a preview function instead of
   * quietly exercising the live one — which is the only way to test a change to
   * both halves together before either is live.
   */
  var ENDPOINT = attr('data-endpoint', DEFAULT_ENDPOINT);

  /**
   * The call line. `data-phone` carries the dialable E.164 form; the pretty
   * form is only known for the default number, so a page that supplies its own
   * shows exactly what it supplied rather than a guessed grouping.
   */
  var DEFAULT_PHONE = '+447429910079';
  var PHONE = attr('data-phone', DEFAULT_PHONE);

  var CFG = {
    site: SITE,
    whatsapp: attr('data-whatsapp', '447429910079'),
    phone: PHONE,
    phoneDisplay: PHONE === DEFAULT_PHONE ? '+44 7429 910079' : PHONE,
    /** Empty by default: LinkedIn is shown only where a page supplies a URL. */
    linkedin: attr('data-linkedin', ''),
    email: attr('data-email', 'ali.yildirim@deepsynaps.com'),
    prefill: attr('data-prefill', 'Hi Dr. Ali — I have a question about DeepSynaps.'),
    founder: 'Dr. Ali Yildirim'
  };

  var GREETING = {
    web: 'Hello — I am the DeepSynaps website assistant. Ask me about the services, the OS, the Lab or the Academy, and I can pass a message to Dr. Ali Yildirim whenever you want a person.',
    academy: 'Hello — I am the DeepSynaps Academy assistant. Ask me about formats, tracks or who the teaching is for, and I can put you on the notify list or pass a message to Dr. Ali Yildirim.',
    lab: 'Hello — I am the DeepSynaps Lab assistant. Ask me about the HAC chips, the science behind them or the research programme, and I can pass a message to Dr. Ali Yildirim.'
  };
  var DEFAULT_INTEREST = { web: 'consultation', academy: 'academy-waitlist', lab: 'lab-collaboration' };

  /** Mirrors `netlify/functions/_deepy/lead.mjs`. The server owns the truth. */
  var INTERESTS = [
    ['consultation', 'General consultation'], ['ai-protocol', 'AI protocol development'],
    ['neuromodulation', 'Neuromodulation consultation'], ['qeeg-review', 'QEEG / brain-map review'],
    ['clinic-integration', 'Clinic integration (DeepSynaps OS)'],
    ['lab-collaboration', 'Lab collaboration / research'],
    ['academy-waitlist', 'Academy waitlist'], ['other', 'Something else']
  ];

  var ERRORS = {
    lead_service_unavailable: 'Messages are not being delivered right now, so I will not pretend yours was sent. Please email ' + CFG.email + ' or use WhatsApp.',
    lead_not_delivered: 'Your message did not get through. Please email ' + CFG.email + ' or use WhatsApp so nothing is lost.',
    rate_limited: 'That is a lot of messages in a short time. Please wait a minute and try again.',
    consent_required: 'Please tick the consent box so we may reply to you.',
    contact_required: 'Please give an email address or a phone number so we can reply.',
    invalid_email: 'That email address does not look right.',
    invalid_phone: 'That phone number does not look right.',
    invalid_name: 'Please give your full name.',
    message_required: 'Please write a short message.'
  };
  var FALLBACK = 'Something went wrong on our side. Please email ' + CFG.email + ' or use WhatsApp.';
  var copyFor = function (code) { return ERRORS[code] || FALLBACK; };

  /* -------------------------------------------------- state and network */

  var state = { open: false, tab: 'chat', handoff: false, pending: false, history: [], error: '' };

  /**
   * One id per tab, so the Telegram ping can group a conversation. It carries
   * no identity and is not a credential. Every storage access is wrapped:
   * private windows and blocked site data make all of them throwable.
   */
  function sessionId() {
    try {
      var existing = window.sessionStorage.getItem(SESSION_KEY);
      if (existing) return existing;
      var minted = window.crypto && window.crypto.randomUUID ? window.crypto.randomUUID() : null;
      if (minted) window.sessionStorage.setItem(SESSION_KEY, minted);
      return minted;
    } catch (e) { return null; }
  }

  function currentPage() {
    try { return (window.location.pathname || '/') + (window.location.hash || ''); }
    catch (e) { return '/'; }
  }

  var recent = function () {
    return state.history.slice(-12).map(function (t) { return { role: t.role, content: t.content }; });
  };

  /**
   * A refusal is not an exception. The function answers refusals with a status
   * and a machine code, and the caller needs to tell those apart to show the
   * right sentence, so everything resolves to `{ok, code|value}`.
   */
  function post(body, done) {
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, 30000);
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    }).then(function (response) {
      return response.json().catch(function () { return null; }).then(function (parsed) {
        clearTimeout(timer);
        if (response.ok) done({ ok: true, value: parsed });
        else done({ ok: false, code: (parsed && parsed.error) || 'request_failed' });
      });
    }).catch(function () { clearTimeout(timer); done({ ok: false, code: 'request_failed' }); });
  }

  /* ---------------------------------------------------------------- CSS */

  /**
   * Injected as one stylesheet rather than as inline styles on every node, so
   * the page's own CSS cannot win a specificity fight it does not know it is
   * in. Every selector is scoped under the mount id for the same reason: this
   * runs on two hand-written pages whose stylesheets it must not disturb, and
   * which must not disturb it.
   */
  var CSS = ('#I{position:fixed;bottom:20px;right:20px;z-index:2147483000;display:flex;flex-direction:column;align-items:flex-end;font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}'
    + '#I *{box-sizing:border-box}'
    + '#I .lch{width:56px;height:56px;border-radius:50%;border:0;cursor:pointer;background:#D4943A;color:#050A14;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 28px rgba(212,148,58,.45);transition:transform .2s,filter .2s}'
    + '#I .lch:hover{transform:scale(1.05);filter:brightness(1.1)}#I .lch:focus-visible{outline:2px solid #fff;outline-offset:3px}'
    + '#I .pnl{width:min(92vw,380px);height:min(78vh,560px);margin-bottom:12px;display:flex;flex-direction:column;border-radius:16px;overflow:hidden;color:#E8EDF5;background:rgba(10,19,38,.97);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);box-shadow:0 20px 60px rgba(0,0,0,.55)}#I .pnl:focus{outline:none}'
    + '#I .hd{display:flex;align-items:center;gap:12px;padding:12px 16px;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(90deg,rgba(212,148,58,.12),transparent)}'
    + '#I .hd h2{margin:0;font-size:13px;font-weight:600;line-height:1.3}#I .hd p{margin:0;font-size:11px;color:#7A8BA8;line-height:1.3}'
    + '#I .dot{width:36px;height:36px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;background:rgba(212,148,58,.15);border:1px solid rgba(212,148,58,.3);color:#D4943A}'
    + '#I .xc{margin-left:auto;width:28px;height:28px;border-radius:50%;border:0;cursor:pointer;background:transparent;color:#7A8BA8;display:flex;align-items:center;justify-content:center}#I .xc:hover{background:rgba(255,255,255,.1);color:#E8EDF5}'
    + '#I .tabs{display:flex;flex-shrink:0;border-bottom:1px solid rgba(255,255,255,.08)}'
    + '#I .tab{flex:1;padding:10px 4px;font:500 12px inherit;cursor:pointer;background:transparent;border:0;border-bottom:2px solid transparent;color:#7A8BA8;display:flex;align-items:center;justify-content:center;gap:6px}'
    + '#I .tab:hover{color:#E8EDF5}#I .tab[aria-selected="true"]{color:#E8EDF5;border-bottom-color:#D4943A}'
    + '#I .bdy{flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden}'
    + '#I .log{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px}'
    + '#I .bub{max-width:86%;padding:10px 14px;border-radius:16px;font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word}'
    + '#I .bub.them{align-self:flex-start;border-bottom-left-radius:4px;color:#7A8BA8;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08)}'
    + '#I .bub.me{align-self:flex-end;border-bottom-right-radius:4px;color:#E8EDF5;background:rgba(212,148,58,.15);border:1px solid rgba(212,148,58,.25)}'
    + '#I .nt{font-size:12px;line-height:1.6;color:#7A8BA8;margin:0;padding:0 2px}'
    + '#I .er{font-size:12px;line-height:1.5;color:#fecaca;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:8px;padding:8px 12px}'
    + '#I .hof{margin:0 16px 8px;padding:8px 12px;width:calc(100% - 32px);cursor:pointer;border-radius:8px;font:500 12.5px inherit;display:flex;align-items:center;justify-content:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#7A8BA8}'
    + '#I .hof:hover{color:#E8EDF5;border-color:rgba(255,255,255,.2)}#I .hof.urgent{background:rgba(212,148,58,.2);border-color:rgba(212,148,58,.4);color:#D4943A}'
    + '#I .cmp{display:flex;gap:8px;align-items:flex-end;padding:12px;flex-shrink:0;border-top:1px solid rgba(255,255,255,.08)}'
    + '#I .snd{width:36px;height:36px;flex-shrink:0;border:0;border-radius:8px;cursor:pointer;background:#D4943A;color:#050A14;display:flex;align-items:center;justify-content:center}#I .snd:disabled{opacity:.35;cursor:not-allowed}'
    + '#I .pw{margin:0;padding:0 16px 12px;font-size:10.5px;line-height:1.5;text-align:center;color:rgba(122,139,168,.6)}'
    + '#I .frm{padding:16px;overflow-y:auto;display:flex;flex-direction:column;gap:12px}'
    + '#I .f{display:block;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:#7A8BA8;margin-bottom:6px}'
    + '#I input[type=text],#I input[type=email],#I input[type=tel],#I select,#I textarea{width:100%;padding:8px 12px;border-radius:8px;font:400 13px inherit;color:#E8EDF5;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);outline:none}'
    + '#I textarea{resize:vertical;min-height:72px}#I option{background:#0a1530;color:#E8EDF5}'
    + '#I input:focus,#I select:focus,#I textarea:focus{border-color:rgba(212,148,58,.5);background:rgba(255,255,255,.06)}'
    + '#I .cns{display:flex;gap:10px;align-items:flex-start;font-size:12px;line-height:1.6;color:#7A8BA8;cursor:pointer}#I .cns input{accent-color:#D4943A;width:14px;height:14px;margin-top:3px;flex-shrink:0}'
    + '#I .cta{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:9px 16px;border:0;border-radius:8px;cursor:pointer;font:600 13px inherit;background:#D4943A;color:#050A14;text-decoration:none;word-break:break-all}#I .cta:disabled{opacity:.4;cursor:not-allowed}'
    + '#I .lnk{color:#D4943A;text-decoration:underline}#I .row{display:flex;align-items:center;gap:12px}'
    + '#I .dir{padding:24px 20px;text-align:center}#I .dir h3{margin:0 0 8px;font-size:14px;font-weight:600}#I .dir p{margin:0 0 24px;font-size:13px;line-height:1.6;color:#7A8BA8}'
    + '#I .alt{display:inline-flex;align-items:center;gap:6px;margin-top:16px;font-size:12.5px}'
    + '#I .gst{background:transparent;border:0;cursor:pointer;color:#7A8BA8;font:400 12px inherit}#I .gst:hover{color:#E8EDF5}'
    + '#I .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}'
    + '@media (max-width:420px){#I{bottom:14px;right:14px;left:14px;align-items:stretch}#I .pnl{width:auto}#I .lch{align-self:flex-end}}'
  ).split('#I').join('#' + MOUNT_ID);

  var SVG = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';
  var ICON = {
    chat: '<svg ' + SVG + ' width="24" height="24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
    close: '<svg ' + SVG + ' width="16" height="16"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    send: '<svg ' + SVG + ' width="15" height="15"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>',
    phone: '<svg ' + SVG + ' width="13" height="13"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.26-1.26a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
    mail: '<svg ' + SVG + ' width="13" height="13"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-10 5L2 7"/></svg>',
    user: '<svg ' + SVG + ' width="14" height="14"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    bubble: '<svg ' + SVG + ' width="13" height="13"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>',
    linkedin: '<svg ' + SVG + ' width="13" height="13"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A4 4 0 0 1 16 8z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>'
  };

  var TABS = [
    { id: 'chat', label: 'Chat', icon: ICON.bubble },
    { id: 'whatsapp', label: 'WhatsApp', icon: ICON.phone },
    { id: 'email', label: 'Email', icon: ICON.mail }
  ];

  /**
   * `extra` is the second-best route out of a tab — a phone call under the
   * WhatsApp button, a profile under the email one. It returns null when there
   * is nothing to offer, which is how the LinkedIn slot stays invisible until a
   * page supplies a URL.
   */
  var DIRECT = {
    whatsapp: {
      title: 'Message us on WhatsApp', cta: 'Open WhatsApp', external: true,
      text: 'The quickest route for a short question. The message opens pre-written, and you can change it before you send.',
      href: function () { return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(CFG.prefill); },
      extra: function () {
        var call = el('a', 'lnk alt');
        call.href = 'tel:' + CFG.phone;
        call.innerHTML = ICON.phone;
        call.appendChild(el('span', null, 'Call ' + CFG.phoneDisplay));
        return call;
      }
    },
    email: {
      title: 'Email us', cta: CFG.email, external: false,
      text: 'Best for anything with detail. Please do not include patient identifiers.',
      href: function () { return 'mailto:' + CFG.email + '?subject=' + encodeURIComponent('DeepSynaps enquiry'); },
      extra: function () {
        if (CFG.linkedin.indexOf('https://') !== 0) return null;
        var profile = el('a', 'lnk alt');
        profile.href = CFG.linkedin;
        profile.target = '_blank';
        profile.rel = 'noopener noreferrer';
        profile.innerHTML = ICON.linkedin;
        profile.appendChild(el('span', null, 'LinkedIn'));
        return profile;
      }
    }
  };

  /* ------------------------------------------------------------- mount */

  /** Anything a visitor or the server produced is set as text, never as HTML. */
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  var style = el('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  var root = el('div');
  root.id = MOUNT_ID;
  var host = el('div');
  var launcher = el('button', 'lch');
  launcher.type = 'button';
  launcher.innerHTML = ICON.chat;
  root.appendChild(host);
  root.appendChild(launcher);
  document.body.appendChild(root);

  function setOpen(next) {
    state.open = next;
    launcher.setAttribute('aria-expanded', String(next));
    launcher.setAttribute('aria-label', next ? 'Close contact panel' : 'Contact DeepSynaps');
    launcher.innerHTML = next ? ICON.close : ICON.chat;
    render();
  }
  setOpen(false);

  launcher.addEventListener('click', function () { setOpen(!state.open); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && state.open) { setOpen(false); launcher.focus(); }
  });

  /* ------------------------------------------------------------ render */

  function render() {
    host.textContent = '';
    if (!state.open) return;

    var panel = el('div', 'pnl');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Contact DeepSynaps');
    panel.tabIndex = -1;

    var head = el('div', 'hd');
    var dot = el('div', 'dot');
    dot.innerHTML = ICON.chat;
    var titles = el('div');
    titles.appendChild(el('h2', null, 'DeepSynaps'));
    titles.appendChild(el('p', null,
      state.handoff ? 'Message ' + CFG.founder : 'Ask a question or reach us directly'));
    var close = el('button', 'xc');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close contact panel');
    close.innerHTML = ICON.close;
    close.addEventListener('click', function () { setOpen(false); launcher.focus(); });
    head.appendChild(dot); head.appendChild(titles); head.appendChild(close);
    panel.appendChild(head);
    panel.appendChild(renderTabs());

    var body = el('div', 'bdy');
    body.setAttribute('role', 'tabpanel');
    body.id = 'dscw-panel-' + state.tab;
    body.setAttribute('aria-labelledby', 'dscw-tab-' + state.tab);

    if (state.tab === 'chat') { if (state.handoff) renderForm(body); else renderChat(body); }
    else renderDirect(body, DIRECT[state.tab]);

    panel.appendChild(body);
    host.appendChild(panel);
    panel.focus();
  }

  function renderTabs() {
    var tabs = el('div', 'tabs');
    tabs.setAttribute('role', 'tablist');
    tabs.setAttribute('aria-label', 'Contact methods');
    TABS.forEach(function (entry, index) {
      var button = el('button', 'tab');
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.id = 'dscw-tab-' + entry.id;
      button.setAttribute('aria-selected', String(state.tab === entry.id));
      button.setAttribute('aria-controls', 'dscw-panel-' + entry.id);
      button.tabIndex = state.tab === entry.id ? 0 : -1;
      button.innerHTML = entry.icon;
      button.appendChild(el('span', null, entry.label));
      button.addEventListener('click', function () {
        state.tab = entry.id; state.handoff = false; render();
      });
      button.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        var next = (index + (event.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
        state.tab = TABS[next].id; state.handoff = false; render();
        var target = host.querySelector('#dscw-tab-' + TABS[next].id);
        if (target) target.focus();
      });
      tabs.appendChild(button);
    });
    return tabs;
  }

  function renderChat(body) {
    var log = el('div', 'log');
    log.setAttribute('role', 'log');
    log.setAttribute('aria-live', 'polite');
    log.setAttribute('aria-label', 'Conversation');
    log.appendChild(el('div', 'bub them', GREETING[CFG.site]));
    state.history.forEach(function (turn) {
      log.appendChild(el('div', 'bub ' + (turn.role === 'user' ? 'me' : 'them'), turn.content));
    });
    if (state.pending) log.appendChild(el('p', 'nt', 'Thinking…'));
    if (state.error) {
      var error = el('div', 'er', state.error);
      error.setAttribute('role', 'alert');
      log.appendChild(error);
    }
    body.appendChild(log);

    // The handoff is PERSISTENT once there is any answer, not conditional on
    // failure: the visitor who most wants a person is often the one who got a
    // good answer and now has a real question about their own clinic.
    if (state.history.some(function (t) { return t.role === 'assistant'; })) {
      var last = state.history[state.history.length - 1];
      var handoff = el('button', 'hof' + (last && last.needsHuman ? ' urgent' : ''));
      handoff.type = 'button';
      handoff.innerHTML = ICON.user;
      handoff.appendChild(el('span', null, 'Send this to ' + CFG.founder));
      handoff.addEventListener('click', function () { state.handoff = true; state.error = ''; render(); });
      body.appendChild(handoff);
    }

    var form = el('form', 'cmp');
    var label = el('label', 'sr', 'Your message');
    label.htmlFor = 'dscw-input';
    var input = el('textarea');
    input.id = 'dscw-input';
    input.rows = 1;
    input.maxLength = 1800;
    input.placeholder = 'Ask about formats, tracks, research…';
    input.style.maxHeight = '96px';
    var send = el('button', 'snd');
    send.type = 'submit';
    send.disabled = true;
    send.setAttribute('aria-label', 'Send message');
    send.innerHTML = ICON.send;
    input.addEventListener('input', function () { send.disabled = !input.value.trim(); });
    // Enter sends, Shift+Enter breaks the line. A chat box that needs a mouse
    // to send is a chat box people abandon.
    input.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); askNow(input.value); }
    });
    form.addEventListener('submit', function (event) { event.preventDefault(); askNow(input.value); });
    form.appendChild(label); form.appendChild(input); form.appendChild(send);
    body.appendChild(form);

    body.appendChild(el('p', 'pw',
      'Powered by the DeepSynaps assistant. Not a clinician — no medical advice.'));

    log.scrollTop = log.scrollHeight;
    if (!state.pending) input.focus();
  }

  function askNow(text) {
    var question = (text || '').trim();
    if (!question || state.pending) return;
    var history = recent();
    state.history.push({ role: 'user', content: question });
    state.pending = true;
    state.error = '';
    render();

    post({
      site: CFG.site, question: question, page: currentPage(),
      session_id: sessionId(), history: history
    }, function (outcome) {
      state.pending = false;
      if (outcome.ok && outcome.value) {
        state.history.push({
          role: 'assistant',
          content: outcome.value.answer,
          needsHuman: outcome.value.state === 'needs_human'
        });
      } else {
        state.error = copyFor(outcome.code);
      }
      render();
    });
  }

  /* --------------------------------------------------------- lead form */

  /** name, label, type, maxLength, required. Adding a text field is one row. */
  var FIELDS = [
    ['fullName', 'Full name *', 'text', 120, true],
    ['email', 'Email', 'email', 160, false],
    ['phone', 'Phone / WhatsApp', 'tel', 24, false],
    ['organisation', 'Organisation / clinic', 'text', 160, false]
  ];

  /** Every form row is a label bound to one control. Built once, used by all. */
  function row(form, name, labelText, control) {
    control.id = 'dscw-' + name;
    var label = el('label', 'f', labelText);
    label.htmlFor = control.id;
    var wrap = el('div');
    wrap.appendChild(label);
    wrap.appendChild(control);
    form.appendChild(wrap);
    return control;
  }

  function renderForm(body) {
    var form = el('form', 'frm');
    form.appendChild(el('p', 'nt', 'Leave your details and ' + CFG.founder
      + ' will reply. Please do not include patient identifiers here.'));

    var inputs = {};
    FIELDS.forEach(function (spec) {
      var control = el('input');
      control.type = spec[2];
      control.maxLength = spec[3];
      control.required = spec[4];
      inputs[spec[0]] = row(form, spec[0], spec[1], control);
      if (spec[0] === 'phone') {
        form.appendChild(el('p', 'nt',
          'One of the two is enough — whichever you would rather be reached on.'));
      }
    });

    var interest = el('select');
    INTERESTS.forEach(function (entry) {
      var option = el('option', null, entry[1]);
      option.value = entry[0];
      if (entry[0] === DEFAULT_INTEREST[CFG.site]) option.selected = true;
      interest.appendChild(option);
    });
    row(form, 'interest', 'I am interested in', interest);

    var message = el('textarea');
    message.maxLength = 4000;
    message.placeholder = 'What would you like to discuss?';
    row(form, 'message', 'Message', message);

    // Consent starts off and the submit stays disabled until it is on. The
    // server refuses anything that is not exactly true regardless, but the
    // browser must not be the place where someone appears to have agreed.
    var consentLabel = el('label', 'cns');
    var consent = el('input');
    consent.type = 'checkbox';
    var consentText = el('span', null,
      'I agree that DeepSynaps may store these details in order to reply to me. ');
    var privacy = el('a', 'lnk', 'Privacy notice');
    privacy.href = 'https://deepsynaps.com/privacy';
    privacy.target = '_blank';
    privacy.rel = 'noopener noreferrer';
    consentText.appendChild(privacy);
    consentLabel.appendChild(consent);
    consentLabel.appendChild(consentText);
    form.appendChild(consentLabel);

    var error = el('div', 'er');
    error.setAttribute('role', 'alert');
    error.style.display = 'none';
    form.appendChild(error);

    var submit = el('button', 'cta', 'Send to ' + CFG.founder);
    submit.type = 'submit';
    submit.disabled = true;
    var cancel = el('button', 'gst', 'Cancel');
    cancel.type = 'button';
    cancel.addEventListener('click', function () { state.handoff = false; render(); });
    var row = el('div', 'row');
    row.appendChild(submit); row.appendChild(cancel);
    form.appendChild(row);

    consent.addEventListener('change', function () { submit.disabled = !consent.checked; });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!consent.checked) return;
      submit.disabled = true;
      submit.textContent = 'Sending…';
      error.style.display = 'none';
      var value = function (key) { return inputs[key].value.trim() || undefined; };

      post({
        action: 'lead', site: CFG.site, page: currentPage(),
        session_id: sessionId(), history: recent(),
        lead: {
          fullName: inputs.fullName.value.trim(),
          email: value('email'),
          phone: value('phone'),
          organisation: value('organisation'),
          interest: interest.value,
          source: 'chat-' + CFG.site,
          message: message.value.trim() || undefined,
          consent: true
        }
      }, function (outcome) {
        if (outcome.ok) { renderSent(body); return; }
        submit.disabled = false;
        submit.textContent = 'Send to ' + CFG.founder;
        error.textContent = copyFor(outcome.code);
        error.style.display = '';
      });
    });

    body.appendChild(form);
    inputs.fullName.focus();
  }

  /** A centred panel: a heading, a sentence, and one thing to press. */
  function renderPlain(body, title, text, action, extra) {
    body.textContent = '';
    var wrap = el('div', 'dir');
    wrap.appendChild(el('h3', null, title));
    wrap.appendChild(el('p', null, text));
    wrap.appendChild(action);
    if (extra) wrap.appendChild(extra);
    body.appendChild(wrap);
  }

  function renderSent(body) {
    var back = el('button', 'gst', 'Back to the chat');
    back.type = 'button';
    back.addEventListener('click', function () { state.handoff = false; render(); });
    renderPlain(body, 'Message sent',
      CFG.founder + ' has it and will reply to you directly.', back);
  }

  function renderDirect(body, spec) {
    var link = el('a', 'cta', spec.cta);
    link.href = spec.href();
    if (spec.external) { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    renderPlain(body, spec.title, spec.text, link, spec.extra && spec.extra());
  }
}());
