import { NextResponse } from "next/server";
import { sendOrderEmail } from "@/lib/mailer";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[+]?[0-9\s-]{7,15}$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, address, productName, quantity, message } = body;

    if (!fullName || !email || !phone || !address || !productName || !quantity) {
      return NextResponse.json(
        { success: false, message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    await sendOrderEmail({ fullName, email, phone, address, productName, quantity, message });

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to send order email. Please try again." },
      { status: 500 }
    );
  }
}
