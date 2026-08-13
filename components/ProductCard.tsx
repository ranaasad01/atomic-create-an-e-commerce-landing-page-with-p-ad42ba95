"use client";

import { motion } from "framer-motion";
import { Star, ShoppingCart } from 'lucide-react';
import { useState } from "react";

interface Product {
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

interface ProductCardProps {
  product: Product;
  addedLabel?: string;
  addToCartLabel?: string;
}

export default function ProductCard({
  product,
  addedLabel = "Added!",
  addToCartLabel = "Add to Cart",
}: ProductCardProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const btnBase =
    "absolute bottom-3 left-3 right-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300";
  const btnAdded = "bg-green-500 text-white opacity-100 translate-y-0";
  const btnDefault =
    "bg-[var(--primary)] text-white opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative bg-[var(--card)] rounded-2xl overflow-hidden border border-[var(--border)] shadow-[0_1px_2px_rgba(0,0,0,0.12),0_8px_24px_-8px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_32px_-8px_rgba(233,69,96,0.25)] hover:border-[var(--primary)]/40 transition-all duration-300"
    >
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.isSale && product.discount && (
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
            -{product.discount}%
          </span>
        )}
        {product.isBestseller && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white text-xs font-bold">
            Bestseller
          </span>
        )}
      </div>

      <div className="relative overflow-hidden aspect-[3/4] bg-[var(--background)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/fa3c52cc207a4cfa9680daf5d8aa157e.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className={[btnBase, added ? btnAdded : btnDefault].join(" ")}
          aria-label={"Add " + product.name + " to cart"}
        >
          <ShoppingCart className="w-4 h-4" aria-hidden="true" />
          {added ? addedLabel : addToCartLabel}
        </motion.button>
      </div>

      <div className="p-4">
        <p className="text-[var(--muted-foreground)] text-xs mb-1">
          {product.category}
        </p>
        <h3 className="text-[var(--foreground)] font-semibold text-sm leading-snug mb-2 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />
          <span className="text-[var(--foreground)] text-xs font-medium">
            {product.rating}
          </span>
          <span className="text-[var(--muted-foreground)] text-xs">
            ({product.ratingCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[var(--foreground)] font-bold text-base">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-[var(--muted-foreground)] text-sm line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
