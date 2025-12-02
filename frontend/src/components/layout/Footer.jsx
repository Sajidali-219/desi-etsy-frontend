import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12">
      <div className="page-wrapper py-10">
        <div className="grid md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-600 text-white font-bold">
                दे
              </span>
              <span className="text-lg font-semibold tracking-tight">
                Desi <span className="text-teal-600">Etsy</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 max-w-xs">
              A curated handmade marketplace connecting talented Indian artisans
              with customers seeking authentic & sustainable products.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/products">
                  Shop Products
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/artisan/register">
                  Become an Artisan
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/cart">
                  Your Cart
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/checkout">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Artisan & Admin */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              For Sellers & Admin
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/artisan/login">
                  Artisan Login
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/artisan/dashboard">
                  Artisan Dashboard
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/admin/login">
                  Admin Login
                </Link>
              </li>
              <li>
                <Link className="text-slate-600 hover:text-teal-600 transition" to="/admin/dashboard">
                  Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-slate-800 mb-3">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-teal-600 transition">
                {/* Instagram icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
                 viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M7 4h10a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 
                    0 01-3-3V7a3 3 0 013-3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </a>

              <a href="#" className="text-slate-500 hover:text-teal-600 transition">
                {/* Twitter icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" 
                viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                   d="M8 19c11 0 14-9 14-14v-1a10.3 10.3 0 
                   01-2.9.8A5 5 0 0021 3.5a10.3 10.3 0 
                   01-3.3 1.3A5 5 0 0015 3c-2.7 0-5 
                   2.2-5 5 0 .4 0 .8.1 1.1A14.2 
                   14.2 0 013 4s-4 9 5 13a14.5 14.5 
                   0 01-7 2c9 5 20 0 20-11.5" />
                </svg>
              </a>

              <a href="#" className="text-slate-500 hover:text-teal-600 transition">
                {/* YouTube icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" 
                  fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.6 3.2H4.4A3.4 3.4 0 001 6.6v10.7A3.4 3.4 
                  0 004.4 20h15.2a3.4 3.4 0 003.4-3.4V6.6a3.4 3.4 
                  0 00-3.4-3.4zM10 15.5v-7l6 3.5-6 3.5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="my-8 border-slate-200" />

        <p className="text-center text-[11px] text-slate-500">
          © {new Date().getFullYear()} Desi Etsy — Handmade Marketplace of India.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
