import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuth, role, user, logout } = useAuth();

  const linkBase =
    "block px-3 py-1.5 text-sm font-medium rounded-full hover:text-teal-600 hover:bg-teal-50";
  const activeClass = "text-teal-600 bg-teal-50";

  return (
    <header className="bg-white/90 backdrop-blur shadow-sm sticky top-0 z-20">
      <nav className="page-wrapper flex items-center justify-between py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white font-bold">
            दे
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Desi <span className="text-teal-600">Etsy</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">

          {/* ---------------- CUSTOMER VIEW ---------------- */}
          {role === "customer" && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Cart
              </NavLink>
            </>
          )}

          {/* ---------------- ARTISAN VIEW ---------------- */}
          {role === "artisan" && (
            <>
              <NavLink to="/artisan/dashboard" className={linkBase}>
                Dashboard
              </NavLink>
              <NavLink to="/artisan/products" className={linkBase}>
                My Products
              </NavLink>
            </>
          )}

          {/* ---------------- ADMIN VIEW ---------------- */}
          {role === "admin" && (
            <>
              <NavLink to="/admin/dashboard" className={linkBase}>
                Admin
              </NavLink>
              <NavLink to="/admin/products" className={linkBase}>
                Products
              </NavLink>
              <NavLink to="/admin/artisans" className={linkBase}>
                Artisans
              </NavLink>
            </>
          )}

          {/* ---------------- NOT LOGGED IN VIEW ---------------- */}
          {!isAuth && (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Shop
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Cart
              </NavLink>

              <NavLink
                to="/admin/login"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : "text-slate-700"}`
                }
              >
                Admin
              </NavLink>
            </>
          )}
        </div>

        {/* Login / Logout */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuth ? (
            <>
              <Link
                to="/customer/login"
                className="px-3 py-1.5 rounded-full border border-slate-300"
              >
                Login
              </Link>
              <Link
                to="/artisan/login"
                className="px-3 py-1.5 rounded-full border border-teal-600 text-teal-600"
              >
                Become an Artisan
              </Link>
            </>
          ) : (
            <>
              <span className="font-medium text-slate-700">
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
