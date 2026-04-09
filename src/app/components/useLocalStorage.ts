"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

/** localStorage를 외부 스토어로 다루는 훅 (SSR-safe) */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const cachedRaw = useRef<string | null>(null);
  const cachedValue = useRef<T>(initialValue);

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) onStoreChange();
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
    [key],
  );

  /** raw 문자열이 바뀌었을 때만 파싱하여 안정적인 참조를 반환 */
  const getSnapshot = useCallback((): T => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== cachedRaw.current) {
        cachedRaw.current = raw;
        cachedValue.current = raw ? JSON.parse(raw) : initialValue;
      }
      return cachedValue.current;
    } catch {
      return cachedValue.current;
    }
  }, [key, initialValue]);

  const getServerSnapshot = useCallback((): T => initialValue, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const current = getSnapshot();
      const next = updater instanceof Function ? updater(current) : updater;
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new StorageEvent("storage", { key }));
    },
    [key, getSnapshot],
  );

  return [value, setValue] as const;
}
