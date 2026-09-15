/**
 * What deepsynapsacademy.com actually says.
 *
 * Transcribed from `academy-site/index.html`, the page that is deployed to that
 * domain, and cross-checked against `src/pages/Academy.tsx`, which carries the
 * same eight tracks and four formats. The page states no price, no cohort date
 * and no certification body, so neither does anything below: the honest answer
 * to "when does it start" is that seats are not open yet and the list is how
 * you hear first.
 */

export const title = 'DeepSynaps Academy — deepsynapsacademy.com';

export const summary =
  'DeepSynaps Academy runs seminars, workshops, online courses and one-to-one consultations on '
  + 'neuromodulation, neuroscience, clinical AI, intelligent systems, and neuromorphic and quantum compute. '
  + 'It is clinician-led and evidence-graded, taught in small cohorts, live and self-paced. The first cohort '
  + 'is opening soon and the way in is the notify list.';

export const pages = Object.freeze([
  { path: '#formats', label: 'Formats' },
  { path: '#tracks', label: 'Topic tracks' },
  { path: '#audience', label: "Who it's for" },
  { path: '#signup', label: 'Get notified' },
]);

export const entries = Object.freeze([
  {
    id: 'formats',
    title: 'Four ways to learn',
    keywords: ['format', 'formats', 'seminar', 'workshop', 'online course', 'course', 'self-paced', 'live', 'mentoring', 'how do you teach'],
    body:
      'Four formats. Seminars: live online and in-person sessions on neuromodulation, clinical AI and applied '
      + 'neuroscience, with Q&A, case discussion and clinician-led teaching, described as live and monthly. '
      + 'Workshops: hands-on training in QEEG analysis, protocol design, TMS / tDCS / neurofeedback and '
      + 'clinical AI implementation, in small groups with real datasets, described as intensive and '
      + 'cohort-based. Online Courses: self-paced curricula with video, reading, exercises and case work, '
      + 'foundations to advanced. Consultations: one-to-one mentoring and team consultations covering '
      + 'clinical case review, AI strategy for clinics and hospitals, and research direction.',
  },
  {
    id: 'tracks',
    title: 'The eight topic tracks',
    keywords: ['track', 'tracks', 'topic', 'topics', 'curriculum', 'syllabus', 'subject', 'teach', 'what do you teach'],
    body:
      'Eight tracks. Neuromodulation: tDCS, TMS, rTMS, neurofeedback, vagal and peripheral stimulation, '
      + 'protocol design, dosing, outcomes tracking. Clinical Neuroscience: functional neuroanatomy, network '
      + 'neuroscience, EEG/QEEG interpretation, biomarkers, lab-to-clinic translation. QEEG & Brain Mapping: '
      + 'raw data review, spectral analysis, connectivity, source localization, brain-map-guided decisions. '
      + 'AI in Clinical Practice: where AI helps and where it hurts, decision support, documentation, triage, '
      + 'safety governance, clinician oversight. AI for Clinics & Hospitals: workflow design, EHR integration, '
      + 'staff training, audit, compliance. Intelligent Systems: agents, retrieval, evaluation and reliable AI '
      + 'pipelines for healthcare and research. Neuromorphic Computing: spiking neural networks, event-driven '
      + 'hardware, brain-inspired architectures. Quantum & Frontier Compute: quantum computing primers, '
      + 'quantum-inspired methods, and where frontier compute meets neuroscience and AI.',
  },
  {
    id: 'audience',
    title: 'Who the Academy is for',
    keywords: ['who is it for', 'audience', 'clinician', 'doctor', 'psychologist', 'hospital', 'researcher', 'engineer', 'student', 'beginner', 'prerequisite'],
    body:
      'Four groups. Clinicians: doctors, psychologists, neurotechnicians and allied professionals integrating '
      + 'neuromodulation and AI into practice. Clinics and hospitals: teams adopting AI-supported workflows, '
      + 'QEEG-guided care or full neuromodulation programmes. Researchers: lab teams working on biomarkers, '
      + 'brain-inspired computing and translational neuroscience. Engineers and builders: people building '
      + 'clinical AI, neurotech, intelligent systems, or quantum and neuromorphic platforms. The page notes '
      + 'the teaching is clinician-led, evidence-graded, in small cohorts, live and self-paced.',
  },
  {
    id: 'cohort',
    title: 'When cohorts open and how to join',
    keywords: ['when', 'date', 'dates', 'start', 'schedule', 'calendar', 'enrol', 'enroll', 'sign up', 'signup', 'register', 'join', 'seat', 'seats', 'waitlist', 'notify'],
    body:
      'The first cohort is opening soon. The page does not publish dates: the seminar calendar, workshop '
      + 'dates and first online courses are still being scheduled. The way to hear first is the "Get notified" '
      + 'form on the page, which asks for your name, email, role, which format you want, the track you care '
      + 'about most, and anything else worth knowing. I can put you on that list from this chat as well.',
  },
  {
    id: 'price',
    title: 'Cost',
    keywords: ['price', 'pricing', 'cost', 'fee', 'fees', 'how much', 'payment', 'discount', 'free'],
    body:
      'The Academy page does not publish prices, and I will not guess one. Fees are set per format and per '
      + 'cohort, so the accurate answer is to ask Dr. Ali Yildirim directly. Leave your name and email here, '
      + 'or email ali.yildirim@deepsynaps.com, and you will get a real figure rather than an estimate.',
  },
  {
    id: 'certificate',
    title: 'Certificates and accreditation',
    keywords: ['certificate', 'certification', 'accredit', 'accreditation', 'cme', 'credit', 'credits', 'diploma', 'qualification'],
    body:
      'The Academy page describes professional education and certification pathways as part of the '
      + 'DeepSynaps ecosystem, but it does not name an accrediting body or a credit scheme, so I cannot tell '
      + 'you that a given course carries CME or any specific accreditation. Ask Dr. Ali Yildirim and you will '
      + 'get a straight answer for the format you are considering.',
  },
  {
    id: 'contact',
    title: 'Contact and the wider ecosystem',
    keywords: ['contact', 'email', 'whatsapp', 'reach', 'talk', 'book', 'consultation', 'deepsynaps', 'website'],
    body:
      'You can email ali.yildirim@deepsynaps.com, message the team on WhatsApp from the button on the page, '
      + 'or book a consultation at deepsynaps.com/consultations. The Academy is part of the DeepSynaps '
      + 'ecosystem alongside DeepSynaps OS and DeepSynaps Lab, whose site is deepsynapslab.com.',
  },
  {
    id: 'limits',
    title: 'What the Academy is not',
    keywords: ['medical advice', 'diagnose', 'diagnosis', 'treatment', 'patient', 'disclaimer'],
    body:
      'DeepSynaps Academy is an educational programme. Its content is for professional education and does '
      + 'not constitute medical advice, diagnosis, or treatment recommendations for any individual patient.',
  },
]);
