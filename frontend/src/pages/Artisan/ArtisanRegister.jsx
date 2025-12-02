import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../utils/api'

function ArtisanRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    location: "",
    bio: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/artisan/register", form);
      alert("Registration submitted! Admin will verify your profile.");
      navigate("/artisan/login");
    } catch (err) {
      console.log("FULL ERROR:", err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Artisan Registration</h1>
      <p className="text-slate-500 text-sm mb-6">
        Join Desi Etsy and start selling your handmade products.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Mobile number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Create a password"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="City, State"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            About You
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows="2"
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Short introduction about your work"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Main Product Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select category</option>
            <option>Home Decor</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Art & Paintings</option>
            <option>Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
        >
          Register as Artisan
        </button>
      </form>

      <p className="text-xs text-slate-500 mt-4">
        Already registered?{" "}
        <Link to="/artisan/login" className="text-teal-600 font-semibold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}

export default ArtisanRegister;
