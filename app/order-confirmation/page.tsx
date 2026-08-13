"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Package, Truck, Calendar, ArrowRight, Download, MapPin, CreditCard, Clock } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const ORDER = {
  orderNumber: "NS-2024-8847",
  orderDate: "December 15, 2024",
  estimatedDelivery: "December 18\u201320, 2024",
  shippingAddress: "123 Main St, Los Angeles, CA 90001",
  paymentMethod: "Visa ending in 4242",
  items: [
    {
      name: "Oversized Graphic Hoodie",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 64.99,
      image:
        "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/8efbbf0a628344888c36691281089bc9.png",
    },
    {
      name: "Slim Cargo Pants",
      size: "32",
      color: "Olive",
      quantity: 2,
      price: 89.99,
      image:
        "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/052271bbf5fb42bc865cd97b66c148c8.webp",
    },
    {
      name: "Essential Crewneck Tee",
      size: "L",
      color: "White",
      quantity: 1,
      price: 34.99,
      image:
        "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/cfd08b86e11441c1b58eb295a741e166.jpg",
    },
  ],
  subtotal: 236,
  shipping: 0,
  tax: 18.88,
  total: 254.88,
};

const TIMELINE_STEPS = [
  { label: "Order Placed", icon: Package, done: true },
  { label: "Processing", icon: Clock, done: false },
  { label: "Out for Delivery", icon: Truck, done: false },
  { label: "Delivered", icon: CheckCircle, done: false },
];

const CONFETTI = [
  { top: "8%", left: "5%", size: 14, color: "var(--primary)", delay: 0 },
  { top: "12%", left: "92%", size: 10, color: "var(--accent)", delay: 0.2 },
  { top: "22%", left: "88%", size: 18, color: "var(--primary)", delay: 0.4 },
  { top: "6%", left: "75%", size: 8, color: "var(--accent)", delay: 0.1 },
  { top: "18%", left: "15%", size: 12, color: "var(--accent)", delay: 0.3 },
  { top: "30%", left: "3%", size: 9, color: "var(--primary)", delay: 0.5 },
  { top: "5%", left: "45%", size: 7, color: "var(--primary)", delay: 0.15 },
  { top: "28%", left: "95%", size: 11, color: "var(--accent)", delay: 0.35 },
];

