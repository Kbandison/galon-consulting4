import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Insert into Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions") // <-- Your table name here
      .insert([{ name, email, phone, message }]);
    if (dbError) {
      console.error("Supabase DB Error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // 1. Notify business
    const notificationEmailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#f6f8fa;padding:30px 24px;border-radius:14px;border:1px solid #e5e7eb;">
        <h2 style="color:#1c3e63;margin-bottom:8px;">New Contact Submission</h2>
        <p style="font-size:16px;color:#374151;">You received a new message from <b>${name}</b>:</p>
        <ul style="padding-left:18px;margin:10px 0 18px 0;">
          <li><b>Name:</b> ${name}</li>
          <li><b>Email:</b> ${email}</li>
          <li><b>Phone:</b> ${phone || "<i>Not provided</i>"}</li>
        </ul>
        <div style="margin-top:14px;padding:14px 18px;background:#f1f5f9;border-radius:8px;border-left:4px solid #10b981;">
          <b>Message:</b><br/>${message}
        </div>
        <hr style="margin:24px 0;border:none;border-top:1px solid #e5e7eb;" />
        <div style="font-size:12px;color:#6b7280;">
          Galon Consulting Services, LLC<br/>
          ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Galon Consulting - New Contact <onboarding@resend.dev>", // Use a domain you own and have set up in Resend
      to: ["kbandison@gmail.com"],
      subject: "New Contact Form Submission",
      html: notificationEmailHtml,
      replyTo: email,
    });

    // 2. Auto-responder to user
    const autoresponderEmailHtml = `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;background:#f6f8fa;padding:30px 24px;border-radius:14px;border:1px solid #e5e7eb;">
        <h2 style="color:#1c3e63;margin-bottom:8px;">Thank You for Contacting Galon Consulting Services!</h2>
        <p style="font-size:16px;color:#374151;">
          Hi ${name},<br/><br/>
          We have received your message and will respond as soon as possible.<br/>
          <br/>
          <b>Your message:</b><br/>
          <span style="display:block;margin:12px 0 18px 0;padding:14px 18px;background:#f1f5f9;border-radius:8px;border-left:4px solid #10b981;">${message}</span>
          <br/>
          <b>Our business hours:</b> 9am–5pm, Monday–Saturday
        </p>
        <div style="margin-top:24px;font-size:14px;color:#6b7280;">
          <b>Galon Consulting Services, LLC</b><br/>
          galonconsulting@outlook.com | 770-256-3765
        </div>
      </div>
    `;

    await resend.emails.send({
      from: "Galon Consulting <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Galon Consulting Services!",
      html: autoresponderEmailHtml,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
