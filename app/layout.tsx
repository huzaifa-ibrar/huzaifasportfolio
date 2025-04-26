import './globals.css';
import type { Metadata } from 'next';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Initialize Font Awesome configuration
config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Huzaifa Ibrar | Full Stack Developer',
  description: 'Portfolio of Huzaifa Ibrar - Full Stack Developer with expertise in Java, Python, JavaScript, React, and more.',
  keywords: 'Huzaifa Ibrar, Full Stack Developer, Software Engineer, React, JavaScript, Java, Python',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-800 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
