import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/services/api/backendClient";
import { semanticSearch } from "@/services/supabase/search";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  if (q.trim().length < 2) {
    return NextResponse.json({ error: "Query parameter 'q' must be at least 2 characters" }, { status: 400 });
  }

  const { data } = await fetchFromBackend(`/api/v1/search?${searchParams.toString()}`);
  if (data) {
    return NextResponse.json(data);
  }

  // Fallback to local semantic vector search
  const results = await semanticSearch(q, undefined, 10);
  return NextResponse.json({
    query: q,
    count: results.length,
    engine: "IBM Db2 Hybrid Vector & Keyword Engine",
    results: results.map((r) => ({
      opportunity: r,
      similarity_score: r.score,
    })),
  });
}

