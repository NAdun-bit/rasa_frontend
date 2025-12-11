import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Landing from "./Home/Landing"
import Menu from "./OurMenu/menu"
import BigDeals from "./BigDeals/bigdeal"
import CartPage from "./Cart/CartPage"
import Order from "./Order/order"
import OrderDetails from "./Checkout/OrderDetails"
import Payment from "./Checkout/Payment"
import AboutUs from "./About/AboutUs"
import LoginPage from "./Auth/LoginPage"
import UserProfile from "./Auth/UserProfile"
import { CartProvider } from "./context/CartContext"
import { LocationProvider } from "./context/LocationContext"
import { DarkModeProvider } from "./context/DarkModeContext"
import { AuthProvider } from "./context/AuthContext"
import { OrderProvider } from "./context/OrderContext"
import { OrderDetailsProvider } from "./context/OrderDetailsContext"
import LocationSelector from "./components/LocationSelector"
import "./App.css"

function App() {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <OrderDetailsProvider>
                <LocationProvider>
                  <LocationSelector />

                  <div className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Landing />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/big-deals" element={<BigDeals />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/order" element={<Order />} />
                      <Route path="/checkout" element={<OrderDetails />} />
                      <Route path="/payment" element={<Payment />} />
                      <Route path="/about" element={<AboutUs />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/profile" element={<UserProfile />} />
                    </Routes>
                  </div>
                </LocationProvider>
              </OrderDetailsProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  )
}

export default App
