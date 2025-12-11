const API_BASE_URL = "http://localhost:8095/api/v1/user"

export const authService = {
  sendOtp: async (phoneNumber) => {
    try {
      const response = await fetch(`${API_BASE_URL}/sendotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      })

      if (!response.ok) {
        throw new Error("Failed to send OTP")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        // If backend returns plain text, convert it to JSON format
        const text = await response.text()
        data = { message: text, success: true }
      }

      return data
    } catch (error) {
      console.error("Error sending OTP:", error)
      throw error
    }
  },

  verifyOtp: async (phoneNumber, otp) => {
    try {
      const response = await fetch(`${API_BASE_URL}/verifyotp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, otp }),
      })

      if (!response.ok) {
        throw new Error("Invalid or expired OTP")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        data = { message: text, token: text }
      }

      if (data.token) {
        localStorage.setItem("authToken", data.token)
        localStorage.setItem("phoneNumber", phoneNumber)
      }
      return data
    } catch (error) {
      console.error("Error verifying OTP:", error)
      throw error
    }
  },

  updateUserProfile: async (userDetails) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`${API_BASE_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userDetails),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        data = { message: text, success: true }
      }

      return data
    } catch (error) {
      console.error("Error updating profile:", error)
      throw error
    }
  },

  getUserProfile: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        data = { message: text }
      }

      return data
    } catch (error) {
      console.error("Error fetching profile:", error)
      throw error
    }
  },

  createOrder: async (orderData) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        data = { message: text, success: true, orderId: `ORD-${Date.now()}` }
      }

      return data
    } catch (error) {
      console.error("Error creating order:", error)
      throw error
    }
  },

  getUserOrders: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        data = { orders: [], message: text }
      }

      return data.orders || data
    } catch (error) {
      console.error("Error fetching orders:", error)
      throw error
    }
  },

  getAuthToken: () => {
    return localStorage.getItem("authToken")
  },

  logout: () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("phoneNumber")
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },

  getCurrentUserProfile: async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch profile")
      }

      const contentType = response.headers.get("content-type")
      let data

      if (contentType && contentType.includes("application/json")) {
        data = await response.json()
      } else {
        const text = await response.text()
        data = { message: text }
      }

      return data
    } catch (error) {
      console.error("Error fetching current user profile:", error)
      throw error
    }
  },

  isProfileComplete: async () => {
    try {
      const profile = await authService.getCurrentUserProfile()
      // Check if all required fields are filled
      return !!(profile?.name && profile?.email && profile?.address && profile?.location)
    } catch {
      return false
    }
  },
}
