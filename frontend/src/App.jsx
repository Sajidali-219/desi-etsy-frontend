import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Customer pages
import Home from "./pages/Home/Home";
import ProductList from "./pages/Products/ProductList";
import ProductDetail from "./pages/Products/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import CustomerLogin from "./pages/Customer/CustomerLogin";
import CustomerRegister from "./pages/Customer/CustomerRegister";


// Artisan pages
import ArtisanLogin from "./pages/Artisan/ArtisanLogin";
import ArtisanRegister from "./pages/Artisan/ArtisanRegister";
import ArtisanDashboard from "./pages/Artisan/Artisandashboard";
import ArtisanProducts from "./pages/Artisan/ArtisanProducts";
import ArtisanProductForm from "./pages/Artisan/ArtisanProductForm";

// Admin pages
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminArtisans from "./pages/Admin/AdminArtisans";
import AdminProducts from "./pages/Admin/AdminProducts";
import ProtectedRoute from "./ProtectedRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* Customer */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/customer/login" element={<CustomerLogin />} />
          <Route path="/customer/register" element={<CustomerRegister />} />


          {/* Artisan */}
          <Route path="/artisan/login" element={<ArtisanLogin />} />
          <Route path="/artisan/register" element={<ArtisanRegister />} />
          <Route path="/artisan/dashboard" element={<ProtectedRoute type="artisan"><ArtisanDashboard /></ProtectedRoute>} />
          <Route path="/artisan/products" element={<ArtisanProducts />} />
          <Route path="/artisan/products/new" element={<ArtisanProductForm />} />

          {/* Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/artisans" element={<AdminArtisans />} />
          <Route path="/admin/products" element={<AdminProducts />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
