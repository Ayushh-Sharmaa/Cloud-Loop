import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Globe, Users, ArrowRight, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Event {
  id: string;
  slug: string;
  title: string;
  organizer: string;
  type: string;
  date: string;
  endDate?: string;
  location: string;
  isOnline: boolean;
  registrationDeadline: string;
  description: string;
  prize?: string;
  tags: string[];
  registered?: number;
}

export function EventCard({ event }: { event: Event }) {
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsApplied(localStorage.getItem(`applied_${event.id}`) === "true");
    }
  }, [event.id]);

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.setItem(`applied_${event.id}`, "true");
    setIsApplied(true);
    // Open default registration link or search details
    window.open(`/events/${event.slug}`, "_blank");
  };

  return (
    <Link href={`/events/${event.slug}`} className="block h-full">
      <div className="card-base p-5 h-full flex flex-col gap-4">
        {/* Type badge */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full bg-secondary/10 text-secondary dark:bg-primary/10 dark:text-primary">
            {event.type}
          </span>
          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${event.isOnline ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
            {event.isOnline ? <><Globe size={9} /> Online</> : <><MapPin size={9} /> In-person</>}
          </span>
        </div>

        {/* Title & Organizer */}
        <div>
          <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary leading-snug mb-1">
            {event.title}
          </p>
          <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{event.organizer}</p>
        </div>

        {/* Description */}
        <p className="text-xs text-text-secondary dark:text-dark-text-secondary leading-relaxed line-clamp-2 flex-1">
          {event.description}
        </p>

        {/* Prize */}
        {event.prize && (
          <div className="px-3 py-2 rounded-xl bg-accent/8 border border-accent/20">
            <p className="text-xs font-medium text-accent">🏆 {event.prize}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border dark:border-dark-border">
          <div className="flex flex-col gap-0.5 text-xs text-text-secondary dark:text-dark-text-secondary">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(event.date)}
            </span>
            {event.registered && (
              <span className="flex items-center gap-1 text-[10px] text-text-secondary/80">
                <Users size={10} /> {(event.registered / 1000).toFixed(0)}k registered
              </span>
            )}
          </div>
          <div>
            {isApplied ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100/80 text-emerald-800 border border-emerald-200/50 shadow-[0_0_12px_rgba(16,185,129,0.2)] dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Registered
              </span>
            ) : (
              <button
                onClick={handleApply}
                className="text-xs font-semibold text-secondary hover:text-secondary/80 dark:text-primary dark:hover:text-primary/80 flex items-center gap-1 hover:underline transition-colors"
              >
                Register <ExternalLink size={11} />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
