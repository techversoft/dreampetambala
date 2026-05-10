"use client";

import { useMemo, useState } from "react";

const defaultForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  productName: "",
  quantity: 1,
  message: "",
};

export default function OrderForm({ product, onClose }) {
  const [formData, setFormData] = useState({ ...defaultForm, productName: product?.name || "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", success: false });

  const validators = useMemo(
    () => ({
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^[+]?[0-9\s-]{7,15}$/,
    }),
    []
  );

  const validate = () => {
    const nextErrors = {};
    ["fullName", "email", "phone", "address", "productName", "quantity"].forEach((key) => {
      if (!formData[key]) nextErrors[key] = "This field is required";
    });
    if (formData.email && !validators.email.test(formData.email)) nextErrors.email = "Invalid email format";
    if (formData.phone && !validators.phone.test(formData.phone)) nextErrors.phone = "Invalid phone number";
    if (Number(formData.quantity) < 1) nextErrors.quantity = "Quantity must be at least 1";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus({ loading: true, message: "", success: false });
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to place order");
      setStatus({ loading: false, message: data.message, success: true });
      setFormData({ ...defaultForm, productName: product?.name || "" });
    } catch (error) {
      setStatus({ loading: false, message: error.message, success: false });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === "quantity" ? Number(value) : value }));
  };

  const fields = [
    { name: "fullName", label: "Full Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "phone", label: "Phone Number", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "productName", label: "Product Name", type: "text", readOnly: true },
    { name: "quantity", label: "Quantity", type: "number", min: 1 },
  ];

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-800">Place Your Order</h2>
          <button onClick={onClose} className="text-3xl leading-none text-slate-400 hover:text-slate-700">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.name} className={`text-sm font-medium text-slate-700 ${field.name === "address" || field.name === "productName" ? "md:col-span-2" : ""}`}>
              {field.label}
              <input
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                readOnly={field.readOnly}
                min={field.min}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base outline-none focus:border-[#f58a5f]"
              />
              {errors[field.name] && <span className="mt-1 block text-xs text-red-500">{errors[field.name]}</span>}
            </label>
          ))}

          <label className="text-sm font-medium text-slate-700 md:col-span-2">
            Message (Optional)
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-base outline-none focus:border-[#f58a5f]"
              placeholder="Any special request?"
            />
          </label>

          {status.message && (
            <p className={`md:col-span-2 text-sm ${status.success ? "text-green-600" : "text-red-500"}`}>{status.message}</p>
          )}

          <button
            type="submit"
            disabled={status.loading}
            className="md:col-span-2 rounded-full bg-[#f58a5f] px-6 py-3 text-lg font-semibold text-white transition hover:bg-[#eb7a4d] disabled:opacity-70"
          >
            {status.loading ? "Sending..." : "Submit Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
