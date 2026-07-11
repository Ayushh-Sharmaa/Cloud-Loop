"use client";

import Link from "next/link";
import { MapPin, Clock, Bookmark, Zap, Banknote } from "lucide-react";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { cn, getDeadlineLabel } from "@/lib/utils";

interface Internship {
  id: string;
  slug: string;
  company: string;
  companyLogo?: string;
  role: string;
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  stipend: string;
  duration: string;
  isPaid: boolean;
  deadline: string;
  skills: string[];
  description: string;
  tags: string[];
}

const locationColors = {
  remote: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  hybrid: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  onsite: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export function InternshipCard({ internship }: { internship: Internship }) {
  return (
    <Link href={`/internships/${internship.slug}`} className="block h-full">
      <div className="card-base p-5 h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-start gap-3">
          <ProviderLogo
            src={internship.companyLogo}
            alt={internship.company}
            fallback={internship.company}
            size="md"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary truncate">{internship.role}</p>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{internship.company}</p>
          </div>
          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0", locationColors[internship.locationType])}>
            {internship.locationType}
          </span>
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap gap-2 text-xs text-text-secondary dark:text-dark-text-secondary">
          <span className="flex items-center gap-1"><MapPin size={11} />{internship.location}</span>
          <span className="flex items-center gap-1"><Clock size={11} />{internship.duration}</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400">
            <Banknote size={11} />{internship.stipend}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 flex-1">
          {internship.skills.slice(0, 4).map((skill) => (
            <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary">
              {skill}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border dark:border-dark-border">
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
            <Zap size={11} className="text-amber-500" />
            {getDeadlineLabel(internship.deadline)}
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
