import React, { useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "../context/LocationContext";

export default function LocationSelector() {
  const {
    selectedLocation,
    updateLocation,
    showLocationModal,
    setShowLocationModal,
  } = useLocation();
  const [inputValue, setInputValue] = useState(selectedLocation.address);
  const [activeTab, setActiveTab] = useState("map");

  const handleConfirm = () => {
    if (inputValue.trim()) {
      updateLocation({
        address: inputValue,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
      });
    }
  };

  if (!showLocationModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
       
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-dark">SELECT DELIVERY LOCATION</h2>
          <button
            onClick={() => setShowLocationModal(false)}
            className="text-gray-medium hover:text-dark"
          >
            <X size={24} />
          </button>
        </div>

       
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("map")}
            className={`flex-1 py-3 font-semibold transition ${
              activeTab === "map"
                ? "border-b-2 border-red text-red"
                : "text-gray-medium hover:text-dark"
            }`}
          >
            Map View
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 py-3 font-semibold transition ${
              activeTab === "search"
                ? "border-b-2 border-red text-red"
                : "text-gray-medium hover:text-dark"
            }`}
          >
            Search Location
          </button>
        </div>

       
        <div className="p-6 space-y-4">
          {activeTab === "map" ? (
            <div className="space-y-4">
              
              <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <div className="text-5xl mb-2">🗺️</div>
                  <p className="text-gray-medium font-semibold mb-2">
                    Google Maps Integration
                  </p>
                  <p className="text-sm text-gray-medium">
                    Map view will display here
                  </p>
                  <p className="text-xs text-gray-medium mt-2">
                    Current: {selectedLocation.address}
                  </p>
                </div>
              </div>

              <div className="bg-cream p-4 rounded border border-gold">
                <p className="text-sm text-dark">
                  <strong>Current Location:</strong> {selectedLocation.address}
                </p>
              </div>

              <p className="text-sm text-gray-medium">
                Move the pin on your building entrance or preferred delivery
                point for accurate delivery.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              
              <img
                src="/delivery-location.jpg"
                alt="Delivery"
                className="w-full h-48 object-cover rounded-lg"
              />

              <h3 className="text-xl font-bold text-dark">
                WHERE ARE WE DELIVERING TODAY?
              </h3>

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter a town, postcode or location"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-red focus:ring-2 focus:ring-red/20"
              />

              
              <div className="space-y-2">
                <p className="text-xs text-gray-medium uppercase font-semibold">
                  RECENT LOCATIONS
                </p>
                {[
                  "Colombo 03, Colombo",
                  "Colombo 07, Colombo",
                  "Yakkala, Sri Lanka",
                  "Mount Lavinia, Sri Lanka",
                ].map((location) => (
                  <button
                    key={location}
                    onClick={() => setInputValue(location)}
                    className="w-full text-left px-4 py-2 hover:bg-cream rounded transition border border-gray-200"
                  >
                    <p className="text-dark font-medium">{location}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      
        <div className="p-6 border-t space-y-3">
          <button
            onClick={() => setShowLocationModal(false)}
            className="w-full px-4 py-3 border-2 border-dark text-dark font-bold rounded hover:bg-gray-100 transition"
          >
            BACK
          </button>
          <button
            onClick={handleConfirm}
            className="w-full px-4 py-3 bg-red text-white font-bold rounded hover:bg-red/90 transition"
          >
            CONFIRM LOCATION
          </button>
        </div>
      </div>
    </div>
  );
}
