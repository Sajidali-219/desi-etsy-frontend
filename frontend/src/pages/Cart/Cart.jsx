import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Cart() {
  const { cart, removeFromCart, clearCart, checkout } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <span className="text-4xl ">🧺</span>
        </div>

        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Your cart is empty
        </h1>

        <p className="text-slate-500 text-sm mb-6">
          Looks like you haven’t added anything yet.
          Browse our handmade products crafted by talented Indian artisans.
        </p>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
        >
          Start Shopping
        </Link>

        {/* Decorative illustration */}
        <div className="mt-10 mx-auto h-40 w-full opacity-80">
          <div className="h-full w-full grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-slate-100"></div>
            <div className="rounded-lg bg-slate-200"></div>
            <div className="rounded-lg bg-slate-100"></div>
          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.product}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm mb-4"
        >
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-slate-500">₹{item.price}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.product)}
            className="text-red-600 font-semibold"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex items-center gap-4 mt-6">
        <button onClick={() => navigate("/checkout")} className="px-5 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition">
          Proceed to Checkout
        </button>


        <button
          onClick={clearCart}
          className="bg-red-500 text-white px-6 py-2 rounded-lg"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
