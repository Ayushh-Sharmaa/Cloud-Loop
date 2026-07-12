import Link from "next/link";
import { MessageCircle } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Programs", href: "/programs" },
    { label: "Events", href: "/events" },
    { label: "Internships", href: "/internships" },
    { label: "Jobs", href: "/jobs" },
    { label: "Certifications", href: "/certifications" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "Success Stories", href: "/#stories" },
    { label: "FAQ", href: "/#faq" },
    { label: "Submit Opportunity", href: "/submit" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Community", href: "/community" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: XIcon, href: "https://twitter.com/cloudloopdev", label: "Twitter" },
  { icon: GitHubIcon, href: "https://github.com/cloudloop", label: "GitHub" },
  { icon: LinkedInIcon, href: "https://linkedin.com/company/cloudloop", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://discord.gg/cloudloop", label: "Discord" },
];

export function Footer() {
  return (
    <footer className="border-t border-border dark:border-dark-border bg-white dark:bg-dark-card">
      <div className="container-narrow py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <CloudLoopLogoSmall />
              <span className="font-bold text-lg tracking-tight">Cloud Loop</span>
            </Link>
            <p className="text-sm text-text-secondary dark:text-dark-text-secondary leading-relaxed mb-6 max-w-xs">
              The single place students go to discover every opportunity — programs, events, internships, jobs, and certifications.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-border dark:border-dark-border bg-background dark:bg-dark-background text-sm text-text-primary dark:text-dark-text-primary placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/40"
                aria-label="Email for newsletter"
              />
              <button className="btn-gradient px-4 py-2.5 rounded-xl text-sm font-semibold text-white whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-text-secondary dark:text-dark-text-secondary mt-2">
              Weekly digest of the best student opportunities.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-semibold text-sm text-text-primary dark:text-dark-text-primary mb-4">
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
            © {new Date().getFullYear()} Cloud Loop. Built for students, by students.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function CloudLoopLogoSmall() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="footerLogoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4FD9FF" />
          <stop offset="100%" stopColor="#7A5CFF" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#footerLogoGrad)" />
      <path d="M22.5 18.5a4 4 0 0 0-3.5-5.9 6 6 0 1 0-8 8.4H22a2.5 2.5 0 0 0 .5-2.5z" fill="white" opacity="0.9" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
