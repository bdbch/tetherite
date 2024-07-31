import { useEffect } from "react";

/**
 * **useShortcut**
 *
 * The `useShortcut` hook allows binding a callback to a keyboard shortcut
 *
 * @param keys The keys to bind the shortcut to, e.g. `["Control", "a"]`
 * @param action The callback to run when the shortcut is triggered
 * @returns void
 * @example useShortcut(["Control", "o"], () => console.log("Shortcut triggered"))
 */
export const useShortcut = (keys: string[], action: () => void) => {
  const pressedKeys = new Set<string>();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      pressedKeys.add(event.key);

      if (keys.every((key) => pressedKeys.has(key))) {
        pressedKeys.clear();
        event.preventDefault();
        event.stopPropagation();
        action();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      pressedKeys.delete(event.key);
    };

    const blurHandler = () => {
      pressedKeys.clear();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", blurHandler);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", blurHandler);
    };
  }, []);
};
