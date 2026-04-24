"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function getInitialDark(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "dark") return true;
    if (stored === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return false;
  }
}

function applyDark(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

/** 시스템 선호를 기본으로 하고, 토글 시 localStorage에 저장 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(getInitialDark());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    applyDark(dark);
  }, [dark, ready]);

  function toggle() {
    setDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  if (!ready) {
    return <div className="h-9 w-9 shrink-0" aria-hidden />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-lg p-2 text-app-toggle transition-colors hover:bg-app-border-card hover:text-app-toggle-hover"
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
    >
      {dark ? (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
}
