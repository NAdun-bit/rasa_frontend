"use client"

import { useState, useEffect } from "react"
import { authService } from "../services/authService"

const OtpVerification = ({ phoneNumber, onOtpVerified, onBack, loading: externalLoading }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) 

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

   
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpCode = otp.join("")

    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await authService.verifyOtp(phoneNumber, otpCode)
      onOtpVerified(response.token)
    } catch (err) {
      setError(err.message || "Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-yellow-200">
     
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1C6.48 1 2 5.48 2 11s4.48 10 10 10 10-4.48 10-10S17.52 1 12 1zm-2 15l-5-5 1.41-1.41L10 13.17l7.59-7.59L19 7l-9 9z" />
          </svg>
        </div>
      </div>

      <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Verification Code</h1>
      <p className="text-center text-gray-600 mb-6">
        We've sent a 6-digit code to <br /> {phoneNumber}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
       
        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength="1"
              className="w-14 h-14 text-center text-2xl border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500 font-semibold"
              disabled={loading || externalLoading}
            />
          ))}
        </div>

        {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading || externalLoading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Resend code in {formatTime(timeLeft)}</p>
          <button type="button" className="text-red-600 hover:text-red-700 font-medium text-sm">
            Skip verification →
          </button>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-between">
        <button
          onClick={onBack}
          disabled={loading || externalLoading}
          className="text-gray-600 hover:text-gray-800 font-medium"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}

export default OtpVerification
