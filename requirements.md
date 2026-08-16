# Software Requirements Specification (SRS)

## Wedding Invitation Website SaaS

## 1. Purpose

Build a mobile-first SaaS platform that lets customers create, pay for, and publish a personalised wedding invitation website without design or technical skills.

Every invitation is stored as structured data and rendered by one shared application. A customer receives a shareable URL such as `appdomain.in/azad-shazna`; the platform does not create a separate deployment per wedding.

The initial market is Kerala/India, with support for local wedding formats, WhatsApp sharing, multilingual invitations, INR payments, and culturally relevant templates.

## 2. Scope

The platform lets customers choose an invitation template; enter couple, family, event, venue, and message details; upload photos; preview the result; pay; and publish a personalised invitation URL.

It includes customer, guest, and administrator experiences. It excludes, for the MVP, a freeform drag-and-drop builder, individual deployments per customer, native apps, a third-party template marketplace, and printed-invite fulfilment.

## 3. Personas

| Persona | Primary need |
| --- | --- |
| Couple/customer | Create and share a polished invitation quickly, typically via WhatsApp. |
| Family representative | Create or manage an invitation on the couple's behalf. |
| Guest | View event details, directions, photos, and optionally RSVP. |
| Administrator | Manage users, templates, invitations, payments, support, and moderation. |
| Template designer (future) | Build and maintain reusable invitation templates. |

## 4. Roles and permissions

| Role | Permissions |
| --- | --- |
| Visitor | Browse public templates and published invitations. |
| Customer | Create, edit, preview, pay for, publish, unpublish, and renew invitations they own. |
| Customer collaborator (future) | Edit a specific invitation without account-wide billing access. |
| Guest | View a published invitation and submit RSVP where enabled. |
| Admin | Manage users, invitations, templates, payments, analytics, and moderation. |
| Support admin | Assist customers with restricted access to financial and configuration actions. |

## 5. Functional requirements

### 5.1 Accounts and authentication

- Users can register, sign in, sign out, and reset passwords using email.
- The system supports one or more invitations per user.
- Dashboard, editing, payment, and publishing actions require authentication.
- Phone/OTP sign-in should be considered for a later India-first phase.

### 5.2 Template selection

- The platform provides a template gallery with a name, thumbnail, category, supported features, and preview.
- Initial categories should include Kerala Muslim, Kerala Hindu, Kerala Christian, minimal, floral, modern, luxury, and bilingual styles.
- A customer selects one template per invitation.
- Compatible content is preserved when a customer changes template.
- Templates may expose visual controls such as theme colour, font pairing, cover image, section visibility, and layout variants.

### 5.3 Invitation editing

- Customers can create and save an invitation draft through a guided form.
- The form supports bride and groom names, invitation message, family/parent names, one or more events, venue details, maps, cover image, gallery photos, optional prayer/quote/contact details, RSVP configuration, and language settings.
- Each event supports title, date, time, venue, address, map link, optional dress code, and display order.
- Customers can hide optional sections without deleting their data.
- The system validates required information before publication.

### 5.4 Preview

- Customers can preview unpublished invitations before payment and publication.
- Preview closely matches the published experience and supports a mobile viewport.
- Unpublished previews are clearly labelled and use protected, expiring preview links where externally shared.

### 5.5 Publishing and URLs

- Every invitation has a unique, validated URL slug.
- The initial public URL format is `appdomain.in/{slug}`.
- Publishing requires verified payment or an administrator-granted entitlement.
- Invitation states are `draft`, `pending_payment`, `published`, `expired`, `unpublished`, and `suspended`.
- A URL request loads the selected template and invitation data dynamically from shared infrastructure.
- Search-engine indexing is opt-in; it is disabled by default.
- Published invitations include suitable title, description, and social-preview metadata for WhatsApp and other sharing platforms.

### 5.6 Media

- Customers can upload, reorder, replace, and remove a cover image and gallery media.
- The system validates file type and size, applies content-safety checks, and creates optimised mobile and social-preview variants.
- Media remains private by default and is publicly deliverable only while used in an active published invitation.

### 5.7 RSVP

- Templates can include an optional RSVP section.
- Guests can submit attendance, guest count, and optional message/contact details.
- Owners can enable/disable RSVP, set a deadline, review totals, and export responses.
- Where contact information is collected, the RSVP form displays an appropriate consent notice.

### 5.8 Payments

