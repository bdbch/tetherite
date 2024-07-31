import { useCallback, useState, type ChangeEvent } from "react";

/**
 * **useInput**
 *
 * The `useInput` hook is a simple hook that provides a value and onChange handler for quick form inputs.
 *
 * @param initialValue The initial value of the input
 * @returns A tuple with the value and an onChange handler for HTML input and textarea elements.
 * @example const [name, handleNameUpdate] = useInput('John Doe')
 */
export const useInput = (initialValue: string = "") => {
  const [value, setValue] = useState(initialValue);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return [value, handleInputChange] as const;
};
