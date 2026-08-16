"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

const templates = [
  { id: "kerala-gold", name: "Kerala Gold", detail: "Traditional · Warm · Refined" },
  { id: "quiet-bloom", name: "Quiet Bloom", detail: "Floral · Soft · Intimate" },
  { id: "midnight-vow", name: "Midnight Vow", detail: "Modern · Cinematic · Minimal" },
];

export default function DashboardPage() {
  const [template, setTemplate] = useState(templates[0].id);
  const [groom, setGroom] = useState("Azad");
  const [bride, setBride] = useState("Shazna");
  const [slug, setSlug] = useState("azad-shazna");
  const [saved, setSaved] = useState(false);
  const selected = useMemo(() => templates.find((item) => item.id === template)!, [template]);

  function saveDraft(event: FormEvent) {
    event.preventDefault();
    setSaved(true);
  }

  return <main className="dashboard"><header><Link className="brand" href="/">Mangalam</Link><span>Invitation studio</span></header><div className="dashboard-grid">
    <form className="editor-card" onSubmit={saveDraft}>
      <p className="eyebrow">STEP 1 OF 3</p><h1>Begin your invitation</h1><p className="muted">Choose a style and add the details guests need first. You can refine every section before publishing.</p>
      <fieldset><legend>Choose a template</legend><div className="template-list">{templates.map((item) => <button type="button" className={template === item.id ? "template selected" : "template"} key={item.id} onClick={() => setTemplate(item.id)}><strong>{item.name}</strong><small>{item.detail}</small></button>)}</div></fieldset>
      <div className="form-grid"><label>Groom&apos;s name<input value={groom} onChange={(event) => setGroom(event.target.value)} required /></label><label>Bride&apos;s name<input value={bride} onChange={(event) => setBride(event.target.value)} required /></label></div>
      <label>Your invitation URL <span className="url-prefix">mangalam.in/</span><input value={slug} onChange={(event) => setSlug(event.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} pattern="[a-z0-9]+(-[a-z0-9]+)*" required /></label>
      <button className="button" type="submit">Save draft</button>{saved && <p className="saved">Draft saved locally. Connect this form to the Hono API to persist it.</p>}
    </form>
    <aside className="preview-card"><p className="eyebrow">LIVE PREVIEW</p><div className="phone"><div className="phone-art"><span>{selected.name}</span><h2>{groom || "Groom"}<i>&amp;</i>{bride || "Bride"}</h2><p>We invite you to celebrate with us</p><div>18 · 12 · 2026</div></div></div><p className="preview-note">A mobile-first preview updates as you edit.</p></aside>
  </div></main>;
}
