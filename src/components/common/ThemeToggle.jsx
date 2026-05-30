import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-between gap-3 rounded-full border border-border bg-surface px-4 py-3 text-sm font-semibold text-text-primary transition duration-200 hover:bg-surface-hover"
      aria-label="Toggle theme"
    >
      <span>{theme === 'dark' ? 'Dark mode' : 'Light mode'}</span>
      <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
        {theme === 'dark' ? '🌙' : '☀️'}
      </span>
    </button>
  );
};

export default ThemeToggle;
