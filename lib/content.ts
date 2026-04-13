// ─── TYPES ONLY — safe to import in both server and client components ────────
// For reading actual data, use getContent() from lib/content.server.ts
// (server components / API routes only).

export type { SiteContent } from './content.server';

export type NavContent = {
  logo: string;
  links: string[];
  cta: string;
};
