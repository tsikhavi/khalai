'use client';

import {useSyncExternalStore} from 'react';
import {useTheme, type Theme} from '@/providers/ThemeProvider';
import Button from './button';
import {DarkModeIcon, LightModeIcon, SystemIcon} from './ThemeIcon';

// Re-export the provider's Theme type so there's a single source of truth
type ThemeType = Theme;

interface ThemeChangerProps {
  className?: string;
  onThemeChange?: (theme: ThemeType) => void;
  availableThemes?: ThemeType[];
  displayMode?: 'cycle' | 'dropdown' | 'buttons';
}

const themeConfig: Record<ThemeType, {label: string; icon: React.ReactNode}> = {
  light: {label: 'Light', icon: <LightModeIcon />},
  dark: {label: 'Dark', icon: <DarkModeIcon />},
  system: {label: 'System', icon: <SystemIcon />},
};

const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const ThemeChanger: React.FC<ThemeChangerProps> = ({
  className = '',
  onThemeChange,
  availableThemes = ['light', 'dark', 'system'],
  displayMode = 'cycle',
}) => {
  const {theme, setTheme, resolvedTheme} = useTheme();
  const mounted = useHydrated();

  const chosenTheme = (theme ?? 'system') as ThemeType;
  const displayTheme = (
    chosenTheme === 'system' ? (resolvedTheme ?? 'light') : chosenTheme
  ) as ThemeType;

  const getNextTheme = (current: ThemeType): ThemeType => {
    const currentIndex = availableThemes.indexOf(current);
    if (currentIndex === -1) return availableThemes[0];
    return availableThemes[(currentIndex + 1) % availableThemes.length];
  };

  const handleCycleTheme = () => {
    const newTheme = getNextTheme(chosenTheme);
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const handleThemeSelect = (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    onThemeChange?.(selectedTheme);
  };

  // ── Pre-hydration: render the same shape, but disabled ──
  if (!mounted) {
    if (displayMode === 'cycle') {
      return (
        <Button
          variant="secondary"
          size="sm"
          className={className}
          aria-label="Toggle theme"
          disabled>
          <LightModeIcon />
        </Button>
      );
    }
    return null;
  }

  if (displayMode === 'cycle') {
    const currentLabel = themeConfig[chosenTheme]?.label ?? chosenTheme;
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={handleCycleTheme}
        title={`Toggle Theme (Current: ${currentLabel})`}
        className={className}
        aria-label={`Toggle theme, currently ${currentLabel}`}>
        {themeConfig[displayTheme]?.icon ?? <LightModeIcon />}
      </Button>
    );
  }

  if (displayMode === 'dropdown') {
    return (
      <select
        value={chosenTheme}
        onChange={(e) => handleThemeSelect(e.target.value as ThemeType)}
        className={className}
        aria-label="Select theme">
        {availableThemes.map((option) => (
          <option
            key={option}
            value={option}>
            {themeConfig[option]?.label ?? option}
          </option>
        ))}
      </select>
    );
  }

  if (displayMode === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {availableThemes.map((option) => {
          const isActive = chosenTheme === option;
          const meta = themeConfig[option];
          return (
            <Button
              key={option}
              variant={isActive ? 'ghost' : 'secondary'}
              size="sm"
              onClick={() => handleThemeSelect(option)}
              title={`Switch to ${meta?.label ?? option} theme`}
              aria-label={`Switch to ${meta?.label ?? option} theme`}
              aria-pressed={isActive}
              className={isActive ? 'border-2 border-blue-500' : ''}>
              {meta?.icon}
              <span className="ml-1">{meta?.label}</span>
            </Button>
          );
        })}
      </div>
    );
  }

  return null;
};

export default ThemeChanger;
