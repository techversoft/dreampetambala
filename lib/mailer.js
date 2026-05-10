import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOrderEmail(order) {
  const html = `
    <h2>New Pet Store Order Request</h2>
    <p><strong>Customer Name:</strong> ${order.fullName}</p>
    <p><strong>Email:</strong> ${order.email}</p>
    <p><strong>Phone:</strong> ${order.phone}</p>
    <p><strong>Address:</strong> ${order.address}</p>
    <p><strong>Product Name:</strong> ${order.productName}</p>
    <p><strong>Quantity:</strong> ${order.quantity}</p>
    <p><strong>Message:</strong> ${order.message || "N/A"}</p>
  `;

  return transporter.sendMail({
    from: `Pet Store Orders <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order: ${order.productName}`,
    html,
  });
}
