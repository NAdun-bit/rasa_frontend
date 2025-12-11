"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus } from "lucide-react"
import { useCart } from "../context/CartContext"
import SizeSelectionModal from "./SizeSelectionModal"

export default function FoodDetailModal({ item, onClose, onNavigate }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("Regular")
  const [selectedPrice, setSelectedPrice] = useState(item.price)
  const [showSizeModal, setShowSizeModal] = useState(false)
  const [selectedMainDish, setSelectedMainDish] = useState(item.name)
  const [selectedSideDish, setSelectedSideDish] = useState("")
  const [selectedAddOns, setSelectedAddOns] = useState([])
  const [productOptions, setProductOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProductOptions = async () => {
      if (!item.productId) return

      try {
        setLoading(true)
        const response = await fetch(`http://localhost:8090/api/v1/product/${item.productId}`)

        if (response.ok) {
          const data = await response.json()
          console.log("[v0] Fetched product data:", data)
          setProductOptions(data.productOptions || [])
        } else {
          console.error("[v0] Failed to fetch product options:", response.statusText)
        }
      } catch (error) {
        console.error("[v0] Error fetching product options:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProductOptions()
  }, [item.productId])

  const sideDishes = productOptions.filter((opt) =>
    ["side", "dish", "raita", "pickle"].some((keyword) => opt.option.toLowerCase().includes(keyword)),
  )

  const addOns = productOptions.filter((opt) =>
    ["add", "egg", "gravy", "papadum", "extra"].some((keyword) => opt.option.toLowerCase().includes(keyword)),
  )

  const displaySideDishes =
    sideDishes.length > 0
      ? sideDishes
      : [
          { option: "Vegetable Raita", price: 150 },
          { option: "Mango Pickle", price: 100 },
          { option: "Mixed Pickle", price: 100 },
        ]

  const displayAddOns =
    addOns.length > 0
      ? addOns
      : [
          // { option: "Extra Boiled Egg", price: 150 },
          // { option: "Spicy Gravy", price: 100 },
          // { option: "Chilipast", price: 50 },
        ]

  const handleAddOnToggle = (addon) => {
    setSelectedAddOns((prev) =>
      prev.find((a) => a.option === addon.option) ? prev.filter((a) => a.option !== addon.option) : [...prev, addon],
    )
  }

  const handleSizeChange = (newSize, newPrice) => {
    setSelectedSize(newSize)
    setSelectedPrice(newPrice)
    setShowSizeModal(false)
  }

  const calculateTotal = () => {
    let total = selectedPrice * quantity
    if (selectedSideDish) {
      const sideDish = displaySideDishes.find((d) => d.option === selectedSideDish)
      total += (sideDish?.price || 0) * quantity
    }
    selectedAddOns.forEach((addon) => {
      total += addon.price * quantity
    })
    return total
  }

  const handleAddToOrder = () => {
    const orderItem = {
      ...item,
      quantity,
      size: selectedSize,
      basePrice: selectedPrice,
      sideDish: selectedSideDish,
      addOns: selectedAddOns,
      totalPrice: calculateTotal(),
    }
    addToCart(orderItem)
    onClose()
    if (onNavigate) {
      onNavigate("cart")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-dark">MAKE IT YOURS</h2>
          <button onClick={onClose} className="text-gray-medium hover:text-dark p-1">
            <X size={24} />
          </button>
        </div>

        <div className="w-full">
          <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-64 object-cover" />
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-2xl font-bold text-dark mb-2">{item.name}</h3>
            <p className="text-gray-medium text-sm mb-2">{item.description}</p>

            <p className="text-red text-sm font-semibold mt-2">Nutrition & Allergen Information</p>
          </div>

          <div className="bg-cream p-4 rounded flex items-center justify-between">
            <div>
              <p className="text-gray-medium text-sm">{selectedSize} Meal</p>
              <p className="text-gold font-bold text-lg">£ {selectedPrice}</p>
            </div>
            <button
              onClick={() => setShowSizeModal(true)}
              className="text-red font-semibold hover:text-red/80 transition"
            >
              Change
            </button>
          </div>

          {showSizeModal && (
            <SizeSelectionModal
              currentSize={selectedSize}
              currentPrice={selectedPrice}
              basePrice={item.price}
              onSelectSize={handleSizeChange}
              onClose={() => setShowSizeModal(false)}
            />
          )}

          <div className="space-y-4">
            <h4 className="font-bold text-dark text-lg">SELECT OPTIONS & ORDER</h4>

            <div className="border-b pb-4">
              <p className="font-semibold text-dark mb-2">Main Dish: {selectedMainDish} 🍛</p>
              <p className="text-sm text-gray-medium cursor-pointer hover:text-red">Customise</p>
            </div>

            <div className="border-b pb-4">
              <p className="font-semibold text-dark mb-3">Side Dish: {selectedSideDish || "Select a side dish"} 🥘</p>
              <div className="space-y-2">
                {loading ? (
                  <p className="text-sm text-gray-medium">Loading options...</p>
                ) : displaySideDishes.length > 0 ? (
                  displaySideDishes.map((dish) => (
                    <div
                      key={dish.option}
                      onClick={() => setSelectedSideDish(dish.option)}
                      className={`p-2 rounded cursor-pointer transition ${
                        selectedSideDish === dish.option ? "bg-cream" : "hover:bg-gray-100"
                      }`}
                    >
                      <p className="font-medium text-dark">{dish.option}</p>
                      <p className="text-sm text-gray-medium">+£ {dish.price}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-medium">No side dishes available</p>
                )}
              </div>
            </div>

            <div>
              <p className="font-semibold text-dark mb-3">Add Ons</p>
              <div className="space-y-2">
                {displayAddOns.length > 0 ? (
                  displayAddOns.map((addon) => (
                    <label
                      key={addon.option}
                      className="flex items-center p-2 rounded hover:bg-gray-100 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAddOns.some((a) => a.option === addon.option)}
                        onChange={() => handleAddOnToggle(addon)}
                        className="w-4 h-4 mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-dark">{addon.option}</p>
                        <p className="text-sm text-gray-medium">+£ {addon.price}</p>
                      </div>
                    </label>
                  ))
                ) : (
                  <p className="text-sm text-gray-medium">No add-ons available</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-2 border-red text-red w-10 h-10 rounded flex items-center justify-center hover:bg-red/10"
              >
                <Minus size={18} />
              </button>
              <span className="text-2xl font-bold text-dark w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="border-2 border-red text-red w-10 h-10 rounded flex items-center justify-center hover:bg-red/10"
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={onClose}
                className="border-2 border-dark text-dark font-bold py-3 rounded hover:bg-gray-100 transition"
              >
                BACK TO MENU
              </button>
              <button
                onClick={handleAddToOrder}
                className="bg-red text-white font-bold py-3 rounded hover:bg-red/90 transition"
              >
                ADD TO MY ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
