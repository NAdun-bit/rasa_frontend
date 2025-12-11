"use client"

import { useState, useEffect } from "react"

export default function InstagramSection({ isDarkMode }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Instagram-style photo tiles
  const instagramPhotos = [
    {
      id: 1,
      url: "https://i.postimg.cc/Gh0MJX7h/image1.jpg",
      alt: "Cocktail",
      rotation: -3,
    },
    {
      id: 2,
      url: "https://i.postimg.cc/bJtxZhj9/image2.jpg",
      alt: "Plated dish",
      rotation: 2,
    },
    {
      id: 3,
      url: "https://i.postimg.cc/8CqWQ0r8/image3.jpg",
      alt: "Food presentation",
      rotation: -2,
    },
    {
      id: 4,
      url: "https://i.postimg.cc/KvJMvzgD/image4.jpg",
      alt: "Dining experience",
      rotation: 4,
    },
    {
      id: 5,
      url: "https://i.postimg.cc/rm1d6FTX/image5.jpg",
      alt: "Restaurant ambiance",
      rotation: -1,
    },
  ]

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${isDarkMode ? "bg-gray-950" : "bg-cream"}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/7Yzmhjk9/black-rice-dish-walnuts.jpg')",
          filter: "blur(4px)",
          opacity: 0.15,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider">
            <span className="text-yellow-500">INSTAGRAM</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 perspective">
          {instagramPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              className={`group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 transform ${
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } hover:shadow-2xl hover:-translate-y-4`}
              style={{
                transitionDelay: isLoaded ? `${idx * 100}ms` : "0ms",
                transform: `perspective(1000px) rotateZ(${photo.rotation}deg) ${isLoaded ? "" : "scale(0.95)"}`,
              }}
            >
              <img
                src={photo.url || "/placeholder.svg"}
                alt={photo.alt}
                className="w-full h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-4xl text-white drop-shadow-lg">❤️</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className={`text-lg mb-6 ${isDarkMode ? "text-black-300" : "text-black-200"}`}>
            Follow us on Instagram @RaasaExpress
          </p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            FOLLOW US
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
