"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, ShoppingCart, Heart, Share2, Truck, RotateCcw, Shield, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { useTranslations } from "next-intl";
import { staggerContainer, fadeInUp } from "@/lib/motion";

const BASE = "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/";

const product = {
  name: "Nova Oversized Hoodie",
  price: 89,
  originalPrice: 119,
  rating: 4.8,
  ratingCount: 247,
  isSale: true,
  discount: 25,
  isBestseller: true,
  category: "hoodies",
  description:
    "The Nova Oversized Hoodie is crafted from a premium 400gsm cotton-polyester blend for that perfect weight and drape. Featuring a relaxed silhouette, kangaroo pocket, and ribbed cuffs, this hoodie is built for all-day comfort without sacrificing style. Available in a range of bold colorways to match your vibe.",
  images: [
    BASE + "8efbbf0a628344888c36691281089bc9.png",
    BASE + "cfd08b86e11441c1b58eb295a741e166.jpg",
    BASE + "052271bbf5fb42bc865cd97b66c148c8.webp",
    BASE + "b26a00cc3fd149e491a99eb754bcd4ce.jpg",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Midnight", hex: "#1a1a2e" },
    { name: "Crimson", hex: "#e94560" },
    { name: "Slate", hex: "#4a4a6a" },
    { name: "Ivory", hex: "#f5f5f5" },
  ],
};

const relatedProducts = [
  {
    name: "Oversized Graphic Tee",
    price: 44,
    originalPrice: 55,
    rating: 4.7,
    ratingCount: 189,
    isSale: true,
    discount: 20,
    isBestseller: false,
    category: "tops",
    image: BASE + "cfd08b86e11441c1b58eb295a741e166.jpg",
  },
  {
    name: "Cargo Wide-Leg Pants",
    price: 72,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 134,
    isSale: false,
    discount: null,
    isBestseller: true,
    category: "bottoms",
    image: BASE + "052271bbf5fb42bc865cd97b66c148c8.webp",
  },
  {
    name: "Puffer Bomber Jacket",
    price: 129,
    originalPrice: 159,
    rating: 4.9,
    ratingCount: 302,
    isSale: true,
    discount: 19,
    isBestseller: true,
    category: "outerwear",
    image: BASE + "b26a00cc3fd149e491a99eb754bcd4ce.jpg",
  },
  {
    name: "Ribbed Knit Crewneck",
    price: 58,
    originalPrice: null,
    rating: 4.5,
    ratingCount: 97,
    isSale: false,
    discount: null,
    isBestseller: false,
    category: "hoodies",
    image: BASE + "8efbbf0a628344888c36691281089bc9.png",
  },
];

const reviews = [
  {
    name: "Jordan M.",
    rating: 5,
    date: "Nov 12, 2024",
    comment:
      "Absolutely love this hoodie. The weight is perfect — not too heavy, not too light. Fits exactly as described and the color is even better in person. Already ordered a second one.",
  },
  {
    name: "Priya S.",
    rating: 5,
    date: "Oct 28, 2024",
    comment:
      "Best hoodie I've bought in years. The fabric feels premium and it's held up perfectly after multiple washes. The oversized fit is chef's kiss. Highly recommend sizing down if you want a more fitted look.",
  },
  {
    name: "Alex T.",
    rating: 4,
    date: "Oct 14, 2024",
    comment:
      "Really solid quality for the price. Shipping was fast and the packaging was nice. Only minor note is the kangaroo pocket runs a bit small, but that's a minor thing. Would buy again.",
  },
];

