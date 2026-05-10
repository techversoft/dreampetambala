import Image from "next/image";
import Link from "next/link";
import { formatINR } from "@/lib/utils/format";

export default function ProductCard({ product, onOrder }) {
  return (
    <article className="card-soft overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/product/${product._id || product.id}`} className="block">
        <div className="h-56 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={900}
            height={700}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>
      </Link>
      <div className="space-y-3 p-4 md:p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#f58a5f]">{product.category}</p>
        <Link href={`/product/${product._id || product.id}`}>
          <h3 className="text-xl font-semibold text-slate-800 hover:text-[#f58a5f]">{product.name}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="text-2xl font-bold text-[#f58a5f]">{formatINR(product.price)}</span>
          <button
            onClick={() => onOrder(product)}
            className="btn-primary text-sm"
          >
            Order Now
          </button>
        </div>
      </div>
    </article>
  );
}
