"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Star, ExternalLink } from "lucide-react";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { cn, getDifficultyColor } from "@/lib/utils";

interface Cert {
  id: string;
  slug: string;
  name: string;
  provider: string;
  providerLogo?: string;
  difficulty: string;
  duration: string;
  cost: "Free" | "Paid";
  price: string;
  skills: string[];
  description: string;
  enrollUrl: string;
  rating?: number;
  enrolled?: number;
}

export function CertificationCard({ cert, compact }: { cert: Cert; compact?: boolean }) {
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApplied(localStorage.getItem(`applied_${cert.id}`) === "true");
    }
  }, [cert.id]);

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem(`applied_${cert.id}`, "true");
    setIsApplied(true);
    window.open(cert.enrollUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Link href={`/certifications/${cert.slug}`} className="block h-full">
      <div className="card-base p-5 h-full flex flex-col gap-3">
        {/* Provider */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ProviderLogo
              src={cert.providerLogo}
              alt={cert.provider}
              fallback={cert.provider}
              size="sm"
            />
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{cert.provider}</p>
          </div>
          <span className={cn(
            "text-[10px] font-semibold px-2 py-0.5 rounded-full",
            cert.cost === "Free"
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
          )}>
            {cert.cost === "Free" ? "Free" : cert.price}
          </span>
        </div>

        {/* Name */}
        <p className={cn("font-semibold text-text-primary dark:text-dark-text-primary leading-snug flex-1",
          compact ? "text-xs" : "text-sm"
        )}>
          {cert.name}
        </p>

        {!compact && (
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary leading-relaxed line-clamp-2">
            {cert.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap gap-1.5">
          <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", getDifficultyColor(cert.difficulty))}>
            {cert.difficulty}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary flex items-center gap-1">
            <Clock size={9} /> {cert.duration}
          </span>
        </div>

        {/* Rating & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border dark:border-dark-border">
          <span className="text-xs text-text-secondary flex items-center gap-1">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            {cert.rating ? `${cert.rating}` : "4.5"}
          </span>
          {isApplied ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 shadow-[0_0_12px_rgba(16,185,129,0.2)] dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Enrolled
            </span>
          ) : (
            <button
              onClick={handleApply}
              className="text-xs font-semibold text-secondary hover:text-secondary/80 dark:text-primary dark:hover:text-primary/80 flex items-center gap-1 hover:underline transition-colors"
            >
              Enroll <ExternalLink size={10} />
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
