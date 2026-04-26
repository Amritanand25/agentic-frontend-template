---
name: security-guardian
description: Frontend security — input validation (Zod), XSS prevention, auth tokens, dependency auditing, OWASP compliance. Use for forms, API calls, or before deployment.
allowed-tools: Read Bash Grep Glob
---

# Security Guardian

## Checklist

- [ ] All user inputs validated with Zod schemas
- [ ] No `dangerouslySetInnerHTML` without DOMPurify
- [ ] No secrets in code — use `import.meta.env.VITE_*`
- [ ] No sensitive data in localStorage (use httpOnly cookies or memory)
- [ ] X-Tenant-ID on all API calls
- [ ] HTTPS enforced in production
- [ ] CSP headers configured
- [ ] `yarn audit --audit-level=high` passes
- [ ] `.env` files in `.gitignore`

## Key Rules

**Input validation:** Zod for ALL user inputs + `zodResolver` with React Hook Form.

**XSS prevention:** Prefer `<div>{text}</div>` (React auto-escapes). If HTML needed, sanitize with `DOMPurify.sanitize(html, { ALLOWED_TAGS: [...] })`.

**Token storage:**

- Best: httpOnly cookies (immune to XSS)
- OK: sessionStorage (cleared on tab close)
- OK: in-memory variable (cleared on refresh)
- Never: localStorage

**Tenant isolation:** Every API call includes `X-Tenant-ID`. Scope localStorage: `tenant-${tenantId}-${key}`.

**Dependencies:** `yarn check-pkg <name>` before installing. Reject if >100KB, unmaintained, <100 stars, >10 deps.

**Never:** commit `.env`, `eval()` user input, log passwords/tokens/PII, hardcode secrets.
