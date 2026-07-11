"use client";

import { useState, useEffect } from "react";
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
  const [isApplied, setIsApplied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApplied(localStorage.getItem(`applied_${program.id}`) === "true");
      setIsBookmarked(localStorage.getItem(`bookmarked_${program.id}`) === "true");
    }
  }, [program.id]);

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem(`applied_${program.id}`, "true");
    setIsApplied(true);
    window.open(program.website, "_blank", "noopener,noreferrer");
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    const next = !isBookmarked;
    localStorage.setItem(`bookmarked_${program.id}`, next ? "true" : "false");
    setIsBookmarked(next);
  };

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
              onClick={handleBookmark}
              aria-label="Bookmark"
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
