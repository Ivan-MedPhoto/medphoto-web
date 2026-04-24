import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — MedPhoto Colombia",
  description:
    "Tips de iluminación, reseñas de equipos Profoto y Phase One, y recursos para fotógrafos profesionales en Colombia.",
};

const posts = [
  {
    title: "Cómo hacer fotografía splash profesional con flash",
    description:
      "Aprende cómo hacer fotografía splash profesional con iluminación de alta velocidad. Técnicas, equipo y setup explicado paso a paso.",
    slug: "fotografia-splash-con-flash",
    image: "/blog/medphoto_splash_hero.jpg",
    date: "23 de abril, 2026",
    category: "Producto",
  },
  {
    title: "Cómo lograr retratos profesionales con iluminación de estudio",
    description:
      "Aprende cómo iluminar retratos profesionales con flash. Setup, técnicas y ejemplos reales con equipos Profoto.",
    slug: "fotografia-retrato-iluminacion-profesional",
    image: "/blog/medphoto_retrato_hero.jpg",
    date: "23 de abril, 2026",
    category: "Retrato",
  },
  {
    title: "Cómo elegir el paraguas de iluminación ideal para fotografía",
    description:
      "Guía completa sobre tipos, tamaños y usos profesionales de paraguas de iluminación.",
    slug: "como-elegir-paraguas-fotografia",
    image: "/blog/medphoto_paraguas_profoto_deep_hero.jpg",
    date: "23 de abril, 2026",
    category: "Iluminación",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <p
          className="text-xs uppercase tracking-widest mb-2"
          style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
        >
          Recursos
        </p>
        <h1 className="text-4xl sm:text-5xl" style={{ fontFamily: "var(--font-heading)" }}>
          Blog
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block rounded-xl overflow-hidden border transition-colors hover:border-[#4CB4E740]"
            style={{ backgroundColor: "#1A1A1B", borderColor: "#2a2a2b" }}
          >
            <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={338}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.3s ease" }}
                className="group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "#4CB4E7", fontFamily: "var(--font-label)" }}
                >
                  {post.category}
                </span>
                <span className="text-xs" style={{ color: "#555" }}>·</span>
                <span className="text-xs" style={{ color: "#555", fontFamily: "var(--font-label)" }}>
                  {post.date}
                </span>
              </div>
              <h2
                className="text-base leading-snug mb-2 group-hover:text-white transition-colors"
                style={{ color: "#F5F5F5", fontFamily: "var(--font-heading)" }}
              >
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "#B7B8B9" }}>
                {post.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
