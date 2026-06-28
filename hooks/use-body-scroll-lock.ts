"use client";

import { useEffect } from "react";

/**
 * Locks/unlocks body scroll based on the `locked` flag.
 * Restores overflow on unmount to prevent stale locks.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}
