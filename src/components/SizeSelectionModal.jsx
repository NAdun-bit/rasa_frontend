"use client"

import { X } from "lucide-react"

export default function SizeSelectionModal({ currentSize, currentPrice, basePrice, onSelectSize, onClose }) {
  const sizes = [
    { name: "Regular", multiplier: 1.0, description: "Standard portion" },
    { name: "Medium", multiplier: 1.3, description: "20% more food" },
    { name: "Large", multiplier: 1.6, description: "60% more food" },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-dark">Select Size</h3>
          <button onClick={onClose} className="text-gray-medium hover:text-dark">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-3">
          {sizes.map((size) => {
            const price = Math.round(basePrice * size.multiplier)
            const isSelected = size.name === currentSize

            return (
              <button
                key={size.name}
                onClick={() => onSelectSize(size.name, price)}
                className={`w-full p-4 rounded-lg border-2 transition ${
                  isSelected ? "border-red bg-red/10" : "border-gray-200 bg-white hover:border-red"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className={`font-bold ${isSelected ? "text-red" : "text-dark"}`}>{size.name}</p>
                    <p className="text-sm text-gray-medium">{size.description}</p>
                  </div>
                  <p className={`text-lg font-bold ${isSelected ? "text-red" : "text-gold"}`}>£ {price}</p>
                </div>
              </button>
            )
          })}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 border-2 border-gray-300 text-dark font-semibold py-2 rounded hover:bg-gray-100 transition"
        >
          CANCEL
        </button>
      </div>
    </div>
  )
}
