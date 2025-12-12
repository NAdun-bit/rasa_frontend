"use client"

import { createContext, useState, useContext, useEffect } from "react"
import { authService } from "../services/authService"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null)
  const [phoneNumber, setPhoneNumber] = useState(null)
  const [userId, setUserId] = useState(null) 
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    address: null,
    location: null,
  })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    const phone = localStorage.getItem("phoneNumber")
    const storedUserId = localStorage.getItem("userId") 
    if (token) {
      setAuthToken(token)
      setPhoneNumber(phone)
      setUserId(storedUserId)
      setIsAuthenticated(true)
      fetchUserProfile(token)
    }
    setLoading(false)
  }, [])

  const fetchUserProfile = async (token) => {
    try {
      const profileData = await authService.getUserProfile(token)
      console.log("[v0] Profile data received:", profileData) 
      const extractedUserId = profileData?.id || profileData?.userId 
      if (extractedUserId) {
        setUserId(extractedUserId)
        localStorage.setItem("userId", extractedUserId) 
      }
      setUserData({
        name: profileData?.name || null,
        email: profileData?.email || null,
        address: profileData?.address || null,
        location: profileData?.location || null,
      })
    } catch (error) {
      console.error("[v0] Failed to fetch user profile:", error)
    }
  }

  const login = (token, phone) => {
    setAuthToken(token)
    setPhoneNumber(phone)
    setIsAuthenticated(true)
    localStorage.setItem("authToken", token)
    localStorage.setItem("phoneNumber", phone)
    fetchUserProfile(token)
  }

  const updateProfile = (profileData) => {
    setUserData(profileData)
    localStorage.setItem("userData", JSON.stringify(profileData))
  }

  const logout = () => {
    setAuthToken(null)
    setPhoneNumber(null)
    setUserId(null) 
    setUserData({
      name: null,
      email: null,
      address: null,
      location: null,
    })
    setIsAuthenticated(false)
    localStorage.removeItem("authToken")
    localStorage.removeItem("phoneNumber")
    localStorage.removeItem("userId") // Remove userId from localStorage
    localStorage.removeItem("userData")
  }

  return (
    <AuthContext.Provider
      value={{
        authToken,
        phoneNumber,
        userId, 
        userData,
        isAuthenticated,
        loading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
