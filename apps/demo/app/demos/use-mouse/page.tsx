'use client'

import { useMouse } from '@tetherite/use-mouse'

export default function UseMouseDemo() {
  const { x, y } = useMouse()

  return (
    <div className="text-center text-xl font-medium text-neutral-700">Your cursor is at {x}x{y}</div>
  )
}