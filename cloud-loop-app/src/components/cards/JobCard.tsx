"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Bookmark, Zap, ExternalLink } from "lucide-react";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { cn, getDeadlineLabel } from "@/lib/utils";

interface Job {
  id: string;
  slug: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  salaryRange: string;
  experience: string;
  category: string;
  skills: string[];
  isEasyApply: boolean;
  deadline: string;
  posted: string;
  description: string;
  tags: string[];
}

export function JobCard({ job }: { job: Job }) {
  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApplied(localStorage.getItem(`applied_${job.id}`) === "true");
      setIsBookmarked(localStorage.getItem(`bookmarked_${job.id}`) === "true");
    }
  }, [job.id]);

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem(`applied_${job.id}`, "true");
    setIsApplied(true);
    window.open(`/jobs/${job.slug}`, "_blank");
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !isBookmarked;
    localStorage.setItem(`bookmarked_${job.id}`, next ? "true" : "false");
    setIsBookmarked(next);
  };

  return (
    <Link href={`/jobs/${job.slug}`} className="block h-full">
      <div className="card-base p-5 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <ProviderLogo
            src={job.companyLogo}
            alt={job.company}
            fallback={job.company}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary truncate">{job.role}</p>
              {job.isEasyApply && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/15 text-primary uppercase tracking-wide shrink-0">
                  Easy Apply
                </span>
              )}
            </div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{job.company}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
          <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            💰 {job.salaryRange}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
            {job.experience}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {job.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border dark:border-dark-border">
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
            <Zap size={11} className="text-amber-500" />
            {getDeadlineLabel(job.deadline)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmark}
              aria-label="Save"
              className={cn(
                "p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors",
                isBookmarked ? "text-amber-500 fill-amber-500" : "text-text-secondary"
              )}
            >
              <Bookmark size={13} />
            </button>
            {isApplied ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 shadow-[0_0_12px_rgba(16,185,129,0.2)] dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Applied
              </span>
            ) : (
              <button
                onClick={handleApply}
                className="text-xs font-semibold text-secondary hover:text-secondary/80 dark:text-primary dark:hover:text-primary/80 flex items-center gap-1 hover:underline transition-colors"
              >
                Apply <ExternalLink size={11} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
