import { useCallback, useEffect, useState } from "react";

/**
 * **useDebounce**
 *
 * The `useDebounce` hook can be used to debounce a value. It will return the value after a certain delay.
 *
 * @param value The value to debounce.
 * @param delay The delay in milliseconds.
 * @returns The debounced value.
 * @example const debouncedValue = useDebounce(value, 1000);
 */
export const useDebounce = <T>(value: T, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
