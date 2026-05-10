"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.username === "admin" && form.password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
      return;
    }
    setError("Invalid credentials");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4f7f8] px-4">
      <form onSubmit={onSubmit} className="card-soft w-full max-w-md p-8">
        <div className="mb-4 flex items-center gap-3">
          <Image src="/brand/logo-mark.svg" alt="DreamPetAmbala" width={36} height={36} />
          <h1 className="text-2xl font-bold text-slate-800">Admin Login</h1>
        </div>
        <p className="mt-2 text-slate-500">Use admin credentials to access product management.</p>
        <div className="mt-6 space-y-4">
          <input
            value={form.username}
            onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
            placeholder="Username"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            className="w-full rounded-xl border border-slate-200 px-4 py-3"
          />
        </div>
        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
        <button className="btn-primary mt-6 w-full">Login</button>
      </form>
    </main>
  );
}
