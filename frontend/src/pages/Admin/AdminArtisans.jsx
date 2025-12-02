import { useEffect, useState } from "react";
import api from "../../utils/api";

function statusColor(status) {
  if (status === "Approved") return "text-green-600 bg-green-50";
  if (status === "Pending" || status === "Unverified") return "text-amber-600 bg-amber-50";
  if (status === "Rejected") return "text-red-600 bg-red-50";
  return "text-slate-600 bg-slate-50";
}

function AdminArtisans() {
  const [artisans, setArtisans] = useState([]);

  const loadArtisans = async () => {
    try {
      const res = await api.get("/admin/artisans");
      setArtisans(res.data);
    } catch (err) {
      console.log("Error loading artisans:", err);
    }
  };

  useEffect(() => {
    loadArtisans();
  }, []);

  // APPROVE artisan
  const approveArtisan = async (id) => {
    try {
      await api.put(`/admin/artisan/${id}/approve`);
      alert("Artisan approved!");
      loadArtisans(); // reload updated list
    } catch (err) {
      console.log("Approve Error:", err);
      alert("Failed to approve artisan");
    }
  };

  // REJECT artisan
  const rejectArtisan = async (id) => {
    try {
      await api.put(`/admin/artisan/${id}/reject`);
      alert("Artisan rejected!");
      loadArtisans();
    } catch (err) {
      console.log("Reject Error:", err);
      alert("Failed to reject artisan");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-4">Manage Artisans</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {artisans.map((a) => (
              <tr key={a._id} className="border-b last:border-0">
                <td className="px-4 py-2">{a.name}</td>
                <td className="px-4 py-2">{a.email}</td>
                <td className="px-4 py-2">{a.category || "N/A"}</td>

                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${statusColor(
                      a.status
                    )}`}
                  >
                    {a.status}
                  </span>
                </td>

                <td className="px-4 py-2 text-right space-x-3">
                  <button
                    className="text-green-600 text-xs hover:underline"
                    onClick={() => approveArtisan(a._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="text-red-600 text-xs hover:underline"
                    onClick={() => rejectArtisan(a._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminArtisans;
