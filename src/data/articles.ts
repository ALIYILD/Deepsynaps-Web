type Section = { heading: string; paragraphs: string[] };
export type Article = { slug: string; title: string; subtitle: string; category: string; read: string; summary: string; sections: Section[]; sources?: { label: string; url: string }[] };
const existingArticles: Article[] = [
  {
    slug: "what-is-deepsynaps-adaptive-intelligence",
    title: "What Is AWIM? Inside DeepSynaps AI Lab",
    subtitle: "From passive software to systems that can sense, reason, and improve with feedback.",
    category: "FOUNDATIONS", read: "6 min read",
    summary: "Discover the vision behind DeepSynaps AI Lab, NERVE and human-centred adaptive intelligence.",
    sections: [
      { heading: "AWIM research model", paragraphs: [
        "DeepSynaps AI Lab calls this proposed architecture AWIM (Adaptive World Intelligence Model). NERVE is the agent coordination layer, while WorldCore is the proposed action-conditioned predictive engine. Brain, Bio, Mind and Body Twins supply specialised representations that can inform the broader DeepTwin.",
        "The technical design proposes specialist agents in the NERVE Agent Network, Adaptive Memory System, a structured decision evaluation engine and Quantum Research Layer as an optional quantum experimentation gateway. These are architectural choices to implement and benchmark, not proof of production integration or exceptional speed."
      ]},
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
    title: "How the AWIM Learning Loop Works",
    subtitle: "A guided tour from raw signals to human-supervised decisions and learning.",
    category: "ARCHITECTURE", read: "8 min read",
    summary: "Follow the sensing, analyser, twin, agent, simulation and feedback pipeline.",
    sections: [
      { heading: "Where WorldCore and Quantum Research Layer enter the loop", paragraphs: [
        "In AWIM, WorldCore must learn an action-conditioned state-transition model: given current state, possible action and context, it estimates what may happen next and communicates uncertainty. This predictive step separates a genuine world-model research programme from a simple workflow orchestrator.",
        "Lightweight local pathways should handle time-critical sensor and safety events; NERVE specialist agents coordinate more complex reasoning. Typed decision intelligence may assist routing, with hard permission checks enforced separately. Memory updates in controlled knowledge stores and secure event stores are reviewed, while model-weight changes undergo evaluation and controlled release. Quantum Research Layer can benchmark selected optimisation tasks through classical simulators and cloud quantum providers, not real-time control."
      ]},
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
    title: "Which AI Models Power AWIM?",
    subtitle: "Why DeepSynaps is designed as a model-agnostic network of specialist agents.",
    category: "AI MODELS", read: "7 min read",
    summary: "Explore agent-based orchestration, language models, signal processing, digital twins and evaluators.",
    sections: [
      { heading: "AWIM: runtime, models and evaluation are different layers", paragraphs: [
        "AWIM is not a single new Transformer, CNN or foundation model. CNNs, Transformers, temporal/state-space models, GNNs and spiking networks are candidate numerical models inside sensory analysers or WorldCore. The proposed NERVE specialist agents coordinate tasks, tools and evidence; they are neuron-inspired software units, not literal neurons or learned CNN weights.",
        "The system design includes per-agent specialist agent runtime profiles, inspectable adaptive knowledge, a secure event and retrieval store, a candidate fast decision evaluator and deterministic safety gates. WorldCore research investigates predictive dynamics; Quantum Research Layer experimentally benchmarks specialised quantum optimisation against strong classical alternatives. Model choice, speed and accuracy remain empirical questions."
      ]},
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
      { heading: "Applications through AWIM", paragraphs: [
        "AWIM provides a common research architecture across applications: authorised sensors feed specialised analysers, digital-twin representations, predictive WorldCore dynamics and NERVE's Specialist Agent Network. Memory and evidence help agents respond in context, while decision intelligence and independent safeguards support routing and verification.",
        "Clinical Intelligence OS is a current DeepSynaps application context, but a validated autonomous AWIM-based clinical decision system has not been demonstrated. Wellness and robotics are potential expansion domains. Quantum Research Layer may be investigated for scheduling and research optimisation on cloud quantum research platforms, without promising general quantum acceleration or neuron-speed autonomous learning."
      ]},
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
  },
  {
    slug: "inter-agency-collaborative-working",
    title: "What Is Inter-Agency Collaborative Working?",
    subtitle: "How different professionals, organisations and intelligent agents can work together around shared goals.",
    category: "COLLABORATION", read: "8 min read",
    summary: "A practical guide to coordinated working across healthcare, education, social care and the DeepSynaps NERVE architecture.",
    sections: [
      { heading: "Inter-agency principles inside AWIM", paragraphs: [
        "The proposed AWIM architecture applies the collaboration analogy through specialist NERVE agents with explicit responsibilities, typed messages, evidence provenance and limited tool permissions. Adaptive knowledge repositories make approved lessons inspectable; WorldCore predicts hypothetical transitions; typed decision evaluation may rank routing options. These computational agents do not have professional duties or authority equivalent to clinicians, teachers or social workers.",
        "Collaboration quality should be measured against single-agent and fixed-routing baselines. Quantum Research Layer quantum experiments are an optional compute service and do not remove the need for privacy, safeguarding, multidisciplinary review or robust classical systems."
      ]},
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
  {
    slug: "nerve-awim-adaptive-world-intelligence-research",
    title: "AWIM: A Bio-Inspired Adaptive World Intelligence Architecture",
    subtitle: "An academic research proposal for multimodal world modelling, agent collaboration and controlled self-adaptation.",
    category: "RESEARCH PAPER", read: "15 min read",
    summary: "A formal architecture and research agenda for Hermes agents, persistent memory, typed decisions, predictive world models and optional hybrid quantum computation.",
    sections: [
      { heading: "Abstract", paragraphs: [
        "We introduce AWIM (Adaptive World Intelligence Model), a proposed modular architecture coupling multimodal sensory encoders, action-conditioned world dynamics, specialist software agents, persistent memory and verifiable decision policies. NERVE orchestrates heterogeneous reasoning and perception modules; WorldCore estimates future environmental states; a memory system supports episodic and procedural adaptation; and optional quantum services are investigated for bounded optimisation tasks. We distinguish short-timescale context adaptation from validated model-weight updates and define falsifiable hypotheses concerning predictive performance, agent coordination, decision latency, reliability and computational cost. This document describes a research programme, not an empirically validated new foundation model or a deployed medical device."
      ]},
      { heading: "1. Motivation and related work", paragraphs: [
        "Transformers have become a foundation for language and multimodal sequence modelling [1]. Model-based reinforcement learning demonstrates how learned world dynamics can support planning: Ha and Schmidhuber's World Models [2] and DreamerV3 [3] are important reference points. AWIM does not claim to invent learned world models, multi-agent systems or persistent memory; its research hypothesis concerns the coordination of those components under explicit safety, provenance and performance constraints.",
        "The central distinction is between numerical neurons inside learned networks and independently executing software agents. Hermes-based agents may invoke CNNs, Transformers and other models, but the agent network itself is not mathematically equivalent to a CNN or biological neural circuit. The novelty of a combined system must be tested against strong monolithic and modular baselines."
      ]},
      { heading: "2. Architecture and information flow", paragraphs: [
        "At time t, sensory observations o_t are validated, time-aligned and embedded by modality-specific encoders. A fusion and state-estimation module constructs a latent state z_t. WorldCore models p_theta(z_(t+1) | z_t, a_t, c_t), where a_t is an action and c_t is authorised context. Agent networks retrieve evidence, reason about candidate actions, invoke simulators and submit structured recommendations to a decision gate.",
        "NERVE contains a typed message bus, event-driven agent activation, capability and permission registers, deadline-aware scheduling, evaluators and audit records. Candidate agents run on Hermes-style runtime profiles with restricted tools. A deterministic policy layer remains authoritative for disallowed actions, emergency stops and clinical escalation; neither a language model nor a judge score can override hard restrictions."
      ]},
      { heading: "3. Multimodal sensing and perception", paragraphs: [
        "Inputs can include EEG and other neural recordings, physiological sensors, images, audio, movement, environmental measurements and robotics telemetry, subject to explicit authorisation and purpose limitations. Preprocessing includes calibration checks, missingness detection, clock synchronisation, artefact rejection and provenance capture. CNNs, Transformers, recurrent/state-space networks and graph models are alternative components to benchmark rather than compulsory ingredients.",
        "Dynamic activation aims to avoid sending every event to every agent. High-rate control and reflex tasks remain on deterministic or small local models. Deliberative Hermes agents operate asynchronously so cloud inference delays do not compromise real-time robotics safety."
      ]},
      { heading: "4. WorldCore: predictive dynamics and uncertainty", paragraphs: [
        "A world model needs more than a descriptive digital twin: it must estimate action-conditioned transitions, predict future observations and quantify uncertainty. WorldCore includes a state encoder, stochastic transition model, observation decoder and optional reward/objective estimator. Multi-step rollouts support model-predictive planning with explicit horizon, cost and safety constraints.",
        "Digital twins such as Brain, Bio, Mind and Body views can supply domain-specific state representations; their predictions must be calibrated against held-out longitudinal observations. Where causal identification is not established, simulated scenarios must not be represented as causal treatment effects."
      ]},
      { heading: "5. Hermes agent networks and inter-agent collaboration", paragraphs: [
        "Agent roles include sensory validation, perception, evidence retrieval, prediction, simulation, memory, planning, inhibition, verification and authorised execution. Each agent has an input/output schema, tool capabilities, time budget, identity, owner, access scope and evaluation policy. Task-specific subgraphs can be assembled according to relevance and computational cost. Parallelism is possible where dependencies allow, but multi-agent overhead must be measured.",
        "Inter-agency working in healthcare and education provides a useful organisational analogy: specialists combine partial perspectives without relinquishing accountability. Human agencies and AI software agents are not equivalent; licensed professionals retain responsibility for real clinical decisions."
      ]},
      { heading: "6. Memory and controlled adaptation", paragraphs: [
        "The architecture separates working memory, episodic event history, semantic knowledge, procedural skills and world-state history. Obsidian-compatible Markdown vaults provide inspectable research and skill documentation, while secure data stores handle access-controlled events, clinical records and embeddings. Personal clinical data should not be written into shared Markdown vaults. Hermes runtime memory is a separate operational facility.",
        "Four timescales are proposed: A, reflexive selection of prevalidated responses; B, retrieval- and memory-based adaptation; C, evaluated changes in routing and agent collaboration; and D, offline or otherwise controlled retraining and deployment of model parameters. Learning updates should be versioned, tested for regression and reversible. Continuous adaptation is not a licence for uncontrolled self-modification."
      ]},
      { heading: "7. Typed decision evaluation and safety", paragraphs: [
        "A fast structured classifier or judge such as Jev may route events by relevance, uncertainty and required escalation. Its speed and calibration must be measured relative to deterministic rules, smaller learned classifiers and other models. Agreement among agents is not proof of correctness, particularly when they share training data or retrieved sources.",
        "Safety controls include deterministic permission checks, least-privilege tool access, protected execution boundaries, timeouts, human review, uncertainty thresholds, audit logs, fail-safe states and healthcare-specific clinical governance. The architecture is initially intended for simulation and research workflows."
      ]},
      { heading: "8. NERVE-Q: experimental quantum acceleration", paragraphs: [
        "Quantum processing is an optional remote accelerator, not a substitute for low-latency edge control or general-purpose language-model inference. Candidate experiments include bounded combinatorial agent scheduling and resource allocation. Each formulation must be measured against strong classical solvers for objective quality, wall-clock time, queue time, energy where measurable and total cost.",
        "Amazon Braket supports managed simulators, QPUs and Hybrid Jobs [5]. Azure Quantum provides access to quantum workflows and resource-estimation capabilities [6]. Variational quantum algorithms have significant noise, trainability and scaling limitations [4]. No general quantum speedup for NERVE agent reasoning, instant learning or neuron-speed decisions is claimed."
      ]},
      { heading: "9. Research hypotheses and benchmarks", paragraphs: [
        "H1: Dynamic agent collaboration improves task quality versus single-agent and fixed-graph baselines. H2: Episodic and procedural memory reduces adaptation samples without increasing hallucination or privacy failures. H3: Typed routing improves decision-quality-adjusted latency versus alternative routers. H4: Action-conditioned WorldCore planning improves cumulative reward and predictive calibration versus reactive policies. H5: Adaptive agent topology improves compute efficiency. H6: On selected optimisation instances, quantum methods can be benchmarked fairly against competitive classical solvers.",
        "Pre-register evaluation tasks and ablations. Report task accuracy, held-out transition error, calibration, success rate, failure rate, p50/p95/p99 response latency, cost per completed task, energy where instrumented, memory contamination, unsafe-action incidence and robustness to missing sensors. Reproduce experiments over multiple random seeds and disclose all hardware, model versions and dataset constraints."
      ]},
      { heading: "10. Implementation and reproducibility", paragraphs: [
        "A phased reference implementation should begin with synthetic sensor streams, typed agent interfaces, deterministic routing, memory retrieval and a small learned state-transition model. Next, add Hermes runtime adapters, independent evaluations and world-model baselines. The quantum adapter should start with simulators and publicly reproducible scheduling instances before any cloud QPU experiments.",
        "Public releases should include architecture decisions, citations, experiment configuration, unit tests, simulated datasets, benchmark scripts and a clear research-only licence and safety notice. Research involving real patient data requires lawful governance, privacy protections, approvals and separate secure infrastructure."
      ]},
      { heading: "11. Limitations and conclusion", paragraphs: [
        "Bounded repository-task and synthetic-dynamics experiments are available, but these do not demonstrate general-purpose world understanding, biological-neuron-equivalent latency, quantum advantage or autonomous clinical efficacy. Potential failure modes include correlated agent mistakes, unpredictable latency, memory poisoning, model drift and misleading simulation outputs.",
        "AWIM is presented as a falsifiable systems hypothesis: an orchestrated, multimodal, memory-augmented world model may improve adaptability and robustness when its components are selected carefully, externally evaluated and constrained by appropriate governance. Its status as a distinct scientific contribution depends on experimental evidence rather than naming."
      ]},
      { heading: "References", paragraphs: [
        "[1] Vaswani, A. et al. (2017). Attention Is All You Need. Advances in Neural Information Processing Systems. https://arxiv.org/abs/1706.03762",
        "[2] Ha, D. and Schmidhuber, J. (2018). World Models. https://arxiv.org/abs/1803.10122",
        "[3] Hafner, D., Pasukonis, J., Ba, J. and Lillicrap, T. (2023). Mastering Diverse Domains through World Models. https://arxiv.org/abs/2301.04104",
        "[4] Cerezo, M. et al. (2021). Variational Quantum Algorithms. Nature Reviews Physics 3, 625–644. https://doi.org/10.1038/s42254-021-00348-9",
        "[5] Amazon Web Services. Amazon Braket Developer Guide, Hybrid Jobs. https://docs.aws.amazon.com/braket/latest/developerguide/braket-jobs.html",
        "[6] Microsoft. Azure Quantum documentation. https://learn.microsoft.com/azure/quantum/"
      ]}
    ]
  },
]; 


const newArticles: Article[] = [
  {
    "slug": "how-awim-memory-and-skills-work",
    "title": "How AWIM Remembers: Experience, Knowledge and Skills",
    "subtitle": "Why useful memory needs context, evidence and a way to forget.",
    "category": "MEMORY",
    "read": "",
    "summary": "Understand working memory, experience records, knowledge and reusable skills, and how they support the next task.",
    "sections": [
      {
        "heading": "Memory has more than one job",
        "paragraphs": [
          "An agent can produce a convincing answer and still repeat the same mistake tomorrow. AWIM explores how relevant experience can remain available across tasks, while preserving where that experience came from and when it should be trusted. The aim is selective reuse: bring back what helps with the current situation.",
          "The design separates working memory for an active task, episodic records of what happened, semantic knowledge about a domain, and procedural skills describing how to do something. World-state history is another distinct resource: it tracks how observations change over time. Keeping these roles separate makes retrieval and review easier to understand."
        ]
      },
      {
        "heading": "What a useful experience record contains",
        "paragraphs": [
          "Consider a software agent asked to list functions in a source file. A useful record describes the task, the chosen tool, the result and the independent check. It might say that a text-pattern method missed nested functions while a syntax-tree tool produced a complete inventory. That lesson is about a particular task and language; it should not become a rule that one tool is always better.",
          "An AWIM experience should therefore retain its scope, timestamp, source, relevant version and evaluation outcome. A failed attempt can be valuable if it explains when a method breaks. An unverified conclusion should remain labelled as unverified instead of quietly becoming trusted knowledge."
        ]
      },
      {
        "heading": "Retrieval is a decision, too",
        "paragraphs": [
          "When a new task arrives, NERVE should retrieve experiences that match the task and the authorised context. Similar wording alone may be insufficient: a different software version, sensor quality or operating environment can make an old lesson unsuitable. Relevance, recency and quality all need evaluation.",
          "Retrieval should also respect ownership and retention boundaries. A memory belonging to one organisation must not be available to another just because their questions sound alike. Updating or deleting the original information needs a corresponding process for its derived memories and search indexes."
        ]
      },
      {
        "heading": "When experience becomes a skill",
        "paragraphs": [
          "A skill is a reusable procedure with a defined purpose, required inputs, expected outputs and known limits. One successful attempt can suggest a candidate skill, but it is weak evidence for adopting it broadly. The proposal should be checked on new tasks, compared with the existing procedure and rejected if it creates regressions.",
          "Memory and model training are different mechanisms. Retrieving an experience changes the context supplied to an agent. Adopting a tested procedure changes how work is performed. Updating a neural model changes its learned parameters. Each mechanism needs its own evaluation and release process."
        ]
      },
      {
        "heading": "What exists today",
        "paragraphs": [
          "As reviewed on 11 October 2026, the public NERVE repository describes NERVE Learn as a local, opt-in developer preview using SQLite experience storage and MCP tools for recording tasks, retrieving experience, rating outcomes and proposing lessons. Caller-supplied agent identifiers provide scoping but do not, by themselves, authenticate a user.",
          "This is a practical starting point for memory experiments. It is not proof of general agent improvement, automatic LLM retraining or a production clinical memory service. The next useful question is whether the same agent, given the same tools and budget, performs better on held-out tasks with this memory than without it."
        ]
      }
    ],
    "sources": [
      {
        "label": "NERVE research repository and implementation status",
        "url": "https://github.com/ALIYILD/NERVE"
      }
    ]
  },
  {
    "slug": "digital-twins-deeptwin-and-worldcore",
    "title": "Digital Twins, DeepTwin and WorldCore: What Is the Difference?",
    "subtitle": "Represent what is happening, then test what might happen next.",
    "category": "WORLD MODELS",
    "read": "",
    "summary": "Separate observations, evolving representations and action-conditioned predictions in AWIM.",
    "sections": [
      {
        "heading": "Three questions, three responsibilities",
        "paragraphs": [
          "AWIM separates three questions: what have we observed, how do those observations fit together, and what might happen after a possible action? An analyzer helps organise an observation. A digital twin maintains a representation of a particular person or system. WorldCore is the research component concerned with predicting how a represented state could change.",
          "This distinction matters because a rich dashboard is not automatically a predictive world model. Likewise, a prediction about the next observation does not automatically explain the cause of that change. The interface should keep these different kinds of information visible."
        ]
      },
      {
        "heading": "Specialist twins and the DeepTwin",
        "paragraphs": [
          "In the healthcare vision, Brain, Bio, Mind and Body Twins are specialist views of relevant information. A Brain Twin could organise neurophysiological observations, while a Body Twin could incorporate movement and functional measurements. The precise inputs and capabilities depend on the application and its validation.",
          "DeepTwin is the proposed integrated representation that connects these perspectives. It should preserve timestamps, missing information, conflicting evidence and uncertainty instead of compressing everything into an apparently certain score. It is a computational representation with limits, not a complete digital copy of a human being."
        ]
      },
      {
        "heading": "WorldCore asks what changes after an action",
        "paragraphs": [
          "A predictive model takes a current state, context and a candidate action and estimates a future state or observation. Repeating that step allows a system to explore a sequence of possible outcomes. In a synthetic movement task, for example, the model might estimate the next position from sensor observations and a proposed control input.",
          "World Models and Dreamer research provide relevant foundations for investigating learned environment dynamics and planning. These are prior research contributions, not evidence that AWIM has reproduced their results. AWIM must establish its own performance through explicit experiments and comparisons."
        ]
      },
      {
        "heading": "Simulation needs an uncertainty story",
        "paragraphs": [
          "A simulated outcome inherits the assumptions and limitations of the model that generated it. Longer rollouts can accumulate error; unfamiliar environments can invalidate learned relationships. A useful comparison should show the prediction horizon, data quality and the conditions under which the model was evaluated.",
          "For a hypothetical healthcare scenario, an association in historical records cannot by itself establish what a treatment would cause for an individual. Such a scenario belongs in a carefully bounded research or decision-support workflow with domain evaluation. It should not be presented as a guaranteed future."
        ]
      },
      {
        "heading": "From a small demonstrator to measured research",
        "paragraphs": [
          "The learning demo on this website uses a predefined reward table and two actions. It explains feedback-based action selection; it does not train a physical world model. The NERVE repository separately contains synthetic sensor, state-estimation and planning experiments with documented limitations.",
          "The research goal is to connect representation, prediction and action while testing each contribution. Useful checks include held-out prediction error, calibration, performance when sensors are missing, and whether planning actually improves the task outcome over a capable reactive baseline."
        ]
      }
    ],
    "sources": [
      {
        "label": "NERVE research repository and implementation status",
        "url": "https://github.com/ALIYILD/NERVE"
      },
      {
        "label": "Ha and Schmidhuber: World Models",
        "url": "https://arxiv.org/abs/1803.10122"
      },
      {
        "label": "Hafner et al.: Mastering Diverse Domains through World Models",
        "url": "https://arxiv.org/abs/2301.04104"
      }
    ]
  },
  {
    "slug": "how-awim-tests-self-improvement",
    "title": "How AWIM Tests Self-Improvement",
    "subtitle": "Propose, evaluate, retain: why an improvement loop must be allowed to reject a change.",
    "category": "EVALUATION",
    "read": "",
    "summary": "Follow a candidate improvement from task feedback to held-out evaluation, a controlled trial and a release decision.",
    "sections": [
      {
        "heading": "Begin with a measurable task",
        "paragraphs": [
          "Self-improvement is useful only when we can say what improved, compared with what, and on which tasks. For AWIM, a bounded starting point is a repeatable agent task with an independently checkable result. A source-code inventory task is easier to evaluate than an open-ended claim that a system has become more intelligent.",
          "Before changing anything, establish a capable baseline and a measurement plan. Task correctness, completion rate, latency and cost may matter differently. An improvement in one metric can hide a regression in another, so the acceptance criteria should be defined before inspecting candidate results."
        ]
      },
      {
        "heading": "Generate a candidate without changing the active system",
        "paragraphs": [
          "Feedback can suggest a different retrieval parameter, tool route or reusable procedure. The candidate should be recorded with its configuration and the evidence that motivated it. The active workflow continues using its existing configuration while the candidate is explored separately.",
          "This separation allows useful experimentation without treating every promising suggestion as a release. It also makes comparisons reproducible: a reviewer can identify exactly which configuration produced a result and reproduce the task using the original baseline."
        ]
      },
      {
        "heading": "Keep evaluation independent",
        "paragraphs": [
          "A candidate that performs well on the examples used to construct it may simply fit those examples. Reserved holdout tasks should remain outside candidate selection. Repeatedly consulting a holdout turns it into development feedback, so study design needs to control when those results are revealed.",
          "An evaluator should check actual task outputs wherever possible. A judge model can contribute, but an enthusiastic explanation or agreement between related agents is not sufficient evidence. Deterministic checks, task-specific metrics and human assessment each have distinct roles."
        ]
      },
      {
        "heading": "A negative result is progress",
        "paragraphs": [
          "The NERVE repository documents a source-file task where a learned tool route improved on an initial regex route but matched a capable fixed AST tool. A later cross-process check also reported matching baseline and candidate results and rejected the proposal. Those outcomes support a narrow tool-selection experiment, not a broad claim that learning outperforms strong fixed methods.",
          "The right response to a tie is to preserve the result and avoid promoting an unsupported improvement. In other experiments, a single learner may outperform a collection of specialists. Keeping those results visible helps determine when extra coordination is worth its complexity."
        ]
      },
      {
        "heading": "Controlled trial, monitoring and recovery",
        "paragraphs": [
          "The repository describes an opt-in canary controller for limited repository-task trials after a candidate passes its checks and an operator approves it. Candidate outputs are checked during the trial, failures fall back to the active behaviour, and full promotion requires a separate decision.",
          "As reviewed on 11 October 2026, this remains a local research API rather than a live Clinical OS or external LLM integration. The broader AWIM objective is persistent learning from real task outcomes with explicit evaluation, monitoring and reversible releases. These controls define how improvement should be demonstrated; they do not guarantee that a candidate will improve."
        ]
      }
    ],
    "sources": [
      {
        "label": "NERVE research repository and implementation status",
        "url": "https://github.com/ALIYILD/NERVE"
      },
      {
        "label": "NERVE governed outcome-learning design",
        "url": "https://github.com/ALIYILD/NERVE/blob/main/docs/governed-outcome-learning-v20.md"
      },
      {
        "label": "NERVE canary-learning controller",
        "url": "https://github.com/ALIYILD/NERVE/blob/main/docs/canary-learning-v23.md"
      }
    ]
  },
  {
    "slug": "awim-and-clinical-intelligence-os",
    "title": "AWIM and Clinical Intelligence OS",
    "subtitle": "How the lab’s research vision connects to a practical healthcare workspace.",
    "category": "HEALTHCARE",
    "read": "",
    "summary": "Understand the relationship between DeepSynaps AI Lab, AWIM, NERVE and Clinical Intelligence OS.",
    "sections": [
      {
        "heading": "The lab, the architecture and the application",
        "paragraphs": [
          "DeepSynaps AI Lab is the research organisation developing AWIM, the Adaptive World Intelligence Model. AWIM describes the broader architecture for sensing, representation, prediction, agent coordination and evaluated feedback. NERVE is its specialist agent coordination layer. Clinical Intelligence OS is the first healthcare application of the DeepSynaps vision.",
          "These names describe different responsibilities. A research component can be under evaluation while an application already provides useful workflows. An application should communicate the capabilities available in that deployment rather than implying that every element of the long-term research architecture is active."
        ]
      },
      {
        "heading": "Start with a connected patient view",
        "paragraphs": [
          "Clinical information often arrives in different formats and at different times. The product vision brings records, measurements and specialist outputs into one view with their sources visible. EEG, cognitive assessments, biomarkers and wearable observations offer different kinds of context; combining them requires attention to timing, quality and missing data.",
          "Imagine a clinician reviewing follow-up information alongside an earlier assessment. The useful first step is to see what changed, which measurement supports that observation, and what information is still missing. A clear record of evidence can be valuable before a system makes any prediction."
        ]
      },
      {
        "heading": "Specialist agents support focused work",
        "paragraphs": [
          "Within the AWIM vision, different agents can have focused responsibilities: checking signal quality, organising evidence, retrieving relevant reference material, preparing a report or comparing recorded outcomes. NERVE coordinates those contributions and preserves their provenance.",
          "The clinician needs to understand where a statement came from and whether it is an observation, an interpretation or a proposed next step. Patient-facing explanations should translate the same underlying information into accessible language without creating a different set of facts."
        ]
      },
      {
        "heading": "Twins and studios connect context to workflows",
        "paragraphs": [
          "Brain, Bio, Mind and Body Twins provide the proposed specialist representations, with DeepTwin connecting the broader context. The product roadmap links this information to studios for neuromodulation, medication, mental health and rehabilitation. Readiness should be communicated separately for each capability.",
          "The aim is to help professionals examine options with the relevant information in view. A simulated scenario is a model-dependent hypothesis. Diagnosis, treatment and patient-specific decisions remain with qualified clinicians and the applicable care workflow."
        ]
      },
      {
        "heading": "Feedback without overstating deployment",
        "paragraphs": [
          "Outcome review can support better workflows: did the report answer the intended question, was a source missing, did a proposed process work as expected? Those are different feedback signals from evidence that a clinical intervention is effective. Each needs an appropriate evaluation method.",
          "As reviewed on 11 October 2026, the public NERVE research repository explicitly states that its repository-task shadow learning and canary controller are not wired to live Clinical OS traffic. This distinction matters. Clinical Intelligence OS expresses the application vision; the general AWIM learning stack remains a programme of bounded implementation and evaluation."
        ]
      },
      {
        "heading": "What visitors can explore next",
        "paragraphs": [
          "Clinicians can explore Clinical Intelligence OS to understand its available workspace. Researchers can examine the AWIM architecture, technical proposal and NERVE repository. Developers can follow the memory and evaluation articles to understand the interfaces and experiments behind the research.",
          "The shared ambition is practical: keep patient information connected, keep evidence traceable and help professionals make informed decisions. The lab’s role is to investigate which adaptive capabilities add measurable value to that ambition."
        ]
      }
    ],
    "sources": [
      {
        "label": "NERVE research repository and implementation status",
        "url": "https://github.com/ALIYILD/NERVE"
      },
      {
        "label": "DeepSynaps Clinical Intelligence OS",
        "url": "https://app.deepsynaps.com/"
      }
    ]
  }
];

export const articles: Article[] = [
  existingArticles[0], existingArticles[1], existingArticles[2], existingArticles[4],
  newArticles[0], newArticles[1], newArticles[2], newArticles[3],
  existingArticles[3], existingArticles[5],
].map(article => ({
  ...article,
  read: `${Math.max(2, Math.ceil(article.sections.flatMap(section => section.paragraphs).join(" ").split(/\s+/).length / 200))} min read`,
}));
