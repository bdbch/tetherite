import { useCallback, useEffect, useState } from "react";

function tryParse(value: string) {
  try {
    return JSON.parse(value);
  } catch (e) {
    throw new Error("Invalid JSON value");
  }
}

/**
 * **useLocalStorage**
 *
 * The `useLocalStorage` hook is a simple hook that handles a boolean state and provides methods to toggle, enable, and disable the state.
 *
 * @param key The key to store the value in the local storage.
 * @param initialValue The initial value of the state.
 * @param options.pollingInterval The interval in milliseconds to poll the local storage for changes. Set to `false` to disable polling.
 * @returns A tuple with the value and an update function.
 * @example const [value, setValue] = useLocalStorage('name', 'John', { pollingInterval: false })
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  options: {
    pollingInterval?: number | false;
  } = {
    pollingInterval: false,
  }
): UseLocalStorageValue<T> => {
  const [value, setValue] = useState(initialValue);

  const setStoredValue = useCallback(
    (newValue: T) => {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  useEffect(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue && tryParse(storedValue) !== initialValue) {
      setStoredValue(tryParse(storedValue));
    } else {
      if (storedValue) {
        setStoredValue(tryParse(storedValue));
      }

      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, initialValue]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem(key);

      if (storedValue !== JSON.stringify(value) && storedValue) {
        const parsedValue = tryParse(storedValue);
        setStoredValue(parsedValue);
        console.log(
          `Storage change detected on key ${key} - from ${value} to ${storedValue}`
        );
      }
    };

    window.addEventListener("storage", handleStorageChange);
    let pollInterval: number | undefined;

    if (options.pollingInterval !== false) {
      pollInterval = window.setInterval(handleStorageChange, options.pollingInterval);
    }

    return () => {
      window.removeEventListener("storage", handleStorageChange);

      if (pollInterval) {
        window.clearInterval(pollInterval);
      }
    };
  }, [value]);

  return [value, setStoredValue];
};

export type UseLocalStorageValue<T = any> = [T, (value: T) => void];
