import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Bookmark, Send, Clock, Award, User, Bell } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Cloud Loop dashboard — saved opportunities, applications, and upcoming deadlines.",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const savedOpps = [
    { id: "1", title: "Google Cloud Arcade", type: "Program", status: "open", deadline: "Sep 30, 2024" },
    { id: "2", title: "STEP Intern – Google", type: "Internship", status: "open", deadline: "Oct 31, 2024" },
    { id: "3", title: "Smart India Hackathon 2024", type: "Event", status: "open", deadline: "Oct 15, 2024" },
  ];

  const appliedOpps = [
    { id: "1", title: "Microsoft MLSA Program", type: "Program", appliedOn: "Sep 5, 2024", status: "Under Review" },
    { id: "2", title: "Explore Microsoft Internship", type: "Internship", appliedOn: "Sep 10, 2024", status: "Applied" },
  ];

  const deadlines = [
    { title: "Google Cloud Arcade", date: "Sep 30, 2024", daysLeft: 19, type: "Program" },
    { title: "Amazon SDE Intern", date: "Sep 30, 2024", daysLeft: 19, type: "Internship" },
    { title: "Smart India Hackathon", date: "Oct 15, 2024", daysLeft: 34, type: "Event" },
    { title: "MLSA Program", date: "Oct 15, 2024", daysLeft: 34, type: "Program" },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background pt-24 pb-16">
      <div className="container-narrow">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-text-primary dark:text-dark-text-primary mb-1">Your Dashboard</h1>
          <p className="text-text-secondary dark:text-dark-text-secondary">Track your opportunities and upcoming deadlines.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Saved", value: savedOpps.length, icon: Bookmark, color: "text-primary" },
            { label: "Applied", value: appliedOpps.length, icon: Send, color: "text-secondary" },
            { label: "Upcoming", value: deadlines.length, icon: Clock, color: "text-amber-500" },
            { label: "Certificates", value: 0, icon: Award, color: "text-accent" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card-base p-5">
                <Icon size={20} className={stat.color} />
                <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mt-2">{stat.value}</p>
                <p className="text-xs text-text-secondary dark:text-dark-text-secondary">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Saved + Applied */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved */}
            <section>
              <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Bookmark size={18} className="text-primary" /> Saved Opportunities
              </h2>
              <div className="space-y-3">
                {savedOpps.map((opp) => (
                  <div key={opp.id} className="card-base p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-sm text-text-primary dark:text-dark-text-primary">{opp.title}</p>
                      <p className="text-xs text-text-secondary">{opp.type} · Due {opp.deadline}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shrink-0">
                      {opp.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Applied */}
            <section>
              <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
                <Send size={18} className="text-secondary" /> Applications
              </h2>
              <div className="space-y-3">
                {appliedOpps.map((opp) => (
                  <div key={opp.id} className="card-base p-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-sm text-text-primary dark:text-dark-text-primary">{opp.title}</p>
                      <p className="text-xs text-text-secondary">{opp.type} · Applied {opp.appliedOn}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 shrink-0">
                      {opp.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Deadlines */}
          <div>
            <h2 className="text-lg font-bold text-text-primary dark:text-dark-text-primary mb-4 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" /> Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {deadlines.map((d, i) => (
                <div key={i} className="card-base p-4">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-xs text-text-primary dark:text-dark-text-primary">{d.title}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${d.daysLeft <= 7 ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-700"}`}>
                      {d.daysLeft}d left
                    </span>
                  </div>
                  <p className="text-[10px] text-text-secondary">{d.type} · Due {d.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
