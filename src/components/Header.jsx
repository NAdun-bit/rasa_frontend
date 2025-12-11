"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, MapPin, User, Menu, X, Moon, Sun, LogOut, Mail, MapPinIcon } from "lucide-react"
import { useCart } from "../context/CartContext"
import { useLocation } from "../context/LocationContext"
import { useDarkMode } from "../context/DarkModeContext"
import { useAuth } from "../context/AuthContext"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { cartItems } = useCart()
  const { selectedLocation, setShowLocationModal } = useLocation()
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const { isAuthenticated, logout, phoneNumber, userData } = useAuth()
  const navigate = useNavigate()

  const handleNavigate = (page) => {
    navigate(`/${page}`)
    setMobileMenuOpen(false)
    setProfileOpen(false)
    window.scrollTo(0, 0)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setMobileMenuOpen(false)
    setProfileOpen(false)
  }

  const displayName = userData?.name || phoneNumber || "ACCOUNT"

  return (
    <div className="w-full">
      <div className={`${isDarkMode ? "bg-gray-900 text-gray-100" : "bg-dark text-cream"} py-2 px-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Delivering to: {selectedLocation.address}</span>
          </div>
          <button
            onClick={() => setShowLocationModal(true)}
            className={`border px-3 py-1 text-xs font-semibold hover:bg-gray-medium transition-colors ${
              isDarkMode ? "border-gray-100" : "border-cream"
            }`}
          >
            CHANGE
          </button>
        </div>
      </div>

      <header
        className={`${
          isDarkMode ? "bg-gray-800 border-gray-700" : "bg-cream border-gray-light"
        } border-b transition-all duration-300 hover:shadow-lg`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button onClick={() => handleNavigate("")} className="flex items-center gap-2 cursor-pointer">
              <img src="/logo.png" alt="RAASA Logo" className="h-20 w-auto" />
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => handleNavigate("")}
                className={`font-medium hover:text-red transition-colors ${isDarkMode ? "text-gray-100" : "text-dark"}`}
              >
                HOME
              </button>
              <button
                onClick={() => handleNavigate("menu")}
                className={`font-medium border-b-2 border-red ${isDarkMode ? "text-gray-100" : "text-dark"}`}
              >
                OUR MENU
              </button>
              <button
                onClick={() => handleNavigate("big-deals")}
                className={`font-medium hover:text-red transition-colors ${isDarkMode ? "text-gray-100" : "text-dark"}`}
              >
                BIG DEALS
              </button>
              <a
                href="#"
                className={`font-medium hover:text-red transition-colors ${isDarkMode ? "text-gray-100" : "text-dark"}`}
              >
                FIND US
              </a>
              <button
                onClick={() => handleNavigate("about")}
                className={`font-medium hover:text-red transition-colors ${isDarkMode ? "text-gray-100" : "text-dark"}`}
              >
                ABOUT US
              </button>
              <button
                onClick={() => handleNavigate("order")}
                className="hidden sm:block bg-red text-white px-4 py-2 font-bold text-sm hover:bg-red/90 transition-colors"
              >
                ORDER NOW
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleDarkMode}
                className={`flex items-center justify-center p-2 rounded-lg transition-colors ${
                  isDarkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                title="Toggle dark mode"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <button
                onClick={() => setShowLocationModal(true)}
                className={`flex items-center gap-1 font-medium hover:text-red transition-colors ${
                  isDarkMode ? "text-gray-100" : "text-dark"
                }`}
              >
                <MapPin size={18} />
                <span className="hidden sm:inline text-sm">SELECT LOCATION</span>
              </button>

              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className={`flex items-center gap-1 font-medium hover:text-red transition-colors ${
                      isDarkMode ? "text-gray-100" : "text-dark"
                    }`}
                  >
                    <User size={18} />
                    <span className="hidden sm:inline text-sm">{displayName}</span>
                  </button>
                  {profileOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-72 rounded-lg shadow-2xl z-50 ${
                        isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"
                      }`}
                    >
                      {/* Profile Header */}
                      <div className={`px-4 py-4 border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              isDarkMode ? "bg-gray-600" : "bg-gray-200"
                            }`}
                          >
                            <User size={24} className={isDarkMode ? "text-gray-100" : "text-dark"} />
                          </div>
                          <div>
                            <p className={`font-bold text-sm ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                              {userData?.name || "Guest User"}
                            </p>
                            <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{phoneNumber}</p>
                          </div>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div className={`px-4 py-3 space-y-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-50"}`}>
                        {userData?.email && (
                          <div className="flex items-start gap-3">
                            <Mail
                              size={16}
                              className={`mt-1 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            />
                            <div className="min-w-0">
                              <p className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                EMAIL
                              </p>
                              <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                                {userData.email}
                              </p>
                            </div>
                          </div>
                        )}

                        {userData?.address && (
                          <div className="flex items-start gap-3">
                            <MapPinIcon
                              size={16}
                              className={`mt-1 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            />
                            <div className="min-w-0">
                              <p className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                ADDRESS
                              </p>
                              <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                                {userData.address}
                              </p>
                            </div>
                          </div>
                        )}

                        {userData?.location && (
                          <div className="flex items-start gap-3">
                            <MapPin
                              size={16}
                              className={`mt-1 flex-shrink-0 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
                            />
                            <div className="min-w-0">
                              <p className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                                CITY/TOWN
                              </p>
                              <p className={`text-sm break-all ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                                {userData.location}
                              </p>
                            </div>
                          </div>
                        )}

                        {!userData?.name && !userData?.email && !userData?.address && (
                          <p className={`text-sm text-center py-2 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                            No profile information yet
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div
                        className={`px-4 py-3 border-t space-y-2 ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
                      >
                        <button
                          onClick={() => handleNavigate("profile")}
                          className="w-full text-left px-3 py-2 text-sm font-medium text-red hover:bg-red/10 rounded transition-colors"
                        >
                          View Orders
                        </button>
                        <button
                          onClick={() => handleNavigate("login")}
                          className="w-full text-left px-3 py-2 text-sm font-medium text-red hover:bg-red/10 rounded transition-colors"
                        >
                          Edit Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red hover:bg-red/10 rounded transition-colors"
                        >
                          <LogOut size={16} />
                          LOGOUT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => handleNavigate("login")}
                  className={`flex items-center gap-1 font-medium hover:text-red transition-colors ${
                    isDarkMode ? "text-gray-100" : "text-dark"
                  }`}
                >
                  <User size={18} />
                  <span className="hidden sm:inline text-sm">SIGN IN</span>
                </button>
              )}

              <button
                onClick={() => handleNavigate("cart")}
                className="relative flex items-center hover:text-red transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </button>

              <button
                className={`md:hidden ${isDarkMode ? "text-gray-100" : "text-dark"}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <nav
              className={`md:hidden mt-4 py-4 border-t flex flex-col gap-3 ${
                isDarkMode ? "border-gray-700" : "border-gray-light"
              }`}
            >
              <button
                onClick={() => handleNavigate("")}
                className={`font-medium text-left hover:text-red transition-colors ${
                  isDarkMode ? "text-gray-100" : "text-dark"
                }`}
              >
                HOME
              </button>
              <button onClick={() => handleNavigate("menu")} className="font-medium text-left text-red">
                OUR MENU
              </button>
              <button
                onClick={() => handleNavigate("big-deals")}
                className={`font-medium text-left hover:text-red transition-colors ${
                  isDarkMode ? "text-gray-100" : "text-dark"
                }`}
              >
                BIG DEALS
              </button>
              <a
                href="#"
                className={`font-medium hover:text-red transition-colors ${isDarkMode ? "text-gray-100" : "text-dark"}`}
              >
                FIND US
              </a>
              <button
                onClick={() => handleNavigate("about")}
                className={`font-medium text-left hover:text-red transition-colors ${
                  isDarkMode ? "text-gray-100" : "text-dark"
                }`}
              >
                ABOUT US
              </button>
              <button
                onClick={() => handleNavigate("order")}
                className="w-full bg-red text-white px-4 py-2 font-bold text-sm hover:bg-red/90 transition-colors"
              >
                ORDER NOW
              </button>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="w-full text-red font-semibold hover:text-red/80 text-left">
                  LOGOUT
                </button>
              ) : (
                <button
                  onClick={() => handleNavigate("login")}
                  className="w-full text-red font-semibold hover:text-red/80 text-left"
                >
                  SIGN IN
                </button>
              )}
            </nav>
          )}
        </div>
      </header>
    </div>
  )
}
