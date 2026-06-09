import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email, role, budget, message } = await req.json();

    if (!email || !role || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format. Please provide a real email address." }, { status: 400 });
    }

    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!pass) {
      console.error("Missing GMAIL_APP_PASSWORD. You must add it to .env.local and restart the server.");
      return NextResponse.json({ error: "Server misconfigured: Missing App Password. Did you restart the server?" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "adarshsrivastava1524@gmail.com",
        pass: pass,
      },
    });

    const mailOptions = {
      from: "adarshsrivastava1524@gmail.com",
      to: "adarshsrivastava1524@gmail.com",
      subject: `[HIRE ME INQUIRY] New offer for ${role}`,
      text: `Recruiter Email: ${email}\nRole: ${role}\nBudget: ${budget}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #10b981; border-radius: 8px; background-color: #f0fdf4;">
          <h2 style="color: #065f46; margin-top: 0;">🔥 New Hiring Inquiry</h2>
          <p><strong>Recruiter Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Role/Position:</strong> ${role}</p>
          <p><strong>Estimated Budget:</strong> ${budget || "Not Specified"}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #ffffff; border: 1px solid #d1fae5; border-radius: 6px;">
            <h4 style="margin-top: 0; color: #047857;">Message:</h4>
            <p style="margin: 0; white-space: pre-wrap; color: #1f2937;">${message}</p>
          </div>
        </div>
      `,
    };

    await transporter.verify(); // Verifies if the email configuration actually works
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending hire email:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}
