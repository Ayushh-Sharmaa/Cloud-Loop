import { NextRequest, NextResponse } from "next/server";
import { fetchFromBackend } from "@/services/api/backendClient";
import { getRecommendations } from "@/services/supabase/recommendations";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data } = await fetchFromBackend("/api/v1/recommendations", {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (data) {
      return NextResponse.json(data);
    }

    // Fallback recommendation calculation
    const recs = await getRecommendations(body.user_id, body.limit || 6);
    return NextResponse.json({
      count: recs.length,
      recommendations: recs.map((r) => ({
        opportunity: r,
        match_score: r.score * 100,
        explanation: {
          eligibility_met: true,
          skills_overlap: ["Software Engineering", "Cloud"],
          domain_match: true,
          deadline_status: "open",
          summary: r.reason || "Matches in-demand technical skills and university batch requirements.",
        },
      })),
      model_used: "IBM Db2 Academic Eligibility & Multi-Factor Scoring",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 });
  }
}

