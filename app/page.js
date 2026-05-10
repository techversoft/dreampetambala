"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

const categories = [
  { name: "Dogs", image: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=900&q=80", count: "250+ Products" },
  { name: "Cats", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80", count: "180+ Products" },
  { name: "Birds", image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=80", count: "120+ Products" },
  { name: "Fish", image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=80", count: "95+ Products" },
];

const testimonials = [
  { name: "Sarah Johnson", text: "Amazing quality and fast support. My golden retriever loves everything from DreamPet.", role: "Verified Customer" },
  { name: "Michael Chen", text: "Best pet store online. Smooth delivery and very reasonable prices.", role: "Verified Customer" },
  { name: "Emily Rodriguez", text: "Great experience for cat and bird products. Highly recommended.", role: "Verified Customer" },
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      const response = await fetch("/api/products?limit=8", { cache: "no-store" });
      const data = await response.json();
      if (data.success) setProducts(data.data);
    };
    getProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6" id="categories">
        <h2 className="text-center text-5xl font-black text-slate-800">Shop by Category</h2>
        <p className="mt-3 text-center text-xl text-slate-500">Find exactly what your pet needs</p>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`} className="group relative overflow-hidden rounded-3xl shadow-lg">
              <Image src={category.image} alt={category.name} width={900} height={700} className="h-80 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-4xl font-bold">{category.name}</h3>
                <p className="text-lg">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-[#f58a5f] via-[#e5bf8d] to-[#9cd7ba] py-14">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-white p-8 shadow-xl md:grid-cols-2 md:px-10">
          <div>
            <h3 className="text-5xl font-black text-slate-800">Special Summer Sale</h3>
            <p className="mt-4 text-xl text-slate-500">Get up to 30% off on selected pet supplies. Limited time offer.</p>
            <Link href="/products" className="mt-7 inline-block rounded-full bg-[#f58a5f] px-8 py-3 text-lg font-semibold text-white">Shop Sale Items</Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-3xl bg-[#f9ede8] p-6 text-center"><p className="text-6xl font-black text-[#f58a5f]">30%</p><p className="mt-2 text-lg text-slate-500">Max Discount</p></div>
            <div className="rounded-3xl bg-[#edf4f1] p-6 text-center"><p className="text-6xl font-black text-slate-800">500+</p><p className="mt-2 text-lg text-slate-500">Products</p></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-5xl font-black text-slate-800">Best Sellers</h2>
            <p className="mt-2 text-xl text-slate-500">Most loved by pet parents</p>
          </div>
          <Link href="/products" className="rounded-full border border-slate-300 px-6 py-3 text-lg font-semibold text-slate-700">View All</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product._id} product={product} onOrder={setSelectedProduct} />
          ))}
        </div>
      </section>

      <section className="bg-[#f0f3f8] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="text-center text-5xl font-black text-slate-800">What Pet Parents Say</h2>
          <p className="mt-3 text-center text-xl text-slate-500">Trusted by thousands of happy customers</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-lg leading-8 text-slate-600">{item.text}</p>
                <p className="mt-5 text-2xl font-bold text-slate-800">{item.name}</p>
                <p className="text-slate-500">{item.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <p className="text-xl text-slate-500">Subscribe to our newsletter for exclusive deals and pet care tips.</p>
            <div className="mx-auto mt-5 flex max-w-xl gap-2">
              <input className="w-full rounded-full border border-slate-300 px-5 py-3" placeholder="Enter your email" />
              <button className="rounded-full bg-[#f58a5f] px-7 py-3 text-white">Subscribe</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      {selectedProduct && <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  );
}
