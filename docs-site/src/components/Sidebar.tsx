'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  {
    label: 'Getting Started',
    items: [
      { href: '/', icon: '🏠', label: 'Overview' },
      { href: '/install', icon: '🔧', label: 'Installation Guide', badge: 'v0.1.3' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { href: '/install#step-1', icon: '🔑', label: 'Keypair Generation' },
      { href: '/install#step-2', icon: '📦', label: 'Plugin Install' },
      { href: '/install#step-3', icon: '⚙️', label: 'Configuration' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🛡️</div>
        <div>
          <div className="logo-text">AI Guardian</div>
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
                <span className="nav-icon">{item.icon}</span>
                {item.label}
                {item.badge && <span className="sidebar-badge">{item.badge}</span>}
              </Link>
            ))}
          </nav>
        </div>
      ))}
    </aside>
  );
}
