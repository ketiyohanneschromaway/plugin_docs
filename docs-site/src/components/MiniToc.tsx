'use client';

import { useEffect, useMemo, useState } from 'react';

type TocItem = { id: string; title: string; depth: 2 | 3 };

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function parseToc(markdown: string): TocItem[] {
  const lines = markdown.split(/\r?\n/);
  const items: TocItem[] = [];
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)\s*$/);
    if (m2) {
      const title = m2[1].trim();
      items.push({ id: slugify(title), title, depth: 2 });
      continue;
    }
    const m3 = line.match(/^###\s+(.+)\s*$/);
    if (m3) {
      const title = m3[1].trim();
      items.push({ id: slugify(title), title, depth: 3 });
    }
  }
  return items;
}

export default function MiniToc({ content }: { content: string }) {
  const items = useMemo(() => parseToc(content), [content]);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    if (!headings.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id);
      },
      { root: null, rootMargin: '-96px 0px -70% 0px', threshold: [0.1, 1] }
    );

    headings.forEach((h) => obs.observe(h));
    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <aside className="mini-toc" aria-label="Page navigation">
      <nav className="mini-toc-nav">
        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={[
              'mini-toc-link',
              item.depth === 3 ? 'depth-3' : '',
              activeId === item.id ? 'active' : '',
            ].join(' ').trim()}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </aside>
  );
}

