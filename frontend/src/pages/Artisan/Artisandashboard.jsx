import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";

function ArtisanDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const artisan = localStorage.getItem("artisanName");

      const res = await api.get("/products/my-products");
      const myProducts = res.data

    setStats({
      total: myProducts.length,
      approved: myProducts.filter((p) => p.status === "Approved").length,
      pending: myProducts.filter((p) => p.status === "Pending").length,
    });
  };

  return (
    <div className="page-wrapper py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Welcome, Artisan 👋</h1>
        <p className="text-slate-500 text-sm">
          Manage your handmade product listings and track approval status.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Products", value: stats.total },
          { label: "Approved", value: stats.approved },
          { label: "Pending Approval", value: stats.pending },
        ].map((item, idx) => (
          <div key={idx} className="card p-4">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              {item.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>


      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-5 space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">Quick actions</h2>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/artisan/products"
              className="inline-flex px-4 py-2.5 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
            >
              View My Products
            </Link>

            <Link
              to="/artisan/products/new"
              className="inline-flex px-4 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
            >
              + Add New Product
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            Tip: Add clear photos and proper pricing to increase approval chances.
          </p>
        </div>

        <div className="card-soft p-5 space-y-2">
          <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
            Performance tip
          </p>
          <p className="text-sm text-slate-800">
            Products with high-quality images get approved faster.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArtisanDashboard;
