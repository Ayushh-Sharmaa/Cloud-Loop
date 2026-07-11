"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatusSelectorProps {
  id: string;
  className?: string;
}

type StatusType = "None" | "Applied" | "Under Review" | "Not Interested";

const statusConfig = {
  None: {
    label: "Track Status",
    badgeClass: "bg-gray-100 hover:bg-gray-200 text-text-secondary border-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-dark-text-secondary dark:border-gray-700",
    dotClass: "bg-gray-400",
    pulse: false,
  },
  Applied: {
    label: "Applied",
    badgeClass: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]",
    dotClass: "bg-emerald-500",
    pulse: true,
  },
  "Under Review": {
    label: "Under Review",
    badgeClass: "bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30 shadow-[0_0_12px_rgba(59,130,246,0.15)]",
    dotClass: "bg-blue-500",
    pulse: true,
  },
  "Not Interested": {
    label: "Not Interested",
    badgeClass: "bg-rose-500/10 text-rose-700 border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
    dotClass: "bg-rose-500",
    pulse: false,
  },
};

export function StatusSelector({ id, className }: StatusSelectorProps) {
  const [status, setStatus] = useState<StatusType>("None");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(`status_${id}`) as StatusType;
      if (saved && statusConfig[saved]) {
        setStatus(saved);
      }
    }
  }, [id]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectStatus = (newStatus: StatusType, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus(newStatus);
    localStorage.setItem(`status_${id}`, newStatus);
    // Maintain backward compatibility with old applied state
    localStorage.setItem(`applied_${id}`, newStatus === "Applied" ? "true" : "false");
    setIsOpen(false);
    
    // Dispatch a custom event to notify other components (e.g. Dashboard)
    window.dispatchEvent(new Event("status-changed"));
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const current = statusConfig[status];

  return (
    <div className={cn("relative inline-block text-left", className)} ref={containerRef}>
      <button
        onClick={toggleDropdown}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer select-none",
          current.badgeClass
        )}
      >
        <span className="relative flex h-2 w-2">
          {current.pulse && (
            <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", current.dotClass)}></span>
          )}
          <span className={cn("relative inline-flex rounded-full h-2 w-2", current.dotClass)}></span>
        </span>
        {current.label}
        <ChevronDown size={11} className={cn("opacity-70 transition-transform duration-200", isOpen && "transform rotate-180")} />
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 bottom-full mb-2 w-36 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card shadow-lg z-50 py-1 overflow-hidden"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {(Object.keys(statusConfig) as StatusType[]).map((key) => {
            const config = statusConfig[key];
            return (
              <button
                key={key}
                onClick={(e) => selectStatus(key, e)}
                className={cn(
                  "w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2",
                  status === key ? "text-text-primary dark:text-dark-text-primary bg-black/5 dark:bg-white/5" : "text-text-secondary dark:text-dark-text-secondary"
                )}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full", config.dotClass)}></span>
                {key === "None" ? "Untrack" : key}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
