import { useCallback, useEffect, useState } from 'react';

/**
 * **useMouse**
 *
 * The `useMouse` hook returns information about the cursor position & state
 *
 * @param container The container element, window or ref to use as the mouse area
 * @returns An object including the x and y position of the cursor
 * @example const { x, y } = useMouse()
 */
export const useMouse = (container: MouseContainer = window): MouseState => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setX(event.clientX);
      setY(event.clientY);
    };

    if (container instanceof HTMLElement) {
      container.addEventListener('mousemove', handleMouseMove);
    } else if (container === window) {
      window.addEventListener('mousemove', handleMouseMove);
    } else if (
      container instanceof Object &&
      'current' in container &&
      container.current instanceof HTMLElement
    ) {
      container.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container instanceof HTMLElement) {
        container.removeEventListener('mousemove', handleMouseMove);
      } else if (container === window) {
        window.removeEventListener('mousemove', handleMouseMove);
      } else if (
        container instanceof Object &&
        'current' in container &&
        container.current instanceof HTMLElement
      ) {
        container.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [container]);

  return { x, y };
};

export type MouseContainer =
  | HTMLElement
  | Window
  | React.RefObject<HTMLElement>;

export type MouseState = {
  x: number;
  y: number;
};
