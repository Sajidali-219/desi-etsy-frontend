import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    pendingArtisans: 0,
    pendingProducts: 0,
    approvedArtisans: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log("Error fetching stats:", err);
    }
  };

  const items = [
    { label: "Pending Artisan Verifications", value: stats.pendingArtisans },
    { label: "Pending Product Approvals", value: stats.pendingProducts },
    { label: "Total Approved Artisans", value: stats.approvedArtisans },
  ];

  return (
    <div className="page-wrapper py-10 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Admin Dashboard</h1>
        <p className="text-slate-500 text-sm">
          Review artisan profiles and approve handmade product listings.
        </p>
      </div>

      {/* Dynamic stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div key={idx} className="card p-4 shadow-sm border">
            <p className="text-xs text-slate-500 uppercase tracking-wide">
              {item.label}
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">
              Moderation queue
            </h2>
            <span className="text-[11px] text-slate-500">
              Use these sections to keep the platform clean & verified.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Link
              to="/admin/artisans"
              className="flex flex-col gap-1 rounded-lg border px-3 py-3 hover:bg-slate-50 transition"
            >
              <span className="text-sm font-semibold text-slate-800">
                Verify Artisans
              </span>
              <span className="text-xs text-slate-500">
                Review artisan registrations and approve genuine profiles.
              </span>
            </Link>

            <Link
              to="/admin/products"
              className="flex flex-col gap-1 rounded-lg border px-3 py-3 hover:bg-slate-50 transition"
            >
              <span className="text-sm font-semibold text-slate-800">
                Approve Products
              </span>
              <span className="text-xs text-slate-500">
                Check product listings before they go live on marketplace.
              </span>
            </Link>
          </div>
        </div>

        <div className="card-soft p-5 space-y-2">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">
            Review Guideline
          </p>
          <p className="text-sm text-slate-800">
            Approve only genuine handmade products. Reject items that look
            mass-produced or violate marketplace policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
