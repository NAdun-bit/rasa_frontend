"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useCart } from "../context/CartContext"
import { useLocation } from "../context/LocationContext"
import { useDarkMode } from "../context/DarkModeContext"
import { useAuth } from "../context/AuthContext"
import { useOrder } from "../context/OrderContext"
import { useNavigate } from "react-router-dom"
import { useOrderDetails } from "../context/OrderDetailsContext"
import { ChevronRight, Lock, CreditCard, Wallet, Banknote } from "lucide-react"
import { orderApi } from "../services/orderApi" 

function Payment() {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const { cartItems, getTotalPrice, clearCart, orderType } = useCart()
  const { selectedLocation } = useLocation()
  const { userData, authToken } = useAuth()
  const { addOrder } = useOrder()
  const { orderDetails, clearOrderDetails } = useOrderDetails()

  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvc: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

 
  useEffect(() => {
    if (!authToken) {
      navigate("/login")
    }
  }, [authToken, navigate])

  const deliveryCharge = orderType === "delivery" ? 400 : 0
  const packingCharge = 0
  const subtotal = getTotalPrice()
  const total = subtotal + deliveryCharge + packingCharge

  const handleCardInputChange = (e) => {
    const { name, value } = e.target

    setCardData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateOrder = () => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    const userId = userData?.id || `USER-${authToken?.substring(0, 8)}`

    const order = {
      orderId,
      userId,
      items: cartItems,
      subtotal,
      deliveryCharge,
      packingCharge,
      total,
      orderType,
      location: selectedLocation,
      paymentMethod,
      status: "confirmed",
      timestamp: new Date().toISOString(),
      userName: userData?.name || "Guest",
      userEmail: userData?.email,
      userPhone: userData?.phoneNumber,
      deliveryAddress: userData?.address,
    }

    return order
  }

  const handlePaymentConfirm = async () => {
    if (paymentMethod === "card") {
      if (!cardData.cardNumber || cardData.cardNumber.length < 16) {
        alert("Card number must be 16 digits")
        return
      }
      if (!cardData.cardholderName) {
        alert("Please enter cardholder name")
        return
      }
      if (!cardData.expiryDate) {
        alert("Please select expiry date")
        return
      }
      if (!cardData.cvc || cardData.cvc.length !== 3) {
        alert("CVC must be 3 digits")
        return
      }
    }

    setIsProcessing(true)
    try {
      const frontendOrder = generateOrder()

      const phoneNumberString = String(orderDetails.mobile || "").trim()

      const backendOrderData = {
        customerId: userData?.id?.toString() || authToken?.substring(0, 8),
        orderItemsId: cartItems.map((item) => item.productId || item.id).join(","),
        phoneNumber: phoneNumberString, // Phone number is now stored as string in backend
        deliveryAddress: orderDetails.deliveryAddress || selectedLocation?.address || "Not specified",
        deliveryType: orderType === "delivery" ? "DELIVERY" : "PICKUP",
        paymentStatus: paymentMethod === "cash" ? "PENDING" : "COMPLETED",
        time: new Date(),
        totalPrice: total,
        deliveryStatus: "CONFIRMED",
      }

      console.log("[v0] Sending order to backend:", backendOrderData)
      console.log(
        "[v0] Phone number type:",
        typeof backendOrderData.phoneNumber,
        "Value:",
        backendOrderData.phoneNumber,
      )

      const createdOrder = await orderApi.createOrder(backendOrderData)
      console.log("[v0] Order created successfully:", createdOrder)

     
      addOrder(frontendOrder)

      
      const existingOrders = JSON.parse(localStorage.getItem("userOrders") || "[]")
      localStorage.setItem("userOrders", JSON.stringify([frontendOrder, ...existingOrders]))

      clearOrderDetails()

      setTimeout(() => {
        alert("Payment processed successfully! Your order has been placed.")
        clearCart()
        navigate("/")
      }, 1500)
    } catch (error) {
      console.error("[v0] Error processing payment:", error)
      alert(`Failed to process payment: ${error.message}. Please try again.`)
      setIsProcessing(false)
    }
  }

  const handleNavigate = (page) => {
    navigate(`/${page}`)
    window.scrollTo(0, 0)
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
            <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center font-bold">
              2
            </div>
            <span className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
              YOUR DETAILS
            </span>
          </div>

          <ChevronRight size={20} className={isDarkMode ? "text-gray-500" : "text-gray-400"} />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red text-white flex items-center justify-center font-bold">3</div>
            <span className="text-sm font-bold text-red">PAYMENT</span>
          </div>
        </div>

        <button
          onClick={() => handleNavigate("checkout")}
          className="text-red font-semibold hover:text-red/80 mb-6 flex items-center gap-1"
        >
          ← Back to Details
        </button>

        <h1
          className={`text-4xl font-bold mb-8 pb-2 border-b-4 border-red w-fit ${isDarkMode ? "text-gray-100" : "text-dark"}`}
        >
          PAYMENT
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            <div
              className={`${isDarkMode ? "bg-blue-900 bg-opacity-30" : "bg-blue-50"} p-8 rounded-lg text-center space-y-2`}
            >
              <h2 className="text-lg font-semibold text-blue-600">PAY £ . {total.toFixed(2)} TO</h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
                Raasa - {selectedLocation?.address} - Delivery
              </p>
            </div>

           
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg space-y-6`}>
              <h3 className={`text-lg font-bold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                SELECT PAYMENT METHOD
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-6 rounded-lg border-2 transition flex flex-col items-center gap-3 ${
                    paymentMethod === "card"
                      ? "border-red bg-red/5"
                      : isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <CreditCard size={32} className={paymentMethod === "card" ? "text-red" : "text-gray-400"} />
                  <span
                    className={`font-semibold ${paymentMethod === "card" ? "text-red" : isDarkMode ? "text-gray-100" : "text-dark"}`}
                  >
                    Card
                  </span>
                </button>

               
                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`p-6 rounded-lg border-2 transition flex flex-col items-center gap-3 ${
                    paymentMethod === "wallet"
                      ? "border-red bg-red/5"
                      : isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Wallet size={32} className={paymentMethod === "wallet" ? "text-red" : "text-gray-400"} />
                  <span
                    className={`font-semibold ${paymentMethod === "wallet" ? "text-red" : isDarkMode ? "text-gray-100" : "text-dark"}`}
                  >
                    Digital Wallet
                  </span>
                </button>

               
                <button
                  onClick={() => setPaymentMethod("cash")}
                  className={`p-6 rounded-lg border-2 transition flex flex-col items-center gap-3 ${
                    paymentMethod === "cash"
                      ? "border-red bg-red/5"
                      : isDarkMode
                        ? "border-gray-600 hover:border-gray-500"
                        : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <Banknote size={32} className={paymentMethod === "cash" ? "text-red" : "text-gray-400"} />
                  <span
                    className={`font-semibold ${paymentMethod === "cash" ? "text-red" : isDarkMode ? "text-gray-100" : "text-dark"}`}
                  >
                    Cash on Delivery
                  </span>
                </button>
              </div>

              
              {paymentMethod === "card" && (
                <div className="space-y-4 mt-6 pt-6 border-t border-gray-300">
                  
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={cardData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "") 
                        if (value.length <= 16) {
                          setCardData({ ...cardData, cardNumber: value })
                        }
                      }}
                      className={`w-full px-4 py-3 rounded border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-50 border-gray-300 text-dark"
                      } focus:outline-none focus:border-red`}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  
                  <div>
                    <label className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardholderName"
                      value={cardData.cardholderName}
                      onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                      className={`w-full px-4 py-3 rounded border ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-gray-100"
                          : "bg-gray-50 border-gray-300 text-dark"
                      } focus:outline-none focus:border-red`}
                      placeholder="Name on card"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                   
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}
                      >
                        Expiry Date
                      </label>
                      <input
                        type="month"
                        name="expiryDate"
                        onChange={(e) => {
                          const raw = e.target.value 
                          const [year, month] = raw.split("-")
                          const formatted = `${month}/${year.substring(2)}` 
                          setCardData({ ...cardData, expiryDate: formatted })
                        }}
                        className={`w-full px-4 py-3 rounded border ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-gray-50 border-gray-300 text-dark"
                        } focus:outline-none focus:border-red`}
                      />
                    </div>

                    
                    <div>
                      <label
                        className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}
                      >
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={cardData.cvc}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "")
                          if (value.length <= 3) {
                            setCardData({ ...cardData, cvc: value })
                          }
                        }}
                        className={`w-full px-4 py-3 rounded border ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-gray-50 border-gray-300 text-dark"
                        } focus:outline-none focus:border-red`}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              
              {paymentMethod === "wallet" && (
                <div className={`p-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} text-center py-8`}>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-medium"}>
                    Digital wallet payment integration will be available soon
                  </p>
                </div>
              )}

              
              {paymentMethod === "cash" && (
                <div className={`p-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-50"} text-center py-8`}>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-medium"}>
                    You can pay when your order arrives
                  </p>
                </div>
              )}
            </div>

           
            <div className="flex gap-4">
              <button
                onClick={() => handleNavigate("checkout")}
                className={`flex-1 px-6 py-4 rounded font-bold border-2 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-100 hover:bg-gray-700"
                    : "border-dark text-dark hover:bg-gray-100"
                } transition`}
              >
                BACK TO DETAILS
              </button>

              <button
                onClick={handlePaymentConfirm}
                disabled={isProcessing}
                className={`flex-1 px-6 py-4 rounded font-bold text-white transition ${
                  isProcessing ? "bg-gray-400 cursor-not-allowed" : "bg-red hover:bg-red/90"
                }`}
              >
                {isProcessing ? "PROCESSING..." : "PAY & CONFIRM"}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Lock size={16} />
              <span className="text-sm font-semibold">SECURE CHECKOUT</span>
            </div>
          </div>

         
          <div className="lg:col-span-1">
            <div
              className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg space-y-6 sticky top-6`}
            >
              <h3 className="text-xl font-bold text-red">Order Summary</h3>

              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.cartId} className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                    <div className="flex justify-between">
                      <span>{item.name}</span>
                      <span className={isDarkMode ? "text-gray-300" : "text-dark"}>
                        £ . {item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className={`space-y-3 border-b pb-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Sub total</span>
                  <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    £ . {subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Delivery Charge</span>
                  <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    £ . {deliveryCharge}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Packing Charge</span>
                  <span className={`font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    £ . {packingCharge.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`font-bold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>Total Amount</span>
                <span className="text-2xl font-bold text-red">£ . {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Payment
