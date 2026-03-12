import Link from 'next/link';
import Topbar from '@/components/Topbar';
import { ExternalLink } from 'lucide-react';

const features = [
  {
    icon: '🔑',
    title: 'secp256k1 Keypair Setup',
    description:
      'Generate a cryptographic keypair and securely store it. This keypair authenticates your client with the Guardian AI API.',
  },
  {
    icon: '⚡',
    title: 'One-Command Install',
    description:
      'Install via the OpenClaw CLI in seconds. A single npm-backed command handles everything.',
  },
  {
    icon: '⚙️',
    title: 'JSON Configuration',
    description:
      'Wire the plugin into your openclaw.json with a clear, copy-pasteable config block — no guesswork.',
  },
  {
    icon: '⛓️',
    title: 'On-Chain Enforcement',
    description:
      'Every AI action is judged on the Chromia Blockchain before execution — trustless, transparent, on-chain AI governance.',
  },
];

const flowSteps = [
  { icon: '🤖', label: 'Agent', color: '#c792ea', bg: 'rgba(199,146,234,0.1)' },
  { icon: '🛡️', label: 'SPM Plugin', color: '#7c6aff', bg: 'rgba(124,106,255,0.1)' },
  { icon: '⛓️', label: 'Chromia Blockchain', color: '#00cfff', bg: 'rgba(0,207,255,0.1)' },
  { icon: '⚖️', label: 'judge_action', color: '#f78c6c', bg: 'rgba(247,140,108,0.1)' },
];

export default function HomePage() {
  return (
    <>
      <Topbar breadcrumb={[{ label: 'Docs' }]} />

      <div className="page-body">

        {/* ── Hero ── */}
        <div className="page-hero animate-in">
          <div className="hero-badge">
            <span>🤖</span> Chromia Agentic
          </div>
          <h1 className="page-title">
            Agentic SPM<br />Plugin for OpenClaw
          </h1>
          <p className="page-description">
            A blockchain-enforced safety layer for your AI agent. Every action your agent takes
            is judged on the Chromia Blockchain before it executes — giving you trustless,
            auditable, on-chain AI governance.
          </p>

          <div className="hero-actions">
            <Link href="/install" id="get-started-btn" className="btn-primary">
              Get Started →
            </Link>
            <a
              href="https://ai-inference.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              id="dashboard-btn"
              className="btn-secondary"
            >
              Open Dashboard <ExternalLink size={14} strokeWidth={2} />
            </a>
          </div>
        </div>

        {/* ── How it works ── */}
        <div className="how-section animate-in animate-in-delay-1">
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">
            Before your agent executes any action, the Guardian plugin intercepts it, submits it to the
            Chromia Blockchain for judgment, and either allows or blocks execution — in real time.
          </p>

          <div className="flow-diagram">
            {flowSteps.map((step, i) => (
              <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                <div className="flow-node">
                  <div className="flow-node-icon" style={{ background: step.bg, fontSize: 20 }}>
                    {step.icon}
                  </div>
                  <div className="flow-node-label" style={{ color: step.color, maxWidth: 86 }}>
                    {step.label}
                  </div>
                </div>
                {i < flowSteps.length - 1 && <div className="flow-arrow">→</div>}
              </div>
            ))}

            <div className="flow-arrow">→</div>
            <div className="flow-node">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <span className="flow-result-allow">✓ ALLOW</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>or</span>
                <span className="flow-result-deny">✗ DENY</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature grid ── */}
        <div className="animate-in animate-in-delay-2">
          <h2 className="section-title" style={{ marginBottom: 8 }}>What&apos;s included</h2>
          <p className="section-subtitle">Everything you need wired up and ready to go.</p>
          <div className="feature-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`feature-card animate-in animate-in-delay-${i + 1}`}>
                <span className="feature-icon">{f.icon}</span>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Banner ── */}
        <div className="cta-banner animate-in animate-in-delay-3">
          <div>
            <div className="cta-text-title">Ready to get started?</div>
            <div className="cta-text-sub">
              Open the live dashboard or follow the step-by-step installation guide below.
            </div>
          </div>
          <div className="cta-actions">
            <a
              href="https://ai-inference.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Open Dashboard <ExternalLink size={14} strokeWidth={2} />
            </a>
            <Link href="/install" id="install-cta-btn" className="btn-primary">
              Installation Guide →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
