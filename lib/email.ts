import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOrderNotification(orderData: {
  orderNumber: string;
  customer: { name: string; email: string; phone?: string };
  items: { name: string; quantity: number; price: number }[];
  total: number;
  shippingAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
}) {
  const itemsHtml = orderData.items
    .map(
      (item) =>
        `<tr>
          <td style="padding: 8px; border: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align:center;">${item.quantity}</td>
          <td style="padding: 8px; border: 1px solid #ddd; text-align:right;">$${(item.price * item.quantity).toFixed(2)} CAD</td>
        </tr>`
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0A2E; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #8A7AB8, #1D4ED8); padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #FCD34D;">✨ Magic Lips</h1>
        <p style="margin: 10px 0 0; color: #F9A8D4;">New Order Received!</p>
      </div>
      <div style="padding: 30px;">
        <h2 style="color: #A855F7;">Order #${orderData.orderNumber}</h2>
        
        <h3 style="color: #FCD34D; border-bottom: 1px solid #8A7AB8; padding-bottom: 10px;">Customer Details</h3>
        <p><strong>Name:</strong> ${orderData.customer.name}</p>
        <p><strong>Email:</strong> ${orderData.customer.email}</p>
        <p><strong>Phone:</strong> ${orderData.customer.phone || "N/A"}</p>
        <p><strong>Address:</strong> ${orderData.shippingAddress.address}, ${orderData.shippingAddress.city}, ${orderData.shippingAddress.province} ${orderData.shippingAddress.postalCode}, ${orderData.shippingAddress.country}</p>
        
        <h3 style="color: #FCD34D; border-bottom: 1px solid #8A7AB8; padding-bottom: 10px;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.05);">
          <thead>
            <tr style="background: rgba(157,142,196,0.3);">
              <th style="padding: 10px; border: 1px solid #8A7AB8; text-align:left;">Product</th>
              <th style="padding: 10px; border: 1px solid #8A7AB8;">Qty</th>
              <th style="padding: 10px; border: 1px solid #8A7AB8;">Total</th>
            </tr>
          </thead>
          <tbody style="color: #ddd;">
            ${itemsHtml}
          </tbody>
        </table>
        
        <div style="text-align: right; margin-top: 20px; padding: 20px; background: rgba(157,142,196,0.2); border-radius: 8px;">
          <h2 style="color: #FCD34D; margin: 0;">Total: $${orderData.total.toFixed(2)} CAD</h2>
        </div>
      </div>
      <div style="background: rgba(157,142,196,0.2); padding: 20px; text-align: center; color: #A855F7;">
        <p>Magic Lips — 3735 Dundas St W, York, ON M6S 2T6</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Magic Lips" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "magiclips2013@gmail.com",
      subject: `✨ New Order #${orderData.orderNumber} — Magic Lips`,
      html,
    });
    console.log("Order notification email sent");
  } catch (error) {
    console.error("Failed to send order email:", error);
  }
}

export async function sendContactNotification(contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0A2E; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #8A7AB8, #1D4ED8); padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #FCD34D;">✨ Magic Lips</h1>
        <p style="margin: 10px 0 0; color: #F9A8D4;">New Contact Message</p>
      </div>
      <div style="padding: 30px;">
        <p><strong>From:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone || "N/A"}</p>
        <div style="margin-top: 20px; padding: 20px; background: rgba(157,142,196,0.2); border-radius: 8px; border-left: 4px solid #A855F7;">
          <h3 style="color: #FCD34D; margin-top: 0;">Message:</h3>
          <p style="color: #ddd; white-space: pre-wrap;">${contactData.message}</p>
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Magic Lips Website" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || "magiclips2013@gmail.com",
      subject: `New Contact Message from ${contactData.name}`,
      html,
    });
  } catch (error) {
    console.error("Failed to send contact email:", error);
  }
}

export async function sendDiscountEmail(email: string, discountCode: string) {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0F0A2E; color: #fff; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #8A7AB8, #1D4ED8); padding: 30px; text-align: center;">
        <h1 style="margin: 0; font-size: 32px; color: #FCD34D;">✨ Magic Lips</h1>
        <p style="margin: 10px 0 0; color: #F9A8D4; font-size: 18px;">Your Exclusive Discount!</p>
      </div>
      <div style="padding: 40px; text-align: center;">
        <h2 style="color: #F9A8D4;">Welcome to the Magic Lips Family! 💄</h2>
        <p style="color: #ccc; font-size: 16px;">Thank you for subscribing! Here's your exclusive 10% off discount code:</p>
        <div style="margin: 30px auto; display: inline-block; background: linear-gradient(135deg, #8A7AB8, #1D4ED8); padding: 20px 40px; border-radius: 50px; border: 2px solid #FCD34D;">
          <h2 style="margin: 0; font-size: 32px; color: #FCD34D; letter-spacing: 4px;">${discountCode}</h2>
        </div>
        <p style="color: #A855F7; font-size: 14px; margin-top: 20px;">Use this code at checkout to get 10% off your first order!</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/shop" style="display: inline-block; margin-top: 20px; padding: 15px 40px; background: linear-gradient(135deg, #8A7AB8, #A855F7); color: white; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: bold;">Shop Now ✨</a>
      </div>
      <div style="background: rgba(157,142,196,0.2); padding: 20px; text-align: center; color: #A855F7;">
        <p>Magic Lips — 3735 Dundas St W, York, ON M6S 2T6</p>
        <p>Instagram: @magiclips2013 | TikTok: @magiclips02</p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Magic Lips" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "✨ Your 10% Discount Code from Magic Lips!",
      html,
    });
  } catch (error) {
    console.error("Failed to send discount email:", error);
  }
}
