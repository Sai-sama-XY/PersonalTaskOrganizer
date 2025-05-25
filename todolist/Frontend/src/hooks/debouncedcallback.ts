import { useRef } from "react";

export function useDebouncedCallback(callback: () => void, delay: number = 500) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  };
}
