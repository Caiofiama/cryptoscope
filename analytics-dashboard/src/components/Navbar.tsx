import { Sun, Moon, BarChart2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUIStore } from '../stores/uiStore';

export const Navbar = () => {
  const { theme, toggleTheme } = useUIStore();

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
          <BarChart2 className="h-5 w-5 text-indigo-500" />
          CryptoScope
        </Link>
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="rounded-lg p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
};
