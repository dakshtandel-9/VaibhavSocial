// ─── SERVER-ONLY: reads content from local JSON files ──────────────────────
// Import ONLY in Server Components or API routes — never in 'use client' files.

import fs from 'fs';
import path from 'path';

export type SiteContent = {
  WA_LINK: string;
  nav: { logo: string; links: string[]; cta: string };
  hero: {
    badge: string;
    headline: [string, string];
    accentWord: string;
    sub: string;
    ctas: { primary: string; secondary: string };
    arcVideos: string[];
  };
  showcase: { label: string; title: string; subtitle: string; row1: string[]; row2: string[] };
  clientVoices: { visible: boolean; videos: string[] };
  promise: { headline: string; highlight: string; body: string };
  services: {
    label: string; title: string; subtitle: string;
    cards: { icon: string; title: string; body: string }[];
  };
  beyond: {
    label: string; title: string; subtitle: string;
    items: { icon: string; title: string; body: string }[];
  };
  results: {
    label: string; title: string; subtitle: string;
    stats: { number: string; label: string; desc: string; context: string }[];
  };
  about: {
    label: string; badge: string; headline: string;
    paragraphs: string[]; quote: string; cta: string;
    profileImage: string;
    statPills: { icon: string; strong: string; text: string }[];
  };
  process: {
    label: string; title: string; subtitle: string;
    steps: { num: string; title: string; body: string }[];
  };
  testimonials: {
    label: string; title: string; subtitle: string;
    cards: { text: string; name: string; platform: string; initial: string; stars: number }[];
  };
  pricing: {
    label: string; title: string; cardHeadline: string; cardSub: string;
    features: string[]; cta: string; note: string;
  };
  cta: {
    headline: string; sub: string; btn: string; availabilityText: string;
    badges: { num: string; label: string }[]; note: string;
  };
  footer: { logo: string; links: string[]; copy: string };
};

function readJson<T>(relPath: string): T {
  const filePath = path.join(process.cwd(), relPath);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function getContent(): Promise<SiteContent> {
  const base = readJson<Omit<SiteContent, 'hero' | 'showcase' | 'clientVoices'> & {
    hero: Omit<SiteContent['hero'], 'arcVideos'>;
    showcase: Omit<SiteContent['showcase'], 'row1' | 'row2'>;
  }>('lib/content.json');

  const heroVideos = readJson<{ videos: string[] }>('lib/videos/hero.json');
  const showcaseVideos = readJson<{ row1: string[]; row2: string[] }>('lib/videos/showcase.json');
  const clientVoicesVideos = readJson<{ visible?: boolean; videos: string[] }>('lib/videos/client-voices.json');

  return {
    ...base,
    hero: { ...base.hero, arcVideos: heroVideos.videos },
    showcase: { ...base.showcase, row1: showcaseVideos.row1, row2: showcaseVideos.row2 },
    clientVoices: {
      visible: clientVoicesVideos.visible ?? true,
      videos: clientVoicesVideos.videos,
    },
  };
}
