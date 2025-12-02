import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 
                    border border-slate-200 flex flex-col w-full max-w-[260px]">

      {/* Product Image */}
      <img
        src={`http://localhost:5000${product.image}`}
        alt={product.name}
        className="rounded-md h-40 w-full object-cover"
      />

      {/* Title + Price */}
      <div className="mt-3 flex-1 space-y-1">
        <h3 className="text-sm font-semibold text-slate-800 leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="text-teal-700 font-bold text-lg">₹{product.price}</p>
      </div>

      {/* Buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          to={`/products/${product._id}`}
          className="text-center bg-slate-900 text-white py-1.5 rounded-md 
                     text-xs font-semibold hover:bg-slate-800 transition"
        >
          View
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="text-center bg-teal-600 text-white py-1.5 rounded-md 
                     text-xs font-semibold hover:bg-teal-700 transition"
        >
          Add
        </button>
      </div>

    </div>
  );
}

export default ProductCard;
