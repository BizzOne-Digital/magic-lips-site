"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, Tag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, discount, couponCode, applyCoupon, removeCoupon, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const [validating, setValidating] = useState(false);

  const subtotal = getSubtotal();
  const total = getTotal();
  const discountAmount = subtotal - total;

  const validateCoupon = async () => {
    if (!coupon.trim()) return;
    setValidating(true);
    try {
      const res = await fetch("/api/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon }),
      });
      const data = await res.json();
      if (res.ok && data.valid) {
        applyCoupon(coupon, data.discountPercent);
        toast.success(data.message || "Coupon applied!");
      } else {
        toast.error(data.error || "Invalid coupon");
      }
    } catch {
      toast.error("Error validating coupon");
    } finally {
      setValidating(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-[#9D8EC4]/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#1F2937] mb-3" style={{ fontFamily: "var(--font-playfair)" }}>
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-6 text-sm">Add some products to get started.</p>
          <Link href="/shop" className="btn-primary">Shop Now</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#9D8EC4] mb-6 transition-colors duration-200 text-sm">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4 sm:p-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-[#F0ECFB] overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">💄</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#1F2937] font-semibold text-sm sm:text-base">{item.name}</h3>
                    <p className="text-[#9D8EC4] text-xs sm:text-sm">${item.price} CAD each</p>
                  </div>
                  <button onClick={() => { removeItem(item.id); toast.success("Item removed"); }} className="text-gray-400 hover:text-red-500 transition-colors duration-200 flex-shrink-0 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#9D8EC4]/10">
                  <div className="flex items-center border border-[#9D8EC4]/20 rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-[#F0ECFB] rounded-l-lg transition-colors duration-200">
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="px-3 text-sm font-medium min-w-[2rem] text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-[#F0ECFB] rounded-r-lg transition-colors duration-200">
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                  <p className="text-[#1F2937] font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <button onClick={() => { clearCart(); toast.success("Cart cleared"); }} className="text-gray-400 hover:text-red-500 text-sm transition-colors duration-200 flex items-center gap-1">
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card p-5 sm:p-6">
              <h2 className="text-lg font-bold text-[#1F2937] mb-4">Order Summary</h2>
              <div className="space-y-3 mb-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-[#1F2937]">${subtotal.toFixed(2)} CAD</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-green-600 flex items-center gap-1"><Tag className="w-3 h-3" />{couponCode} ({discount}% off)</span>
                    <span className="text-green-600">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-[#1F2937]">{subtotal >= 30 ? "Free" : "$5.00"}</span>
                </div>
                <div className="border-t border-[#9D8EC4]/10 pt-3 flex justify-between">
                  <span className="font-semibold text-[#1F2937]">Total</span>
                  <span className="text-xl font-bold text-[#1F2937]">${(total + (subtotal >= 30 ? 0 : 5)).toFixed(2)} CAD</span>
                </div>
              </div>

              {!couponCode ? (
                <div className="mb-5 flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 rounded-lg border border-[#9D8EC4]/20 text-sm focus:outline-none focus:border-[#9D8EC4] transition-colors duration-200"
                  />
                  <button onClick={validateCoupon} disabled={validating} className="px-4 py-2 rounded-lg bg-[#9D8EC4] text-white text-sm hover:bg-[#9D8EC4] transition-all duration-200 disabled:opacity-50">
                    Apply
                  </button>
                </div>
              ) : (
                <div className="mb-5 flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
                  <span className="text-green-700 text-sm">{couponCode} applied</span>
                  <button onClick={removeCoupon} className="text-gray-400 hover:text-gray-600 text-xs">Remove</button>
                </div>
              )}

              <Link href="/checkout" className="block btn-primary text-center py-3">
                <ShoppingBag className="w-5 h-5 inline mr-2" />
                Proceed to Checkout
              </Link>
            </div>

            {subtotal < 30 && (
              <div className="rounded-xl p-4 bg-[#FCE7F3]/50 border border-[#D4AF37]/30 text-center">
                <p className="text-[#1F2937] text-sm">
                  Add ${(30 - subtotal).toFixed(2)} more for <strong className="text-[#9D8EC4]">free shipping</strong>!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
