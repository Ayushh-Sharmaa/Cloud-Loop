import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/services/api/backendClient";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data } = await fetchFromBackend("/api/v1/profile", {
    headers: { "x-user-id": userId },
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({
    user_id: userId,
    education: "Undergraduate Engineering Student",
    degree: "B.Tech / B.E.",
    study_year: 3,
    graduation_batch: "2026",
    skills: ["Python", "JavaScript", "React", "Cloud"],
    interests: ["Full Stack", "AI/ML"],
    preferred_domains: ["Software", "Cloud", "Open Source"],
    preferred_locations: ["Remote", "Bengaluru"],
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { data } = await fetchFromBackend("/api/v1/profile", {
    method: "POST",
    headers: { "x-user-id": userId },
    body: JSON.stringify(body),
  });

  if (data) {
    return NextResponse.json(data);
  }

  return NextResponse.json({ ...body, user_id: userId, updated_at: new Date().toISOString() });
}

