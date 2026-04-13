'use client';

import { useState, useEffect, useCallback, useContext, createContext, useRef } from 'react';

// ─── Password context so upload components don't need prop drilling ───────────
const PasswordCtx = createContext('');


// ─── Types ────────────────────────────────────────────────────────────────────
type Content = {
  WA_LINK: string;
  nav: { logo: string; cta: string };
  hero: { badge: string; headline: [string, string]; sub: string; ctas: { primary: string; secondary: string }; arcVideos: string[] };
  showcase: { label: string; title: string; subtitle: string; row1: string[]; row2: string[] };
  clientVoices: { videos: string[] };
  promise: { headline: string; highlight: string; body: string };
  services: { label: string; title: string; subtitle: string; cards: { icon: string; title: string; body: string }[] };
  beyond: { label: string; title: string; subtitle: string; items: { icon: string; title: string; body: string }[] };
  results: { label: string; title: string; subtitle: string; stats: { number: string; label: string; desc: string; context: string }[] };
  about: { label: string; headline: string; paragraphs: string[]; quote: string; cta: string; profileImage: string; statPills: { icon: string; strong: string; text: string }[] };
  process: { label: string; title: string; subtitle: string; steps: { num: string; title: string; body: string }[] };
  testimonials: { label: string; title: string; subtitle: string; cards: { text: string; name: string; platform: string; initial: string; stars: number }[] };
  pricing: { label: string; title: string; cardHeadline: string; cardSub: string; features: string[]; cta: string; note: string };
  cta: { headline: string; sub: string; btn: string; availabilityText: string; badges: { num: string; label: string }[]; note: string };
  footer: { logo: string; links: string[]; copy: string };
};

