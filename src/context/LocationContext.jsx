import React, { createContext, useState, useContext } from "react"

const LocationContext = createContext()

export function LocationProvider({ children }) {
  const [selectedLocation, setSelectedLocation] = useState({
    address: "London ,UK",
    lat: 6.9271,
    lng: 80.6005,
  })

  const [showLocationModal, setShowLocationModal] = useState(false)

  const updateLocation = (location) => {
    setSelectedLocation(location)
    setShowLocationModal(false)
  }

  return (
    <LocationContext.Provider
      value={{
        selectedLocation,
        updateLocation,
        showLocationModal,
        setShowLocationModal,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation must be used within LocationProvider")
  }
  return context
}
