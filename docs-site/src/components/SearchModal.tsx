'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Search } from 'lucide-react';

/* ── Types ── */
interface SearchResult {
    title: string;
    href: string;
    type: 'page' | 'section';
    context: string;
}

/* ── Static search index ── */
const SEARCH_INDEX: SearchResult[] = [
    // Pages
    {
        title: 'Overview',
        href: '/',
        type: 'page',
        context: 'Agentic SPM Plugin for OpenClaw — blockchain-enforced safety layer for AI agents.',
    },
    {
        title: 'Installation Guide',
        href: '/install',
        type: 'page',
        context: 'Full step-by-step guide to install and configure the Agentic SPM plugin.',
    },
    // Sections
    {
        title: 'Prerequisites',
        href: '/install#prerequisites',
        type: 'section',
        context: 'Node.js v18+, OpenClaw CLI, secp256k1 keypair required before installing.',
    },
    {
        title: 'Generate secp256k1 Keypair',
        href: '/install#step-1-generate-a-secp256k1-keypair',
        type: 'section',
        context: 'Generate a cryptographic keypair using Node.js built-in crypto module.',
    },
    {
        title: 'Save Keypair File',
        href: '/install#13-save-the-keypair-to-a-file',
        type: 'section',
        context: 'Save privkey and pubkey to ~/.config/ai-guardian/guard-client-key',
    },
    {
        title: 'Install the Plugin',
        href: '/install#step-2-install-the-plugin',
        type: 'section',
        context: 'Run: openclaw plugins install @chrguard/ai-guardian-plugin',
    },
    {
        title: 'Configure openclaw.json',
        href: '/install#step-3-configure-openclawjson',
        type: 'section',
        context: 'Add plugin entry, allow list, load paths, and config block to openclaw.json.',
    },
    {
        title: 'Enable Plugins',
        href: '/install#31-enable-plugins',
        type: 'section',
        context: 'Set plugins.enabled to true in openclaw.json.',
    },
    {
        title: 'Add to Allow List',
        href: '/install#32-add-to-the-allow-list',
        type: 'section',
        context: 'Add "ai-guardian-plugin" to plugins.allow array.',
    },
    {
        title: 'Register Load Path',
        href: '/install#33-register-the-load-path',
        type: 'section',
        context: 'Copy installPath into plugins.load.paths for the plugin to be discovered.',
    },
    {
        title: 'Add Plugin Entry',
        href: '/install#34-add-the-plugin-entry',
        type: 'section',
        context: 'Full config block: chromiaBrid, chromiaNodes, chromiaSecretPath, enforceDecision.',
    },
    {
        title: 'Restart Gateway',
        href: '/install#step-4-restart-the-gateway',
        type: 'section',
        context: 'Run: openclaw gateway restart to activate the new plugin config.',
    },
    {
        title: 'Summary',
        href: '/install#summary',
        type: 'section',
        context: 'Quick reference table of all configured fields and expected values.',
    },
    {
        title: 'Chromia Blockchain',
        href: '/install#step-3-configure-openclawjson',
        type: 'section',
        context: 'Chromia Blockchain nodes: node6, node7, node8.testnet.chromia.com:7740',
    },
    {
        title: 'chromiaBrid',
        href: '/install#34-add-the-plugin-entry',
        type: 'section',
        context: 'chromiaBrid: 5D007915E9DE53AA29784820E8F41CE65A4436703E23B8AF49B83C7FB4FDB048',
    },
    {
        title: 'enforceDecision',
        href: '/install#34-add-the-plugin-entry',
        type: 'section',
        context: 'Set enforceDecision: true to actually block actions based on blockchain verdict.',
    },
    {
        title: 'chromiaSecretPath',
        href: '/install#34-add-the-plugin-entry',
        type: 'section',
        context: 'Path to keypair file: ~/.config/ai-guardian/guard-client-key',
    },
    {
        title: 'How it works',
        href: '/#how-it-works',
        type: 'section',
        context: 'Agent → SPM Plugin → Chromia Blockchain → judge_action → ALLOW / DENY',
    },
];

