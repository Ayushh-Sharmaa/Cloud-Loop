"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { events, EventCard } from "@/features/events";
import { cn } from "@/lib/utils";

const types = ["All", "Hackathon", "Competition", "Bootcamp", "Workshop", "Conference"];
const formats = ["All", "Online", "In-person"];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");
  const [format, setFormat] = useState("All");

  const filtered = useMemo(() => events.filter((e) => {
    const matchSearch = search === "" || e.title.toLowerCase().includes(search.toLowerCase()) || e.organizer.toLowerCase().includes(search.toLowerCase());
    const matchType = type === "All" || e.type === type;
    const matchFormat = format === "All" || (format === "Online" ? e.isOnline : !e.isOnline);
    return matchSearch && matchType && matchFormat;
  }), [search, type, format]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Events</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-3">Hackathons & Events</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary max-w-xl">
            Competitions, bootcamps, workshops and conferences — find your next event to build, learn, and connect.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search events, organizers..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap gap-4">
            <FilterGroup label="Type" options={types} value={type} onChange={setType} />
            <FilterGroup label="Format" options={formats} value={format} onChange={setFormat} />
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-6">{filtered.length} event{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((event, i) => (
            <motion.div key={event.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-xs text-text-secondary dark:text-dark-text-secondary font-medium">{label}:</span>
      {options.map((opt) => (
        <button key={opt} onClick={() => onChange(opt)}
          className={cn("text-xs px-3 py-1.5 rounded-full border transition-colors cursor-pointer",
            value === opt
              ? "bg-secondary text-white border-secondary dark:bg-primary dark:border-primary dark:text-dark-background font-semibold"
              : "border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary hover:border-secondary/40 dark:hover:border-primary/40")}>
          {opt}
        </button>
      ))}
    </div>
  );
}
