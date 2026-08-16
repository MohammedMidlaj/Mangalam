# Mangalam

Mangalam is a mobile-first wedding invitation SaaS for Kerala/India. It uses one shared application to render every published invitation from stored data.

## Apps

- `apps/web` — Next.js customer experience and public invitation renderer.
- `apps/api` — Hono API for templates, invitations, and RSVP submissions.

## Run locally

1. Install dependencies with `pnpm install`.
2. Start both apps with `pnpm dev`.
3. Visit `http://localhost:3000` and open the seeded invitation at `http://localhost:3000/azad-shazna`.

The API runs at `http://localhost:3001` by default. Set `NEXT_PUBLIC_API_URL` in `apps/web/.env.local` if it runs elsewhere.

## Current foundation

The project includes the template catalogue, a guided local editor, one responsive public template, a Hono invitation API, RSVP endpoint, invitation status validation, and an in-memory development repository. Authentication, persistent storage, media storage, payment-provider integration, and administrative workflows remain the next implementation stages described in `requirements.md`.
