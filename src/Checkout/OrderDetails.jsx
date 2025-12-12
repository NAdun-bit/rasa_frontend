"use client"

import React, { useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import { useLocation } from "../context/LocationContext"
import { useDarkMode } from "../context/DarkModeContext"
import { useAuth } from "../context/AuthContext"
import { useOrderDetails } from "../context/OrderDetailsContext"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"

export default function OrderDetails() {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const { cartItems, getTotalPrice, orderType } = useCart()
  const { selectedLocation } = useLocation()
  const { isAuthenticated } = useAuth()
  const { updateOrderDetails } = useOrderDetails()

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    }
  }, [isAuthenticated, navigate])

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    deliveryAddress: "",
    agreeToTerms: false,
  })

  const [errors, setErrors] = useState({})

  const deliveryCharge = orderType === "delivery" ? 400 : 0
  const packingCharge = 0
  const subtotal = getTotalPrice()
  const total = subtotal + deliveryCharge + packingCharge

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    let processedValue = type === "checkbox" ? checked : value

    if (name === "mobile") {
      processedValue = value.replace(/\D/g, "").slice(0, 10) 
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }))

    
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validatePhoneNumber = (phone) => {
    const phoneString = String(phone).trim()
    if (!phoneString) return "Phone number is required"
    if (phoneString.length < 9) return "Phone number must be at least 9 digits"
    if (phoneString.length > 10) return "Phone number must not exceed 10 digits"
    if (!/^\d+$/.test(phoneString)) return "Phone number must contain only digits"
    return ""
  }

  const handleProceedToPayment = () => {
    const newErrors = {}

    
    if (!formData.firstName?.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName?.trim()) newErrors.lastName = "Last name is required"

    const phoneError = validatePhoneNumber(formData.mobile)
    if (phoneError) newErrors.mobile = phoneError

    if (!formData.email?.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.deliveryAddress?.trim()) newErrors.deliveryAddress = "Delivery address is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to terms"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    updateOrderDetails(formData)
    navigate("/payment")
  }

  const handleNavigate = (page) => {
    navigate(`/${page}`)
    window.scrollTo(0, 0)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
              1
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
              YOUR ORDER
            </span>
          </div>

          <ChevronRight size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red text-white flex items-center justify-center font-bold">2</div>
            <span className="text-sm font-bold text-red">YOUR DETAILS</span>
          </div>

          <ChevronRight size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />

          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-300 text-gray-medium"
              }`}
            >
              3
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>PAYMENT</span>
          </div>
        </div>

        <button
          onClick={() => handleNavigate("cart")}
          className="text-red font-semibold hover:text-red/80 mb-6 flex items-center gap-1"
        >
          ← Back to Basket
        </button>

        <h1
          className={`text-4xl font-bold mb-8 pb-2 border-b-4 border-red w-fit ${
            isDarkMode ? "text-gray-100" : "text-dark"
          }`}
        >
          YOUR DETAILS
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg space-y-6`}>
              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                  First name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-dark"
                  } ${errors.firstName ? "border-red" : ""} focus:outline-none focus:border-red`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red text-xs mt-1">{errors.firstName}</p>}
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                  Last name <span className="text-red">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-dark"
                  } ${errors.lastName ? "border-red" : ""} focus:outline-none focus:border-red`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red text-xs mt-1">{errors.lastName}</p>}
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                  Mobile number <span className="text-red">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    className={`px-3 py-3 rounded border ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-dark"
                    } focus:outline-none`}
                  >
                    <option>LK +94</option>
                  </select>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`flex-1 px-4 py-3 rounded border ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-dark"
                    } ${errors.mobile ? "border-red" : ""} focus:outline-none focus:border-red`}
                    placeholder="77 123 4567"
                  />
                </div>
                {errors.mobile && <p className="text-red text-xs mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                  Email <span className="text-red">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded border ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-dark"
                  } ${errors.email ? "border-red" : ""} focus:outline-none focus:border-red`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                  Delivery Address <span className="text-red">*</span>
                </label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded border h-24 ${
                    isDarkMode ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border-gray-300 text-dark"
                  } ${errors.deliveryAddress ? "border-red" : ""} focus:outline-none focus:border-red`}
                  placeholder="Enter your delivery address"
                />
                {errors.deliveryAddress && <p className="text-red text-xs mt-1">{errors.deliveryAddress}</p>}
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 mt-1 rounded cursor-pointer"
                />
                <label htmlFor="terms" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
                  By ticking this box I agree to the{" "}
                  <a href="#" className="text-red hover:underline font-semibold">
                    Raasa Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-red hover:underline font-semibold">
                    Terms & Conditions
                  </a>
                </label>
                {errors.agreeToTerms && <p className="text-red text-xs">{errors.agreeToTerms}</p>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div
              className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg space-y-6 sticky top-6`}
            >
              <h3 className="text-xl font-bold text-red">Order Summary</h3>

              <div className={`space-y-2 pb-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                  {orderType === "delivery" ? "DELIVERY TO" : "COLLECT FROM"}
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-dark"}`}>{selectedLocation?.address}</p>
              </div>

              <div className={`space-y-3 border-b pb-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Sub total</span>
                  <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    £ . {subtotal.toFixed(2)}
                  </span>
                </div>
                {orderType === "delivery" && (
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
                    £ . {packingCharge.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`font-bold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>Total Amount</span>
                <span className="text-2xl font-bold text-red">Rs. {total.toFixed(2)}</span>
              </div>

              <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                Review your order before checkout.
              </p>

              <button
                onClick={handleProceedToPayment}
                className="w-full bg-red text-white font-bold py-4 rounded hover:bg-red/90 transition"
              >
                PROCEED TO PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
