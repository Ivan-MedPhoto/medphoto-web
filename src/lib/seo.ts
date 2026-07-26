export function productTitle(name: string): string {
  const full = `${name} Colombia | MedPhoto — Distribuidor Oficial`;
  if (full.length <= 60) return full;
  const mid = `${name} Colombia | MedPhoto`;
  if (mid.length <= 60) return mid;
  return `${name} | MedPhoto`;
}

export function productAvailability(
  brand: string,
  stock?: string
): string {
  if (stock) return `https://schema.org/${stock}`;
  if (brand === "phase-one") return "https://schema.org/PreOrder";
  return "https://schema.org/InStock";
}
