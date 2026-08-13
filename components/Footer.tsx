"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Camera as Instagram, MessageCircle as Twitter, Heart, Sparkles } from 'lucide-react';
import { BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  const footerRaw = (
    Array.isArray(t.raw("footer")) ? t.raw("footer") : []
  ) as { group: string; label: string; href: string }[];

  const grouped = footerRaw.reduce<Record<string, { label: string; href: string }[]>>(
    (acc, item) => {
      if (!acc[item.group]) acc[item.group] = [];
      acc[item.group].push({ label: item.label, href: item.href });
      return acc;
    },
    {}
  );

  function handleAnchorClick(
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  function getLinkHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  const currentYear = 2024;

  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_0_16px_rgba(233,69,96,0.4)]">
                <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                {BRAND.name}
              </span>
            </Link>
            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed max-w-xs mb-6">
              {BRAND.tagline} Shipping worldwide from our warehouse in{" "}
              {BRAND.location}.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/novashop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nova Shop on Instagram"
                className="w-9 h-9 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="https://twitter.com/novashop"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Nova Shop on Twitter"
                className="w-9 h-9 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Link Groups */}
          {Object.entries(grouped).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-[var(--foreground)] font-semibold text-sm mb-4 tracking-wide uppercase">
                {group}
              </h3>
              <ul className="space-y-3">
                {links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={getLinkHref(link.href)}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="text-[var(--muted-foreground)] text-sm hover:text-[var(--accent)] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--muted-foreground)] text-sm">
            © {currentYear} {BRAND.name}. All rights reserved.
          </p>
          <p className="text-[var(--muted-foreground)] text-sm flex items-center gap-1">
            Made with{" "}
            <Heart
              className="w-3.5 h-3.5 text-[var(--primary)] fill-[var(--primary)]"
              aria-hidden="true"
            />{" "}
            in Los Angeles
          </p>
        </div>
      </div>
    </footer>
  );
}