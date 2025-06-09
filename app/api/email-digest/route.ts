/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

function getLastName(name: string) {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.length > 1
    ? parts[parts.length - 1].toLowerCase()
    : parts[0].toLowerCase();
}

export async function GET(req: NextRequest) {
  // 1. Get the last digest timestamp
  let lastDigestAt = "2000-01-01T00:00:00Z";
  {
    const { data } = await supabase
      .from("digest_metadata")
      .select("last_digest_at")
      .order("id", { ascending: true })
      .limit(1);
    if (data && data[0]?.last_digest_at) lastDigestAt = data[0].last_digest_at;
  }

  // 2. Get all submissions, ordered newest to oldest
  const { data: allData, error: fetchError } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("submitted_at", { ascending: false });

  if (fetchError) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
  if (!allData.length) {
    return NextResponse.json({ message: "No contact submissions found." });
  }

  // 3. Deduplicate by email (keep latest per email)
  const uniqueByEmail = new Map();
  for (const item of allData) {
    if (!uniqueByEmail.has(item.email)) {
      uniqueByEmail.set(item.email, item);
    }
  }
  let uniqueLeads = Array.from(uniqueByEmail.values());

  // 4. Sort by last name (case-insensitive)
  uniqueLeads = uniqueLeads.sort((a, b) =>
    getLastName(a.name).localeCompare(getLastName(b.name))
  );

  // 5. Find new leads since last digest
  const newLeads = allData
    .filter((item) => item.submitted_at > lastDigestAt)
    .reduce(
      (acc, item) => {
        // Only include latest submission per email among new leads
        if (!acc.find((x: any) => x.email === item.email)) acc.push(item);
        return acc;
      },
      [] as typeof allData
    );

  // If there are no new leads, do not send email
  if (!newLeads.length) {
    return NextResponse.json({
      message: "No new submissions since last digest.",
    });
  }

  // 6. Build the HTML email
  const leadRow = (item: any) => `
    <tr>
      <td style="padding:8px;border:1px solid #e5e7eb;">${item.name || ""}</td>
      <td style="padding:8px;border:1px solid #e5e7eb;">${item.email}</td>
      <td style="padding:8px;border:1px solid #e5e7eb;">${item.phone || "<i>N/A</i>"}</td>
    </tr>
  `;

  const emailBody = `
    <div style="font-family:Arial,sans-serif;">
      <h2 style="color:#1c3e63;margin-top:0;">New Leads Since Last Digest</h2>
      <table style="border-collapse:collapse;width:100%;max-width:540px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Name</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Email</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Phone</th>
          </tr>
        </thead>
        <tbody>
          ${newLeads.map(leadRow).join("")}
        </tbody>
      </table>

      <hr style="margin:28px 0 22px 0;border:none;border-top:1px solid #e5e7eb;" />
      <h2 style="color:#1c3e63;margin-bottom:0;">All Unique Leads</h2>
      <table style="border-collapse:collapse;width:100%;max-width:540px;">
        <thead>
          <tr style="background:#f1f5f9;">
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Name</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Email</th>
            <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Phone</th>
          </tr>
        </thead>
        <tbody>
          ${uniqueLeads.map(leadRow).join("")}
        </tbody>
      </table>
      <div style="margin-top:24px;font-size:13px;color:#6b7280;">
        ${uniqueLeads.length} unique leads<br/>
        <span>This is an automated summary of all unique contacts.</span>
      </div>
    </div>
  `;

  // 7. Send the digest email
  await resend.emails.send({
    from: "Galon Consulting <noreply@yourdomain.com>",
    to: ["owner@email.com"], // <-- set business owner email
    subject: "Daily Contact Leads Digest",
    html: emailBody,
  });

  // 8. Update the last_digest_at
  await supabase
    .from("digest_metadata")
    .update({ last_digest_at: new Date().toISOString() })
    .eq("id", 1);

  return NextResponse.json({ success: true, sent: newLeads.length });
}
