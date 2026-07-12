"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Search, Sparkles, Zap, Globe } from "lucide-react";
import { programs, events, categories } from "@/lib/data";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { EventCard } from "@/components/cards/EventCard";
import { InternshipCard } from "@/components/cards/InternshipCard";
import { JobCard } from "@/components/cards/JobCard";
import { CertificationCard } from "@/components/cards/CertificationCard";
import { internships, jobs, certifications, successStories, faqs } from "@/lib/data";
import {
  Award, Calendar, Briefcase, Building2, BadgeCheck,
  GraduationCap, FlaskConical, Users, ChevronDown, Quote
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>> = {
  Award, Calendar, Briefcase, Building2, BadgeCheck,
  GraduationCap, FlaskConical, Users,
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const featured = programs.filter((p) => p.featured);
  const trending = programs.slice(0, 6);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 overflow-hidden bg-background dark:bg-dark-background">
        {/* Soft gradient blobs */}
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8 glow-ring"
          >
            <Sparkles size={14} />
            <span>2,400+ opportunities updated daily</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6 text-text-primary dark:text-dark-text-primary"
          >
            Discover Every{" "}
            <span className="text-gradient">Student Opportunity.</span>
            <br />
            One Platform.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-lg sm:text-xl text-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Google Cloud Arcade, GSoC, MLSA, AWS Educate, campus hackathons,
            paid internships, fresher jobs, and industry certifications — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
          >
            <Link
              href="/programs"
              className="btn-gradient px-8 py-3.5 rounded-pill text-base font-semibold text-white inline-flex items-center gap-2 justify-center"
            >
              Explore Programs
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/internships"
              className="px-8 py-3.5 rounded-pill text-base font-semibold border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors inline-flex items-center gap-2 justify-center"
            >
              Browse Opportunities
            </Link>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white dark:bg-dark-card border border-border dark:border-dark-border shadow-card search-container">
              <Search size={20} className="text-text-secondary dark:text-dark-text-secondary shrink-0" />
              <input
                type="text"
                placeholder="Search programs, internships, jobs, certifications..."
                style={{}}
                className="flex-1 bg-transparent text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary text-sm focus:outline-none"
                aria-label="Search opportunities"
              />
              <button className="btn-gradient px-5 py-2 rounded-xl text-sm font-semibold text-white shrink-0">
                Search
              </button>
            </div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-3 flex items-center gap-4 justify-center">
              <span className="flex items-center gap-1"><Zap size={12} className="text-primary" /> 120+ Programs</span>
              <span className="flex items-center gap-1"><Globe size={12} className="text-secondary" /> 340+ Events</span>
              <span className="flex items-center gap-1"><Briefcase size={12} className="text-accent" /> 890+ Internships</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Opportunities ── */}
      <section className="section-padding bg-background-alt dark:bg-dark-background-alt">
        <div className="container-narrow">
          <SectionHeader
            label="Featured"
            title="Top Student Programs"
            subtitle="Hand-picked programs from the world's best tech companies. Highly competitive — apply early."
            href="/programs"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map((program, i) => (
              <motion.div key={program.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <ProgramCard program={program} featured />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Programs ── */}
      <section className="section-padding bg-background dark:bg-dark-background">
        <div className="container-narrow">
          <SectionHeader
            label="Trending"
            title="Popular Right Now"
            subtitle="Programs students are applying to this week."
            href="/programs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((program, i) => (
              <motion.div key={program.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="section-padding bg-background-alt dark:bg-dark-background-alt">
        <div className="container-narrow">
          <SectionHeader
            label="Events"
            title="Upcoming Hackathons & Events"
            subtitle="Hackathons, bootcamps, and conferences happening soon."
            href="/events"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.slice(0, 3).map((event, i) => (
              <motion.div key={event.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Internships ── */}
      <section className="section-padding bg-background dark:bg-dark-background">
        <div className="container-narrow">
          <SectionHeader
            label="Internships"
            title="Latest Internship Openings"
            subtitle="Paid internships at top companies, updated daily."
            href="/internships"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {internships.slice(0, 4).map((internship, i) => (
              <motion.div key={internship.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <InternshipCard internship={internship} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Latest Jobs ── */}
      <section className="section-padding bg-background-alt dark:bg-dark-background-alt">
        <div className="container-narrow">
          <SectionHeader
            label="Jobs"
            title="Fresher & Entry-Level Jobs"
            subtitle="Full-time roles at top companies, freshers welcome."
            href="/jobs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {jobs.slice(0, 4).map((job, i) => (
              <motion.div key={job.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <JobCard job={job} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="section-padding bg-background dark:bg-dark-background">
        <div className="container-narrow">
          <SectionHeader
            label="Certifications"
            title="Industry-Recognized Certificates"
            subtitle="From Google, AWS, Microsoft, IBM and more. Build credentials that matter."
            href="/certifications"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.slice(0, 4).map((cert, i) => (
              <motion.div key={cert.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <CertificationCard cert={cert} compact />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="section-padding bg-background-alt dark:bg-dark-background-alt">
        <div className="container-narrow">
          <SectionHeader
            label="Browse"
            title="Explore by Category"
            subtitle="Find exactly what you're looking for."
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Award;
              return (
                <motion.div key={cat.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                  <Link
                    href={`/${cat.id}`}
                    className="card-base p-5 flex flex-col gap-3 group cursor-pointer block"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${cat.color}22` }}
                    >
                      <Icon size={20} style={{ color: cat.color }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary">{cat.name}</p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-0.5">{cat.count}+ listed</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Success Stories ── */}
      <section className="section-padding bg-background dark:bg-dark-background">
        <div className="container-narrow">
          <SectionHeader
            label="Stories"
            title="Students Who Made It"
            subtitle="Real journeys. Real results."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {successStories.map((story, i) => (
              <motion.div key={story.id} variants={fadeUp} initial="hidden" whileInView="visible" custom={i} viewport={{ once: true }}>
                <div className="card-base p-6 h-full flex flex-col gap-4">
                  <Quote size={24} className="text-primary/40" />
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed flex-1">
                    &quot;{story.quote}&quot;
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-border dark:border-dark-border">
                    <div className="w-10 h-10 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {story.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary">{story.name}</p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{story.role}</p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{story.university}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="section-padding bg-background-alt dark:bg-dark-background-alt">
        <div className="container-narrow">
          <div className="rounded-2xl bg-gradient-brand p-px">
            <div className="rounded-2xl bg-[#0d1b3e] dark:bg-[#060d22] p-10 md:p-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get the weekly digest
              </h2>
              <p className="text-white/70 max-w-md mx-auto mb-8 text-base">
                Every Friday — the top 10 opportunities you shouldn&apos;t miss. No spam, unsubscribe any time.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50"
                  aria-label="Email for newsletter"
                />
                <button className="px-6 py-3 rounded-xl bg-white text-secondary font-semibold text-sm hover:bg-white/90 transition-colors whitespace-nowrap">
                  Subscribe Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-background dark:bg-dark-background" id="faq">
        <div className="container-narrow max-w-2xl">
          <SectionHeader
            label="FAQ"
            title="Common Questions"
            subtitle="Everything you need to know about Cloud Loop."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                custom={i}
                viewport={{ once: true }}
                className="card-base overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-sm text-text-primary dark:text-dark-text-primary">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={cn(
                      "shrink-0 text-text-secondary dark:text-dark-text-secondary transition-transform duration-200",
                      openFaq === i && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed border-t border-border dark:border-dark-border pt-4">
                    {faq.a}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({
  label,
  title,
  subtitle,
  href,
}: {
  label: string;
  title: string;
  subtitle: string;
  href?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-2 block">
          {label}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-text-primary dark:text-dark-text-primary leading-tight">
          {title}
        </h2>
        <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-1.5 max-w-lg">
          {subtitle}
        </p>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-secondary dark:text-primary hover:underline flex items-center gap-1"
        >
          View all <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}
