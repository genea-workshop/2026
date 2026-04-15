import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChallengePage from './components/pages/ChallengePage';
import RulesPage from './components/pages/RulesPage';
import ToolingPage from './components/pages/ToolingPage';

const getPage = () => {
  if (window.location.hash === '#rules') return 'rules';
  if (window.location.hash === '#tooling') return 'tooling';
  return 'home';
};

const PAGE_NAV_HEIGHT = 40; // px, keep in sync with the bar's py + font size

const App: React.FC = () => {
  const [page, setPage] = useState(getPage);

  useEffect(() => {
    const onHashChange = () => {
      const next = getPage();
      setPage(next);
      // Scroll to top when switching pages
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-brand-text">
      {/* Page-toggle bar — always fixed at the very top */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center bg-white/80 backdrop-blur-md border-b border-gray-200/60">
        <div className="flex gap-1 p-1.5">
          <a
            href="#"
            className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${page === 'home'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-brand-text-muted hover:text-brand-text hover:bg-gray-100'
              }`}
          >
            Overview
          </a>
          <a
            href="#rules"
            className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${page === 'rules'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-brand-text-muted hover:text-brand-text hover:bg-gray-100'
              }`}
          >
            Rules
          </a>
          <a
            href="#tooling"
            className={`px-5 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 ${page === 'tooling'
                ? 'bg-brand-primary text-white shadow-sm'
                : 'text-brand-text-muted hover:text-brand-text hover:bg-gray-100'
              }`}
          >
            Tooling
          </a>
        </div>
      </div>

      {/* Push content below the fixed page-toggle bar */}
      <div style={{ paddingTop: PAGE_NAV_HEIGHT }}>
        {page === 'home' && <Header />}
        <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {page === 'rules' ? <RulesPage /> : page === 'tooling' ? <ToolingPage /> : <ChallengePage pageNavHeight={PAGE_NAV_HEIGHT} />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
