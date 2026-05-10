import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://dreampetambala.in"),
  title: {
    default: "DreamPetAmbala | Pet Store India",
    template: "%s | DreamPetAmbala",
  },
  description: "DreamPetAmbala is a modern India-based pet commerce platform to browse pets and place order requests.",
  openGraph: {
    title: "DreamPetAmbala | Pet Store India",
    description: "Browse quality pets and pet essentials with easy ordering in India.",
    url: "https://dreampetambala.in",
    siteName: "DreamPetAmbala",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/brand/logo-mark.svg",
        width: 512,
        height: 512,
        alt: "DreamPetAmbala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DreamPetAmbala | Pet Store India",
    description: "India-focused pet commerce platform",
    images: ["/brand/logo-mark.svg"],
  },
  icons: {
    icon: "/brand/logo-mark.svg",
    shortcut: "/brand/logo-mark.svg",
    apple: "/brand/logo-mark.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
