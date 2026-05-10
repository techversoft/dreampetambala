"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderForm from "@/components/OrderForm";
import { formatINR } from "@/lib/utils/format";

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      const response = await fetch(`/api/products/${params.id}`, { cache: "no-store" });
      const data = await response.json();
      if (data.success) setProduct(data.data);
    };

    if (params.id) getProduct();
  }, [params.id]);

  if (!product) {
    return <main className="min-h-screen bg-[#f4f7f8]"><Navbar /><p className="mx-auto max-w-7xl px-4 py-20 text-lg">Loading product...</p></main>;
  }

  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-6">
        <div className="card-soft overflow-hidden">
          <Image src={product.image} alt={product.name} width={1200} height={900} className="h-full w-full object-cover" />
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#f58a5f]">{product.category}</p>
          <h1 className="mt-2">{product.name}</h1>
          <p className="mt-4 text-base text-slate-600">{product.description}</p>
          <p className="mt-4 text-sm text-slate-600">Type/Breed: <span className="font-semibold">{product.typeBreed}</span></p>
          <p className="mt-2 text-sm text-slate-600">Availability: <span className="font-semibold">{product.availability}</span></p>
          <p className="mt-6 text-3xl font-bold text-[#f58a5f]">{formatINR(product.price)}</p>
          <button onClick={() => setSelectedProduct(product)} className="btn-primary mt-8 text-base">
            Order Now
          </button>
        </div>
      </section>
      <Footer />
      {selectedProduct && <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  );
}
