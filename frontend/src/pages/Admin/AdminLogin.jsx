import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../utils/api";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/admin/login", form);

      login({
        token: res.data.token,
        role: "admin",
        user: res.data.admin
      });

      navigate("/admin/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-semibold mb-2">Admin Login</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-xl border p-5"
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
