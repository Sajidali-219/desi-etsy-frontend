import { useLocation, Link } from "react-router-dom";

function PaymentSuccess() {
  const location = useLocation();
  const name = location.state?.name || "Customer";
  const total = location.state?.total || 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <span className="text-green-600 text-2xl">✓</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Payment Successful 🎉
        </h1>
        <p className="text-slate-600 text-sm mb-4">
          Thank you, <span className="font-semibold">{name}</span>! Your order
          has been placed successfully.
        </p>

        <p className="text-sm text-slate-700 mb-1">
          Order Amount: <span className="font-semibold">₹{(total || 0) + 40}</span>
        </p>
        <p className="text-[12px] text-slate-500 mb-6">
          (Including ₹40 demo delivery charges)
        </p>

        <Link
          to="/products"
          className="inline-flex px-5 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
