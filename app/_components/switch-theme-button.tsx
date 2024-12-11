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
  const [clickPosition, setClickPosition] = useState<{
    x: number;
    y: number;
  }>();
  const darkQuery = useRef<MediaQueryList>(null);
  const isMismatchTransition = useRef<boolean>(true);

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
      setClickPosition({ x: event.clientX, y: event.clientY });
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
      if (!clickPosition) return;
      const { x, y } = clickPosition;
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

  // const toggleTheme = useCallback(() => {
  //   if (theme === 'system' || theme === 'light') {
  //     if (theme === 'system') {
  //       if (getSystemTheme() === 'dark') {
  //         document.documentElement.classList.add(`dark`);
  //       } else {
  //         document.documentElement.classList.remove(`dark`);
  //       }
  //     } else {
  //       document.documentElement.classList.remove(`dark`);
  //     }
  //   } else {
  //     document.documentElement.classList.add(`dark`);
  //   }
  // }, [theme]);

  // useEffect(() => {
  //   console.log('theme', theme);
  //   localStorage.setItem('theme', theme ?? 'system');
  //   toggleTheme();
  // }, [theme, toggleTheme]);

  // const [theme, setTheme] = useState()
  // const buttonRef = useRef<HTMLButtonElement>(null)
  // const isMounted = useRef<boolean>(false);
  // const [theme, setTheme] = useState<string>(() => {
  //     const theme = localStorage.getItem('theme')
  //     return theme ? theme : 'system'
  // })
  // const [clickPosition, setClickPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 })
  // const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

  // const onWindowMatch = () => {
  //     if (localStorage.getItem('theme') === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
  //         document.documentElement.classList.add('dark')
  //     } else {
  //         document.documentElement.classList.remove('dark')
  //     }
  // }

  // const toggleTheme = useCallback(() => {
  //     const transition = document.startViewTransition(() => {
  //         switch (theme) {
  //             case 'light':
  //                 document.documentElement.classList.remove('dark')
  //                 localStorage.setItem('theme', 'light')
  //                 break;
  //             case 'dark':
  //                 document.documentElement.classList.add('dark')
  //                 localStorage.setItem('theme', 'dark')
  //                 break;
  //             default:
  //                 localStorage.removeItem('theme')
  //                 onWindowMatch()
  //                 break;
  //         }
  //     })

  //     transition.ready.then(() => {
  //         const { x, y } = clickPosition
  //         const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  //         const isDark = document.documentElement.classList.contains('dark')
  //         const clipPath = [
  //             `circle(0px at ${x}px ${y}px)`,
  //             `circle(${r}px at ${x}px ${y}px)`,
  //         ]
  //         document.documentElement.animate({
  //             clipPath: isDark
  //                 ? [...clipPath].reverse()
  //                 : clipPath,
  //         }, {
  //             duration: 500,
  //             easing: 'ease-out',
  //             pseudoElement: isDark
  //                 ? '::view-transition-old(root)'
  //                 : '::view-transition-new(root)'
  //         })
  //     })
  // }, [theme, clickPosition])

  // const handleClickToggle = useCallback((select: string, e: MouseEvent) => {
  //     const { clientX, clientY } = e
  //     setTheme(select)
  //     setClickPosition({ x: clientX, y: clientY })
  // }, [theme])

  // const handleDarkQueryChange = useCallback(() => {
  //     if (!localStorage.getItem('theme')) {
  //         toggleTheme()
  //     }
  // }, [clickPosition])

  // useEffect(() => {
  //     if(!isMounted.current) return
  //     onWindowMatch()
  //     toggleTheme()
  // }, [theme, handleDarkQueryChange])

  // useEffect(() => {
  //     if (buttonRef.current) {
  //         setClickPosition({ x: buttonRef.current.offsetLeft, y: buttonRef.current.offsetTop })
  //     }
  //     darkQuery.addEventListener('change', handleDarkQueryChange)
  //     isMounted.current = true
  //     return () => {
  //         darkQuery.removeEventListener('change', handleDarkQueryChange)
  //         isMounted.current = false
  //     }
  // }, [])

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
