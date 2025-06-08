import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Supabase setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
// Resend setup
const resend = new Resend(process.env.RESEND_API_KEY);

 console.log("SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log("SUPABASE_KEY", process.env.SUPABASE_SERVICE_ROLE_KEY);
    
export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, message } = await req.json();

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, phone, message }]);

    if (dbError) {
      console.error("Supabase DB Error:", dbError);
      return NextResponse.json({ error: "Database error" + dbError }, { status: 500 });
    }

   


    // Send email via Resend...
    // (leave your code here)

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API Route Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

