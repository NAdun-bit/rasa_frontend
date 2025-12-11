"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FoodDetailModal from "../components/FoodDetailModal"
import { ShoppingCart, Zap, Clock, TrendingDown } from "lucide-react"
import { useDarkMode } from "../context/DarkModeContext"
import { productApi } from "../services/productApi"

export default function BigDeals({ onNavigate }) {
  const { isDarkMode } = useDarkMode()
  const [selectedItem, setSelectedItem] = useState(null)
  const [visibleItems, setVisibleItems] = useState([])
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true)
        const products = await productApi.getAllProducts()
        console.log("[v0] Fetched products for deals:", products?.length)

        if (!products || products.length === 0) {
          console.log("[v0] No products available for deals")
          setDeals([])
          setError("No special deals available")
          setLoading(false)
          return
        }

        const promotedProducts = products.filter((product) => product.productPromotion === true)
        console.log("[v0] Filtered promoted products:", promotedProducts.length)

        if (promotedProducts.length === 0) {
          setDeals([])
          setError("No promotional deals available at the moment")
          setLoading(false)
          return
        }

        const transformedDeals = promotedProducts.map((product, index) => {
          const price = Number(product.productPrice) || 0
          const discount = Number(product.productDiscount) || 0
          const savings = Math.round(price * 0.15)

          return {
            id: product.productId,
            productId: product.productId,
            name: product.productName,
            description: product.productDescription,
            price: price,
            originalPrice: price * 1.15,
            savings: `£.${savings}`,
            badge: "🔥 SPECIAL DEAL",
            image: product.productImg1 || product.productImg2 || product.productImg3 || "/special-offer-banner.png",
            timer: `${2 + (index % 3)}:${45 - (index % 3) * 15}:30`,
            discount: discount > 0 ? discount : 15 + (index % 3) * 5,
            type: product.productVegType ? "vegetarian" : "non-vegetarian",
            productVegType: product.productVegType,
          }
        })

        console.log("[v0] Total deals created:", transformedDeals.length)
        setDeals(transformedDeals)
        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching deals:", err)
        setError("Failed to load deals. Make sure backend is running.")
        setDeals([])
      } finally {
        setLoading(false)
      }
    }

    fetchDeals()
  }, [])

  useEffect(() => {
    deals.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index])
      }, index * 150)
    })
  }, [deals])

  const addToCart = (item) => {
    setSelectedItem(item)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
        <Header onNavigate={onNavigate} />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Loading deals...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header onNavigate={onNavigate} />

      <section className="bg-gradient-to-r from-red to-red/80 text-cream py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3 animate-pulse">
                <Zap size={24} className="text-gold" />
                <span className="text-gold font-bold">FLASH DEALS</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Special OFFERS</h1>
              <p className="text-lg mb-6">AUTHENTIC INDIAN FLAVORS DELIVERED TO YOUR DOOR</p>
              <button
                onClick={() => onNavigate("menu")}
                className="bg-gold text-dark px-6 py-3 font-bold hover:bg-gold/90 transition-all hover:scale-105"
              >
                ORDER NOW
              </button>
            </div>
            <div className="hidden md:block overflow-hidden rounded-lg">
              <img
                src="https://i.postimg.cc/ZK9XKYNL/Black-White-Minimalist-Business-Logo.png"
                alt="Big deals"
                className="rounded-lg hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center bg-gradient-to-r from-red to-red/80 text-cream p-8 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">HOUSE SPECIAL</h2>
              <h3 className="text-2xl font-bold mb-2">Crispy Juicy Fried Chicken</h3>
              <p className="text-lg mb-4">4 pieces of our signature tandoori fried chicken</p>
              <p className="text-3xl font-bold mb-6">ONLY £.2500</p>
              <button
                onClick={() => onNavigate("menu")}
                className="bg-white text-red px-6 py-3 font-bold hover:bg-gray-light transition-all hover:scale-105"
              >
                ORDER NOW
              </button>
            </div>
            <div className="hidden md:block overflow-hidden rounded-lg">
              <img
                src="https://i.postimg.cc/HkPP5qCZ/chicken-kebab-with-sauce-fried-eggplant-onion-round-plate.jpg"
                alt="House special chicken"
                className="rounded-lg hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 md:py-20 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 text-center ${isDarkMode ? "text-gray-100" : "text-dark"}`}
          >
            DEALS AT RAASA EXPRESS
          </h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
            ORDER FOR COLLECTION OR PICK-UP AT RAASA
          </p>

          <div className="relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10 blur-sm rounded-lg"
              style={{
                backgroundImage: "url('https://i.postimg.cc/m226fWVW/photo-1-2025-11-11-10-33-00.jpg')",
              }}
            />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {error ? (
                <div className={`col-span-3 text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                  <p className="text-lg font-semibold">{error}</p>
                </div>
              ) : deals.length > 0 ? (
                deals.map((deal, index) => (
                  <div
                    key={deal.id}
                    className={`transform transition-all duration-500 ${
                      visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div
                      className={`${
                        isDarkMode ? "bg-gray-700" : "bg-white"
                      } rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col`}
                    >
                      <div className="relative">
                        <img
                          src={deal.image || "/special-offer-banner.png"}
                          alt={deal.name}
                          className="w-full h-48 object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-red text-cream px-3 py-1 text-xs font-bold rounded-full">
                          {deal.badge}
                        </span>
                        <div className="absolute top-3 right-3 bg-gold text-dark px-3 py-1 rounded-full font-bold text-sm">
                          -{deal.discount}%
                        </div>
                        <div className="absolute bottom-3 left-3 bg-dark/80 text-cream px-3 py-2 rounded flex items-center gap-1 text-xs font-bold">
                          <Clock size={14} />
                          {deal.timer}
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                          {deal.name}
                        </h3>
                        <p className={`text-sm mb-3 flex-1 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                          {deal.description}
                        </p>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl font-bold text-red">£.{deal.price.toFixed(2)}</span>
                            <span
                              className={`text-sm line-through ${isDarkMode ? "text-gray-500" : "text-gray-medium"}`}
                            >
                              £.{deal.originalPrice.toFixed(2)}
                            </span>
                          </div>
                          <span className="text-xs text-red font-semibold flex items-center gap-1">
                            <TrendingDown size={14} />
                            {deal.savings}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(deal)}
                          className="w-full bg-red text-white py-2 font-bold hover:bg-red/90 flex items-center justify-center gap-2 rounded transition-all duration-300 hover:scale-105"
                        >
                          <ShoppingCart size={18} />
                          ORDER NOW
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`col-span-3 text-center py-8 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                  <p className="text-lg font-semibold">No deals available at the moment</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 md:py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-light"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className={`text-3xl md:text-4xl font-bold mb-12 text-center ${isDarkMode ? "text-gray-100" : "text-dark"}`}
          >
            HOT FOOD, NO WAITING
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://i.postimg.cc/W49FYKNM/photo-4-2025-11-11-10-33-00.jpg"
                alt="Delivery"
                className="rounded-lg hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                DELIVERED TO YOUR DOOR
              </h3>
              <p className={`text-lg mb-6 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                Enjoy authentic Indian cuisine in the comfort of your home. Fast delivery guaranteed within 30 minutes
                or less.
              </p>
              <button
                onClick={() => onNavigate("cart")}
                className="bg-red text-white px-6 py-3 font-bold hover:bg-red/90 transition-all hover:scale-105"
              >
                ORDER DELIVERY NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <FoodDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onNavigate={onNavigate} />
      )}

      <Footer />
    </div>
  )
}
