import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-brand-surface/30">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-4 py-6 text-sm text-brand-text/70 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs uppercase tracking-wide text-brand-text/60">GENEA Challenge 2026</p>
        <p className="text-sm text-brand-text/80">
          Questions? Drop us a line at{' '}
          <a href="mailto:genea-leaderboard@googlegroups.com" className="font-semibold text-brand-primary hover:text-brand-secondary">
            genea-leaderboard@googlegroups.com
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;