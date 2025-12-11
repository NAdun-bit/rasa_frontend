"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import FoodDetailModal from "../components/FoodDetailModal"
import { ShoppingCart, ChevronDown } from "lucide-react"
import { useDarkMode } from "../context/DarkModeContext"
import { productApi } from "../services/productApi"

const fallbackMenuData = {
  RECOMMENDED: [
    {
      productId: 1,
      category: "RECOMMENDED",
      productName: "Butter Chicken",
      productDescription: "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
      productPrice: 1295,
      productPromotion: false,
      productVegType: false,
      image: "https://i.postimg.cc/5t5CNNMx/ikhsan-baihaqi-pbc2w-Xb-QYp-I-unsplash.jpg",
    },
  ],
}

export default function Menu() {
  const { isDarkMode } = useDarkMode()
  const navigate = useNavigate()

  const [activeCategory, setActiveCategory] = useState("RECOMMENDED")
  const [selectedItem, setSelectedItem] = useState(null)
  const [visibleItems, setVisibleItems] = useState([])
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [dietaryFilter, setDietaryFilter] = useState("all")
  const [expandedFilters, setExpandedFilters] = useState({
    price: true,
    category: true,
    dietary: true,
  })
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await productApi.getAllProducts()
        console.log("[v0] Raw products from backend:", data)
        console.log("[v0] Number of products:", data?.length)

        if (!data || data.length === 0) {
          console.log("[v0] No products returned from API")
          setProducts([])
          setCategories(["NO ITEMS"])
          setActiveCategory("NO ITEMS")
          setError("No food items available. Please add items in the admin panel.")
          setLoading(false)
          return
        }

        const transformedProducts = data.map((product) => ({
          productId: product.productId,
          id: product.productId,
          productName: product.productName,
          name: product.productName,
          productDescription: product.productDescription,
          description: product.productDescription,
          productCategory: product.productCategory || "Uncategorized",
          category: product.productCategory || "Uncategorized",
          image: product.productImg1 || product.productImg2 || product.productImg3 || "/diverse-food-spread.png",
          productImg1: product.productImg1,
          productImg2: product.productImg2,
          productImg3: product.productImg3,
          price: Number(product.productPrice) || 0,
          productPrice: product.productPrice,
          discount: Number(product.productDiscount) || 0,
          badge: product.productPromotion ? "HOUSE SPECIAL" : null,
          productPromotion: product.productPromotion,
          type: product.productVegType ? "vegetarian" : "non-vegetarian",
          productVegType: product.productVegType,
        }))

        console.log("[v0] Total transformed products:", transformedProducts.length)
        setProducts(transformedProducts)

        const uniqueCategories = [
          ...new Set(
            transformedProducts.map((p) => p.productCategory).filter((cat) => cat && String(cat).trim().length > 0),
          ),
        ]

        console.log("[v0] Extracted categories:", uniqueCategories)
        setCategories(uniqueCategories.length > 0 ? uniqueCategories : ["ALL ITEMS"])

        if (uniqueCategories.length > 0) {
          setActiveCategory(uniqueCategories[0])
        } else {
          setActiveCategory("ALL ITEMS")
        }

        setError(null)
      } catch (err) {
        console.error("[v0] Error fetching products:", err.message)
        setError("Failed to load products from backend")
        setProducts([])
        setCategories(["ALL ITEMS"])
        setActiveCategory("ALL ITEMS")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    setVisibleItems([])
    const currentItems = getFilteredItems()
    console.log("[v0] Current filtered items count:", currentItems.length)
    currentItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index])
      }, index * 100)
    })
  }, [activeCategory, products, priceRange, dietaryFilter])

  const getFilteredItems = () => {
    let filtered = products

    if (activeCategory && activeCategory !== "ALL ITEMS" && activeCategory !== "ALL") {
      filtered = filtered.filter((item) => {
        const itemCategory = String(item.productCategory || "").trim()
        const compareCategory = String(activeCategory || "").trim()
        const matches = itemCategory.toLowerCase() === compareCategory.toLowerCase()
        if (!matches) {
          console.log("[v0] Category mismatch:", { itemCategory, compareCategory })
        }
        return matches
      })
    }

    filtered = filtered.filter((item) => {
      const itemPrice = Number(item.price) || 0
      return itemPrice >= priceRange[0] && itemPrice <= priceRange[1]
    })

    if (dietaryFilter === "vegetarian") {
      filtered = filtered.filter((item) => item.type === "vegetarian")
    } else if (dietaryFilter === "non-vegetarian") {
      filtered = filtered.filter((item) => item.type === "non-vegetarian")
    }

    console.log("[v0] Final filtered items:", filtered.length, "from total:", products.length)
    return filtered
  }

  const filteredItems = getFilteredItems()

  const toggleFilterSection = (section) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const resetFilters = () => {
    setPriceRange([0, 1000])
    setDietaryFilter("all")
  }

  const handleNavigate = (page) => {
    navigate(`/${page}`)
    window.scrollTo(0, 0)
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Loading products...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-1">
            <div
              className={`${
                isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-dark"
              } rounded-lg p-6 shadow-sm sticky top-24 max-h-fit overflow-y-auto`}
            >
              <h2 className={`font-bold text-lg mb-6 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>FILTERS</h2>

              <div className="mb-6 pb-6 border-b border-gray-300">
                <button
                  onClick={() => toggleFilterSection("price")}
                  className={`w-full flex items-center justify-between py-2 font-semibold text-sm ${
                    isDarkMode ? "text-gray-100" : "text-dark"
                  } hover:text-red transition`}
                >
                  PRICE RANGE
                  <ChevronDown
                    size={16}
                    className={`transform transition ${expandedFilters.price ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.price && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                        className={`w-full px-3 py-2 border rounded text-sm ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300 text-dark"
                        }`}
                        placeholder="Min"
                      />
                      <span className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        to
                      </span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
                        className={`w-full px-3 py-2 border rounded text-sm ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-gray-100"
                            : "bg-white border-gray-300 text-dark"
                        }`}
                        placeholder="Max"
                      />
                    </div>
                    <p className={`text-xs font-semibold ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      £ {priceRange[0].toLocaleString()} - £ {priceRange[1].toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div className="mb-6 pb-6 border-b border-gray-300">
                <button
                  onClick={() => toggleFilterSection("category")}
                  className={`w-full flex items-center justify-between py-2 font-semibold text-sm ${
                    isDarkMode ? "text-gray-100" : "text-dark"
                  } hover:text-red transition`}
                >
                  CATEGORY
                  <ChevronDown
                    size={16}
                    className={`transform transition ${expandedFilters.category ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.category && (
                  <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                          activeCategory === category
                            ? isDarkMode
                              ? "bg-red/20"
                              : "bg-red/10"
                            : isDarkMode
                              ? "hover:bg-gray-700"
                              : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={activeCategory === category}
                          onChange={() => setActiveCategory(category)}
                          className="w-4 h-4 accent-red"
                        />
                        <span
                          className={`text-sm font-medium ${
                            activeCategory === category
                              ? "text-red font-semibold"
                              : isDarkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                          }`}
                        >
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <button
                  onClick={() => toggleFilterSection("dietary")}
                  className={`w-full flex items-center justify-between py-2 font-semibold text-sm ${
                    isDarkMode ? "text-gray-100" : "text-dark"
                  } hover:text-red transition`}
                >
                  DIETARY PREFERENCE
                  <ChevronDown
                    size={16}
                    className={`transform transition ${expandedFilters.dietary ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedFilters.dietary && (
                  <div className="mt-3 space-y-2">
                    {[
                      { value: "all", label: "All Items" },
                      { value: "vegetarian", label: "Vegetarian", icon: "🥬" },
                      {
                        value: "non-vegetarian",
                        label: "Non-Vegetarian",
                        icon: "🍗",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 p-2 rounded cursor-pointer transition ${
                          dietaryFilter === opt.value
                            ? isDarkMode
                              ? opt.value === "vegetarian"
                                ? "bg-green-500/20"
                                : "bg-orange-500/20"
                              : opt.value === "vegetarian"
                                ? "bg-green-100"
                                : "bg-orange-100"
                            : isDarkMode
                              ? "hover:bg-gray-700"
                              : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="dietary"
                          checked={dietaryFilter === opt.value}
                          onChange={() => setDietaryFilter(opt.value)}
                          className={`w-4 h-4 ${opt.value === "vegetarian" ? "accent-green-500" : "accent-orange-500"}`}
                        />
                        <span
                          className={`text-sm font-medium ${
                            dietaryFilter === opt.value
                              ? opt.value === "vegetarian"
                                ? "text-green-600"
                                : "text-orange-600"
                              : isDarkMode
                                ? "text-gray-300"
                                : "text-gray-700"
                          } font-semibold`}
                        >
                          {opt.icon} {opt.label}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={resetFilters}
                className={`w-full px-4 py-3 rounded font-semibold text-sm transition border-2 ${
                  isDarkMode
                    ? "border-gray-600 text-gray-300 hover:border-red hover:text-red"
                    : "border-gray-300 text-gray-600 hover:border-red hover:text-red"
                }`}
              >
                RESET FILTERS
              </button>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="mb-8">
              <h1 className={`text-3xl md:text-4xl font-bold mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                {activeCategory}
              </h1>
              <p className={isDarkMode ? "text-gray-400" : "text-gray-medium"}>
                Showing {filteredItems.length} item
                {filteredItems.length !== 1 ? "s" : ""} from this category
              </p>
              <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-500" : "text-gray-medium"}`}>
                Showing {filteredItems.length} item{filteredItems.length !== 1 ? "s" : ""} out of{" "}
                {products.filter((p) => p.categoryName === activeCategory).length}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`transform transition-all duration-500 ${
                      visibleItems.includes(index) ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                    }`}
                  >
                    <div
                      className={`${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                      } rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full flex flex-col`}
                    >
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={
                            item.image ||
                            "https://i.postimg.cc/5t5CNNMx/ikhsan-baihaqi-pbc2w-Xb-QYp-I-unsplash.jpg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={item.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 bg-gold text-dark px-3 py-1 text-xs font-bold rounded">
                          £.{item.price}
                        </span>
                        {item.badge && (
                          <span
                            className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded ${
                              item.badge === "POPULAR" || item.badge === "HOUSE SPECIAL"
                                ? "bg-red text-cream"
                                : "bg-gold text-dark"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute bottom-3 left-3">
                          <span
                            className={`px-2 py-1 text-xs font-bold rounded text-white ${
                              item.type === "vegetarian" ? "bg-green-500" : "bg-orange-500"
                            }`}
                          >
                            {item.type === "vegetarian" ? "🥬 VEG" : "🍗 NON-VEG"}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
                          {item.name || item.productName}
                        </h3>
                        <p className={`text-sm mb-4 flex-1 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                          {item.description || item.productDescription}
                        </p>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="w-full bg-red text-white py-2 font-bold hover:bg-red/90 flex items-center justify-center gap-2 rounded transition-all duration-300 hover:scale-105"
                        >
                          <ShoppingCart size={18} />
                          ADD TO BASKET
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className={`col-span-3 text-center py-12 ${isDarkMode ? "text-gray-400" : "text-gray-medium"}`}>
                  <p className="text-lg font-semibold mb-2">No items found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedItem && (
        <FoodDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} onNavigate={handleNavigate} />
      )}

      <Footer />
    </div>
  )
}
