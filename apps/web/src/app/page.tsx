import Link from "next/link";

const features = [
  ["Choose a style", "Start with a Kerala-inspired, modern, or floral invitation template."],
  ["Make it yours", "Add your names, family details, celebrations, photos, and directions."],
  ["Share the moment", "Publish one beautiful link for guests to open from WhatsApp."],
];

export default function Home() {
  return (
    <main className="landing">
      <nav><Link className="brand" href="/">Mangalam</Link><Link className="button button-quiet" href="/dashboard">Create invitation</Link></nav>
      <section className="hero">
        <p className="eyebrow">WEDDING WEBSITES, MADE SIMPLE</p>
        <h1>Your celebration,<br /><em>beautifully shared.</em></h1>
        <p className="lede">Create a graceful, mobile-first invitation your family can share in minutes.</p>
        <div className="actions"><Link className="button" href="/dashboard">Create your invitation</Link><Link className="text-link" href="/arun-nila">See a live example <span>→</span></Link></div>
      </section>
      <section className="feature-grid">{features.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
    </main>
  );
}
