"use client"

import { useState, useRef, useEffect } from "react"
import { Truck, Package, X, MapPin } from "lucide-react"
import { useCart } from "../context/CartContext"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function Order({ onNavigate }) {
  const [step, setStep] = useState("choice")
  const [orderType, setOrderType] = useState(null)
  const [location, setLocation] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [activeTab, setActiveTab] = useState("map")
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markerRef = useRef(null)
  const { setOrderTypeValue } = useCart()
  useEffect(() => {
    if (step === "mapView" && mapRef.current && !mapInstance.current) {
      const defaultLocation = { lat: 6.9497, lng: 80.6042 }
      mapInstance.current = new window.google.maps.Map(mapRef.current, {
        zoom: 15,
        center: defaultLocation,
        styles: [
          {
            elementType: "geometry",
            stylers: [{ color: "#f5f5f5" }],
          },
        ],
      })

      markerRef.current = new window.google.maps.Marker({
        position: defaultLocation,
        map: mapInstance.current,
        draggable: true,
        title: "Delivery Location",
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#DC143C",
          fillOpacity: 1,
          strokeColor: "#FFFFFF",
          strokeWeight: 2,
        },
      })

      markerRef.current.addListener("dragend", () => {
        const pos = markerRef.current.getPosition()
        const address = `${pos.lat().toFixed(4)}, ${pos.lng().toFixed(4)}`
        setSelectedLocation({
          lat: pos.lat(),
          lng: pos.lng(),
          address: address,
        })
      })
      // Set initial location
      setSelectedLocation({
        lat: defaultLocation.lat,
        lng: defaultLocation.lng,
        address: "Yakkala, Sri Lanka",
      })
    }
  }, [step])
  const handleOrderTypeSelect = (type) => {
    setOrderType(type)
    setStep("mapView")
  }
  const handleLocationConfirm = () => {
    if (selectedLocation && selectedLocation.address) {
      console.log(`Order ${orderType} for location: ${selectedLocation.address}`)
      setOrderTypeValue(orderType)
      onNavigate("menu")
    }
  }
  const handleSearchConfirm = () => {
    if (location.trim()) {
      console.log(`Order ${orderType} for location: ${location}`)
      setOrderTypeValue(orderType)
      onNavigate("menu")
    }
  }
  const handleBack = () => {
    if (step === "mapView") {
      setStep("choice")
      setOrderType(null)
      setLocation("")
      setSelectedLocation(null)
      mapInstance.current = null
      markerRef.current = null
    }
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-800 to-gray-900">
      <Header onNavigate={onNavigate} />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://i.postimg.cc/wxGQcn2N/top-view-sliced-vegetable-meal-cooked-with-different-ingredients-dark-blue-background.jpg')`,
            }}
          ></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          {step === "choice" && (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src="https://i.postimg.cc/wxGQcn2N/top-view-sliced-vegetable-meal-cooked-with-different-ingredients-dark-blue-background.jpg"
                  alt="Delicious food"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">ORDER NOW!</h1>
                <p className="text-gray-600 text-lg mb-8 font-semibold">OUR PLACE OR YOURS?</p>

                <button
                  onClick={() => handleOrderTypeSelect("delivery")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 mb-4 rounded flex items-center justify-center gap-3 transition-colors"
                >
                  <Truck size={20} />
                  ORDER FOR DELIVERY
                </button>

                <button
                  onClick={() => handleOrderTypeSelect("pickup")}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded flex items-center justify-center gap-3 transition-colors"
                >
                  <Package size={20} />
                  ORDER FOR PICKUP
                </button>

                <p className="text-gray-500 text-sm mt-6">Available at selected locations</p>
              </div>
            </div>
          )}
          {step === "mapView" && (
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <button
                onClick={handleBack}
                className="absolute top-4 right-4 bg-white hover:bg-gray-100 z-20 p-2 rounded-full transition-colors shadow-lg"
              >
                <X size={24} className="text-gray-900" />
              </button>

              <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Delivery to:</p>
                      <p className="font-bold text-gray-900">{selectedLocation?.address || "Yakkala Sri Lanka"}</p>
                    </div>
                  </div>
                  <button className="text-gray-600 hover:text-gray-900 font-semibold text-sm border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition-colors">
                    Change
                  </button>
                </div>
              </div>

              <div className="border-b border-gray-200 flex">
                <button
                  onClick={() => setActiveTab("map")}
                  className={`flex-1 py-3 font-semibold text-center transition-colors ${
                    activeTab === "map" ? "text-red-600 border-b-2 border-red-600" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Map View
                </button>
                <button
                  onClick={() => setActiveTab("search")}
                  className={`flex-1 py-3 font-semibold text-center transition-colors ${
                    activeTab === "search"
                      ? "text-red-600 border-b-2 border-red-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Search Location
                </button>
              </div>

              <div className="p-6">
                {activeTab === "map" ? (
                  <>
                    <div
                      ref={mapRef}
                      className="w-full h-80 bg-gray-200 rounded-lg mb-4 overflow-hidden"
                      style={{ minHeight: "320px" }}
                    ></div>

                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded p-4 mb-4">
                      <p className="font-bold text-gray-900 text-sm">
                        Current Location: {selectedLocation?.address || "Yakkala Sri Lanka"}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mb-6">
                      Move the pin on your building entrance or preferred delivery point for accurate delivery.
                    </p>

                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 border-2 border-gray-900 text-gray-900 font-bold py-3 px-4 rounded hover:bg-gray-50 transition-colors"
                      >
                        BACK
                      </button>
                      <button
                        onClick={handleLocationConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition-colors"
                      >
                        CONFIRM LOCATION
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter a town, postcode or location"
                      className="w-full border-2 border-gray-300 rounded px-4 py-3 mb-6 focus:border-red-600 focus:outline-none placeholder-gray-400"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={handleBack}
                        className="flex-1 border-2 border-gray-900 text-gray-900 font-bold py-3 px-4 rounded hover:bg-gray-50 transition-colors"
                      >
                        BACK
                      </button>
                      <button
                        onClick={handleSearchConfirm}
                        disabled={!location.trim()}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded transition-colors"
                      >
                        CONFIRM LOCATION
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
