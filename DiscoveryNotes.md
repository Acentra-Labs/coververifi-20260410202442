# Discovery Brief: CoverVerifi

**Generated:** 2026-04-10_16-01

---

## App Overview
**App Name:** CoverVerifi
**Alternative Names:** SubShield, CompliSub, CertPulse

CoverVerifi is a subcontractor insurance compliance platform built for construction consultants and general contractors in Idaho. It replaces the current manual process of phone calls, spreadsheets, and One Drive folders with automated certificate tracking, agent verification via email links, and real-time compliance dashboards. The platform manages the lifecycle from subcontractor onboarding (W9 + insurance cert collection) through ongoing verification before every draw payment.

## Target Users

| Role | Description | Access Level |
|---|---|---|
| **Administrator / Consultant** (Primary) | Dawn and potentially other consultants she licenses the platform to. Manages all GCs, subs, agents. Full system access. | Full CRUD on all entities, email template management, reporting |
| **General Contractor** | Dawn's clients (~20 initially). Views their own subs' compliance status, can add new subs, triggers verification requests. | Scoped to their own subcontractors only. Cannot see other GCs' subs. |
| **Insurance Agent** | Interacts via email links only — no login required. Confirms coverage, uploads new certificates, can flag "no longer agent." | Link-based access only: verify yes/no, upload cert, decline |
| **Subcontractor** | Minimal interaction — may upload certificates or W9s via a portal. | Self-service upload portal |

## Core Problem

General contractors in Idaho are legally liable for their subcontractors' workers' compensation coverage under **Idaho Code Section 72-216** (statutory employer doctrine). If an uninsured sub's employee is injured, the GC pays all benefits, plus faces a 10% penalty and potential criminal misdemeanor charges. General liability verification is equally critical — the $1M per occurrence industry standard protects against third-party claims.

**Current workaround:** Dawn manually calls or emails up to 20 different insurance agents per job before every draw payment, tracks certificates in spreadsheets and OneDrive, and has no automated way to detect mid-term cancellations or lapses. A single job with 15-20 subcontractors can take hours of phone calls.

**Why existing solutions fail:** Procore, HCSS, Avetta, and myCOI are enterprise-grade platforms starting at $7,500-$10,000+/year with 200+ certificate minimums and lengthy onboarding. They solve many problems Dawn doesn't have while being too expensive and complex for her 20-GC, ~1,000-subcontractor operation.

## Competitive Landscape

| Product | Price Range | Target | Rating | Key Weakness for Dawn's Use Case |
|---|---|---|---|---|
| **myCOI** | ~$200-400/mo, 200 cert minimum | Mid-market | G2: 4.7 | Minimum threshold too high; lengthy onboarding |
| **Avetta** | Enterprise custom pricing | Enterprise | G2: 3.6 | Way overbuilt; terrible support reviews; prohibitive cost |
| **TrustLayer** | $1,000+/yr custom | SMB-Enterprise | G2: ~4.5 | OCR errors; tries to upsell gap insurance to subs |
| **Jones** | Enterprise custom | Construction/CRE | ~4.0 | Enterprise pricing; 24hr review turnaround (not instant) |
| **BCS** | Free (25 vendors) to $17.80/vendor/yr | SMB-Mid | Limited | $10K annual minimum for full-service tier |
| **PINS** | $1,000+/yr tiered | Construction | 83% (SelectHub) | Smaller player; pricing gated behind sales call |
| **Certificial** | Free (5 suppliers), $99/mo+ | Mid-Enterprise | N/A | Learning curve; onboarding depends on data quality |
| **Billy** | ~$100-300/mo | Construction | N/A | Basic verification only; no fraud detection |

**CoverVerifi's market opportunity:** The SMB construction segment (under 100 vendors) is at only 32% COI software adoption vs. 76% for enterprise. Most solutions have high minimums, opaque pricing, and no Idaho-specific compliance defaults. A purpose-built, affordable, easy-to-onboard tool for small Idaho GCs fills a clear gap.

