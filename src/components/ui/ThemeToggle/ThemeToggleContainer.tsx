'use client';

import { useCallback, useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { ThemeTogglePresentational } from './ThemeTogglePresentational';

export const ThemeToggleContainer = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration mismatch 回避のため意図的に使用
    setMounted(true);
  }, []);

  const handleToggle = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  return (
    <ThemeTogglePresentational
      resolvedTheme={resolvedTheme}
      mounted={mounted}
      onToggle={handleToggle}
    />
  );
};
