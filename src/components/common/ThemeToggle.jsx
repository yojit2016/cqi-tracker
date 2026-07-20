import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = ({ iconOnly = false }) => {
  const { theme, toggleTheme } = useTheme();

  if (iconOnly) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-text-primary transition duration-fast hover:bg-surface-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#161E2E] focus:outline-none shadow-sm"
        aria-label="Toggle theme"
      >
        <span>{theme === 'dark' ? '🌙' : '☀️'}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex w-full items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-xs font-semibold text-text-primary transition duration-fast hover:bg-surface-hover focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-[#161E2E] focus:outline-none shadow-sm"
      aria-label="Toggle theme"
    >
      <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
      <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold text-white leading-none">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;
