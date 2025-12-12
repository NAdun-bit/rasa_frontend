"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import PromotionalPopup from "../components/PromotionalPopup"
import PeopleAndSpace from "../components/PeopleAndSpace"
import InstagramSection from "../components/InstagramSection"
import { ShoppingCart, Flame, Truck, Trophy, ChevronLeft, ChevronRight, Heart, Star } from "lucide-react"
import { useDarkMode } from "../context/DarkModeContext"
import { useCart } from "../context/CartContext"
import { productApi } from "../services/productApi"

const menuCategories = [
  {
    id: 1,
    name: "Biryani",
    description: "Classic rice dish",
    image: "https://i.postimg.cc/DZfW2NhR/top-view-pakistan-meal-assortment.jpg",
    route: "biryani",
  },
  {
    id: 2,
    name: "Curries",
    description: "Aromatic curries",
    image: "https://i.postimg.cc/hGGBhpk9/high-angle-pakistan-food-with-rice.jpg",
    route: "curries",
  },
  {
    id: 3,
    name: "Tandoori Special",
    description: "Tandoori delights",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=250&fit=crop",
    route: "tandoori",
  },
  {
    id: 4,
    name: "Family Meals",
    description: "Complete family packages",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=250&fit=crop",
    route: "family",
  },
  {
    id: 5,
    name: "Rice & Breads",
    description: "Sides and breads",
    image: "https://i.postimg.cc/rw1m5nZf/helen-van-8ct-LZd-T67-I-unsplash.jpg",
    route: "rice-breads",
  },
]

const featureItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    category: "MAINS",
    description: "Tender chicken cooked with fragrant basmati rice and aromatic spices for a flavorful, hearty meal.",
    price: 20,
    badge: "POPULAR",
    image: "https://i.postimg.cc/DZfW2NhR/top-view-pakistan-meal-assortment.jpg",
  },
  {
    id: 2,
    name: "Mutton Biriyani",
    category: "STARTERS",
    description: "Tender mutton cooked with basmati rice and rich spices, delivering a hearty and flavorful classic.",
    price: 25,
    badge: "POPULAR",
    image: "https://i.postimg.cc/0Qm81dKJ/side-view-pilaf-with-stewed-beef-meat-plate.jpg",
  },
  {
    id: 3,
    name: "Masala Chicken Wings",
    category: "MAINS",
    description: "Juicy chicken wings coated in Indian spices and grilled for a smoky finish.",
    price: 7.95,
    badge: "SPICE",
    image: "https://i.postimg.cc/tR2cCndp/high-angle-shot-delicious-hot-spicy-dish-called-drums-heaven-table-(1).jpg",
  },
  {
    id: 4,
    name: "Chicken Fried Rice",
    category: "MAINS",
    description:
      "Fragrant rice stir-fried with tender chicken, fresh vegetables, and savory seasonings for a flavorful meal.",
    price: 23,
    badge: "PREMIUM",
    image: "https://i.postimg.cc/gJMKd89Y/fresh-vegetarian-risotto-with-peppers-parsley-generated-by-ai.jpg",
  },
]

const heroVideos = [
  { id: 1, type: "video", url: "/video-1.mp4", title: "Authentic Flavors" },
  { id: 2, type: "video", url: "/video-2.mp4", title: "Fresh Ingredients" },
  { id: 3, type: "video", url: "/video-3.mp4", title: "Expert Cooking" },
  { id: 4, type: "video", url: "/video-4.mp4", title: "Food Preparation" },
]

