import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us",
  description: "Contact DreamPetAmbala support for orders and assistance.",
};

const details = [
  { title: "Email Us", line1: "support@dreampetambala.com", line2: "We reply within 24 hours" },
  { title: "Call Us", line1: "+91 98765 43210", line2: "Mon-Sat, 9AM-7PM IST" },
  { title: "Visit Us", line1: "Model Town, Ambala City", line2: "Store hours: 10AM-8PM" },
  { title: "Support Hours", line1: "24/7 Online Support", line2: "Always here to help" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />

      <section className="bg-[#eef5f5] py-20 text-center">
        <h1 className="text-6xl font-black text-slate-800">Get in Touch</h1>
        <p className="mx-auto mt-4 max-w-4xl text-2xl text-slate-500">Have a question? We would love to hear from you. Send us a message and we will respond quickly.</p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:col-span-2">
          <h2 className="text-5xl font-black text-slate-800">Send us a Message</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div>
              <label className="text-lg font-semibold text-slate-700">First Name</label>
              <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="John" />
            </div>
            <div>
              <label className="text-lg font-semibold text-slate-700">Last Name</label>
              <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Doe" />
            </div>
            <div className="md:col-span-2">
              <label className="text-lg font-semibold text-slate-700">Email</label>
              <input type="email" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="john@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="text-lg font-semibold text-slate-700">Phone</label>
              <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="+91 00000 00000" />
            </div>
            <div className="md:col-span-2">
              <label className="text-lg font-semibold text-slate-700">Subject</label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <option>General Inquiry</option>
                <option>Order Support</option>
                <option>Product Suggestion</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-lg font-semibold text-slate-700">Message</label>
              <textarea rows={6} className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" placeholder="Tell us how we can help you" />
            </div>
          </div>
          <button type="button" className="mt-7 rounded-full bg-[#f58a5f] px-8 py-3 text-lg font-semibold text-white">Send Message</button>
        </form>

        <div className="space-y-4">
          {details.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-3xl font-bold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-xl text-slate-700">{item.line1}</p>
              <p className="mt-1 text-lg text-slate-500">{item.line2}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
