import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

function CustomerLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/customer/login", form);

      login({
        token: res.data.token,
        role: "customer",
        user: res.data.user
      });

      navigate("/");   // redirect after login
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div className="page-wrapper py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        Customer Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-xl shadow-sm border p-5"
      >
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button className="w-full bg-teal-600 text-white py-2.5 rounded-lg">
          Login
        </button>
      </form>

      <p className="text-xs text-slate-500 mt-4">
        New here?{" "}
        <Link to="/customer/register" className="text-teal-600 font-semibold">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default CustomerLogin;