/* ── Highlight match ── */
function highlight(text: string, query: string): React.ReactNode {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
        regex.test(part) ? <mark key={i}>{part}</mark> : part
    );
}

/* ── Main search function ── */
function doSearch(query: string): SearchResult[] {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SEARCH_INDEX.filter(
        (item) =>
            item.title.toLowerCase().includes(q) ||
            item.context.toLowerCase().includes(q)
    ).slice(0, 12);
}

/* ── SearchModal ── */
export default function SearchModal({
    open,
    onClose,
}: {
    open: boolean;
    onClose: () => void;
}) {
    const [query, setQuery] = useState('');
    const [focused, setFocused] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const results = doSearch(query);

    // Focus input when open
    useEffect(() => {
        if (open) {
            setTimeout(() => inputRef.current?.focus(), 30);
            setQuery('');
            setFocused(0);
        }
    }, [open]);

    // Keyboard nav
    const handleKey = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Escape') { onClose(); return; }
            if (e.key === 'ArrowDown') { e.preventDefault(); setFocused((f) => Math.min(f + 1, results.length - 1)); }
            if (e.key === 'ArrowUp') { e.preventDefault(); setFocused((f) => Math.max(f - 1, 0)); }
            if (e.key === 'Enter' && results[focused]) {
                window.location.href = results[focused].href;
                onClose();
            }
        },
        [results, focused, onClose]
    );

    // Global Cmd+K / Ctrl+K
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (!open) {
                    // parent handles opening — SearchModal is always mounted + open controlled
                }
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open]);

    if (!open) return null;

    const pages = results.filter((r) => r.type === 'page');
    const sections = results.filter((r) => r.type === 'section');
    const allResults = [...pages, ...sections];

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                {/* Input */}
                <div className="search-input-row">
                    <Search size={16} className="search-icon" />
                    <input
                        ref={inputRef}
                        className="search-input"
                        placeholder="Search docs..."
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setFocused(0); }}
                        onKeyDown={handleKey}
                        autoComplete="off"
                        spellCheck={false}
                    />
                    <button className="search-esc" onClick={onClose}>esc</button>
                </div>

                {/* Results */}
                <div className="search-results">
                    {query && allResults.length === 0 && (
                        <div className="search-empty">
                            No results for &ldquo;<strong>{query}</strong>&rdquo;
                        </div>
                    )}

                    {!query && (
                        <div className="search-empty" style={{ paddingTop: 20 }}>
                            Start typing to search the docs...
                        </div>
                    )}

                    {pages.length > 0 && (
                        <>
                            <div className="search-section-label">Pages</div>
                            {pages.map((item) => {
                                const idx = allResults.indexOf(item);
                                return (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className={`search-result-item ${focused === idx ? 'focused' : ''}`}
                                        onClick={onClose}
                                        onMouseEnter={() => setFocused(idx)}
                                    >
                                        <div className="search-result-title">
                                            {highlight(item.title, query)}
                                            <span className="search-result-type page">page</span>
                                        </div>
                                        <div className="search-result-context">
                                            {highlight(item.context, query)}
                                        </div>
                                    </a>
                                );
                            })}
                        </>
                    )}

                    {sections.length > 0 && (
                        <>
                            <div className="search-section-label">Sections</div>
                            {sections.map((item) => {
                                const idx = allResults.indexOf(item);
                                return (
                                    <a
                                        key={item.href + item.title}
                                        href={item.href}
                                        className={`search-result-item ${focused === idx ? 'focused' : ''}`}
                                        onClick={onClose}
                                        onMouseEnter={() => setFocused(idx)}
                                    >
                                        <div className="search-result-title">
                                            {highlight(item.title, query)}
                                            <span className="search-result-type section">section</span>
                                        </div>
                                        <div className="search-result-context">
                                            {highlight(item.context, query)}
                                        </div>
                                    </a>
                                );
                            })}
                        </>
                    )}
                </div>

                {/* Footer hints */}
                {allResults.length > 0 && (
                    <div className="search-footer">
                        <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
                        <span><kbd>↵</kbd> open</span>
                        <span><kbd>esc</kbd> close</span>
                    </div>
                )}
            </div>
        </div>
    );
}
