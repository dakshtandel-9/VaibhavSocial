// ─── SERVER-ONLY: reads content from Supabase ──────────────────────────────
// Import ONLY in Server Components or API routes — never in 'use client' files.

import fs from 'fs';
import path from 'path';
import { supabase } from './supabase';

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
  clientVoices: { videos: string[] };
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

function getLocalContent(): SiteContent {
  const filePath = path.join(process.cwd(), 'lib', 'content.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw) as SiteContent;
}

export async function getContent(): Promise<SiteContent> {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single();

    if (error || !data?.content || Object.keys(data.content).length === 0) {
      // Supabase has no content yet — seed it from content.json
      const local = getLocalContent();
      await supabase.from('site_content').upsert({ id: 1, content: local });
      return local;
    }

    return data.content as SiteContent;
  } catch {
    // Fallback to local file if Supabase is unreachable
    return getLocalContent();
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const { error } = await supabase
    .from('site_content')
    .upsert({ id: 1, content, updated_at: new Date().toISOString() });

  if (error) throw new Error(error.message);
}
