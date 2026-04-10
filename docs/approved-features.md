# Approved Features: CoverVerifi

**Summary of changes made to FEATURES.md:**

1. **Added** Idaho case law advisory tooltip to `CertificateCard.jsx` in Feature 5 — warns that certificate statements alone don't confer additional insured rights, plus amber warning badge when endorsement is missing but GC requires it
2. **Added** Subcontractor Self-Service Portal as NICE TO HAVE #9 (from Brief SHOULD HAVE #8) — token-based upload portal with compliance status view
3. **Added** 6 new assumptions (#11–16) addressing all open questions from the discovery brief: billing deferred, coverage amounts hardcoded, draw workflow list-based, W-9 parsing manual, ghost policy informational, endorsement is checkbox

The decomposition holds at **7 MUST HAVE / 11 NICE TO HAVE / 15 FUTURE** features, backed by a 13-table Supabase schema with full SQL definitions and a 5-day build plan. All 7 discovery brief MUST HAVEs are covered — email notifications and endorsement workflows are correctly scoped as mock/checkbox for the prototype with full implementations in FUTURE.
