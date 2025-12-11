"use client"

import { useState, useEffect } from "react"
import { authService } from "../services/authService"

const UserProfileForm = ({ onProfileComplete, loading: externalLoading }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    location: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchExistingProfile = async () => {
      try {
        const profile = await authService.getCurrentUserProfile()
        if (profile && (profile.name || profile.email || profile.address || profile.location)) {
          setFormData({
            name: profile.name || "",
            email: profile.email || "",
            address: profile.address || "",
            location: profile.location || "",
          })
        }
      } catch (error) {
        console.log("[v0] Could not fetch existing profile:", error)
      }
    }
    fetchExistingProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!formData.name.trim()) {
      setError("Please enter your name")
      return
    }
    if (!formData.email.trim()) {
      setError("Please enter your email")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address")
      return
    }
    if (!formData.address.trim()) {
      setError("Please enter your address")
      return
    }
    if (!formData.location.trim()) {
      setError("Please enter your city or town")
      return
    }

    setLoading(true)

    try {
      await authService.updateUserProfile({
        name: formData.name,
        email: formData.email,
        address: formData.address,
        location: formData.location,
      })
      onProfileComplete()
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    onProfileComplete()
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl border-2 border-yellow-300">
      <h1 className="text-2xl font-bold text-red-700 text-center mb-2">RAASA EXPRESS</h1>
      <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Let's Get to Know You</h2>
      <p className="text-center text-gray-600 mb-6">Just a few details to complete your profile</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
              disabled={loading || externalLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              placeholder="Enter your last name"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
              disabled={loading || externalLoading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
            disabled={loading || externalLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Address / Street</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your street address"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
            disabled={loading || externalLoading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City / Town</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your city or town"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
              disabled={loading || externalLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Postcode</label>
            <input
              type="text"
              placeholder="Enter your postcode"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
              disabled={loading || externalLoading}
            />
          </div>
        </div>

        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading || externalLoading}
          className="w-full bg-red-700 hover:bg-red-800 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleSkip}
            disabled={loading || externalLoading}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            Skip for now →
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">We use your details only to improve your experience</p>
      </form>
    </div>
  )
}

export default UserProfileForm
