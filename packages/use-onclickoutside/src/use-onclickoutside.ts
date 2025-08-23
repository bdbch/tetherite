import { useEffect, useRef, type RefObject } from "react";

/**
 * **useOnClickOutside**
 *
 * The `useOnClickOutside` hook detects clicks outside of a target element
 * and executes a callback when such clicks occur. Useful for closing modals,
 * dropdowns, or other overlays when clicking outside them.
 *
 * @param ref React ref object pointing to the target element
 * @param handler Callback function to execute when clicking outside
 * @param mouseEvent The mouse event to listen for (default: 'mousedown')
 * @returns void
 * @example useOnClickOutside(modalRef, () => setIsOpen(false))
 */
export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void => {
  const savedHandler = useRef(handler);

  // Update the saved handler when the handler prop changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const target = event.target as Node;
      
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(target)) {
        return;
      }
      
      savedHandler.current(event);
    };

    document.addEventListener(mouseEvent, handleClickOutside);
    
    return () => {
      document.removeEventListener(mouseEvent, handleClickOutside);
    };
  }, [ref, mouseEvent]);
};