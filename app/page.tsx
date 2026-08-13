"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Truck, RotateCcw, Star, Zap } from 'lucide-react';
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export default function HomePage() {
  const t = useTranslations();

  const heroBadges = (Array.isArray(t.raw("hero")) ? t.raw("hero") : []) as string[];
  const featuredProducts = (
    Array.isArray(t.raw("featured-products")) ? t.raw("featured-products") : []
  ) as {
    name: string;
    price: number;
    originalPrice: number | null;
    rating: number;
    ratingCount: number;
    isSale: boolean;
    discount: number | null;
    isBestseller: boolean;
    category: string;
    image: string;
  }[];

  const newsletterPerks = (
    Array.isArray(t.raw("newsletter")) ? t.raw("newsletter") : []
  ) as string[];

  const categories = [
    { label: t("categories.tops"), image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cfd08b86e11441c1b58eb295a741e166.jpg", href: "/shop" },
    { label: t("categories.hoodies"), image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8efbbf0a628344888c36691281089bc9.png", href: "/shop" },
    { label: t("categories.bottoms"), image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/052271bbf5fb42bc865cd97b66c148c8.webp", href: "/shop" },
    { label: t("categories.outerwear"), image: "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b26a00cc3fd149e491a99eb754bcd4ce.jpg", href: "/shop" },
  ];

  const trustItems = [
    { icon: Truck, label: t("trust.shipping") },
    { icon: RotateCcw, label: t("trust.returns") },
    { icon: Star, label: t("trust.quality") },
    { icon: Zap, label: t("trust.drops") },
  ];

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(233,69,96,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 bg-[var(--accent)]"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold mb-6"
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                {t("hero.badge")}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.05] mb-6 text-balance"
              >
                {t("hero.headline1")}
                <span className="block text-[var(--primary)]">{t("hero.headline2")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
                className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8 max-w-md text-pretty"
              >
                {t("hero.subtext")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_24px_rgba(233,69,96,0.35)] hover:shadow-[0_0_36px_rgba(255,112,150,0.45)] hover:-translate-y-0.5"
                >
                  {t("hero.cta1")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/sale"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--primary)]/50 hover:bg-[var(--card)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  {t("hero.cta2")}
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.45 }}
                className="flex flex-wrap gap-x-6 gap-y-2"
              >
                {heroBadges.map((badge, i) => (
                  <span key={i} className="text-[var(--muted-foreground)] text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] inline-block" />
                    {badge}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right: Hero image collage */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_8px_64px_rgba(0,0,0,0.5)]">
                  <img
                    src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/5ddedcb0f9634b8e8bd0647ceabe223d.webp"
                    alt="Nova Shop bold streetwear collection"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[var(--background)]/60" />
                </div>
                {/* Floating stat card */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="absolute -bottom-6 -left-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                >
                  <p className="text-[var(--muted-foreground)] text-xs mb-1">{t("hero.statLabel")}</p>
                  <p className="text-[var(--foreground)] text-2xl font-extrabold">12,400+</p>
                  <p className="text-[var(--primary)] text-xs font-semibold">{t("hero.statSub")}</p>
                </motion.div>
                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.75, duration: 0.4 }}
                  className="absolute -top-4 -right-4 bg-[var(--primary)] text-white rounded-2xl px-4 py-3 shadow-[0_0_24px_rgba(233,69,96,0.4)]"
                >
                  <p className="text-xs font-semibold">{t("hero.newBadge")}</p>
                  <p className="text-lg font-extrabold leading-none">{t("hero.newBadgeCount")}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <Reveal>
        <section className="border-y border-[var(--border)] bg-[var(--card)]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
                  </div>
                  <span className="text-[var(--foreground)] text-sm font-medium leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── CATEGORIES ── */}
      <Reveal>
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
                  {t("categories.eyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)] text-balance">
                  {t("categories.heading")}
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-[var(--primary)] text-sm font-semibold hover:gap-2.5 transition-all duration-200"
              >
                {t("categories.viewAll")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map((cat, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <Link
                    href={cat.href}
                    className="group relative aspect-[3/4] rounded-2xl overflow-hidden block border border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-lg leading-tight">{cat.label}</p>
                      <p className="text-white/70 text-xs mt-0.5 flex items-center gap-1">
                        {t("categories.shopLink")}
                        <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── FEATURED PRODUCTS ── */}
      <Reveal>
        <section
          id="featured-products"
          className="py-20 md:py-28 bg-[var(--card)]/40 border-y border-[var(--border)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
                  {t("featured.eyebrow")}
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)] text-balance">
                  {t("featured.heading")}
                </h2>
              </div>
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-[var(--primary)] text-sm font-semibold hover:gap-2.5 transition-all duration-200"
              >
                {t("featured.viewAll")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {featuredProducts.map((product, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <ProductCard
                    product={product}
                    addedLabel={t("product.added")}
                    addToCartLabel={t("product.addToCart")}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </Reveal>

      {/* ── SOCIAL PROOF BANNER ── */}
      <Reveal>
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
              <img
                src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/784a5a6b50034891ba38109393ce6406.png"
                alt="Nova Shop lookbook"
                className="w-full h-72 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8 md:px-16">
                <div className="max-w-lg">
                  <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-3">
                    {t("lookbook.eyebrow")}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 text-balance">
                    {t("lookbook.heading")}
                  </h2>
                  <p className="text-white/70 text-base leading-relaxed mb-6 text-pretty">
                    {t("lookbook.subtext")}
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_20px_rgba(233,69,96,0.4)]"
                  >
                    {t("lookbook.cta")}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── NEWSLETTER ── */}
      <Reveal>
        <section
          id="newsletter"
          className="py-20 md:py-28 bg-[var(--card)]/40 border-t border-[var(--border)]"
        >
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-3">
              {t("newsletter.eyebrow")}
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4 text-balance">
              {t("newsletter.heading")}
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-8 text-pretty">
              {t("newsletter.subtext")}
            </p>

            <ul className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              {newsletterPerks.map((perk, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-[var(--muted-foreground)] text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] flex-shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-3.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                aria-label={t("newsletter.emailLabel")}
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_20px_rgba(233,69,96,0.3)] hover:shadow-[0_0_32px_rgba(255,112,150,0.4)] whitespace-nowrap"
              >
                {t("newsletter.submit")}
              </button>
            </form>
            <p className="text-[var(--muted-foreground)] text-xs mt-4">
              {t("newsletter.disclaimer")}
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
