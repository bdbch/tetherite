import { useCallback, useState } from "react";

/**
 * **useToggle**
 *
 * The `useToggle` hook is a simple hook that handles a boolean state and provides methods to toggle, enable, and disable the state.
 *
 * @param  initialValue The initial value of the state.
 * @returns A tuple with the state and an object with the methods to toggle, enable, and disable the state.
 * @example const [value, { toggle, enable, disable }] = useToggle()
 */
export const useToggle = (
  initialValue: boolean = false
): [boolean, ToggleActions] => {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const enable = useCallback(() => setValue(true), []);
  const disable = useCallback(() => setValue(false), []);

  return [value, { toggle, enable, disable }] as const;
};

export type ToggleActions = {
  toggle: () => void;
  enable: () => void;
  disable: () => void;
};