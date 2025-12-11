"use client"
import { X } from "lucide-react"
import { useDarkMode } from "../context/DarkModeContext"

export default function PromotionalPopup({ isOpen, onClose, promotion = null }) {
  const { isDarkMode } = useDarkMode()

  // Default promotion if none provided
  const defaultPromotion = {
    title: "Welcome RAASA Express",
    date: "Continue your order to proceed.",
    description:
      "Just one click away from locking in your reservation. Continue to order.",
    details:
      "Continue your order to secure your spot today!",
    buttonText: "CONTINUE TO ORDER",
    image: "https://i.postimg.cc/L59TqW4Y/woman-holding-we-are-open-sign.jpg",
    logoImage: "https://i.postimg.cc/gJW3M6z9/logo-(2).png",
  }

  const currentPromo = promotion || defaultPromotion

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div
        className={`relative max-w-2xl w-full rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 ${
          isDarkMode ? "bg-gray-900" : "bg-white"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="relative h-96 md:h-auto overflow-hidden bg-gray-900">
            {currentPromo.logoImage && (
              <div className="absolute top-6 left-6 z-10">
                <img src={currentPromo.logoImage || "/placeholder.svg"} alt="Logo" className="h-12 w-auto opacity-80" />
              </div>
            )}
            <img
              src={currentPromo.image || "/placeholder.svg"}
              alt={currentPromo.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {currentPromo.date && (
              <div className="absolute bottom-0 left-0 right-0 bg-red text-white p-3 text-center font-bold text-sm">
                {currentPromo.date}
              </div>
            )}
          </div>

          {/* Right Side - Text Content */}
          <div
            className={`p-8 md:p-12 flex flex-col justify-between ${
              isDarkMode ? "bg-gray-800 text-white" : "bg-white text-dark"
            }`}
          >
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{currentPromo.title}</h2>

              <p className={`text-sm text-center mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                {currentPromo.date}
              </p>

              <p className="text-center mb-6 leading-relaxed font-semibold">{currentPromo.description}</p>

              <p className={`text-center text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {currentPromo.details}
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={onClose}
              className="w-full mt-6 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded transition-all transform hover:scale-105"
            >
              {currentPromo.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
