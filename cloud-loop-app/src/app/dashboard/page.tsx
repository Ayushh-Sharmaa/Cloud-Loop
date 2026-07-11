"use client";

import { useState, useEffect } from "react";
import { Bookmark, Send, Clock, Award, Bell } from "lucide-react";
import { programs, events, internships, jobs, certifications } from "@/lib/data";
import { formatDate, cn } from "@/lib/utils";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface DashboardItem {
  id: string;
  title: string;
  type: string;
  deadline: string;
  daysLeft?: number;
  status: "None" | "Applied" | "Under Review" | "Not Interested";
  slug: string;
  link: string;
}

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser();
  const [savedOpps, setSavedOpps] = useState<DashboardItem[]>([]);
  const [trackedOpps, setTrackedOpps] = useState<DashboardItem[]>([]);
  const [deadlines, setDeadlines] = useState<DashboardItem[]>([]);
  const [stats, setStats] = useState({ saved: 0, applied: 0, review: 0, untracked: 0 });

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      window.location.href = "/sign-in";
    }
  }, [isLoaded, isSignedIn]);

  const loadData = () => {
    if (typeof window === "undefined") return;

    // Compile all opportunities
    const allItems: DashboardItem[] = [
      ...programs.map((p) => ({
        id: p.id,
        title: p.name,
        type: "Program",
        deadline: p.deadline,
        slug: p.slug,
        link: `/programs/${p.slug}`,
        status: (localStorage.getItem(`status_${p.id}`) || "None") as any,
      })),
      ...events.map((e) => ({
        id: e.id,
        title: e.title,
        type: "Event",
        deadline: e.registrationDeadline,
        slug: e.slug,
        link: `/events/${e.slug}`,
        status: (localStorage.getItem(`status_${e.id}`) || "None") as any,
      })),
      ...internships.map((i) => ({
        id: i.id,
        title: `${i.role} at ${i.company}`,
        type: "Internship",
        deadline: i.deadline,
        slug: i.slug,
        link: `/internships/${i.slug}`,
        status: (localStorage.getItem(`status_${i.id}`) || "None") as any,
      })),
      ...jobs.map((j) => ({
        id: j.id,
        title: `${j.role} at ${j.company}`,
        type: "Job",
        deadline: j.deadline,
        slug: j.slug,
        link: `/jobs/${j.slug}`,
        status: (localStorage.getItem(`status_${j.id}`) || "None") as any,
      })),
      ...certifications.map((c) => ({
        id: c.id,
        title: c.name,
        type: "Certification",
        deadline: "Ongoing",
        slug: c.slug,
        link: `/certifications/${c.slug}`,
        status: (localStorage.getItem(`status_${c.id}`) || "None") as any,
      })),
    ];

    // Filter Saved (Bookmarked)
    const saved = allItems.filter(
      (item) => localStorage.getItem(`bookmarked_${item.id}`) === "true"
    );

    // Filter Tracked (status is not None)
    const tracked = allItems.filter((item) => item.status !== "None");

    // Calculate deadlines
    const upcoming = allItems
      .filter((item) => item.deadline !== "Ongoing" && item.status !== "Not Interested")
      .map((item) => {
        const diffTime = new Date(item.deadline).getTime() - new Date().getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...item, daysLeft };
      })
      .filter((item) => item.daysLeft !== undefined && item.daysLeft > 0)
      .sort((a, b) => (a.daysLeft || 0) - (b.daysLeft || 0))
      .slice(0, 5);

    setSavedOpps(saved);
    setTrackedOpps(tracked);
    setDeadlines(upcoming);

    // Calculate Stats
    const appliedCount = tracked.filter((i) => i.status === "Applied").length;
    const reviewCount = tracked.filter((i) => i.status === "Under Review").length;

    setStats({
      saved: saved.length,
      applied: appliedCount,
      review: reviewCount,
      untracked: allItems.length - tracked.length,
    });
  };

  useEffect(() => {
    loadData();

    // Listen for storage or status-changed events to keep dashboard synced
    window.addEventListener("status-changed", loadData);
    window.addEventListener("storage", loadData);
    return () => {
      window.removeEventListener("status-changed", loadData);
      window.removeEventListener("storage", loadData);
    };
  }, []);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-background dark:bg-dark-background flex items-center justify-center pt-24">
        <div className="animate-pulse text-text-secondary">Verifying credentials...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-1">Your Dashboard</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">Track your opportunities and upcoming deadlines synced to this device.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Saved", value: stats.saved, icon: Bookmark, color: "text-primary" },
            { label: "Applied", value: stats.applied, icon: Send, color: "text-emerald-500" },
            { label: "Under Review", value: stats.review, icon: Clock, color: "text-blue-500" },
            { label: "Opportunities", value: stats.untracked, icon: Award, color: "text-accent" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card-base p-5">
                <Icon size={20} className={stat.color} />
                <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mt-2">{stat.value}</p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Saved + Tracked */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tracked Opportunities */}
            <section>
              <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Send size={18} className="text-emerald-500" /> Tracked Opportunities
              </h2>
              {trackedOpps.length === 0 ? (
                <div className="card-base p-6 text-center text-text-secondary">
                  No tracked opportunities. Change the status on any card to track it here.
                </div>
              ) : (
                <div className="space-y-3">
                  {trackedOpps.map((opp) => (
                    <Link key={opp.id} href={opp.link} className="block">
                      <div className="card-base p-4 flex items-center justify-between gap-4 hover:border-primary/20 transition-all">
                        <div>
                          <p className="font-medium text-sm text-text-primary dark:text-dark-text-primary">{opp.title}</p>
                          <p className="text-xs text-text-secondary">{opp.type} · Due {opp.deadline !== "Ongoing" ? formatDate(opp.deadline) : "Ongoing"}</p>
                        </div>
                        <span className={cn(
                          "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                          opp.status === "Applied" && "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
                          opp.status === "Under Review" && "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                          opp.status === "Not Interested" && "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        )}>
                          {opp.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Saved Opportunities */}
            <section>
              <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Bookmark size={18} className="text-primary" /> Saved Opportunities
              </h2>
              {savedOpps.length === 0 ? (
                <div className="card-base p-6 text-center text-text-secondary">
                  No bookmarked opportunities yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedOpps.map((opp) => (
                    <Link key={opp.id} href={opp.link} className="block">
                      <div className="card-base p-4 flex items-center justify-between gap-4 hover:border-primary/20 transition-all">
                        <div>
                          <p className="font-medium text-sm text-text-primary dark:text-dark-text-primary">{opp.title}</p>
                          <p className="text-xs text-text-secondary">{opp.type} · Due {opp.deadline !== "Ongoing" ? formatDate(opp.deadline) : "Ongoing"}</p>
                        </div>
                        <span className="text-xs font-semibold text-secondary dark:text-primary">
                          View details →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right: Deadlines */}
          <div>
            <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" /> Upcoming Deadlines
            </h2>
            {deadlines.length === 0 ? (
              <div className="card-base p-4 text-center text-text-secondary text-sm">
                No upcoming deadlines.
              </div>
            ) : (
              <div className="space-y-3">
                {deadlines.map((d, i) => (
                  <Link key={i} href={d.link} className="block">
                    <div className="card-base p-4 hover:border-primary/20 transition-all">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-xs text-text-primary dark:text-dark-text-primary truncate max-w-[70%]">{d.title}</p>
                        <span className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                          (d.daysLeft || 0) <= 7 ? "bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400"
                        )}>
                          {d.daysLeft}d left
                        </span>
                      </div>
                      <p className="text-[10px] text-text-secondary">{d.type} · Due {formatDate(d.deadline)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
