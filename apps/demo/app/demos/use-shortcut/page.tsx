'use client'

import useShortcut from "@tetherite/use-shortcut"

export default function UseShortcutDemo() {
  useShortcut(['Control', 'o'], () => {
    alert('You pressed Control + O')
  })

  return (
    <div className="text-center font-medium text-neutral-700">Try to press <kbd className="mono text-xs font-medium p-1 rounded border border-neutral-200">Ctrl</kbd>+<kbd className="mono text-xs font-medium p-1 rounded border border-neutral-200">O</kbd> </div>
  )
}