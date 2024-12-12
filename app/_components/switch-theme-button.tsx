'use client';

import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import SunIcon from './sun-icon';
import DeskTopIcon from './desk-top-icon';
import MoonIcon from './moon-icon';
import script from '@/lib/default-theme';

type Theme = 'light' | 'system' | 'dark';

type ThemeOption = { theme: Theme; icon: React.ReactElement }[];

const options: ThemeOption = [
  {
    theme: 'light',
    icon: <SunIcon />,
  },
  {
    theme: 'system',
    icon: <DeskTopIcon />,
  },
  {
    theme: 'dark',
    icon: <MoonIcon />,
  },
];

const getDefaultTheme: () => Theme | undefined = () => {
  try {
    return (localStorage.getItem('theme') ?? 'system') as Theme;
  } catch (e) {
    console.error('get default theme error', e);
  }
};

export default function SwitchThemeButton() {
  const [themeState, setThemeState] = useState<Theme | undefined>();
  const [darkMode, setDarkMode] = useState<boolean | undefined>();

  const darkQuery = useRef<MediaQueryList>(null);
  const isMismatchTransition = useRef<boolean>(true);
  const clickPosition = useRef<{ x: number; y: number }>(null);
  const systemButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Set theme with localStorage
   */
  const setTheme = useCallback((value: Theme) => {
    setThemeState(value);
    try {
      localStorage.setItem('theme', value);
    } catch (e) {
      console.error('set theme to localStorage error', e);
    }
  }, []);

  const handleClickToggle = useCallback(
    (value: Theme, event: MouseEvent) => {
      setTheme(value);
      clickPosition.current = { x: event.clientX, y: event.clientY };
    },
    [setTheme]
  );

  const mediaChangeHandler = useCallback(
    (e: MediaQueryListEvent) => {
      if (themeState === 'system') {
        setDarkMode(e.matches);
      }
    },
    [themeState]
  );

  /**
   * Set the default theme from localStorage
   */
  useEffect(() => {
    setThemeState(getDefaultTheme());
    if (systemButtonRef.current && getDefaultTheme() === 'system') {
      const clientRect = systemButtonRef.current.getBoundingClientRect();
      clickPosition.current = {
        x: clientRect.left + clientRect.width / 2,
        y: clientRect.top + clientRect.height / 2,
      };
    }
    darkQuery.current = matchMedia('(prefers-color-scheme: dark)');
    darkQuery.current.addEventListener('change', mediaChangeHandler);
    return () => {
      darkQuery.current?.removeEventListener('change', mediaChangeHandler);
    };
  }, [mediaChangeHandler]);

  useEffect(() => {
    setDarkMode(
      themeState === 'dark' ||
        (themeState === 'system' && Boolean(darkQuery.current?.matches))
    );
  }, [themeState]);

  useEffect(() => {
    if (typeof darkMode === 'undefined') return;
    if (isMismatchTransition.current) {
      isMismatchTransition.current = false;
      return;
    }
    const transition = document.startViewTransition(async () => {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
        }
      }
    });
    transition.ready.then(async () => {
      if (!clickPosition.current) return;
      const { x, y } = clickPosition.current;
      const r = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
      );
      const isDark = document.documentElement.classList.contains('dark');
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${r}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-out',
          pseudoElement: isDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });
  }, [darkMode]);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})()` }}
      ></script>
      <div className="flex h-[42px] rounded-full border border-theme items-center gap-1 px-2">
        {options.map(({ theme: itemTheme, icon }) => (
          <button
            onClick={(e) => handleClickToggle(itemTheme, e)}
            key={itemTheme}
            ref={(ref) => {
              if (itemTheme === 'system') {
                systemButtonRef.current = ref;
              }
            }}
            className={`block p-2 hover:bg-themeSwitchButtonActive rounded-xl ${
              itemTheme === themeState ? 'bg-themeSwitchButtonActive' : ''
            }`}
          >
            {icon}
          </button>
        ))}
      </div>
    </>
  );
}
