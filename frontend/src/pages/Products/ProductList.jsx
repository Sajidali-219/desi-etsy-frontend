import { useState, useEffect } from "react";
import ProductCard from "../../components/products/ProductCard";
import api from "../../utils/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Home Decor", "Accessories", "Art & Decor", "Clothing"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products?public=true");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" ? true : p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-wrapper py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Explore Handmade Products
          </h1>
          <p className="text-slate-500 text-sm">
            Discover unique items crafted by local artisans.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full sm:w-56 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-44 border border-slate-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results summary */}
      <p className="text-xs text-slate-500 mb-3">
        Showing <span className="font-semibold">{filtered.length}</span> of{" "}
        <span className="font-semibold">{products.length}</span> products
      </p>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-slate-500 mt-6">
          No products found. Try a different search or category.
        </p>
      ) : (
        <div
          className="
            grid grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            gap-6 
            place-items-center
          "
        >
          {filtered.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
