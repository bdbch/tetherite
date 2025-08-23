'use client'

import { useOnClickOutside } from "@tetherite/use-onclickoutside"
import { useRef, useState } from "react"

export default function UseOnClickOutsideDemo() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [clickCount, setClickCount] = useState(0)
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useOnClickOutside(dropdownRef, () => {
    setIsDropdownOpen(false)
    setClickCount(prev => prev + 1)
  })

  useOnClickOutside(modalRef, () => {
    setIsModalOpen(false)
    setClickCount(prev => prev + 1)
  })

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Outside clicks detected:</strong> {clickCount}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Dropdown Demo */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Dropdown Menu</h3>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isDropdownOpen ? 'Close' : 'Open'} Dropdown
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Option 1
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Option 2
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Option 3
                  </a>
                </div>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Click outside the dropdown to close it automatically.
          </p>
        </div>

        {/* Modal Demo */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Modal Dialog</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Open Modal
          </button>
          <p className="text-sm text-gray-600 mt-2">
            Click outside the modal content to close it.
          </p>
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl"
          >
            <h4 className="text-lg font-semibold mb-4">Example Modal</h4>
            <p className="text-gray-600 mb-4">
              This is a modal dialog. Click outside this white area to close it automatically.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Action
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">How it works:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• The hook listens for clicks on the document</li>
          <li>• When a click occurs outside the referenced element, the callback is triggered</li>
          <li>• Perfect for closing dropdowns, modals, popovers, and tooltips</li>
          <li>• Supports different mouse events (mousedown, mouseup)</li>
        </ul>
      </div>
    </div>
  )
}