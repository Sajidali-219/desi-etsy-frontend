import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

function ArtisanLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/artisan/login", form);

      login({
        token: res.data.token,
        role: "artisan",
        user: res.data.user
      });

      navigate("/artisan/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid login");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Artisan Login</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-xl shadow-sm border p-5"
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

      <p className="text-xs mt-4">
        New artisan?{" "}
        <Link to="/artisan/register" className="text-teal-600 font-semibold">
          Register here
        </Link>
      </p>
    </div>
  );
}

export default ArtisanLogin;
