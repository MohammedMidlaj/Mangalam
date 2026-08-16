export type InvitationStatus =
  | "draft"
  | "pending_payment"
  | "published"
  | "expired"
  | "unpublished"
  | "suspended";

export type WeddingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl?: string;
};

export type Invitation = {
  id: string;
  ownerId: string;
  slug: string;
  templateId: string;
  status: InvitationStatus;
  expiresAt: string;
  couple: { groom: string; bride: string };
  family: { groomParents: string; brideParents: string };
  message: string;
  events: WeddingEvent[];
  heroImage: string;
  rsvpEnabled: boolean;
  publicDiscoveryEnabled: boolean;
};

export type Template = {
  id: string;
  name: string;
  category: string;
  description: string;
  accent: string;
  supportedSections: string[];
};
