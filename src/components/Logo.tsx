import Link from "next/link";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { name: "text-xl", tagline: "text-[9px]" },
  md: { name: "text-2xl", tagline: "text-[10px]" },
  lg: { name: "text-4xl", tagline: "text-xs" },
};

export default function Logo({ className = "", showTagline = true, size = "md" }: LogoProps) {
  const s = sizes[size];

  return (
    <Link href="/" className={`inline-flex flex-col items-start group ${className}`}>
      <span className={`${s.name} leading-none select-none`} style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
        <span style={{ color: "#B7B8B9" }}>Med</span>
        <span style={{ color: "#4CB4E7" }}>photo</span>
      </span>
      {showTagline && (
        <span
          className={`${s.tagline} tracking-[0.2em] uppercase mt-0.5 select-none`}
          style={{ fontFamily: "var(--font-label)", color: "#B7B8B9" }}
        >
          siempre contigo
        </span>
      )}
    </Link>
  );
}
