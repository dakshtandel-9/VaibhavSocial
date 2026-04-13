export const metadata = { title: 'Admin — Vaibhav Khuteta' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif", background: '#0f0f0f', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
