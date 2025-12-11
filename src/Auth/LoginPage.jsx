"use client"

import { useState } from "react"
import PhoneLogin from "./PhoneLogin"
import OtpVerification from "./OtpVerification"
import SuccessScreen from "./SuccessScreen"
import UserProfileForm from "./UserProfileForm"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { authService } from "../services/authService"
import Header from "../components/Header"
import Footer from "../components/Footer"

const LoginPage = () => {
  const [step, setStep] = useState("phone") // phone, otp, profile, success
  const [phoneNumber, setPhoneNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingProfile, setCheckingProfile] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handlePhoneSubmit = (phone) => {
    setPhoneNumber(phone)
    setStep("otp")
  }

  const handleOtpVerified = async (token) => {
    login(token, phoneNumber)
    setCheckingProfile(true)
    try {
      const profile = await authService.getCurrentUserProfile()
      console.log("[v0] Fetched profile:", profile)

      // If profile has name, email, address, and location - user is existing
      if (profile?.name && profile?.email && profile?.address && profile?.location) {
        console.log("[v0] Profile complete - skipping form")
        setStep("success")
      } else {
        console.log("[v0] Profile incomplete - showing form")
        setStep("profile")
      }
    } catch (error) {
      console.log("[v0] Could not fetch profile, showing form:", error)
      // If error fetching profile, assume new user and show form
      setStep("profile")
    } finally {
      setCheckingProfile(false)
    }
  }

  const handleProfileComplete = () => {
    setStep("success")
  }

  const handleSuccess = () => {
    navigate("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div
        className="flex-grow flex items-center justify-center px-4 py-12 relative"
        style={{
          backgroundImage: "url('https://i.postimg.cc/1399TgRn/flat-lay-arrangement-with-salad-box-sauce.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Blur and overlay effect */}
        <div className="absolute inset-0 bg-black/40" style={{ backdropFilter: "blur(8px)" }} />

        {/* Content container */}
        <div className="relative z-10 w-full max-w-md">
          {step === "phone" && <PhoneLogin onPhoneSubmit={handlePhoneSubmit} loading={loading} />}
          {step === "otp" && (
            <OtpVerification
              phoneNumber={phoneNumber}
              onOtpVerified={handleOtpVerified}
              onBack={() => setStep("phone")}
              loading={loading || checkingProfile}
            />
          )}
          {step === "profile" && <UserProfileForm onProfileComplete={handleProfileComplete} loading={loading} />}
          {step === "success" && <SuccessScreen onContinue={handleSuccess} />}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default LoginPage
