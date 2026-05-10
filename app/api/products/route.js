import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";
import seedProducts from "@/data/products.json";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const availability = searchParams.get("availability");
    const search = searchParams.get("search") || "";
    const typeBreed = searchParams.get("typeBreed") || "";
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 1000);

    const query = {};
    if (category && category !== "All") query.category = category;
    if (availability && availability !== "All") query.availability = availability;

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { typeBreed: { $regex: search, $options: "i" } },
      ];
    }

    if (typeBreed) {
      query.typeBreed = { $regex: typeBreed, $options: "i" };
    }

    let total = await Product.countDocuments(query);

    if (!total) {
      const enriched = seedProducts.map((item) => ({
        ...item,
        typeBreed: item.name,
        availability: "In Stock",
      }));
      await Product.insertMany(enriched);
      total = await Product.countDocuments(query);
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const created = await Product.create(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 });
  }
}