export default function Landing() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [bigDeals, setBigDeals] = useState([])
  const [loadingDeals, setLoadingDeals] = useState(true)
  const [errorDeals, setErrorDeals] = useState(null)
  const [showPromotionalPopup, setShowPromotionalPopup] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev === heroVideos.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPreviousVideo = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? heroVideos.length - 1 : prev - 1))
  }

  const goToNextVideo = () => {
    setCurrentVideoIndex((prev) => (prev === heroVideos.length - 1 ? 0 : prev + 1))
  }

  const handleNavigate = (path) => {
    navigate(`/${path}`)
    window.scrollTo(0, 0)
  }

  const handleAddToBag = (item) => {
    addToCart(item)
    handleNavigate("menu")
  }

  useEffect(() => {
    const fetchBigDeals = async () => {
      try {
        setLoadingDeals(true)
        setErrorDeals(null)

        const allProducts = await productApi.getAllProducts()
        console.log("[v0] All products fetched:", allProducts.length)

        const promotionalProducts = allProducts.filter((product) => product.productPromotion === true)
        console.log("[v0] Promotional products found:", promotionalProducts.length)

        const topDeals = promotionalProducts.slice(0, 3)
        console.log("[v0] Top 3 deals selected for display")

        setBigDeals(topDeals)
      } catch (error) {
        console.error("[v0] Error fetching big deals:", error.message)
        setErrorDeals("Failed to load deals. Showing default offers.")
        setBigDeals([])
      } finally {
        setLoadingDeals(false)
      }
    }

    fetchBigDeals()
  }, [])

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header />
      <PromotionalPopup isOpen={showPromotionalPopup} onClose={() => setShowPromotionalPopup(false)} />

      <section className="relative w-full h-screen overflow-hidden">
        {heroVideos.map((video, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentVideoIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <video
              src={video.url}
              alt={video.title}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-start">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-md">
              <p
                className={`text-gold font-semibold mb-2 animate-in fade-in-50 slide-in-from-left duration-700 delay-100 ${
                  isDarkMode ? "text-yellow-400" : ""
                }`}
              >
                LET'S ORDER FOR PICK-UP OR DELIVERY
              </p>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white animate-in fade-in-50 slide-in-from-left duration-700 delay-200">
                Welcome to RAASA Express
              </h1>
              <p
                className={`text-lg mb-6 animate-in fade-in-50 slide-in-from-left duration-700 delay-300 ${
                  isDarkMode ? "text-gray-200" : "text-cream"
                }`}
              >
                Modern Indian dining in London Locksbottom, where tradition meets bold creativity.
              </p>
              <button
                onClick={() => handleNavigate("order")}
                className={`px-6 py-3 font-bold transition transform hover:scale-105 animate-in fade-in-50 slide-in-from-left duration-700 delay-500 ${
                  isDarkMode ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-gold text-dark hover:bg-gold/90"
                }`}
              >
                ORDER NOW
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={goToPreviousVideo}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-10 transform hover:scale-110"
          aria-label="Previous video"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={goToNextVideo}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition z-10 transform hover:scale-110"
          aria-label="Next video"
        >
          <ChevronRight size={28} />
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroVideos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentVideoIndex(idx)}
              className={`w-3 h-3 rounded-full transition transform hover:scale-125 ${
                idx === currentVideoIndex ? "bg-gold" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to video ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      <section className={`py-12 md:py-20 ${isDarkMode ? "bg-gray-900" : "bg-cream"}`} data-animate>
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 ${
              isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-dark"
            }`}
          >
            <div className="bg-red p-8 md:p-12 flex flex-col justify-center transform transition-all hover:scale-105">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                PREMIUM CATERING SERVICE
                <br />
                YOUR EVENT
                <br />
                OUR FLAVORS
              </h2>
              <p className="text-white/90 text-sm md:text-base mb-8 max-w-xs">
                Indulge in our signature spiced dishes carefully crafted for your taste buds
              </p>
              <button
                onClick={() => handleNavigate("menu")}
                className={`px-6 py-3 font-bold text-sm md:text-base w-fit transition transform hover:scale-105 ${
                  isDarkMode
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                    : "bg-yellow-500 text-black hover:bg-yellow-400"
                }`}
              >
                BOOK CATERING
              </button>
            </div>
            <div className="relative bg-gray-900 overflow-hidden group">
              <img
                src="https://i.postimg.cc/3wzzzmjc/sliced-fruits-are-layered-stand.jpg"
                alt="Spice Sensation Meal"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute top-6 right-6">
                <span
                  className={`px-4 py-2 text-xs font-bold rounded-full animate-pulse ${
                    isDarkMode ? "bg-yellow-400 text-gray-900" : "bg-yellow-500 text-black"
                  }`}
                >
                  AVAILABLE FOR CATERING ORDERS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`py-12 md:py-20 relative overflow-hidden ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}
        data-animate
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://i.postimg.cc/fy7Mpt7D/photo-2-2025-11-11-10-33-00.jpg')",
            filter: "blur(1px)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 animate-in fade-in-50 delay-100 ${isDarkMode ? "text-gray-100" : "text-dark"}`}
            >
              RAASA MENU
            </h2>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-6">
              {[...menuCategories, ...menuCategories].map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => handleNavigate(category.route)}
                  className={`flex-shrink-0 w-72 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group ${
                    isDarkMode ? "bg-gray-800" : "bg-white text-dark"
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                  <div className="p-4">
                    <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? "text-white" : ""}`}>{category.name}</h3>
                    <p className={`text-sm mb-4 ${isDarkMode ? "text-gray-300" : ""}`}>{category.description}</p>
                    <button
                      className={`w-full py-2 font-bold text-sm transition ${
                        isDarkMode ? "bg-red text-white hover:bg-red/90" : "bg-red text-cream hover:bg-red/90"
                      }`}
                    >
                      VIEW MENU
                    </button>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 20s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      <section
        className={`py-12 md:py-20 relative overflow-hidden ${isDarkMode ? "bg-gray-800" : "bg-gray-light"}`}
        data-animate
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('https://i.postimg.cc/m226fWVW/photo-1-2025-11-11-10-33-00.jpg')",
            filter: "blur(1px)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className={`font-semibold text-lg mb-2 ${isDarkMode ? "text-red-400" : "text-red"}`}>SPECIAL OFFERS</h3>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
              BIG DEALS
            </h2>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>Save more with our exclusive offers</p>
          </div>

          {loadingDeals ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? "text-gray-300" : "text-gray-medium"}>Loading exclusive deals...</p>
            </div>
          ) : errorDeals ? (
            <div className="text-center py-12">
              <p className={`text-red ${isDarkMode ? "text-red-400" : ""}`}>{errorDeals}</p>
            </div>
          ) : bigDeals.length === 0 ? (
            <div className="text-center py-12">
              <p className={isDarkMode ? "text-gray-300" : "text-gray-medium"}>
                No promotional deals available right now
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {bigDeals.map((deal) => {
                  const basePrice = deal.productPrice || 0
                  const discount = deal.productDiscount || 15
                  const originalPrice = basePrice * (1 + discount / 100)
                  const savings = Math.round((originalPrice - basePrice) * 100) / 100

                  return (
                    <div
                      key={deal.productId}
                      className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group ${
                        isDarkMode ? "bg-gray-700 text-white" : "bg-white text-dark"
                      }`}
                      onClick={() => handleAddToBag(deal)}
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-200">
                        <img
                          src={deal.productImg1 || "/placeholder.svg"}
                          alt={deal.productName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full bg-red text-white">
                          🔥 SPECIAL DEAL
                        </span>
                        {deal.productDiscount && (
                          <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full bg-gold text-dark">
                            -{deal.productDiscount}%
                          </span>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-white" : ""}`}>
                          {deal.productName}
                        </h3>
                        <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
                          {deal.productDescription || "Delicious and authentic"}
                        </p>
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xl font-bold ${isDarkMode ? "text-red-400" : "text-red"}`}>
                              £{basePrice.toFixed(2)}
                            </span>
                            {originalPrice > basePrice && (
                              <span
                                className={`text-sm line-through ${isDarkMode ? "text-gray-500" : "text-gray-medium"}`}
                              >
                                £{originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {savings > 0 && (
                            <span className={`text-xs font-semibold ${isDarkMode ? "text-red-400" : "text-red"}`}>
                              Save £{savings.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToBag(deal)}
                          className="w-full py-2 font-bold bg-red text-white hover:bg-red/90 transition transform hover:scale-105 rounded"
                        >
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={() => handleNavigate("big-deals")}
                  className={`px-8 py-3 font-bold transition transform hover:scale-105 rounded ${
                    isDarkMode ? "bg-red text-white hover:bg-red/90" : "bg-red text-white hover:bg-red/90"
                  }`}
                >
                  VIEW ALL DEALS
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className={`py-12 md:py-20 ${isDarkMode ? "bg-gray-800" : "bg-cream-light"}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${isDarkMode ? "text-white" : "text-dark"}`}>
            Trusted by Thousands
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "100% Fresh", desc: "Quality ingredients verified daily" },
              { icon: "⏱️", title: "30 Min Delivery", desc: "Or your money back guaranteed" },
              { icon: "🛡️", title: "Secure Payment", desc: "PCI-DSS compliant checkout" },
              { icon: "⭐", title: "4.8 Stars", desc: "2,500+ verified customer reviews" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg text-center shadow-md hover:shadow-lg transition-all transform hover:scale-105 ${isDarkMode ? "bg-gray-700 text-white" : "bg-white text-dark"}`}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="font-bold text-lg mb-2">{stat.title}</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`py-12 md:py-20 ${isDarkMode ? "bg-gray-900" : "bg-cream"}`} data-animate>
        <div className="max-w-7xl mx-auto px-4">
          <h2
            className={`text-3xl font-bold mb-12 text-center animate-in fade-in-50 ${isDarkMode ? "text-white" : "text-dark"}`}
          >
            Popular Dishes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featureItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-dark"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 px-3 py-1 text-xs font-bold bg-gold text-dark">
                    £{item.price}
                  </span>
                  <span className="absolute top-3 left-3 px-3 py-1 text-xs font-bold bg-red text-white">
                    {item.badge}
                  </span>
                  <button
                    onClick={() => handleAddToBag(item)}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                  >
                    <Heart size={28} className="text-white fill-white" />
                  </button>
                </div>
                <div className="p-4">
                  <p className={`text-xs mb-1 font-semibold ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
                    {item.category}
                  </p>
                  <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-white" : ""}`}>{item.name}</h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? "text-gray-300" : "text-gray-medium"}`}>
                    {item.description}
                  </p>
                  <button
                    onClick={() => handleAddToBag(item)}
                    className="w-full py-2 font-bold flex items-center justify-center gap-2 bg-red text-white hover:bg-red/90 transition transform hover:scale-105"
                  >
                    <ShoppingCart size={18} />
                    ADD TO BASKET
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <PeopleAndSpace isDarkMode={isDarkMode} />

      
      <InstagramSection isDarkMode={isDarkMode} />

      <section className={`py-12 md:py-20 ${isDarkMode ? "bg-gray-900" : "bg-cream"}`} data-animate>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-dark"}`}>
              What Our Customers Say
            </h2>
            <p className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>
              Real feedback from happy customers who love our food
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Ahmed Hassan",
                rating: 5,
                feedback: "Absolutely delicious! The best biryani I've had in years. Delivery was on time and hot.",
                avatar: "https://i.pravatar.cc/150?img=1",
              },
              {
                name: "Priya Sharma",
                rating: 5,
                feedback: "Authentic flavors and excellent service. My family loved every bite. Will order again!",
                avatar: "https://i.pravatar.cc/150?img=2",
              },
              {
                name: "James Wilson",
                rating: 4,
                feedback:
                  "Great food and reasonable prices. The tandoori chicken was perfectly cooked. Highly recommend.",
                avatar: "https://i.pravatar.cc/150?img=3",
              },
              {
                name: "Fatima Khan",
                rating: 5,
                feedback:
                  "Customer service is amazing! Fresh ingredients and generous portions. Best curry place around.",
                avatar: "https://i.pravatar.cc/150?img=4",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-dark"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={14} className="fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-medium"}`}>
                  "{testimonial.feedback}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-12 md:py-20 overflow-hidden" data-animate>
        <div
          className={`absolute inset-0 bg-cover bg-center blur-sm ${isDarkMode ? "opacity-30" : "opacity-20"}`}
          style={{
            backgroundImage: "url('https://i.postimg.cc/pLGFKyNK/restaurant-interior.jpg')",
          }}
        ></div>
        {isDarkMode && <div className="absolute inset-0 bg-black opacity-50"></div>}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? "text-white" : "text-dark"}`}>
              WHY CHOOSE RAASA EXPRESS?
            </h2>
            <div
              className="mx-auto mt-3 h-1 bg-red-500 rounded-full"
              style={{
                animation: "growLine 1.2s ease-out forwards",
              }}
            ></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Flame,
                title: "Fresh Ingredients",
                desc: "We use only the finest quality ingredients sourced fresh daily",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Hot food delivered to your door in 30 minutes or less",
              },
              {
                icon: Trophy,
                title: "Authentic Recipes",
                desc: "Traditional recipes passed down through generations",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-lg text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                  isDarkMode ? "bg-gray-800 bg-opacity-70 text-white" : "bg-white text-dark"
                }`}
              >
                <div className="flex justify-center mb-4">
                  <feature.icon size={48} className={isDarkMode ? "text-red-300" : "text-red"} />
                </div>
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-white" : "text-dark"}`}>{feature.title}</h3>
                <p className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-medium"}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`py-12 md:py-20 text-center ${isDarkMode ? "bg-red text-white" : "bg-red text-white"}`}
        data-animate
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-in fade-in-50">Ready to Order?</h2>
          <p className="text-lg mb-8 animate-in fade-in-50 delay-100">
            Join thousands of happy customers enjoying authentic Sri Lankan cuisine
          </p>
          <button
            onClick={() => handleNavigate("order")}
            className={`px-8 py-4 font-bold transition transform hover:scale-105 animate-in fade-in-50 delay-200 ${
              isDarkMode ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300" : "bg-gold text-dark hover:bg-gold/90"
            }`}
          >
            ORDER NOW
          </button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
