import type { Metadata } from "next";
import { Bree_Serif, Oswald, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { CartProvider } from "@/context/CartContext";

const breeSerif = Bree_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const oswald = Oswald({
  weight: ["200", "300", "400"],
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MedPhoto Colombia — Distribuidores Oficiales Profoto, Phase One",
    template: "%s | MedPhoto Colombia",
  },
  description:
    "Distribuidores oficiales de Profoto, Phase One, Capture One y TetherTools en Colombia. Equipos fotográficos profesionales con asesoría pre y post venta.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  keywords: [
    "Profoto Colombia",
    "Phase One Colombia",
    "Capture One Colombia",
    "TetherTools Colombia",
    "flash fotográfico profesional",
    "cámara formato medio Colombia",
    "distribuidor oficial Profoto",
  ],
  authors: [{ name: "MedPhoto Colombia" }],
  creator: "MedPhoto Colombia",
  metadataBase: new URL("https://medphoto.com.co"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://medphoto.com.co",
    siteName: "MedPhoto Colombia",
    title: "MedPhoto Colombia — Distribuidores Oficiales Profoto, Phase One",
    description:
      "Equipos fotográficos profesionales de alta gama. Asesoría personalizada pre y post venta.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MedPhoto Colombia",
    description:
      "Distribuidores oficiales de Profoto, Phase One, Capture One y TetherTools en Colombia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${breeSerif.variable} ${oswald.variable} ${dmSans.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png?v=2" />
      </head>
      <body
        className="min-h-screen flex flex-col antialiased"
        style={{ backgroundColor: "#0F0F10", color: "#F5F5F5" }}
      >
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
        <Script
          id="hs-analytics"
          src="//js.hs-scripts.com/9428261.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
