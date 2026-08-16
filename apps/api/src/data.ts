import type { Invitation, Template } from "./types.js";

export const templates: Template[] = [
  {
    id: "kerala-gold",
    name: "Kerala Gold",
    category: "Traditional",
    description: "A warm, elegant invitation with a modern Kerala sensibility.",
    accent: "#a86b31",
    supportedSections: ["cover", "family", "events", "directions", "rsvp"],
  },
  {
    id: "quiet-bloom",
    name: "Quiet Bloom",
    category: "Floral",
    description: "A soft, light-filled design for intimate celebrations.",
    accent: "#b65f78",
    supportedSections: ["cover", "family", "events", "gallery", "rsvp"],
  },
  {
    id: "midnight-vow",
    name: "Midnight Vow",
    category: "Modern",
    description: "A cinematic dark design with minimal, expressive type.",
    accent: "#8392d7",
    supportedSections: ["cover", "events", "directions", "rsvp"],
  },
];

export const invitations: Invitation[] = [
  {
    id: "inv_arun_nila",
    ownerId: "usr_demo",
    slug: "arun-nila",
    templateId: "kerala-gold",
    status: "published",
    nameOrder: "groom_first",
    expiresAt: "2027-12-31T23:59:59.000Z",
    couple: { groom: "Arun", bride: "Nila" },
    family: {
      groomParents: "Rajesh & Kavitha",
      brideParents: "Suresh & Anitha",
    },
    message:
      "With the blessings of our families, we warmly invite you to celebrate the beginning of a new chapter.",
    events: [
      {
        id: "evt_nikah",
        title: "Nikah",
        date: "2027-02-14",
        time: "11:30 AM",
        venue: "Lakeside Celebration Hall",
        address: "Kochi, Kerala",
        mapUrl: "https://maps.google.com/?q=Kochi,Kerala",
      },
      {
        id: "evt_reception",
        title: "Reception",
        date: "2027-02-16",
        time: "7:00 PM",
        venue: "Lakeside Celebration Hall",
        address: "Kochi, Kerala",
        mapUrl: "https://maps.google.com/?q=Kochi,Kerala",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    rsvpEnabled: true,
    publicDiscoveryEnabled: false,
  },
];