export default function OrderConfirmationPage() {
  useTranslations();

  return (
    <div className="min-h-screen pt-24 pb-20 relative overflow-hidden">
      {/* Decorative confetti circles */}
      {CONFETTI.map((c, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            opacity: 0.35,
          }}
          animate={{
            y: [0, -12, 0],
            scale: [1, 1.2, 1],
            opacity: [0.35, 0.6, 0.35],
          }}
          transition={{
            duration: 3 + i * 0.4,
            delay: c.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 10%, rgba(233,69,96,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── HERO SECTION ── */}
        <section className="text-center mb-14">
          {/* Pulsing ring + check icon */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <motion.div
              aria-hidden="true"
              className="absolute rounded-full bg-[var(--primary)]/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 96, height: 96 }}
            />
            <motion.div
              aria-hidden="true"
              className="absolute rounded-full bg-[var(--primary)]/10"
              animate={{ scale: [1, 1.9, 1], opacity: [0.3, 0, 0.3] }}
              transition={{
                duration: 2.2,
                delay: 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: 96, height: 96 }}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <CheckCircle
                className="w-16 h-16 text-[var(--primary)] relative z-10"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.25 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4 text-balance"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-md mx-auto mb-6 text-pretty"
          >
            Thank you for your purchase. We&apos;re preparing your order now.
          </motion.p>

          {/* Order number pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.45 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] font-mono font-semibold text-sm mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
          >
            <Package className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
            Order&nbsp;
            <span className="text-[var(--primary)]">{ORDER.orderNumber}</span>
          </motion.div>

          {/* Estimated delivery */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/25 text-[var(--primary)] text-sm font-medium"
          >
            <Calendar className="w-4 h-4" aria-hidden="true" />
            Estimated delivery: {ORDER.estimatedDelivery}
          </motion.div>
        </section>

        {/* ── ORDER DETAILS SECTION ── */}
        <Reveal>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Left card: Items Ordered */}
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
              <h2 className="text-[var(--foreground)] font-bold text-lg mb-5 flex items-center gap-2">
                <Package className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
                Items Ordered
              </h2>

              <ul className="space-y-4 mb-6">
                {ORDER.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 pb-4 border-b border-[var(--border)] last:border-0 last:pb-0"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-[var(--background)] flex-shrink-0 border border-[var(--border)]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[var(--foreground)] font-semibold text-sm leading-snug line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[var(--muted-foreground)] text-xs mt-0.5">
                        Size: {item.size} &middot; Color: {item.color} &middot; Qty:{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <p className="text-[var(--foreground)] font-bold text-sm flex-shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              {/* Totals */}
              <div className="space-y-2 pt-2 border-t border-[var(--border)]">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="text-[var(--foreground)]">${ORDER.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Tax</span>
                  <span className="text-[var(--foreground)]">${ORDER.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-[var(--border)]">
                  <span className="text-[var(--foreground)]">Total</span>
                  <span className="text-[var(--primary)]">${ORDER.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Right card: Delivery Information + Timeline */}
            <div className="flex flex-col gap-5">
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
                <h2 className="text-[var(--foreground)] font-bold text-lg mb-5 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
                  Delivery Information
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[var(--muted-foreground)] text-xs mb-0.5">Shipping Address</p>
                      <p className="text-[var(--foreground)] text-sm font-medium">
                        {ORDER.shippingAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CreditCard
                      className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[var(--muted-foreground)] text-xs mb-0.5">Payment Method</p>
                      <p className="text-[var(--foreground)] text-sm font-medium">
                        {ORDER.paymentMethod}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar
                      className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-[var(--muted-foreground)] text-xs mb-0.5">Order Date</p>
                      <p className="text-[var(--foreground)] text-sm font-medium">
                        {ORDER.orderDate}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Timeline */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.25)] flex-1">
                <h3 className="text-[var(--foreground)] font-bold text-base mb-5">
                  Delivery Timeline
                </h3>
                <ol className="relative space-y-0">
                  {TIMELINE_STEPS.map((step, i) => {
                    const Icon = step.icon;
                    const isLast = i === TIMELINE_STEPS.length - 1;
                    return (
                      <li key={step.label} className="flex gap-4">
                        {/* Connector column */}
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-colors ${
                              step.done
                                ? "bg-green-500 border-green-500"
                                : "bg-[var(--background)] border-[var(--border)]"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${
                                step.done ? "text-white" : "text-[var(--muted-foreground)]"
                              }`}
                              aria-hidden="true"
                            />
                          </div>
                          {!isLast && (
                            <div
                              className={`w-0.5 flex-1 my-1 min-h-[24px] ${
                                step.done ? "bg-green-500" : "bg-[var(--border)]"
                              }`}
                            />
                          )}
                        </div>
                        {/* Label */}
                        <div className="pb-5 pt-1">
                          <p
                            className={`text-sm font-semibold ${
                              step.done
                                ? "text-green-400"
                                : "text-[var(--muted-foreground)]"
                            }`}
                          >
                            {step.label}
                            {step.done && (
                              <span className="ml-2 text-xs font-normal text-green-400/70">
                                Completed
                              </span>
                            )}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </section>
        </Reveal>

        {/* ── CTA SECTION ── */}
        <Reveal delay={0.1}>
          <section className="text-center">
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.25)]">
              <h2 className="text-[var(--foreground)] font-bold text-xl mb-2">
                What&apos;s Next?
              </h2>
              <p className="text-[var(--muted-foreground)] text-sm mb-8 max-w-sm mx-auto">
                We&apos;ll send you a shipping confirmation email with tracking details once your order is on its way.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_4px_16px_rgba(233,69,96,0.35)] hover:shadow-[0_4px_24px_rgba(233,69,96,0.5)]"
                >
                  Continue Shopping
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-transparent border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all duration-300"
                >
                  <Truck className="w-4 h-4" aria-hidden="true" />
                  Track Your Order
                </button>
              </div>

              {/* Download receipt */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[var(--muted-foreground)] hover:text-[var(--primary)] text-sm transition-colors duration-200 mb-5"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Receipt
              </button>

              {/* Support link */}
              <p className="text-[var(--muted-foreground)] text-sm">
                Questions?{" "}
                <Link
                  href="/contact"
                  className="text-[var(--primary)] hover:text-[var(--accent)] font-medium underline underline-offset-2 transition-colors duration-200"
                >
                  Contact our support team
                </Link>
              </p>
            </div>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
