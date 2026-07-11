"use client";

import Link from "next/link";
import { Clock, Users, Bookmark, Zap, ExternalLink } from "lucide-react";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { cn, getDeadlineLabel, getStatusColor, getDifficultyColor } from "@/lib/utils";

interface Program {
  id: string;
  slug: string;
  name: string;
  provider: string;
  providerLogo?: string;
  category: string;
  status: "open" | "closed";
  difficulty: string;
  duration: string;
  deadline: string;
  eligibility: string;
  keyBenefit: string;
  description: string;
  tags: string[];
  website: string;
  featured?: boolean;
  applicants?: number;
}

export function ProgramCard({ program, featured }: { program: Program; featured?: boolean }) {
  return (
    <Link href={`/programs/${program.slug}`} className="block h-full">
      <div
        className={cn(
          "card-base p-5 h-full flex flex-col gap-4 cursor-pointer",
          featured && "border-primary/20 bg-gradient-card"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <ProviderLogo
              src={program.providerLogo}
              alt={program.provider}
              fallback={program.provider}
              size="md"
            />
            <div>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{program.provider}</p>
              <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary leading-tight">{program.name}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide", getStatusColor(program.status))}>
              {program.status}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-text-secondary dark:text-dark-text-secondary leading-relaxed line-clamp-2 flex-1">
          {program.keyBenefit}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", getDifficultyColor(program.difficulty))}>
            {program.difficulty}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
            <Clock size={9} /> {program.duration}
          </span>
          {program.applicants && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
              <Users size={9} /> {(program.applicants / 1000).toFixed(0)}k+ applied
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border dark:border-dark-border">
          <span className="text-xs text-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
            <Zap size={11} className="text-amber-500" />
            {getDeadlineLabel(program.deadline)}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => e.preventDefault()}
              aria-label="Bookmark"
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-text-secondary transition-colors"
            >
              <Bookmark size={13} />
            </button>
            <span className="text-xs font-medium text-secondary dark:text-primary flex items-center gap-1">
              Apply <ExternalLink size={11} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
