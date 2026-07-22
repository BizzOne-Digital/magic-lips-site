"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Users, Package, MessageSquare, TrendingUp, Star } from "lucide-react";

interface Stats {
  orders: number;
  subscribers: number;
  products: number;
  messages: number;
  revenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ orders: 0, subscribers: 0, products: 0, messages: 0, revenue: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState<{ orderNumber: string; customer: { name: string }; total: number; orderStatus: string; createdAt: string }[]>([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    Promise.all([
      fetch("/api/orders", { headers }).then((r) => r.json()),
      fetch("/api/newsletter", { headers }).then((r) => r.json()),
      fetch("/api/products").then((r) => r.json()),
      fetch("/api/contact", { headers }).then((r) => r.json()),
    ]).then(([orders, newsletter, products, messages]) => {
      const orderList = orders.orders || [];
      setStats({
        orders: orderList.length,
        subscribers: newsletter.subscribers?.length || 0,
        products: products.products?.length || 0,
        messages: messages.messages?.length || 0,
        revenue: orderList.filter((o: { paymentStatus: string }) => o.paymentStatus === "paid").reduce((sum: number, o: { total: number }) => sum + o.total, 0),
        pendingOrders: orderList.filter((o: { orderStatus: string }) => o.orderStatus === "pending").length,
      });
      setRecentOrders(orderList.slice(0, 5));
    }).catch(() => {});
  }, [token]);

  const statCards = [
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart, color: "text-purple-400", bg: "from-purple-600/20 to-purple-800/20" },
    { label: "Subscribers", value: stats.subscribers, icon: Users, color: "text-pink-400", bg: "from-pink-600/20 to-pink-800/20" },
    { label: "Products", value: stats.products, icon: Package, color: "text-blue-400", bg: "from-blue-600/20 to-blue-800/20" },
    { label: "Messages", value: stats.messages, icon: MessageSquare, color: "text-yellow-400", bg: "from-yellow-600/20 to-yellow-800/20" },
    { label: "Revenue (CAD)", value: `$${stats.revenue.toFixed(2)}`, icon: TrendingUp, color: "text-green-400", bg: "from-green-600/20 to-green-800/20" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: Star, color: "text-orange-400", bg: "from-orange-600/20 to-orange-800/20" },
  ];

  const statusColors: Record<string, string> = {
    pending: "text-yellow-400 bg-yellow-400/10",
    confirmed: "text-blue-400 bg-blue-400/10",
    shipped: "text-purple-400 bg-purple-400/10",
    completed: "text-green-400 bg-green-400/10",
    cancelled: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>Dashboard</h1>
        <p className="text-white/40 mt-1">Welcome back, Junie! ✨</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className={`glass rounded-2xl p-3 sm:p-4 border border-white/10 bg-gradient-to-br ${card.bg}`}>
            <card.icon className={`w-5 h-5 ${card.color} mb-3`} />
            <p className="text-lg sm:text-2xl font-bold text-white">{card.value}</p>
            <p className="text-white/40 text-xs mt-1">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="glass-dark rounded-2xl p-6 border border-purple-500/20">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Product", href: "/admin/products" },
            { label: "Page Content", href: "/admin/pages" },
            { label: "View Orders", href: "/admin/orders" },
            { label: "Manage Slides", href: "/admin/hero-slides" },
            { label: "View Messages", href: "/admin/messages" },
            { label: "Site Settings", href: "/admin/settings" },
            { label: "Seed Database", action: "seed" },
          ].map((action) => (
            action.action === "seed" ? (
              <button key="seed" onClick={async () => {
                const r = await fetch("/api/seed", { method: "POST" });
                const d = await r.json();
                alert(d.message || d.error);
              }} className="px-4 py-2 rounded-xl glass border border-yellow-500/30 text-yellow-400 text-sm hover:bg-yellow-500/10 transition-all">
                🌱 Seed DB
              </button>
            ) : (
              <a key={action.href} href={action.href} className="px-4 py-2 rounded-xl glass border border-white/10 text-white/70 text-sm hover:text-white hover:border-purple-500/50 transition-all">
                {action.label}
              </a>
            )
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass-dark rounded-2xl border border-purple-500/20 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
        </div>
        {recentOrders.length === 0 ? (
          <div className="p-8 text-center text-white/40">No orders yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  {["Order #", "Customer", "Total", "Status", "Date"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-white/40 text-xs uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentOrders.map((order) => (
                  <tr key={order.orderNumber} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-purple-400 font-mono text-sm">{order.orderNumber}</td>
                    <td className="px-6 py-4 text-white text-sm">{order.customer?.name}</td>
                    <td className="px-6 py-4 text-white text-sm">${order.total?.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.orderStatus] || "text-white/50 bg-white/5"}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/50 text-xs">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
