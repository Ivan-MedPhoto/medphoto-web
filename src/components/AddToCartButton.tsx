"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all hover:opacity-90 hover:scale-[1.02]"
      style={{
        backgroundColor: added ? "#22c55e" : "#4CB4E7",
        color: "#0F0F10",
        fontFamily: "var(--font-label)",
        letterSpacing: "0.05em",
      }}
    >
      {added ? <Check size={18} /> : <ShoppingCart size={18} />}
      {added ? "Agregado al carrito" : "Agregar al carrito"}
    </button>
  );
}
