import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us",
  description: "Know DreamPetAmbala mission, story, and values.",
};

const values = [
  { title: "Pet Lovers First", text: "Everything we do is driven by care for animals and their wellbeing." },
  { title: "Quality Products", text: "We carefully curate every product to ensure high quality for your pets." },
  { title: "Fast Delivery", text: "Quick and reliable shipping so your pets never have to wait." },
  { title: "Expert Support", text: "Our team is always here to help you with product guidance." },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f8]">
      <Navbar />

      <section className="bg-[#eef5f5] py-24 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <h1 className="text-6xl font-black text-slate-800">About DreamPetAmbala</h1>
          <p className="mt-5 text-2xl leading-10 text-slate-500">
            We are passionate pet lovers on a mission to make pet care easier, affordable, and joyful for pet parents everywhere.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-5xl font-black text-slate-800">Our Story</h2>
          <p className="mt-6 text-xl leading-10 text-slate-600">
            Founded by devoted pet parents, DreamPetAmbala started to solve one simple problem: access to high-quality pet essentials at fair prices.
          </p>
          <p className="mt-4 text-xl leading-10 text-slate-600">
            Today, we serve thousands of families with trusted pet products and a service experience that feels personal and reliable.
          </p>
        </div>
        <div className="overflow-hidden rounded-[2rem] shadow-lg">
          <Image src="https://images.unsplash.com/photo-1633722715463-d30f4f325e24?auto=format&fit=crop&w=1200&q=80" alt="Our story" width={1200} height={900} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <h2 className="text-center text-5xl font-black text-slate-800">Our Values</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {values.map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <h3 className="text-3xl font-bold text-slate-800">{item.title}</h3>
              <p className="mt-3 text-lg leading-8 text-slate-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-7xl gap-8 rounded-[2rem] bg-gradient-to-r from-[#f8ede8] to-[#edf7f4] px-4 py-12 md:grid-cols-2 md:px-10">
        <div>
          <h3 className="text-5xl font-black text-slate-800">Our Mission</h3>
          <p className="mt-4 text-2xl leading-10 text-slate-600">To provide pet parents everything they need while making the shopping journey delightful and stress-free.</p>
          <div className="mt-8 grid grid-cols-2 gap-5">
            <div><p className="text-5xl font-black text-[#f58a5f]">100K+</p><p className="text-lg text-slate-500">Happy Customers</p></div>
            <div><p className="text-5xl font-black text-[#f58a5f]">5,000+</p><p className="text-lg text-slate-500">Products</p></div>
            <div><p className="text-5xl font-black text-[#f58a5f]">4.9</p><p className="text-lg text-slate-500">Average Rating</p></div>
            <div><p className="text-5xl font-black text-[#f58a5f]">24/7</p><p className="text-lg text-slate-500">Support</p></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Image src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80" alt="Cat" width={800} height={800} className="rounded-3xl object-cover" />
          <Image src="https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=crop&w=800&q=80" alt="Dog" width={800} height={800} className="rounded-3xl object-cover" />
          <Image src="https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=800&q=80" alt="Bird" width={800} height={800} className="rounded-3xl object-cover" />
          <Image src="https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=800&q=80" alt="Fish" width={800} height={800} className="rounded-3xl object-cover" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
