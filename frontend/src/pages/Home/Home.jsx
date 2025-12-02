import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="page-wrapper py-10 md:py-16 grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-[11px] font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            New • Niche marketplace for handmade products
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
            Support{" "}
            <span className="text-teal-600">local artisans</span> with every
            purchase.
          </h1>

          <p className="text-slate-600 text-sm md:text-base max-w-lg">
            Desi Etsy connects you with rural and urban artisans across India.
            Discover unique handmade decor, fashion, and accessories crafted
            with love — not mass-produced in factories.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
            >
              🛒 Shop Handmade
            </Link>
            <Link
              to="/artisan/register"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-slate-300 text-sm font-semibold text-slate-800 hover:bg-slate-100 transition"
            >
              👨‍🎨 Become an Artisan
            </Link>
          </div>

          <div className="flex gap-6 text-xs md:text-sm text-slate-500">
            <div>
              <p className="font-semibold text-slate-800">500+ products</p>
              <p>curated handmade items</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">100+ artisans</p>
              <p>from rural & urban India</p>
            </div>
          </div>
        </div>

        {/* Right illustration */}
        <div className="relative">
          <div className="card-soft aspect-[4/3] flex items-center justify-center">
            <div className="grid grid-cols-2 gap-3 p-4 w-full h-full">
              <div className="card flex flex-col justify-between p-3">
                <div className="h-20 rounded-xl bg-amber-100 mb-3" />
                <p className="text-xs font-semibold text-slate-800">
                  Hand-painted Pots
                </p>
                <p className="text-[11px] text-slate-500">Meera • Jaipur</p>
              </div>
              <div className="card flex flex-col justify-between p-3 translate-y-2">
                <div className="h-20 rounded-xl bg-teal-100 mb-3" />
                <p className="text-xs font-semibold text-slate-800">
                  Jute Handbag
                </p>
                <p className="text-[11px] text-slate-500">Ravi • Kolkata</p>
              </div>
              <div className="card flex flex-col justify-between p-3 -translate-y-2">
                <div className="h-20 rounded-xl bg-rose-100 mb-3" />
                <p className="text-xs font-semibold text-slate-800">
                  Block Print Dupatta
                </p>
                <p className="text-[11px] text-slate-500">Ayesha • Lucknow</p>
              </div>
              <div className="card flex flex-col justify-between p-3">
                <div className="h-20 rounded-xl bg-indigo-100 mb-3" />
                <p className="text-xs font-semibold text-slate-800">
                  Clay Diyas Set
                </p>
                <p className="text-[11px] text-slate-500">Sunil • Pune</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
