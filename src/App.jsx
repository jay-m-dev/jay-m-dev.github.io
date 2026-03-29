// src/App.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Moon,
  Shield,
  Database,
  Network,
  Search,
  Cpu,
  Server,
  Code2,
  SunMedium,
} from "lucide-react";

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(!!mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

function Particles() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const c = ref.current;
    if (!c || reduced) return;
    const ctx = c.getContext("2d");
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = Math.floor(r.width * dpr);
      c.height = Math.floor(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const n = 90;
    const pts = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: 0.7 + Math.random() * 1.4,
    }));

    const tick = () => {
      const w = c.getBoundingClientRect().width;
      const h = c.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      for (const p of pts) {
        p.x += p.vx / 220;
        p.y += p.vy / 220;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const x = p.x * w;
        const y = p.y * h;
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.35)";
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = (a.x - b.x) * w;
          const dy = (a.y - b.y) * h;
          const dist = Math.hypot(dx, dy);
          if (dist > 140) continue;
          const t = 1 - dist / 140;
          ctx.strokeStyle = `rgba(167,139,250,${0.12 * t})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo(b.x * w, b.y * h);
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(tick);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}

function Pill({ icon: Icon, title, text }) {
  return (
    <div className="glass neon-border rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <div className="rounded-xl border border-slate-700/50 p-2">
          <Icon className="h-5 w-5 text-sky-300" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-100">
            {title}
          </div>
          <div className="mt-1 text-sm text-slate-300">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 text-xs text-slate-200">
      {children}
    </span>
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <div className="mb-6">
        <div className="text-xs font-semibold tracking-widest text-sky-300">
          {kicker}
        </div>
        <h2 className="mt-2 text-2xl font-semibold text-slate-50">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function LinkBtn({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 transition hover:border-sky-400/40 hover:shadow-neon"
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-4 w-4 text-slate-200 group-hover:text-sky-200" />
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 opacity-60" />
    </a>
  );
}

function ThemeToggle({ theme, onToggle }) {
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={onToggle}
      className="theme-toggle"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      title={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {isLight ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      </span>
      <span className="theme-toggle__label">
        {isLight ? "Dark mode" : "Light mode"}
      </span>
    </button>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const reduced = useReducedMotion();
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });
  const [activeSection, setActiveSection] = useState("focus");

  const navItems = useMemo(() => {
    return [
      { id: "focus", label: "Focus" },
      { id: "skills", label: "Skills" },
      { id: "experience", label: "Experience" },
      { id: "work", label: "Work" },
      { id: "approach", label: "Approach" },
      { id: "case-studies", label: "Case Studies" },
      { id: "open-source", label: "Public Work" },
      { id: "contact", label: "Contact" },
    ];
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [navItems]);

  const skills = useMemo(() => {
    return [
      "Backend Engineering",
      "Platform Engineering",
      "API Design",
      "System Design",
      "Service Integrations",
      "Distributed Systems",
      "Architecture Reviews",
      "Mentorship",
      "Production Support",
      "Incident Response",
      "SQL & Data Modeling",
      "PostgreSQL",
      "Caching",
      "Message Queues",
      "Authentication & Authorization",
      "JavaScript",
      "TypeScript",
      "Python",
      "FastAPI",
      "Java",
      "Node.js",
      "React",
      "Git",
      "Docker",
      "Linux",
      "CI/CD",
      "Observability",
      "Performance Tuning",
      "Testing",
      "Agile Delivery",
    ];
  }, []);

  const projects = useMemo(() => {
    return [
      {
        name: "Backend Services & Integrations",
        desc: "APIs, integrations, and background workflows that connect systems and keep business processes moving reliably.",
        tags: ["APIs", "Integrations", "Service Ownership"],
        href: "https://www.linkedin.com/in/moran-jay/",
      },
      {
        name: "Platform Reliability & Support",
        desc: "Long-term ownership of production systems with monitoring, troubleshooting, and steady modernization.",
        tags: ["Reliability", "Operations", "Production Support"],
        href: "https://github.com/jay-m-dev",
      },
      {
        name: "Data & Workflow Systems",
        desc: "SQL-backed applications, reporting pipelines, and internal tools that support day-to-day operations and decision-making.",
        tags: ["SQL", "Reporting", "Internal Tools"],
        href: "https://github.com/jay-m-dev",
      },
    ];
  }, []);

  const experience = useMemo(() => {
    return [
      {
        company: "Cedars-Sinai",
        title: "Senior Programmer Analyst",
        period: "Mar 2024 – Present · Los Angeles Metropolitan Area",
        bullets: [
          "Design, build, and maintain internal applications, backend services, and data workflows used by research and operational teams.",
          "Own delivery from requirements through implementation, testing, deployment, and production support.",
          "Improve reliability, maintainability, and performance across existing platforms.",
          "Build search and data access capabilities, including graph and vector-backed solutions where they fit the problem.",
          "Partner with stakeholders, analysts, and engineers to translate complex workflows into durable software.",
        ],
      },
      {
        company: "Cedars-Sinai",
        title: "Programmer Analyst",
        period: "Apr 2022 – Mar 2024 · Los Angeles Metropolitan Area",
        bullets: [
          "Supported development and maintenance of internal applications and backend systems.",
          "Implemented enhancements, integrations, and bug fixes across existing platforms.",
          "Assisted analytics workflows, SQL reporting, and day-to-day production support.",
          "Worked with senior engineers to deliver features while learning system architecture and operational constraints.",
        ],
      },
      {
        company: "Curacao",
        title: "Programmer Analyst",
        period: "Nov 2014 – Apr 2022 · Los Angeles, CA",
        bullets: [
          "Maintained and enhanced enterprise software supporting operations, fulfillment, and back-office workflows.",
          "Worked across application development, data support, and production issue resolution.",
          "Improved stability through durable fixes, monitoring, and long-term ownership.",
          "Progressed from operational roles into full software delivery responsibilities.",
        ],
      },
      {
        company: "AccuPOS",
        title: "Software Engineer",
        period: "Feb 2014 – Nov 2014",
        bullets: [
          "Developed and supported transactional business software workflows.",
          "Partnered with support teams to resolve production issues and deliver maintainable fixes.",
        ],
      },
      {
        company: "Earlier roles",
        title: "Technical Support Specialist · Project Coordinator · Call Center Supervisor",
        period: "Mar 2011 – Feb 2014",
        bullets: [
          "Built foundations in customer support, operations, and systems reliability before transitioning into full-time engineering.",
        ],
      },
    ];
  }, []);

  const caseStudies = useMemo(() => {
    return [
      {
        name: "Search & Data Discovery Platform",
        problem:
          "Help internal users find connected information quickly without relying on brittle manual lookup workflows.",
        approach: [
          "Modeled relationships in graph databases when relational structures were too rigid for the use case.",
          "Integrated vector and search capabilities to improve retrieval and relevance.",
          "Delivered the solution as part of maintained internal workflows, not as a standalone experiment.",
        ],
        impact: [
          "Reduced time spent finding related information across systems.",
          "Expanded what teams could answer with existing data.",
          "Showed the ability to choose non-default tooling only when the problem justified it.",
        ],
        stack: ["Search", "Graph Data", "SQL", "Python"],
        scale: "Internal data-intensive workflows",
        href: "https://www.linkedin.com/in/moran-jay",
      },
      {
        name: "Legacy Application Enhancement & Support",
        problem:
          "Keep business-critical internal applications stable while delivering incremental features and integrations.",
        approach: [
          "Worked inside existing codebases with careful, low-risk changes.",
          "Paired feature delivery with bug fixes, SQL updates, and operational support.",
          "Collaborated with analysts and end users to clarify requirements.",
        ],
        impact: [
          "Improved stability and responsiveness in day-to-day use.",
          "Reduced recurring support issues with durable fixes.",
          "Delivered changes without disrupting teams that depended on the software.",
        ],
        stack: ["Maintenance", "SQL", "Integrations"],
        scale: "Production internal systems",
        href: "https://github.com/jay-m-dev",
      },
      {
        name: "Enterprise Operations Reliability",
        problem:
          "Support high-volume operational workflows that depend on software staying predictable under daily use.",
        approach: [
          "Maintained core applications and support processes over multiple years.",
          "Balanced development work with troubleshooting and production ownership.",
          "Focused on maintainable fixes instead of short-term patches.",
        ],
        impact: [
          "Improved continuity for operations teams.",
          "Built trust through consistent delivery and support.",
          "Developed depth in owning software beyond initial implementation.",
        ],
        stack: ["Enterprise Apps", "Support", "Reliability"],
        scale: "Long-lived operational systems",
        href: "https://github.com/jay-m-dev",
      },
    ];
  }, []);

  const approach = useMemo(() => {
    return [
      {
        title: "Execution",
        bullets: [
          "Break ambiguous requirements into deliverable increments.",
          "Favor maintainable designs over unnecessary complexity.",
          "Balance new work with operational risk, testing, and supportability.",
        ],
      },
      {
        title: "Collaboration",
        bullets: [
          "Work effectively with product, analysts, support, and domain stakeholders.",
          "Communicate tradeoffs clearly during delivery and incident response.",
          "Document decisions and hand off context so systems remain sustainable.",
        ],
      },
    ];
  }, []);

  const openSourceProjects = useMemo(() => {
    return [
      {
        name: "GitHub Portfolio",
        desc: "Public repositories and code samples that show current work and implementation style.",
        href: "https://github.com/jay-m-dev",
      },
      {
        name: "Personal Site",
        desc: "Portfolio site summarizing experience, engineering focus, and contact information.",
        href: "https://jay-m-dev.github.io/",
      },
    ];
  }, []);

  return (
    <div className="relative min-h-screen text-slate-200">
      <div className="pointer-events-none absolute inset-0 hero-grad" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="noise absolute inset-0" />

      <header className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/35 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-950/50">
              <div className="absolute inset-0 ring-grad opacity-90" />
              <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-sky-300/10 to-transparent" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-slate-50">
                Jay Moran
              </div>
              <div className="text-xs text-slate-400">
                Senior Software Engineer
              </div>
            </div>
          </a>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <ThemeToggle
              theme={theme}
              onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
            />
            <LinkBtn
              href="https://github.com/jay-m-dev"
              icon={Github}
              label="GitHub"
            />
            <LinkBtn
              href="https://www.linkedin.com/in/moran-jay"
              icon={Linkedin}
              label="LinkedIn"
            />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-3">
          <nav className="site-nav" aria-label="Section navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`site-nav__link${activeSection === item.id ? " is-active" : ""}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="relative mx-auto max-w-6xl px-5">
        <section className="relative overflow-hidden rounded-3xl border border-slate-800/60 bg-slate-950/40 px-6 py-14 shadow-neon mt-8">
          <Particles />
          <div className="relative">
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 10 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-950/40 px-3 py-1 text-xs text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300 animate-glow" />
                Backend Engineering • Platform Reliability • Software Delivery
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-50 md:text-5xl neon-text">
                Building reliable software systems that teams can operate,
                extend, and trust.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Senior software engineer focused on backend systems, internal
                platforms, and business-critical applications. I work well in
                complex environments, translate messy requirements into
                maintainable systems, and bring steady production ownership
                from implementation through support.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <LinkBtn
                  href="https://www.linkedin.com/in/moran-jay"
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-950/40 px-4 py-2 text-sm text-slate-100 transition hover:border-violet-400/40 hover:shadow-neon"
                >
                  View work
                  <ArrowUpRight className="h-4 w-4 opacity-70" />
                </a>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Pill
                icon={Network}
                title="Backend Systems"
                text="APIs, business logic, and service boundaries designed for clarity and maintainability."
              />
              <Pill
                icon={Search}
                title="Data & Integrations"
                text="SQL, reporting, and system-to-system workflows that keep operations moving."
              />
              <Pill
                icon={Shield}
                title="Production Ownership"
                text="Monitoring, debugging, incident response, and long-term care for software in use."
              />
            </div>
          </div>
        </section>

        <Section
          id="focus"
          kicker="WHAT I DO"
          title="Focus areas"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-sky-300" />
                <div className="text-sm font-semibold text-slate-50">
                  Backend engineering
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Application services, APIs, integrations, and workflow
                orchestration for internal or customer-facing systems.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-violet-300" />
                <div className="text-sm font-semibold text-slate-50">
                  Software delivery
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Requirements shaping, implementation, testing, deployment,
                and iteration in real-world existing codebases.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-sky-300" />
                <div className="text-sm font-semibold text-slate-50">
                  Data & business systems
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Relational data models, reporting, and operational tooling
                built for correctness and longevity.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Cpu className="h-5 w-5 text-violet-300" />
                <div className="text-sm font-semibold text-slate-50">
                  Platform engineering
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Supportable architecture, performance tuning, observability,
                and calm incident response.
              </p>
            </div>
          </div>
        </Section>

        <Section
          id="skills"
          kicker="TOOLKIT"
          title="Skills"
        >
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </Section>

        <Section
          id="education"
          kicker="EDUCATION"
          title="Academic background"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-slate-50">
                M.S. in Software Engineering
              </div>
              <div className="mt-2 text-sm text-slate-300">
                California State University, Fullerton · 2019
              </div>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-slate-50">
                B.S. in Information Technology
              </div>
              <div className="mt-2 text-sm text-slate-300">
                Western Governors University · 2015
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="experience"
          kicker="EXPERIENCE"
          title="Work history"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {experience.map((job) => (
              <div key={`${job.company}-${job.title}`} className="glass rounded-2xl p-6">
                <div className="text-sm font-semibold text-slate-50">
                  {job.title}
                </div>
                <div className="mt-1 text-xs uppercase tracking-widest text-slate-400">
                  {job.company} · {job.period}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {job.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="work"
          kicker="HIGHLIGHTS"
          title="Engineering themes"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-2xl border border-slate-800/60 p-6 transition hover:border-sky-400/30 hover:shadow-neon block group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-50">
                    {p.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-70 group-hover:text-sky-200" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-6 glass rounded-2xl p-6">
            <div className="text-sm font-semibold text-slate-50">
              Experience snapshot
            </div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                • Backend services and internal platforms with long-term
                ownership
              </li>
              <li>
                • Production support, incident response, and reliability
                improvements
              </li>
              <li>
                • Data-intensive applications, reporting workflows, and
                system integrations
              </li>
            </ul>
          </div>
        </Section>

        <Section
          id="approach"
          kicker="APPROACH"
          title="How I work"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {approach.map((item) => (
              <div key={item.title} className="glass rounded-2xl p-6">
                <div className="text-sm font-semibold text-slate-50">
                  {item.title}
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-300">
                  {item.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <Section
          id="case-studies"
          kicker="CASE STUDIES"
          title="Representative engineering work"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {caseStudies.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group glass rounded-2xl p-6 border border-slate-800/60 transition hover:border-sky-400/30 hover:shadow-neon"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-50">
                    {p.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-70 group-hover:text-sky-200" />
                </div>
                <div className="mt-3 text-sm text-slate-300">
                  <div className="text-xs uppercase tracking-widest text-slate-400">
                    Problem
                  </div>
                  <p className="mt-2 leading-relaxed">{p.problem}</p>
                </div>
                <div className="mt-4 text-sm text-slate-300">
                  <div className="text-xs uppercase tracking-widest text-slate-400">
                    Approach
                  </div>
                  <ul className="mt-2 space-y-2">
                    {p.approach.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 text-sm text-slate-300">
                  <div className="text-xs uppercase tracking-widest text-slate-400">
                    Impact
                  </div>
                  <ul className="mt-2 space-y-2">
                    {p.impact.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                  <Tag>{p.scale}</Tag>
                </div>
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="open-source"
          kicker="PUBLIC WORK"
          title="Public work"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {openSourceProjects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group glass rounded-2xl p-6 border border-slate-800/60 transition hover:border-sky-400/30 hover:shadow-neon"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-50">
                    {p.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-70 group-hover:text-sky-200" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {p.desc}
                </p>
                {p.contribution ? (
                  <>
                    <div className="mt-3 text-xs uppercase tracking-widest text-slate-400">
                      Contribution
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      {p.contribution}
                    </p>
                  </>
                ) : null}
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          kicker="LET'S CONNECT"
          title="Contact"
        >
          <div className="grid gap-4">
            <div className="glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-slate-50">
                Open to
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Senior software engineering roles across industries,
                especially teams that need backend ownership, platform
                reliability, and someone comfortable with both new
                development and existing systems.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <LinkBtn
                  href="https://www.linkedin.com/in/moran-jay"
                  icon={Linkedin}
                  label="linkedin.com/in/moran-jay"
                />
              </div>
            </div>
          </div>
        </Section>

        <div className="pb-10" />
      </main>

      <footer className="border-t border-slate-800/60 bg-slate-950/40">
        <div className="mx-auto max-w-6xl px-5 py-6 text-xs text-slate-400">
          © {year} Jay Moran
        </div>
      </footer>
    </div>
  );
}
