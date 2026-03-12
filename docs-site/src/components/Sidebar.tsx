'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, ExternalLink, ChevronDown } from 'lucide-react';

const refLinks = [
  { href: '/install#prerequisites', label: 'Prerequisites' },
  { href: '/install#step-1-generate-a-secp256k1-keypair', label: 'Keypair Generation' },
  { href: '/install#step-2-install-the-plugin', label: 'Install Plugin' },
  { href: '/install#step-3-configure-openclawjson', label: 'Configuration' },
  { href: '/install#step-4-restart-the-gateway', label: 'Restart Gateway' },
  { href: '/install#summary', label: 'Summary' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Auto-expand the reference dropdown when on /install
  const onInstall = pathname === '/install';
  const [refOpen, setRefOpen] = useState(onInstall);

  // Keep in sync if user navigates
  useEffect(() => {
    if (onInstall) setRefOpen(true);
  }, [onInstall]);

  return (
    <>
      {/* Mobile top bar */}
      <div className="mobile-topbar">
        <div className="mobile-logo">
          <div className="logo-icon-wrap">🛡️</div>
          <span className="logo-text">Agentic SPM</span>
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
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="logo-icon-wrap">🛡️</div>
          <div>
            <div className="logo-text">Agentic SPM</div>
            <div className="logo-sub">Plugin Docs</div>
          </div>
        </div>

        {/* Nav */}
        <div className="sidebar-section">
          <div className="sidebar-section-label">Getting Started</div>
          <nav className="sidebar-nav">
            {/* Overview */}
            <Link
              href="/"
              className={pathname === '/' ? 'active' : ''}
              onClick={() => setMobileOpen(false)}
            >
              Overview
            </Link>

            {/* Installation Guide — with collapsible toggle */}
            <div className="sidebar-nav-group">
              <div
                className={`sidebar-nav-row ${onInstall ? 'active' : ''}`}
                onClick={() => setRefOpen((v) => !v)}
                role="button"
                aria-expanded={refOpen}
              >
                <Link
                  href="/install"
                  className="sidebar-nav-row-link"
                  onClick={(e) => {
                    // Don't fight with the parent div click
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Installation Guide
                </Link>
                <span className="sidebar-badge" style={{ marginRight: 4 }}>v0.1.3</span>
                <ChevronDown
                  size={13}
                  className={`sidebar-chevron ${refOpen ? 'open' : ''}`}
                />
              </div>

              {/* Dropdown */}
              <div className={`sidebar-subnav ${refOpen ? 'open' : ''}`}>
                {refLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="sidebar-sublink"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* CTA */}
        <div className="sidebar-bottom">
          <a
            href="https://ai-inference.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-dashboard-btn"
          >
            <LayoutDashboard size={14} style={{ flexShrink: 0 }} />
            Open Dashboard
            <ExternalLink size={11} style={{ flexShrink: 0, opacity: 0.55 }} />
          </a>
        </div>
      </aside>
    </>
  );
}