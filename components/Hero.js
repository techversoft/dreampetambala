import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
      <div>
        <div className="mb-7 inline-flex rounded-full border border-slate-200 bg-white px-5 py-2 text-sm text-slate-700 shadow-sm">
          20% Off All Pet Supplies This Week
        </div>
        <h1 className="text-5xl font-black leading-tight text-slate-800 md:text-7xl">
          Everything Your
          <span className="block bg-gradient-to-r from-[#f58a5f] via-[#e7c08f] to-[#9dd7ba] bg-clip-text text-transparent">
            Pet Needs
          </span>
        </h1>
        <p className="mt-6 max-w-lg text-xl leading-relaxed text-slate-500">
          Quality pets and products, great prices, and smooth doorstep delivery for your furry, feathered, and scaly friends.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/products" className="rounded-full bg-[#f58a5f] px-8 py-4 text-xl font-semibold text-white transition hover:bg-[#eb7a4d]">Shop Now</Link>
          <a href="#categories" className="rounded-full border border-slate-300 px-8 py-4 text-xl font-semibold text-slate-700 transition hover:border-[#f58a5f] hover:text-[#f58a5f]">Learn More</a>
        </div>
      </div>
      <div className="overflow-hidden rounded-[2rem] shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80"
          alt="Dogs"
          width={1200}
          height={900}
          className="h-[520px] w-full object-cover"
        />
      </div>
    </section>
  );
}
