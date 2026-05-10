import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export async function GET() {
  try {
    await connectDB();
    let categories = await Category.find().sort({ name: 1 }).lean();

    if (!categories.length) {
      const distinctCategories = await Product.distinct("category");
      if (distinctCategories.length) {
        const docs = distinctCategories.map((name) => ({
          name,
          slug: name.toLowerCase().replace(/\s+/g, "-"),
        }));
        await Category.insertMany(docs, { ordered: false }).catch(() => null);
      }
      categories = await Category.find().sort({ name: 1 }).lean();
    }

    return NextResponse.json({ success: true, data: categories });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const slug = body.name.toLowerCase().replace(/\s+/g, "-");
    const created = await Category.create({ name: body.name, slug });
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create category" }, { status: 500 });
  }
}
