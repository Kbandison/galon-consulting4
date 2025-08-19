import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date"); // Expecting YYYY-MM-DD
  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("bookings")
    .select("time")
    .eq("date", date);

  if (error) {
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }

  // Return array of booked times, e.g. ["9:00 am", "2:00 pm"]
  return NextResponse.json({ bookedTimes: data.map((d) => d.time) });
}
