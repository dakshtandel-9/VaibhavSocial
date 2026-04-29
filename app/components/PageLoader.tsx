// Server-rendered loader: appears instantly with the HTML, auto-hides via CSS
// at exactly 2s. No JS, no hydration delay.

export default function PageLoader() {
  return (
    <>
      <style>{`
        @keyframes vk-spin { to { transform: rotate(360deg); } }
        @keyframes vk-loader-out {
          0%   { opacity: 1; visibility: visible; }
          85%  { opacity: 1; visibility: visible; }
          100% { opacity: 0; visibility: hidden; }
        }
        .vk-page-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: vk-loader-out 2s ease forwards;
          pointer-events: none;
        }
      `}</style>
      <div className="vk-page-loader" aria-hidden="true">
        <div style={{ position: 'relative', width: 64, height: 64 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '4px solid rgba(255, 107, 0, 0.12)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '4px solid transparent',
              borderTopColor: '#FF6B00',
              borderRightColor: 'rgba(255,107,0,0.4)',
              animation: 'vk-spin 0.8s cubic-bezier(0.6,0.2,0.4,0.8) infinite',
            }}
          />
        </div>
      </div>
    </>
  );
}
