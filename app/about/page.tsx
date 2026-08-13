"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, RotateCcw, Star, Leaf, Users, Heart, Zap, Award } from 'lucide-react';
import { Reveal } from "@/components/Reveal";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

const teamMembers = [
  {
    initials: "AR",
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Streetwear obsessive turned entrepreneur.",
    color: "bg-[var(--primary)]/20 text-[var(--primary)]",
  },
  {
    initials: "MC",
    name: "Maya Chen",
    role: "Head of Design",
    bio: "Turning bold ideas into wearable art.",
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    initials: "JK",
    name: "Jordan Kim",
    role: "Operations Lead",
    bio: "Making sure your order arrives perfectly.",
    color: "bg-amber-500/20 text-amber-400",
  },
  {
    initials: "ST",
    name: "Sam Torres",
    role: "Community Manager",
    bio: "Building the Nova family one drop at a time.",
    color: "bg-emerald-500/20 text-emerald-400",
  },
];

const trustBadges = [
  {
    icon: Truck,
    heading: "Free Worldwide Shipping",
    description: "Orders over $50 ship free to over 120 countries. Fast, tracked, and reliable.",
  },
  {
    icon: RotateCcw,
    heading: "30-Day Returns",
    description: "Not feeling it? Return any unworn item within 30 days, no questions asked.",
  },
  {
    icon: Star,
    heading: "Premium Quality",
    description: "Every piece is stress-tested for fit, fabric, and finish before it reaches you.",
  },
  {
    icon: Leaf,
    heading: "Sustainable Practices",
    description: "We partner with ethical factories and use recycled packaging across all orders.",
  },
];

export default function AboutPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 80% 10%, rgba(233,69,96,0.15) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold mb-6"
          >
            <Heart className="w-3.5 h-3.5" aria-hidden="true" />
            Our Story
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-[var(--foreground)] leading-[1.05] mb-6 text-balance max-w-3xl"
          >
            Bold Fashion for{" "}
            <span className="text-[var(--primary)]">Bold People</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-xl mb-8 text-pretty"
          >
            {BRAND.name} was founded in 2019 by a group of streetwear enthusiasts who were tired of
            choosing between quality and self-expression. We set out to build a brand that refuses to
            compromise on either.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold">
              <Users className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
              12,000+ Happy Customers
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold">
              <Zap className="w-4 h-4 text-[var(--primary)]" aria-hidden="true" />
              Since 2019
            </span>
          </motion.div>

          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            className="relative rounded-3xl overflow-hidden border border-[var(--border)] shadow-[0_8px_48px_rgba(0,0,0,0.5)]"
          >
            <img
              src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/28c5123c9a7147a6b7487527315115ac.jpg"
              alt="Nova Shop brand story"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/70 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-20 bg-[var(--card)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left: large quote */}
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -top-6 -left-4 text-[10rem] leading-none font-serif text-[var(--primary)]/20 select-none pointer-events-none"
                >
                  &ldquo;
                </span>
                <p className="relative text-2xl md:text-3xl font-bold text-[var(--foreground)] leading-snug tracking-tight text-balance">
                  We believe clothing is a form of self-expression. Every piece you wear tells the
                  world who you are before you say a word.
                </p>
                <p className="mt-6 text-[var(--muted-foreground)] text-base leading-relaxed">
                  That conviction drives every decision we make, from the fabrics we source to the
                  designers we partner with. {BRAND.name} exists to give bold people the wardrobe
                  they deserve.
                </p>
              </div>

              {/* Right: mission bullets */}
              <div className="space-y-6">
                {[
                  {
                    icon: Zap,
                    title: "Bold by Design",
                    desc: "We don't do safe. Every collection pushes boundaries and challenges the ordinary, because standing out is the whole point.",
                  },
                  {
                    icon: Leaf,
                    title: "Sustainably Made",
                    desc: "From recycled packaging to ethical manufacturing partners, we're committed to reducing our footprint without reducing our standards.",
                  },
                  {
                    icon: Users,
                    title: "Community Driven",
                    desc: "Our community shapes what we build. Drop feedback, style votes, and collab ideas come directly from the Nova family.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[var(--primary)]" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-[var(--foreground)] font-bold text-sm mb-1">{item.title}</h3>
                      <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-3">
                The People Behind the Brand
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4 text-balance">
                Meet the Team
              </h2>
              <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md mx-auto text-pretty">
                A small crew with a big vision. We're obsessed with fashion, quality, and building
                something the community is proud to wear.
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.name}
                variants={fadeInUp}
                className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:border-[var(--primary)]/40 hover:shadow-[0_4px_24px_rgba(233,69,96,0.15)] transition-all duration-300 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-extrabold ${member.color}`}
                >
                  {member.initials}
                </div>
                <h3 className="text-[var(--foreground)] font-bold text-sm mb-0.5">{member.name}</h3>
                <p className="text-[var(--primary)] text-xs font-semibold mb-3">{member.role}</p>
                <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="py-20 bg-[var(--card)]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-12 text-center">
              <p className="text-[var(--primary)] text-xs font-semibold uppercase tracking-widest mb-3">
                Our Commitment
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4 text-balance">
                Why Shop With Us
              </h2>
              <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md mx-auto text-pretty">
                We've built every policy around one goal: making you feel confident every time you
                shop with {BRAND.name}.
              </p>
            </div>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.heading}
                variants={fadeInUp}
                className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)] shadow-[0_2px_12px_rgba(0,0,0,0.2)] hover:border-[var(--primary)]/40 hover:shadow-[0_4px_24px_rgba(233,69,96,0.15)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--primary)]/15 flex items-center justify-center mb-4">
                  <badge.icon className="w-6 h-6 text-[var(--primary)]" aria-hidden="true" />
                </div>
                <h3 className="text-[var(--foreground)] font-bold text-sm mb-2">{badge.heading}</h3>
                <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">{badge.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-[0_8px_48px_rgba(0,0,0,0.4)] p-12 md:p-20 text-center">
              {/* Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(233,69,96,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--primary)]/15 border border-[var(--primary)]/30 text-[var(--primary)] text-xs font-semibold mb-6">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  Join the Family
                </div>

                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4 text-balance">
                  Ready to Join the Nova Family?
                </h2>
                <p className="text-[var(--muted-foreground)] text-base leading-relaxed max-w-md mx-auto mb-10 text-pretty">
                  Thousands of bold people already call Nova their go-to. Find your next statement
                  piece or reach out and say hello.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold text-sm hover:bg-[var(--accent)] transition-all duration-300 shadow-[0_0_24px_rgba(233,69,96,0.35)] hover:shadow-[0_0_32px_rgba(233,69,96,0.5)]"
                  >
                    Shop the Collection
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-[var(--border)] text-[var(--foreground)] font-semibold text-sm hover:border-[var(--primary)]/60 hover:bg-[var(--primary)]/10 transition-all duration-300"
                  >
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
