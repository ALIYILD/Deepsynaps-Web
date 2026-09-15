/**
 * What deepsynapslab.com actually says.
 *
 * Transcribed from `lab-site/index.html`. Two things about that page decide the
 * shape of this file. It is careful about epistemic status — Orch-OR is named
 * as contested, biophotons' functional role as debated, the hypothesis as
 * architectural inspiration rather than settled physics — and the assistant
 * must carry that hedging through rather than flatten it into a claim. And it
 * states each chip's stage explicitly: HAC v1 in theoretical validation, HAC v2
 * in feasibility, no commercial product available. Those are the answers to
 * "can I buy one" and "does it work", so they are written down here verbatim.
 */

export const title = 'DeepSynaps Lab — deepsynapslab.com';

export const summary =
  'DeepSynaps Lab is the research division of DeepSynaps, building Hybrid AI Chips (HAC): neuromorphic '
  + 'architectures inspired by how neurons, microtubules and biophotons appear to process information in the '
  + 'brain. Two generations are described: HAC v1, a photonic and electric hybrid, and HAC v2, fully '
  + 'photonic. It is a small, long-horizon research group, and no commercial product is yet available.';

export const pages = Object.freeze([
  { path: '#science', label: 'The science' },
  { path: '#chips', label: 'HAC chips' },
  { path: '#program', label: 'Research programme' },
  { path: '#collaborate', label: 'Collaborate' },
]);

export const entries = Object.freeze([
  {
    id: 'chips',
    title: 'The HAC chips',
    keywords: ['hac', 'chip', 'chips', 'hardware', 'wafer', 'v1', 'v2', 'processor', 'architecture', 'what are you building'],
    body:
      'Two generations, built deliberately in sequence. HAC v1 is a hybrid neuromorphic chip combining '
      + 'photonic and electronic elements on a single integrated wafer, architecturally inspired by neurons '
      + 'and the microtubule lattice: light carries high-bandwidth state transitions while electronics handle '
      + 'control, memory and interface. Its stated target is room-temperature quantum-like behaviour and its '
      + 'current stage is theoretical validation. HAC v2 drops the electronic substrate entirely and is fully '
      + 'photonic, inspired by the way neural tissue appears to emit and channel biophotons; the aim is a '
      + 'computing substrate that operates the way the brain does, with light, in warm matter, structured by '
      + 'microtubule-like lattices. Its current stage is feasibility.',
  },
  {
    id: 'stage',
    title: 'Stage, availability and buying one',
    keywords: ['buy', 'available', 'availability', 'product', 'sell', 'purchase', 'ship', 'when', 'ready', 'commercial', 'stage', 'prototype'],
    body:
      'DeepSynaps Lab is an active research programme, not a product line. HAC v1 is currently in theoretical '
      + 'validation and HAC v2 is in feasibility study. No commercial product is yet available, and the page '
      + 'does not give a date. If you want to follow the work or discuss it, the Lab wants to hear from you.',
  },
  {
    id: 'science',
    title: 'Why microtubules and why light',
    keywords: ['microtubule', 'microtubules', 'biophoton', 'biophotons', 'light', 'photonic', 'quantum', 'science', 'why', 'coherence', 'room temperature'],
    body:
      'Three threads from physics and neuroscience. Microtubules are cytoskeletal protein lattices inside '
      + 'every neuron; Penrose and Hameroff propose them as the substrate where the brain’s most interesting '
      + 'computation, possibly including quantum coherence, actually happens, and the Lab treats this as '
      + 'architectural inspiration rather than settled physics. Biophotons, ultraweak photon emissions from '
      + 'living tissue including neural tissue, are a documented biological phenomenon whose functional role '
      + 'is still debated, but the fact that the brain emits and may channel light is taken as a hint about '
      + 'what substrate to build on. Room-temperature quantum: conventional quantum computing needs extreme '
      + 'cold, while Orch-OR implies the brain achieves quantum-like behaviour at body temperature through '
      + 'structural protection in microtubules, and replicating that in a synthetic lattice would change what '
      + '"quantum compute" means.',
  },
  {
    id: 'lineage',
    title: 'Orch-OR, Penrose and Hameroff',
    keywords: ['penrose', 'hameroff', 'orch-or', 'orch or', 'consciousness', 'theory', 'lineage', 'inspiration', 'contested'],
    body:
      'Sir Roger Penrose of Oxford and Stuart Hameroff of Arizona proposed Orchestrated Objective Reduction '
      + '(Orch-OR): that consciousness and high-level computation in the brain arise from quantum processes '
      + 'occurring within neuronal microtubules. The Lab page is explicit that the theory remains contested in '
      + 'mainstream physics, and presents it as the most generative architectural hypothesis for what a '
      + 'non-classical brain-inspired chip could look like, not as established consensus.',
  },
  {
    id: 'program',
    title: 'The research programme',
    keywords: ['programme', 'program', 'research', 'track', 'tracks', 'roadmap', 'work on', 'simulation', 'waveguide'],
    body:
      'Three concurrent tracks feed the HAC roadmap. Neuroscience-faithful architectures: reading current '
      + 'neuroscience, identifying mechanisms classical compute fails to model, and translating them into '
      + 'chip-level primitives. Photonic and hybrid hardware: theoretical and simulated design of photonic and '
      + 'electric-photonic wafers, including waveguides, modulators and the lattice geometries that '
      + 'approximate microtubule behaviour. Quantum-at-warm-matter: exploring the conditions under which '
      + 'non-classical computation can survive at room temperature, drawing on Orch-OR, structural quantum '
      + 'protection and adjacent quantum-biology literature.',
  },
  {
    id: 'collaborate',
    title: 'Collaborating with or funding the Lab',
    keywords: ['collaborate', 'collaboration', 'partner', 'join', 'hiring', 'job', 'fund', 'funding', 'invest', 'investor', 'phd', 'postdoc', 'contact', 'email'],
    body:
      'DeepSynaps Lab is a small, long-horizon research group and the page says plainly that it wants to '
      + 'talk to researchers, physicists and photonics engineers working on neuromorphic hardware, photonic '
      + 'computing, quantum biology or adjacent territory, and to people who fund that work. Email '
      + 'ali.yildirim@deepsynaps.com, use the WhatsApp button on the page, or leave your details with me and '
      + 'I will pass them to Dr. Ali Yildirim.',
  },
  {
    id: 'ecosystem',
    title: 'The Lab within DeepSynaps',
    keywords: ['deepsynaps', 'ecosystem', 'academy', 'os', 'clinic', 'clinical', 'other'],
    body:
      'DeepSynaps Lab is part of the DeepSynaps ecosystem; the main site is deepsynaps.com, which covers the '
      + 'clinical work and DeepSynaps OS, and DeepSynaps Academy at deepsynapsacademy.com covers training. '
      + 'The Lab page itself is about the research programme only.',
  },
  {
    id: 'caveat',
    title: 'What the Lab page claims and does not claim',
    keywords: ['proof', 'proven', 'evidence', 'peer review', 'published', 'disclaimer', 'consensus'],
    body:
      'The page states its own caveat: references to Orch-OR, biophotons and microtubule quantum processing '
      + 'reflect the theoretical frameworks that inspire the work, not established consensus in mainstream '
      + 'physics. It claims no result, no benchmark and no published validation, and neither will I.',
  },
]);
