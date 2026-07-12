"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { internships } from "@/lib/data";
import { InternshipCard } from "@/components/cards/InternshipCard";
import { cn } from "@/lib/utils";

const locationTypes = ["All", "Remote", "Hybrid", "Onsite"];
const payTypes = ["All", "Paid", "Unpaid"];

export default function InternshipsPage() {
  const [search, setSearch] = useState("");
  const [locType, setLocType] = useState("All");
  const [payType, setPayType] = useState("All");

  const filtered = useMemo(() => internships.filter((i) => {
    const matchSearch = search === "" || i.role.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase());
    const matchLoc = locType === "All" || i.locationType === locType.toLowerCase();
    const matchPay = payType === "All" || (payType === "Paid" ? i.isPaid : !i.isPaid);
    return matchSearch && matchLoc && matchPay;
  }), [search, locType, payType]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Internships</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-3">Internship Openings</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary max-w-xl">
            Paid and unpaid internships at top companies — Google, Amazon, Microsoft, ISRO, CERN and more.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search roles, companies..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap gap-4">
            <FilterGroup label="Location" options={locationTypes} value={locType} onChange={setLocType} />
            <FilterGroup label="Type" options={payTypes} value={payType} onChange={setPayType} />
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-6">{filtered.length} internship{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {filtered.map((internship, i) => (
            <motion.div key={internship.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <InternshipCard internship={internship} />
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
