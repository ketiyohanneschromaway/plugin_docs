'use client';

import { isValidElement, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';

function extractText(node: React.ReactNode): string {
    if (node == null || typeof node === 'boolean') return '';
    if (typeof node === 'string' || typeof node === 'number') return String(node);
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (isValidElement(node)) return extractText((node.props as { children?: React.ReactNode }).children);
    return '';
}

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy}>
            {copied ? '✓ Copied' : 'Copy'}
        </button>
    );
}

function WrapButton({ wrapped, onToggle }: { wrapped: boolean; onToggle: () => void }) {
    return (
        <button className="copy-btn" onClick={onToggle} type="button">
            {wrapped ? 'No wrap' : 'Wrap'}
        </button>
    );
}

function BlockCode({ children, className, rawText }: { children: React.ReactNode; className?: string; rawText: string }) {
    const [wrapped, setWrapped] = useState(false);
    const lang = className?.replace('language-', '') ?? 'plaintext';

    return (
        <div className={`code-block-wrapper${wrapped ? ' wrapped' : ''}`} style={{ marginTop: 12 }}>
            <div className="code-block-header">
                <span className="code-lang">{lang}</span>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <WrapButton wrapped={wrapped} onToggle={() => setWrapped((v) => !v)} />
                    <CopyButton text={rawText} />
                </div>
            </div>
            <pre>
                <code className={className}>{children}</code>
            </pre>
        </div>
    );
}

const components: Components = {
    h1({ children }) {
        return (
            <div className="page-hero">
                <div className="hero-badge">Installation Guide</div>
                <h1 className="page-title">{children}</h1>
            </div>
        );
    },

    h2({ children }) {
        const id = slugify(extractText(children));
        const stepMap: Record<string, { num: string; cls: string }> = {
            'prerequisites': { num: '', cls: '' },
            'step-1-generate-a-secp256k1-keypair': { num: '1', cls: 's1' },
            'step-2-install-the-plugin': { num: '2', cls: 's2' },
            'step-3-configure-openclawjson': { num: '3', cls: 's3' },
            'summary': { num: '', cls: '' },
        };
        const step = stepMap[id];
        if (step && step.num) {
            return (
                <div className="step-header" id={id} style={{ borderRadius: '14px 14px 0 0', marginTop: 32 }}>
                    <div className={`step-number ${step.cls}`}>{step.num}</div>
                    <div className="step-title">{children}</div>
                </div>
            );
        }
        if (id === 'prerequisites') {
            return (
                <div className="prereq-banner" id={id} style={{ marginTop: 24 }}>
                    <div>
                        <div className="prereq-title">{children}</div>
                    </div>
                </div>
            );
        }
        if (id === 'summary') {
            return (
                <h2 id={id} style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', marginTop: 40, marginBottom: 12 }}>
                    {children}
                </h2>
            );
        }
        return (
            <h2 id={id} style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', marginTop: 36, marginBottom: 12 }}>
                {children}
            </h2>
        );
    },

    h3({ children }) {
        const id = slugify(extractText(children));
        return (
            <div className="substep" id={id} style={{ marginTop: 24 }}>
                <div className="substep-title">{children}</div>
            </div>
        );
    },

    p({ children }) {
        return <p style={{ fontSize: 14.5, color: 'var(--text-secondary)', lineHeight: 1.75, marginTop: 10 }}>{children}</p>;
    },

    pre({ children }) {
        const child = Array.isArray(children) ? children[0] : children;
        if (!isValidElement(child)) return <pre>{children}</pre>;

        const className = (child.props as { className?: string }).className;
        const rawText = extractText((child.props as { children?: React.ReactNode }).children).replace(/\n$/, '');

        return (
            <BlockCode className={className} rawText={rawText}>
                {(child.props as { children?: React.ReactNode }).children}
            </BlockCode>
        );
    },

    code({ children, className }) {
        if (className) return <code className={className}>{children}</code>;
        return (
            <code style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12.5,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-bright)',
                color: 'var(--accent-2)',
                padding: '2px 6px',
                borderRadius: 4,
            }}>
                {children}
            </code>
        );
    },

    blockquote({ children }) {
        const text = String(children);
        const isWarning = text.toLowerCase().includes('important') || text.toLowerCase().includes('replace') || text.toLowerCase().includes('match') || text.toLowerCase().includes('must');
        return (
            <div className={`callout ${isWarning ? 'warning' : 'info'}`} style={{ marginTop: 12 }}>
                <div style={{ fontSize: 13.5 }}>{children}</div>
            </div>
        );
    },

    table({ children }) {
        return (
            <div className="summary-table-wrap" style={{ marginTop: 16 }}>
                <table className="summary-table">{children}</table>
            </div>
        );
    },

    th({ children }) {
        return <th>{children}</th>;
    },

    td({ children }) {
        return <td>{children}</td>;
    },

    strong({ children }) {
        return <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{children}</strong>;
    },

    hr() {
        return <div className="section-divider" style={{ margin: '28px 0' }} />;
    },
};

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