- The platform supports INR payments through an India-suitable provider such as Razorpay, Cashfree, or another approved provider.
- Available methods should include UPI, cards, net banking, and wallets where supported by the provider.
- The system creates a payment order before checkout and activates an entitlement only after verified confirmation.
- Payment webhooks are signature-verified and idempotent.
- Payment records retain the provider reference, amount, currency, status, invitation, and receipt/invoice reference where available.
- Plans, discounts, promotions, renewals, and prices are administrator-configurable; exact pricing is not hardcoded as a requirement.

### 5.9 Expiration and renewal

- Published invitations have an administrator-configurable active period.
- The platform notifies customers before expiry by email; WhatsApp/SMS may follow in a later phase where consent and integration are available.
- Expired URLs show a graceful expiry page, not an application error.
- When offered by the plan, a customer can renew and retain the original URL.
- Administrators can extend, reactivate, or suspend invitations manually.
- Customer data is retained for a configurable post-expiry period to support renewal and recovery.

### 5.10 Administration

Administrators can search and manage users and invitations; manage template availability and featured status; configure plans and promotions; inspect payments and webhook failures; moderate media/content; grant manual entitlements with a reason; access analytics; and review audit logs.

## 6. Non-functional requirements

### Performance and reliability

- Public invitation pages are fast on typical Indian mobile networks.
- Images are responsive, compressed, and lazy-loaded where appropriate.
- CDN delivery is used for template assets and media.
- A malformed invitation or failed upload cannot affect other customers.
- Payment processing is retry-safe and idempotent.
- Customer and payment data is backed up regularly.
- Public failures show meaningful fallback pages.

### Usability, accessibility, and scalability

- The creation flow is usable by non-technical customers and is mobile-first.
- Forms use clear Indian-wedding terminology and examples.
- English is supported first; Malayalam support is prioritised. Arabic and additional languages depend on template capability.
- Templates provide reasonable contrast, readable typography, keyboard-accessible controls, and do not rely solely on colour or animation for important content.
- Adding an invitation requires database and media records, never a new application deployment.
- Public rendering and media delivery can scale independently of the dashboard.

## 7. Core user flows

### Create and publish

1. Customer signs in and chooses **Create invitation**.
2. Customer selects a template and enters wedding, family, event, venue, media, and optional RSVP details.
3. Customer saves a draft and previews it in a mobile layout.
4. Customer selects an available URL slug and completes payment.
5. The payment webhook is verified and grants a publishing entitlement.
6. Customer publishes and copies the share URL.

### Guest visit

1. Guest opens a shared URL.
2. The application reads the slug and retrieves the matching published invitation.
3. The selected template renders the stored data.
4. The guest views details, opens maps or calendar links, and optionally submits RSVP.

### Renewal

1. Customer receives an expiry reminder or sees an expiry notice.
2. Customer chooses an available renewal option and pays.
3. Verified payment extends the invitation's active period without changing its URL.

## 8. Invitation and template system

A template is a reusable presentation layer defining visual style, layout, sections, validation, and supported settings. It never contains a specific customer's wedding content.

An invitation references its owner, template/version, structured content, style configuration, media, publishing state, entitlement, slug, and RSVP configuration. Templates are versioned so a template update does not unexpectedly break a published invitation; invitations remain on a compatible version until intentionally migrated.

## 9. Data model overview

| Entity | Key fields |
| --- | --- |
| User | ID, name, email, phone, authentication data, role, timestamps |
| Invitation | ID, owner ID, slug, template/version, status, title, content JSON, style JSON, published/expiry dates |
| Event | ID, invitation ID, type, title, date/time, venue, address, map URL, display order |
| Media asset | ID, invitation ID, storage key, type, size, variants, alt text, upload status |
| Template | ID, name, category, version, configuration schema, availability, preview media |
| Payment | ID, user ID, invitation ID, provider/reference, amount, currency, status, timestamps |
| Entitlement | ID, invitation ID, plan/reference, active period, status |
| RSVP response | ID, invitation ID, attendance, guest count, contact fields, message, submitted date |
| Audit log | ID, actor, action, entity, metadata, timestamp |
| Notification | ID, user/invitation ID, type, delivery status, scheduled/sent date |

Flexible customer content may use JSON, while ownership, state, slug, payment, and expiry fields remain relational/queryable.

## 10. Modules and APIs

