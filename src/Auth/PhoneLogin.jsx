"use client"

import { useState } from "react"
import { authService } from "../services/authService"

const PhoneLogin = ({ onPhoneSubmit, loading }) => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!phoneNumber.trim()) {
      setError("Please enter a phone number")
      return
    }

    if (phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    try {
      await authService.sendOtp(phoneNumber)
      setSuccess("OTP sent successfully!")
      onPhoneSubmit(phoneNumber)
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.")
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-yellow-200">
   
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.5 1.5H9.5V3h1V1.5zM13.5 4L12.6 4.9l.7.7.9-.9-1.1-1.1zM15.5 9h-2v1h2V9zM13.5 14l-.7.7.7.7 1.1-1.1-.9-.9zM10.5 16v1.5h1V16h-1zM6.5 14l.9.9 1.1-1.1-.7-.7-.9.9zM4.5 9h2V8h-2v1zM6.5 4l-.9.9 1.1 1.1.7-.7-1-1.3z" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-red-700 text-center mb-2">RAASA EXPRESS</h1>
      <p className="text-center text-gray-600 mb-6">Sign in to continue</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 placeholder-gray-400"
            disabled={loading}
          />
        </div>

        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}

        {success && (
          <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">{success}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          {loading ? "Sending..." : "Continue"}
        </button>

        <div className="text-center">
          <button type="button" className="text-red-600 hover:text-red-700 font-medium text-sm">
            Skip for now →
          </button>
        </div>
      </form>
    </div>
  )
}

export default PhoneLogin
