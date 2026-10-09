import {
  Activity,
  BrainCircuit,
  Cpu,
  GraduationCap,
  Network,
  ScanEye,
  Server,
  Sparkles,
} from "lucide-react";

export const networkParts = [
  {
    id: "sense",
    name: "Sensory inputs",
    x: 255,
    y: 105,
    color: "#83c6ff",
    labelX: 215,
    labelY: 33,
    summary: "Start with the real world.",
    description:
      "Sensor streams, observations and context enter the system with their source, timing and quality attached.",
    skills: [
      "Receive multimodal signals",
      "Preserve source and timestamps",
      "Flag missing or uncertain information",
    ],
  },
  {
    id: "analyze",
    name: "Analyzers",
    x: 535,
    y: 120,
    color: "#77e4d0",
    labelX: 534,
    labelY: 44,
    summary: "Turn signals into patterns.",
    description:
      "Specialist analyzers organise signals, find relationships and produce evidence for further reasoning. A correlation is a clue, not proof of causation.",
    skills: [
      "Clean and structure signals",
      "Group related patterns",
      "Separate observations from interpretations",
    ],
  },
  {
    id: "twin",
    name: "Digital twins",
    x: 654,
    y: 293,
    color: "#c1a8ff",
    labelX: 687,
    labelY: 217,
    summary: "Model context and possible outcomes.",
    description:
      "Twins bring observations together into evolving representations. Predictions and simulated scenarios can be compared with subsequent observations.",
    skills: [
      "Connect observations over time",
      "Represent context and uncertainty",
      "Explore and evaluate predictions",
    ],
  },
  {
    id: "nerve",
    name: "NERVE",
    x: 395,
    y: 272,
    color: "#98b7ff",
    labelX: 395,
    labelY: 204,
    summary: "Coordinate specialist intelligence.",
    description:
      "NERVE is the proposed coordination layer: specialist agents reason together, consult relevant memories and tools, and propose actions within defined permissions.",
    skills: [
      "Route tasks to relevant specialists",
      "Compare evidence and disagreement",
      "Coordinate actions with human oversight",
    ],
  },
  {
    id: "memory",
    name: "Memory & skills",
    x: 470,
    y: 441,
    color: "#89e2d9",
    labelX: 510,
    labelY: 517,
    summary: "Keep useful learning connected.",
    description:
      "Evaluated experience can become retrievable memories, reusable skills and shared knowledge. Relevant agents receive the learning they need, with its source and evaluation attached.",
    skills: [
      "Recall relevant experiences",
      "Retain evaluated procedures",
      "Share selectively across the network",
    ],
  },
  {
    id: "agents",
    name: "Specialist agents",
    x: 158,
    y: 315,
    color: "#83a8fb",
    labelX: 124,
    labelY: 405,
    summary: "Small responsibilities. Shared context.",
    description:
      "Each agent has a focused responsibility and access to appropriate tools and memory. Agents collaborate through NERVE while preserving the evidence behind their contributions.",
    skills: [
      "Perform focused tasks",
      "Consult tools and language models",
      "Contribute evidence to shared reasoning",
    ],
  },
] as const;

export const stages = [
  {
    name: "Sense",
    eyebrow: "Multimodal understanding",
    title: "Start with the source.",
    description:
      "Connect sensor streams, observations and context. Keep their origin and uncertainty visible.",
    nodes: ["Signals", "Analysis", "Twin"],
    captions: ["Real-world inputs", "Patterns & context", "Possible outcomes"],
    icon: ScanEye,
  },
  {
    name: "Understand",
    eyebrow: "Context before conclusions",
    title: "Give every pattern context.",
    description:
      "Analyzers organise signals into related patterns. Twins connect those patterns over time, preserving the distinction between observation, interpretation and prediction.",
    nodes: ["Patterns", "Context", "Prediction"],
    captions: [
      "Related observations",
      "Evolving representation",
      "Testable expectation",
    ],
    icon: BrainCircuit,
  },
  {
    name: "Coordinate",
    eyebrow: "Inter-agent collaboration",
    title: "Bring the right agents together.",
    description:
      "NERVE routes work to specialist agents. They retrieve relevant memories, compare evidence and propose a response, with human review where required.",
    nodes: ["NERVE", "Agents", "Action"],
    captions: ["Task orchestration", "Reasoning & tools", "Within permissions"],
    icon: Network,
  },
  {
    name: "Learn",
    eyebrow: "Close the feedback loop",
    title: "Turn experience into useful learning.",
    description:
      "Compare expected and observed outcomes. Evaluate what worked, retain useful memories and skills, and share them with relevant agents for future tasks.",
    nodes: ["Feedback", "Evaluation", "Memory"],
    captions: ["Observed outcomes", "Quality & usefulness", "Skills to reuse"],
    icon: Sparkles,
  },
] as const;

