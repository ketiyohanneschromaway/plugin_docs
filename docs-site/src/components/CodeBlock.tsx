'use client';

import { useState } from 'react';

interface CodeBlockProps {
    code: string;
    lang?: string;
}

export default function CodeBlock({ code, lang = 'bash' }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        await navigator.clipboard.writeText(code.trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="code-block-wrapper">
            <div className="code-block-header">
                <span className="code-lang">{lang}</span>
                <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy} id={`copy-${lang}-${code.slice(0, 8)}`}>
                    {copied ? '✓ Copied' : 'Copy'}
                </button>
            </div>
            <pre>
                <code>{code.trim()}</code>
            </pre>
        </div>
    );
}
