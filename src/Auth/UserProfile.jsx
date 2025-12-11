"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useAuth } from "../context/AuthContext"
import { useOrder } from "../context/OrderContext"
import { useDarkMode } from "../context/DarkModeContext"
import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService"
import { ChevronLeft, Calendar, MapPin, Truck, Clock } from "lucide-react"

export default function UserProfile() {
  const navigate = useNavigate()
  const { isDarkMode } = useDarkMode()
  const { isAuthenticated, userData, authToken, phoneNumber, userId } = useAuth() // Added userId from context
  const { orders, loading } = useOrder() // Use OrderContext instead of localStorage
  const [profileData, setProfileData] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileError, setProfileError] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }

    const fetchUserProfile = async () => {
      try {
        setProfileLoading(true)
        const profile = await authService.getCurrentUserProfile()
        console.log("[v0] Profile fetched successfully:", profile)
        setProfileData(profile)
        setProfileError(null)
      } catch (error) {
        console.error("[v0] Error fetching profile:", error.message)
        setProfileError(null)
        setProfileData(userData)
      } finally {
        setProfileLoading(false)
      }
    }

    fetchUserProfile()
  }, [isAuthenticated, navigate, userData])

  const handleNavigate = (page) => {
    navigate(`/${page}`)
    window.scrollTo(0, 0)
  }

  const displayProfile = profileData || userData || {} // Prefer profileData, fallback to userData

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => handleNavigate("")}
          className="flex items-center gap-2 text-red font-semibold hover:text-red/80 mb-6"
        >
          <ChevronLeft size={20} />
          Back to Home
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* User Profile Section */}
          <div className={`lg:col-span-1 ${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow-lg h-fit`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>MY PROFILE</h2>

            {profileLoading ? (
              <p className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Loading profile...</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>NAME</p>
                  <p className={`text-lg ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    {displayProfile?.name || "Not Set"}
                  </p>
                </div>

                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>EMAIL</p>
                  <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    {displayProfile?.email || "Not Set"}
                  </p>
                </div>

                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>PHONE</p>
                  <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    {phoneNumber || "Not Set"}
                  </p>
                </div>

                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>ADDRESS</p>
                  <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    {displayProfile?.address || "Not Set"}
                  </p>
                </div>

                <div>
                  <p className={`text-sm font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>LOCATION</p>
                  <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                    {displayProfile?.location || "Not Set"}
                  </p>
                </div>

                <button
                  onClick={() => handleNavigate("login")}
                  className="w-full mt-6 bg-red text-white font-bold py-3 rounded hover:bg-red/90 transition"
                >
                  EDIT PROFILE
                </button>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>ORDER HISTORY</h2>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {orders.length} order{orders.length !== 1 ? "s" : ""}
              </p>
            </div>

            {loading ? (
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg text-center`}>
                <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-12 rounded-lg text-center`}>
                <p className={`text-lg font-semibold mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  No orders yet
                </p>
                <p className={`text-sm mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Start placing orders to see them here
                </p>
                <button
                  onClick={() => handleNavigate("order")}
                  className="inline-block bg-red text-white font-bold py-2 px-6 rounded hover:bg-red/90 transition"
                >
                  PLACE ORDER
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.orderId || order.id}
                    className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-6 rounded-lg shadow border-l-4 border-red`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                      {/* Order ID */}
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Order ID
                        </p>
                        <p className={`text-sm font-bold text-red`}>{order.orderId || order.id}</p>
                      </div>

                      {/* User ID */}
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          User ID
                        </p>
                        <p className={`text-sm font-mono ${isDarkMode ? "text-gray-300" : "text-dark"}`}>
                          {order.userId || order.customerId || "N/A"}
                        </p>
                      </div>

                      {/* Order Date */}
                      <div className="flex items-start gap-2">
                        <Calendar size={16} className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                        <div>
                          <p
                            className={`text-xs font-semibold uppercase ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Date
                          </p>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-dark"}`}>
                            {new Date(order.timestamp || order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Order Type */}
                      <div className="flex items-start gap-2">
                        {order.deliveryType === "delivery" || order.orderType === "delivery" ? (
                          <Truck size={16} className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                        ) : (
                          <Clock size={16} className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                        )}
                        <div>
                          <p
                            className={`text-xs font-semibold uppercase ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Type
                          </p>
                          <p className={`text-sm capitalize ${isDarkMode ? "text-gray-300" : "text-dark"}`}>
                            {order.deliveryType || order.orderType || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className={`mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`} />
                        <div>
                          <p
                            className={`text-xs font-semibold uppercase ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                          >
                            Location
                          </p>
                          <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-dark"}`}>
                            {order.location?.address || order.deliveryAddress || "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <p
                          className={`text-xs font-semibold uppercase ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          Status
                        </p>
                        <p className="text-sm">
                          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {order.status || "PENDING"}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className={`border-t pt-4 ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
                      <p className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        ITEMS ({order.items?.length || order.orderItems?.length || 0})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {(order.items || order.orderItems || []).map((item, idx) => (
                          <div key={idx} className={`text-sm ${isDarkMode ? "text-gray-300" : "text-dark"}`}>
                            <span className="font-semibold">{item.name || item.itemName}</span>
                            <span className={`ml-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                              x{item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Total */}
                    <div
                      className={`border-t mt-4 pt-4 flex justify-between items-center ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
                    >
                      <div>
                        <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Total Amount</p>
                        <p className="text-2xl font-bold text-red">
                          £ {(order.total || order.totalAmount || 0).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>Payment Method</p>
                        <p className={`text-sm capitalize font-semibold ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                          {order.paymentMethod || "Card"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
