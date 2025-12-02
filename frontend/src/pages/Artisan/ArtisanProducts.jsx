import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

// Status badge colors
function getStatusColor(status) {
  if (status === "Approved") return "text-green-600 bg-green-50";
  if (status === "Pending") return "text-amber-600 bg-amber-50";
  if (status === "Rejected") return "text-red-600 bg-red-50";
  return "text-slate-600 bg-slate-50";
}

function ArtisanProducts() {
  const [products, setProducts] = useState([]);
  const artisanName = localStorage.getItem("artisanName");

 useEffect(() => {
  loadProducts();
}, []);

const loadProducts = async () => {
  try {
    const res = await api.get("/products/my-products");
    setProducts(res.data);
  } catch (err) {
    console.log("Error loading products:", err);
  }
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">My Products</h1>
          <p className="text-slate-500 text-sm">
            View and manage your handmade items.
          </p>
        </div>

        <Link
          to="/artisan/products/new"
          className="inline-flex px-4 py-2 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-2 font-medium text-slate-600">
                Product
              </th>
              <th className="text-left px-4 py-2 font-medium text-slate-600">
                Price
              </th>
              <th className="text-left px-4 py-2 font-medium text-slate-600">
                Status
              </th>
              <th className="text-right px-4 py-2 font-medium text-slate-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr
                key={p._id}
                className="border-b last:border-0 border-slate-100"
              >
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">₹{p.price}</td>

                <td className="px-4 py-2">
                  <span
                    className={
                      "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold " +
                      getStatusColor(p.status)
                    }
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-4 py-2 text-right space-x-2">
                  <button className="text-xs text-slate-600 hover:underline">
                    Edit
                  </button>
                  <button className="text-xs text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* If no products */}
        {products.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-6">
            No products yet. Add your first handmade item.
          </p>
        )}
      </div>
    </div>
  );
}

export default ArtisanProducts;
