import type { Metadata } from "next";
import CartContent from "@/components/CartContent";

export const metadata: Metadata = {
  title: "Carrito — MedPhoto Colombia",
  description: "Revisa y coordina el pago de tus productos seleccionados.",
  robots: { index: false, follow: false },
};

export default function CarritoPage() {
  return <CartContent />;
}
