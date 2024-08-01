'use client'

import useToggle from "@tetherite/use-toggle"

export default function UseToggleDemo() {
  const [value, { toggle, enable, disable }] = useToggle(false)

  return (
    <div>
      <div className="flex items-center justify-center">
        <button className="size-48 flex items-center justify-center text-3xl font-bold rounded-full bg-neutral-200" onClick={toggle} style={{ backgroundColor: value ? '#ff7' : '#303030', color: value ? '#886' : '#fff' }}>
          {value ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className="flex items-center justify-center mt-4 gap-2">
        <button className="underline" onClick={enable}>Turn on</button>
        <button className="underline" onClick={disable}>Turn off</button>
      </div>
    </div>
  )
}