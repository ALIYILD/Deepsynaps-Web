import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  phaseSpeed: number;
}

interface Synapse {
  a: number;
  b: number;
  opacity: number;
}

interface Pulse {
  synapseIdx: number;
  progress: number;
  speed: number;
  trail: { x: number; y: number; opacity: number }[];
}

function getNodeCount(width: number): number {
  if (width < 768) return 25;
  if (width < 1024) return 40;
  if (width < 1440) return 50;
  return 60;
}

function getMaxConnectionDist(width: number): number {
  return 150 + (width > 1440 ? 30 : 0);
}

export function NeuralNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const simRef = useRef<{
    neurons: Neuron[];
    synapses: Synapse[];
    pulses: Pulse[];
    lastPulseTime: number;
    width: number;
    height: number;
  }>({
    neurons: [],
    synapses: [],
    pulses: [],
    lastPulseTime: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: false });
    if (!ctx) return;

    const sim = simRef.current;

    function initNeurons() {
      sim.width = window.innerWidth;
      sim.height = window.innerHeight;
      canvas!.width = sim.width * window.devicePixelRatio;
      canvas!.height = sim.height * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);

      const count = getNodeCount(sim.width);
      sim.neurons = [];
      for (let i = 0; i < count; i++) {
        sim.neurons.push({
          x: Math.random() * sim.width,
          y: Math.random() * sim.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 2 + Math.random() * 2,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.5 + Math.random() * 1.0,
        });
      }
      sim.synapses = [];
      sim.pulses = [];
    }

    function updateSynapses() {
      const maxDist = getMaxConnectionDist(sim.width);
      sim.synapses = [];
      for (let i = 0; i < sim.neurons.length; i++) {
        for (let j = i + 1; j < sim.neurons.length; j++) {
          const dx = sim.neurons[i].x - sim.neurons[j].x;
          const dy = sim.neurons[i].y - sim.neurons[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            sim.synapses.push({
              a: i,
              b: j,
              opacity: 1 - dist / maxDist,
            });
          }
        }
      }
    }

    function spawnPulse() {
      if (sim.synapses.length === 0) return;
      const synIdx = Math.floor(Math.random() * sim.synapses.length);
      sim.pulses.push({
        synapseIdx: synIdx,
        progress: 0,
        speed: 0.005 + Math.random() * 0.005,
        trail: [],
      });
    }

    function draw() {
      if (document.hidden) {
        animRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx!.clearRect(0, 0, sim.width, sim.height);

      // Update neurons
      for (const n of sim.neurons) {
        n.x += n.vx;
        n.y += n.vy;
        n.phase += n.phaseSpeed * 0.016;

        // Brownian drift
        n.vx += (Math.random() - 0.5) * 0.02;
        n.vy += (Math.random() - 0.5) * 0.02;
        n.vx *= 0.99;
        n.vy *= 0.99;

        // Bounce off edges
        if (n.x < 0 || n.x > sim.width) n.vx *= -1;
        if (n.y < 0 || n.y > sim.height) n.vy *= -1;
        n.x = Math.max(0, Math.min(sim.width, n.x));
        n.y = Math.max(0, Math.min(sim.height, n.y));
      }

      updateSynapses();

      // Spawn pulses
      const now = performance.now();
      if (now - sim.lastPulseTime > 500 + Math.random() * 500) {
        spawnPulse();
        sim.lastPulseTime = now;
      }

      // Draw synapses
      for (const syn of sim.synapses) {
        const a = sim.neurons[syn.a];
        const b = sim.neurons[syn.b];
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(b.x, b.y);
        ctx!.strokeStyle = `rgba(212, 148, 58, ${0.12 * syn.opacity})`;
        ctx!.lineWidth = 0.5;
        ctx!.stroke();
      }

      // Update and draw pulses
      for (let i = sim.pulses.length - 1; i >= 0; i--) {
        const p = sim.pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          sim.pulses.splice(i, 1);
          continue;
        }

        const syn = sim.synapses[p.synapseIdx];
        if (!syn) {
          sim.pulses.splice(i, 1);
          continue;
        }

        const a = sim.neurons[syn.a];
        const b = sim.neurons[syn.b];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        // Update trail
        p.trail.push({ x: px, y: py, opacity: 1 });
        if (p.trail.length > 4) p.trail.shift();

        // Draw trail
        for (let t = 0; t < p.trail.length; t++) {
          const trailPoint = p.trail[t];
          const trailOpacity = (t / p.trail.length) * 0.6 * (1 - p.progress);
          ctx!.beginPath();
          ctx!.arc(trailPoint.x, trailPoint.y, 1.5, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(107, 78, 230, ${trailOpacity})`;
          ctx!.fill();
        }

        // Draw pulse
        ctx!.beginPath();
        ctx!.arc(px, py, 2, 0, Math.PI * 2);
        ctx!.fillStyle = '#6B4EE6';
        ctx!.fill();

        // White core
        ctx!.beginPath();
        ctx!.arc(px, py, 1, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx!.fill();
      }

      // Draw neurons
      for (const n of sim.neurons) {
        const oscillation = Math.sin(n.phase) * 0.3 + 1;
        const r = n.radius * oscillation;

        // Glow
        const gradient = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
        gradient.addColorStop(0, 'rgba(212, 148, 58, 0.6)');
        gradient.addColorStop(1, 'rgba(212, 148, 58, 0)');
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
        ctx!.fillStyle = gradient;
        ctx!.fill();

        // Core
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = 'rgba(212, 148, 58, 0.8)';
        ctx!.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    initNeurons();
    draw();

    const handleResize = () => {
      initNeurons();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
}
