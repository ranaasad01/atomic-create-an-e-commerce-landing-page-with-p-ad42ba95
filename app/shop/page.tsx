"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export default function ShopPage() {
  const t = useTranslations();

  const allProducts = (
    Array.isArray(t.raw("product-grid")) ? t.raw("product-grid") : []
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

  const categories = (
    Array.isArray(t.raw("category-filter")) ? t.raw("category-filter") : []
  ) as { label: string; value: string }[];

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = allProducts
    .filter((p) => {
      const matchCat =
        activeCategory === "all" ||
        (activeCategory === "sale" ? p.isSale : p.category === activeCategory);
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Reveal>
          <div className="mb-10">
            <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
              {t("shop.eyebrow")}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-3 text-balance">
              {t("shop.heading")}
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl text-pretty">
              {t("shop.subtext")}
            </p>
          </div>
        </Reveal>

        {/* Filters */}
        <Reveal>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("shop.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                aria-label={t("shop.searchLabel")}
              />
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[var(--muted-foreground)]" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-2 pr-8 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                aria-label={t("shop.sortLabel")}
              >
                <option value="default">{t("shop.sortDefault")}</option>
                <option value="price-asc">{t("shop.sortPriceAsc")}</option>
                <option value="price-desc">{t("shop.sortPriceDesc")}</option>
                <option value="rating">{t("shop.sortRating")}</option>
              </select>
            </div>
          </div>
        </Reveal>

        {/* Category Pills */}
        <Reveal>
          <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={t("shop.categoryLabel")}>
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat.value)}
                className={[
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat.value
                    ? "bg-[var(--primary)] text-white shadow-[0_0_16px_rgba(233,69,96,0.3)]"
                    : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/40",
                ].join(" ")}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Results count */}
        <Reveal>
          <p className="text-[var(--muted-foreground)] text-sm mb-6">
            {filtered.length} {t("shop.resultsLabel")}
          </p>
        </Reveal>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {filtered.map((product, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <ProductCard
                  product={product}
                  addedLabel={t("product.added")}
                  addToCartLabel={t("product.addToCart")}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-24">
            <p className="text-[var(--muted-foreground)] text-lg">{t("shop.noResults")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