## Platform Recommendation

**Web App only** (mobile deferred per client direction)

Reasoning:
- Dawn confirmed mobile app can wait for a later phase
- All primary workflows (onboarding subs, sending verification emails, reviewing dashboards) are desk-based tasks
- Insurance agents interact via email links — no app needed
- GCs checking compliance status can use a responsive web app on mobile browsers initially
- Web-first allows fastest development within the 3-5 day prototype window

## Recommended Tech Stack

**React + Vite + TailwindCSS + shadcn/ui + Supabase**

| Layer | Technology | Reasoning |
|---|---|---|
| Frontend | React + Vite + TailwindCSS + shadcn/ui | SPA is ideal — no SEO needed (behind auth). Vite for fast dev. shadcn/ui for polished, accessible components without custom design work. |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + Edge Functions) | Built-in auth with role-based access, Row Level Security for GC data isolation, file storage for W9s/certificates, Edge Functions for email automation. Cost-efficient for Dawn's scale. |
| Email | Resend (or SendGrid) | Transactional email for verification requests, expiration alerts, and customizable templates. Resend has a generous free tier and excellent DX. |
| File Parsing | Supabase Edge Function + OCR API | For W9 ingestion/parsing. Can use a lightweight OCR service or AI extraction to parse uploaded W9 PDFs. |
| Hosting | Vercel or Netlify (free tier) | Cost-efficient for a prototype; easy deployment from Git. |

## Key Requirements

### MUST HAVE (MVP Prototype)

1. **Multi-role authentication system**
   - Email/password login for Admins and GCs
   - Role-based access control: Admin sees all, GC sees only their subs
   - [INFERRED] Password reset flow via email
   - [INFERRED] Session management with auto-logout after inactivity

2. **General Contractor management**
   - Admin can create/edit/deactivate GC accounts
   - Each GC has: company name, contact info, username/password
   - GC dashboard showing their subcontractors with compliance status at a glance
   - [INFERRED] GC can have multiple users/contacts within their company

3. **Subcontractor onboarding & management**
   - GC or Admin can add a new subcontractor with: company name, contact info, W9, insurance agent details
   - W9 upload with AI-powered parsing — auto-fill fields, highlight missing data
   - Subcontractors can belong to multiple GCs but each GC only sees their own relationship
   - Shared subcontractor data (insurance info) updates across all GC relationships
   - [INFERRED] Subcontractor status: Active, Inactive, Pending Verification
   - W9 renewal tracking (annual requirement)

4. **Insurance certificate tracking**
   - Track two policy types per subcontractor: **Workers' Compensation** and **General Liability**
   - For each policy: carrier name, policy number, effective dates, expiration date, coverage amounts, agent name/email/phone
   - Idaho compliance defaults: $1M GL per occurrence / $2M aggregate; WC statutory + $500K employer's liability
   - Visual compliance status: Compliant (green), Expiring Soon (yellow, 30 days), Expired (red), Not on File (gray)
   - Certificate PDF storage and retrieval
   - [INFERRED] Compliance percentage dashboard (e.g., "85% of your subs are compliant")
   - [INFERRED] Flag sole proprietor exemptions for workers' comp (Idaho Code §72-212(4)) — still track but mark as "Exempt - Sole Proprietor" with a warning about GC statutory employer liability

5. **Insurance agent directory & verification workflow**
   - Store agent contact info (name, agency, email, phone) linked to subcontractors
   - Auto-generate verification emails to agents using customizable templates
   - Agent receives email with a **unique secure link** (no login required) that allows:
     - Confirm coverage is current (Yes/No click)
     - Upload a new certificate PDF
     - Flag "I am no longer this subcontractor's agent"
   - [INFERRED] Track verification history with timestamps
   - [INFERRED] Auto-follow-up if agent hasn't responded within 3 business days

