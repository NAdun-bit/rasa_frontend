// src/services/orderApi.js

const API_BASE_URL = "http://localhost:8091/api/v1/order"

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`)
  }
  try {
    return await response.json()
  } catch {
    return response.ok
  }
}

export const orderApi = {
  // GET ALL ORDERS
  getAllOrders: async () => {
    try {
      console.log("[Order API] Fetching all orders from:", API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await handleResponse(response)
      console.log("[Order API] Orders received:", data?.length || 0, "items")
      return Array.isArray(data)
        ? data.map((order) => ({
            ...order,
            phoneNumber: order.phoneNumber ? String(order.phoneNumber) : "",
          }))
        : []
    } catch (error) {
      console.error("[Order API] Error fetching all orders:", error.message)
      throw error
    }
  },

  // GET ORDER BY ID
  getOrderById: async (orderId) => {
    try {
      console.log("[Order API] Fetching order ID:", orderId)
      const response = await fetch(`${API_BASE_URL}/${orderId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await handleResponse(response)
      console.log("[Order API] Order retrieved:", data?.orderId)
      if (data) {
        data.phoneNumber = data.phoneNumber ? String(data.phoneNumber) : ""
      }
      return data
    } catch (error) {
      console.error("[Order API] Error fetching order by ID:", error.message)
      throw error
    }
  },

  // CREATE ORDER
  createOrder: async (orderData) => {
    try {
      console.log("[Order API] Creating order with data:", orderData)
      const sanitizedData = {
        ...orderData,
        phoneNumber: String(orderData.phoneNumber || "").trim(),
      }
      console.log(
        "[Order API] Sanitized phoneNumber for backend:",
        sanitizedData.phoneNumber,
        "Type:",
        typeof sanitizedData.phoneNumber,
      )

      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      })

      const data = await handleResponse(response)
      console.log("[Order API] Order created with ID:", data?.orderId)
      if (data) {
        data.phoneNumber = data.phoneNumber ? String(data.phoneNumber) : ""
      }
      return data
    } catch (error) {
      console.error("[Order API] Error creating order:", error.message)
      throw error
    }
  },

  // UPDATE ORDER
  updateOrder: async (orderId, orderData) => {
    try {
      console.log("[Order API] Updating order ID:", orderId)
      const sanitizedData = {
        ...orderData,
        phoneNumber: String(orderData.phoneNumber || "").trim(),
      }

      const response = await fetch(`${API_BASE_URL}/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      })

      const data = await handleResponse(response)
      console.log("[Order API] Order updated:", data?.orderId)
      if (data) {
        data.phoneNumber = data.phoneNumber ? String(data.phoneNumber) : ""
      }
      return data
    } catch (error) {
      console.error("[Order API] Error updating order:", error.message)
      throw error
    }
  },

  // DELETE ORDER
  deleteOrder: async (orderId) => {
    try {
      console.log("[Order API] Deleting order ID:", orderId)
      const response = await fetch(`${API_BASE_URL}/${orderId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      console.log("[Order API] Order deleted:", orderId)
      return true
    } catch (error) {
      console.error("[Order API] Error deleting order:", error.message)
      throw error
    }
  },
}
