"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";

const defaultFilters = {
  category: "All",
  availability: "All",
  price: "All",
  typeBreed: "",
  search: "",
};

function priceMatch(price, range) {
  if (range === "All") return true;
  if (range === "Under 100") return price < 100;
  if (range === "100-500") return price >= 100 && price <= 500;
  if (range === "500-1000") return price >= 500 && price <= 1000;
  return price > 1000;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const preCategory = searchParams.get("category") || "All";
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ ...defaultFilters, category: preCategory });

  useEffect(() => {
    const getProducts = async () => {
      const query = new URLSearchParams();
      query.set("limit", "1000");
      if (filters.search) query.set("search", filters.search);
      if (filters.typeBreed) query.set("typeBreed", filters.typeBreed);
      if (filters.category !== "All") query.set("category", filters.category);
      if (filters.availability !== "All") query.set("availability", filters.availability);

      const response = await fetch(`/api/products?${query.toString()}`, { cache: "no-store" });
      const data = await response.json();
      if (data.success) setProducts(data.data);
    };
    getProducts();
  }, [filters.search, filters.typeBreed, filters.category, filters.availability]);

  const categories = useMemo(() => ["All", ...new Set(products.map((item) => item.category))], [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const pricePass = priceMatch(Number(item.price), filters.price);
      return pricePass;
    });
  }, [products, filters.price]);

  const FilterPanel = (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:w-72">
      <h2 className="text-2xl font-bold text-slate-800">Filters</h2>

      <div className="mt-6 space-y-2">
        <p className="font-semibold text-slate-700">Category</p>
        {categories.map((category) => (
          <label key={category} className="flex items-center gap-2 text-slate-600">
            <input
              type="radio"
              name="category"
              checked={filters.category === category}
              onChange={() => setFilters((prev) => ({ ...prev, category }))}
            />
            {category}
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <p className="font-semibold text-slate-700">Price Range</p>
        {["All", "Under 100", "100-500", "500-1000", "Over 1000"].map((price) => (
          <label key={price} className="flex items-center gap-2 text-slate-600">
            <input type="radio" name="price" checked={filters.price === price} onChange={() => setFilters((prev) => ({ ...prev, price }))} />
            {price}
          </label>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <p className="font-semibold text-slate-700">Availability</p>
        {["All", "In Stock", "Out of Stock"].map((availability) => (
          <label key={availability} className="flex items-center gap-2 text-slate-600">
            <input
              type="radio"
              name="availability"
              checked={filters.availability === availability}
              onChange={() => setFilters((prev) => ({ ...prev, availability }))}
            />
            {availability}
          </label>
        ))}
      </div>

      <div className="mt-6">
        <label className="font-semibold text-slate-700">Type/Breed</label>
        <input
          value={filters.typeBreed}
          onChange={(e) => setFilters((prev) => ({ ...prev, typeBreed: e.target.value }))}
          placeholder="e.g. Golden"
          className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2"
        />
      </div>
    </aside>
  );

  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-4xl font-bold text-slate-800">Showing {filteredProducts.length} products</h1>
          <div className="flex items-center gap-2">
            <input
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              className="rounded-full border border-slate-300 px-5 py-2"
              placeholder="Search in shop"
            />
            <button className="rounded-full border px-4 py-2 lg:hidden" onClick={() => setShowFilters(true)}>
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="hidden lg:block">{FilterPanel}</div>
          <div className="grid flex-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} onOrder={setSelectedProduct} />
            ))}
          </div>
        </div>
      </section>

      {showFilters && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 p-4 lg:hidden">
          <div className="mx-auto max-w-md">
            <div className="mb-3 flex justify-end">
              <button className="rounded-full bg-white px-4 py-2" onClick={() => setShowFilters(false)}>Close</button>
            </div>
            {FilterPanel}
          </div>
        </div>
      )}

      <Footer />
      {selectedProduct && <OrderForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </main>
  );
}
