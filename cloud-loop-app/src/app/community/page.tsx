import { MessageCircle, Send, Users, Trophy, ExternalLink } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community",
  description: "Join the Cloud Loop community — Discord, WhatsApp, Telegram, LinkedIn, GitHub and more.",
};

const platforms = [
  {
    name: "Discord",
    description: "Daily discussions, study groups, opportunity alerts",
    icon: MessageCircle,
    members: "12,400+",
    href: "https://discord.gg/cloudloop",
    color: "#5865F2",
    bg: "bg-[#5865F2]/10",
  },
  {
    name: "WhatsApp",
    description: "Quick updates, deadline reminders, peer help",
    icon: MessageCircle,
    members: "8,200+",
    href: "https://chat.whatsapp.com/cloudloop",
    color: "#25D366",
    bg: "bg-[#25D366]/10",
  },
  {
    name: "Telegram",
    description: "Bot-powered alerts for new opportunities",
    icon: Send,
    members: "15,600+",
    href: "https://t.me/cloudloopdev",
    color: "#0088CC",
    bg: "bg-[#0088CC]/10",
  },
  {
    name: "LinkedIn",
    description: "Professional updates, alumni network, job referrals",
    icon: LinkedInIcon,
    members: "6,800+",
    href: "https://linkedin.com/company/cloudloop",
    color: "#0A66C2",
    bg: "bg-[#0A66C2]/10",
  },
  {
    name: "GitHub",
    description: "Open source projects, contribution opportunities",
    icon: GitHubIcon,
    members: "3,200+",
    href: "https://github.com/cloudloop",
    color: "#24292F",
    bg: "bg-gray-100 dark:bg-gray-800",
  },
  {
    name: "Student Network",
    description: "Campus chapters, local meetups, peer study groups",
    icon: Users,
    members: "24,000+",
    href: "/community/network",
    color: "#7A5CFF",
    bg: "bg-secondary/10",
  },
];

const leaderboard = [
  { rank: 1, name: "Arjun Sharma", points: 4820, badge: "🏆", university: "IIT Bombay" },
  { rank: 2, name: "Priya Nair", points: 4210, badge: "🥈", university: "NIT Trichy" },
  { rank: 3, name: "Karthik Menon", points: 3990, badge: "🥉", university: "BITS Pilani" },
  { rank: 4, name: "Divya Patel", points: 3440, badge: "⭐", university: "IIT Delhi" },
  { rank: 5, name: "Rahul Gupta", points: 3120, badge: "⭐", university: "VIT Vellore" },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary mb-3 block">Community</span>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary dark:text-dark-text-primary mb-4">
            Join 60,000+ Students
          </h1>
          <p className="text-text-secondary dark:text-dark-text-secondary text-lg">
            Connect, collaborate, and grow with the largest student opportunity community in India.
          </p>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-base p-6 flex flex-col gap-4 group"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl ${platform.bg} flex items-center justify-center`}>
                    <Icon size={22} style={{ color: platform.color }} />
                  </div>
                  <ExternalLink size={14} className="text-text-secondary group-hover:text-text-primary transition-colors mt-1" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary dark:text-dark-text-primary mb-1">{platform.name}</p>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">{platform.description}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: platform.color }}>
                  <Users size={12} />
                  {platform.members} members
                </div>
              </a>
            );
          })}
        </div>

        {/* Leaderboard */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Trophy size={20} className="text-amber-500" />
            <h2 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">Top Contributors</h2>
          </div>
          <div className="card-base overflow-hidden">
            {leaderboard.map((user, i) => (
              <div
                key={user.rank}
                className={`flex items-center gap-4 px-6 py-4 ${i < leaderboard.length - 1 ? "border-b border-border dark:border-dark-border" : ""}`}
              >
                <span className="text-2xl w-8 text-center">{user.badge}</span>
                <div className="w-9 h-9 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {user.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-text-primary dark:text-dark-text-primary">{user.name}</p>
                  <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{user.university}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-secondary dark:text-primary">{user.points.toLocaleString()}</p>
                  <p className="text-xs text-text-secondary">points</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-brand p-px">
          <div className="rounded-2xl bg-[#0d1b3e] dark:bg-[#080f20] p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Be a Cloud Loop Campus Ambassador</h2>
            <p className="text-white/70 mb-6 max-w-sm mx-auto text-sm">
              Represent Cloud Loop at your college. Host events, grow the community, earn points.
            </p>
            <button className="px-6 py-3 rounded-xl bg-white text-secondary font-semibold text-sm hover:bg-white/90 transition-colors">
              Apply to be an Ambassador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GitHubIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
