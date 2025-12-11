import React from "react"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer
      className="bg-dark text-cream mt-20 relative overflow-hidden"
      style={{
        backgroundImage: "url('https://i.postimg.cc/m226fWVW/photo-1-2025-11-11-10-33-00.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
     
      <div
        className="absolute inset-0 bg-dark/85 backdrop-blur-md"
        style={{ backdropFilter: "blur(1px)" }}
      />

      
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
           
            <div>
              <div className="flex items-center gap-2 mb-4">
              <div className="w-35 h-35 rounded-full overflow-hidden flex items-center justify-center bg-transparent">
              <img src="/logo.png" />
              </div>
              </div>
              <p className="text-sm text-gray-medium mb-4">
                Authentic flavors, delivered with passion since 2024
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-cream hover:text-gold transition-all transform hover:scale-110"
                >
                  <Facebook size={20} />
                </a>
                <a
                  href="#"
                  className="text-cream hover:text-gold transition-all transform hover:scale-110"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="text-cream hover:text-gold transition-all transform hover:scale-110"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            
            <div>
              <h3 className="font-bold text-gold mb-4">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/menu" className="text-cream hover:text-gold transition-colors">
                    Our Menu
                  </a>
                </li>
                <li>
                  <a href="/big-deals" className="text-cream hover:text-gold transition-colors">
                    Big Deals
                  </a>
                </li>
                <li>
                  <a href="/find-us" className="text-cream hover:text-gold transition-colors">
                    Find Us
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-cream hover:text-gold transition-colors">
                    About RAASA
                  </a>
                </li>
                <li>
                  <a href="/careers" className="text-cream hover:text-gold transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

           
            <div>
              <h3 className="font-bold text-gold mb-4">CUSTOMER SERVICE</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/contact" className="text-cream hover:text-gold transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/faqs" className="text-cream hover:text-gold transition-colors">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-cream hover:text-gold transition-colors">
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-cream hover:text-gold transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            
            <div>
              <h3 className="font-bold text-gold mb-4">CONTACT US</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Phone size={16} className="mt-1 flex-shrink-0" />
                  <span>+44 016 8966 6990</span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail size={16} className="mt-1 flex-shrink-0" />
                  <span>hello@raasarestaurant.co.uk</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 flex-shrink-0" />
                  <span>366 Crofton Road,Locksbottom, Orpington, BR6 8NN</span>
                </div>
              </div>
            </div>
          </div>

         
          <div className="border-t border-gray-medium pt-6 text-center text-xs text-gray-medium">
            <p>© {new Date().getFullYear()} RAASA Restaurant. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