| Module | Responsibilities |
| --- | --- |
| Authentication | Registration, login, sessions, password reset, role checks |
| Customer dashboard | Invitation list, creation, editing, preview, publication, renewal |
| Template service | Catalog, schemas, compatibility, previews, versioning |
| Invitation service | Validation, drafts, slugs, publishing state, rendering data |
| Public renderer | Retrieves a published invitation by slug and renders its template |
| Media service | Secure upload, validation, optimisation, storage, delivery URLs |
| Payment service | Checkout, webhook verification, records, entitlements |
| RSVP service | Submission, validation, reporting, export |
| Notification service | Payment, publication, expiry, renewal, and system messages |
| Admin service | Management, moderation, configuration, and audit controls |
| Analytics service | Event collection, aggregation, and reporting |

## 11. Hosting and deployment architecture

The platform uses shared multi-tenant infrastructure:

```text
Customer and admin dashboards
            |
            v
    One web application
            |
    +-------+-------+
    v               v
Database       Object storage/CDN
    |
    v
Public router: /{slug}
    |
    v
Invitation renderer (template + stored data)
```

Recommended initial components are a modern full-stack web application (for example, Next.js), managed relational database, object storage with CDN delivery, Indian payment gateway, email provider, managed hosting (such as Vercel or Cloudflare), and scheduled/background jobs for expiry, image processing, notifications, and webhook retries. Custom domains are a later addition and still route to the same shared renderer.

## 12. Security and privacy

- All traffic uses HTTPS.
- Passwords are securely hashed; sessions/tokens are protected appropriately.
- Authorisation ensures customers only access their own invitations, media, payments, and RSVPs.
- Administrator actions follow least privilege and are audited.
- The platform does not store card details.
- Payment webhooks are signature-verified.
- Uploads are type-checked, size-limited, safety-scanned where practical, and stored outside the application filesystem.
- RSVP and customer contact details are available only to invitation owners and authorised staff.
- The launch includes privacy policy, terms, and an account/data-deletion process aligned with applicable Indian requirements.

## 13. Analytics and error handling

The platform collects privacy-conscious page views, unique visitors, referrers where available, device category, RSVP conversion, template and publication conversion, payment success/failure, renewal conversion, error rates, and performance metrics. Customers may see simple invitation views and RSVP totals; detailed personally identifying visitor tracking is not needed for MVP.

Invalid/unavailable slugs show a branded not-found page. Expired URLs show an expiry page. Failed uploads preserve form progress and permit retry. Failed payments retain a recoverable unpaid draft. Duplicate webhooks cannot create duplicate entitlements. Unexpected rendering failures are logged and return a friendly fallback page. Repeated payment, upload, and renderer failures alert administrators.

## 14. Delivery phases

### MVP

- Email/password accounts and customer dashboard.
- Curated mobile-responsive template set.
- Guided wedding, family, event, venue, media, and optional RSVP fields.
- English-first, Malayalam-ready content structure.
- Draft saving, mobile preview, slug URLs, image optimisation, INR payments, verified publication, configurable expiration, basic administration, and basic analytics.

### Future phases

- Malayalam, Arabic, and additional-language authoring.
- Phone/OTP authentication and WhatsApp notifications.
- Collaborators, video invitations, music, custom domains, QR codes, advanced RSVP/guest management, AI-assisted copy and translation, vendor/designer accounts, template marketplace, and premium custom-design services.

## 15. Assumptions and dependencies

Most guests access invitations through smartphones and WhatsApp. Customers accept guided forms rather than fully bespoke layouts. The early template set covers the majority of target Kerala wedding formats. Customers provide rights-cleared media and content. Payment-provider onboarding, merchant verification, and applicable tax/invoice obligations are completed before commercial launch.

External dependencies include a hosting/CDN provider, database, object storage, Indian payment gateway, email provider, optional mapping/calendar services, optional analytics/error-monitoring services, and domain/DNS provider.

## 16. Acceptance criteria

The MVP is acceptable when a new user can create an account, select a template, enter wedding details, upload photos, save a draft, preview it on mobile, and choose an available slug. A verified payment activates publication; the public URL renders the correct data/template from shared infrastructure without a customer-specific deployment. Guests can view event details and open directions. Customer data remains isolated by owner, media is validated and optimised, invitations expire gracefully, administrators can manage invitation states, and payment/publication/renewal/admin actions are logged.


