import { NextResponse } from "next/server";
import { fetchFromBackend } from "@/services/api/backendClient";

export async function GET() {
  const { data, error, status } = await fetchFromBackend("/api/v1/health");
  if (data) {
    return NextResponse.json(data);
  }
  return NextResponse.json(
    {
      status: "degraded",
      message: "Python FastAPI backend offline; fallback services active.",
      error,
      database: {
        engine: "IBM Db2 Enterprise Service Layer",
        status: "operational (direct fallback mode)",
      },
    },
    { status: 200 }
  );
}

