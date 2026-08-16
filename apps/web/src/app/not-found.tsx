import Link from "next/link";

export default function NotFound() {
  return <main className="not-found"><p className="eyebrow">NOT AVAILABLE</p><h1>This invitation can&apos;t be found.</h1><p>It may have expired, been unpublished, or the link may be incorrect.</p><Link className="button" href="/">Visit Mangalam</Link></main>;
}
