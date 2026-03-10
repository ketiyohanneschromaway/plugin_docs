import Link from 'next/link';

const features = [
  {
    icon: '🔑',
    title: 'secp256k1 Keypair Setup',
    description: 'Generate a cryptographic keypair and securely store it for API authentication.',
  },
  {
    icon: '📦',
    title: 'One-Command Install',
    description: 'Install via the OpenClaw CLI in seconds with a single npm-backed command.',
  },
  {
    icon: '⚙️',
    title: 'JSON Configuration',
    description: 'Wire the plugin into your openclaw.json with a clear, copy-paste config block.',
  },
  {
    icon: '⛓️',
    title: 'Chromia Blockchain',
    description: 'Every AI action is judged on-chain via Chromia testnet nodes for trustless enforcement.',
  },
];

export default function HomePage() {
  return (
    <>
      <div className="topbar">
        <div className="topbar-breadcrumb">
          <span>Docs</span>
        </div>
        <div className="topbar-right">
          <span className="version-chip">v0.1.3</span>
        </div>
      </div>

      <div className="page-body">
        {/* Hero */}
        <div className="page-hero">
          <div className="hero-badge">
            <span>🛡️</span> Chromia Guardian
          </div>
          <h1 className="page-title">AI Guardian<br />Plugin for OpenClaw</h1>
          <p className="page-description">
            A blockchain-enforced safety layer for your AI agent. Every action your agent takes is
            judged on the Chromia network before execution — giving you trustless, on-chain AI governance.
          </p>

          <div style={{ marginTop: 28, display: 'flex', gap: 12 }}>
            <Link
              href="/install"
              id="get-started-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'linear-gradient(135deg, #6c63ff, #5b52e8)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
                padding: '10px 22px',
                borderRadius: 8,
                textDecoration: 'none',
                boxShadow: '0 4px 20px rgba(108,99,255,0.35)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              Get Started →
            </Link>
            <a
              href="https://github.com/chrguard/ai-guardian-plugin"
              target="_blank"
              rel="noopener noreferrer"
              id="github-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
                fontWeight: 500,
                fontSize: 14,
                padding: '10px 22px',
                borderRadius: 8,
                textDecoration: 'none',
                border: '1px solid var(--border-bright)',
              }}
            >
              View on npm
            </a>
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
            How it works
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', marginBottom: 24 }}>
            Before your agent executes any action, the Guardian plugin intercepts it, sends it to the
            Chromia blockchain for judgment, and only proceeds if approved.
          </p>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '20px 24px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 13,
            color: 'var(--text-secondary)',
            lineHeight: 2,
          }}>
            <span style={{ color: '#c792ea' }}>Agent</span>
            <span style={{ color: 'var(--text-muted)' }}> → </span>
            <span style={{ color: '#80cbc4' }}>ai-guardian-plugin</span>
            <span style={{ color: 'var(--text-muted)' }}> → </span>
            <span style={{ color: '#c3e88d' }}>Chromia Testnet</span>
            <span style={{ color: 'var(--text-muted)' }}> → </span>
            <span style={{ color: '#f78c6c' }}>judge_action</span>
            <span style={{ color: 'var(--text-muted)' }}> → </span>
            <span style={{ color: '#6c63ff' }}>ALLOW / DENY</span>
            <span style={{ color: 'var(--text-muted)' }}> → </span>
            <span style={{ color: '#c792ea' }}>Agent</span>
          </div>
        </div>

        {/* Feature grid */}
        <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 20 }}>
          What&apos;s covered
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '18px 20px',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
                {f.title}
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {f.description}
              </div>
            </div>
          ))}
        </div>

        {/* Quick start CTA */}
        <div style={{
          marginTop: 48,
          background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(0,212,255,0.05))',
          border: '1px solid rgba(108,99,255,0.2)',
          borderRadius: 14,
          padding: '28px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>
              Ready to install?
            </div>
            <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              Follow the step-by-step installation guide to get the plugin running.
            </div>
          </div>
          <Link
            href="/install"
            id="install-cta-btn"
            style={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(108,99,255,0.15)',
              color: '#9d98ff',
              fontWeight: 600,
              fontSize: 14,
              padding: '10px 22px',
              borderRadius: 8,
              textDecoration: 'none',
              border: '1px solid rgba(108,99,255,0.3)',
            }}
          >
            Installation Guide →
          </Link>
        </div>
      </div>
    </>
  );
}
