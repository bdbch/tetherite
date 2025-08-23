import { useCallback, useState } from "react";

/**
 * **useCounter**
 *
 * The `useCounter` hook provides a numeric state with convenient methods to increment,
 * decrement, set, and reset the counter value. It supports optional min/max constraints.
 *
 * @param initialValue The initial value of the counter (default: 0)
 * @param options Configuration options with min/max values
 * @returns A tuple with the counter value and an object with methods to manipulate it
 * @example const [count, { increment, decrement, set, reset }] = useCounter(0, { min: 0, max: 10 })
 */
export const useCounter = (
  initialValue: number = 0,
  options: UseCounterOptions = {}
): [number, CounterActions] => {
  const { min, max } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback((step: number = 1) => {
    setCount((prev) => {
      const newValue = prev + step;
      if (max !== undefined && newValue > max) {
        return max;
      }
      return newValue;
    });
  }, [max]);

  const decrement = useCallback((step: number = 1) => {
    setCount((prev) => {
      const newValue = prev - step;
      if (min !== undefined && newValue < min) {
        return min;
      }
      return newValue;
    });
  }, [min]);

  const set = useCallback((value: number) => {
    setCount((prev) => {
      let newValue = value;
      if (min !== undefined && newValue < min) {
        newValue = min;
      }
      if (max !== undefined && newValue > max) {
        newValue = max;
      }
      return newValue;
    });
  }, [min, max]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return [count, { increment, decrement, set, reset }] as const;
};

export type UseCounterOptions = {
  min?: number;
  max?: number;
};

export type CounterActions = {
  increment: (step?: number) => void;
  decrement: (step?: number) => void;
  set: (value: number) => void;
  reset: () => void;
};