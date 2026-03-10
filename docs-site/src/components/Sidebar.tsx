'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, ExternalLink } from 'lucide-react';

const nav: Array<{
  label: string;
  items: Array<{ href: string; label: string; badge?: string }>;
}> = [
    {
      label: 'Getting Started',
      items: [
        { href: '/', label: 'Overview' },
        { href: '/install', label: 'Installation Guide', badge: 'v0.1.3' },
      ],
    },
    {
      label: 'Reference',
      items: [
        { href: '/install#prerequisites', label: 'Prerequisites' },
        { href: '/install#step-1-generate-a-secp256k1-keypair', label: 'Keypair Generation' },
        { href: '/install#14-enable-plugins', label: 'Configuration' },
        { href: '/install#summary', label: 'Summary' },
      ],
    },
  ];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <div className="mobile-logo">
          <div className="logo-icon">🛡️</div>
          <div className="logo-text">Agentic SPM</div>
        </div>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className={`ham-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`ham-line ${mobileOpen ? 'open' : ''}`} />
          <span className={`ham-line ${mobileOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Overlay */}
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">🛡️</div>
          <div>
            <div className="logo-text">Agentic SPM</div>
            <div className="logo-sub">Plugin Docs</div>
          </div>
        </div>

        {nav.map((section) => (
          <div key={section.label} className="sidebar-section">
            <div className="sidebar-section-label">{section.label}</div>
            <nav className="sidebar-nav">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? 'active' : ''}
                >
                  {item.label}
                  {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                </Link>
              ))}
            </nav>
          </div>
        ))}

        <div className="sidebar-dashboard-cta">
          <a
            href="https://ai-inference.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-dashboard-btn"
          >
            <LayoutDashboard size={14} style={{ flexShrink: 0 }} />
            Open Dashboard
            <ExternalLink size={11} style={{ flexShrink: 0, opacity: 0.6 }} />
          </a>
        </div>
      </aside>
    </>
  );
};