import { notFound } from "next/navigation";
import Link from "next/link";
import { programs } from "@/lib/data";
import { formatDate, getStatusColor, getDifficultyColor, cn } from "@/lib/utils";
import {
  ExternalLink, Clock, Users, Calendar, CheckCircle2,
  Gift, Globe
} from "lucide-react";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) return {};
  return {
    title: `${program.name} — ${program.provider}`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const related = programs.filter((p) => p.id !== program.id && (p.provider === program.provider || p.category === program.category)).slice(0, 3);

  const benefits = [
    program.keyBenefit,
    "Access to exclusive workshops and webinars",
    "Certificate of completion and digital badge",
    "Networking with professionals from top tech companies",
    "Priority consideration for internships and full-time roles",
  ];

  const eligibilityPoints = [
    program.eligibility,
    "Basic understanding of the relevant technology domain",
    "Commitment to complete the program requirements",
    "Active student enrollment at an accredited institution",
  ];

  const timeline = [
    { label: "Applications Open", date: "Ongoing", done: true },
    { label: "Application Deadline", date: formatDate(program.deadline), done: false },
    { label: "Selection Announcement", date: "4–6 weeks after deadline", done: false },
    { label: "Program Start", date: "Rolling basis", done: false },
    { label: "Completion & Certificate", date: `After ${program.duration}`, done: false },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-20">
      {/* Hero */}
      <div className="bg-gradient-hero border-b border-border dark:border-dark-border py-14 px-4">
        <div className="container-narrow">
          <div className="flex items-start gap-5 mb-6">
          <ProviderLogo
              src={program.providerLogo}
              alt={program.provider}
              fallback={program.provider}
              size="lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", getStatusColor(program.status))}>
                  {program.status.toUpperCase()}
                </span>
                <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full", getDifficultyColor(program.difficulty))}>
                  {program.difficulty}
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary">
                  {program.category}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary dark:text-dark-text-primary">{program.name}</h1>
              <p className="text-text-secondary dark:text-dark-text-secondary mt-1">by {program.provider}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-text-secondary dark:text-dark-text-secondary mb-8">
            <span className="flex items-center gap-1.5"><Clock size={14} /> {program.duration}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Deadline: {formatDate(program.deadline)}</span>
            {program.applicants && <span className="flex items-center gap-1.5"><Users size={14} /> {program.applicants.toLocaleString()}+ applicants</span>}
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={program.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient px-6 py-3 rounded-pill text-sm font-semibold text-white inline-flex items-center gap-2"
            >
              Apply on Official Website <ExternalLink size={15} />
            </a>
            <button className="px-6 py-3 rounded-pill text-sm font-semibold border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Bookmark
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <Section title="Overview">
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">{program.description}</p>
            </Section>

            {/* Eligibility */}
            <Section title="Eligibility">
              <ul className="space-y-3">
                {eligibilityPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Benefits */}
            <Section title="What You Get">
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <Gift size={15} className="text-secondary dark:text-primary shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Timeline */}
            <Section title="Timeline">
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={cn(
                      "w-3 h-3 rounded-full mt-1.5 shrink-0 border-2",
                      item.done
                        ? "bg-emerald-500 border-emerald-500"
                        : "bg-transparent border-border dark:border-dark-border"
                    )} />
                    <div>
                      <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{item.label}</p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Quick Info */}
            <div className="card-base p-5 space-y-4">
              <h3 className="font-semibold text-sm text-text-primary dark:text-dark-text-primary">Quick Info</h3>
              <div className="space-y-3 text-sm">
                <InfoRow label="Provider" value={program.provider} />
                <InfoRow label="Category" value={program.category} />
                <InfoRow label="Duration" value={program.duration} />
                <InfoRow label="Difficulty" value={program.difficulty} />
                <InfoRow label="Deadline" value={formatDate(program.deadline)} />
              </div>
            </div>

            {/* Tags */}
            <div className="card-base p-5">
              <h3 className="font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {program.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-text-secondary dark:text-dark-text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Official Link */}
            <div className="card-base p-5">
              <h3 className="font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-3">Official Resources</h3>
              <a href={program.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary dark:text-primary hover:underline">
                <Globe size={14} /> Official Website <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-14 pt-10 border-t border-border dark:border-dark-border">
            <h2 className="text-xl font-bold text-text-primary dark:text-dark-text-primary mb-6">Related Programs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => <ProgramCard key={p.id} program={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 pb-2 border-b border-border dark:border-dark-border">
        {title}
      </h2>
      {children}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-secondary dark:text-dark-text-secondary">{label}</span>
      <span className="font-medium text-text-primary dark:text-dark-text-primary">{value}</span>
    </div>
  );
}
