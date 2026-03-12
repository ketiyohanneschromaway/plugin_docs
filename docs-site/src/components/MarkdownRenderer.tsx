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
        <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} type="button">
            {copied ? '✓ Copied' : 'Copy'}
        </button>
    );
}

function WrapButton({ wrapped, onToggle }: { wrapped: boolean; onToggle: () => void }) {
    return (
        <button className="copy-btn" onClick={onToggle} type="button">
            {wrapped ? '↩ Nowrap' : '↔ Wrap'}
        </button>
    );
}

function BlockCode({
    children,
    className,
    rawText,
}: {
    children: React.ReactNode;
    className?: string;
    rawText: string;
}) {
    const [wrapped, setWrapped] = useState(false);
    const lang = className?.replace('language-', '') ?? 'plaintext';

    return (
        <div className={`code-block-wrapper${wrapped ? ' wrapped' : ''}`} style={{ marginTop: 14 }}>
            <div className="code-block-header">
                <span className="code-lang">{lang}</span>
                <div className="code-btn-group">
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

// Map h2 ids → step number styling
const STEP_MAP: Record<string, { num: string; cls: string }> = {
    'step-1-generate-a-secp256k1-keypair': { num: '1', cls: 's1' },
    'step-2-install-the-plugin': { num: '2', cls: 's2' },
    'step-3-configure-openclawjson': { num: '3', cls: 's3' },
    'step-4-restart-the-gateway': { num: '4', cls: 's4' },
};

const components: Components = {
    h1({ children }) {
        return (
            <div className="install-header">
                <div className="hero-badge">Installation Guide</div>
                <h1 className="page-title">{children}</h1>
                <p className="page-description" style={{ marginTop: 12 }}>
                    Follow the steps below to install and configure the Agentic SPM plugin for OpenClaw.
                    The entire process takes about 5 minutes.
                </p>
            </div>
        );
    },

    h2({ children }) {
        const id = slugify(extractText(children));
        const step = STEP_MAP[id];

        if (step) {
            return (
                <div
                    className="step-block-header"
                    id={id}
                    style={{
                        borderRadius: '14px 14px 0 0',
                        marginTop: 36,
                        // no bottom margin — step-block body comes right after
                    }}
                >
                    <div className={`step-num ${step.cls}`}>{step.num}</div>
                    <div className="step-title">{children}</div>
                </div>
            );
        }

        if (id === 'prerequisites') {
            return (
                <div className="prereq-banner" id={id}>
                    <div className="prereq-icon">📋</div>
                    <div>
                        <div className="prereq-title">{children}</div>
                    </div>
                </div>
            );
        }

        if (id === 'summary') {
            return (
                <h2 id={id} style={{
                    fontSize: 19,
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginTop: 44,
                    marginBottom: 14,
                    letterSpacing: '-0.01em',
                }}>
                    {children}
                </h2>
            );
        }

        return (
            <h2 id={id} style={{
                fontSize: 21,
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: 40,
                marginBottom: 14,
                letterSpacing: '-0.015em',
            }}>
                {children}
            </h2>
        );
    },

    h3({ children }) {
        const id = slugify(extractText(children));
        return (
            <div className="substep" id={id} style={{ marginTop: 22 }}>
                <div className="substep-title">{children}</div>
            </div>
        );
    },

    p({ children }) {
        return (
            <p style={{
                fontSize: 15,
                color: 'var(--text-secondary)',
                lineHeight: 1.8,
                marginTop: 10,
            }}>
                {children}
            </p>
        );
    },

    pre({ children }) {
        const child = Array.isArray(children) ? children[0] : children;
        if (!isValidElement(child)) return <pre>{children}</pre>;

        const className = (child.props as { className?: string }).className;
        const rawText = extractText(
            (child.props as { children?: React.ReactNode }).children
        ).replace(/\n$/, '');

        return (
            <BlockCode className={className} rawText={rawText}>
                {(child.props as { children?: React.ReactNode }).children}
            </BlockCode>
        );
    },

    code({ children, className }) {
        if (className) return <code className={className}>{children}</code>;
        return <code>{children}</code>;
    },

    blockquote({ children }) {
        const text = extractText(children);
        const isWarning =
            text.toLowerCase().includes('important') ||
            text.toLowerCase().includes('replace') ||
            text.toLowerCase().includes('match') ||
            text.toLowerCase().includes('must') ||
            text.toLowerCase().includes('not');
        return (
            <div className={`callout ${isWarning ? 'warning' : 'info'}`}>
                <span className="callout-icon">{isWarning ? '⚠️' : 'ℹ️'}</span>
                <div style={{ fontSize: 13.5 }}>{children}</div>
            </div>
        );
    },

    table({ children }) {
        return (
            <div className="summary-table-wrap">
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
        return (
            <strong style={{ color: 'var(--text-primary)', fontWeight: 650 }}>
                {children}
            </strong>
        );
    },

    ul({ children }) {
        return (
            <ul style={{
                paddingLeft: 20,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                color: 'var(--text-secondary)',
                fontSize: 14.5,
                lineHeight: 1.7,
            }}>
                {children}
            </ul>
        );
    },

    ol({ children }) {
        return (
            <ol style={{
                paddingLeft: 20,
                marginTop: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                color: 'var(--text-secondary)',
                fontSize: 14.5,
                lineHeight: 1.7,
            }}>
                {children}
            </ol>
        );
    },

    li({ children }) {
        return <li style={{ paddingLeft: 4 }}>{children}</li>;
    },

    hr() {
        return <div className="section-divider" />;
    },
};

export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={components}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
