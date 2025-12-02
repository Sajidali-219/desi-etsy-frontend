import { useEffect, useState } from "react";
import api from "../../utils/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error loading products:", err);
    }
  };

  const approveProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await api.put(
      `/admin/product/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, status: "Approved" } : p))
    );
  } catch (err) {
    console.log("APPROVE ERROR:", err);
  }
};

  const rejectProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/admin/product/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: "Rejected" } : p))
      );
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Product Approvals</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-2">Product</th>
              <th className="text-left px-4 py-2">Artisan</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-right px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b last:border-0 border-slate-100">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.artisanName || "artisan"}</td>
                <td className="px-4 py-2">₹{p.price}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      "px-2.5 py-1 rounded-full text-xs font-semibold " +
                      (p.status === "Approved"
                        ? "text-green-600 bg-green-50"
                        : p.status === "Rejected"
                          ? "text-red-600 bg-red-50"
                          : "text-amber-600 bg-amber-50")
                    }
                  >
                    {p.status}
                  </span>
                </td>

                <td className="px-4 py-2 text-right space-x-2">
                  <button
                    onClick={() => approveProduct(p._id)}
                    className="text-xs text-green-600 hover:underline"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectProduct(p._id)}
                    className="text-xs text-red-600 hover:underline"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-center text-slate-500 text-sm py-6">
            No products to review.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminProducts;
