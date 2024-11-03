"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  label: string
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder: string
}

function Select({
  label = "Label",
  options,
  value,
  onChange,
  placeholder = "Select an option",
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex-1 min-w-[200px] relative">
      <label className="block text-gray-700 font-semibold mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <ChevronDown
          size={20}
          color="#9ca3af"
          className="absolute right-2 top-4"
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 text-left text-gray-400 border-2 border-gray-300 rounded-lg focus:outline-none"
        >
          {value || placeholder}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 w-full mt-1 bg-white rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option}
              className="p-3 hover:bg-[#edf1ff] transition duration-300 cursor-pointer"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select
