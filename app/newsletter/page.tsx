"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Mail, Check, Sparkles, Zap, Star, Gift } from 'lucide-react';
import { Reveal } from "@/components/Reveal";

export default function NewsletterPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const perks = (
    Array.isArray(t.raw("newsletter")) ? t.raw("newsletter") : []
  ) as string[];

  const perkIcons = [Gift, Zap, Star];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold mb-5">
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              {t("newsletterPage.badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--foreground)] mb-5 text-balance">
              {t("newsletterPage.heading")}
            </h1>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl mx-auto text-pretty">
              {t("newsletterPage.subtext")}
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Perks */}
          <Reveal>
            <div>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
                {t("newsletterPage.perksHeading")}
              </h2>
              <div className="space-y-4 mb-10">
                {perks.map((perk, i) => {
                  const Icon = perkIcons[i] ?? Sparkles;
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
                      </div>
                      <p className="text-[var(--foreground)] text-sm leading-relaxed pt-1">{perk}</p>
                    </div>
                  );
                })}
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-[var(--card)]/60 border border-[var(--border)]">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div
                      key={n}
                      className="w-9 h-9 rounded-full bg-[var(--primary)]/20 border-2 border-[var(--card)] flex items-center justify-center text-[var(--primary)] text-xs font-bold"
                    >
                      {String.fromCharCode(64 + n)}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[var(--foreground)] text-sm font-semibold">
                    {t("newsletterPage.socialProofCount")}
                  </p>
                  <p className="text-[var(--muted-foreground)] text-xs">
                    {t("newsletterPage.socialProofLabel")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: Form */}
          <Reveal delay={0.1}>
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-[0_8px_48px_rgba(0,0,0,0.3)]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
                    <Check className="w-8 h-8 text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[var(--foreground)] mb-2">
                    {t("newsletterPage.successHeading")}
                  </h3>
                  <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                    {t("newsletterPage.successSubtext")}
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-2xl font-extrabold text-[var(--foreground)] mb-2">
                      {t("newsletterPage.formHeading")}
                    </h2>
                    <p className="text-[var(--muted-foreground)] text-sm">
                      {t("newsletterPage.formSubtext")}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="nl-email"
                        className="block text-[var(--foreground)] text-sm font-medium mb-2"
                      >
                        {t("newsletterPage.emailLabel")}
                      </label>
                      <input
                        id="nl-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t("newsletterPage.emailPlaceholder")}
                        className="w-full px-4 py-3.5 rounded-xl bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_20px_rgba(233,69,96,0.3)] hover:shadow-[0_0_32px_rgba(255,112,150,0.4)]"
                    >
                      {t("newsletterPage.submitBtn")}
                    </button>
                  </form>

                  <p className="text-[var(--muted-foreground)] text-xs mt-4 text-center">
                    {t("newsletterPage.disclaimer")}
                  </p>
                </>
              )}
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA strip */}
        <Reveal>
          <div className="mt-20 text-center">
            <p className="text-[var(--muted-foreground)] text-sm">
              {t("newsletterPage.bottomNote")}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
