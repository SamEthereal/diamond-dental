import Link from "next/link";
import { Sparkles, Package, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-teal-600 flex items-center justify-center text-white shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-slate-900">Diamond Dental</span>
              <span className="text-xs text-teal-600 block -mt-1 font-medium">Clinic & Store</span>
            </div>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/dashboard/clerk"
              className="text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-md hover:bg-slate-100"
            >
              Clerk Portal
            </Link>
            <Link
              href="/dashboard/admin"
              className="bg-slate-900 text-white hover:bg-slate-800 transition-colors px-4 py-2 rounded-lg text-sm shadow-sm"
            >
              Admin Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold mb-6">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Professional Dental Care & Package Assembly</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-3xl">
          Curated Dental-Care Packages & Premium Oral Hygiene
        </h1>

        <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-relaxed">
          Order specialized care packages for General Dental Care and Braces, or browse standalone
          oral care devices. Reserve your items online and pick them up directly at our clinic.
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 bg-teal-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-teal-700 transition shadow-sm"
          >
            <Package className="w-4 h-4" />
            Explore Dental Packages
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-slate-800 font-medium px-6 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Standalone Devices
          </Link>
        </div>

        {/* Feature Cards Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 text-left w-full">
          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-4">
              1
            </div>
            <h3 className="font-semibold text-slate-900 text-lg">Pre-Assembled Packages</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Assembled directly from clinic inventory. Tailored packages for General Dental Care and Orthodontic / Braces care.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-4">
              2
            </div>
            <h3 className="font-semibold text-slate-900 text-lg">7-Day Stock Reservation</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Place an order with zero hassle—no customer account needed. Your stock is held safely for 7 days until clinic pickup.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-4">
              3
            </div>
            <h3 className="font-semibold text-slate-900 text-lg">In-Person Payment</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Inspect your package upon arrival and pay seamlessly at the store counter with cash or card.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Diamond Dental. All rights reserved. Addis Ababa, Ethiopia.</p>
      </footer>
    </div>
  );
}