const TABS = [
  { id: 'hero', label: '🎥 Hero' },
  { id: 'showcase', label: '🎬 Showcase' },
  { id: 'clientVoices', label: '🗣️ Client Voices' },
  { id: 'promise', label: '⚡ Promise' },
  { id: 'services', label: '🛠️ Services' },
  { id: 'beyond', label: '🌟 Beyond' },
  { id: 'results', label: '📊 Results' },
  { id: 'about', label: '🤝 About' },
  { id: 'process', label: '⚙️ Process' },
  { id: 'testimonials', label: '⭐ Testimonials' },
  { id: 'pricing', label: '💰 Pricing' },
  { id: 'cta', label: '📢 CTA' },
  { id: 'footer', label: '🦶 Footer' },
  { id: 'settings', label: '⚙️ Settings' },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const S = {
  page: { display: 'flex', height: '100vh', overflow: 'hidden', background: '#0f0f0f' } as React.CSSProperties,
  sidebar: { width: 220, background: '#161616', borderRight: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column' as const, overflow: 'hidden' },
  sidebarHeader: { padding: '1.5rem 1.25rem 1rem', borderBottom: '1px solid #2a2a2a' },
  sidebarLogo: { fontSize: '1rem', fontWeight: 800, color: '#FF6B00', letterSpacing: '-0.3px' },
  sidebarSub: { fontSize: '0.7rem', color: '#555', marginTop: 2 },
  navList: { flex: 1, overflowY: 'auto' as const, padding: '0.5rem 0' },
  navItem: (active: boolean): React.CSSProperties => ({
    display: 'block', width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
    padding: '0.6rem 1.25rem', fontSize: '0.82rem', fontWeight: active ? 600 : 400,
    background: active ? 'rgba(255,107,0,0.12)' : 'transparent',
    color: active ? '#FF6B00' : '#888',
    borderLeft: active ? '3px solid #FF6B00' : '3px solid transparent',
    transition: 'all 0.15s',
  }),
  main: { flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' as const },
  topbar: { padding: '1rem 2rem', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#161616', position: 'sticky' as const, top: 0, zIndex: 10 },
  topbarTitle: { fontSize: '1rem', fontWeight: 700, color: '#fff' },
  saveBtn: (saving: boolean): React.CSSProperties => ({
    background: saving ? '#cc5500' : '#FF6B00', color: '#fff', border: 'none', borderRadius: 8,
    padding: '0.5rem 1.4rem', fontWeight: 700, fontSize: '0.85rem', cursor: saving ? 'not-allowed' : 'pointer',
    transition: 'background 0.2s',
  }),
  content: { padding: '2rem', flex: 1 },
  section: { marginBottom: '2rem' },
  sectionTitle: { fontSize: '0.7rem', fontWeight: 700, color: '#FF6B00', letterSpacing: 2, textTransform: 'uppercase' as const, marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #2a2a2a' },
  card: { background: '#1a1a1a', borderRadius: 12, padding: '1.25rem', marginBottom: '1rem', border: '1px solid #2a2a2a' },
  cardTitle: { fontSize: '0.78rem', fontWeight: 600, color: '#aaa', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 },
  row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' } as React.CSSProperties,
  field: { display: 'flex', flexDirection: 'column' as const, gap: 4 },
  label: { fontSize: '0.7rem', fontWeight: 600, color: '#666', textTransform: 'uppercase' as const, letterSpacing: 0.5 },
  input: { background: '#111', border: '1px solid #333', borderRadius: 6, padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', width: '100%', outline: 'none', boxSizing: 'border-box' as const },
  textarea: { background: '#111', border: '1px solid #333', borderRadius: 6, padding: '0.5rem 0.75rem', color: '#fff', fontSize: '0.85rem', width: '100%', outline: 'none', resize: 'vertical' as const, minHeight: 80, boxSizing: 'border-box' as const, fontFamily: 'inherit' },
  addBtn: { background: 'rgba(255,107,0,0.12)', color: '#FF6B00', border: '1px dashed rgba(255,107,0,0.4)', borderRadius: 6, padding: '0.4rem 0.9rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' },
  removeBtn: { background: 'rgba(255,80,80,0.1)', color: '#ff6060', border: 'none', borderRadius: 4, padding: '0.2rem 0.5rem', fontSize: '0.7rem', cursor: 'pointer', flexShrink: 0 },
  toast: (type: 'success' | 'error'): React.CSSProperties => ({
    position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
    background: type === 'success' ? '#1a3d1a' : '#3d1a1a',
    border: `1px solid ${type === 'success' ? '#2d6a2d' : '#6a2d2d'}`,
    color: type === 'success' ? '#6ddb6d' : '#db6d6d',
    borderRadius: 10, padding: '0.75rem 1.25rem', fontSize: '0.85rem', fontWeight: 600,
  }),
  authPage: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0f0f0f' } as React.CSSProperties,
  authCard: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '2.5rem', width: 340 },
  videoPreview: { width: 60, aspectRatio: '9/16', objectFit: 'cover' as const, borderRadius: 6, flexShrink: 0 },
};

// ─── Small helpers ────────────────────────────────────────────────────────────
function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div style={S.field}>
      <span style={S.label}>{label}</span>
      {multiline
        ? <textarea style={S.textarea} value={value} onChange={e => onChange(e.target.value)} rows={3} />
        : <input style={S.input} value={value} onChange={e => onChange(e.target.value)} />}
    </div>
  );
}

function VideoUploadList({ urls, onChange, folder = 'vaibhav/videos' }: { urls: string[]; onChange: (urls: string[]) => void; folder?: string }) {
  const password = useContext(PasswordCtx);
  const [uploading, setUploading] = useState<Record<number, string>>({});
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const update = (i: number, v: string) => { const a = [...urls]; a[i] = v; onChange(a); };
  const remove = (i: number) => onChange(urls.filter((_, idx) => idx !== i));
  const add = () => onChange([...urls, '']);

  async function handleFile(i: number, file: File) {
    setUploading(u => ({ ...u, [i]: 'Uploading…' }));
    const form = new FormData();
    form.append('file', file);
    form.append('folder', folder);
    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: { 'x-admin-password': password },
        body: form,
      });
      const data = await res.json();
      if (data.url) update(i, data.url);
      else setUploading(u => ({ ...u, [i]: 'Failed' }));
    } catch {
      setUploading(u => ({ ...u, [i]: 'Error' }));
    }
    setUploading(u => { const n = { ...u }; delete n[i]; return n; });
  }

  return (
    <div>
      {urls.map((url, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
          {url && <video src={url} style={S.videoPreview} muted playsInline />}
          <input
            style={{ ...S.input, flex: 1 }}
            value={url}
            onChange={e => update(i, e.target.value)}
            placeholder="https://res.cloudinary.com/…  or upload →"
          />
          {/* Hidden file input */}
          <input
            ref={el => { fileRefs.current[i] = el; }}
            type="file"
            accept="video/*"
            style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(i, f); e.target.value = ''; }}
          />
          <button
            style={{ background: 'rgba(255,107,0,0.15)', color: '#FF6B00', border: '1px solid rgba(255,107,0,0.4)', borderRadius: 6, padding: '0.35rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, cursor: uploading[i] ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' as const, flexShrink: 0 }}
            onClick={() => fileRefs.current[i]?.click()}
            disabled={!!uploading[i]}
          >
            {uploading[i] ?? '↑ Upload'}
          </button>
          <button style={S.removeBtn} onClick={() => remove(i)}>✕</button>
        </div>
      ))}
      <button style={S.addBtn} onClick={add}>+ Add slot</button>
    </div>
  );
}

