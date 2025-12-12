"use client"

import { createContext, useState, useContext } from "react"

const OrderDetailsContext = createContext()

export function OrderDetailsProvider({ children }) {
  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    mobile: "", 
    email: "",
    deliveryAddress: "",
    agreeToTerms: false,
  })

  const updateOrderDetails = (details) => {
    setOrderDetails(details)
  }

  const clearOrderDetails = () => {
    setOrderDetails({
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      deliveryAddress: "",
      agreeToTerms: false,
    })
  }

  return (
    <OrderDetailsContext.Provider
      value={{
        orderDetails,
        updateOrderDetails,
        clearOrderDetails,
      }}
    >
      {children}
    </OrderDetailsContext.Provider>
  )
}

export function useOrderDetails() {
  const context = useContext(OrderDetailsContext)
  if (!context) {
    throw new Error("useOrderDetails must be used within an OrderDetailsProvider")
  }
  return context
}
