/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatINR } from "@/lib/utils/format";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  typeBreed: "",
  availability: "In Stock",
};

const pageSize = 12;

export default function AdminDashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState("");
  const [query, setQuery] = useState("");
  const [stock, setStock] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [page, setPage] = useState(1);

  const isEdit = useMemo(() => Boolean(editingId), [editingId]);

  const filtered = useMemo(() => {
    return products.filter((item) => {
      const qPass = !query || item.name.toLowerCase().includes(query.toLowerCase()) || item.typeBreed.toLowerCase().includes(query.toLowerCase());
      const sPass = stock === "All" || item.availability === stock;
      const cPass = catFilter === "All" || item.category === catFilter;
      return qPass && sPass && cPass;
    });
  }, [products, query, stock, catFilter]);

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));

  const stats = useMemo(() => {
    const inStock = products.filter((item) => item.availability === "In Stock").length;
    const outStock = products.filter((item) => item.availability === "Out of Stock").length;
    const avgPrice = products.length ? products.reduce((sum, item) => sum + Number(item.price), 0) / products.length : 0;
    return { total: products.length, inStock, outStock, avgPrice };
  }, [products]);

  const fetchAll = async () => {
    const [productRes, categoryRes] = await Promise.all([fetch("/api/products?limit=1000"), fetch("/api/categories")]);
    const productData = await productRes.json();
    const categoryData = await categoryRes.json();
    if (productData.success) setProducts(productData.data);
    if (categoryData.success) setCategories(categoryData.data);
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      router.replace("/admin");
      return;
    }
    fetchAll();
  }, [router]);

  useEffect(() => {
    setPage(1);
  }, [query, stock, catFilter]);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    const url = isEdit ? `/api/products/${editingId}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setForm(emptyForm);
      setEditingId("");
      fetchAll();
    }
  };

  const deleteProduct = async (id) => {
    const ok = confirm("Delete this product?");
    if (!ok) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchAll();
  };

  const editProduct = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
      typeBreed: product.typeBreed,
      availability: product.availability,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addCategory = async () => {
    const name = prompt("Enter category name");
    if (!name) return;
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    fetchAll();
  };

  return (
    <main className="min-h-screen bg-[#f4f7f8] px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Image src="/brand/logo-mark.svg" alt="DreamPetAmbala" width={36} height={36} />
            <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={addCategory} className="btn-secondary text-sm">Add Category</button>
            <button onClick={() => { localStorage.removeItem("adminAuth"); router.push("/admin"); }} className="btn-primary text-sm">Logout</button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <div className="card-soft p-4"><p className="text-slate-500">Total Products</p><p className="text-3xl font-bold">{stats.total}</p></div>
          <div className="card-soft p-4"><p className="text-slate-500">In Stock</p><p className="text-3xl font-bold text-green-600">{stats.inStock}</p></div>
          <div className="card-soft p-4"><p className="text-slate-500">Out of Stock</p><p className="text-3xl font-bold text-red-500">{stats.outStock}</p></div>
          <div className="card-soft p-4"><p className="text-slate-500">Avg Price</p><p className="text-3xl font-bold">{formatINR(stats.avgPrice)}</p></div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveProduct} className="card-soft p-5">
            <h2 className="text-xl font-semibold">{isEdit ? "Edit Product" : "Add Product"}</h2>
            <div className="mt-4 grid gap-3">
              <input required placeholder="Name" value={form.name} onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2" />
              <input required type="number" placeholder="Price (INR)" value={form.price} onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2" />
              <textarea required placeholder="Description" value={form.description} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2" />
              <input placeholder="Image URL" value={form.image} onChange={(e) => setForm((prev) => ({ ...prev, image: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2" />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="rounded-xl border border-slate-200 px-3 py-2" />
              {form.image && (
                <Image src={form.image} alt="Preview" width={400} height={250} className="h-36 w-full rounded-xl object-cover" />
              )}
              <select required value={form.category} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2">
                <option value="">Select Category</option>
                {categories.map((category) => (<option key={category._id} value={category.name}>{category.name}</option>))}
              </select>
              <input required placeholder="Type/Breed" value={form.typeBreed} onChange={(e) => setForm((prev) => ({ ...prev, typeBreed: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2" />
              <select value={form.availability} onChange={(e) => setForm((prev) => ({ ...prev, availability: e.target.value }))} className="rounded-xl border border-slate-200 px-3 py-2">
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="btn-primary text-sm">{isEdit ? "Update" : "Save"}</button>
              {isEdit && <button type="button" onClick={() => { setEditingId(""); setForm(emptyForm); }} className="btn-secondary text-sm">Cancel</button>}
            </div>
          </form>

          <div className="card-soft p-5">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name or breed" className="rounded-full border border-slate-300 px-4 py-2" />
              <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="rounded-full border border-slate-300 px-4 py-2">
                <option>All</option>
                {categories.map((category) => (<option key={category._id}>{category.name}</option>))}
              </select>
              <select value={stock} onChange={(e) => setStock(e.target.value)} className="rounded-full border border-slate-300 px-4 py-2">
                <option>All</option>
                <option>In Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2">Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Breed</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((product) => (
                    <tr key={product._id} className="border-b">
                      <td className="py-2">
                        <Image src={product.image} alt={product.name} width={70} height={50} className="h-12 w-16 rounded-lg object-cover" />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.typeBreed}</td>
                      <td>{formatINR(product.price)}</td>
                      <td>{product.availability}</td>
                      <td className="space-x-2">
                        <button onClick={() => editProduct(product)} className="text-blue-600">Edit</button>
                        <button onClick={() => deleteProduct(product._id)} className="text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">Showing {paginated.length} of {filtered.length}</p>
              <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="rounded border px-3 py-1 disabled:opacity-50">Prev</button>
                <span>{page} / {pages}</span>
                <button disabled={page === pages} onClick={() => setPage((p) => p + 1)} className="rounded border px-3 py-1 disabled:opacity-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