// Keep old name as alias so all tab components work without changes
const VideoUrlList = VideoUploadList;

// ─── Auth Gate ────────────────────────────────────────────────────────────────
function AuthGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setErr('');
    const res = await fetch('/api/admin/content', { headers: { 'x-admin-password': pw } });
    if (res.ok) { sessionStorage.setItem('admin_pw', pw); onAuth(pw); }
    else { setErr('Wrong password. Try again.'); }
    setLoading(false);
  }

  return (
    <div style={S.authPage}>
      <div style={S.authCard}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#FF6B00', marginBottom: 4 }}>VK Admin</div>
          <div style={{ fontSize: '0.8rem', color: '#555' }}>Content Dashboard</div>
        </div>
        <form onSubmit={submit}>
          <div style={S.field}>
            <span style={S.label}>Password</span>
            <input
              style={{ ...S.input, marginBottom: 12 }}
              type="password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              autoFocus
              placeholder="Enter admin password"
            />
          </div>
          {err && <div style={{ color: '#ff6060', fontSize: '0.78rem', marginBottom: 10 }}>{err}</div>}
          <button
            type="submit"
            disabled={loading}
            style={{ ...S.saveBtn(loading), width: '100%', padding: '0.65rem', fontSize: '0.9rem' }}
          >
            {loading ? 'Checking…' : 'Enter Dashboard →'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Tab Panels ───────────────────────────────────────────────────────────────
function HeroTab({ data, onChange }: { data: Content['hero']; onChange: (d: Content['hero']) => void }) {
  const set = (k: keyof Content['hero'], v: unknown) => onChange({ ...data, [k]: v });
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Hero Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Badge" value={data.badge} onChange={v => set('badge', v)} />
            <Field label="Headline Line 1" value={data.headline[0]} onChange={v => set('headline', [v, data.headline[1]])} />
          </div>
          <div style={S.row}>
            <Field label="Headline Line 2 (orange)" value={data.headline[1]} onChange={v => set('headline', [data.headline[0], v])} />
            <Field label="Subtext" value={data.sub} onChange={v => set('sub', v)} />
          </div>
          <div style={S.row}>
            <Field label="Primary CTA" value={data.ctas.primary} onChange={v => set('ctas', { ...data.ctas, primary: v })} />
            <Field label="Secondary CTA" value={data.ctas.secondary} onChange={v => set('ctas', { ...data.ctas, secondary: v })} />
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Arc Gallery Videos (10)</div>
        <div style={S.card}>
          <VideoUrlList urls={data.arcVideos} onChange={v => set('arcVideos', v)} />
        </div>
      </div>
    </div>
  );
}

function ShowcaseTab({ data, onChange }: { data: Content['showcase']; onChange: (d: Content['showcase']) => void }) {
  const set = (k: keyof Content['showcase'], v: unknown) => onChange({ ...data, [k]: v });
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Section Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => set('label', v)} />
            <Field label="Title" value={data.title} onChange={v => set('title', v)} />
          </div>
          <Field label="Subtitle" value={data.subtitle} onChange={v => set('subtitle', v)} />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Row 1 Videos</div>
        <div style={S.card}><VideoUrlList urls={data.row1} onChange={v => set('row1', v)} /></div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Row 2 Videos</div>
        <div style={S.card}><VideoUrlList urls={data.row2} onChange={v => set('row2', v)} /></div>
      </div>
    </div>
  );
}

