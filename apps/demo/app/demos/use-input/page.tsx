'use client'

import { useInput } from '@tetherite/use-input'

export default function UseInputDemo() {
  const [value, updateValue] = useInput()

  return (
    <div>
      <div>
        <input className="w-full rounded-xl p-4 text-lg border border-neutral-300 hover:border-neutral-500 focus:border-neutral-500" type="text" value={value} onChange={updateValue} placeholder="Type something" />
      </div>
      <div className="mt-2">
        <p><strong>Value:</strong> {value || 'No value'}</p>
      </div>
    </div>
  )
}