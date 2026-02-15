// src/App.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Shield,
  Database,
  Network,
  Search,
  Cpu,
  Server,
  Code2,
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
    <span className="rounded-full border border-slate-700/60 bg-slate-900/40 \
px-3 py-1 text-xs text-slate-200">
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
      className="group inline-flex items-center gap-2 rounded-xl \
border border-slate-700/60 bg-slate-950/40 px-4 py-2 text-sm \
text-slate-100 transition hover:border-sky-400/40 hover:shadow-neon"
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-4 w-4 text-slate-200 group-hover:text-sky-200" />
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 opacity-60" />
    </a>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const reduced = useReducedMotion();

  const skills = useMemo(() => {
    return [
      "Backend Engineering",
      "API Design (REST)",
      "System Design",
      "Distributed Systems",
      "Architecture Reviews",
      "Mentorship",
      "Incident Management",
      "Knowledge Graphs",
      "Vector Databases",
      "Semantic Search",
      "SQL & Data Modeling",
      "PostgreSQL",
      "Neo4j",
      "Memgraph",
      "Caching",
      "Message Queues",
      "Authentication & Authorization",
      "Python",
      "FastAPI",
      "Java",
      "Node.js",
      "React",
      "TypeScript",
      "Git",
      "Docker",
      "Linux",
      "CI/CD",
      "Observability",
      "Performance Tuning",
      "Testing",
      "Roadmapping",
    ];
  }, []);

  const projects = useMemo(() => {
    return [
      {
        name: "Biomedical Research Platforms",
        desc: "Knowledge graph modeling, semantic search, and reliable data \
systems that support biomedical research workflows.",
        tags: ["Knowledge Graphs", "Vector Search", "Research Systems"],
        href: "https://www.linkedin.com/in/moran-jay/",
      },
      {
        name: "Enterprise Retail Operations",
        desc: "Long-term ownership of enterprise systems supporting retail \
and operational reliability.",
        tags: ["Enterprise Systems", "Operations", "Reliability"],
        href: "https://github.com/jay-m-dev",
      },
      {
        name: "Data Platforms & Reporting",
        desc: "SQL-driven pipelines and reporting systems that support \
decision-making and operational integrity.",
        tags: ["SQL", "Pipelines", "Reporting"],
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
          "Design, develop, and maintain software systems supporting \
biomedical research and data workflows.",
          "Collaborate with researchers, analysts, and IT teams to deliver \
reliable, production-ready solutions.",
          "Model complex biomedical relationships using knowledge graphs \
(Neo4j, Memgraph).",
          "Integrate vector databases for semantic search and data-driven \
analysis.",
          "Support SQL-based analytics and reporting; improve stability, \
performance, and maintainability across internal platforms.",
        ],
      },
      {
        company: "Cedars-Sinai",
        title: "Programmer Analyst",
        period: "Apr 2022 – Mar 2024 · Los Angeles Metropolitan Area",
        bullets: [
          "Supported development and maintenance of internal research and \
clinical software systems.",
          "Implemented enhancements and bug fixes across existing \
applications.",
          "Assisted data analysis workflows and backend system support.",
          "Partnered with senior engineers to deliver new features and \
integrations.",
        ],
      },
      {
        company: "Curacao",
        title: "Programmer Analyst",
        period: "Nov 2014 – Apr 2022 · Los Angeles, CA",
        bullets: [
          "Maintained and enhanced enterprise software systems supporting \
retail and operations.",
          "Worked across development, data, and production support \
responsibilities.",
          "Built long-term ownership practices focused on stability and \
reliability.",
          "Progressed from operational roles into full software \
responsibilities.",
        ],
      },
      {
        company: "AccuPOS",
        title: "Software Engineer",
        period: "Feb 2014 – Nov 2014",
        bullets: [
          "Developed and supported point-of-sale software workflows.",
          "Partnered with support teams to resolve production issues and \
deliver fixes.",
        ],
      },
      {
        company: "Earlier roles",
        title: "Technical Support Specialist · Project Coordinator · \
Call Center Supervisor",
        period: "Mar 2011 – Feb 2014",
        bullets: [
          "Built foundations in customer support, operations, and \
systems reliability before transitioning into full-time engineering.",
        ],
      },
    ];
  }, []);

  const caseStudies = useMemo(() => {
    return [
      {
        name: "Biomedical Knowledge Graph + Semantic Search",
        problem:
          "Enable researchers to explore complex biomedical relationships and \
discover relevant data efficiently.",
        approach: [
          "Modeled biomedical entities and relationships with knowledge \
graphs (Neo4j, Memgraph).",
          "Integrated vector databases to support semantic search and \
similarity queries.",
          "Partnered with researchers and IT stakeholders to deliver \
production-ready workflows.",
        ],
        impact: [
          "Enabled semantic discovery and data-driven analysis for research \
teams.",
          "Improved reliability and maintainability of internal research \
platforms.",
          "Supported analytics and reporting with durable SQL-based systems.",
        ],
        stack: ["Neo4j", "Memgraph", "Vector DBs", "SQL"],
        scale: "Biomedical research data workflows",
        href: "https://www.linkedin.com/in/moran-jay",
      },
      {
        name: "Research & Clinical Systems Support",
        problem:
          "Maintain reliable internal systems while delivering new features \
for research and clinical workflows.",
        approach: [
          "Implemented enhancements and bug fixes across legacy \
applications.",
          "Supported data analysis workflows and backend system operations.",
          "Collaborated with senior engineers to deliver integrations and \
feature updates.",
        ],
        impact: [
          "Improved stability and responsiveness of internal systems.",
          "Reduced operational friction for research stakeholders.",
          "Delivered production-ready updates with cross-functional \
coordination.",
        ],
        stack: ["Backend Systems", "SQL", "Integrations"],
        scale: "Internal research and clinical teams",
        href: "https://github.com/jay-m-dev",
      },
      {
        name: "Enterprise Retail Operations Platform",
        problem:
          "Keep enterprise retail operations running on stable, reliable \
software systems.",
        approach: [
          "Maintained and enhanced systems across development and production \
support.",
          "Collaborated across operations, data, and support teams.",
          "Built long-term ownership practices for stability and reliability.",
        ],
        impact: [
          "Improved operational continuity for day-to-day retail workflows.",
          "Reduced recurring issues through durable fixes and maintenance.",
          "Supported teams with dependable systems and long-term ownership.",
        ],
        stack: ["Enterprise Systems", "Operations", "Support"],
        scale: "Retail and operations workflows",
        href: "https://github.com/jay-m-dev",
      },
    ];
  }, []);

  const leadership = useMemo(() => {
    return [
      {
        title: "Technical Leadership",
        bullets: [
          "System design decisions focused on reliability and \
maintainability.",
          "Translate complex requirements into production-ready solutions.",
          "Stability and performance improvements across internal platforms.",
        ],
      },
      {
        title: "Team Enablement",
        bullets: [
          "Cross-functional collaboration with researchers, analysts, and IT \
teams.",
          "Production support practices that reduce operational risk.",
          "Clear documentation and handoffs that keep systems dependable.",
        ],
      },
    ];
  }, []);

  const openSourceProjects = useMemo(() => {
    return [
      {
        name: "GitHub Portfolio",
        desc: "Public repositories, code samples, and ongoing work.",
        href: "https://github.com/jay-m-dev",
      },
      {
        name: "Personal Site",
        desc: "This portfolio site and related public work.",
        href: "https://jay-m-dev.github.io/",
      },
    ];
  }, []);

  return (
    <div className="relative min-h-screen text-slate-200">
      <div className="pointer-events-none absolute inset-0 hero-grad" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="noise absolute inset-0" />

      <header className="sticky top-0 z-40 border-b border-slate-800/60 \
bg-slate-950/35 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between \
px-5 py-3">
          <a href="#top" className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl \
border border-slate-700/60 bg-slate-950/50">
              <div className="absolute inset-0 ring-grad opacity-90" />
              <div className="absolute inset-0 animate-scan bg-gradient-to-b \
from-transparent via-sky-300/10 to-transparent" />
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

          <nav className="hidden items-center gap-5 text-sm md:flex">
            <a className="text-slate-300 hover:text-slate-50" href="#focus">
              Focus
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#skills">
              Skills
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#experience">
              Experience
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#work">
              Work
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#leadership">
              Leadership
            </a>
            <a
              className="text-slate-300 hover:text-slate-50"
              href="#case-studies"
            >
              Case Studies
            </a>
            <a
              className="text-slate-300 hover:text-slate-50"
              href="#open-source"
            >
              Public work
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#contact">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2">
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
      </header>

      <main id="top" className="relative mx-auto max-w-6xl px-5">
        <section className="relative overflow-hidden rounded-3xl border \
border-slate-800/60 bg-slate-950/40 px-6 py-14 shadow-neon mt-8">
          <Particles />
          <div className="relative">
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 10 }}
              animate={reduced ? {} : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 rounded-full \
border border-slate-700/60 bg-slate-950/40 px-3 py-1 text-xs \
text-slate-200">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300 \
animate-glow" />
                Healthcare Technology • Data Platforms • Reliability Engineering
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight \
text-slate-50 md:text-5xl neon-text">
                Building reliable backend systems for healthcare, data
                platforms, and enterprise operations.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Senior software professional with 10+ years of experience
                building, supporting, and modernizing systems across
                healthcare, finance, and large-scale enterprise environments.
                I deliver backend services, data workflows, and knowledge
                graph solutions, collaborating with cross-functional teams to
                translate complex requirements into reliable, maintainable
                software.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <LinkBtn
                  href="https://www.linkedin.com/in/moran-jay"
                  icon={Linkedin}
                  label="LinkedIn"
                />
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-xl \
border border-slate-700/60 bg-slate-950/40 px-4 py-2 text-sm \
text-slate-100 transition hover:border-violet-400/40 hover:shadow-neon"
                >
                  View work
                  <ArrowUpRight className="h-4 w-4 opacity-70" />
                </a>
              </div>
            </motion.div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              <Pill
                icon={Network}
                title="Backend APIs"
                text="Clean interfaces, predictable behavior, and durable \
service contracts."
              />
              <Pill
                icon={Search}
                title="Operational Data"
                text="Reliable reporting pipelines and data models that teams \
trust."
              />
              <Pill
                icon={Shield}
                title="Reliability"
                text="Stability, monitoring, and production ownership in \
enterprise environments."
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
                  Enterprise systems
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Healthcare research platforms and enterprise systems with
                reliable workflows, integrations, and operational accuracy.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-violet-300" />
                <div className="text-sm font-semibold text-slate-50">
                  Software engineering
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Degree-trained engineer focused on clean architecture, APIs,
                and maintainable applications.
              </p>
            </div>
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-sky-300" />
                <div className="text-sm font-semibold text-slate-50">
                  Data platforms
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                SQL-driven systems for analytics and reporting, with an
                emphasis on correctness, maintainability, and long-term
                ownership.
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
                Practical architecture, performance tuning, and systems that
                are easy to operate and extend.
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
          title="Selected work themes"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {projects.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="glass rounded-2xl p-6 transition \
hover:border-sky-400/30 hover:shadow-neon border border-slate-800/60 \
block group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-50">
                    {p.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-70 \
group-hover:text-sky-200" />
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
                • Biomedical research systems: knowledge graphs, semantic
                search, and reliable data workflows
              </li>
              <li>
                • Enterprise retail operations: long-term system ownership
                with stability and operational continuity
              </li>
              <li>
                • Data platforms: SQL-driven analytics, reporting, and
                production support
              </li>
            </ul>
          </div>
        </Section>

        <Section
          id="leadership"
          kicker="LEADERSHIP"
          title="Lead engineer signals"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {leadership.map((item) => (
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
          title="Backend engineering impact"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {caseStudies.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group glass rounded-2xl p-6 border border-slate-800/60 \
transition hover:border-sky-400/30 hover:shadow-neon"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-50">
                    {p.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-70 \
group-hover:text-sky-200" />
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
                className="group glass rounded-2xl p-6 border border-slate-800/60 \
transition hover:border-sky-400/30 hover:shadow-neon"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-slate-50">
                    {p.name}
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-slate-300 opacity-70 \
group-hover:text-sky-200" />
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
                Senior backend / platform roles in healthcare technology,
                data platforms, and enterprise systems that value reliability
                and production ownership.
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
