"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { jobs, JobCard } from "@/features/jobs";
import { cn } from "@/lib/utils";

const categories = ["All", "Software", "AI/ML", "Cloud", "Frontend", "Backend", "Data", "DevOps"];
const locationTypes = ["All", "Remote", "Hybrid", "Onsite"];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [locType, setLocType] = useState("All");
  const [easyApply, setEasyApply] = useState(false);

  const filtered = useMemo(() => jobs.filter((j) => {
    const matchSearch = search === "" || j.role.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || j.category === category;
    const matchLoc = locType === "All" || j.locationType === locType.toLowerCase();
    const matchEasy = !easyApply || j.isEasyApply;
    return matchSearch && matchCat && matchLoc && matchEasy;
  }), [search, category, locType, easyApply]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Jobs</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-3">Fresher & Entry-Level Jobs</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary max-w-xl">
            Full-time roles at top companies across software, AI/ML, cloud, data, and more. Freshers welcome.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles, companies..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <FilterGroup label="Category" options={categories} value={category} onChange={setCategory} />
            <FilterGroup label="Location" options={locationTypes} value={locType} onChange={setLocType} />
            <button onClick={() => setEasyApply(!easyApply)}
              className={cn("text-xs px-3 py-1.5 rounded-full border transition-colors",
                easyApply ? "bg-primary text-white border-primary" : "border-border text-text-secondary")}>
              ⚡ Easy Apply only
            </button>
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-6">{filtered.length} job{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((job, i) => (
            <motion.div key={job.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <JobCard job={job} />
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