export const products = [
  {
    slug: "chip-design",
    name: "DeepSynaps Chip Design Lab",
    category: "AI hardware research",
    description:
      "Research into chips for adaptive intelligence, sensory processing and physical AI.",
    detail:
      "DeepSynaps Lab explores brain-inspired computing and chip architectures. Its research considers how hardware and intelligent software can develop together, from sensory processing to efficient inference.",
    focus: [
      "Brain-inspired chip architectures",
      "Sensory processing and efficient compute",
      "Hardware and software co-design",
    ],
    color: "violet",
    icon: Cpu,
    href: "https://deepsynapslab.com",
    cta: "Visit the chip lab",
  },
  {
    slug: "clinical-os",
    name: "Clinical Intelligence OS",
    category: "Healthcare",
    description:
      "Patient information, evidence and specialist tools for clinician decision support.",
    detail:
      "The first application of the DeepSynaps vision brings patient information into one view, keeps sources clear and supports collaboration between clinicians, patients and developers. Clinical decisions remain with qualified clinicians.",
    focus: [
      "Clinical and patient dashboards",
      "Multimodal analyzers and digital twins",
      "Evidence-linked decision support",
    ],
    color: "blue",
    icon: BrainCircuit,
    href: "https://app.deepsynaps.com",
    cta: "Explore Clinical OS",
  },
  {
    slug: "perfflux",
    name: "Perfflux",
    category: "AI infrastructure",
    description:
      "Performance, telemetry and efficiency for the computing systems that run AI.",
    detail:
      "Perfflux focuses on understanding how AI infrastructure performs, using telemetry and evaluation to identify opportunities for better efficiency. It connects the intelligence research vision with the practical computing systems underneath it.",
    focus: [
      "AI infrastructure telemetry",
      "Performance and efficiency evaluation",
      "Agent-assisted optimisation research",
    ],
    color: "cyan",
    icon: Server,
    href: "",
    cta: "Discuss Perfflux",
  },
  {
    slug: "peak-performance",
    name: "Peak Performance",
    category: "Human performance",
    description:
      "Sensing and intelligence for performance, recovery and wellbeing.",
    detail:
      "DeepSynaps Peak Performance explores how multimodal observations can support a more connected understanding of human performance, recovery and wellbeing.",
    focus: [
      "Performance and recovery insights",
      "Connected observations over time",
      "Personalised support with professional oversight",
    ],
    color: "purple",
    icon: Activity,
    href: "https://deepsynaps-peak-performance.netlify.app",
    cta: "Explore performance",
  },
  {
    slug: "academy",
    name: "Academy",
    category: "Education & learning",
    description:
      "Develop practical understanding across AI, neuroscience and neurotechnology.",
    detail:
      "DeepSynaps Academy connects education and practice through seminars, workshops and professional learning across AI, neuroscience and neurotechnology.",
    focus: [
      "Professional learning",
      "Applied AI and neuroscience",
      "Research-to-practice education",
    ],
    color: "green",
    icon: GraduationCap,
    href: "https://deepsynapsacademy.com",
    cta: "Explore Academy",
  },
] as const;

export const researchTopics = [
  {
    id: "chip-design",
    name: "Chip design",
    question:
      "How can chip architectures support efficient sensory processing and adaptive AI?",
    description:
      "Explore brain-inspired compute and hardware designed around the needs of intelligent systems.",
    color: "violet",
    icon: Cpu,
  },
  {
    id: "adaptive-learning",
    name: "Adaptive learning",
    question: "How can evaluated experience change future behaviour?",
    description:
      "Study feedback, memory, skill retention and the evaluations needed to establish useful improvement.",
    color: "blue",
    icon: Sparkles,
  },
  {
    id: "collaborative-agents",
    name: "Collaborative agents",
    question: "How should specialists exchange evidence and memories?",
    description:
      "Investigate task routing, shared context, disagreement and selective learning across an agent network.",
    color: "purple",
    icon: Network,
  },
  {
    id: "physical-ai",
    name: "World models & physical AI",
    question: "How can sensing and prediction guide action?",
    description:
      "Explore representations of changing environments and how observations can support simulated and embodied tasks.",
    color: "green",
    icon: ScanEye,
  },
] as const;
