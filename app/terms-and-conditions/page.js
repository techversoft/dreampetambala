import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        <h1 className="text-5xl font-black text-slate-800">Terms and Conditions</h1>
        <p className="mt-3 text-slate-500">Effective Date: 10/05/2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          <p>By using DreamPetAmbala, you agree to provide accurate information while placing order requests.</p>
          <p>Pricing, product details, and availability may change without prior notice.</p>
          <p>Orders placed through the platform are request-based and confirmed by our team via direct communication.</p>
          <p>Any misuse of the platform, fraudulent activity, or abuse may lead to restricted access.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