function StarRow({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sz = size === "md" ? "w-5 h-5" : "w-4 h-4";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`${sz} ${
            n <= Math.round(rating)
              ? "text-amber-400 fill-amber-400"
              : "text-[var(--border)] fill-[var(--border)]"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const t = useTranslations();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  function handleAddToCart() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function prevImage() {
    setActiveImage((i) => (i === 0 ? product.images.length - 1 : i - 1));
  }

  function nextImage() {
    setActiveImage((i) => (i === product.images.length - 1 ? 0 : i + 1));
  }

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <Reveal>
          <nav className="flex items-center gap-2 text-xs text-[var(--muted-foreground)] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link href="/shop" className="hover:text-[var(--foreground)] transition-colors">Shop</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <Link href="/shop" className="hover:text-[var(--foreground)] transition-colors capitalize">{product.category}</Link>
            <ChevronRight className="w-3 h-3" aria-hidden="true" />
            <span className="text-[var(--foreground)] font-medium truncate max-w-[160px]">{product.name}</span>
          </nav>
        </Reveal>

        {/* ── HERO: Image Gallery + Product Info ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 mb-20">

          {/* Left: Image Gallery */}
          <Reveal>
            <div className="flex flex-col gap-4">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[var(--card)] border border-[var(--border)] shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
                <img
                  src={product.images[activeImage]}
                  alt={`${product.name} — view ${activeImage + 1}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      BASE + "fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                  }}
                />
                {/* Nav arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--background)]/80 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[var(--background)]/80 backdrop-blur-sm border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[var(--background)]/80 backdrop-blur-sm text-[var(--foreground)] text-xs font-medium">
                  {activeImage + 1} / {product.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`relative flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                      activeImage === i
                        ? "border-[var(--primary)] shadow-[0_0_12px_rgba(233,69,96,0.35)]"
                        : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          BASE + "fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Right: Product Info */}
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {product.isSale && product.discount && (
                  <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                    -{product.discount}% OFF
                  </span>
                )}
                {product.isBestseller && (
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold">
                    Bestseller
                  </span>
                )}
                <span className="px-3 py-1 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] text-xs font-medium capitalize">
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight text-balance">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <StarRow rating={product.rating} size="md" />
                <span className="text-[var(--foreground)] font-semibold text-sm">{product.rating}</span>
                <span className="text-[var(--muted-foreground)] text-sm">({product.ratingCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-[var(--foreground)]">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-[var(--muted-foreground)] line-through">${product.originalPrice}</span>
                )}
                {product.isSale && product.originalPrice && (
                  <span className="text-sm font-semibold text-green-400">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-[var(--border)]" />

              {/* Color Selector */}
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)] mb-3">
                  Color: <span className="text-[var(--muted-foreground)] font-normal">{selectedColor}</span>
                </p>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      aria-label={`Select color ${color.name}`}
                      className={`w-9 h-9 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                        selectedColor === color.name
                          ? "border-[var(--primary)] shadow-[0_0_0_3px_rgba(233,69,96,0.25)]"
                          : "border-[var(--border)] hover:border-[var(--muted-foreground)]"
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <Check
                          className={`w-4 h-4 ${
                            color.hex === "#f5f5f5" ? "text-[#1a1a2e]" : "text-white"
                          }`}
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    Size: <span className="text-[var(--muted-foreground)] font-normal">{selectedSize || "Select a size"}</span>
                  </p>
                  <button className="text-xs text-[var(--primary)] hover:underline transition-colors">
                    Size guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-[var(--primary)] border-[var(--primary)] text-white shadow-[0_0_12px_rgba(233,69,96,0.3)]"
                          : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--muted-foreground)]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)] mb-3">Quantity</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-all duration-200 text-lg font-bold"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-[var(--foreground)] font-bold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-10 h-10 rounded-xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-all duration-200 text-lg font-bold"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all duration-300 ${
                    added
                      ? "bg-green-500 text-white"
                      : "bg-[var(--primary)] text-white hover:bg-[var(--accent)] shadow-[0_4px_24px_rgba(233,69,96,0.35)] hover:shadow-[0_4px_32px_rgba(233,69,96,0.5)]"
                  }`}
                >
                  {added ? (
                    <><Check className="w-5 h-5" aria-hidden="true" /> Added to Cart!</>
                  ) : (
                    <><ShoppingCart className="w-5 h-5" aria-hidden="true" /> Add to Cart</>  
                  )}
                </motion.button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setWishlisted((w) => !w)}
                    className={`flex-1 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all duration-200 ${
                      wishlisted
                        ? "bg-[var(--primary)]/15 border-[var(--primary)] text-[var(--primary)]"
                        : "bg-[var(--card)] border-[var(--border)] text-[var(--foreground)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${wishlisted ? "fill-[var(--primary)]" : ""}`}
                      aria-hidden="true"
                    />
                    {wishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </button>
                  <button
                    className="px-4 py-3.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--muted-foreground)] transition-all duration-200"
                    aria-label="Share product"
                  >
                    <Share2 className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Trust Row */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, label: "Free shipping over $50" },
                  { icon: RotateCcw, label: "30-day returns" },
                  { icon: Shield, label: "Secure checkout" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] text-center"
                  >
                    <Icon className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
                    <span className="text-[var(--muted-foreground)] text-xs leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── DESCRIPTION & REVIEWS ── */}
        <Reveal>
          <div className="mb-20">
            {/* Tabs */}
            <div className="flex gap-1 mb-8 border-b border-[var(--border)]">
              {(["description", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-semibold capitalize transition-all duration-200 border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-[var(--primary)] text-[var(--primary)]"
                      : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab === "reviews" ? `Reviews (${reviews.length})` : tab}
                </button>
              ))}
            </div>

            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.2)]"
              >
                <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Product Description</h2>
                <p className="text-[var(--muted-foreground)] leading-relaxed text-base">{product.description}</p>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Material", value: "400gsm Cotton-Poly Blend" },
                    { label: "Fit", value: "Oversized" },
                    { label: "Care", value: "Machine wash cold" },
                    { label: "Origin", value: "Ethically made" },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 rounded-xl bg-[var(--background)] border border-[var(--border)]">
                      <p className="text-[var(--muted-foreground)] text-xs mb-1">{label}</p>
                      <p className="text-[var(--foreground)] text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                {/* Rating Summary */}
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-6 flex items-center gap-8 shadow-[0_2px_16px_rgba(0,0,0,0.2)]">
                  <div className="text-center">
                    <p className="text-5xl font-extrabold text-[var(--foreground)] leading-none mb-1">
                      {avgRating.toFixed(1)}
                    </p>
                    <StarRow rating={avgRating} size="md" />
                    <p className="text-[var(--muted-foreground)] text-xs mt-1">{reviews.length} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = reviews.filter((r) => r.rating === star).length;
                      const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                      return (
                        <div key={star} className="flex items-center gap-3">
                          <span className="text-xs text-[var(--muted-foreground)] w-4 text-right">{star}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" aria-hidden="true" />
                          <div className="flex-1 h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                            <div
                              className="h-full rounded-full bg-amber-400 transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-[var(--muted-foreground)] w-4">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Review Cards */}
                <div className="space-y-4">
                  {reviews.map((review, i) => (
                    <div
                      key={i}
                      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-sm">
                            {review.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-[var(--foreground)] font-semibold text-sm">{review.name}</p>
                            <p className="text-[var(--muted-foreground)] text-xs">{review.date}</p>
                          </div>
                        </div>
                        <StarRow rating={review.rating} />
                      </div>
                      <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </Reveal>

        {/* ── RELATED PRODUCTS ── */}
        <Reveal>
          <div>
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-1">More to Explore</p>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[var(--foreground)]">You May Also Like</h2>
              </div>
              <Link
                href="/shop"
                className="text-sm font-semibold text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
              >
                View all
              </Link>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            >
              {relatedProducts.map((rp, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <ProductCard product={rp} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
