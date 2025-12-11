import React from "react";
import { ChevronRight, Check } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutUs() {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const milestones = [
    {
      year: "2010",
      title: "The Beginning",
      description: "RAASA was born from a passion to share authentic Sri Lankan cuisine.",
    },
    {
      year: "2015",
      title: "Expansion",
      description: "Growing to multiple locations while maintaining our authentic recipes.",
    },
    {
      year: "2022",
      title: "RAASA Express",
      description: "Bringing our flavors directly to your doorstep with our delivery service.",
    },
  ];

  const philosophyPoints = [
    {
      title: "Authentic Recipes",
      description: "We preserve traditional Sri Lankan cooking methods passed down through generations.",
    },
    {
      title: "Fresh Ingredients",
      description: "We source only the finest spices and ingredients to create our signature dishes.",
    },
    {
      title: "Community First",
      description: "We believe in creating a welcoming environment for all our customers.",
    },
  ];

   const chefs = [
    {
      name: "Raj Kumar",
      image: "https://i.postimg.cc/kGvLVQt0/Image-7.png",
    },
    {
      name: "Priya Singh",
      image: "https://i.postimg.cc/MHqF8nrM/Image-8.png",
    },
    {
      name: "Arjun Patel",
      image: "https://i.postimg.cc/ncVPRQmt/Image-9.png",
    },
  ];


 const experienceImages = [
    "https://i.postimg.cc/DZdx52yg/Image-6.png",
    "https://i.postimg.cc/rFYQfZcf/Image-5.png",
    "https://i.postimg.cc/LXRTJrBK/Image-4.png",
    "https://i.postimg.cc/zX3kHwWn/Image-3.png",
  ];


  const handleNavigate = (page) => {
    navigate(`/${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className={isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}>
      <Header />

      
      <section
        className="relative h-96 md:h-[500px] flex items-center justify-start overflow-hidden animate-in fade-in-50 duration-700"
        style={{
          backgroundImage:  "url('https://i.postimg.cc/q7WwpNgL/cover.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#7d1d1d",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-in slide-in-from-left-8 fade-in-50 duration-700 delay-100">
            OUR STORY
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-2xl mb-8 animate-in slide-in-from-left-8 fade-in-50 duration-700 delay-200">
            The authentic Sri Lankan experience, bringing flavor and tradition to your table since 2010
          </p>
          <button 
            onClick={() => handleNavigate("menu")}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 font-bold rounded-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 animate-in slide-in-from-left-8 fade-in-50 duration-700 delay-300"
          >
            EXPLORE OUR MENU
            <ChevronRight size={20} />
          </button>
        </div>
      </section>

      
    <section className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in fade-in-50 duration-700">
      <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>OUR</span>{" "}
      <span className="text-red-600">JOURNEY</span>
    </h2>
    <p className={`text-center mb-16 animate-in fade-in-50 duration-700 delay-100 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
      Milestones that shaped our story
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {milestones.map((milestone, index) => (
        <div
          key={index}
          className={`p-8 rounded-lg border-2 text-center transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in-50 duration-700 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700 hover:border-red-600 text-white"
              : "bg-amber-50 border-amber-200 hover:border-red-600 text-gray-900"
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4 transform transition-transform hover:scale-110">
            {milestone.year}
          </div>
          <h3 className={`${isDarkMode ? "text-white" : "text-gray-900"} text-xl font-bold mb-3`}>
            {milestone.title}
          </h3>
          <p className={`${isDarkMode ? "text-white" : "text-gray-600"}`}>
            {milestone.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>




     
      <section
        className="relative py-16 md:py-24 bg-cover bg-center animate-in fade-in-50 duration-700"
        style={{
          backgroundImage: "url('https://i.postimg.cc/qgfgRdyw/Rectangle-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 animate-in fade-in-50 duration-700">
            Our <span className="text-yellow-500">Philosophy</span>
          </h2>

          <div className="space-y-6 max-w-2xl">
            {philosophyPoints.map((point, index) => (
              <div 
                key={index} 
                className="flex gap-4 items-start animate-in slide-in-from-left-8 fade-in-50 duration-700 transform transition-all hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0">
                  <Check size={24} className="text-yellow-500 animate-in zoom-in duration-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                  <p className="text-gray-200">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
     <section
  className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-800 text-white" : "bg-amber-50 text-gray-900"}`}
>
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in fade-in-50 duration-700">
      <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>MEET OUR</span>{" "}
      <span className="text-red-600">CHEFS</span>
    </h2>
    <p className={`text-center mb-16 animate-in fade-in-50 duration-700 delay-100 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
      The talented minds behind your culinary experience
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {chefs.map((chef, index) => (
        <div
          key={index}
          className={`rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 animate-in fade-in-50 duration-700 ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
          } shadow-lg hover:shadow-2xl`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <img
            src={chef.image || "/placeholder.svg"}
            alt={chef.name}
            className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
          />
          <div className="p-6 text-center">
            <h3 className={`${isDarkMode ? "text-white" : "text-gray-900"} text-xl font-bold`}>
              {chef.name}
            </h3>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


   
     <section className={`py-16 md:py-24 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-in fade-in-50 duration-700">
      <span className={`${isDarkMode ? "text-white" : "text-gray-900"}`}>EXPERIENCE</span>{" "}
      <span className="text-red-600">RAASA EXPRESS</span>
    </h2>
    <p className={`text-center mb-12 animate-in fade-in-50 duration-700 delay-100 ${isDarkMode ? "text-white" : "text-gray-600"}`}>
      Discover the ambiance and flavors that make us special
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      {experienceImages.map((image, index) => (
        <div
          key={index}
          className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg group animate-in fade-in-50 duration-700 transform transition-all hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <img
            src={image || "/placeholder.svg"}
            alt={`RAASA Experience ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      ))}
    </div>

    <div className="text-center">
      <button
        onClick={() => handleNavigate("big-deals")}
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 font-bold rounded-lg transition-all duration-300 hover:scale-105 animate-in fade-in-50 duration-700 delay-300"
      >
        VISIT US TODAY
      </button>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
}
