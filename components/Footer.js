import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-[#e9edf3]">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#f58a5f] via-[#f4bf7f] to-[#b3dfc4] text-xs font-bold">PAW</span>
              <span className="text-3xl font-black bg-gradient-to-r from-[#f58a5f] to-[#b3dfc4] bg-clip-text text-transparent">DreamPet</span>
            </div>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              Your trusted online pet store for all your furry, feathery, and scaly friends.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-800">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-lg text-slate-500">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/products">Shop</Link></li>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-800">Policies</h3>
            <ul className="mt-4 space-y-3 text-lg text-slate-500">
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
              <li><Link href="/products?category=Dogs">Dogs</Link></li>
              <li><Link href="/products?category=Cats">Cats</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-slate-800">Newsletter</h3>
            <p className="mt-4 text-lg text-slate-500">Subscribe for exclusive deals and pet care tips.</p>
            <div className="mt-5 flex gap-2">
              <input className="w-full rounded-full border border-slate-300 px-4 py-3" placeholder="Your email" />
              <button className="rounded-full bg-[#f58a5f] px-5 py-3 font-semibold text-white">Send</button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-300 pt-6 text-slate-500">
          Copyright {new Date().getFullYear()} DreamPetAmbala. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
