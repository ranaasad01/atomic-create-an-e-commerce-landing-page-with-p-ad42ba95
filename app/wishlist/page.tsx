"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

interface WishlistItem {
  id: number;
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
}

const INITIAL_ITEMS: WishlistItem[] = [
  {
    id: 1,
    name: "Nova Oversized Hoodie",
    price: 89,
    originalPrice: 119,
    rating: 4.8,
    ratingCount: 247,
    isSale: true,
    discount: 25,
    isBestseller: true,
    category: "hoodies",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8efbbf0a628344888c36691281089bc9.png",
  },
  {
    id: 2,
    name: "Bold Graphic Tee",
    price: 34,
    originalPrice: null,
    rating: 4.5,
    ratingCount: 183,
    isSale: false,
    discount: null,
    isBestseller: false,
    category: "tops",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cfd08b86e11441c1b58eb295a741e166.jpg",
  },
  {
    id: 3,
    name: "Street Cargo Pants",
    price: 79,
    originalPrice: 99,
    rating: 4.6,
    ratingCount: 129,
    isSale: true,
    discount: 20,
    isBestseller: false,
    category: "bottoms",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/052271bbf5fb42bc865cd97b66c148c8.webp",
  },
  {
    id: 4,
    name: "Urban Puffer Jacket",
    price: 149,
    originalPrice: 199,
    rating: 4.9,
    ratingCount: 312,
    isSale: true,
    discount: 25,
    isBestseller: true,
    category: "outerwear",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/b26a00cc3fd149e491a99eb754bcd4ce.jpg",
  },
  {
    id: 5,
    name: "Classic Crewneck",
    price: 59,
    originalPrice: null,
    rating: 4.4,
    ratingCount: 95,
    isSale: false,
    discount: null,
    isBestseller: false,
    category: "hoodies",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg",
  },
  {
    id: 6,
    name: "Slim Fit Chinos",
    price: 69,
    originalPrice: 89,
    rating: 4.3,
    ratingCount: 74,
    isSale: true,
    discount: 22,
    isBestseller: false,
    category: "bottoms",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/28c5123c9a7147a6b7487527315115ac.jpg",
  },
];

const RECOMMENDATION_ITEMS: WishlistItem[] = [
  {
    id: 101,
    name: "Relaxed Linen Shirt",
    price: 55,
    originalPrice: 75,
    rating: 4.7,
    ratingCount: 158,
    isSale: true,
    discount: 27,
    isBestseller: false,
    category: "tops",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cfd08b86e11441c1b58eb295a741e166.jpg",
  },
  {
    id: 102,
    name: "Fleece Zip-Up Hoodie",
    price: 74,
    originalPrice: null,
    rating: 4.6,
    ratingCount: 211,
    isSale: false,
    discount: null,
    isBestseller: true,
    category: "hoodies",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8efbbf0a628344888c36691281089bc9.png",
  },
  {
    id: 103,
    name: "Tapered Track Pants",
    price: 64,
    originalPrice: 84,
    rating: 4.5,
    ratingCount: 93,
    isSale: true,
    discount: 24,
    isBestseller: false,
    category: "bottoms",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/052271bbf5fb42bc865cd97b66c148c8.webp",
  },
];

