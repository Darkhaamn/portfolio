import { siteLinks } from "@/lib/site-links";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";

const socials = [
  { href: `mailto:${siteLinks.email}`, label: "Email", Icon: IconMail },
  { href: siteLinks.github, label: "GitHub", Icon: IconBrandGithub, external: true },
  { href: siteLinks.linkedin, label: "LinkedIn", Icon: IconBrandLinkedin, external: true },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-800 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <a
            href={`mailto:${siteLinks.email}`}
            className="text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
          >
            {siteLinks.email}
          </a>
          <p className="text-xs text-zinc-500">
            &copy; {new Date().getFullYear()} Darkhanbayar Erdenebat
          </p>
        </div>
        <div className="flex items-center gap-1">
          {socials.map(({ href, label, Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="flex size-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
