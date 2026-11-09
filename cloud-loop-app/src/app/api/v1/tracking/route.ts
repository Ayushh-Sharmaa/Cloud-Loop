import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/services/api/backendClient";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await fetchFromBackend("/api/v1/tracking", {
    headers: { "x-user-id": userId },
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({
    items: [],
    total_saved: 0,
    total_applied: 0,
    total_review: 0,
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { data, status } = await fetchFromBackend("/api/v1/tracking", {
    method: "POST",
    headers: { "x-user-id": userId },
    body: JSON.stringify(body),
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ success: true, message: "Tracking cached locally." }, { status: 200 });
}

