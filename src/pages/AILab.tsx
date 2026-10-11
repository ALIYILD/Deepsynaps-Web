import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Cpu,
  Mail,
  MapPin,
  Network,
} from "lucide-react";
import { NerveExplorer, NerveModal } from "@/components/lab/NerveExplorer";
import { CONTACT } from "@/config/contact";
import { products, researchTopics, stages } from "@/data/lab";
import { articles } from "@/data/articles";

export function AdaptiveLearning({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  const [active, setActive] = useState(0);
  const stage = stages[active];
  return (
    <section className="lab-section lab-white" id="adaptive-learning">
      <div className="lab-container">
        <div className="lab-section-heading">
          <div>
            <span className="lab-eyebrow">The adaptive learning loop</span>
            <Heading>
              From sensory signals
              <br />
              to evaluated learning.
            </Heading>
          </div>
          <p>
            Follow a signal through analysis, prediction, agent collaboration
            and feedback.
          </p>
        </div>
        <div
          className="learning-tabs"
          role="tablist"
          aria-label="Adaptive learning stages"
        >
          {stages.map((s, i) => (
            <button
              key={s.name}
              id={`stage-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="learning-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % stages.length;
                else if (e.key === "ArrowLeft")
                  next = (i + stages.length - 1) % stages.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = stages.length - 1;
                else return;
                e.preventDefault();
                setActive(next);
                document.getElementById(`stage-tab-${next}`)?.focus();
              }}
            >
              <s.icon size={16} />
              {s.name}
            </button>
          ))}
        </div>
        <div
          id="learning-panel"
          className="learning-panel"
          role="tabpanel"
          aria-labelledby={`stage-tab-${active}`}
          tabIndex={0}
        >
          <div>
            <span className="lab-eyebrow">{stage.eyebrow}</span>
            <h3>{stage.title}</h3>
            <p>{stage.description}</p>
          </div>
          <div className="learning-flow">
            {stage.nodes.map((node, i) => (
              <div className="learning-node" key={node}>
                <span className={`flow-dot dot-${i}`} />
                <h4>{node}</h4>
                <p>{stage.captions[i]}</p>
                {i < 2 && <ArrowRight className="flow-arrow" size={19} />}
              </div>
            ))}
          </div>
        </div>
        <div className="learning-principles">
          {[
            ["Evaluate outcomes", "Check what happened after an action."],
            [
              "Retain useful learning",
              "Keep evaluated memories and reusable skills.",
            ],
            ["Share selectively", "Route relevant lessons across the network."],
          ].map(([title, desc], i) => (
            <div key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="lab-caption">
          A proposed architecture for evaluated adaptation. Memory updates and
          skill reuse do not, by themselves, demonstrate model-weight learning.
        </p>
      </div>
    </section>
  );
}

export function EcosystemSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      className={`lab-section lab-white ${standalone ? "lab-page-start" : ""}`}
      id="ecosystem"
    >
      <div className="lab-container">
        <div className="lab-section-heading">
          <div>
            <span className="lab-eyebrow">The DeepSynaps ecosystem</span>
            {standalone ? (
              <h1>Ideas into applications.</h1>
            ) : (
              <h2>Ideas into applications.</h2>
            )}
          </div>
          <p>
            Research, platforms and ventures connected by a shared ambition:
            useful, adaptive intelligence.
          </p>
        </div>
        <div className="ecosystem-grid">
          {products.map((product, i) => (
            <Link
              className={`product-card tint-${product.color}`}
              to={`/ecosystem/${product.slug}`}
              key={product.slug}
            >
              <div className="product-card-top">
                <span className="product-icon">
                  <product.icon size={25} strokeWidth={1.6} />
                </span>
                <span>0{i + 1}</span>
              </div>
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="card-link">
                {product.slug === "chip-design"
                  ? "Explore chip research"
                  : `Explore ${product.slug === "clinical-os" ? "Clinical OS" : product.name}`}
                <ArrowRight size={17} />
              </span>
            </Link>
          ))}
        </div>
        <div className="initiative-grid">
          <a
            href="https://deepsynapsturkiye.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div>
              <h3>Regional operations</h3>
              <p>Türkiye & international initiatives</p>
            </div>
            <ArrowUpRight size={18} />
          </a>
          <Link to="/ecosystem/niraxx">
            <div>
              <h3>Niraxx</h3>
              <p>Neurotechnology initiative</p>
            </div>
            <ArrowRight size={18} />
          </Link>
          <Link to="/ecosystem/syncwell">
            <div>
              <h3>SyncWell</h3>
              <p>Biometric platform initiative</p>
            </div>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function ResearchSection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  return (
    <section
      className={`lab-section lab-soft ${standalone ? "lab-page-start" : ""}`}
      id="research"
    >
      <div className="lab-container">
        <div className="lab-section-heading">
          <div>
            <span className="lab-eyebrow">Research at DeepSynaps AI Lab</span>
            {standalone ? (
              <h1>
                Learning. Collaboration.
                <br />
                Intelligence in the real world.
              </h1>
            ) : (
              <h2>
                Learning. Collaboration.
                <br />
                Intelligence in the real world.
              </h2>
            )}
          </div>
          <p>
            Explore the questions shaping our architecture, and the work
            connecting software intelligence with physical systems.
          </p>
        </div>
        <div className="research-grid">
          {researchTopics.map((topic) => (
            <article
              className={`research-card tint-${topic.color}`}
              id={`research-${topic.id}`}
              key={topic.id}
            >
              <span className="lab-eyebrow">Research direction</span>
              <topic.icon size={26} strokeWidth={1.5} />
              <h3>{topic.name}</h3>
              <p>{topic.question}</p>
              {standalone && (
                <p className="research-description">{topic.description}</p>
              )}
              {topic.id === "chip-design" && (
                <Link className="card-link" to="/ecosystem/chip-design">
                  Explore the chip lab <ArrowRight size={16} />
                </Link>
              )}
            </article>
          ))}
        </div>
        <div className="research-banner">
          <div>
            <span className="lab-eyebrow">
              Methods / technical notes / demonstrations
            </span>
            <h3>Make progress inspectable.</h3>
            <p>
              Our research approach: clear assumptions, evaluation methods and
              measured results.
            </p>
          </div>
          <a
            className="lab-button"
            href={`mailto:${CONTACT.email}?subject=DeepSynaps%20research%20collaboration`}
          >
            Collaborate with the lab <ArrowRight size={17} />
          </a>
        </div>
        <p className="lab-caption">
          Research directions describe work being explored. They are not claims
          of validated autonomous learning, established causation or deployed
          robotic capability.
        </p>
      </div>
    </section>
  );
}

export function CollaborationSection() {
  return (
    <section className="lab-section lab-collaborate" id="collaborate">
      <div className="lab-container collaborate-inner">
        <div>
          <span className="lab-eyebrow">Build with DeepSynaps</span>
          <h2>
            The next step starts
            <br />
            with a conversation.
          </h2>
          <p>
            For researchers, AI developers, hardware teams and partners turning
            intelligent systems into practical applications.
          </p>
        </div>
        <div className="collaborate-links">
          <a
            className="lab-button"
            href={`mailto:${CONTACT.email}?subject=DeepSynaps%20AI%20Lab%20collaboration`}
          >
            Work with us <ArrowUpRight size={18} />
          </a>
          <Link to="/consultations">
            Clinical consultations <ArrowRight size={16} />
          </Link>
          <a href={`mailto:${CONTACT.email}`}>
            <Mail size={16} />
            {CONTACT.email}
          </a>
        </div>
      </div>
    </section>
  );
}

export function AwimOverview() {
  const loop = [
    ["Sense", "Receive signals and observations with their source and context."],
    ["Understand", "Use specialist analyzers to organise evidence and uncertainty."],
    ["Represent", "Connect digital twins into an evolving DeepTwin representation."],
    ["Simulate", "Explore possible actions and outcomes through WorldCore research."],
    ["Coordinate", "Let NERVE bring the relevant agents, tools and memories together."],
    ["Act", "Support permitted actions with review appropriate to the application."],
    ["Evaluate", "Compare expectations with observed outcomes and independent checks."],
    ["Remember", "Retain useful experience and test improvements for the next cycle."],
  ];
  return <section className="lab-section lab-white" id="awim">
    <div className="lab-container">
      <div className="lab-section-heading">
        <div><span className="lab-eyebrow">Our core research / AWIM</span><h2>From experience<br />to adaptive intelligence.</h2></div>
        <p>AWIM is the research architecture. NERVE coordinates its agents. Our applications bring this work into practical settings.</p>
      </div>
      <ol className="awim-cycle" aria-label="The AWIM feedback cycle">
        {loop.map(([title, description], i) => <li key={title}>
          <span className="awim-step">0{i + 1}</span><h3>{title}</h3><p>{description}</p>
        </li>)}
      </ol>
      <div className="awim-overview-bottom">
        <p>Feedback and memory inform the next cycle. Improvement is evaluated before it is retained.</p>
        <Link className="card-link" to="/awim">Explore the AWIM architecture <ArrowRight size={17} /></Link>
      </div>
    </div>
  </section>;
}

function ClinicalApplication() {
  return <section className="lab-section lab-soft" id="clinical-application">
    <div className="lab-container clinical-feature">
      <div>
        <span className="lab-eyebrow">First application / Healthcare</span>
        <h2>Research at the core.<br />Clinical intelligence in practice.</h2>
        <p>Clinical Intelligence OS is the first application of the DeepSynaps vision. It brings patient information, evidence and specialist tools into one view, with clinicians in control of care decisions.</p>
        <Link className="lab-button" to="/ecosystem/clinical-os">Explore Clinical Intelligence OS <ArrowRight size={17} /></Link>
      </div>
      <div className="clinical-path">
        <span className="lab-eyebrow">How the vision connects</span>
        <h3>DeepSynaps AI Lab</h3><p>Researching AWIM and evaluated adaptation.</p>
        <h3>AWIM + NERVE</h3><p>The architecture and its specialist agent coordination layer.</p>
        <h3>Clinical Intelligence OS</h3><p>A healthcare application connecting patient context with evidence-linked decision support.</p>
        <a className="card-link" href="https://app.deepsynaps.com" target="_blank" rel="noopener noreferrer">Open Clinical OS <ArrowUpRight size={17} /></a>
      </div>
    </div>
  </section>;
}

function ResearchStories() {
  return <section className="lab-section lab-white" id="stories"><div className="lab-container">
    <div className="lab-section-heading"><div><span className="lab-eyebrow">AWIM explained / Ten connected stories</span><h2>Get to know the intelligence<br />behind the lab.</h2></div><Link className="card-link" to="/blogs">Explore all ten articles <ArrowRight size={17} /></Link></div>
    <div className="research-grid">{[articles[0], articles[4], articles[6], articles[7]].map(article => <Link className="research-card tint-blue" key={article.slug} to={`/blogs/${article.slug}`}><span className="lab-eyebrow">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><span className="card-link">Read the story <ArrowRight size={16} /></span></Link>)}</div>
  </div></section>;
}

export function AILabHome() {
  return (
    <div className="ai-lab">
      <section className="lab-hero">
        <div className="lab-container hero-grid">
          <div className="hero-copy">
            <span className="lab-eyebrow">
              <i className="status-dot" /> DeepSynaps AI Lab
            </span>
            <h1 className="awim-headline">
              Adaptive World<br />
              <span>Intelligence</span><br />
              Model.
            </h1>
            <p>
              We are DeepSynaps AI Lab. We are developing AWIM: an architecture that connects sensing, world models, specialist agents and memory to learn from evaluated experience.
            </p>
            <div className="hero-actions">
              <Link className="lab-button" to="/awim">
                Explore AWIM <ArrowRight size={17} />
              </Link>
              <Link className="lab-button secondary" to="/awim/simulator">
                Try the learning demo <ArrowRight size={17} />
              </Link>
            </div>
            <div className="hero-mantra">
              Our research question: how can intelligence keep adapting
              as the world changes?
            </div>
          </div>
          <NerveExplorer />
        </div>
        <a href="#adaptive-learning" className="hero-scroll">
          Explore the learning loop <ArrowDown size={14} />
        </a>
      </section>
      <AwimOverview />
      <AdaptiveLearning />
      <section className="nerve-intro">
        <div className="lab-container nerve-intro-inner">
          <span className="nerve-intro-icon">
            <Network size={35} strokeWidth={1.3} />
          </span>
          <div>
            <span className="lab-eyebrow">NERVE — The coordination layer of AWIM</span>
            <h2>
              Specialist agents.
              <br />
              Connected intelligence.
            </h2>
            <p>
              NERVE is the coordination layer within AWIM. It brings specialist agents, tools and relevant memories together to compare evidence, propose actions and evaluate outcomes.
            </p>
          </div>
          <NerveModal />
        </div>
      </section>
      <ClinicalApplication />
      <ResearchStories />
      <ResearchSection />
      <EcosystemSection />
      <CollaborationSection />
    </div>
  );
}

export function ResearchPage() {
  return (
    <div className="ai-lab">
      <ResearchSection standalone />
      <AdaptiveLearning />
      <CollaborationSection />
    </div>
  );
}
export function LearningPage() {
  return (
    <div className="ai-lab lab-page-start">
      <AdaptiveLearning standalone />
      <CollaborationSection />
    </div>
  );
}
export function EcosystemPage() {
  return (
    <div className="ai-lab">
      <EcosystemSection standalone />
      <CollaborationSection />
    </div>
  );
}
export function NervePage() {
  return (
    <div className="ai-lab">
      <section className="lab-nerve-page lab-page-start">
        <div className="lab-container">
          <span className="lab-eyebrow">NERVE / the coordination layer</span>
          <h1>Explore connected intelligence.</h1>
          <p className="page-intro">
            Explore how NERVE coordinates specialist agent networks in the proposed AWIM world intelligence architecture.
          </p>
          <NerveExplorer expanded />
          <div className="mt-8"><Link className="lab-button" to="/awim">Explore the full AWIM model <ArrowRight size={17}/></Link></div>
        </div>
      </section>
      <AdaptiveLearning />
      <CollaborationSection />
    </div>
  );
}

export function LabAbout() {
  return (
    <div className="ai-lab">
      <section className="lab-section lab-white lab-page-start">
        <div className="lab-container">
          <span className="lab-eyebrow">The lab</span>
          <h1 className="about-headline">
            Building intelligence
            <br />
            that connects
            <br />
            <span>experience with action.</span>
          </h1>
          <div className="about-grid">
            <p className="about-lead">
              DeepSynaps AI Lab is developing the Adaptive World Intelligence
              Model (AWIM), connecting world modelling, collaborative agents,
              memory and evaluated learning.
            </p>
            <div>
              <p>
                AWIM is our overarching research architecture. Sensory inputs
                feed specialist analyzers and digital twins; WorldCore explores
                possible outcomes and NERVE coordinates specialist agents. The goal is to turn
                evaluated experience into useful memories and skills that
                relevant agents can share.
              </p>
              <p>
                Clinical Intelligence OS is our first application. Alongside it,
                our ecosystem spans chip design, AI infrastructure, human
                performance and education.
              </p>
              <p>
                We aim to develop and evaluate the architecture across digital
                environments, world-model research and physical AI.
              </p>
              <span className="about-location">
                <MapPin size={16} /> United Kingdom
              </span>
            </div>
          </div>
          <div className="about-principles">
            {[
              [
                "Keep sources visible",
                "Preserve the distinction between signals, interpretations and predictions.",
              ],
              [
                "Evaluate improvement",
                "Measure outcomes before treating an experience as reusable learning.",
              ],
              [
                "Keep people in control",
                "Define permissions and review points around meaningful actions.",
              ],
            ].map(([title, text]) => (
              <article key={title}>
                <Check size={23} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ResearchSection />
      <CollaborationSection />
    </div>
  );
}

export function ProductPage() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  const initiative =
    slug === "niraxx"
      ? {
          name: "Niraxx",
          category: "Neurotechnology initiative",
          detail:
            "Niraxx is part of the wider DeepSynaps ecosystem vision, exploring wearable neurotechnology. Contact the team to discuss its current work and collaboration opportunities.",
        }
      : slug === "syncwell"
        ? {
            name: "SyncWell",
            category: "Biometric platform initiative",
            detail:
              "SyncWell explores connected biometric information and its role in understanding wellbeing and performance. Contact the team to discuss its current work and collaboration opportunities.",
          }
        : null;
  if (!product && !initiative) return <NotFound />;
  const item = product || initiative!;
  return (
    <div className="ai-lab">
      <section className="lab-section lab-white lab-page-start">
        <div className="lab-container product-detail-page">
          <Link to="/ecosystem" className="back-link">
            ← The ecosystem
          </Link>
          <span className="lab-eyebrow">{item.category}</span>
          <h1>{item.name}</h1>
          <p className="product-detail-intro">{item.detail}</p>
          {product && (
            <div className={`product-focus tint-${product.color}`}>
              <product.icon size={44} strokeWidth={1.4} />
              <div>
                <h2>Areas of focus</h2>
                <ul>
                  {product.focus.map((f) => (
                    <li key={f}>
                      <Check size={16} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="hero-actions">
            {product?.href && (
              <a
                className="lab-button"
                href={product.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {product.cta}
                <ArrowUpRight size={17} />
              </a>
            )}
            <a
              className={
                product?.href ? "lab-button light-secondary" : "lab-button"
              }
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(item.name + " enquiry")}`}
            >
              Talk to the team <ArrowRight size={17} />
            </a>
          </div>
          {slug === "chip-design" && (
            <p className="lab-caption chip-caption">
              <Cpu size={16} /> Research programme. This page does not announce
              a fabricated or commercially available chip.
            </p>
          )}
        </div>
      </section>
      <CollaborationSection />
    </div>
  );
}

export function NotFound() {
  return (
    <div className="ai-lab">
      <section className="lab-section lab-white lab-page-start">
        <div className="lab-container">
          <span className="lab-eyebrow">404 / page not found</span>
          <h1>Let’s reconnect.</h1>
          <p className="page-intro">
            This page could not be found. Explore the lab or get in touch.
          </p>
          <Link className="lab-button" to="/">
            Back to DeepSynaps <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}
