import { readFileSync } from 'fs';
import { join } from 'path';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MiniToc from '@/components/MiniToc';
import { ExternalLink } from 'lucide-react';

export default function InstallPage() {
    const filePath = join(process.cwd(), 'content', 'ai-guardian-plugin-install.md');
    const content = readFileSync(filePath, 'utf-8');

    return (
        <>
            <div className="topbar">
                <div className="topbar-breadcrumb">
                    <span>Docs</span>
                    <span className="sep">›</span>
                    <span className="current">Installation Guide</span>
                </div>
                <div className="topbar-right">
                    <span className="version-chip">v0.1.3</span>
                    <a
                        href="https://ai-inference.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 6,
                            background: 'rgba(108,99,255,0.12)',
                            color: '#9d98ff',
                            fontWeight: 600,
                            fontSize: 12,
                            padding: '5px 13px',
                            borderRadius: 6,
                            textDecoration: 'none',
                            border: '1px solid rgba(108,99,255,0.25)',
                        }}
                    >
                        <ExternalLink size={12} />
                        Dashboard
                    </a>
                </div>
            </div>

            <div className="page-body">
                <div className="doc-layout">
                    <article className="doc-article">
                        <MarkdownRenderer content={content} />
                    </article>
                    <MiniToc content={content} />
                </div>
            </div>
        </>
    );
}
