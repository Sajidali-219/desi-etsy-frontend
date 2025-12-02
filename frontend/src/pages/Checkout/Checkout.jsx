import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";

function Checkout() {
  const { cart, totalPrice, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Load Razorpay checkout script once
  useEffect(() => {
    if (window.Razorpay) return;
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      // optional: do not remove script to allow reuse while app is open
    };
  }, []);


  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log("Frontend Key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
    if (!cart || cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    // Optionally validate form
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      // 1) Create order on backend
      const items = cart.map((i) => ({
        product: i.product,
        name: i.name,
        price: i.price,
        qty: i.qty,
      }));

      const res = await api.post("/payment/create-order", { items });
      const { razorpayOrder, orderId } = res.data;

      // 2) Prepare Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ensure this exists
        amount: razorpayOrder.amount, // integer paise
        currency: "INR",
        name: "Desi Etsy",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        handler: async function (response) {
          // 3) Verify payment on backend
          try {
            const verify = await api.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId,
            });

            if (verify.data.success) {
              clearCart();
              navigate("/payment-success", {
                state: { name: form.name || "Customer", total: razorpayOrder.amount / 100 },
              });
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error("verify error", err);
            alert(err.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: form.name,
          email: "", // optional
          contact: form.phone,
        },
        theme: {
          color: "#0d9488",
        },
      };

      // 4) Open Razorpay checkout
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("checkout error", err);
      alert(err.response?.data?.message || "Payment failed: check console");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold mb-2">No items to checkout</h1>
        <p className="text-slate-500 mb-4">
          Add some handmade products to your cart before checking out.
        </p>
        <Link
          to="/products"
          className="inline-flex px-5 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const itemTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const discount = 0;

  const delivery = 40;

  const grandTotal = itemTotal + delivery - discount;


  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      {/* Left side: Shipping form */}
      <div className="md:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
        <p className="text-slate-500 text-sm mb-6">
          Enter your shipping details to complete the order.
        </p>

        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Address
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="House no, street, area"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Pincode"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
          >
            Pay with Razorpay
          </button>
        </form>
      </div>

      {/* Right side: Order summary */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="space-y-3 max-h-64 overflow-y-auto">
          {cart.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-slate-700">{item.name}</span>
              <span className="font-medium">₹{item.price * item.qty}</span>
            </div>
          ))}
        </div>

        <hr className="my-4" />

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600">Items Total</span>
          <span className="font-medium">₹{itemTotal}</span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600">Discount</span>
          <span className="font-medium">₹{discount}</span>
        </div>

        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600">Delivery Charges</span>
          <span className="font-medium">₹{delivery}</span>
        </div>

        <hr className="my-4" />

        <div className="flex items-center justify-between text-base font-semibold mt-2">
          <span>Total Amount</span>
          <span>₹{grandTotal}</span>
        </div>


        <p className="text-[11px] text-slate-500 mt-3">
          *This is a demo checkout. Razorpay integration will be handled in the
          backend.
        </p>
      </div>
    </div>
  );
}

export default Checkout;
