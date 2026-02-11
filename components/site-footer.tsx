import { Button } from "@/components/ui/button";
import { siteLinks } from "@/lib/site-links";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconPdf,
} from "@tabler/icons-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white/70 dark:bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-zinc-200/70 dark:border-white/10 p-4 sm:p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-950 dark:text-zinc-100">
              Let&apos;s build something.
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              &copy; {new Date().getFullYear()} Darkhanbayar Erdenebat. All rights
              reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline" size="sm" className="justify-start">
              <a href={`mailto:${siteLinks.email}`}>
                <IconMail data-icon="inline-start" />
                {siteLinks.email}
              </a>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <a href={siteLinks.linkedin} target="_blank" rel="noreferrer">
                <IconBrandLinkedin data-icon="inline-start" />
                LinkedIn
              </a>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <a href={siteLinks.github} target="_blank" rel="noreferrer">
                <IconBrandGithub data-icon="inline-start" />
                GitHub
              </a>
            </Button>

            <Button asChild variant="ghost" size="sm">
              <a href={siteLinks.resume} target="_blank" rel="noreferrer">
                <IconPdf data-icon="inline-start" />
                Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
