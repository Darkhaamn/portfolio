"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { siteLinks } from "@/lib/site-links";
import { cn } from "@/lib/utils";
import { IconBriefcase, IconFileText, IconHome } from "@tabler/icons-react";

const navItems = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/works", label: "Works", icon: IconBriefcase },
] as const;

const socialLinks = [
  {
    href: siteLinks.github,
    label: "GitHub",
    src: "/github.svg",
    invertOnDark: true,
  },
  {
    href: siteLinks.linkedin,
    label: "LinkedIn",
    src: "/linkedin.svg",
    invertOnDark: false,
  },
] as const;

export function FloatingNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-full border border-zinc-200/80 dark:border-zinc-700/80 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/30">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors rounded-full",
                active
                  ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100"
              )}
            >
              <Icon className="size-3.5" aria-hidden />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}

        <a
          href={siteLinks.resume}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors rounded-full"
        >
          <IconFileText className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Resume</span>
        </a>

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

        {socialLinks.map(({ href, label, src, invertOnDark }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            className="flex items-center justify-center size-8 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <Image
              src={src}
              alt={label}
              width={16}
              height={16}
              className={cn("size-4 opacity-80", invertOnDark && "dark:invert")}
            />
          </a>
        ))}

        <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-700 mx-0.5" />

        <ThemeToggle className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900" />
      </div>
    </nav>
  );
}
