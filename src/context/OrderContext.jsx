"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { authService } from "../services/authService"

const OrderContext = createContext()

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(null) // Track current userId for filtering

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const storedUserId = localStorage.getItem("userId") // Get userId from localStorage
    if (token) {
      setUserId(storedUserId)
      fetchUserOrders(token, storedUserId)
    }
  }, [])

  const fetchUserOrders = async (token, currentUserId) => {
    try {
      setLoading(true)
      const userOrders = await authService.getUserOrders(token)
      console.log("[v0] All orders from API:", userOrders, "userId:", currentUserId) // Debug log

      let filteredOrders = Array.isArray(userOrders) ? userOrders : []
      if (currentUserId) {
        filteredOrders = filteredOrders.filter((order) => {
          const orderUserId = order.userId || order.customerId
          return orderUserId === currentUserId
        })
        console.log("[v0] Filtered orders count:", filteredOrders.length) // Debug log
      }
      setOrders(filteredOrders)
    } catch (error) {
      console.error("[v0] Error fetching orders:", error)
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  const addOrder = (order) => {
    setOrders([order, ...orders])
  }

  const refreshOrders = async (token) => {
    const currentUserId = localStorage.getItem("userId")
    await fetchUserOrders(token, currentUserId)
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        addOrder,
        refreshOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrder() {
  return useContext(OrderContext)
}
