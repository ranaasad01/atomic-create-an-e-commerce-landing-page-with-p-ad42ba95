"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Tag, ArrowRight } from 'lucide-react';
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { staggerContainer, fadeInUp } from "@/lib/motion";

export default function SalePage() {
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

  const featuredProducts = (
    Array.isArray(t.raw("featured-products")) ? t.raw("featured-products") : []
  ) as typeof allProducts;

  const saleProducts = [...allProducts, ...featuredProducts].filter(
    (p) => p.isSale && p.discount !== null
  );

  const savings = saleProducts.reduce((acc, p) => {
    if (p.originalPrice) return acc + (p.originalPrice - p.price);
    return acc;
  }, 0);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden mb-14 border border-[var(--border)] shadow-[0_8px_48px_rgba(0,0,0,0.4)]">
            <img
              src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/28c5123c9a7147a6b7487527315115ac.jpg"
              alt="Nova Shop Sale"
              className="w-full h-56 md:h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-14">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/40 text-[var(--primary)] text-xs font-semibold mb-4">
                  <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                  {t("sale.badge")}
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-3 text-balance">
                  {t("sale.heading")}
                </h1>
                <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-md text-pretty">
                  {t("sale.subtext")}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal>
          <div className="grid grid-cols-3 gap-4 mb-14">
            {[
              { value: saleProducts.length.toString(), label: t("sale.stat1Label") },
              { value: "Up to 30%", label: t("sale.stat2Label") },
              { value: "$" + savings.toFixed(0) + "+", label: t("sale.stat3Label") },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
              >
                <p className="text-[var(--primary)] text-2xl md:text-3xl font-extrabold mb-1">
                  {stat.value}
                </p>
                <p className="text-[var(--muted-foreground)] text-xs md:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Sale Products */}
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              {t("sale.productsHeading")}
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-[var(--primary)] text-sm font-semibold hover:gap-2.5 transition-all duration-200"
            >
              {t("sale.viewAll")}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {saleProducts.map((product, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <ProductCard
                product={product}
                addedLabel={t("product.added")}
                addToCartLabel={t("product.addToCart")}
              />
            </motion.div>
          ))}
        </motion.div>

        {saleProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[var(--muted-foreground)] text-lg">{t("sale.noItems")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
