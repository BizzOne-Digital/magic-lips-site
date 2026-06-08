"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Package, Lock } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, getSubtotal, discount, couponCode, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    address: "", city: "", province: "ON", postalCode: "",
  });

  const subtotal = getSubtotal();
  const total = getTotal();
  const shipping = subtotal >= 30 ? 0 : 5;
  const finalTotal = total + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    setLoading(true);

    try {
      const orderData = {
        customer: { name: form.name, email: form.email, phone: form.phone },
        shippingAddress: { address: form.address, city: form.city, province: form.province, postalCode: form.postalCode, country: "Canada" },
        items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
        subtotal,
        discount: subtotal - total,
        shipping,
        total: finalTotal,
        couponCode: couponCode || undefined,
        paymentMethod: "cash_on_delivery",
        paymentStatus: "pending",
        orderStatus: "pending",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        router.push(`/order-success?order=${data.orderNumber}`);
      } else {
        toast.error("Order failed. Please try again.");
      }
    } catch {
      toast.error("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg bg-white border border-[#9D8EC4]/20 text-gray-700 placeholder-gray-400 text-sm focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200";

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1F2937] mb-4">No items to checkout</h2>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#9D8EC4] mb-6 transition-colors duration-200 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back to Cart
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your full name" required />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+1 647 000 0000" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="your@email.com" required />
                </div>
              </div>
            </div>

            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Street Address *</label>
                  <input type="text" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass} placeholder="123 Main Street" required />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">City *</label>
                  <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass} placeholder="Toronto" required />
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Province *</label>
                  <select value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inputClass}>
                    {["ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PEI", "NT", "YT", "NU"].map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-gray-500 text-xs uppercase tracking-wider block mb-1.5">Postal Code *</label>
                  <input type="text" value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value.toUpperCase() })} className={inputClass} placeholder="M6S 2T6" required />
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-[#FCE7F3]/50 border border-[#D4AF37]/30">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-[#9D8EC4] flex-shrink-0" />
                <div>
                  <p className="text-[#1F2937] font-medium text-sm">Payment on Delivery</p>
                  <p className="text-gray-500 text-xs mt-0.5">Pay when your order arrives. We&apos;ll confirm by email.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-5 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-[#1F2937] mb-4">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#F0ECFB] overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt="" width={48} height={48} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">💄</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1F2937] text-xs font-medium truncate">{item.name}</p>
                      <p className="text-gray-400 text-xs">×{item.quantity}</p>
                    </div>
                    <p className="text-[#1F2937] text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#9D8EC4]/10 pt-4 space-y-2 text-sm mb-5">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                {discount > 0 && (
                  <div className="flex justify-between"><span className="text-green-600">{couponCode} ({discount}%)</span><span className="text-green-600">-${(subtotal - total).toFixed(2)}</span></div>
                )}
                <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="border-t border-[#9D8EC4]/10 pt-2 flex justify-between font-bold">
                  <span>Total</span><span>${finalTotal.toFixed(2)} CAD</span>
                </div>
              </div>

              <button type="submit" disabled={loading} className="w-full btn-primary py-3 gap-2 disabled:opacity-50">
                {loading ? "Processing..." : (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    Place Order — ${finalTotal.toFixed(2)} CAD
                  </span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
