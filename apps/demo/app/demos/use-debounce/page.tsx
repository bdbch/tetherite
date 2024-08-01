'use client'

import { useState } from "react"
import { useDebounce } from '@tetherite/use-debounce'

export default function UseDebounceDemo() {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 1000)

  return (
    <div>
      <div>
        <input className="w-full rounded-xl p-4 text-lg border border-neutral-300 hover:border-neutral-500 focus:border-neutral-500" type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Type something" />
      </div>
      <div className="mt-2">
        <p><strong>Value:</strong> {value || 'No value'}</p>
        <p><strong>Debounced value:</strong> {debouncedValue || 'No value'}</p>
      </div>
    </div>
  )
}