6. **Automated email notifications**
   - 30-day advance expiration warning to Admin, GC, and optionally the agent
   - Verification request emails with agent action links
   - Lapse notification emails (coverage expired) with template including: sub name, policy type, policy number, agent info
   - [INFERRED] Email log showing all sent communications with status (sent, opened, clicked)
   - Customizable email templates per GC (their branding, contact info)

7. **Additional insured endorsement tracking**
   - Configurable per GC: checkbox to require "Additional Insured" endorsement
   - Track whether the endorsement is on file for each sub-GC relationship
   - [INFERRED] Warn that a certificate statement alone does NOT confer additional insured rights — actual policy endorsement required (per Idaho case law)

### SHOULD HAVE (Important but not blocking MVP)

8. **Subcontractor self-service portal**
   - Subcontractor can log in or access via link to upload W9s and certificates
   - View their own compliance status across GCs they work for (without seeing GC details)

9. **Subcontract agreement tracking**
   - Upload and track annual subcontract agreements
   - Expiration tracking and renewal reminders
   - [INFERRED] Template subcontract agreement generation

10. **Reporting & audit support**
    - Generate audit-ready reports showing insurance compliance history by date range
    - Export to PDF/CSV for annual audit requirements
    - [INFERRED] Timestamped verification log as evidence of due diligence

11. **Draw payment compliance check**
    - Before a draw, show all subs on that job with current compliance status
    - Block or warn if any sub is non-compliant
    - [INFERRED] Integration point for future accounting/payment system tie-in

### NICE TO HAVE (Phase 2+)

12. Mobile app for GCs (confirmed deferred)
13. Ghost policy detection/tracking
14. Multi-state support with state-specific compliance rules
15. Consultant licensing / white-label for resale to other consultants
16. [INFERRED] Procore integration (dominant construction PM software)
17. [INFERRED] Idaho Industrial Commission database lookup for WC registration verification

## UX Considerations

### User Flows

**Admin (Dawn) primary flow:**
1. Login → Admin Dashboard (overview of all GCs, aggregate compliance stats)
2. Select a GC → See all their subs with compliance status cards
3. Add new sub → Upload W9 → System parses and pre-fills → Add agent info → System auto-emails agent for certificates
4. Review incoming certificates → Approve/flag issues → Status updates automatically
5. Expiration approaching → System sends alerts → Dawn reviews and triggers verification emails
6. Before draw → Pull compliance report for all subs on the job → Flag non-compliant

**GC primary flow:**
1. Login → GC Dashboard (their subs only, compliance status at a glance)
2. Add new sub → Enter basic info → System checks if sub already exists in the system → Pre-fill known data (agent info, etc.)
3. View sub detail → See insurance status, certificates on file, verification history
4. [INFERRED] Receive email notification if a sub's coverage lapses

**Insurance Agent flow (no login):**
1. Receive email: "Please verify coverage for [Sub Name], Policy #[XXX]"
2. Click secure link → Landing page with three options:
   - "Yes, coverage is current" (one click)
   - "Upload new certificate" (drag & drop PDF)
   - "I am no longer this sub's agent" (one click + optional new agent info)
3. Done — confirmation page, no account needed

### Design Notes
- No design preferences from client — use clean, professional UI with shadcn/ui defaults
- Dashboard-first design: compliance status should be visible within 2 seconds of login
- Color-coded compliance: Green (current), Yellow (expiring ≤30 days), Red (expired/lapsed), Gray (missing)
- [INFERRED] Responsive design for tablet/mobile browser use by GCs in the field
- [INFERRED] Minimize clicks — most common actions (verify, email agent, view cert) should be 1-2 clicks from dashboard
- [INFERRED] Bulk actions: select multiple subs → send verification emails to all their agents at once

## Technical Considerations

