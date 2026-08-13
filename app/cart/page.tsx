"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, ShoppingBag, Lock, Truck, CheckCircle2 } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  quantity: number;
  size: string;
  color: string;
  image: string;
  discount: number | null;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Nova Oversized Hoodie",
    price: 89,
    originalPrice: 119,
    quantity: 1,
    size: "M",
    color: "Crimson",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8efbbf0a628344888c36691281089bc9.png",
    discount: 25,
  },
  {
    id: 2,
    name: "Bold Graphic Tee",
    price: 34,
    originalPrice: null,
    quantity: 2,
    size: "L",
    color: "Midnight",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cfd08b86e11441c1b58eb295a741e166.jpg",
    discount: null,
  },
  {
    id: 3,
    name: "Street Cargo Pants",
    price: 79,
    originalPrice: 99,
    quantity: 1,
    size: "32",
    color: "Slate",
    image:
      "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/052271bbf5fb42bc865cd97b66c148c8.webp",
    discount: 20,
  },
];

export default function CartPage() {
  const t = useTranslations();
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  function updateQuantity(id: number, delta: number) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function applyDiscount() {
    setDiscountError("");
    if (discountCode.trim().toUpperCase() === "NOVA10") {
      setAppliedDiscount(0.1);
      setDiscountApplied(true);
    } else {
      setAppliedDiscount(0);
      setDiscountApplied(false);
      setDiscountError("Invalid code. Try NOVA10.");
    }
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * appliedDiscount;
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HERO SECTION ── */}
        <Reveal>
          <div className="mb-10">
            <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-2">
              Shopping Cart
            </p>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] text-balance">
                Your Cart
              </h1>
              {totalItems > 0 && (
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[var(--primary)] text-white text-sm font-bold shadow-[0_0_16px_rgba(233,69,96,0.4)]">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── MAIN CONTENT ── */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-10 space-y-8 lg:space-y-0">
          {/* ── LEFT: CART ITEMS ── */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Reveal>
                <div className="flex flex-col items-center justify-center py-24 text-center bg-[var(--card)] rounded-2xl border border-[var(--border)]">
                  <div className="w-20 h-20 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-6">
                    <ShoppingBag
                      className="w-10 h-10 text-[var(--primary)]"
                      aria-hidden="true"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">
                    Your cart is empty
                  </h2>
                  <p className="text-[var(--muted-foreground)] text-sm mb-8 max-w-xs">
                    Looks like you haven't added anything yet. Browse our
                    collection and find something you love.
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-colors duration-200"
                  >
                    <ShoppingCart className="w-4 h-4" aria-hidden="true" />
                    Shop Now
                  </Link>
                </div>
              </Reveal>
            ) : (
              <div className="space-y-4">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -40, transition: { duration: 0.25 } }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="flex gap-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:border-[var(--primary)]/30 transition-colors duration-200"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="text-[var(--foreground)] font-semibold text-sm leading-snug mb-2 truncate">
                              {item.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              <span className="px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] text-xs">
                                Size: {item.size}
                              </span>
                              <span className="px-2 py-0.5 rounded-full bg-[var(--background)] border border-[var(--border)] text-[var(--muted-foreground)] text-xs">
                                {item.color}
                              </span>
                              {item.discount && (
                                <span className="px-2 py-0.5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold">
                                  -{item.discount}%
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Remove button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name} from cart`}
                            className="flex-shrink-0 p-1.5 rounded-lg text-[var(--muted-foreground)] hover:text-red-400 hover:bg-red-400/10 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Price + Quantity row */}
                        <div className="flex items-center justify-between">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-1 bg-[var(--background)] border border-[var(--border)] rounded-xl p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200 disabled:opacity-40"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                            <span className="w-8 text-center text-[var(--foreground)] text-sm font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="w-7 h-7 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
                            >
                              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-[var(--foreground)] font-bold text-base">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            {item.originalPrice && (
                              <p className="text-[var(--muted-foreground)] text-xs line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ── RIGHT: ORDER SUMMARY ── */}
          <div className="lg:col-span-1">
            <Reveal delay={0.1}>
              <div className="sticky top-24 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_32px_-8px_rgba(0,0,0,0.4)]">
                <h2 className="text-lg font-bold text-[var(--foreground)] mb-6">
                  Order Summary
                </h2>

                {/* Line items */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">
                      Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                    </span>
                    <span className="text-[var(--foreground)] font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {appliedDiscount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-400 flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                        Discount (NOVA10)
                      </span>
                      <span className="text-green-400 font-medium">
                        -${discountAmount.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">
                      Shipping
                    </span>
                    <span
                      className={
                        shipping === 0
                          ? "text-green-400 font-medium"
                          : "text-[var(--foreground)] font-medium"
                      }
                    >
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">
                      Estimated Tax
                    </span>
                    <span className="text-[var(--foreground)] font-medium">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--border)] my-4" />

                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[var(--foreground)] font-bold text-base">
                    Total
                  </span>
                  <span className="text-[var(--foreground)] font-extrabold text-xl">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                  <label
                    htmlFor="discount-code"
                    className="block text-[var(--muted-foreground)] text-xs font-medium mb-2"
                  >
                    Discount Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="discount-code"
                      type="text"
                      value={discountCode}
                      onChange={(e) => {
                        setDiscountCode(e.target.value);
                        setDiscountError("");
                      }}
                      placeholder="e.g. NOVA10"
                      className="flex-1 px-3 py-2.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                      aria-describedby={discountError ? "discount-error" : undefined}
                    />
                    <button
                      onClick={applyDiscount}
                      className="px-4 py-2.5 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-colors duration-200 whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>

                  {discountError && (
                    <p
                      id="discount-error"
                      className="mt-2 text-red-400 text-xs"
                      role="alert"
                    >
                      {discountError}
                    </p>
                  )}

                  {discountApplied && (
                    <p className="mt-2 text-green-400 text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                      10% discount applied!
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-bold text-sm hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_0_20px_rgba(233,69,96,0.3)] hover:shadow-[0_0_28px_rgba(233,69,96,0.45)] mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/shop"
                  className="flex items-center justify-center w-full py-2.5 rounded-xl text-[var(--muted-foreground)] text-sm hover:text-[var(--foreground)] transition-colors duration-200"
                >
                  Continue Shopping
                </Link>

                {/* Trust badges */}
                <div className="border-t border-[var(--border)] mt-5 pt-5 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--muted-foreground)]">
                    <div className="w-7 h-7 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                      <Lock className="w-3.5 h-3.5 text-[var(--primary)]" aria-hidden="true" />
                    </div>
                    <span>Secure Checkout — SSL encrypted</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[var(--muted-foreground)]">
                    <div className="w-7 h-7 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center flex-shrink-0">
                      <Truck className="w-3.5 h-3.5 text-[var(--primary)]" aria-hidden="true" />
                    </div>
                    <span>Free shipping on orders over $50</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
