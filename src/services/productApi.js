// src/services/productApi.js

const API_BASE_URL = "http://localhost:8090/api/v1/product"

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorData || response.statusText}`)
  }
  return response.json()
}

export const productApi = {
  // GET ALL PRODUCTS
  getAllProducts: async () => {
    try {
      console.log("[API] Fetching all products from:", API_BASE_URL)
      const response = await fetch(`${API_BASE_URL}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await handleResponse(response)
      console.log("[API] Raw products received:", data?.length, "items")
      console.log("[API] Sample product:", data?.[0]) // SEE EXACTLY what backend sends

      // Fix: BigDecimal comes as string or number → convert safely
      return data.map((product) => {
        const price = product.productPrice
        const discount = product.productDiscount || 0

        return {
          ...product,
          productPrice: price != null ? Number(price) || 0 : 0,
          productDiscount: discount != null ? Number(discount) || 0 : 0,
          // Also keep a clean "price" field for frontend filtering
          price: price != null ? Number(price) || 0 : 0,
        }
      })
    } catch (error) {
      console.error("[API] Error fetching products:", error.message)
      throw error
    }
  },

  // GET PRODUCT BY ID
  getProductById: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await handleResponse(response)
      const price = data.productPrice
      const discount = data.productDiscount || 0

      return {
        ...data,
        productPrice: price != null ? Number(price) : 0,
        productDiscount: discount != null ? Number(discount) : 0,
        price: price != null ? Number(price) : 0,
      }
    } catch (error) {
      console.error("[API] Error fetching product by ID:", error.message)
      throw error
    }
  },

  // CREATE PRODUCT
  createProduct: async (productData, img1, img2, img3) => {
    try {
      const formData = new FormData()
      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }))

      if (img1) formData.append("img1", img1)
      if (img2) formData.append("img2", img2)
      if (img3) formData.append("img3", img3)

      const response = await fetch(`${API_BASE_URL}/`, {
        method: "POST",
        body: formData,
      })

      const data = await handleResponse(response)
      const price = data.productPrice
      const discount = data.productDiscount || 0

      return {
        ...data,
        productPrice: Number(price) || 0,
        productDiscount: Number(discount) || 0,
        price: Number(price) || 0,
      }
    } catch (error) {
      console.error("[API] Error creating product:", error.message)
      throw error
    }
  },

  // UPDATE PRODUCT
  updateProduct: async (productId, productData, img1, img2, img3) => {
    try {
      const formData = new FormData()
      formData.append("product", new Blob([JSON.stringify(productData)], { type: "application/json" }))

      if (img1) formData.append("img1", img1)
      if (img2) formData.append("img2", img2)
      if (img3) formData.append("img3", img3)

      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: "PUT",
        body: formData,
      })

      const data = await handleResponse(response)
      const price = data.productPrice
      const discount = data.productDiscount || 0

      return {
        ...data,
        productPrice: Number(price) || 0,
        productDiscount: Number(discount) || 0,
        price: Number(price) || 0,
      }
    } catch (error) {
      console.error("[API] Error updating product:", error.message)
      throw error
    }
  },

  // DELETE PRODUCT
  deleteProduct: async (productId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${productId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      console.log("[API] Product deleted:", productId)
      return true
    } catch (error) {
      console.error("[API] Error deleting product:", error.message)
      throw error
    }
  },
}