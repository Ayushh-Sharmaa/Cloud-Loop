import { NextResponse } from "next/server";
import { jobs } from "@/features/jobs";
import { internships } from "@/features/internships";
import { events } from "@/features/events";
import { programs } from "@/features/programs";
import { certifications } from "@/features/certifications";
import path from "path";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATS_PATH = path.join(process.cwd(), "src", "features", "jobs", "data", "scraper-stats.json");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "all";
    const category = searchParams.get("category");
    const search = searchParams.get("search")?.toLowerCase().trim();
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);

    // Read live scraper stats if present
    let stats: any = {
      lastScraped: new Date().toISOString(),
      totalJobs: jobs.length,
      totalInternships: internships.length,
      totalEvents: events.length,
      totalPrograms: programs.length,
      totalCertifications: certifications.length,
      totalScraped: jobs.length + internships.length + events.length + programs.length,
      success: true,
    };

    try {
      const statsExists = await fs.access(STATS_PATH).then(() => true).catch(() => false);
      if (statsExists) {
        const statsRaw = await fs.readFile(STATS_PATH, "utf-8");
        const parsed = JSON.parse(statsRaw);
        stats = {
          ...stats,
          ...parsed,
          totalJobs: jobs.length,
          totalInternships: internships.length,
          totalEvents: events.length,
          totalPrograms: programs.length,
          totalCertifications: certifications.length,
          totalScraped: jobs.length + internships.length + events.length + programs.length,
        };
      }
    } catch (e) {
      console.warn("Could not read scraper-stats in opportunities route:", e);
    }

    if (type === "summary") {
      return NextResponse.json({
        stats,
        counts: {
          jobs: jobs.length,
          internships: internships.length,
          events: events.length,
          programs: programs.length,
          certifications: certifications.length,
          total: jobs.length + internships.length + events.length + programs.length + certifications.length,
        },
      });
    }

    // Return the specific type or all
    let responseData: any = {
      stats,
      counts: {
        jobs: jobs.length,
        internships: internships.length,
        events: events.length,
        programs: programs.length,
        certifications: certifications.length,
        total: jobs.length + internships.length + events.length + programs.length + certifications.length,
      }
    };

    if (type === "jobs" || type === "all") {
      let filteredJobs = jobs;
      if (category && category !== "All") filteredJobs = filteredJobs.filter((j) => j.category === category);
      if (search) {
        filteredJobs = filteredJobs.filter((j) =>
          j.role.toLowerCase().includes(search) || j.company.toLowerCase().includes(search) || j.skills.some(s => s.toLowerCase().includes(search))
        );
      }
      responseData.jobs = type === "jobs" ? filteredJobs.slice((page - 1) * limit, page * limit) : filteredJobs.slice(0, 100);
      responseData.totalJobs = filteredJobs.length;
    }

    if (type === "internships" || type === "all") {
      let filteredInterns = internships;
      if (search) {
        filteredInterns = filteredInterns.filter((i) =>
          i.role.toLowerCase().includes(search) || i.company.toLowerCase().includes(search) || i.skills.some(s => s.toLowerCase().includes(search))
        );
      }
      responseData.internships = type === "internships" ? filteredInterns.slice((page - 1) * limit, page * limit) : filteredInterns.slice(0, 100);
      responseData.totalInternships = filteredInterns.length;
    }

    if (type === "events" || type === "all") {
      let filteredEvents = events;
      if (category && category !== "All") filteredEvents = filteredEvents.filter((e) => e.type === category);
      if (search) {
        filteredEvents = filteredEvents.filter((e) =>
          e.title.toLowerCase().includes(search) || e.organizer.toLowerCase().includes(search)
        );
      }
      responseData.events = type === "events" ? filteredEvents.slice((page - 1) * limit, page * limit) : filteredEvents;
      responseData.totalEvents = filteredEvents.length;
    }

    if (type === "programs" || type === "all") {
      let filteredPrograms = programs;
      if (category && category !== "All") filteredPrograms = filteredPrograms.filter((p) => p.category === category);
      if (search) {
        filteredPrograms = filteredPrograms.filter((p) =>
          p.name.toLowerCase().includes(search) || p.provider.toLowerCase().includes(search)
        );
      }
      responseData.programs = type === "programs" ? filteredPrograms.slice((page - 1) * limit, page * limit) : filteredPrograms;
      responseData.totalPrograms = filteredPrograms.length;
    }

    if (type === "certifications" || type === "all") {
      responseData.certifications = certifications;
    }

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error("GET /api/opportunities error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
