import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Invitation = { slug: string; nameOrder: "groom_first" | "bride_first"; couple: { groom: string; bride: string }; family: { groomParents: string; brideParents: string }; message: string; heroImage: string; rsvpEnabled: boolean; events: { id: string; title: string; date: string; time: string; venue: string; address: string; mapUrl?: string }[] };

async function getInvitation(slug: string): Promise<Invitation | null> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  try { const response = await fetch(`${apiUrl}/api/invitations/${slug}`, { cache: "no-store" }); return response.ok ? (await response.json()).data : null; } catch { return null; }
}

export const dynamic = "force-dynamic";

export default async function InvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const invitation = await getInvitation(slug);
  if (!invitation) notFound();
  const names = invitation.nameOrder === "bride_first" ? [invitation.couple.bride, invitation.couple.groom] : [invitation.couple.groom, invitation.couple.bride];
  const primaryEvent = invitation.events[0];
  const dateMark = primaryEvent ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(`${primaryEvent.date}T12:00:00`)).replace(/\//g, " · ") : "";
  return <main className="invite-page"><section className="invite-hero"><Image src={invitation.heroImage} alt={`${names[0]} and ${names[1]}`} fill priority sizes="100vw" /><div className="hero-overlay" /><div className="invite-hero-content"><p>WITH THE BLESSINGS OF OUR FAMILIES</p><h1>{names[0]}<span>&amp;</span>{names[1]}</h1><div className="date-mark">{dateMark}</div></div></section>
    <section className="invite-intro"><p className="eyebrow">A CELEBRATION OF LOVE</p><p>{invitation.message}</p><div className="families"><div><span>GROOM&apos;S FAMILY</span>{invitation.family.groomParents}</div><div><span>BRIDE&apos;S FAMILY</span>{invitation.family.brideParents}</div></div></section>
    <section className="events"><p className="eyebrow">JOIN US</p><h2>Our celebrations</h2><div className="event-list">{invitation.events.map((event) => <article key={event.id}><div className="event-date">{new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(new Date(`${event.date}T12:00:00`))}</div><div><h3>{event.title}</h3><p>{event.time} · {event.venue}</p><p>{event.address}</p>{event.mapUrl && <a href={event.mapUrl} target="_blank" rel="noreferrer">Open directions →</a>}</div></article>)}</div></section>
    {invitation.rsvpEnabled && <section className="rsvp"><p className="eyebrow">RSVP</p><h2>Will you celebrate with us?</h2><p>Please let us know so we can welcome you well.</p><button className="button">RSVP coming soon</button></section>}
    <footer><Link className="brand" href="/">Mangalam</Link><p>Wedding invitations, beautifully shared.</p></footer>
  </main>;
}
