import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";

function CustomerRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/customer/register", form);
      alert("Registration successful! Please login.");
      navigate("/customer/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="page-wrapper py-10 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold text-slate-800 mb-2">
        Customer Registration
      </h1>
      <p className="text-slate-500 text-sm mb-6">
        Create an account to save your details and track your orders.
      </p>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white rounded-xl shadow-sm border border-slate-100 p-5"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email Address
          </label>
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Create a password"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button
          className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
        >
          Register
        </button>
      </form>

      <p className="text-xs text-slate-500 mt-4">
        Already have an account?{" "}
        <Link
          to="/customer/login"
          className="text-teal-600 font-semibold hover:underline"
        >
          Login here
        </Link>
      </p>
    </div>
  );
}

export default CustomerRegister;
