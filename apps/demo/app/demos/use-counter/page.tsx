'use client'

import { useCounter } from "@tetherite/use-counter"

export default function UseCounterDemo() {
  const [count, { increment, decrement, set, reset }] = useCounter(0, {
    min: 0,
    max: 10
  })
  
  const [stepSize, setStepSize] = useCounter(1, { min: 1, max: 5 })

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-blue-600 mb-4">
          {count}
        </div>
        <div className="text-sm text-gray-500">
          (Range: 0 - 10)
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Step Size:</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => stepSize[1].decrement()}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            -
          </button>
          <span className="w-8 text-center font-semibold">{stepSize[0]}</span>
          <button
            onClick={() => stepSize[1].increment()}
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-sm hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => decrement(stepSize[0])}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            disabled={count <= 0}
          >
            - {stepSize[0]}
          </button>
          
          <button
            onClick={() => increment(stepSize[0])}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            disabled={count >= 10}
          >
            + {stepSize[0]}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => set(0)}
            className="flex-1 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Set to 0
          </button>
          
          <button
            onClick={() => set(5)}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Set to 5
          </button>
          
          <button
            onClick={() => set(10)}
            className="flex-1 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Set to 10
          </button>
        </div>

        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Reset to Initial (0)
        </button>
      </div>

      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <p><strong>Features demonstrated:</strong></p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Min/max constraints (0-10)</li>
          <li>Variable step size</li>
          <li>Direct value setting</li>
          <li>Reset to initial value</li>
        </ul>
      </div>
    </div>
  )
}