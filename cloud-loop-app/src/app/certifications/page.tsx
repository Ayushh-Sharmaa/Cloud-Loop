"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { certifications } from "@/lib/data";
import { CertificationCard } from "@/components/cards/CertificationCard";
import { cn } from "@/lib/utils";

const providers = ["All", "Google Cloud", "Amazon Web Services", "Microsoft", "Meta (via Coursera)", "IBM (via Coursera)", "DeepLearning.AI (via Coursera)", "Cisco", "Google (via Coursera)"];
const difficulties = ["All", "Beginner", "Associate", "Intermediate", "Professional"];
const costs = ["All", "Free", "Paid"];

export default function CertificationsPage() {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [cost, setCost] = useState("All");

  const filtered = useMemo(() => certifications.filter((c) => {
    const matchSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase()) || c.provider.toLowerCase().includes(search.toLowerCase());
    const matchProv = provider === "All" || c.provider === provider;
    const matchDiff = difficulty === "All" || c.difficulty === difficulty;
    const matchCost = cost === "All" || c.cost === cost;
    return matchSearch && matchProv && matchDiff && matchCost;
  }), [search, provider, difficulty, cost]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">Certifications</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-3">Industry Certifications</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary max-w-xl">
            Google, AWS, Microsoft, IBM, Meta and more. Build credentials that get you hired.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search certifications, providers..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border dark:border-dark-border bg-white dark:bg-dark-card text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div className="flex flex-wrap gap-4">
            <FilterGroup label="Level" options={difficulties} value={difficulty} onChange={setDifficulty} />
            <FilterGroup label="Cost" options={costs} value={cost} onChange={setCost} />
          </div>
        </div>

        <p className="text-sm text-text-secondary mb-6">{filtered.length} certification{filtered.length !== 1 ? "s" : ""} found</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
              <CertificationCard cert={cert} />
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
            value === opt ? "bg-secondary text-white border-secondary dark:bg-primary dark:border-primary dark:text-dark-background font-semibold" : "border-border dark:border-dark-border text-text-secondary dark:text-dark-text-secondary hover:border-secondary/40 dark:hover:border-primary/40")}>
          {opt}
        </button>
      ))}
    </div>
  );
}
