import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mangalam — wedding invitations, beautifully shared",
  description: "Create a mobile-first wedding invitation website in minutes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
