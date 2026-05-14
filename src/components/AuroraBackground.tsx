// Layered aurora + gradient mesh overlay. Sits behind the NeuralNetworkCanvas to
// add depth and warm/cool color movement without being too busy.

export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#0a1530_0%,_#050a14_55%,_#020510_100%)]" />

      {/* Amber aurora */}
      <div className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full bg-[radial-gradient(circle,_rgba(212,148,58,0.18)_0%,_transparent_60%)] blur-3xl animate-[aurora_18s_ease-in-out_infinite]" />

      {/* Violet aurora */}
      <div className="absolute top-1/4 -right-1/4 w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,_rgba(107,78,230,0.20)_0%,_transparent_60%)] blur-3xl animate-[aurora_22s_ease-in-out_infinite_reverse]" />

      {/* Cyan aurora low */}
      <div className="absolute -bottom-1/4 left-1/4 w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle,_rgba(46,143,219,0.16)_0%,_transparent_60%)] blur-3xl animate-[aurora_26s_ease-in-out_infinite]" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(2,5,16,0.6)_100%)]" />

      {/* Noise / film grain */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
