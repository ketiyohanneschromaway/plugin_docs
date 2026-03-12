import { readFileSync } from 'fs';
import { join } from 'path';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MiniToc from '@/components/MiniToc';
import Topbar from '@/components/Topbar';

export default function InstallPage() {
    const filePath = join(process.cwd(), 'content', 'ai-guardian-plugin-install.md');
    const content = readFileSync(filePath, 'utf-8');

    return (
        <>
            <Topbar breadcrumb={[{ label: 'Docs', href: '/' }, { label: 'Installation Guide' }]} />

            <div className="page-body">
                <div className="doc-layout">
                    <article className="doc-article animate-in">
                        <MarkdownRenderer content={content} />
                    </article>
                    <MiniToc content={content} />
                </div>
            </div>
        </>
    );
}
