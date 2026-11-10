import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/services/api/backendClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();
  const path = `/api/v1/opportunities${queryString ? `?${queryString}` : ""}`;

  const { data, error, status } = await fetchFromBackend(path);
  if (data) {
    return NextResponse.json(data);
  }

  // Fallback to static datasets
  try {
    const [
      { jobs },
      { internships },
      { events },
      { programs },
    ] = await Promise.all([
      import("@/features/jobs"),
      import("@/features/internships"),
      import("@/features/events"),
      import("@/features/programs"),
    ]);

    const typeFilter = searchParams.get("type")?.toLowerCase();
    const query = searchParams.get("search")?.toLowerCase() || "";

    let all: any[] = [];
    if (!typeFilter || typeFilter === "job") all.push(...jobs);
    if (!typeFilter || typeFilter === "internship") all.push(...internships);
    if (!typeFilter || typeFilter === "event") all.push(...events);
    if (!typeFilter || typeFilter === "program") all.push(...programs);

    if (query) {
      all = all.filter(
        (i) =>
          (i.role || i.title || i.name || "").toLowerCase().includes(query) ||
          (i.company || i.provider || i.organizer || "").toLowerCase().includes(query)
      );
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const offset = (page - 1) * limit;

    return NextResponse.json({
      total: all.length,
      page,
      limit,
      items: all.slice(offset, offset + limit),
    });
  } catch (err) {
    return NextResponse.json({ total: 0, page: 1, limit: 20, items: [] });
  }
}

