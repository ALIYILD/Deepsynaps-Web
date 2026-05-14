interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const textSize =
    size === 'sm'
      ? 'text-[1.1rem]'
      : size === 'lg'
        ? 'text-[1.6rem]'
        : 'text-[1.35rem]';

  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-semibold tracking-tight ${textSize} ${className}`}
      aria-label="DeepSynaps"
    >
      {/* Brand mark — violet infinity-style glyph */}
      <span
        aria-hidden
        className="relative inline-flex w-7 h-7 items-center justify-center"
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 30% 30%, rgba(107,78,230,0.55) 0%, transparent 65%)',
            filter: 'blur(4px)',
          }}
        />
        <svg
          viewBox="0 0 32 32"
          className="relative w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: '#8B6FF0' }}
        >
          {/* Stylized synaptic curve / infinity */}
          <path d="M6 16c2.5-6 6.5-6 10 0s7.5 6 10 0" />
          <circle cx="6" cy="16" r="1.6" fill="currentColor" stroke="none" />
          <circle cx="26" cy="16" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      </span>

      <span className="leading-none">
        <span className="text-white">Deep</span>
        <span className="text-white/85 italic font-medium">Synaps</span>
      </span>
    </span>
  );
}
