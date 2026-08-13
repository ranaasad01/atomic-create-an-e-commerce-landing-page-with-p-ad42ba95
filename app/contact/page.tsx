"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Mail, MapPin, Clock, MessageCircle, ChevronDown, ChevronUp, Check, Send, Phone } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { useTranslations } from "next-intl";

const faqs = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days within the US. International orders typically arrive in 7–14 business days.",
  },
  {
    q: "What is your return policy?",
    a: "We offer hassle-free 30-day returns. Items must be unworn and in original condition. Start a return from your order confirmation email.",
  },
  {
    q: "Do you offer size exchanges?",
    a: "Yes! We offer free size exchanges within 30 days of purchase. Simply contact our support team and we'll sort it out.",
  },
  {
    q: "How do I track my order?",
    a: "Once your order ships, you'll receive a tracking email with a link to follow your package in real time.",
  },
  {
    q: "Can I cancel or modify my order?",
    a: "Orders can be cancelled or modified within 1 hour of placement. After that, they enter our fulfillment process and cannot be changed.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to over 50 countries worldwide. Free shipping applies to international orders over $100.",
  },
];

const inputClass =
  "bg-[var(--card)] border border-[var(--border)] rounded-xl px-4 py-3 text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none w-full transition-colors duration-200";

export default function ContactPage() {
  useTranslations();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  }

  function handleReset() {
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSubmitted(false);
  }

  function toggleFaq(index: number) {
    setOpenFaq((prev) => (prev === index ? null : index));
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── HERO SECTION ── */}
        <Reveal>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold mb-5">
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mb-5 text-balance">
              We&apos;d Love to Hear From You
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl mx-auto text-pretty">
              Our support team is here to help. Reach out with any question and
              we&apos;ll get back to you as fast as possible.
            </p>
          </div>
        </Reveal>

        {/* Info Cards */}
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
            {/* Visit Us */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
              <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[var(--foreground)] font-semibold text-sm mb-1">Visit Us</p>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  123 Fashion Ave, Los Angeles, CA 90001
                </p>
              </div>
            </div>

            {/* Support Hours */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
              <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[var(--foreground)] font-semibold text-sm mb-1">Support Hours</p>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  Mon–Fri, 9am–6pm PST
                </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)]">
              <div className="w-11 h-11 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[var(--foreground)] font-semibold text-sm mb-1">Email Us</p>
                <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                  support@novashop.com
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── CONTACT FORM + LIVE CHAT ── */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.25)]">
              <h2 className="text-2xl font-extrabold tracking-tight text-[var(--foreground)] mb-6">
                Send Us a Message
              </h2>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-5">
                      <Check className="w-8 h-8 text-green-400" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Message Sent!</h3>
                    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-sm mb-8">
                      Thanks for reaching out. Our team will get back to you
                      within one business day.
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-colors duration-200"
                    >
                      Send Another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-[var(--foreground)] text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-[var(--foreground)] text-xs font-semibold mb-1.5 uppercase tracking-wide"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-[var(--foreground)] text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className={inputClass}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-[var(--foreground)] text-xs font-semibold mb-1.5 uppercase tracking-wide"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help..."
                        className={inputClass + " resize-none"}
                      />
                    </div>

                    {/* Submit */}
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_16px_rgba(233,69,96,0.35)]"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      Send Message
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-5">
              {/* Live Chat Card */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">Live Chat</h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                    Chat with our team in real time for instant answers.
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full py-3 rounded-xl border border-[var(--primary)] text-[var(--primary)] font-semibold text-sm hover:bg-[var(--primary)]/10 transition-colors duration-200"
                >
                  Start Live Chat
                </button>
                <p className="text-[var(--muted-foreground)] text-xs text-center">
                  Average response time: &lt; 2 minutes
                </p>
              </div>

              {/* Phone Support Card */}
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">Call Us</h3>
                  <p className="text-[var(--foreground)] font-semibold text-base mb-1">
                    +1 (800) NOVA-SHOP
                  </p>
                  <p className="text-[var(--muted-foreground)] text-sm">
                    Mon–Fri, 9am–6pm PST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── FAQ SECTION ── */}
        <Reveal>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--foreground)] mb-3 text-balance">
                Frequently Asked Questions
              </h2>
              <p className="text-[var(--muted-foreground)] text-base leading-relaxed text-pretty">
                Quick answers to the questions we hear most. Still need help? Send us a message above.
              </p>
            </div>

            <div>
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-2xl mb-3 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-white/[0.03] transition-colors duration-200"
                    aria-expanded={openFaq === index}
                  >
                    <span className="text-[var(--foreground)] font-semibold text-sm leading-snug">
                      {faq.q}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp
                        className="w-4 h-4 text-[var(--primary)] flex-shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDown
                        className="w-4 h-4 text-[var(--muted-foreground)] flex-shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {openFaq === index && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-[var(--border)]">
                          <p className="text-[var(--muted-foreground)] text-sm leading-relaxed pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center">
              <p className="text-[var(--muted-foreground)] text-sm mb-4">
                Still have questions? We&apos;re happy to help.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-colors duration-200 shadow-[0_4px_16px_rgba(233,69,96,0.3)]"
              >
                Browse the Shop
              </Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
