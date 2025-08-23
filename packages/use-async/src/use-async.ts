import { useCallback, useEffect, useRef, useState } from "react";

/**
 * **useAsync**
 *
 * The `useAsync` hook handles async operations with loading, error, and data states.
 * It automatically manages the lifecycle of async operations and provides utilities
 * to execute, cancel, and reset the operation.
 *
 * @param asyncFn The async function to execute
 * @param immediate Whether to execute the function immediately on mount
 * @returns An object with data, loading, error states and execute, cancel, reset functions
 * @example const { data, loading, error, execute } = useAsync(fetchData, false)
 */
export const useAsync = <T, E = string>(
  asyncFn: (...args: any[]) => Promise<T>,
  immediate: boolean = true
): UseAsyncReturn<T, E> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<E | null>(null);
  
  // Use ref to track the latest async function and prevent stale closure issues
  const asyncFnRef = useRef(asyncFn);
  asyncFnRef.current = asyncFn;
  
  // Use ref to track if component is mounted to prevent state updates after unmount
  const mountedRef = useRef(true);
  
  // Use ref to track the current execution promise for cancellation
  const executionRef = useRef<{
    cancel: () => void;
  } | null>(null);

  const execute = useCallback((...args: any[]) => {
    setLoading(true);
    setError(null);
    
    let cancelled = false;
    
    // Cancel any previous execution
    if (executionRef.current) {
      executionRef.current.cancel();
    }
    
    // Set up new execution with cancellation
    executionRef.current = {
      cancel: () => {
        cancelled = true;
      }
    };

    const promise = asyncFnRef.current(...args);
    
    promise
      .then((result: T) => {
        if (!cancelled && mountedRef.current) {
          setData(result);
          setLoading(false);
        }
      })
      .catch((err: E) => {
        if (!cancelled && mountedRef.current) {
          setError(err);
          setLoading(false);
        }
      });
      
    return promise;
  }, []);

  const cancel = useCallback(() => {
    if (executionRef.current) {
      executionRef.current.cancel();
    }
    if (mountedRef.current) {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    if (executionRef.current) {
      executionRef.current.cancel();
    }
    if (mountedRef.current) {
      setData(null);
      setError(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      execute();
    }
    
    return () => {
      mountedRef.current = false;
      if (executionRef.current) {
        executionRef.current.cancel();
      }
    };
  }, [execute, immediate]);

  return {
    data,
    loading,
    error,
    execute,
    cancel,
    reset,
  };
};

export type UseAsyncReturn<T, E = string> = {
  data: T | null;
  loading: boolean;
  error: E | null;
  execute: (...args: any[]) => Promise<T>;
  cancel: () => void;
  reset: () => void;
};