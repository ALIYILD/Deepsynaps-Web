/**
 * What deepsynaps.ai actually says.
 *
 * Every line below is transcribed or condensed from the site's own source:
 * `src/pages/AILab.tsx`, `src/data/lab.ts`, `src/pages/Academy.tsx`,
 * `src/pages/Consultations.tsx` and `src/components/Footer.tsx`. Nothing is
 * added. There are no prices, no dates, no credentials and no clinical claims
 * here because there are none on those pages, and the assistant may only say
 * what the site says.
 *
 * `keywords` is not SEO. It is the no-model fallback: when no provider key is
 * configured the function matches the visitor's words against these lists and
 * returns the entry's body verbatim, so the widget still answers from reviewed
 * copy instead of apologising.
 */

export const title = 'DeepSynaps — deepsynaps.ai';

export const summary = "DeepSynaps AI Lab is based in the United Kingdom and develops adaptive intelligence through sensory understanding, specialist agents and shared learning. Its proposed architecture connects sensory inputs, analyzers, digital twins and NERVE. Clinical Intelligence OS is its first application; the ecosystem also includes chip design, Perfflux, Peak Performance and Academy.";

export const pages = Object.freeze([
  { path: '/', label: 'Home' },
  { path: '/about', label: 'The Lab' },
  { path: '/research', label: 'Research' },
  { path: '/nerve', label: 'NERVE' },
  { path: '/ecosystem', label: 'Ecosystem' },
  { path: '/academy', label: 'Academy' },
  { path: '/consultations', label: 'Consultations and services' },
  { path: '/privacy', label: 'Privacy notice' },
]);

