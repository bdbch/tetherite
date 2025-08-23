'use client'

import { useAsync } from "@tetherite/use-async"
import { useState } from "react"

// Mock async function that simulates an API call
const fetchUserData = async (userId: number): Promise<{ id: number; name: string; email: string }> => {
  await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate network delay
  
  if (userId === 404) {
    throw new Error("User not found")
  }
  
  return {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`
  }
}

export default function UseAsyncDemo() {
  const [userId, setUserId] = useState(1)
  
  const { data, loading, error, execute, reset } = useAsync(
    () => fetchUserData(userId),
    false // Don't execute immediately
  )

  const handleFetchUser = () => {
    execute()
  }

  const handleFetchError = () => {
    setUserId(404)
    execute()
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">User ID:</label>
        <input
          type="number"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min="1"
        />
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={handleFetchUser}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Fetch User"}
        </button>
        
        <button
          onClick={handleFetchError}
          disabled={loading}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          Test Error
        </button>
        
        <button
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>

      <div className="p-4 border rounded-lg">
        {loading && (
          <div className="text-blue-600">
            🔄 Loading user data...
          </div>
        )}
        
        {error && (
          <div className="text-red-600">
            ❌ Error: {error.message}
          </div>
        )}
        
        {data && !loading && (
          <div className="text-green-600">
            <h3 className="font-semibold">✅ User Data:</h3>
            <p><strong>ID:</strong> {data.id}</p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
          </div>
        )}
        
        {!data && !loading && !error && (
          <div className="text-gray-500">
            Click "Fetch User" to load data
          </div>
        )}
      </div>
    </div>
  )
}