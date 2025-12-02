import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function ArtisanProductForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("category", form.category);
      fd.append("price", form.price);
      fd.append("stock", form.stock);
      fd.append("description", form.description);

      if (!imageFile) {
        alert("Please select an image file");
        return;
      }
      fd.append("image", imageFile);

      await api.post("/products/add", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product added!");
      navigate("/artisan/products");

    } catch (err) {
      console.log(err);
      alert("Error adding product");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-2">Add New Product</h1>
      <p className="text-slate-500 text-sm mb-6">
        Share details about your handmade product. Admin will review and approve.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-xl shadow-sm border border-slate-100 p-5">
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Product Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="">Select category</option>
            <option>Home Decor</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Art & Paintings</option>
            <option>Others</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* IMAGE UPLOAD FIXED BELOW */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Upload Product Image *</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <textarea
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold"
        >
          Submit for Approval
        </button>

      </form>
    </div>
  );
}

export default ArtisanProductForm;
