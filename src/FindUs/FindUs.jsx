"use client"

import { useState } from "react"
import { MapPin, Navigation, X, Clock, Phone, Plus, Minus } from "lucide-react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useDarkMode } from "../context/DarkModeContext"

export default function FindUs() {
  const [showSearchModal, setShowSearchModal] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState(null)
  const { isDarkMode } = useDarkMode()

  const googleMapsUrl = "https://maps.app.goo.gl/G5ujeHK1xZjeLVXW9"


  const locationData = {
    name: "RAASA EXPRESS",
    address: "366 Crofton Road,Locksbottom, Orpington, BR6 8NN",
    phone: "+44 016 8966 6990",
    hours: "22:00",
    status: "OPEN UNTIL",
    coordinates: { lat: 51.5074, lng: -0.1278 },
  }

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setShowSearchModal(false)
      setSelectedLocation(locationData)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-cream"}`}>
      <Header />

     
      <div
        className="relative h-[1000px] bg-cover bg-center"
        style={{
          backgroundImage: `url('https://i.postimg.cc/YSk5s55j/adults-enjoying-mexican-food.jpg')`,
        }}
      >
       
        <div className="absolute inset-0 bg-black/30" />

       
        {!showSearchModal ? (
          <div className="relative z-10 pt-24">
            <h1 className="text-center text-4xl font-bold text-white mb-8">FIND A RAASA EXPRESS</h1>
            <div className="max-w-4xl mx-auto px-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Enter a town, postcode or location to find a RAASA EXPRESS"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full px-6 py-4 text-gray-700 focus:outline-none bg-white focus:ring-2 focus:ring-red"
                  />
                  <Navigation className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <button
                  onClick={handleSearch}
                  className="bg-red text-white px-8 py-4 font-bold hover:bg-red/90 transition-colors"
                >
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

     
      {showSearchModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-8 relative animate-fadeIn">
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold text-center mb-8 text-dark">FIND A RAASA EXPRESS</h2>

            <div className="flex gap-2 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Enter a town, postcode or location to find a RAASA EXPRESS"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-6 py-4 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red"
                />
                <Navigation className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button
                onClick={handleSearch}
                className="bg-red text-white px-8 py-4 font-bold hover:bg-red/90 transition-colors"
              >
                SEARCH
              </button>
            </div>

            <p className="text-sm text-gray-600 text-center leading-relaxed">
              At RAASA Express, we take your well-being seriously. From frequent sanitising to protective shields and
              contactless service, we ensure a clean and comfortable environment at all our locations.
            </p>
          </div>
        </div>
      )}

      
      {selectedLocation && !showSearchModal && (
        <div className={`max-w-7xl mx-auto px-4 py-12 ${isDarkMode ? "text-gray-100" : "text-dark"}`}>
          <div className="grid lg:grid-cols-2 gap-8">
            
            <div className={`${isDarkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-lg`}>
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedLocation.name}</h2>
                <div className="bg-red text-white px-4 py-2 rounded text-sm font-bold">
                  <div className="text-xs">{selectedLocation.status}</div>
                  <div>{selectedLocation.hours}</div>
                </div>
              </div>

              
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="flex-shrink-0 mt-1" size={20} />
                <p className="text-base">{selectedLocation.address}</p>
              </div>

             
              <div className="flex items-start gap-3 mb-6">
                <Phone className="flex-shrink-0 mt-1" size={20} />
                <p className="text-base">{selectedLocation.phone}</p>
              </div>

              
              <div className="flex items-start gap-3 mb-8">
                <Clock className="flex-shrink-0 mt-1" size={20} />
                <p className="text-sm">OPEN Until {selectedLocation.hours}</p>
              </div>

             
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="w-full sm:flex-1 bg-red text-white px-6 py-3 font-bold hover:bg-red/90 transition-colors">
                  Order Delivery Now
                </button>
                <span className="text-gray-400 font-semibold">OR</span>
                <button
                  className={`w-full sm:flex-1 ${
                    isDarkMode ? "bg-gray-900 text-white" : "bg-dark text-white"
                  } px-6 py-3 font-bold hover:opacity-90 transition-colors`}
                >
                  Order Collection Now
                </button>
              </div>

              <div className="flex gap-4 mt-6">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}
                  aria-label="Get directions on Google Maps"
                >
                  <Navigation size={20} />
                </a>
                <button
                  className={`p-3 rounded-full ${
                    isDarkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors`}
                  aria-label="View details"
                >
                  <Clock size={20} />
                </button>
              </div>
            </div>

            <div className="relative h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.5449999999998!2d-0.12999999999999!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjYiTiAwwrAwNyc0MC44Ilc!5e0!3m2!1sen!2suk!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="RAASA EXPRESS Location Map"
              />

             
              <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none">
                <div className="bg-white p-2 rounded shadow-lg">
                  <Plus size={20} />
                </div>
                <div className="bg-white p-2 rounded shadow-lg">
                  <Minus size={20} />
                </div>
              </div>

              
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white px-6 py-3 rounded-lg shadow-lg font-semibold text-dark">
                  Click to open in Google Maps
                </span>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
