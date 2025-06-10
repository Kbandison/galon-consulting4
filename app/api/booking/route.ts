import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ICS helpers
function formatICSDate(d: Date) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
function addOneHour(d: Date) {
  const nd = new Date(d);
  nd.setHours(nd.getHours() + 1);
  return nd;
}

export async function POST(req: NextRequest) {
  const { name, email, phone, service, date, time, notes } = await req.json();

  // Double-booking prevention
  const { count, error: checkError } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true })
    .eq("date", date)
    .eq("time", time)
    .eq("service", service);

  if (checkError) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }
  if (count && count > 0) {
    return NextResponse.json(
      { error: "This time slot is already booked. Please choose another." },
      { status: 409 }
    );
  }

  // Insert booking
  const { error } = await supabase
    .from("bookings")
    .insert([{ name, email, phone, service, date, time, notes }]);
  if (error) {
    return NextResponse.json({ error: "Database error." }, { status: 500 });
  }

  // --- ICS CALENDAR ATTACHMENT ---
  // Convert the date and time to a JS Date object (assuming local time; adapt for timezones if needed)
  const startDateTime = new Date(`${date} ${time}`);
  const endDateTime = addOneHour(startDateTime);
  const location = "3355 Sweetwater Rd Apt 4303, Lawrenceville, GA 30044";

  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Galon Consulting//EN
BEGIN:VEVENT
UID:${Date.now()}@galonconsulting.com
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(startDateTime)}
DTEND:${formatICSDate(endDateTime)}
SUMMARY:${service}
DESCRIPTION:Appointment for ${name} (${email}, ${phone})
LOCATION:${location}
END:VEVENT
END:VCALENDAR
`.trim();

  // Styled HTML (same as before, but you can add a note about the ICS file)
  const businessHtml = `
  <div style="max-width:480px;margin:0 auto;padding:32px 24px;background:#f7f8fa;border-radius:14px;font-family:system-ui,Arial,sans-serif;color:#2d3748;">
    <h1 style="color:#19b2ff;font-size:2rem;margin:0 0 18px 0;">New Booking!</h1>
    <p style="margin-bottom:24px;">A new appointment has been booked. Here are the details:</p>
    <table style="width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 6px rgba(25,178,255,0.07);">
      <tbody>
        <tr><td style="padding:10px 16px;font-weight:600;width:120px;">Name:</td><td style="padding:10px 16px;">${name}</td></tr>
        <tr style="background:#f7fafc;"><td style="padding:10px 16px;font-weight:600;">Email:</td><td style="padding:10px 16px;">${email}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;">Phone:</td><td style="padding:10px 16px;">${phone || "<i>None</i>"}</td></tr>
        <tr style="background:#f7fafc;"><td style="padding:10px 16px;font-weight:600;">Service:</td><td style="padding:10px 16px;">${service}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;">Date:</td><td style="padding:10px 16px;">${date}</td></tr>
        <tr style="background:#f7fafc;"><td style="padding:10px 16px;font-weight:600;">Time:</td><td style="padding:10px 16px;">${time}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;">Notes:</td><td style="padding:10px 16px;">${notes || "<i>None</i>"}</td></tr>
      </tbody>
    </table>
    <p style="margin:32px 0 0 0;font-size:15px;color:#718096;">
      This is an automated notification from your website.
    </p>
  </div>
  `;

  const customerHtml = `
  <div style="max-width:480px;margin:0 auto;padding:32px 24px;background:#f7f8fa;border-radius:14px;font-family:system-ui,Arial,sans-serif;color:#2d3748;">
    <h1 style="color:#19b2ff;font-size:2rem;margin:0 0 18px 0;">Appointment Confirmed</h1>
    <p style="margin-bottom:22px;">Hi ${name},<br>Your appointment is booked. Here are the details:</p>
    <table style="width:100%;border-collapse:collapse;background:white;border-radius:10px;overflow:hidden;box-shadow:0 2px 6px rgba(25,178,255,0.07);">
      <tbody>
        <tr><td style="padding:10px 16px;font-weight:600;width:120px;">Service:</td><td style="padding:10px 16px;">${service}</td></tr>
        <tr style="background:#f7fafc;"><td style="padding:10px 16px;font-weight:600;">Date:</td><td style="padding:10px 16px;">${date}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;">Time:</td><td style="padding:10px 16px;">${time}</td></tr>
      </tbody>
    </table>
    <p style="margin:32px 0 0 0;font-size:15px;">
      If you need to reschedule or have any questions, reply to this email or call us at <a href="tel:7702563765" style="color:#19b2ff;">770-256-3765</a>.<br>
      <br>We look forward to seeing you!
    </p>
    <div style="margin-top:38px;text-align:center;color:#b2b2b2;font-size:13px;">
      &mdash; Galon Consulting Services
    </div>
  </div>
  `;

  // --- Send emails with ICS attachment ---
  await resend.emails.send({
    from: "Galon Consulting <onboarding@resend.dev>",
    to: ["kbandison@gmail.com"],
    subject: "New Booking",
    html: businessHtml,
    attachments: [
      {
        filename: "appointment.ics",
        content: icsContent,
        contentType: "text/calendar",
      },
    ],
  });

  await resend.emails.send({
    from: "Galon Consulting <onboarding@resend.dev>",
    to: [email],
    subject: "Your Appointment is Confirmed!",
    html: customerHtml,
    attachments: [
      {
        filename: "appointment.ics",
        content: icsContent,
        contentType: "text/calendar",
      },
    ],
  });

  return NextResponse.json({ success: true });
}