export const entries = Object.freeze([
{
  "id": "nerve",
  "title": "NERVE and adaptive learning",
  "keywords": [
    "nerve",
    "adaptive",
    "agent",
    "agents",
    "memory",
    "memories",
    "self learn",
    "self improve",
    "world model",
    "physical ai",
    "sensory"
  ],
  "body": "NERVE is the proposed coordination layer for specialist agents, tools, memories and actions. Sensory inputs feed analyzers and digital twins; agents reason with that context, coordinate permitted actions and evaluate feedback. Useful experience can be retained as memories and skills and shared selectively. The network explorer on /nerve is illustrative, not a live intelligence system. Adaptive learning and physical AI are research directions; memory updates do not by themselves establish model-weight learning or validated autonomous improvement."
},
{
  "id": "perfflux",
  "title": "Perfflux",
  "keywords": [
    "perfflux",
    "infrastructure",
    "telemetry",
    "efficiency",
    "optimisation",
    "optimization"
  ],
  "body": "Perfflux focuses on AI infrastructure performance, telemetry and efficiency. Its areas of focus are infrastructure telemetry, performance and efficiency evaluation, and agent-assisted optimisation research. See /ecosystem/perfflux or email ali.yildirim@deepsynaps.com to discuss the current work."
},
  {
    id: 'services',
    title: 'Services you can book',
    keywords: ['service', 'services', 'offer', 'work with', 'help', 'consult', 'consultation', 'what do you do'],
    body:
      'DeepSynaps offers four services. AI Protocol Development: custom clinical AI protocols for '
      + 'neuromodulation, QEEG-guided care and decision support, built around your patient population and '
      + 'workflow. Neuromodulation Consultation: protocol design and second opinions for tDCS, TMS, rTMS, '
      + 'neurofeedback and combined modalities, evidence-graded and individualised. QEEG / Brain-Map Review: '
      + 'raw-data clinical workstation review, biomarker analysis and brain-map-driven protocol planning for '
      + 'complex cases. Clinic Integration: deploying DeepSynaps OS into your clinic, with workflow design, '
      + 'staff training and ongoing protocol governance. You can request any of these from /consultations.',
  },
  {
    id: 'booking',
    title: 'How to book or get in touch',
    keywords: ['book', 'booking', 'appointment', 'contact', 'get in touch', 'reach', 'talk to', 'speak', 'enquiry', 'inquiry', 'call'],
    body:
      'The consultation form on /consultations is the main way in. It asks for your name, email, phone or '
      + 'WhatsApp, organisation, which service you are interested in, a timeline and a short description of '
      + 'your case or project. The site says DeepSynaps responds within one business day. You can also email '
      + 'ali.yildirim@deepsynaps.com or message the team on WhatsApp, and I can pass a message to '
      + 'Dr. Ali Yildirim from this chat.',
  },
  {
    id: 'about',
    title: "About DeepSynaps AI Lab",
    keywords: ['about', 'who', 'founder', 'ali', 'yildirim', 'team', 'company', 'organisation', 'organization', 'where', 'based', 'uk'],
    body:
      "DeepSynaps AI Lab brings together research in adaptive intelligence, collaborative agents and brain-inspired computing. Based in the United Kingdom, its goal is to connect evaluated experience with action. Clinical Intelligence OS is the first application. See /about and /research, or contact Dr. Ali Yildirim at ali.yildirim@deepsynaps.com.",
  },
  {
    id: 'principles',
    title: "How DeepSynaps works",
    keywords: ['principle', 'principles', 'values', 'how you work', 'evidence', 'transparent', 'safety', 'governance'],
    body:
      "The lab describes three principles: keep sources visible, evaluate improvement, and keep people in control. Signals, interpretations and predictions remain distinct. Outcomes should be evaluated before experience becomes reusable learning. Meaningful actions need defined permissions and review points. See /about.",
  },
  {
    id: 'ecosystem',
    title: "The DeepSynaps ecosystem",
    keywords: ['ecosystem', 'division', 'divisions', 'pillar', 'pillars', 'os', 'lab', 'academy', 'structure'],
    body:
      "The ecosystem includes DeepSynaps Chip Design Lab, Clinical Intelligence OS, Perfflux for AI infrastructure performance and telemetry, Peak Performance, and Academy. Regional operations include DeepSynaps T\u00fcrkiye. Niraxx and SyncWell are presented as neurotechnology and biometric platform initiatives. See /ecosystem for each area.",
  },
  {
    id: 'os',
    title: 'DeepSynaps OS',
    keywords: ['os', 'platform', 'software', 'product', 'workflow', 'decision support', 'digital twin', 'integration'],
    body:
      'DeepSynaps OS is a clinical intelligence platform for evidence-aware neurotechnology workflows. The '
      + 'site lists clinical workflow support, protocol drafting, evidence organisation, brain mapping tools, '
      + 'qEEG and neurodata infrastructure, digital twin concepts, and audit-ready decision support. The site '
      + 'also states plainly that DeepSynaps OS is designed for clinical decision support and workflow '
      + 'assistance only: it does not diagnose, prescribe, replace clinicians, or provide emergency triage.',
  },
  {
    id: 'lab',
    title: "Chip Design Lab",
    keywords: ['lab', 'research', 'neuromorphic', 'chip', 'chips', 'hac', 'photonic', 'computational neuroscience', 'collaborate'],
    body:
      "DeepSynaps Chip Design Lab explores brain-inspired chip architectures, sensory processing, efficient compute, and hardware and software co-design. This is a research programme, not an announcement of fabricated or commercially available chips. See /ecosystem/chip-design and the existing chip lab website at deepsynapslab.com.",
  },
  {
    id: 'academy',
    title: 'DeepSynaps Academy',
    keywords: ['academy', 'course', 'courses', 'training', 'learn', 'teach', 'seminar', 'workshop', 'cohort', 'certification', 'student'],
    body:
      'DeepSynaps Academy runs seminars, workshops, online courses and consultations across neuromodulation, '
      + 'clinical neuroscience, QEEG and brain mapping, AI in clinical practice, AI for clinics and hospitals, '
      + 'intelligent systems, neuromorphic computing, and quantum and frontier compute. It is built for '
      + 'clinicians, clinics and hospitals, researchers, and engineers and builders. The site says the first '
      + 'cohort is opening soon and that the seminar calendar, workshop dates and first online courses are '
      + 'being scheduled, so the way in is to register interest. See /academy or deepsynapsacademy.com.',
  },
  {
    id: 'audience',
    title: "Who DeepSynaps works with",
    keywords: ['who is it for', 'clinic', 'clinics', 'hospital', 'researcher', 'clinician', 'doctor', 'engineer', 'suitable'],
    body:
      "DeepSynaps AI Lab welcomes researchers, AI developers, hardware teams and partners working on intelligent systems. Clinical Intelligence OS supports clinicians, patients and developers. The Academy offers professional learning across AI, neuroscience and neurotechnology. For collaboration, email ali.yildirim@deepsynaps.com.",
  },
  {
    id: 'mission',
    title: "Mission and vision",
    keywords: ['mission', 'vision', 'why', 'purpose', 'believe', 'goal'],
    body:
      "DeepSynaps AI Lab is developing adaptive intelligence through sensory understanding, specialist agents and shared learning. The proposed loop connects signals, analyzers, twins, NERVE, action and evaluated feedback. Research directions include adaptive learning, collaborative agents, world models and physical AI, and chip design. Research directions are not claims of validated autonomous learning or deployed robotic capability.",
  },
  {
    id: 'limits',
    title: 'What this site does not do',
    keywords: ['diagnose', 'diagnosis', 'prescribe', 'emergency', 'medical advice', 'disclaimer', 'legal'],
    body:
      'DeepSynaps services and DeepSynaps OS are designed for clinical decision support and workflow '
      + 'assistance only. They do not diagnose, prescribe, replace clinicians, or provide emergency triage. '
      + 'The website and its contents are for informational purposes only and do not constitute medical advice.',
  },
  {
    id: 'privacy',
    title: 'Privacy and what happens to a message',
    keywords: ['privacy', 'data', 'gdpr', 'store', 'stored', 'delete', 'personal', 'confidential'],
    body:
      'The /privacy page explains what the contact form and this chat do with what you send: the details are '
      + 'used to reply to you and are not sold or used for advertising. The consultation form asks you not to '
      + 'include patient identifiers, and says a secure channel is arranged for clinical detail. To have your '
      + 'details deleted, email ali.yildirim@deepsynaps.com.',
  },
]);
