"use client";

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

        {/* Rating */}
        {cert.rating && (
          <div className="flex items-center justify-between pt-2 border-t border-border dark:border-dark-border">
            <span className="text-xs text-text-secondary flex items-center gap-1">
              <Star size={11} className="text-amber-400 fill-amber-400" />
              {cert.rating} · {cert.enrolled ? `${(cert.enrolled / 1000).toFixed(0)}k enrolled` : ""}
            </span>
            <span className="text-xs font-medium text-secondary dark:text-primary flex items-center gap-1">
              Enroll <ExternalLink size={10} />
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