### Data Model (Key Entities)
- **Users** (id, email, password_hash, role, associated_gc_id)
- **General Contractors** (id, company_name, contact_info, email_template_config)
- **Subcontractors** (id, company_name, contact_info, w9_file_url, sole_proprietor_flag, w9_expiration)
- **GC_Subcontractor** (junction: gc_id, sub_id, additional_insured_required, subcontract_agreement_url, status)
- **Insurance Agents** (id, name, agency_name, email, phone)
- **Insurance Policies** (id, sub_id, agent_id, type [WC|GL], carrier, policy_number, effective_date, expiration_date, coverage_amount, certificate_url)
- **Verification Requests** (id, policy_id, agent_id, token, status, requested_at, responded_at, response_type)
- **Email Log** (id, to, template_type, gc_id, sub_id, sent_at, status)
- [INFERRED] **Audit Trail** (id, entity_type, entity_id, action, user_id, timestamp)

### Integrations
- **Email service** (Resend/SendGrid) for transactional emails with template support
- **File storage** (Supabase Storage) for W9s, certificates, subcontract agreements
- **OCR/AI parsing** for W9 document extraction (can use a lightweight service or Supabase Edge Function calling an AI API)
- [INFERRED] **Cron job / scheduled function** for daily expiration checks and automated alerts

### Security & Compliance
- Row Level Security (RLS) in Supabase ensures GCs can only access their own subcontractor data
- Secure, time-limited tokens for agent verification links (expire after 7 days)
- [INFERRED] All certificate uploads should be stored with encryption at rest
- [INFERRED] Audit log for compliance — track who verified what and when (critical for annual audits)
- No Idaho-specific data privacy statute beyond general business practices, but handle W9s (containing SSN/EIN) with appropriate security

### Idaho-Specific Compliance Defaults
| Coverage | Default Threshold | Source |
|---|---|---|
| General Liability (per occurrence) | $1,000,000 | Industry standard (state minimum is $300K) |
| General Liability (aggregate) | $2,000,000 | Industry standard |
| Workers' Comp (Part A) | Statutory | Idaho Code §72-301 |
| Workers' Comp Employer's Liability | $500,000 | Standard NCCI policy default |
| Sole Proprietor WC Exemption | Flagged, not required | Idaho Code §72-212(4) |

### Hosting & Cost Estimate (for Dawn)
- **Supabase Free Tier**: 50K monthly active users, 500MB database, 1GB storage — sufficient for prototype and early production
- **Vercel Free Tier**: Hosting for the React SPA
- **Resend Free Tier**: 3,000 emails/month — sufficient for ~1,000 subs with monthly verification cycles
- **Estimated production cost**: $0-25/month initially, scaling to ~$50-100/month as usage grows

## Open Questions

1. **Business model specifics**: Dawn said "monthly or flat fee or not sure" — the prototype can be built without this, but pricing pages/billing integration will need clarity before launch
2. **"Endorsement" reference**: The notes mention "something about endorsement but missed it" — likely refers to Additional Insured endorsements (covered above), but should confirm with Dawn
3. **Ghost policy**: Mentioned as an option — need to clarify what action should be taken when a ghost policy is detected (notify GC? block payment? informational only?)
4. **Resale / multi-consultant model**: Dawn mentioned wanting to "resell the app" to other consultants — this is a Phase 2 concern but will influence database architecture (multi-tenancy). The current data model supports it.
5. **W9 parsing accuracy expectations**: Should the system attempt full AI parsing of W9 PDFs, or is a simpler approach (upload + manual entry with pre-filled template) acceptable for MVP? Full AI parsing adds complexity and cost.
6. **Coverage amount configurability**: Should the $1M GL / $500K WC thresholds be configurable per GC, or are they fixed for all GCs? (Some GCs may have different contractual requirements)
7. **Draw/payment workflow integration**: How does Dawn currently track which subs are on a specific draw? Is this a list she receives from the GC, or does the system need job/project tracking?
