"use client";
import { useEffect, useState } from "react";
import { FileText, Save, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import {
  PAGE_CONTENT_DEFAULTS,
  PageKey,
  OfferCardContent,
  ValueItem,
} from "@/lib/pageContentDefaults";

const TABS: { key: PageKey; label: string }[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "contact", label: "Contact" },
  { key: "offers", label: "Offers" },
];

const BG_OPTIONS = [
  { value: "bg-[#F0ECFB]", label: "Lavender" },
  { value: "bg-[#FCE7F3]", label: "Pink" },
  { value: "bg-[#DBEAFE]", label: "Blue" },
  { value: "bg-[#FEF3C7]", label: "Cream" },
];

export default function AdminPagesContentPage() {
  const [tab, setTab] = useState<PageKey>("home");
  const [pages, setPages] = useState<Record<PageKey, Record<string, unknown>>>({
    home: { ...PAGE_CONTENT_DEFAULTS.home },
    about: { ...PAGE_CONTENT_DEFAULTS.about },
    contact: { ...PAGE_CONTENT_DEFAULTS.contact },
    offers: { ...PAGE_CONTENT_DEFAULTS.offers },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : "";

  useEffect(() => {
    fetch("/api/page-content")
      .then((r) => r.json())
      .then((d) => {
        if (d.pages) {
          setPages({
            home: { ...PAGE_CONTENT_DEFAULTS.home, ...d.pages.home },
            about: { ...PAGE_CONTENT_DEFAULTS.about, ...d.pages.about },
            contact: { ...PAGE_CONTENT_DEFAULTS.contact, ...d.pages.contact },
            offers: { ...PAGE_CONTENT_DEFAULTS.offers, ...d.pages.offers },
          });
        }
      })
      .catch(() => toast.error("Failed to load page content"))
      .finally(() => setLoading(false));
  }, []);

  const content = pages[tab];

  const setField = (key: string, value: unknown) => {
    setPages((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [key]: value },
    }));
  };

  const str = (key: string) => String(content[key] ?? "");

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/page-content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ pageKey: tab, content: pages[tab] }),
      });
      if (res.ok) {
        const data = await res.json();
        setPages((prev) => ({ ...prev, [tab]: data.content }));
        toast.success(`${TABS.find((t) => t.key === tab)?.label} page saved!`);
      } else toast.error("Failed to save");
    } catch {
      toast.error("Error saving");
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-400 transition-all";
  const labelCls = "text-white/40 text-xs block mb-1";

  const textField = (key: string, label: string, rows = 1) => (
    <div className={rows > 1 ? "sm:col-span-2" : ""}>
      <label className={labelCls}>{label}</label>
      {rows > 1 ? (
        <textarea
          value={str(key)}
          onChange={(e) => setField(key, e.target.value)}
          rows={rows}
          className={`${inputCls} resize-none`}
        />
      ) : (
        <input
          value={str(key)}
          onChange={(e) => setField(key, e.target.value)}
          className={inputCls}
        />
      )}
    </div>
  );

  const values = (content.values as ValueItem[]) || [];
  const cards = (content.cards as OfferCardContent[]) || [];

  if (loading) {
    return <div className="p-8 text-center text-white/40">Loading page content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-400" /> Page Content
          </h1>
          <p className="text-white/40 text-sm">
            Edit text that appears on each public page. Changes show on the live site after save.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary text-sm py-2.5 gap-2 disabled:opacity-50 self-start"
        >
          <Save className="w-4 h-4" /> {saving ? "Saving..." : `Save ${TABS.find((t) => t.key === tab)?.label}`}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              tab === t.key
                ? "bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-purple-500/40 text-white"
                : "glass border border-white/10 text-white/50 hover:text-white"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="glass-dark rounded-2xl p-6 border border-purple-500/20 space-y-6">
        {tab === "home" && (
          <>
            <h2 className="text-white font-semibold">Hero</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("heroTitle", "Headline")}
              {textField("heroCtaText", "Button text")}
              {textField("heroSubtitle", "Supporting text", 3)}
              {textField("heroCtaLink", "Button link (e.g. /shop)")}
            </div>
            <h2 className="text-white font-semibold pt-2 border-t border-white/10">Newsletter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("newsletterTitle", "Title")}
              {textField("newsletterSubtitle", "Subtitle", 2)}
            </div>
            <h2 className="text-white font-semibold pt-2 border-t border-white/10">Home Offers + Contact blocks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("offersTitle", "Offers section title")}
              {textField("offersSubtitle", "Offers section subtitle")}
              {textField("contactTitle", "Contact section title")}
              {textField("contactSubtitle", "Contact section subtitle")}
              {textField("contactIntro", "Contact intro text", 2)}
              {textField("footerTagline", "Footer tagline", 2)}
            </div>
          </>
        )}

        {tab === "about" && (
          <>
            <h2 className="text-white font-semibold">Page header</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("title", "Page title")}
              {textField("tagline", "Tagline")}
              {textField("intro", "Intro paragraph", 3)}
            </div>
            <h2 className="text-white font-semibold pt-2 border-t border-white/10">Founder / Story</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("founderLabel", "Small label")}
              {textField("founderTitle", "Story headline")}
              {textField("founderBody", "Story body", 5)}
              {textField("quoteName", "Quote name")}
              {textField("quoteText", "Quote text", 2)}
            </div>
            <h2 className="text-white font-semibold pt-2 border-t border-white/10">Values</h2>
            {textField("valuesTitle", "Values section title")}
            <div className="space-y-3">
              {values.map((v, i) => (
                <div key={i} className="rounded-xl border border-white/10 p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelCls}>Title</label>
                    <input
                      value={v.title}
                      onChange={(e) => {
                        const next = [...values];
                        next[i] = { ...next[i], title: e.target.value };
                        setField("values", next);
                      }}
                      className={inputCls}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className={labelCls}>Description</label>
                      <input
                        value={v.description}
                        onChange={(e) => {
                          const next = [...values];
                          next[i] = { ...next[i], description: e.target.value };
                          setField("values", next);
                        }}
                        className={inputCls}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setField("values", values.filter((_, idx) => idx !== i))}
                      className="self-end p-2.5 rounded-lg text-white/40 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setField("values", [...values, { title: "", description: "" }])}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
              >
                <Plus className="w-3.5 h-3.5" /> Add value
              </button>
            </div>
            <h2 className="text-white font-semibold pt-2 border-t border-white/10">Bottom CTA</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("ctaTitle", "CTA title")}
              {textField("ctaButtonText", "CTA button text")}
              {textField("ctaSubtitle", "CTA subtitle", 2)}
            </div>
          </>
        )}

        {tab === "contact" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {textField("title", "Page title")}
            {textField("subtitle", "Page subtitle")}
            {textField("sectionTitle", "Form section title")}
            {textField("sectionSubtitle", "Form section subtitle")}
            {textField("intro", "Intro text beside form", 3)}
            <p className="sm:col-span-2 text-white/35 text-xs">
              Phone, email, and address are edited under <strong className="text-white/50">Settings</strong>.
            </p>
          </div>
        )}

        {tab === "offers" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {textField("title", "Page title")}
              {textField("subtitle", "Page subtitle")}
            </div>
            <h2 className="text-white font-semibold pt-2 border-t border-white/10">Offer cards</h2>
            <div className="space-y-4">
              {cards.map((card, i) => (
                <div key={i} className="rounded-xl border border-white/10 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white/50 text-xs uppercase tracking-wider">Card {i + 1}</p>
                    <button
                      type="button"
                      onClick={() => setField("cards", cards.filter((_, idx) => idx !== i))}
                      className="p-1.5 rounded-lg text-white/40 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(
                      [
                        ["badge", "Badge"],
                        ["title", "Title"],
                        ["cta", "Button text"],
                        ["link", "Button link (blank = open subscribe modal)"],
                      ] as const
                    ).map(([key, label]) => (
                      <div key={key}>
                        <label className={labelCls}>{label}</label>
                        <input
                          value={card[key]}
                          onChange={(e) => {
                            const next = [...cards];
                            next[i] = { ...next[i], [key]: e.target.value };
                            setField("cards", next);
                          }}
                          className={inputCls}
                        />
                      </div>
                    ))}
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Description</label>
                      <textarea
                        value={card.description}
                        onChange={(e) => {
                          const next = [...cards];
                          next[i] = { ...next[i], description: e.target.value };
                          setField("cards", next);
                        }}
                        rows={2}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={labelCls}>Details (one per line)</label>
                      <textarea
                        value={card.details}
                        onChange={(e) => {
                          const next = [...cards];
                          next[i] = { ...next[i], details: e.target.value };
                          setField("cards", next);
                        }}
                        rows={3}
                        className={`${inputCls} resize-none`}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Card color</label>
                      <select
                        value={card.bg}
                        onChange={(e) => {
                          const next = [...cards];
                          next[i] = { ...next[i], bg: e.target.value };
                          setField("cards", next);
                        }}
                        className={inputCls}
                      >
                        {BG_OPTIONS.map((o) => (
                          <option key={o.value} value={o.value} className="bg-[#0F0A2E]">
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setField("cards", [
                    ...cards,
                    {
                      badge: "New Offer",
                      title: "Offer title",
                      description: "Describe this offer.",
                      details: "Benefit one\nBenefit two",
                      cta: "Shop Now",
                      link: "/shop",
                      bg: "bg-[#F0ECFB]",
                    },
                  ])
                }
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30"
              >
                <Plus className="w-3.5 h-3.5" /> Add offer card
              </button>
            </div>
            <p className="text-white/35 text-xs">
              Coupon codes / discount rules are still managed under <strong className="text-white/50">Offers</strong> in the sidebar.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
