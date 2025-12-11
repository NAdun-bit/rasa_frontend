"use client"

import { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Trash2 } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useLocation } from "../context/LocationContext"
import { useDarkMode } from "../context/DarkModeContext"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function CartPage() {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const { cartItems, removeFromCart, setOrderTypeValue, orderType } = useCart()
  const { selectedLocation, setShowLocationModal } = useLocation()
  const { isAuthenticated } = useAuth()
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const deliveryCharge = 400
  const packingCharge = 0

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0)
  }

  const subtotal = calculateSubtotal()
  const [serviceType, setServiceType] = useState(orderType || "takeaway")
  const total = serviceType === "delivery" ? subtotal + deliveryCharge + packingCharge : subtotal + packingCharge

  const handleServiceTypeChange = (type) => {
    setServiceType(type)
    setOrderTypeValue(type)
  }

  const handleNavigate = (page) => {
    navigate(`/${page}`)
    window.scrollTo(0, 0)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }
    handleNavigate("checkout")
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header />

      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-lg p-8 max-w-md w-full text-center`}>
            <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>Login Required</h2>
            <p className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
              You must be logged in to proceed with your order. Please sign in to continue.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className={`flex-1 px-4 py-2 rounded font-semibold border transition ${
                  isDarkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                    : "border-gray-300 text-dark hover:bg-gray-100"
                }`}
              >
                Continue Shopping
              </button>
              <button
                onClick={() => {
                  setShowLoginPrompt(false)
                  handleNavigate("login")
                }}
                className="flex-1 px-4 py-2 bg-red text-white rounded font-semibold hover:bg-red/90 transition"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleNavigate("menu")}
              className="text-red font-semibold hover:text-red/80 flex items-center gap-2"
            >
              ← Back to Menu
            </button>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red text-white flex items-center justify-center font-bold">1</div>
              <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>YOUR ORDER</span>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-white"
              }`}
            >
              2
            </div>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>YOUR DETAILS</span>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-white"
              }`}
            >
              3
            </div>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>PAYMENT</span>
          </div>
        </div>

        <h1 className={`text-4xl font-bold mb-8 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>YOUR ORDER</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg text-center`}>
                <p className={`${isDarkMode ? "text-gray-400" : "text-gray-medium"} text-lg`}>Your cart is empty</p>
                <button
                  onClick={() => handleNavigate("menu")}
                  className="mt-4 bg-red text-white px-6 py-2 rounded font-semibold hover:bg-red/90"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartId} className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg`}>
                  <div className="flex gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className={`font-bold text-lg ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                            {item.name}
                          </h3>
                          {item.sideDish && (
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                              Side: {item.sideDish}
                            </p>
                          )}
                          {item.addOns.length > 0 && (
                            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                              Add-ons: {item.addOns.map((a) => a.name).join(", ")}
                            </p>
                          )}
                        </div>
                        <button onClick={() => removeFromCart(item.cartId)} className="text-red hover:text-red/80">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-red font-bold">£ . {item.totalPrice}</p>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {cartItems.length > 0 && (
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg space-y-4`}>
                <h3 className={`font-bold text-lg ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                  SELECT SERVICE TYPE
                </h3>

                {serviceType === "delivery" && (
                  <div
                    className={`p-4 rounded border-l-4 border-red space-y-2 mb-4 ${
                      isDarkMode ? "bg-gray-700" : "bg-cream"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className={`text-xs uppercase font-semibold mb-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-medium"
                          }`}
                        >
                          Delivery To
                        </p>
                        <p className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                          {selectedLocation.address}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowLocationModal(true)}
                        className="text-red hover:text-red/80 font-semibold text-sm underline"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                )}

                <label
                  className={`flex items-center p-4 rounded border-2 cursor-pointer transition ${
                    serviceType === "takeaway"
                      ? "border-red bg-red/5"
                      : isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    checked={serviceType === "takeaway"}
                    onChange={() => handleServiceTypeChange("takeaway")}
                    className="mr-4 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                      Take Away / Collection
                    </p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>10:00 - 23:45</p>
                  </div>
                </label>

                <label
                  className={`flex items-center p-4 rounded border-2 cursor-pointer transition ${
                    serviceType === "delivery"
                      ? "border-red bg-red/5"
                      : isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    checked={serviceType === "delivery"}
                    onChange={() => handleServiceTypeChange("delivery")}
                    className="mr-4 w-5 h-5 cursor-pointer"
                  />
                  <div className="flex-1">
                    <p className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>Home Delivery</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>30-45 mins</p>
                  </div>
                </label>
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg space-y-6`}>
                <h3 className="text-xl font-bold text-red">Order Summary</h3>

                <div className={`space-y-3 border-b pb-4 ${isDarkMode ? "border-gray-700" : ""}`}>
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Sub total</span>
                    <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                      £ . {subtotal.toFixed(2)}
                    </span>
                  </div>
                  {serviceType === "delivery" && (
                    <div className="flex justify-between">
                      <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Delivery Charge</span>
                      <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                        £ . {deliveryCharge}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Packing Charge</span>
                    <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                      £ . {packingCharge}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className={`font-bold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>Total Amount</span>
                  <span className="text-2xl font-bold text-red">£ . {total.toFixed(2)}</span>
                </div>

                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                  Review your order before checkout.
                </p>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-red text-white font-bold py-4 rounded hover:bg-red/90 transition"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
