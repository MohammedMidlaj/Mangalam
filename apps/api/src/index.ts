import { serve } from "@hono/node-server";
import { cors } from "hono/cors";
import { Hono } from "hono";
import { z } from "zod";
import { invitations, templates } from "./data.js";
import type { InvitationStatus } from "./types.js";

const app = new Hono();
const port = Number(process.env.PORT ?? 3001);

app.use("/*", cors({ origin: process.env.WEB_ORIGIN ?? "http://localhost:3000" }));

const slugSchema = z
  .string()
  .min(3)
  .max(60)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens only.");

const draftSchema = z.object({
  slug: slugSchema,
  templateId: z.string().min(1),
  couple: z.object({ groom: z.string().min(1), bride: z.string().min(1) }),
  nameOrder: z.enum(["groom_first", "bride_first"]),
  message: z.string().min(1).max(500),
  status: z.enum(["draft", "pending_payment"] satisfies InvitationStatus[]),
});

const rsvpSchema = z.object({
  name: z.string().min(2).max(100),
  attendance: z.enum(["attending", "declined"]),
  guestCount: z.number().int().min(0).max(10),
  message: z.string().max(500).optional(),
});

app.get("/health", (c) => c.json({ status: "ok" }));
app.get("/api/templates", (c) => c.json({ data: templates }));

app.get("/api/invitations/:slug", (c) => {
  const invitation = invitations.find((item) => item.slug === c.req.param("slug"));
  if (!invitation) return c.json({ error: "Invitation not found." }, 404);
  if (invitation.status !== "published") {
    return c.json({ error: "This invitation is not publicly available." }, 404);
  }
  if (new Date(invitation.expiresAt) < new Date()) {
    return c.json({ error: "This invitation has expired.", status: "expired" }, 410);
  }
  return c.json({ data: invitation });
});

app.post("/api/invitations", async (c) => {
  const parsed = draftSchema.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: "Invalid invitation draft.", issues: parsed.error.flatten() }, 422);
  if (invitations.some((item) => item.slug === parsed.data.slug)) {
    return c.json({ error: "That invitation URL is already in use." }, 409);
  }
  if (!templates.some((item) => item.id === parsed.data.templateId)) {
    return c.json({ error: "Template not found." }, 422);
  }
  return c.json({ data: parsed.data, message: "Draft validation passed. Persist this through the repository layer next." }, 201);
});

app.post("/api/invitations/:slug/rsvp", async (c) => {
  const invitation = invitations.find((item) => item.slug === c.req.param("slug"));
  if (!invitation || invitation.status !== "published" || !invitation.rsvpEnabled) {
    return c.json({ error: "RSVP is not available for this invitation." }, 404);
  }
  const parsed = rsvpSchema.safeParse(await c.req.json());
  if (!parsed.success) return c.json({ error: "Invalid RSVP.", issues: parsed.error.flatten() }, 422);
  return c.json({ data: { id: crypto.randomUUID(), ...parsed.data }, message: "Thank you for your RSVP." }, 201);
});

app.notFound((c) => c.json({ error: "Route not found." }, 404));

serve({ fetch: app.fetch, port }, () => {
  console.log(`Mangalam API listening on http://localhost:${port}`);
});
