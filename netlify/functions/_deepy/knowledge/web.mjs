/**
 * What deepsynaps.ai actually says.
 *
 * Every line below is transcribed or condensed from the site's own source:
 * `src/sections/*.tsx` (home), `src/pages/About.tsx`, `src/pages/Academy.tsx`,
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

export const summary =
  'DeepSynaps is an interdisciplinary AI and neuroscience organisation led by Dr. Ali Yildirim, '
  + 'based in the United Kingdom. It partners with clinics and researchers on AI protocol development, '
  + 'neuromodulation consultation, QEEG brain-map review and clinic integration, and it runs three '
  + 'divisions: DeepSynaps OS (the clinical platform), DeepSynaps Lab (research) and DeepSynaps Academy (training).';

export const pages = Object.freeze([
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/academy', label: 'Academy' },
  { path: '/consultations', label: 'Consultations and services' },
  { path: '/privacy', label: 'Privacy notice' },
]);

export const entries = Object.freeze([
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
    title: 'About DeepSynaps and Dr. Ali Yildirim',
    keywords: ['about', 'who', 'founder', 'ali', 'yildirim', 'team', 'company', 'organisation', 'organization', 'where', 'based', 'uk'],
    body:
      'DeepSynaps is an interdisciplinary AI and neuroscience organisation led by Dr. Ali Yildirim, Founder '
      + 'and Clinical Director, based in the United Kingdom. It partners with clinics and researchers to '
      + 'develop AI protocols, design neuromodulation interventions and review brain-map data. The site '
      + 'describes the starting observation as a tooling problem rather than a knowledge problem: the gap '
      + 'between what neuroscience knows and what an average clinic can deliver. Full detail is on /about.',
  },
  {
    id: 'principles',
    title: 'How DeepSynaps works',
    keywords: ['principle', 'principles', 'values', 'how you work', 'evidence', 'transparent', 'safety', 'governance'],
    body:
      'Four stated principles. Patient-first: every protocol and feature is judged against whether it helps '
      + 'the patient. Evidence-graded: recommendations are anchored in published evidence and explicitly '
      + 'graded, never inflated. Clinician-led: AI tools support clinicians and do not diagnose, prescribe or '
      + 'replace clinical judgment. Transparent: when the system is uncertain it says so, when data is '
      + 'degraded it shows it, and demo features are labelled.',
  },
  {
    id: 'ecosystem',
    title: 'The three divisions',
    keywords: ['ecosystem', 'division', 'divisions', 'pillar', 'pillars', 'os', 'lab', 'academy', 'structure'],
    body:
      'DeepSynaps operates through three integrated divisions. DeepSynaps OS is clinical intelligence '
      + 'infrastructure for neurotechnology clinics: evidence-aware workflows, protocol support, digital '
      + 'brain systems and clinical decision support. DeepSynaps Lab is research and innovation in '
      + 'computational neuroscience, neuromorphic computing, qEEG, digital twins and brain-inspired '
      + 'architectures, with its own site at deepsynapslab.com. DeepSynaps Academy is education, training and '
      + 'professional learning, with its own site at deepsynapsacademy.com.',
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
    title: 'DeepSynaps Lab research themes',
    keywords: ['lab', 'research', 'neuromorphic', 'chip', 'chips', 'hac', 'photonic', 'computational neuroscience', 'collaborate'],
    body:
      'DeepSynaps Lab is the research arm. Its themes are neuromorphic computing, brain-inspired AI, '
      + 'computational neuroscience, digital brain systems, human-AI interfaces and neurotechnology '
      + 'innovation. The Lab has its own site at deepsynapslab.com covering the Hybrid AI Chip (HAC) '
      + 'programme in detail.',
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
    title: 'Who DeepSynaps works with',
    keywords: ['who is it for', 'clinic', 'clinics', 'hospital', 'researcher', 'clinician', 'doctor', 'engineer', 'suitable'],
    body:
      'The site describes the work as being for neuromodulation practices, research labs and digital-health '
      + 'teams, and the Academy as being for clinicians, clinics and hospitals, researchers, and engineers '
      + 'and builders. A single clinician, a small clinic or a large institution are all named as intended '
      + 'users of the stack.',
  },
  {
    id: 'mission',
    title: 'Mission and vision',
    keywords: ['mission', 'vision', 'why', 'purpose', 'believe', 'goal'],
    body:
      'The stated mission is to connect artificial intelligence, neuroscience, clinical systems, '
      + 'neurotechnology and cognitive computing into a unified framework for advancing human understanding '
      + 'and clinical capability. The strategic focus covers six domains: clinical intelligence, neuroscience '
      + 'infrastructure, brain-inspired computing, human-centered neurotechnology, AI research, and education '
      + 'and training.',
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
