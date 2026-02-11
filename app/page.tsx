export default function Page() {
  const links = {
    email: "darkhanbayarr@gmail.com",
    github: "https://github.com/darkhaamn",
    linkedin: "https://www.linkedin.com/in/darkhanbayar-erdenebat/",
    resume: "/resume.pdf",
  };

  return (
    <div
      className="scroll-smooth min-h-dvh text-zinc-400 antialiased selection:bg-zinc-700 selection:text-white pb-20"
      style={{
        backgroundColor: "#09090b",
        backgroundImage: "radial-gradient(#27272a 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <a
            href="#about"
            className="text-zinc-100 font-medium tracking-tight text-sm flex items-center gap-2"
          >
            <div className="w-5 h-5 bg-zinc-100 rounded-sm flex items-center justify-center text-zinc-950 font-bold text-xs">
              D
            </div>
            <span>Darkhanbayar.E</span>
          </a>
          <div className="flex items-center gap-6 text-xs font-medium">
            <a
              href="#about"
              className="hover:text-zinc-100 transition-colors"
            >
              About
            </a>
            <a
              href="#timeline"
              className="hover:text-zinc-100 transition-colors"
            >
              Timeline
            </a>
            <a
              href="#certs"
              className="hover:text-zinc-100 transition-colors"
            >
              Certs
            </a>
            <a
              href={`mailto:${links.email}`}
              className="text-zinc-100 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-full border border-zinc-700 transition-all"
            >
              Connect
            </a>
            <a
              href={links.resume}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-100 bg-zinc-900 hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 transition-all"
            >
              Resume
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32">
        <section id="about" className="mb-16 scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div className="space-y-4 max-w-lg">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/50 border border-zinc-800 text-xs text-zinc-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for new projects
              </div>

              <h1 className="text-4xl md:text-5xl font-medium text-zinc-100 tracking-tight leading-[1.1]">
                Architecting digital <br />
                <span className="text-zinc-500">infrastructure.</span>
              </h1>

              <p className="text-base text-zinc-400 leading-relaxed">
                I&apos;m <span className="text-zinc-200">Darkhanbayar Erdenebat</span>, a System Architect focused on
                Cloud &amp; DevOps. I design AWS/Kubernetes platforms, build Golang services, and lead teams to improve
                reliability, automation, and delivery speed.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#works"
                  className="group flex items-center gap-2 text-sm text-zinc-100 border-b border-zinc-700 pb-0.5 hover:border-zinc-100 transition-colors"
                >
                  View Works
                  <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
                <div className="flex gap-3">
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                  <a
                    href={links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={links.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    aria-label="Resume PDF"
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>

            <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 rotate-3 hover:rotate-0 transition-transform duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://ui-avatars.com/api/?name=Darkhanbayar+E&background=18181b&color=a1a1aa&size=256"
                alt="Darkhanbayar Erdenebat"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-zinc-950/80 to-transparent" />
            </div>
          </div>
        </section>

        <section
          id="works"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 scroll-mt-24"
        >
          <div className="p-6 rounded-xl md:col-span-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] flex flex-col justify-between h-full bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-white/10">
            <div className="flex justify-between items-start mb-6">
              <div className="p-2 bg-zinc-900/80 rounded-lg border border-zinc-800 text-zinc-100">
                <span aria-hidden>▦</span>
              </div>
              <span className="text-xs font-mono text-zinc-500">OCT 2025 — PRESENT</span>
            </div>
            <div>
              <h3 className="text-zinc-200 font-medium text-lg tracking-tight mb-1">Tech Partners</h3>
              <p className="text-sm text-zinc-500 mb-4">System Architect</p>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Designing cloud and DevOps solutions; leading teams in AWS,
                Kubernetes, and Golang to improve reliability, automation, and
                delivery speed.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl flex flex-col justify-between bg-[rgba(24,24,27,0.6)] backdrop-blur-xl border border-white/10">
            <div>
              <h3 className="text-zinc-200 font-medium text-sm mb-4 flex items-center gap-2">
                <span className="text-rose-500/80" aria-hidden>
                  ♥
                </span>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "DevOps",
                  "Cloud Architecture",
                  "AWS",
                  "Kubernetes",
                  "Golang",
                  "CI/CD",
                  "Containerization",
                  "Orchestration",
                  "Team Mentoring",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-xs text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <h3 className="text-zinc-200 font-medium text-sm mb-3">Location</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span className="text-zinc-500" aria-hidden>
                  ⌖
                </span>
                Fairfield, Iowa / Ulaanbaatar, Mongolia
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section id="timeline" className="scroll-mt-24">
            <h2 className="text-lg font-medium text-zinc-100 mb-6 flex items-center gap-2">
              <span aria-hidden>⏳</span>
              Timeline
            </h2>
            <div className="relative border-l border-zinc-800 ml-3 space-y-8 pb-4">
              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-950" />
                <span className="text-xs font-mono text-zinc-500 mb-1 block">
                  2014 — 2018
                </span>
                <h4 className="text-zinc-300 text-sm font-medium">
                  B.S. Information Technology
                </h4>
                <p className="text-xs text-zinc-500 mt-1">
                  Mongolian University of Science and Technology (Ulaanbaatar)
                </p>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-950" />
                <span className="text-xs font-mono text-zinc-500 mb-1 block">
                  APR 2018 — MAR 2019
                </span>
                <h4 className="text-zinc-300 text-sm font-medium">
                  Frontend Developer, Z24 LLC
                </h4>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-950" />
                <span className="text-xs font-mono text-zinc-500 mb-1 block">
                  JUN 2021 — FEB 2025
                </span>
                <h4 className="text-zinc-300 text-sm font-medium">
                  Senior Engineer, Tech Partners
                </h4>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-950" />
                <span className="text-xs font-mono text-zinc-500 mb-1 block">
                  OCT 2021 — APR 2022
                </span>
                <h4 className="text-zinc-300 text-sm font-medium">
                  Senior Software Engineer Team Lead, Fibo Cloud
                </h4>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-700 bg-zinc-950" />
                <span className="text-xs font-mono text-zinc-500 mb-1 block">
                  APR 2022 — MAR 2024
                </span>
                <h4 className="text-zinc-300 text-sm font-medium">
                  Chief Technology Officer, Fibo Cloud
                </h4>
              </div>

              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-zinc-500 bg-zinc-100" />
                <span className="text-xs font-mono text-emerald-500 mb-1 block">
                  OCT 2025 — Present
                </span>
                <h4 className="text-zinc-200 text-sm font-medium">
                  System Architect, Tech Partners
                </h4>
              </div>
            </div>
          </section>

          <section id="certs" className="scroll-mt-24">
            <h2 className="text-lg font-medium text-zinc-100 mb-6 flex items-center gap-2">
              <span aria-hidden>🎓</span>
              Certifications
            </h2>
            <div className="space-y-4">
              <div className="group flex items-center gap-4 p-3 rounded-lg bg-zinc-900/20 border border-zinc-800/60">
                <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800">
                  <span aria-hidden>☁</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-300 truncate">
                    AWS Certified Developer
                  </h4>
                  <p className="text-xs text-zinc-500">Associate Level</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  MAY 2020
                </span>
              </div>

              <div className="group flex items-center gap-4 p-3 rounded-lg bg-zinc-900/20 border border-zinc-800/60">
                <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-blue-400 border border-zinc-800">
                  <span aria-hidden>⌘</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-zinc-200 truncate">
                    CKA: Kubernetes Admin
                  </h4>
                  <p className="text-xs text-zinc-500">
                    The Linux Foundation
                  </p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                  MAR 2022
                </span>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-lg font-medium text-zinc-100 mb-6 flex items-center gap-2">
                <span aria-hidden>🎓</span>
                Education
              </h3>
              <div className="space-y-4">
                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-800/50">
                  <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800">
                    <span aria-hidden>🎓</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-300 truncate">
                      Master&apos;s degree, Maharishi International University
                    </h4>
                    <p className="text-xs text-zinc-500">Fairfield (Currently studying)</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    FEB 2026
                  </span>
                </div>

                <div className="group flex items-center gap-4 p-3 rounded-lg hover:bg-zinc-900/50 transition-colors border border-transparent hover:border-zinc-800/50">
                  <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center text-zinc-500 border border-zinc-800">
                    <span aria-hidden>🏫</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-zinc-300 truncate">
                      Bachelor&apos;s degree, Mongolian University of Science and Technology
                    </h4>
                    <p className="text-xs text-zinc-500">Information Technology</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                    2014 — 2018
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="mt-20 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
          <p>
            &copy; {new Date().getFullYear()} Darkhanbayar Erdenebat. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <a
              href={`mailto:${links.email}`}
              className="hover:text-zinc-400 transition-colors"
            >
              Email
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}