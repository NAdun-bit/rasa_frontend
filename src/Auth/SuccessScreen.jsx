"use client"

const SuccessScreen = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border-2 border-yellow-300">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-red-700 mb-6">RAASA EXPRESS</h1>
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-3">Welcome to RAASA Express!</h2>
        <p className="text-center text-gray-600 mb-6">
          Thank you for completing your profile. You're now ready to explore our services.
        </p>

        <button
          onClick={onContinue}
          className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 mb-4"
        >
          Explore Our Menu
        </button>

        <p className="text-center text-xs text-gray-500">We use your details only to improve your experience</p>
      </div>
    </div>
  )
}

export default SuccessScreen
