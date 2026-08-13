"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const PRODUCTS_PER_PAGE = 12;

const SIDEBAR_CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Tops", value: "Tops" },
  { label: "Hoodies", value: "Hoodies" },
  { label: "Bottoms", value: "Bottoms" },
  { label: "Outerwear", value: "Outerwear" },
  { label: "Sale", value: "sale" },
];

const RATING_OPTIONS = [
  { label: "4★ & up", value: 4 },
  { label: "3★ & up", value: 3 },
  { label: "2★ & up", value: 2 },
  { label: "All Ratings", value: 0 },
];

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

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const resetFilters = useCallback(() => {
    setActiveCategory("all");
    setPriceRange(500);
    setMinRating(0);
    setSearchQuery("");
    setSortBy("default");
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
    setCurrentPage(1);
  };

  const handlePriceChange = (value: number) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const handleRatingChange = (value: number) => {
    setMinRating(value);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const filtered = allProducts
    .filter((p) => {
      const matchCat =
        activeCategory === "all" ||
        (activeCategory === "sale" ? p.isSale : p.category === activeCategory);
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice = p.price <= priceRange;
      const matchRating = minRating === 0 || p.rating >= minRating;
      return matchCat && matchSearch && matchPrice && matchRating;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedProducts = filtered.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  const SidebarContent = () => (
    <div className="space-y-8">
      {/* Heading + Reset */}
      <div className="flex items-center justify-between">
        <h2 className="text-[var(--foreground)] font-bold text-base">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-[var(--primary)] text-xs font-semibold hover:text-[var(--accent)] transition-colors"
        >
          Reset all
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-[var(--foreground)] font-semibold text-sm mb-3">Price Range</h3>
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-2">
          <span>$0</span>
          <span className="text-[var(--foreground)] font-semibold">${priceRange}</span>
        </div>
        <input
          type="range"
          min={0}
          max={500}
          step={10}
          value={priceRange}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(priceRange / 500) * 100}%, var(--border) ${(priceRange / 500) * 100}%, var(--border) 100%)`,
          }}
          aria-label="Maximum price"
        />
        <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mt-1">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      {/* Category */}
      <div>
        <h3 className="text-[var(--foreground)] font-semibold text-sm mb-3">Category</h3>
        <ul className="space-y-2">
          {SIDEBAR_CATEGORIES.map((cat) => (
            <li key={cat.value}>
              <label className="flex items-center gap-3 cursor-pointer group">
                <span
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.value
                      ? "bg-[var(--primary)] border-[var(--primary)]"
                      : "border-[var(--border)] group-hover:border-[var(--primary)]/60"
                  }`}
                  role="checkbox"
                  aria-checked={activeCategory === cat.value}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleCategoryChange(cat.value)}
                >
                  {activeCategory === cat.value && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 10">
                      <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`text-sm transition-colors cursor-pointer ${
                    activeCategory === cat.value
                      ? "text-[var(--foreground)] font-semibold"
                      : "text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]"
                  }`}
                >
                  {cat.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-[var(--foreground)] font-semibold text-sm mb-3">Rating</h3>
        <div className="space-y-2">
          {RATING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleRatingChange(opt.value)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                minRating === opt.value
                  ? "bg-[var(--primary)]/15 border border-[var(--primary)]/40 text-[var(--foreground)] font-semibold"
                  : "border border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]"
              }`}
            >
              <Star
                className={`w-3.5 h-3.5 ${
                  minRating === opt.value ? "text-amber-400 fill-amber-400" : "text-amber-400/50"
                }`}
                aria-hidden="true"
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

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

        {/* Top bar: Search + Sort + Mobile Filter Button */}
        <Reveal>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm font-medium hover:border-[var(--primary)]/50 transition-colors"
              aria-label="Show filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
              Show Filters
              {(activeCategory !== "all" || priceRange < 500 || minRating > 0) && (
                <span className="ml-1 w-2 h-2 rounded-full bg-[var(--primary)] inline-block" />
              )}
            </button>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={t("shop.searchPlaceholder")}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                aria-label={t("shop.searchLabel")}
              />
            </div>

            {/* Sort */}
            <div className="relative flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="pl-4 pr-8 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors appearance-none cursor-pointer"
                aria-label={t("shop.sortLabel")}
              >
                <option value="default">{t("shop.sortDefault")}</option>
                <option value="price-asc">{t("shop.sortPriceAsc")}</option>
                <option value="price-desc">{t("shop.sortPriceDesc")}</option>
                <option value="rating">{t("shop.sortRating")}</option>
              </select>
              <SlidersHorizontal
                className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--muted-foreground)] pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Results count */}
            <div className="flex items-center ml-auto">
              <p className="text-[var(--muted-foreground)] text-sm">
                <span className="text-[var(--foreground)] font-semibold">{filtered.length}</span>{" "}
                {t("shop.resultsLabel")}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Two-column layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-28">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
              <SidebarContent />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[var(--muted-foreground)] text-lg">{t("shop.noResults")}</p>
                <button
                  onClick={resetFilters}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <motion.div
                  key={`${activeCategory}-${sortBy}-${searchQuery}-${priceRange}-${minRating}-${safePage}`}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {paginatedProducts.map((product, i) => (
                    <motion.div key={`${product.name}-${i}`} variants={fadeInUp}>
                      <ProductCard
                        product={product}
                        addToCartLabel={t("product.addToCart")}
                        addedLabel={t("product.added")}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-12">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)]/50 transition-all duration-200"
                      aria-label="Previous page"
                    >
                      <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                      Previous
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-200 ${
                            safePage === page
                              ? "bg-[var(--primary)] text-white shadow-[0_0_12px_rgba(233,69,96,0.4)]"
                              : "bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--primary)]/50"
                          }`}
                          aria-label={`Page ${page}`}
                          aria-current={safePage === page ? "page" : undefined}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-[var(--primary)]/50 transition-all duration-200"
                      aria-label="Next page"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in panel */}
            <motion.div
              key="sidebar-panel"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-[var(--background)] border-r border-[var(--border)] shadow-[4px_0_32px_rgba(0,0,0,0.4)] overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
                <span className="text-[var(--foreground)] font-bold text-base">Filters</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="p-5">
                <SidebarContent />
              </div>
              <div className="p-5 border-t border-[var(--border)]">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="w-full py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-colors"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
