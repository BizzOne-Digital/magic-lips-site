"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Star, Package, X } from "lucide-react";
import toast from "react-hot-toast";
import ImageUploadField from "@/components/admin/ImageUploadField";

interface Variant {
  name: string;
  image?: string;
  stock: number;
}

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  isActive: boolean;
  isBundle?: boolean;
  category: { _id?: string; name: string };
  images: string[];
  variants?: Variant[];
}

interface ProductForm {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  coverImage: string;
  isFeatured: boolean;
  isBundle: boolean;
  variants: Variant[];
}

const emptyForm = (): ProductForm => ({
  name: "",
  description: "",
  price: "",
  stock: "100",
  category: "",
  coverImage: "",
  isFeatured: false,
  isBundle: false,
  variants: [],
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm());
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";
  const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` } as Record<string, string>;

  const load = () => {
    setLoading(true);
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        setProducts(d.products || []);
        setLoading(false);
      });
    fetch("/api/categories")
      .then((r) => r.json())
      .then((d) => setCategories(d.categories || []));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditProduct(null);
    setForm(emptyForm());
    setShowForm(true);
  };

  const openEdit = async (p: Product) => {
    setEditProduct(p);
    setShowForm(true);
    try {
      const res = await fetch(`/api/products/${p.slug}`);
      const data = await res.json();
      const full: Product = data.product || p;
      const categoryId =
        typeof full.category === "object" && full.category?._id
          ? String(full.category._id)
          : "";
      setForm({
        name: full.name || "",
        description: full.description || "",
        price: String(full.price ?? ""),
        stock: String(full.stock ?? 100),
        category: categoryId,
        coverImage: full.images?.[0] || "",
        isFeatured: !!full.isFeatured,
        isBundle: !!full.isBundle,
        variants: (full.variants || []).map((v) => ({
          name: v.name || "",
          image: v.image || "",
          stock: typeof v.stock === "number" ? v.stock : 100,
        })),
      });
    } catch {
      toast.error("Failed to load product details");
    }
  };

  const addVariant = () => {
    setForm({
      ...form,
      variants: [...form.variants, { name: "", image: "", stock: 100 }],
    });
  };

  const updateVariant = (index: number, patch: Partial<Variant>) => {
    setForm({
      ...form,
      variants: form.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    });
  };

  const removeVariant = (index: number) => {
    setForm({
      ...form,
      variants: form.variants.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanVariants = form.variants
      .map((v) => ({
        name: v.name.trim(),
        image: (v.image || "").trim() || undefined,
        stock: Number.isFinite(v.stock) ? v.stock : 100,
      }))
      .filter((v) => v.name);

    if (form.variants.length > 0 && cleanVariants.length === 0) {
      toast.error("Each shade/style needs a name");
      return;
    }

    const images = form.coverImage
      ? [form.coverImage]
      : cleanVariants.find((v) => v.image)?.image
        ? [cleanVariants.find((v) => v.image)!.image as string]
        : [];

    const data = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      stock: parseInt(form.stock, 10) || 0,
      category: form.category || undefined,
      isFeatured: form.isFeatured,
      isBundle: form.isBundle,
      images,
      variants: cleanVariants,
    };

    try {
      const res = editProduct
        ? await fetch(`/api/products/${editProduct.slug}`, {
            method: "PUT",
            headers,
            body: JSON.stringify(data),
          })
        : await fetch("/api/products", {
            method: "POST",
            headers,
            body: JSON.stringify(data),
          });
      if (res.ok) {
        toast.success(editProduct ? "Product updated!" : "Product created!");
        setShowForm(false);
        setEditProduct(null);
        load();
      } else {
        toast.error("Failed to save product");
      }
    } catch {
      toast.error("Error saving product");
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${slug}`, { method: "DELETE", headers });
    toast.success("Product deleted");
    load();
  };

  const inputCls =
    "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-all";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-white/40 text-sm">{products.length} products</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm py-2.5 gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-2xl p-6 border border-purple-500/20"
        >
          <h2 className="text-lg font-semibold text-white mb-5">
            {editProduct ? "Edit" : "New"} Product
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/40 text-xs block mb-1">Name *</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
                required
                placeholder="e.g. Lip Gloss – Tube"
              />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Price (CAD) *</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={inputCls}
                required
              />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Stock (product total)</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="text-white/40 text-xs block mb-1">Category *</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={inputCls}
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id} className="bg-[#0F0A2E]">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="text-white/40 text-xs block mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div className="sm:col-span-2">
              <ImageUploadField
                label="Cover image"
                hint="Main card image (optional if shades have images)"
                value={form.coverImage}
                onChange={(url) => setForm({ ...form, coverImage: url })}
              />
            </div>

            <div className="sm:col-span-2 space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-white font-medium text-sm">Shades / Styles</p>
                  <p className="text-white/35 text-xs">
                    Add selectable options under this product (e.g. Sugar High, Juicy Berry)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addVariant}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 hover:bg-purple-500/30"
                >
                  <Plus className="w-3.5 h-3.5" /> Add shade
                </button>
              </div>

              {form.variants.length === 0 ? (
                <p className="text-white/30 text-xs py-2">
                  No shades yet — product will show without a shade picker.
                </p>
              ) : (
                <div className="space-y-4">
                  {form.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-white/50 text-xs font-medium uppercase tracking-wider">
                          Shade {index + 1}
                        </p>
                        <button
                          type="button"
                          onClick={() => removeVariant(index)}
                          className="p-1.5 rounded-lg text-white/40 hover:text-red-300 hover:bg-red-500/10"
                          aria-label="Remove shade"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-white/40 text-xs block mb-1">Name *</label>
                          <input
                            value={variant.name}
                            onChange={(e) => updateVariant(index, { name: e.target.value })}
                            className={inputCls}
                            placeholder="e.g. Sugar High"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-white/40 text-xs block mb-1">Stock</label>
                          <input
                            type="number"
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariant(index, {
                                stock: parseInt(e.target.value, 10) || 0,
                              })
                            }
                            className={inputCls}
                          />
                        </div>
                      </div>
                      <ImageUploadField
                        label="Shade image"
                        value={variant.image || ""}
                        onChange={(url) => updateVariant(index, { image: url })}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="accent-purple-500"
                />
                <span className="text-white/60 text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isBundle}
                  onChange={(e) => setForm({ ...form, isBundle: e.target.checked })}
                  className="accent-purple-500"
                />
                <span className="text-white/60 text-sm">Bundle</span>
              </label>
            </div>
            <div className="sm:col-span-2 flex gap-3">
              <button type="submit" className="btn-primary text-sm py-2.5">
                Save Product
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl glass border border-white/10 text-white/60 text-sm hover:text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="glass-dark rounded-2xl border border-purple-500/20 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-white/40">Loading...</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-white/20 mx-auto mb-3" />
            <p className="text-white/40">
              No products yet. Add your first product or seed the database.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-white/10">
                <tr>
                  {["Product", "Category", "Shades", "Price", "Stock", "Featured", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-white/40 text-xs uppercase tracking-wider"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-900/40 flex items-center justify-center text-xl overflow-hidden">
                          {p.images?.[0] ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.images[0]}
                              alt=""
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            "💄"
                          )}
                        </div>
                        <p className="text-white font-medium text-sm">{p.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/50 text-sm">{p.category?.name}</td>
                    <td className="px-5 py-4 text-white/50 text-sm">
                      {p.variants?.length ? `${p.variants.length} shades` : "—"}
                    </td>
                    <td className="px-5 py-4 text-white text-sm font-mono">${p.price}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-sm ${
                          p.stock > 10
                            ? "text-green-400"
                            : p.stock > 0
                              ? "text-yellow-400"
                              : "text-red-400"
                        }`}
                      >
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      {p.isFeatured && (
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 rounded-lg glass hover:bg-purple-500/20 text-white/50 hover:text-purple-400 transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.slug)}
                          className="p-1.5 rounded-lg glass hover:bg-red-500/20 text-white/50 hover:text-red-400 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
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
