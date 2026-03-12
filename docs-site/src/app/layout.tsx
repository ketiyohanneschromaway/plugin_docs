import type { Metadata } from 'next';
import './globals.css';
import 'highlight.js/styles/github-dark.css';
import Sidebar from '@/components/Sidebar';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Agentic SPM — Docs',
  description: 'Installation and configuration guide for the Agentic SPM OpenClaw plugin by Chromia.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="app-shell">
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