function ClientVoicesTab({ data, onChange }: { data: Content['clientVoices']; onChange: (d: Content['clientVoices']) => void }) {
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Video URLs</div>
        <div style={S.card}><VideoUrlList urls={data.videos} onChange={v => onChange({ videos: v })} /></div>
      </div>
    </div>
  );
}

function PromiseTab({ data, onChange }: { data: Content['promise']; onChange: (d: Content['promise']) => void }) {
  const set = (k: keyof Content['promise'], v: string) => onChange({ ...data, [k]: v });
  return (
    <div style={S.card}>
      <div style={{ marginBottom: '0.75rem' }}><Field label="Headline" value={data.headline} onChange={v => set('headline', v)} /></div>
      <div style={{ marginBottom: '0.75rem' }}><Field label="Highlight (orange)" value={data.highlight} onChange={v => set('highlight', v)} multiline /></div>
      <Field label="Body Text" value={data.body} onChange={v => set('body', v)} multiline />
    </div>
  );
}

function ServicesTab({ data, onChange }: { data: Content['services']; onChange: (d: Content['services']) => void }) {
  const setCard = (i: number, k: string, v: string) => {
    const cards = data.cards.map((c, idx) => idx === i ? { ...c, [k]: v } : c);
    onChange({ ...data, cards });
  };
  const addCard = () => onChange({ ...data, cards: [...data.cards, { icon: '✨', title: 'New Service', body: '' }] });
  const removeCard = (i: number) => onChange({ ...data, cards: data.cards.filter((_, idx) => idx !== i) });

  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Section Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => onChange({ ...data, label: v })} />
            <Field label="Title" value={data.title} onChange={v => onChange({ ...data, title: v })} />
          </div>
          <Field label="Subtitle" value={data.subtitle} onChange={v => onChange({ ...data, subtitle: v })} />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Service Cards</div>
        {data.cards.map((card, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={S.cardTitle}>{card.icon} Card {i + 1}</span>
              <button style={S.removeBtn} onClick={() => removeCard(i)}>Remove</button>
            </div>
            <div style={S.row}>
              <Field label="Icon (emoji)" value={card.icon} onChange={v => setCard(i, 'icon', v)} />
              <Field label="Title" value={card.title} onChange={v => setCard(i, 'title', v)} />
            </div>
            <Field label="Body" value={card.body} onChange={v => setCard(i, 'body', v)} multiline />
          </div>
        ))}
        <button style={S.addBtn} onClick={addCard}>+ Add Service Card</button>
      </div>
    </div>
  );
}

