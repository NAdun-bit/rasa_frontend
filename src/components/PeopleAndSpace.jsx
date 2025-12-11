"use client"

import { useState, useEffect } from "react"

export default function PeopleAndSpace({ isDarkMode }) {
  const [activeIndex, setActiveIndex] = useState(1)
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false)

  const images = [
    {
      id: 1,
      url: "https://i.postimg.cc/g24FTCQg/photo1.jpg",
      alt: "Fine dining experience",
    },
    {
      id: 2,
      url: "https://i.postimg.cc/1zPhC9vx/photo4.jpg",
      alt: "Exquisite plated dish",
    },
    {
      id: 3,
      url: "https://i.postimg.cc/N0fYGsm3/photo2.jpg",
      alt: "Restaurant ambiance",
    },
    {
      id: 4,
      url: "https://i.postimg.cc/xdg76Lkz/photo3.jpg",
      alt: "Restaurant ambiance",
    },
    {
      id: 5,
      url: "https://i.postimg.cc/j5xT5sN0/photo5.jpg",
      alt: "Restaurant ambiance",
    },
    {
      id: 6,
      url: "https://i.postimg.cc/bNHKGXz6/photo6.jpg",
      alt: "Restaurant ambiance",
    },
  ]

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (isAutoScrollPaused) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, 2000) 

    return () => clearInterval(interval)
  }, [images.length, isAutoScrollPaused])

  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${isDarkMode ? "bg-gray-950" : "bg-cream"}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.postimg.cc/bNHKGXz6/photo6.jpg')",
          filter: "blur(1px)",
          opacity: 0.15,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wider">
            <span className="text-yellow-500">PEOPLE AND SPACE</span>
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsAutoScrollPaused(true)}
          onMouseLeave={() => setIsAutoScrollPaused(false)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((image, idx) => {
              const isCenter = idx === activeIndex
              const isLeft = idx === (activeIndex - 1 + images.length) % images.length
              const isRight = idx === (activeIndex + 1) % images.length

              return (
                <div
                  key={image.id}
                  className={`relative overflow-hidden rounded-lg transition-all duration-500 transform ${
                    isCenter ? "md:col-span-1 md:scale-110 md:z-10" : "md:scale-75 md:opacity-60"
                  } ${isLeft ? "absolute left-0 top-1/2 -translate-y-1/2 hidden md:block" : ""} ${
                    isRight ? "absolute right-0 top-1/2 -translate-y-1/2 hidden md:block" : ""
                  }`}
                >
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.alt}
                    className={`w-full h-64 md:h-80 object-cover transition-transform duration-500 ${
                      isCenter ? "scale-100" : "scale-105 hover:scale-110"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-black/0 transition-all duration-500 ${
                      isCenter ? "bg-black/0" : "bg-black/30 hover:bg-black/20"
                    }`}
                  />
                </div>
              )
            })}
          </div>

          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === activeIndex ? "bg-yellow-500 w-8" : "bg-yellow-500/40 hover:bg-yellow-500/60"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
