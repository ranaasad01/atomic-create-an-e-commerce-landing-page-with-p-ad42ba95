"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, Search, Sparkles } from 'lucide-react';
import { navLinks, NAV_CTA, BRAND } from "@/lib/data";
import { useTranslations } from "next-intl";

interface NavbarProps {
  cartCount?: number;
  onCartClick?: () => void;
}

export default function Navbar({ cartCount = 0, onCartClick }: NavbarProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navT = (t.raw("nav") as Record<string, string>) ?? {};

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href.startsWith("#") && pathname === "/") {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  }

  function getLinkHref(href: string) {
    if (href.startsWith("#") && pathname !== "/") {
      return "/" + href;
    }
    return href;
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center shadow-[0_0_16px_rgba(233,69,96,0.4)] group-hover:shadow-[0_0_24px_rgba(233,69,96,0.6)] transition-all duration-300">
              <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="text-lg font-bold tracking-tight text-[var(--foreground)]">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('/') ? pathname === link.href : false;
              return (
                <Link
                  key={link.key}
                  href={getLinkHref(link.href)}
                  onClick={(e) => handleAnchorClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                      : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]'
                  }`}
                >
                  {navT[link.key] ?? link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={onCartClick}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              href={NAV_CTA.href}
              className="ml-2 px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold hover:bg-[var(--accent)] transition-all duration-200 shadow-[0_0_16px_rgba(233,69,96,0.3)] hover:shadow-[0_0_24px_rgba(233,69,96,0.5)]"
            >
              {navT['shopNow'] ?? NAV_CTA.label}
            </Link>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all duration-200"
              aria-label={`Shopping cart, ${cartCount} items`}
            >
              <ShoppingCart className="w-4 h-4" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--primary)] text-white text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)] transition-all duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden pb-3"
            >
              <input
                type="search"
                placeholder="Search products..."
                autoFocus
                className="w-full px-4 py-2.5 rounded-xl bg-[var(--card)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] text-sm focus:outline-none focus:border-[var(--primary)] transition-colors"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[var(--background)]/98 backdrop-blur-md border-b border-[var(--border)] px-4 pb-6 pt-2"
          >
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = link.href.startsWith('/') ? pathname === link.href : false;
                return (
                  <Link
                    key={link.key}
                    href={getLinkHref(link.href)}
                    onClick={(e) => handleAnchorClick(e as React.MouseEvent<HTMLAnchorElement>, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-[var(--primary)] bg-[var(--primary)]/10'
                        : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card)]'
                    }`}
                  >
                    {navT[link.key] ?? link.label}
                  </Link>
                );
              })}
              <Link
                href={NAV_CTA.href}
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-4 py-3 rounded-xl bg-[var(--primary)] text-white text-sm font-semibold text-center hover:bg-[var(--accent)] transition-all duration-200"
              >
                {navT['shopNow'] ?? NAV_CTA.label}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
