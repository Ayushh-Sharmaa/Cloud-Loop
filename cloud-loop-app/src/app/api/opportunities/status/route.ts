import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ data: [] });
    }

    const { data, error } = await supabaseAdmin
      .from("tracked_opportunities")
      .select("opportunity_id, status, bookmarked")
      .eq("user_id", userId);

    if (error) {
      // If table doesn't exist yet, return empty list so it fails gracefully
      if (error.code === "P0001" || error.message.includes("does not exist")) {
        return NextResponse.json({ data: [], warning: "Table does not exist yet" });
      }
      throw error;
    }

    return NextResponse.json({ data: data || [] });
  } catch (error: any) {
    console.error("Supabase GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { opportunityId, status, bookmarked } = body;

    if (!opportunityId) {
      return NextResponse.json({ error: "Missing opportunityId" }, { status: 400 });
    }

    // Prepare upsert payload
    const payload: any = {
      user_id: userId,
      opportunity_id: opportunityId,
      updated_at: new Date().toISOString(),
    };

    if (status !== undefined) payload.status = status;
    if (bookmarked !== undefined) payload.bookmarked = bookmarked;

    const { data, error } = await supabaseAdmin
      .from("tracked_opportunities")
      .upsert(payload, { onConflict: "user_id,opportunity_id" })
      .select();

    if (error) throw error;

    return NextResponse.json({ data: data?.[0] });
  } catch (error: any) {
    console.error("Supabase POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
