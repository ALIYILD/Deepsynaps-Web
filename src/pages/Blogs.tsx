import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, BrainCircuit, Workflow, Layers3, Globe2, Network, BookOpen, Clock3 } from "lucide-react";

type Section = { heading: string; paragraphs: string[] };
type Article = { slug: string; title: string; subtitle: string; category: string; read: string; summary: string; sections: Section[] };
const articles: Article[] = [
  {
    slug: "what-is-deepsynaps-adaptive-intelligence",
    title: "What Is DeepSynaps Adaptive Intelligence?",
    subtitle: "From passive software to systems that can sense, reason, and improve with feedback.",
    category: "FOUNDATIONS", read: "6 min read",
    summary: "Discover the vision behind DeepSynaps AI Lab, NERVE and human-centred adaptive intelligence.",
    sections: [
      { heading: "Beyond a conventional AI chatbot", paragraphs: [
        "Most AI products begin with a prompt: someone asks a question and a model generates an answer. DeepSynaps AI Lab is exploring a more continuous model of intelligence. Its starting point is real-world information — from sensors, clinical measurements, user interactions and connected systems — that can change over time.",
        "The goal is not to replace people with one enormous model. It is to organise specialist AI capabilities so they can work together, use evidence, recognise uncertainty and learn from outcomes."
      ]},
      { heading: "A system with perception, memory and action", paragraphs: [
        "The proposed architecture follows a closed loop: sense → analyse → build representations → reason → simulate → recommend or act with permission → observe the result → update memory.",
        "Sensing gives the system context. Specialist analysers turn raw inputs into meaningful signals. Digital twins provide different views of a person or system. NERVE coordinates specialist agents. Evaluation and feedback help the system decide whether its conclusions held up."
      ]},
      { heading: "Why the name adaptive?", paragraphs: [
        "Adaptive means decisions can be revised when circumstances or evidence change. It does not mean the system should silently retrain itself on sensitive information or autonomously make high-stakes medical decisions.",
        "A responsible adaptive system needs explicit permissions, human oversight, versioned models, provenance, audit trails, safety gates and measurable evaluations. Those are engineering requirements, not optional extras."
      ]},
      { heading: "Research vision versus available products", paragraphs: [
        "DeepSynaps Clinical Intelligence OS is an application of this research direction, bringing multiple health data sources into a clinical view and supporting professional decision-making. The wider agent-based intelligence architecture is a research and development programme; individual capabilities may have different levels of readiness.",
        "The AI Lab connects fundamental research to practical applications in healthcare, wellness, human performance, efficient computation and, potentially, physical AI."
      ]}
    ]
  },
  {
    slug: "how-nerve-adaptive-loop-works",
    title: "How Does the NERVE Learning Loop Work?",
    subtitle: "A guided tour from raw signals to human-supervised decisions and learning.",
    category: "ARCHITECTURE", read: "8 min read",
    summary: "Follow the sensing, analyser, twin, agent, simulation and feedback pipeline.",
    sections: [
      { heading: "1. Sense and ingest", paragraphs: [
        "The loop begins with inputs such as EEG, imaging, blood biomarkers, cognitive assessments, speech, text, wearables and other appropriately authorised sources. Each source arrives with metadata describing when, where and how it was collected.",
        "Privacy, consent, access control and data quality checks need to happen at the point of ingestion. An unreliable source should not become a confident recommendation downstream."
      ]},
      { heading: "2. Analyse and represent", paragraphs: [
        "Modality-specific analysers clean, validate and interpret inputs. In healthcare, this could involve signal-quality checks on EEG, extraction of structured findings from documents and tracking trends in biometrics.",
        "Outputs feed specialised representations — Brain Twin, Bio Twin, Mind Twin and Body Twin — before a broader DeepTwin view is assembled. These twins are evolving computational representations, not exact copies of a person."
      ]},
      { heading: "3. Coordinate through NERVE", paragraphs: [
        "NERVE is the proposed orchestration and decision layer. Rather than asking a single general model to do everything, it routes work to specialist agents with bounded responsibilities. Some agents interpret signals; others search evidence, propose options, run simulations or check output quality.",
        "Agent teams can behave like functional networks: they exchange messages and evidence, but they are not literal biological neurons. Their interactions are software processes with observable inputs and outputs."
      ]},
      { heading: "4. Evaluate, simulate, and act safely", paragraphs: [
        "Before an output reaches the user, a verifier or judge can test it against task-specific criteria, source evidence, uncertainty and safety rules. A judge model is one control in an evaluation system, not proof of correctness.",
        "Simulation can compare possible scenarios, but predictions require external validation. In clinical use, recommendations must remain decision support, with qualified professionals responsible for diagnosis and treatment."
      ]},
      { heading: "5. Close the feedback loop", paragraphs: [
        "The loop continues by comparing expected and observed outcomes. Traceable feedback may update an agent's contextual memory, retrieval priorities, rules or a version-controlled model-improvement queue.",
        "Changes to models or clinical protocols should go through testing, review and release controls before affecting real users. This separates adaptive intelligence from uncontrolled self-modification."
      ]}
    ]
  },
  {
    slug: "which-ai-models-power-nerve",
    title: "What AI Model Are We Using?",
    subtitle: "Why DeepSynaps is designed as a model-agnostic network of specialist agents.",
    category: "AI MODELS", read: "7 min read",
    summary: "Explore agent-based orchestration, language models, signal processing, digital twins and evaluators.",
    sections: [
      { heading: "Not one model, but an architecture", paragraphs: [
        "The central design principle is model orchestration. NERVE is intended to connect language and reasoning models, conventional machine-learning systems, domain-specific analysers, simulation tools, retrieval systems and human reviewers.",
        "This modular approach makes it possible to select a capability for a task and replace it when a safer or more accurate alternative becomes available. The precise production model mix may change and should be documented per deployment."
      ]},
      { heading: "Specialist agents as functional units", paragraphs: [
        "In the proposed NERVE design, agents act as specialised processing units within networks. An EEG agent may assess signal quality and features; an evidence agent may retrieve supporting literature; a protocol agent may organise options; an outcome agent may compare predictions with follow-up data.",
        "This is inspired by distributed neural processing but should not be confused with a convolutional neural network (CNN). A CNN performs numerical operations over learned parameters; an agent typically uses tools, reasoning and messages. They can coexist within the same system."
      ]},
      { heading: "Where CNNs and other neural networks fit", paragraphs: [
        "CNNs, transformers, temporal models and other neural networks can be used inside sensory analysers where they have been trained and validated for the relevant data. An agent can invoke one of these models, interpret its structured output and pass evidence onward.",
        "The architecture therefore combines conventional machine learning with agent orchestration rather than replacing artificial neurons with agents inside a CNN."
      ]},
      { heading: "Reasoning, memory and evaluation", paragraphs: [
        "Large language models can help with planning, explanation, synthesis and controlled tool use. Retrieval connects agents to current reference material. Scoped memory can preserve useful context subject to privacy and retention controls.",
        "Independent evaluation can use deterministic checks, domain rules, specialist reviewers and judge-model comparisons. Any named vendor model or agent framework is a candidate implementation detail, not a guarantee that every deployment uses it."
      ]},
      { heading: "The path to reliable deployment", paragraphs: [
        "Each component needs benchmark datasets, robustness testing, calibration checks, access controls, model/version records and fallback behaviours. Especially in healthcare, performance claims require representative external validation.",
        "The long-term research objective is a composable intelligence platform in which specialised parts can improve without hiding their limitations from users or clinicians."
      ]}
    ]
  },
  {
    slug: "applications-of-adaptive-intelligence",
    title: "Where Can Adaptive Intelligence Be Applied?",
    subtitle: "From clinical care to wearables, efficient AI infrastructure and future embodied systems.",
    category: "APPLICATIONS", read: "7 min read",
    summary: "Understand the proposed applications across DeepSynaps products and research programmes.",
    sections: [
      { heading: "Clinical intelligence", paragraphs: [
        "Clinical Intelligence OS aims to bring diverse clinical information into one evidence-linked workspace. EEG, biomarkers, assessments, medical documents and other inputs can support longitudinal interpretation and clearer communication between clinicians and patients.",
        "Potential workflows include qEEG analysis, neuromodulation planning support, patient follow-up and outcome tracking. Any clinical outputs require appropriate professional judgement and validation."
      ]},
      { heading: "Wellness, wearables and human performance", paragraphs: [
        "Connected wearables may provide time-series context about sleep, movement and physiology. Adaptive interfaces could use such information to display trends, support coaching and help people discuss changes with their care team.",
        "Consumer-facing applications should avoid making medical claims without evidence and should allow users to control their personal data."
      ]},
      { heading: "Digital twins and scenario exploration", paragraphs: [
        "Brain, Bio, Mind and Body Twins provide separate perspectives that can be combined into a more complete computational model. These representations could support investigation of change over time and the comparison of hypothetical scenarios.",
        "Digital-twin predictions are hypotheses until calibrated and independently validated for a specific purpose."
      ]},
      { heading: "AI hardware and efficient computation", paragraphs: [
        "The Chip Design Lab investigates brain-inspired and photonic computing concepts. PERFFLUX explores computational efficiency, including measures such as energy use per token, throughput and latency.",
        "These research directions could help make increasingly complex intelligence systems more efficient, but prototypes must be distinguished from commercially deployed hardware."
      ]},
      { heading: "Education, research and physical AI", paragraphs: [
        "DeepSynaps Academy can turn multidisciplinary research into accessible learning. Research partnerships can test the NERVE architecture and its agent evaluation approach in controlled environments.",
        "A future extension is physical AI: systems that learn from sensors and feedback in robotics or other embodied settings. That is a potential research application rather than a claim of a deployed robotics product."
      ]},
      { heading: "One principle across every use case", paragraphs: [
        "Useful intelligence must remain observable, evidence-aware and accountable. The application changes, but the design principle remains the same: sense carefully, reason transparently, act with appropriate approval and learn from verified outcomes."
      ]}
    ]
  }
  {
    slug: "inter-agency-collaborative-working",
    title: "What Is Inter-Agency Collaborative Working?",
    subtitle: "How different professionals, organisations and intelligent agents can work together around shared goals.",
    category: "COLLABORATION", read: "8 min read",
    summary: "A practical guide to coordinated working across healthcare, education, social care and the DeepSynaps NERVE architecture.",
    sections: [
      { heading: "What does inter-agency collaborative working mean?", paragraphs: [
        "Inter-agency collaborative working is when different organisations, services or professional teams coordinate their expertise to achieve an outcome that none could deliver as effectively alone. It is especially important when a person's needs cross institutional boundaries: for example, a child may need input from a teacher, speech and language therapist, paediatrician and social worker.",
        "Good collaboration is more than sharing a report. It requires shared goals, agreed responsibilities, respectful communication, suitable information-sharing arrangements and a way to check whether the joint plan is working."
      ]},
      { heading: "A real-world example: supporting a child", paragraphs: [
        "Imagine a pupil experiencing difficulties with communication, learning and emotional regulation. A school may notice the classroom pattern; a speech and language therapist can assess communication; a clinician can consider health factors; and the family can explain what happens at home.",
        "Each party sees only part of the picture. Together, with appropriate consent and lawful information-sharing, they can develop a coordinated support plan, identify who is responsible for each action and review progress against meaningful outcomes. The family's preferences should shape the plan rather than being treated as an afterthought."
      ]},
      { heading: "The principles that make collaboration work", paragraphs: [
        "First, establish a shared purpose and put the person receiving support at the centre. Second, clarify roles and decision-making authority: contribution is shared, but professional accountability does not disappear. Third, use a common vocabulary and structured handovers so important findings are not lost between teams.",
        "Fourth, share only necessary information under appropriate permissions and applicable privacy law. Fifth, agree escalation procedures for uncertainty, disagreement and safeguarding concerns. Finally, use regular reviews and outcome measures so the collaboration can be improved, not merely documented."
      ]},
      { heading: "How does this relate to multi-agent AI?", paragraphs: [
        "DeepSynaps AI Lab draws a useful design analogy between inter-agency practice and multi-agent computing. Just as professional services have different areas of expertise, NERVE is being designed to coordinate specialist software agents. An analyser agent may assess a signal; an evidence agent may locate supporting research; an outcome agent may track change; and a coordinating agent may assemble results for review.",
        "These software agents are not the same as independent human agencies. They do not have professional licences, moral responsibility or the authority to make clinical decisions. The analogy is about specialisation, communication, accountability boundaries and shared objectives — not about replacing clinical or safeguarding teams."
      ]},
      { heading: "An illustrative NERVE collaboration loop", paragraphs: [
        "A potential workflow begins with an authorised request and quality-checked data. NERVE identifies the relevant tasks, sends them to specialist agents and receives structured findings with source references and confidence or uncertainty signals.",
        "A verification stage compares claims against evidence, checks for contradictions and flags information gaps. The system then presents a coherent summary or proposed next steps to an authorised human professional. Feedback on the eventual outcome can inform audited improvements to the workflow.",
        "For instance, an EEG analysis agent and a cognitive assessment agent may offer complementary observations, while a literature agent retrieves studies relevant to a clinician's question. Their combined output can support review, but it cannot by itself establish a diagnosis or treatment plan."
      ]},
      { heading: "The challenges: disagreement, privacy and fragmented systems", paragraphs: [
        "Real collaboration can fail when professionals use incompatible records, responsibilities are unclear, teams have different priorities or information is outdated. AI systems face similar technical problems: conflicting outputs, inconsistent data formats, unreliable tool results and hidden assumptions.",
        "Good orchestration should preserve provenance, restrict access, make disagreements visible and provide escalation to people who can resolve them. In sensitive domains, autonomous action should be limited by policy, consent and human authorisation."
      ]},
      { heading: "Where could this approach help?", paragraphs: [
        "Possible applications include integrated health and social care, multidisciplinary rehabilitation, special educational needs support, mental health services, research collaborations and complex operational decision support. The common opportunity is to connect fragmented information without erasing the expertise of each participant.",
        "DeepSynaps' long-term research direction is to bring these collaborative principles into an adaptive intelligence architecture: specialised components working toward shared objectives, with transparent evidence, clear boundaries and continuous evaluation. That is a design ambition, and individual technical or clinical capabilities must be validated before real-world use."
      ]}
    ]
  },
];