export default function WishlistPage() {
  const t = useTranslations();
  const [items, setItems] = useState<WishlistItem[]>(INITIAL_ITEMS);
  const [movedToCart, setMovedToCart] = useState<Set<number>>(new Set());

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setMovedToCart((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function moveToCart(id: number) {
    setMovedToCart((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setItems((prev) => prev.filter((item) => item.id !== id));
      setMovedToCart((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 1500);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HERO SECTION ── */}
        <Reveal>
          <div className="relative mb-14">
            {/* Background glow */}
            <div
              aria-hidden="true"
              className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl opacity-10 bg-[var(--primary)] pointer-events-none"
            />
            <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-3">
                  Your Wishlist
                </p>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.05] mb-4 text-balance">
                  Saved{" "}
                  <span className="text-[var(--primary)]">Items</span>
                </h1>
                <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-lg text-pretty">
                  Everything you loved but haven't grabbed yet. Your curated
                  picks are waiting.
                </p>
              </div>

              {/* Item count badge + decorative heart */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
                  <Heart
                    className="w-5 h-5 text-[var(--primary)] fill-[var(--primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-[var(--foreground)] text-2xl font-extrabold leading-none">
                      {items.length}
                    </p>
                    <p className="text-[var(--muted-foreground)] text-xs mt-0.5">
                      {items.length === 1 ? "saved item" : "saved items"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── WISHLIST GRID SECTION ── */}
        <section aria-label="Wishlist items" className="mb-24">
          {items.length === 0 ? (
            <Reveal>
              <div className="flex flex-col items-center justify-center py-28 text-center">
                <div className="w-20 h-20 rounded-full bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                  <Heart
                    className="w-9 h-9 text-[var(--muted-foreground)]"
                    aria-hidden="true"
                  />
                </div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">
                  Your wishlist is empty
                </h2>
                <p className="text-[var(--muted-foreground)] text-base mb-8 max-w-sm">
                  Start saving pieces you love and come back to them anytime.
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_16px_rgba(233,69,96,0.35)]"
                >
                  <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                  Browse Collection
                </Link>
              </div>
            </Reveal>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {items.map((item) => {
                  const isMoving = movedToCart.has(item.id);
                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 16 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -12 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="group relative bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_32px_-8px_rgba(233,69,96,0.22)] hover:border-[var(--primary)]/40 transition-all duration-300"
                    >
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-[3/4] bg-[var(--background)]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                          {item.isSale && item.discount && (
                            <span className="px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                              -{item.discount}%
                            </span>
                          )}
                          {item.isBestseller && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] text-xs mb-2 capitalize">
                          {item.category}
                        </span>
                        <h3 className="text-[var(--foreground)] font-semibold text-sm leading-snug mb-2">
                          {item.name}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          <Star
                            className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                            aria-hidden="true"
                          />
                          <span className="text-[var(--foreground)] text-xs font-medium">
                            {item.rating}
                          </span>
                          <span className="text-[var(--muted-foreground)] text-xs">
                            ({item.ratingCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-[var(--foreground)] font-bold text-base">
                            ${item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-[var(--muted-foreground)] text-sm line-through">
                              ${item.originalPrice}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={() => moveToCart(item.id)}
                            disabled={isMoving}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                              isMoving
                                ? "bg-green-500 text-white cursor-default"
                                : "bg-[var(--primary)] text-white hover:bg-[var(--accent)]"
                            }`}
                            aria-label={`Move ${item.name} to cart`}
                          >
                            <ShoppingCart
                              className="w-4 h-4"
                              aria-hidden="true"
                            />
                            {isMoving ? "Added!" : "Move to Cart"}
                          </motion.button>

                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeItem(item.id)}
                            className="p-2.5 rounded-xl border border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
                            aria-label={`Remove ${item.name} from wishlist`}
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </section>

        {/* ── RECOMMENDATIONS SECTION ── */}
        <section aria-label="Recommended products">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
                  Curated for You
                </p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-2 text-balance">
                  You Might Also Like
                </h2>
                <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md text-pretty">
                  Based on your saved items, we think you'll love these picks
                  too.
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-200 flex-shrink-0"
              >
                Browse Full Collection
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {RECOMMENDATION_ITEMS.map((item, idx) => (
              <Reveal key={item.id} delay={idx * 0.08}>
                <div className="group relative bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_32px_-8px_rgba(233,69,96,0.22)] hover:border-[var(--primary)]/40 transition-all duration-300">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[3/4] bg-[var(--background)]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                      {item.isSale && item.discount && (
                        <span className="px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                          -{item.discount}%
                        </span>
                      )}
                      {item.isBestseller && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
                          Bestseller
                        </span>
                      )}
                    </div>

                    {/* Hover CTA */}
                    <Link
                      href="/shop"
                      className="absolute bottom-3 left-3 right-3 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold flex items-center justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                      Add to Cart
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] text-xs mb-2 capitalize">
                      {item.category}
                    </span>
                    <h3 className="text-[var(--foreground)] font-semibold text-sm leading-snug mb-2">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star
                        className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                        aria-hidden="true"
                      />
                      <span className="text-[var(--foreground)] text-xs font-medium">
                        {item.rating}
                      </span>
                      <span className="text-[var(--muted-foreground)] text-xs">
                        ({item.ratingCount})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--foreground)] font-bold text-base">
                        ${item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-[var(--muted-foreground)] text-sm line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <Reveal delay={0.2}>
            <div className="mt-12 text-center">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-white font-semibold text-base hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_24px_rgba(233,69,96,0.35)] hover:shadow-[0_6px_32px_rgba(233,69,96,0.5)]"
              >
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
                Browse Full Collection
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
