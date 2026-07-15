"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import { programs } from "@/lib/data";
import { formatDate, getStatusColor, getDifficultyColor, cn } from "@/lib/utils";
import {
  ExternalLink, Clock, Users, Calendar, CheckCircle2,
  Gift, Globe, Copy, Check, X,
  BookOpen, Zap, AlertCircle, ChevronRight,
  Smartphone, Tablet, Headphones, FileText, Shield, Sparkles, ArrowLeft, Star
} from "lucide-react";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { ProviderLogo } from "@/components/ui/ProviderLogo";
import { useState, use } from "react";

// ─────────────────────────────────────────
// Google Cloud Arcade Custom Page
// ─────────────────────────────────────────

function ArcadeFacilitatorPage({ program }: { program: typeof programs[0] & { registrationForm?: string; facilitatorCode?: string } }) {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [ambassadorModal, setAmbassadorModal] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(program.facilitatorCode ?? "GCAF26-IN-MGG-3E2");
    setCopied(true);
    setShowToast(true);
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Toast Notification */}
      <div
        className={cn(
          "fixed top-20 right-4 z-50 transition-all duration-300",
          showToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-3 rounded-xl shadow-xl text-sm font-medium">
          <Check size={15} className="text-emerald-400 dark:text-emerald-600" />
          Facilitator Code Copied Successfully.
        </div>
      </div>

      {/* Ambassador Modal as Full-Screen Message */}
      {ambassadorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background dark:bg-dark-background p-4">
          <div className="w-full max-w-lg p-8 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto shadow-md">
              <AlertCircle size={36} className="text-amber-600 dark:text-amber-400 animate-bounce" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-text-primary dark:text-dark-text-primary">
                Applications are currently closed.
              </h2>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm leading-relaxed max-w-md mx-auto">
                We are not accepting Ambassador Applications at the moment.
              </p>
              <p className="text-text-primary dark:text-dark-text-primary font-bold text-sm leading-relaxed max-w-md mx-auto">
                Applications will reopen during the Second Week of August.
              </p>
              <p className="text-xs text-text-secondary dark:text-dark-text-secondary max-w-sm mx-auto">
                Stay connected with our official WhatsApp and Telegram communities for announcements.
              </p>
            </div>
            <button
              onClick={() => setAmbassadorModal(false)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-dark-text-primary hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-bold text-sm"
            >
              <ArrowLeft size={16} /> Back
            </button>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <div className="bg-gradient-to-br from-blue-950 via-indigo-950 to-purple-950 border-b border-white/10 pt-24 pb-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3,4,2,3].map((size, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-20"
              style={{
                width: size + "px",
                height: size + "px",
                background: i % 3 === 0 ? "#4ade80" : i % 3 === 1 ? "#f472b6" : "#60a5fa",
                left: ((i * 53) % 100) + "%",
                top: ((i * 77) % 100) + "%",
              }}
            />
          ))}
        </div>
        <div className="container-narrow relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="shrink-0">
              <Image
                src="/arcade-logo.png"
                alt="Google Cloud Arcade Facilitator"
                width={100}
                height={100}
                className="rounded-full ring-4 ring-white/20 shadow-2xl"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                  OPEN
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Beginner
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                  Cloud
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-1">
                Google Cloud Arcade Facilitator Program
              </h1>
              <p className="text-white/60 text-sm mt-1">by Google</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-white/70 mb-8">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-yellow-400" />
              13 July 2026 at 5:00 PM IST – 14 September 2026 at 11:59 PM IST
            </span>
            <span className="flex items-center gap-2">
              <Globe size={14} className="text-blue-400" />
              <a href="https://rsvp.withgoogle.com/events/arcade-facilitator/" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors">
                Official Program Website
              </a>
            </span>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3 mb-6 inline-flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-emerald-300 text-sm font-medium">
              Enrolments are now <span className="font-bold text-emerald-200">OPEN!</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://forms.gle/Z2TX54F8bQ4ooV5c9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 shadow-lg shadow-blue-500/30 transition-all duration-200 hover:scale-105"
            >
              Enroll Now <ExternalLink size={14} />
            </a>
            <button
              onClick={() => setAmbassadorModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Apply as Ambassador <ChevronRight size={14} />
            </button>
          </div>

          <p className="text-white/40 text-xs mt-3">
            Registration closes once all seats are filled or on 20 July 2026 at 11:59 PM IST, whichever comes first.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div className="container-narrow py-12 space-y-6">

        {/* ── FACILITATOR CODE ── */}
        <div
          onClick={handleCopy}
          className="group cursor-pointer rounded-2xl border border-blue-500/30 hover:border-blue-400/60 bg-white dark:bg-dark-card overflow-hidden transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/5"
        >
          <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
            <span className="p-1.5 rounded-lg border border-blue-200 dark:border-blue-500/30"><Copy size={18} /></span>
            <h2 className="font-bold text-base">Facilitator Code</h2>
          </div>
          <div className="px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                Click anywhere on this card to automatically copy the code.
              </p>
              <code className="block font-mono text-2xl font-black text-text-primary dark:text-dark-text-primary tracking-widest mt-1">
                GCAF26-IN-MGG-3E2
              </code>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); handleCopy(); }}
              className={cn(
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200",
                copied
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-primary text-white border border-primary"
              )}
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? "Copied Successfully!" : "Copy Code"}
            </button>
          </div>
        </div>

        {/* ── ABOUT THE PROGRAM ── */}
        <ArcadeSection icon={<BookOpen size={18} />} title="About the Program" accent="purple">
          <div className="space-y-4 text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            <p>
              The Google Cloud Arcade Facilitator Program is Google&apos;s official learning initiative designed for students who want to learn Google Cloud, Artificial Intelligence, Machine Learning, Data Analytics, Generative AI, and modern cloud technologies through hands-on learning.
            </p>
            <p>
              Participants complete Arcade Games, Skill Badges, Labs, and Quests while earning Arcade Points and milestone rewards. The program also provides free Google Cloud credits and access to an active learning community for guidance and support.
            </p>
            <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-medium">
              <CheckCircle2 size={16} className="shrink-0" />
              The program is completely free to join.
            </div>
          </div>
        </ArcadeSection>

        {/* ── AFTER REGISTRATION ── */}
        <ArcadeSection icon={<CheckCircle2 size={18} />} title="After Registration" accent="emerald">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-4">
            Within <span className="font-semibold text-text-primary dark:text-dark-text-primary">24–48 hours</span>, you&apos;ll receive an email titled:
          </p>
          <div className="bg-gray-950 dark:bg-black border border-emerald-500/30 rounded-xl p-4 mb-6 font-mono text-sm text-emerald-400 leading-relaxed font-bold">
            Congratulations, you&apos;re now enrolled in the Google Cloud Arcade Facilitator Program 2026
          </div>
          <ul className="space-y-3 mb-6">
            {[
              "Read the email carefully.",
              "Complete every required step.",
              "Claim your FREE 750 Google Cloud Credits.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <a
            href="https://tinyurl.com/759-Credits"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-md shadow-emerald-500/20 transition-all duration-200 hover:scale-105"
          >
            Claim 750 Credits Guide <ExternalLink size={13} />
          </a>
        </ArcadeSection>

        {/* ── NOW YOU'RE READY ── */}
        <ArcadeSection icon={<Zap size={18} />} title="You're All Set!" accent="yellow">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-5">
            After successfully claiming your Google Cloud Credits, start playing Google Cloud Arcade Games and complete Skill Badges to earn Arcade Points and milestone rewards.
          </p>
          <a
            href="https://go.cloudskillsboost.google/arcade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-amber-400 hover:from-yellow-300 hover:to-amber-300 shadow-lg shadow-yellow-500/20 transition-all duration-200 hover:scale-105"
          >
            🚀 Start Google Cloud Arcade <ExternalLink size={13} />
          </a>
        </ArcadeSection>

        {/* ── DAILY LAB LIMIT ── */}
        <ArcadeSection icon={<AlertCircle size={18} />} title="Daily Lab Limit" accent="orange">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-500/30 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform duration-200">
              <div className="text-3xl font-black text-orange-600 dark:text-orange-400 mb-1">15 Labs</div>
              <div className="text-xs text-text-secondary dark:text-dark-text-secondary font-semibold">Maximum every 24 hours</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-500/30 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform duration-200">
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">2 Hours</div>
              <div className="text-xs text-text-secondary dark:text-dark-text-secondary font-semibold">One lab quota restores</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 rounded-xl p-4 text-center hover:scale-[1.02] transition-transform duration-200">
              <div className="text-3xl font-black text-purple-600 dark:text-purple-400 mb-1">24 Hours</div>
              <div className="text-xs text-text-secondary dark:text-dark-text-secondary font-semibold">Full window refresh cycle</div>
            </div>
          </div>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mt-5 leading-relaxed">
            Maximum <span className="font-semibold text-text-primary dark:text-dark-text-primary">15 labs</span> every <span className="font-semibold text-text-primary dark:text-dark-text-primary">24 hours</span>. Every <span className="font-semibold text-text-primary dark:text-dark-text-primary">2 hours</span>, one lab quota is automatically restored. Once your daily lab limit is exhausted, continue completing Skill Badges until your lab quota resets.
          </p>
        </ArcadeSection>

        {/* ── SKILL BADGES ── */}
        <ArcadeSection icon={<Gift size={18} />} title="Skill Badges" accent="indigo">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-5">
            There are approximately <span className="font-bold text-text-primary dark:text-dark-text-primary">104 Skill Badges</span> worth around <span className="font-bold text-text-primary dark:text-dark-text-primary">52 Arcade Points</span>.
          </p>
          <a
            href="https://tinyurl.com/Arcade-Skill-Badges"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all duration-200 hover:scale-105"
          >
            Open Skill Badges Sheet <ExternalLink size={13} />
          </a>
        </ArcadeSection>

        {/* ── COMMUNITY ── */}
        <ArcadeSection icon={<Users size={18} />} title="Need Help?" accent="teal">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary mb-5">
            Join our official communities for announcements, guidance, doubt solving, discussions, updates, and support throughout the program.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                name: "Cloud Loop WhatsApp Channel",
                href: "https://www.whatsapp.com/channel/0029VbAiEFzAe5VikdanX42e",
                icon: "💬",
                color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-500/30 hover:border-green-400/60",
                textColor: "text-green-700 dark:text-green-400",
                desc: "Official Channel updates"
              },
              {
                name: "Cloud Loop Telegram Channel",
                href: "https://t.me/cloudloopupdates",
                icon: "📢",
                color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/30 hover:border-blue-400/60",
                textColor: "text-blue-700 dark:text-blue-400",
                desc: "Announcements & Alerts"
              },
              {
                name: "Telegram Discussion Group",
                href: "https://t.me/cloudloopp",
                icon: "🗣️",
                color: "bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-500/30 hover:border-sky-400/60",
                textColor: "text-sky-700 dark:text-sky-400",
                desc: "Guidance & Doubt Solving"
              },
              {
                name: "WhatsApp Community",
                href: "https://chat.whatsapp.com/JlAx2MYkAfZLBoy4Jx9J7X",
                icon: "🤝",
                color: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30 hover:border-emerald-400/60",
                textColor: "text-emerald-700 dark:text-emerald-400",
                desc: "Peer Support community"
              },
            ].map((community) => (
              <a
                key={community.name}
                href={community.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] hover:shadow-md group",
                  community.color
                )}
              >
                <div className="text-2xl shrink-0">{community.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className={cn("font-bold text-sm", community.textColor)}>{community.name}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{community.desc}</p>
                </div>
                <ExternalLink size={14} className="shrink-0 text-text-secondary group-hover:text-text-primary dark:group-hover:text-dark-text-primary transition-colors" />
              </a>
            ))}
          </div>
        </ArcadeSection>

        {/* ── FACILITATORS ── */}
        <ArcadeSection icon={<Users size={18} />} title="Program Facilitators" accent="purple">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { name: "Ayush Sharma", linkedin: "https://www.linkedin.com/in/ayushh-sharmaa/", image: "/ayush-sharma.png" },
              { name: "Hitansh Sharma", linkedin: "https://www.linkedin.com/in/hitansh-sharma/", initial: "H" },
            ].map((facilitator) => (
              <div
                key={facilitator.name}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card hover:border-purple-300 dark:hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-200"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-black shadow-lg relative">
                  {facilitator.image ? (
                    <Image
                      src={facilitator.image}
                      alt={facilitator.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    facilitator.initial
                  )}
                </div>
                <div className="text-center">
                  <p className="font-bold text-text-primary dark:text-dark-text-primary text-base">{facilitator.name}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-1">Google Cloud Arcade Facilitator</p>
                </div>
                <a
                  href={facilitator.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] dark:text-[#4fa3d1] border border-[#0077b5]/20 hover:border-[#0077b5]/40 transition-all duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </ArcadeSection>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Shared Section Wrapper for Arcade page
// ─────────────────────────────────────────

function ArcadeSection({
  title,
  icon,
  children,
  accent = "blue",
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: string;
}) {
  const accentMap: Record<string, string> = {
    blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-500/30",
    purple: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-500/30",
    emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-500/30",
    yellow: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-500/30",
    orange: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-500/30",
    indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-500/30",
    teal: "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-500/30",
  };
  return (
    <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card overflow-hidden">
      <div className={cn("flex items-center gap-3 px-6 py-4 border-b border-border dark:border-dark-border", accentMap[accent])}>
        <span className={cn("p-1.5 rounded-lg border", accentMap[accent])}>{icon}</span>
        <h2 className="font-bold text-base">{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </div>
  );
}

// ─────────────────────────────────────────
// Generic Program Detail Page
// ─────────────────────────────────────────

function GenericProgramPage({ program, related }: {
  program: typeof programs[0];
  related: typeof programs;
}) {
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
      <div className="bg-gradient-hero border-b border-border dark:border-dark-border py-14 px-4">
        <div className="container-narrow">
          <div className="flex items-start gap-5 mb-6">
            <ProviderLogo src={program.providerLogo} alt={program.provider} fallback={program.provider} size="lg" />
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
            <a href={program.website} target="_blank" rel="noopener noreferrer"
              className="btn-gradient px-6 py-3 rounded-pill text-sm font-semibold text-white inline-flex items-center gap-2">
              Apply on Official Website <ExternalLink size={15} />
            </a>
            <button className="px-6 py-3 rounded-pill text-sm font-semibold border border-border dark:border-dark-border text-text-primary dark:text-dark-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              Bookmark
            </button>
          </div>
        </div>
      </div>

      <div className="container-narrow py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <GenericSection title="Overview">
              <p className="text-text-secondary dark:text-dark-text-secondary leading-relaxed">{program.description}</p>
            </GenericSection>
            <GenericSection title="Eligibility">
              <ul className="space-y-3">
                {eligibilityPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </GenericSection>
            <GenericSection title="What You Get">
              <ul className="space-y-3">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                    <Gift size={15} className="text-secondary dark:text-primary shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </GenericSection>
            <GenericSection title="Timeline">
              <div className="space-y-4">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={cn("w-3 h-3 rounded-full mt-1.5 shrink-0 border-2",
                      item.done ? "bg-emerald-500 border-emerald-500" : "bg-transparent border-border dark:border-dark-border"
                    )} />
                    <div>
                      <p className="text-sm font-medium text-text-primary dark:text-dark-text-primary">{item.label}</p>
                      <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GenericSection>
          </div>

          <div className="space-y-5">
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
            <div className="card-base p-5">
              <h3 className="font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-3">Official Resources</h3>
              <a href={program.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-secondary dark:text-primary hover:underline">
                <Globe size={14} /> Official Website <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>

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

function GenericSection({ title, children }: { title: string; children: React.ReactNode }) {
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

function NaukriAmbassadorPage({ program }: { program: typeof programs[0] }) {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-950 via-slate-950 to-indigo-950 border-b border-white/10 pt-24 pb-14 px-4 relative overflow-hidden">
        <div className="container-narrow">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className="shrink-0">
              <Image
                src="/naukri-logo.png"
                alt="Naukri Campus Logo"
                width={100}
                height={100}
                className="rounded-2xl ring-4 ring-white/20 shadow-2xl bg-white p-2"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                  OPEN
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                  Beginner
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">
                  Campus Ambassador
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-1">
                Naukri Campus
                <span className="block text-orange-400 font-mono">Ambassador Program</span>
              </h1>
              <p className="text-white/60 text-sm mt-1">by Naukri Campus</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/70 mb-8">
            <span className="flex items-center gap-2">
              <Globe size={14} className="text-orange-400" />
              <a href="https://www.naukri.com/campus/ambassador-program" target="_blank" rel="noopener noreferrer" className="hover:text-white underline underline-offset-2 transition-colors">
                Official Program Website
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-narrow py-12 space-y-8">
        {/* Description */}
        <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-6">
          <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4">About the Program</h2>
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed">
            The Naukri Campus Ambassador Program is designed for students who want to build leadership, marketing, communication, and community-building skills while earning exclusive rewards, certificates, merchandise, vouchers, and recognition from Naukri Campus.
          </p>
        </div>

        {/* How to Join */}
        <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-6">
          <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-6">How to Join</h2>
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-border dark:border-dark-border bg-gray-50 dark:bg-dark-background">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide mb-3 inline-block">
                Step 1
              </span>
              <p className="text-sm text-text-primary dark:text-dark-text-primary font-semibold mb-4">
                Sign up for the Naukri Campus Contest using the referral link.
              </p>
              <a
                href="https://www.naukri.com/campus/contests/digiquezt-sharp-1-seo-and-sem-basics-contest-event-36479?action=enrol&referral=e36479-rUAOZYY-psap&uapp=801&utm_source=share_desktop&utm_medium=referral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-primary hover:bg-primary/90 shadow-md transition-all duration-200"
              >
                Register Now <ExternalLink size={13} />
              </a>
            </div>

            <div className="p-5 rounded-xl border border-border dark:border-dark-border bg-gray-50 dark:bg-dark-background">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary uppercase tracking-wide mb-3 inline-block">
                Step 2
              </span>
              <p className="text-sm text-text-primary dark:text-dark-text-primary font-semibold mb-4">
                After registering, apply for the Naukri Campus Ambassador Program.
              </p>
              <a
                href="https://www.naukri.com/campus/ambassador-program"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-secondary dark:bg-primary dark:text-dark-background hover:bg-secondary/90 shadow-md transition-all duration-200"
              >
                Apply Now <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Why Join? */}
        <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-6">
          <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-6">Why Join?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Build your professional network",
              "Gain leadership experience",
              "Improve communication and marketing skills",
              "Receive certificates and recognition",
              "Earn exclusive merchandise and vouchers",
              "Become part of the Naukri Campus student community"
            ].map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 text-sm text-text-secondary dark:text-dark-text-secondary">
                <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rewards & Benefits */}
        <div className="rounded-2xl border border-border dark:border-dark-border bg-white dark:bg-dark-card p-6">
          <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-6">Rewards & Benefits</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: "iPhone", icon: <Smartphone className="text-blue-500" /> },
              { name: "iPad", icon: <Tablet className="text-indigo-500" /> },
              { name: "AirPods", icon: <Headphones className="text-purple-500" /> },
              { name: "SAP Summer Squad Welcome Certificate", icon: <FileText className="text-teal-500" /> },
              { name: "SAP Summer Squad 50 Points Certificate", icon: <FileText className="text-emerald-500" /> },
              { name: "SAP Summer Squad 250 Points Certificate", icon: <FileText className="text-green-500" /> },
              { name: "Ambassador Certificate", icon: <Star className="text-amber-500" /> },
              { name: "Letter of Recommendation", icon: <FileText className="text-rose-500" /> },
              { name: "Amazon Voucher – ₹1,000", icon: <Gift className="text-orange-500" /> },
              { name: "Amazon Voucher – ₹1,500", icon: <Gift className="text-orange-600" /> },
              { name: "Amazon Voucher – ₹4,000", icon: <Gift className="text-red-500" /> },
              { name: "Amazon Voucher – Up to ₹25,000", icon: <Gift className="text-red-600" /> },
              { name: "NC Branded T-Shirt", icon: <ShoppingBag className="text-pink-500" /> },
              { name: "NC Branded Bag", icon: <ShoppingBag className="text-sky-500" /> },
              { name: "NC Merch Kit (Neck Pillow, Water Bottle)", icon: <Gift className="text-cyan-500" /> },
              { name: "Wireless Headphones", icon: <Headphones className="text-violet-500" /> }
            ].map((reward, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border border-border dark:border-dark-border bg-gray-50 dark:bg-dark-background flex flex-col items-center text-center gap-3 hover:scale-105 transition-transform duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-dark-card flex items-center justify-center shadow-sm">
                  {reward.icon}
                </div>
                <span className="text-xs font-bold text-text-primary dark:text-dark-text-primary leading-tight">
                  {reward.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// Route Entry Point
// ─────────────────────────────────────────

export default function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const program = programs.find((p) => p.slug === slug);
  if (!program) notFound();

  const related = programs
    .filter((p) => p.id !== program.id && (p.provider === program.provider || p.category === program.category))
    .slice(0, 3);

  if (slug === "google-cloud-arcade") {
    return <ArcadeFacilitatorPage program={program as typeof program & { registrationForm?: string; facilitatorCode?: string }} />;
  }

  if (slug === "naukri-campus-ambassador-program") {
    return <NaukriAmbassadorPage program={program} />;
  }

  return <GenericProgramPage program={program} related={related} />;
}

