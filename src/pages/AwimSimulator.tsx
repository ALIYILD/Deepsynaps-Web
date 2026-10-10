import { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, RotateCcw, Play, BrainCircuit } from "lucide-react";

type Mode = "adaptive" | "fixed";
type Trial = { step: number; terrain: "clear" | "rough"; action: "fast" | "careful"; reward: number; estimate: number };
type Learner = { counts: number[][]; values: number[][]; history: Trial[] };
const initial = (): Learner => ({counts:[[0,0],[0,0]], values:[[0,0],[0,0]], history:[]});
const rewardFor = (terrain: number, action: number) => terrain===0 ? (action===0?1:0.65) : (action===0?0.1:0.9);
function advance(model:Learner,mode:Mode,step:number,shiftAt:number):Learner{
  const terrain = step >= shiftAt ? 1 : 0;
  const counts=model.counts.map(r=>[...r]), values=model.values.map(r=>[...r]);
  const action=mode==="fixed"?0:(counts[terrain][0]===0?0:counts[terrain][1]===0?1:values[terrain][0]>=values[terrain][1]?0:1);
  const reward=rewardFor(terrain,action);
  const estimate=values[terrain][action];
  const n=++counts[terrain][action];
  values[terrain][action]+= (reward-values[terrain][action])/n;
  return {counts,values,history:[...model.history,{step,terrain:terrain===0?"clear":"rough",action:action===0?"fast":"careful",reward,estimate}]};
}
function simulate(mode:Mode,steps:number,shiftAt:number):Learner{
 let current=initial();for(let i=0;i<steps;i++)current=advance(current,mode,i,shiftAt);return current;
}
export default function AwimSimulator(){
 const [steps,setSteps]=useState(0);const [shiftAt,setShiftAt]=useState(8);
 const adaptive=useMemo(()=>simulate("adaptive",steps,shiftAt),[steps,shiftAt]);
 const fixed=useMemo(()=>simulate("fixed",steps,shiftAt),[steps,shiftAt]);
 const score=(s:Learner)=>s.history.reduce((acc,r)=>acc+r.reward,0);
 const last=adaptive.history.at(-1);
 return <div className="ai-lab"><section className="lab-nerve-page lab-page-start"><div className="lab-container">
 <Link to="/awim" className="inline-flex gap-2 items-center mb-8"><ArrowLeft size={16}/> NERVE-AWIM model</Link>
 <span className="lab-eyebrow">Open research demonstrator / deterministic simulator</span>
 <h1>See adaptive decisions change with sensor feedback.</h1>
 <p className="page-intro">An intentionally small contextual-learning experiment. A simulated terrain sensor changes from clear to rough; the adaptive controller learns which of two actions earns better results. Compare it with a fixed-action baseline.</p>
 <div className="flex flex-wrap gap-3 mt-8">
 <button className="lab-button" onClick={()=>setSteps(s=>Math.min(60,s+1))}><Play size={16}/> Next sensor event</button>
 <button className="lab-button secondary" onClick={()=>setSteps(s=>Math.min(60,s+10))}>Run 10 events</button>
 <button className="lab-button secondary" onClick={()=>setSteps(0)}><RotateCcw size={16}/> Reset</button>
 </div></div></section>
 <section className="lab-section lab-white"><div className="lab-container">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
 {[
 ["Sensor condition",last?.terrain==="rough"?"Rough surface":last?"Clear surface":"No events yet"],
 ["Adaptive cumulative reward",score(adaptive).toFixed(2)],
 ["Fixed baseline reward",score(fixed).toFixed(2)]
 ].map(([label,value])=><div key={label} className="border border-slate-200 bg-white rounded-xl p-6"><div className="text-sm text-slate-600 mb-3">{label}</div><div className="text-3xl font-semibold text-slate-950">{value}</div></div>)}
 </div>
 <div className="mt-8 border border-slate-200 bg-white rounded-xl p-6">
 <label className="font-semibold text-slate-950" htmlFor="shift">Change terrain after event: {shiftAt}</label>
 <input id="shift" type="range" className="w-full mt-3" min="2" max="20" value={shiftAt} onChange={e=>setShiftAt(Number(e.target.value))}/>
 <p className="text-sm text-slate-600 mt-2">The system observes terrain context, makes a choice and updates estimated reward after each event. Adjusting terrain change replays the same number of simulated events.</p>
 </div>
 <h2 className="text-2xl font-semibold mt-10 mb-4 text-slate-950">Event history</h2>
 <div className="overflow-x-auto"><table className="w-full text-left text-slate-900 border-collapse"><thead><tr className="border-b border-slate-300">{["Event","Sensor","Adaptive action","Observed reward","Prior estimate"].map(s=><th className="p-3" key={s}>{s}</th>)}</tr></thead><tbody>{adaptive.history.slice(-15).reverse().map(r=><tr key={r.step} className="border-b border-slate-200"><td className="p-3">{r.step+1}</td><td className="p-3">{r.terrain}</td><td className="p-3">{r.action}</td><td className="p-3">{r.reward.toFixed(2)}</td><td className="p-3">{r.estimate.toFixed(2)}</td></tr>)}</tbody></table>{steps===0&&<p className="text-slate-600 mt-4">Run an event to begin.</p>}</div>
 <div className="mt-10 p-6 rounded-xl bg-slate-100 text-slate-800"><div className="flex gap-2 items-center font-semibold mb-3"><BrainCircuit size={20}/> What this demonstrates</div><p className="leading-relaxed">This is a reproducible, deterministic contextual bandit illustration of feedback-based action selection. It is <strong>not</strong> a learned physical world model, an agent framework, a quantum speedup or evidence of clinical effectiveness. The next research step is to replace the predefined reward table with learned dynamics and test on held-out environments.</p></div>
 </div></section></div>;
}
