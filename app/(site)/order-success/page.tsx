"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";

function SuccessContent() {
  const params = useSearchParams();
  const orderNumber = params.get("order");

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-md w-full text-center">
        <div className="card p-6 sm:p-8">
          <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold text-[#1F2937] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Order Placed!
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Thank you for your purchase. We&apos;ll start preparing your order right away.
          </p>

          {orderNumber && (
            <div className="rounded-lg p-4 bg-[#F0ECFB] border border-[#9D8EC4]/20 mb-6">
              <p className="text-gray-500 text-xs mb-1">Order Number</p>
              <p className="text-[#9D8EC4] font-bold text-lg font-mono">{orderNumber}</p>
            </div>
          )}

          <ul className="space-y-2 mb-6 text-left text-sm text-gray-600">
            <li>Order confirmation email on its way</li>
            <li>Your order is being prepared</li>
            <li>We&apos;ll email you when it ships</li>
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/shop" className="flex-1 btn-primary text-sm py-2.5 gap-2 justify-center">
              <ShoppingBag className="w-4 h-4" /> Shop More
            </Link>
            <Link href="/" className="flex-1 btn-secondary text-sm py-2.5 justify-center">
              Home
            </Link>
          </div>
        </div>

        <p className="text-gray-400 text-xs mt-6">
          Questions?{" "}
          <a href="mailto:magiclips2013@gmail.com" className="text-[#9D8EC4] hover:underline">
            magiclips2013@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-gray-400">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
