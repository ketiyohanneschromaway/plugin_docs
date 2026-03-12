'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ExternalLink, Sun, Moon, Search } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import SearchModal from './SearchModal';

interface TopbarProps {
    breadcrumb?: { label: string; href?: string }[];
}

export default function Topbar({ breadcrumb }: TopbarProps) {
    const { theme, toggle } = useTheme();
    const isDark = theme === 'dark';
    const [searchOpen, setSearchOpen] = useState(false);

    // Global Cmd+K / Ctrl+K shortcut
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <>
            <div className="topbar">
                {/* Breadcrumb */}
                <div className="topbar-breadcrumb">
                    {breadcrumb?.map((crumb, i) => (
                        <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {i > 0 && <span className="sep">›</span>}
                            {crumb.href ? (
                                <Link href={crumb.href} className="breadcrumb-link">{crumb.label}</Link>
                            ) : (
                                <span className="current">{crumb.label}</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Search trigger */}
                <button
                    className="search-trigger"
                    onClick={() => setSearchOpen(true)}
                    aria-label="Search docs"
                >
                    <Search size={13} style={{ flexShrink: 0 }} />
                    <span className="search-trigger-text">Search docs...</span>
                    <span className="search-trigger-kbd">⌘K</span>
                </button>

                {/* Right side */}
                <div className="topbar-right">
                    <span className="version-chip">v0.1.3</span>

                    {/* Theme toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggle}
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        <span className={`theme-toggle-track ${isDark ? 'dark' : 'light'}`}>
                            <span className="theme-toggle-thumb">
                                {isDark ? <Moon size={11} /> : <Sun size={11} />}
                            </span>
                        </span>
                        <span className="theme-toggle-label">
                            {isDark ? 'Dark' : 'Light'}
                        </span>
                    </button>

                    <a
                        href="https://ai-inference.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="topbar-link"
                    >
                        <ExternalLink size={12} />
                        Dashboard
                    </a>
                </div>
            </div>

            {/* Search modal */}
            <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
        </>
    );
}