const icons = [BrainCircuit, Workflow, Layers3, Globe2, Network];
function BlogCard({ article, index }: { article: Article; index: number }) {
  const Icon = icons[index];
  return <Link to={`/blogs/${article.slug}`} className="glass-card group block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400" style={{textDecoration:"none"}}>
    <div className="flex items-center justify-between mb-8"><span className="text-xs tracking-[.18em] text-amber-400 font-semibold">{article.category}</span><Icon className="text-cyan-300" size={28} aria-hidden="true"/></div>
    <h2 className="text-2xl font-semibold text-white leading-tight mb-3">{article.title}</h2>
    <p className="text-slate-300 leading-relaxed mb-6">{article.summary}</p>
    <div className="flex items-center justify-between text-sm text-slate-400"><span className="inline-flex gap-2 items-center"><Clock3 size={15}/>{article.read}</span><span className="inline-flex gap-2 items-center text-amber-300">Read article <ArrowRight size={16}/></span></div>
  </Link>;
}
export function BlogsPage() {
  return <section className="lab-container py-20 md:py-28 min-h-[70vh]" aria-labelledby="blog-heading">
    <div className="max-w-3xl mb-12 md:mb-16"><div className="section-label flex items-center gap-2"><BookOpen size={16}/> IDEAS & INSIGHTS</div><h1 id="blog-heading" className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight mb-6">Explore the <span className="gradient-text">AI Lab Blogs</span></h1><p className="text-lg text-slate-300 leading-relaxed">Five guides to our adaptive intelligence research: the vision, learning loop, underlying models, applications, and inter-agency collaboration.</p></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{articles.map((a,i)=><BlogCard key={a.slug} article={a} index={i}/>)}</div>
    <p className="text-sm text-slate-400 mt-12">Research explainers. Architecture descriptions include work in development and should not be interpreted as independently validated clinical claims.</p>
  </section>;
}
export function BlogArticlePage() {
  const { slug } = useParams();
  const article = articles.find(a=>a.slug===slug);
  if (!article) return <section className="lab-container py-24 min-h-[60vh]"><h1 className="text-4xl text-white mb-5">Article not found</h1><Link to="/blogs" className="text-amber-300 inline-flex items-center gap-2"><ArrowLeft size={18}/> Back to blogs</Link></section>;
  const index=articles.indexOf(article);
  const next=articles[(index+1)%articles.length];
  return <article className="lab-container py-16 md:py-24 max-w-5xl">
    <Link to="/blogs" className="inline-flex items-center gap-2 text-amber-300 mb-12 hover:underline"><ArrowLeft size={18}/> All blogs</Link>
    <header className="max-w-3xl mb-12 pb-10 border-b border-white/10"><div className="text-amber-400 text-xs font-semibold tracking-[.18em] mb-5">{article.category} · {article.read}</div><h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight mb-6">{article.title}</h1><p className="text-xl text-slate-300 leading-relaxed">{article.subtitle}</p><p className="text-sm text-slate-400 mt-6">DeepSynaps AI Lab · Research explainer</p></header>
    <div className="max-w-3xl space-y-12">{article.sections.map(s=><section key={s.heading}><h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">{s.heading}</h2><div className="space-y-5">{s.paragraphs.map((p,i)=><p key={i} className="text-base md:text-lg leading-8 text-slate-300">{p}</p>)}</div></section>)}</div>
    <aside className="max-w-3xl border-t border-white/10 pt-10 mt-16"><p className="text-sm text-slate-400 mb-6">Clinical features are decision support. Research concepts and proposed systems may not be available as deployed products.</p><Link to={`/blogs/${next.slug}`} className="glass-card block"><span className="text-xs text-amber-300 uppercase tracking-wider">Next article</span><span className="flex gap-3 items-center justify-between text-xl text-white font-semibold mt-3">{next.title}<ArrowRight/></span></Link></aside>
  </article>;
}
