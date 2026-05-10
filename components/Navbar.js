"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/logo-mark.svg" alt="DreamPetAmbala" width={44} height={44} priority className="rounded-xl" />
          <span className="text-2xl font-extrabold text-slate-800 md:text-3xl">
            <span className="bg-gradient-to-r from-[#f58a5f] to-[#b3dfc4] bg-clip-text text-transparent">DreamPetAmbala</span>
          </span>
        </Link>

        <nav className="hidden gap-8 text-base font-medium text-slate-600 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-[#f58a5f] ${pathname === link.href ? "text-[#f58a5f] underline decoration-2 underline-offset-8" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/products" className="btn-secondary hidden text-sm lg:inline-flex">Explore Shop</Link>
      </div>
    </header>
  );
}
