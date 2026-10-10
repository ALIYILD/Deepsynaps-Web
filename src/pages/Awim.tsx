import { Link } from "react-router";
import { ArrowRight, Atom, BrainCircuit, Database, Network, Radio, ShieldCheck, Workflow, GitBranch, BookOpen } from "lucide-react";
const layers=[
{icon:Radio,title:"Sense",desc:"Authorised EEG, imaging, biometrics, audio, vision, movement and environmental streams."},
{icon:BrainCircuit,title:"Represent",desc:"Modality-specific analysers, Brain/Bio/Mind/Body Twins and an integrated DeepTwin state."},
{icon:GitBranch,title:"Predict",desc:"WorldCore learns action-conditioned state transitions and tests possible outcomes with uncertainty."},
{icon:Network,title:"Coordinate",desc:"NERVE schedules specialist agents, retrieval, reasoning and collaborative evaluation."},
{icon:ShieldCheck,title:"Decide safely",desc:"Structured decision routing, evidence checking, hard policy gates and human supervision."},
{icon:Workflow,title:"Adapt",desc:"Observed outcomes update traceable experience, approved skills and version-controlled models."},
];
export default function AwimPage(){
return <div className="ai-lab">
<section className="lab-nerve-page lab-page-start"><div className="lab-container">
<span className="lab-eyebrow">Research model / NERVE-AWIM / v1.0</span>
<h1>NERVE-AWIM: Adaptive World Intelligence Model.</h1>
<p className="page-intro">A proposed bio-inspired architecture for sensing the world, predicting what happens next, coordinating specialist AI agents and improving through evaluated feedback.</p>
<div className="flex flex-wrap gap-3 mt-8">
<Link className="lab-button" to="/blogs/nerve-awim-adaptive-world-intelligence-research">Read the academic proposal <ArrowRight size={16}/></Link>
<Link className="lab-button secondary" to="/nerve">Explore NERVE <ArrowRight size={16}/></Link>
</div></div></section>
<section className="lab-section lab-white"><div className="lab-container"><div className="lab-section-heading"><div><span className="lab-eyebrow">How the proposed model works</span><h2>Sense. Predict. Collaborate. Adapt.</h2></div><p>Distinct computing systems work across different timescales; high-rate safety control is not delegated to a slow language-model agent.</p></div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{layers.map(x=><article key={x.title} className="border border-slate-200 rounded-xl p-6 bg-white"><x.icon size={28} strokeWidth={1.7} className="text-indigo-700 mb-4" aria-hidden="true"/><h3 className="text-xl font-semibold mb-3 text-slate-950">{x.title}</h3><p className="text-slate-700 leading-relaxed">{x.desc}</p></article>)}</div>
</div></section>
<section className="lab-section lab-soft"><div className="lab-container"><div className="lab-section-heading"><div><span className="lab-eyebrow">System components</span><h2>One research architecture. Specialist layers.</h2></div><p>Each layer has defined interfaces, evaluation criteria and operational boundaries.</p></div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
{[
{title:"WorldCore",icon:BrainCircuit,description:"Predictive state-space dynamics and uncertainty-aware simulation; an experimental component, not a validated universal world model."},
{title:"NERVE Specialist Agent Network",icon:Network,description:"Specialist tool-using agents with typed contracts, scoped permissions and task-dependent collaboration."},
{title:"Adaptive Memory System",icon:Database,description:"Inspectable Markdown knowledge, separate from secure clinical records, and complemented by episodic stores and retrieval indexes."},
{title:"Decision Intelligence & Safety",icon:ShieldCheck,description:"Structured routing and independent evaluation; deterministic rules and authorised humans govern consequential actions."},
{title:"Quantum Research Layer",icon:Atom,description:"Optional hybrid quantum–classical experiments on bounded optimisation tasks; no claimed general quantum speedup."},
{title:"Adaptive learning",icon:Workflow,description:"Fast context adaptation, experience-based skill proposals and slower tested model updates with rollback and audit trails."}
].map(x=><article className="border border-slate-200 bg-white rounded-xl p-6" key={x.title}><div className="flex gap-3 items-center mb-3"><x.icon size={24} className="text-indigo-700"/><h3 className="text-xl text-slate-950 font-semibold">{x.title}</h3></div><p className="text-slate-700 leading-relaxed">{x.description}</p></article>)}
</div></div></section>
<section className="lab-section lab-white"><div className="lab-container"><div className="lab-section-heading"><div><span className="lab-eyebrow">Research and applications</span><h2>From Clinical OS toward physical AI.</h2></div><p>Progression requires independently evaluated prediction, planning, safety and action capabilities.</p></div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">{[
["Clinical Intelligence","Multimodal evidence-linked decision support under clinician oversight.","/ecosystem/clinical-os"],
["Adaptive learning research","Agent-network coordination, predictive dynamics, memory and reproducible benchmarks.","/research"],
["Embodied intelligence","Constrained robotics simulation, sensors and safe actuators as future research.","/blogs/applications-of-adaptive-intelligence"]
].map(([title,description,link])=><Link key={title} to={link} className="border border-slate-200 rounded-xl p-6 bg-white group"><h3 className="text-xl font-semibold text-slate-950 mb-3">{title}</h3><p className="text-slate-700 mb-5">{description}</p><span className="inline-flex items-center gap-2 font-semibold text-indigo-700">Explore <ArrowRight size={16}/></span></Link>)}</div>
<div className="mt-12 border border-slate-200 rounded-xl p-6 bg-white"><BookOpen className="text-indigo-700 mb-3"/><h3 className="text-xl font-semibold text-slate-950 mb-3">Academic research specification</h3><p className="text-slate-700 mb-4">Read the hypotheses, prior work, experimental methods, quantum limitations and initial references. This is a proposal, not a peer-reviewed empirical result.</p><Link className="font-semibold text-indigo-700 inline-flex gap-2 items-center" to="/blogs/nerve-awim-adaptive-world-intelligence-research">Read research paper <ArrowRight size={16}/></Link></div></div></section>
</div>
}
