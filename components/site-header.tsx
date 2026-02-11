import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteLinks } from "@/lib/site-links";
import { IconBriefcase, IconPdf } from "@tabler/icons-react";

export function SiteHeader() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-zinc-200/70 dark:border-white/5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-zinc-950 dark:text-zinc-100 font-medium tracking-tight text-sm flex items-center gap-2"
        >
          <span>Darkhanbayar. E</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="cursor-pointer">
            <Link href="/works">
              <IconBriefcase data-icon="inline-start" />
              Works
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="cursor-pointer">
            <a href={siteLinks.resume} target="_blank" rel="noreferrer">
              <IconPdf data-icon="inline-start" />
              Resume
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
