import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />
      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6">
        <h1 className="text-5xl font-black text-slate-800">Privacy Policy</h1>
        <p className="mt-3 text-slate-500">Effective Date: 10/05/2026</p>

        <div className="mt-8 space-y-6 rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
          <p>We collect basic information such as name, email, phone, address, and product preferences to process order requests and provide customer support.</p>
          <p>We do not sell or rent your personal data. Data is used only for communication, order handling, and service improvement.</p>
          <p>We use secure technical measures to protect data, but users should also keep personal devices secure.</p>
          <p>You may request updates or deletion of your data by contacting support@dreampetambala.com.</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
