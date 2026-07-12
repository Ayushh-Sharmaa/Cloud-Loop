"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Search, Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useUser, useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Internships", href: "/internships" },
  { label: "Jobs", href: "/jobs" },
  { label: "Certifications", href: "/certifications" },
  { label: "Community", href: "/community" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { isSignedIn, user } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || !isHome
            ? "glass border-b border-border dark:border-dark-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container-narrow flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo-v2.png"
              alt="Cloud Loop"
              width={36}
              height={36}
              className="rounded-xl object-cover"
              priority
            />
            <span className="font-bold text-lg tracking-tight text-text-primary dark:text-dark-text-primary">
              Cloud Loop
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  pathname.startsWith(link.href)
                    ? "text-secondary dark:text-primary bg-secondary/10 dark:bg-primary/10"
                    : "text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary hover:bg-black/5 dark:hover:bg-white/8"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              aria-label="Search"
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border dark:border-dark-border bg-white/80 dark:bg-dark-card text-text-secondary dark:text-dark-text-secondary text-sm hover:border-primary/50 transition-colors"
            >
              <Search size={14} />
              <span className="hidden md:inline">Search...</span>
              <kbd className="hidden md:inline text-xs bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono">
                /
              </kbd>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="p-2 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              >
                {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* Auth */}
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="hidden sm:block px-4 py-2 rounded-lg text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="w-8 h-8 rounded-full bg-gradient-brand flex items-center justify-center text-white font-bold text-xs">
                  {user?.firstName?.[0] ?? user?.emailAddresses?.[0]?.emailAddress?.[0] ?? "U"}
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => openSignIn()}
                  className="hidden sm:block px-4 py-2 rounded-lg text-sm font-medium text-text-secondary dark:text-dark-text-secondary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => openSignUp()}
                  className="btn-gradient px-4 py-2 rounded-pill text-sm font-semibold text-white shadow-sm"
                >
                  Get Started
                </button>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-text-secondary dark:text-dark-text-secondary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border dark:border-dark-border bg-white dark:bg-dark-background"
            >
              <nav className="container-narrow py-4 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-secondary bg-secondary/10 dark:text-primary dark:bg-primary/10"
                        : "text-text-secondary dark:text-dark-text-secondary hover:bg-black/5 dark:hover:bg-white/8"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex gap-2 pt-2 border-t border-border/50 dark:border-dark-border/50 mt-2">
                  {!isSignedIn ? (
                    <>
                      <button
                        onClick={() => openSignIn()}
                        className="flex-1 py-2.5 rounded-xl border border-border dark:border-dark-border text-sm font-medium text-text-primary dark:text-dark-text-primary"
                      >
                        Log in
                      </button>
                      <button
                        onClick={() => openSignUp()}
                        className="flex-1 py-2.5 rounded-xl btn-gradient text-sm font-semibold text-white"
                      >
                        Get Started
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/dashboard"
                      className="flex-1 py-2.5 text-center rounded-xl btn-gradient text-sm font-semibold text-white"
                    >
                      Dashboard
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
