import { readFileSync } from 'fs';
import { join } from 'path';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MiniToc from '@/components/MiniToc';

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
