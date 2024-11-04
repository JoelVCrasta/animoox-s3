"use client"

import { useState, useEffect } from "react"
import { Trash2 } from "lucide-react"

interface KeyFeaturesProps {
  keyFeatures: string[]
  setKeyFeatures: (value: string[]) => void
}

const KeyFeatures = ({ keyFeatures, setKeyFeatures }: KeyFeaturesProps) => {
  const [features, setFeatures] = useState<string[]>(keyFeatures)

  useEffect(() => {
    setFeatures(keyFeatures)
  }, [keyFeatures])

  const handleAddFeature = () => {
    const newFeatures = [...features, ""]
    setFeatures(newFeatures)
    setKeyFeatures(newFeatures)
  }

  const handleRemoveFeature = (index: number) => {
    const newFeatures = features.filter((_, i) => i !== index)
    setFeatures(newFeatures)
    setKeyFeatures(newFeatures)
  }

  const handleChangeFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
    setKeyFeatures(newFeatures)
  }

  return (
    <div className="max-h-[400px] w-full overflow-y-auto">
      <div className="flex flex-col gap-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex gap-4 items-center min-w-[200px] relative"
          >
            <input
              type="text"
              value={feature}
              onChange={(e) => handleChangeFeature(index, e.target.value)}
              className="w-full p-3 pr-10 text-gray-400 border-2 border-gray-300 rounded-lg focus:outline-none"
              placeholder="Feature"
            />
            <button
              onClick={() => handleRemoveFeature(index)}
              className="absolute right-4"
            >
              <Trash2 size={14} color="#ef4444" />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddFeature}
          className="w-28 py-2 bg-background text-blue-400 text-sm font-semibold rounded-full"
        >
          Add New
        </button>
      </div>
    </div>
  )
}

export default KeyFeatures
