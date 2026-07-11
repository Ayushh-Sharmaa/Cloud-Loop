"use client";

import Link from "next/link";
import { MapPin, Bookmark, Zap } from "lucide-react";
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
            <button onClick={(e) => e.preventDefault()} aria-label="Save" className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-text-secondary transition-colors">
              <Bookmark size={13} />
            </button>
            <span className="text-xs font-medium text-secondary dark:text-primary">Apply →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
