import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { articles, type Article } from "@/data/articles";

export function BlogCard({ article, index }: { article: Article; index: number }) {
  return <Link to={`/blogs/${article.slug}`} className="lab-blog-card">
    <div className="blog-card-label"><span>{String(index + 1).padStart(2, "0")} / {article.category}</span><BookOpen size={21} aria-hidden="true" /></div>
    <h2>{article.title}</h2>
    <p>{article.summary}</p>
    <div className="blog-card-footer"><span><Clock3 size={14} aria-hidden="true" />{article.read}</span><span>Read article <ArrowRight size={16} aria-hidden="true" /></span></div>
  </Link>;
}

export function BlogsPage() {
  return <div className="ai-lab">
    <section className="lab-blog-hero lab-page-start">
      <div className="lab-container">
        <span className="lab-eyebrow">DeepSynaps AI Lab / AWIM explained</span>
        <h1>One research vision.<br /><span>Ten connected stories.</span></h1>
        <p>Explore the Adaptive World Intelligence Model, from first principles to NERVE, memory, simulation, evaluated learning and practical applications.</p>
        <Link className="lab-button" to={`/blogs/${articles[0].slug}`}>Start with AWIM <ArrowRight size={17} /></Link>
        <a className="blog-hero-repo" href="https://github.com/ALIYILD/NERVE" target="_blank" rel="noopener noreferrer">Explore the research repository ↗</a>
      </div>
    </section>
    <section className="lab-section lab-soft" aria-label="AWIM article series">
      <div className="lab-container">
        <div className="blog-series-heading"><h2>Follow the series, or choose a topic.</h2><span>{articles.length} research explainers</span></div>
        <div className="lab-blog-grid">{articles.map((article, index) => <BlogCard key={article.slug} article={article} index={index} />)}</div>
        <p className="lab-caption">Research architecture, bounded prototypes and product applications have different levels of readiness. Each article explains the relevant distinctions.</p>
      </div>
    </section>
  </div>;
}

// Render source URLs as links while keeping all article copy as escaped React text.
function LinkedParagraph({ text }: { text: string }) {
  return <p>{text.split(/(https?:\/\/[^\s]+)/g).map((part, i) => /^https?:\/\//.test(part)
    ? <a key={i} href={part} target="_blank" rel="noopener noreferrer">{part}</a>
    : part)}</p>;
}

export function BlogArticlePage() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug);
  if (!article) return <section className="ai-lab lab-section lab-white lab-page-start"><div className="lab-container"><h1>Article not found</h1><Link to="/blogs" className="card-link"><ArrowLeft size={18} /> Back to blogs</Link></div></section>;
  const index = articles.indexOf(article);
  const previous = articles[index - 1];
  const next = articles[index + 1];
  return <div className="ai-lab">
    <article>
      <header className="lab-blog-hero lab-page-start">
        <div className="lab-container">
          <Link to="/blogs" className="blog-back"><ArrowLeft size={17} /> All articles</Link>
          <span className="lab-eyebrow">{String(index + 1).padStart(2, "0")} / {articles.length} · {article.category} · {article.read}</span>
          <h1 className="blog-article-title">{article.title}</h1>
          <p>{article.subtitle}</p>
          <div className="blog-byline">DeepSynaps AI Lab · Research explainer · Updated 11 October 2026</div>
        </div>
      </header>
      <div className="lab-section lab-white">
        <div className="lab-container blog-reading-layout">
          <nav className="blog-toc" aria-label="Article contents">
            <span className="lab-eyebrow">In this article</span>
            <ol>{article.sections.map((section, i) => <li key={section.heading}><a href={`#section-${i + 1}`}>{section.heading}</a></li>)}</ol>
            <Link className="card-link" to="/awim">Explore AWIM <ArrowRight size={16} /></Link>
          </nav>
          <div className="blog-reading-body">
            {article.sections.map((section, i) => <section id={`section-${i + 1}`} key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((text, j) => <LinkedParagraph key={j} text={text} />)}
            </section>)}
            {article.sources && <section className="blog-sources" aria-label="Sources and further reading"><h2>Sources & further reading</h2><ul>{article.sources.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul></section>}
            <aside className="blog-reading-note">AWIM is a research architecture with bounded prototype implementations. Clinical applications provide decision support; qualified clinicians remain responsible for care.</aside>
            <nav className="blog-next-prev" aria-label="Continue reading">
              {previous && <Link to={`/blogs/${previous.slug}`}><span>Previous article</span><strong>{previous.title}</strong><ArrowLeft size={18} /></Link>}
              {next ? <Link to={`/blogs/${next.slug}`}><span>Next article</span><strong>{next.title}</strong><ArrowRight size={18} /></Link> : <Link to="/blogs"><span>Series complete</span><strong>Explore all ten AWIM articles</strong><ArrowRight size={18} /></Link>}
            </nav>
          </div>
        </div>
      </div>
    </article>
  </div>;
}
