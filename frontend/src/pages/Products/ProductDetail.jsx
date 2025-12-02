import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    window.dispatchEvent(
      new CustomEvent("addToCart", {
        detail: {
          product: {
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
          },
        },
      })
    );

    alert("Added to cart");
    navigate("/cart");
  };

const handleBuyNow = async () => {
  console.log("key:", import.meta.env.VITE_RAZORPAY_KEY_ID);
  try {
    const res = await api.post(
      "/payment/create-order",
      {
        items: [
          {
            product: product._id, // REQUIRED
            price: product.price,
            qty: 1,
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }
    );

    const { razorpayOrder, orderId } = res.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // SAME AS CHECKOUT
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Desi Etsy",
      description: product.name,
      order_id: razorpayOrder.id,

      handler: async function (response) {
        const verifyRes = await api.post(
          "/payment/verify",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (verifyRes.data.success) {
          navigate("/payment-success", {
            state: {
              name: "Customer",
              total: razorpayOrder.amount / 100,
            }
          });
        } else {
          alert("Payment verification failed");
        }
      },

      prefill: {
        name: "Customer",
        email: "test@example.com",
        contact: "9876543210",
      },

      theme: { color: "#0f766e" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.log("BUY NOW ERROR:", err);
    alert("Login required or wrong payload!");
  }
};




  if (!product) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">

      {/* Left Image Section */}
      <div className="flex flex-col items-center">
        <div className="border rounded-xl shadow-sm overflow-hidden">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="w-full h-[420px] object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-2 rounded-lg shadow-md"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-8 py-2 rounded-lg shadow-md"
          >
            Buy Now
          </button>

        </div>
      </div>

      {/* Right Info Section */}
      <div className="space-y-5">

        <h1 className="text-3xl font-bold text-slate-800">{product.name}</h1>

        <p className="text-slate-500 text-sm">{product.category}</p>

        {/* Rating Dummy */}
        <div className="flex items-center gap-2">
          <span className="text-yellow-500 text-lg">★ ★ ★ ★ ☆</span>
          <span className="text-sm text-slate-500">(120 reviews)</span>
        </div>

        {/* Price */}
        <p className="text-4xl font-bold text-teal-700">₹{product.price}</p>

        {/* Highlights */}
        <div className="bg-slate-50 p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-2">Highlights</h3>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Premium handmade product</li>
            <li>Crafted with high quality materials</li>
            <li>Authentic artisan work</li>
            <li>Unique & beautifully designed</li>
          </ul>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold mb-1">Product Description</h3>
          <p className="text-slate-600 leading-relaxed">{product.description}</p>
        </div>

        {/* Artisan Info */}
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <h3 className="text-lg font-semibold mb-1">Crafted By</h3>
          <p className="font-medium text-slate-800">
            {product.artisan?.name || "Unknown Artisan"}
          </p>
          <p className="text-slate-500 text-sm">{product.artisan?.email}</p>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;