function BeyondTab({ data, onChange }: { data: Content['beyond']; onChange: (d: Content['beyond']) => void }) {
  const setItem = (i: number, k: string, v: string) => {
    const items = data.items.map((c, idx) => idx === i ? { ...c, [k]: v } : c);
    onChange({ ...data, items });
  };
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Section Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => onChange({ ...data, label: v })} />
            <Field label="Title" value={data.title} onChange={v => onChange({ ...data, title: v })} />
          </div>
          <Field label="Subtitle" value={data.subtitle} onChange={v => onChange({ ...data, subtitle: v })} />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Items</div>
        {data.items.map((item, i) => (
          <div key={i} style={S.card}>
            <div style={S.cardTitle}>{item.icon} Item {i + 1}</div>
            <div style={S.row}>
              <Field label="Icon" value={item.icon} onChange={v => setItem(i, 'icon', v)} />
              <Field label="Title" value={item.title} onChange={v => setItem(i, 'title', v)} />
            </div>
            <Field label="Body" value={item.body} onChange={v => setItem(i, 'body', v)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultsTab({ data, onChange }: { data: Content['results']; onChange: (d: Content['results']) => void }) {
  const setStat = (i: number, k: string, v: string) => {
    const stats = data.stats.map((s, idx) => idx === i ? { ...s, [k]: v } : s);
    onChange({ ...data, stats });
  };
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Section Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => onChange({ ...data, label: v })} />
            <Field label="Title" value={data.title} onChange={v => onChange({ ...data, title: v })} />
          </div>
          <Field label="Subtitle" value={data.subtitle} onChange={v => onChange({ ...data, subtitle: v })} />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Stats</div>
        {data.stats.map((stat, i) => (
          <div key={i} style={S.card}>
            <div style={S.cardTitle}>Stat {i + 1}</div>
            <div style={S.row}>
              <Field label="Number" value={stat.number} onChange={v => setStat(i, 'number', v)} />
              <Field label="Label" value={stat.label} onChange={v => setStat(i, 'label', v)} />
            </div>
            <div style={S.row}>
              <Field label="Description" value={stat.desc} onChange={v => setStat(i, 'desc', v)} />
              <Field label="Context Badge" value={stat.context} onChange={v => setStat(i, 'context', v)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutTab({ data, onChange, password }: { data: Content['about']; onChange: (d: Content['about']) => void; password: string }) {
  const set = (k: keyof Content['about'], v: unknown) => onChange({ ...data, [k]: v });
  const [uploading, setUploading] = useState(false);

  async function uploadImage(file: File) {
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('folder', 'Profile');
    const res = await fetch('/api/admin/upload', { method: 'POST', headers: { 'x-admin-password': password }, body: form });
    const json = await res.json();
    if (json.url) set('profileImage', json.url);
    setUploading(false);
  }

  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Profile Image</div>
        <div style={S.card}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {data.profileImage && (
              <img src={data.profileImage} alt="Profile" style={{ width: 80, height: 90, objectFit: 'cover', borderRadius: 10, border: '2px solid #333' }} />
            )}
            <div>
              <Field label="Image URL" value={data.profileImage} onChange={v => set('profileImage', v)} />
              <label style={{ ...S.addBtn, display: 'inline-block', marginTop: 8, cursor: 'pointer' }}>
                {uploading ? 'Uploading…' : '📂 Upload Image'}
                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && uploadImage(e.target.files[0])} />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => set('label', v)} />
            <Field label="Headline" value={data.headline} onChange={v => set('headline', v)} />
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <Field label="CTA Button Text" value={data.cta} onChange={v => set('cta', v)} />
          </div>
          {data.paragraphs.map((p, i) => (
            <div key={i} style={{ marginBottom: '0.75rem' }}>
              <Field label={`Paragraph ${i + 1}`} value={p} onChange={v => { const ps = [...data.paragraphs]; ps[i] = v; set('paragraphs', ps); }} multiline />
            </div>
          ))}
          <Field label="Quote / Passion Note" value={data.quote} onChange={v => set('quote', v)} multiline />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Stat Pills</div>
        {data.statPills.map((pill, i) => (
          <div key={i} style={S.card}>
            <div style={S.cardTitle}>Pill {i + 1}</div>
            <div style={S.row}>
              <Field label="Icon" value={pill.icon} onChange={v => { const ps = [...data.statPills]; ps[i] = { ...ps[i], icon: v }; set('statPills', ps); }} />
              <Field label="Bold Text" value={pill.strong} onChange={v => { const ps = [...data.statPills]; ps[i] = { ...ps[i], strong: v }; set('statPills', ps); }} />
            </div>
            <Field label="Text" value={pill.text} onChange={v => { const ps = [...data.statPills]; ps[i] = { ...ps[i], text: v }; set('statPills', ps); }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProcessTab({ data, onChange }: { data: Content['process']; onChange: (d: Content['process']) => void }) {
  const setStep = (i: number, k: string, v: string) => {
    const steps = data.steps.map((s, idx) => idx === i ? { ...s, [k]: v } : s);
    onChange({ ...data, steps });
  };
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Section Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => onChange({ ...data, label: v })} />
            <Field label="Title" value={data.title} onChange={v => onChange({ ...data, title: v })} />
          </div>
          <Field label="Subtitle" value={data.subtitle} onChange={v => onChange({ ...data, subtitle: v })} />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Steps</div>
        {data.steps.map((step, i) => (
          <div key={i} style={S.card}>
            <div style={S.cardTitle}>Step {step.num}</div>
            <div style={S.row}>
              <Field label="Number" value={step.num} onChange={v => setStep(i, 'num', v)} />
              <Field label="Title" value={step.title} onChange={v => setStep(i, 'title', v)} />
            </div>
            <Field label="Body" value={step.body} onChange={v => setStep(i, 'body', v)} multiline />
          </div>
        ))}
      </div>
    </div>
  );
}

function TestimonialsTab({ data, onChange }: { data: Content['testimonials']; onChange: (d: Content['testimonials']) => void }) {
  const setCard = (i: number, k: string, v: string | number) => {
    const cards = data.cards.map((c, idx) => idx === i ? { ...c, [k]: v } : c);
    onChange({ ...data, cards });
  };
  const addCard = () => onChange({ ...data, cards: [...data.cards, { text: '', name: '', platform: '', initial: '', stars: 5 }] });
  const removeCard = (i: number) => onChange({ ...data, cards: data.cards.filter((_, idx) => idx !== i) });

  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Section Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => onChange({ ...data, label: v })} />
            <Field label="Title" value={data.title} onChange={v => onChange({ ...data, title: v })} />
          </div>
          <Field label="Subtitle" value={data.subtitle} onChange={v => onChange({ ...data, subtitle: v })} />
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Review Cards</div>
        {data.cards.map((card, i) => (
          <div key={i} style={S.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <span style={S.cardTitle}>{card.initial} — {card.name}</span>
              <button style={S.removeBtn} onClick={() => removeCard(i)}>Remove</button>
            </div>
            <div style={{ marginBottom: '0.75rem' }}><Field label="Review Text" value={card.text} onChange={v => setCard(i, 'text', v)} multiline /></div>
            <div style={S.row}>
              <Field label="Name" value={card.name} onChange={v => setCard(i, 'name', v)} />
              <Field label="Platform" value={card.platform} onChange={v => setCard(i, 'platform', v)} />
            </div>
            <div style={S.row}>
              <Field label="Initial (avatar)" value={card.initial} onChange={v => setCard(i, 'initial', v)} />
              <Field label="Stars (1-5)" value={String(card.stars)} onChange={v => setCard(i, 'stars', Number(v))} />
            </div>
          </div>
        ))}
        <button style={S.addBtn} onClick={addCard}>+ Add Review</button>
      </div>
    </div>
  );
}

function PricingTab({ data, onChange }: { data: Content['pricing']; onChange: (d: Content['pricing']) => void }) {
  const set = (k: keyof Content['pricing'], v: unknown) => onChange({ ...data, [k]: v });
  const updateFeature = (i: number, v: string) => { const f = [...data.features]; f[i] = v; set('features', f); };
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Card Copy</div>
        <div style={S.card}>
          <div style={S.row}>
            <Field label="Label" value={data.label} onChange={v => set('label', v)} />
            <Field label="Title" value={data.title} onChange={v => set('title', v)} />
          </div>
          <div style={S.row}>
            <Field label="Card Headline" value={data.cardHeadline} onChange={v => set('cardHeadline', v)} />
            <Field label="Card Sub" value={data.cardSub} onChange={v => set('cardSub', v)} />
          </div>
          <div style={S.row}>
            <Field label="CTA Button" value={data.cta} onChange={v => set('cta', v)} />
            <Field label="Note" value={data.note} onChange={v => set('note', v)} />
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Features List</div>
        <div style={S.card}>
          {data.features.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'center' }}>
              <span style={{ color: '#FF6B00', fontSize: '0.85rem' }}>✓</span>
              <input style={{ ...S.input, flex: 1 }} value={f} onChange={e => updateFeature(i, e.target.value)} />
              <button style={S.removeBtn} onClick={() => set('features', data.features.filter((_, idx) => idx !== i))}>✕</button>
            </div>
          ))}
          <button style={S.addBtn} onClick={() => set('features', [...data.features, ''])}>+ Add Feature</button>
        </div>
      </div>
    </div>
  );
}

function CtaTab({ data, onChange }: { data: Content['cta']; onChange: (d: Content['cta']) => void }) {
  const set = (k: keyof Content['cta'], v: unknown) => onChange({ ...data, [k]: v });
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>CTA Copy</div>
        <div style={S.card}>
          <div style={{ marginBottom: '0.75rem' }}><Field label="Headline" value={data.headline} onChange={v => set('headline', v)} /></div>
          <div style={S.row}>
            <Field label="Sub text" value={data.sub} onChange={v => set('sub', v)} />
            <Field label="Button Text" value={data.btn} onChange={v => set('btn', v)} />
          </div>
          <div style={S.row}>
            <Field label="Availability Text" value={data.availabilityText} onChange={v => set('availabilityText', v)} />
            <Field label="Note" value={data.note} onChange={v => set('note', v)} />
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Trust Badges</div>
        {data.badges.map((b, i) => (
          <div key={i} style={S.card}>
            <div style={S.row}>
              <Field label="Number" value={b.num} onChange={v => { const bs = [...data.badges]; bs[i] = { ...bs[i], num: v }; set('badges', bs); }} />
              <Field label="Label" value={b.label} onChange={v => { const bs = [...data.badges]; bs[i] = { ...bs[i], label: v }; set('badges', bs); }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FooterTab({ data, onChange }: { data: Content['footer']; onChange: (d: Content['footer']) => void }) {
  return (
    <div style={S.card}>
      <div style={S.row}>
        <Field label="Logo Text" value={data.logo} onChange={v => onChange({ ...data, logo: v })} />
        <Field label="Copyright" value={data.copy} onChange={v => onChange({ ...data, copy: v })} />
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Nav Links</div>
        {data.links.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
            <input style={{ ...S.input, flex: 1 }} value={l} onChange={e => { const ls = [...data.links]; ls[i] = e.target.value; onChange({ ...data, links: ls }); }} />
            <button style={S.removeBtn} onClick={() => onChange({ ...data, links: data.links.filter((_, idx) => idx !== i) })}>✕</button>
          </div>
        ))}
        <button style={S.addBtn} onClick={() => onChange({ ...data, links: [...data.links, ''] })}>+ Add Link</button>
      </div>
    </div>
  );
}

function SettingsTab({ waLink, onChange }: { waLink: string; onChange: (v: string) => void }) {
  return (
    <div style={S.card}>
      <div style={S.sectionTitle}>Global Settings</div>
      <Field label="WhatsApp Link" value={waLink} onChange={onChange} />
      <p style={{ color: '#555', fontSize: '0.75rem', marginTop: 8 }}>
        Format: https://wa.me/91XXXXXXXXXX
      </p>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [content, setContent] = useState<Content | null>(null);
  const [activeTab, setActiveTab] = useState('hero');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Check sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_pw');
    if (saved) loadContent(saved);
  }, []);

  async function loadContent(pw: string) {
    const res = await fetch('/api/admin/content', { headers: { 'x-admin-password': pw } });
    if (!res.ok) return;
    const data = await res.json();
    setContent(data);
    setPassword(pw);
  }

  const save = useCallback(async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        showToast('Saved! Site will update shortly.', 'success');
      } else {
        const data = await res.json().catch(() => ({}));
        showToast(`Save failed: ${data.error ?? res.statusText}`, 'error');
      }
    } catch {
      showToast('Network error.', 'error');
    }
    setSaving(false);
  }, [content, password]);

  function showToast(msg: string, type: 'success' | 'error') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  // Keyboard shortcut Cmd/Ctrl+S
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); save(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [save]);

  if (!password || !content) return <AuthGate onAuth={loadContent} />;

  const set = (key: keyof Content, value: unknown) => setContent(prev => prev ? { ...prev, [key]: value } : prev);

  const tabContent: Record<string, React.ReactNode> = {
    hero: <HeroTab data={content.hero} onChange={v => set('hero', v)} />,
    showcase: <ShowcaseTab data={content.showcase} onChange={v => set('showcase', v)} />,
    clientVoices: <ClientVoicesTab data={content.clientVoices} onChange={v => set('clientVoices', v)} />,
    promise: <PromiseTab data={content.promise} onChange={v => set('promise', v)} />,
    services: <ServicesTab data={content.services} onChange={v => set('services', v)} />,
    beyond: <BeyondTab data={content.beyond} onChange={v => set('beyond', v)} />,
    results: <ResultsTab data={content.results} onChange={v => set('results', v)} />,
    about: <AboutTab data={content.about} onChange={v => set('about', v)} password={password} />,
    process: <ProcessTab data={content.process} onChange={v => set('process', v)} />,
    testimonials: <TestimonialsTab data={content.testimonials} onChange={v => set('testimonials', v)} />,
    pricing: <PricingTab data={content.pricing} onChange={v => set('pricing', v)} />,
    cta: <CtaTab data={content.cta} onChange={v => set('cta', v)} />,
    footer: <FooterTab data={content.footer} onChange={v => set('footer', v)} />,
    settings: <SettingsTab waLink={content.WA_LINK} onChange={v => set('WA_LINK', v)} />,
  };

  const activeTabLabel = TABS.find(t => t.id === activeTab)?.label ?? '';

  return (
    <PasswordCtx.Provider value={password}>
    <div style={S.page}>
      {/* Sidebar */}
      <aside style={S.sidebar}>
        <div style={S.sidebarHeader}>
          <div style={S.sidebarLogo}>VK Admin</div>
          <div style={S.sidebarSub}>Content Dashboard</div>
        </div>
        <nav style={S.navList}>
          {TABS.map(tab => (
            <button key={tab.id} style={S.navItem(activeTab === tab.id)} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #2a2a2a' }}>
          <a href="/" target="_blank" style={{ color: '#555', fontSize: '0.72rem', textDecoration: 'none' }}>↗ View Live Site</a>
        </div>
      </aside>

      {/* Main */}
      <main style={S.main}>
        <div style={S.topbar}>
          <span style={S.topbarTitle}>{activeTabLabel}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#444', fontSize: '0.72rem' }}>⌘S to save</span>
            <button style={S.saveBtn(saving)} onClick={save} disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
        <div style={S.content}>
          {tabContent[activeTab]}
        </div>
      </main>

      {/* Toast */}
      {toast && <div style={S.toast(toast.type)}>{toast.msg}</div>}
    </div>
    </PasswordCtx.Provider>
  );
}
