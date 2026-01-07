// src/App.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
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
      "FastAPI",
      "Flask",
      "Django",
      "ReactJS",
      "Python",
      "Java",
      "Node.js",
      "Git",
      "Docker",
      "Backend Engineering",
      "Healthcare Technology",
      "SQL & Data Modeling",
      "Knowledge Graphs (Neo4j, Memgraph)",
      "Vector Search / Similarity Retrieval",
      "Linux",
      "System Reliability",
      "Pragmatic Architecture",
    ];
  }, []);

  const projects = useMemo(() => {
    return [
      {
        name: "Graph + Vector Data Workflows",
        desc: "Knowledge-graph modeling plus semantic retrieval for research \
systems.",
        tags: ["Neo4j", "Memgraph", "Vectors", "Search"],
        href: "https://alzkb.ai",
      },
      {
        name: "Data Platforms & Reporting",
        desc: "SQL-driven pipelines and systems supporting analytics and \
mission-critical operations.",
        tags: ["SQL", "Data", "Reliability"],
        href: "https://github.com/EpistasisLab/Aliro",
      },
      {
        name: "Production Engineering",
        desc: "Stability, maintainability, and long-term ownership in \
enterprise environments.",
        tags: ["Ops", "Monitoring", "Quality"],
        href: "https://www.linkedin.com/in/moran-jay/",
      },
    ];
  }, []);

  const featuredProjects = useMemo(() => {
    return [
      {
        name: "Aliro",
        desc: "Easy-to-use data science assistant for supervised ML with a \
web interface, visual results, and reproducible scripts.",
        href: "https://github.com/EpistasisLab/Aliro",
      },
      {
        name: "TPOT2",
        desc: "Tree-based Pipeline Optimization Tool (TPOT), a Python AutoML \
tool that optimizes ML pipelines using genetic programming.",
        href: "https://github.com/EpistasisLab/tpot2",
      },
      {
        name: "AlzKB",
        desc: "Knowledge base for AI research in Alzheimer Disease based on \
graph databases.",
        href: "https://github.com/EpistasisLab/AlzKB",
      },
      {
        name: "AI Campus",
        desc: "AI Campus at the Cedars-Sinai Medical Center.",
        href: "https://cedars.nationalcampus.ai/",
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
            <a className="text-slate-300 hover:text-slate-50" href="#about">
              About
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#skills">
              Skills
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#work">
              Work
            </a>
            <a className="text-slate-300 hover:text-slate-50" href="#projects">
              Projects
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
                Healthcare • Data Platforms • Graph + Vector Search
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight \
text-slate-50 md:text-5xl neon-text">
                Building reliable systems for research and mission-critical
                data.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-slate-300">
                Senior software engineer with 10+ years building reliable
                enterprise applications. I deliver backend systems, APIs, and
                data platforms, including private ERP and Point of Sale
                workflows.
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
                title="Knowledge Graphs"
                text="Neo4j → Memgraph, relationship modeling, Cypher queries."
              />
              <Pill
                icon={Search}
                title="Vector Retrieval"
                text="Similarity search, semantic retrieval, hybrid pipelines."
              />
              <Pill
                icon={Shield}
                title="Regulated Systems"
                text="Correctness, stability, ownership, production discipline."
              />
            </div>
          </div>
        </section>

        <Section
          id="about"
          kicker="ABOUT"
          title="Quick bio"
        >
          <div className="glass rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-slate-300">
              Senior software engineer building secure, reliable systems in
              enterprise environments, with hands-on experience across SQL
              platforms, knowledge graphs, and vector retrieval.
            </p>
          </div>
        </Section>

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
                Private ERP and Point of Sale platforms with reliable
                workflows, integrations, and operational accuracy.
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
                  Graph + vector search
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Knowledge graphs for relationship-rich domains and vector
                databases for semantic retrieval in research-focused systems.
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
                • Data science assistant: full-stack ML product built with
                Node.js, Python, and React, delivering assistant workflows
                over learned models
              </li>
              <li>
                • Clinical application: vision AI models to support prediction
                of surgical procedures in real-world workflows
              </li>
              <li>
                • Enterprise platforms: long-term ownership, stability, and
                production support across large systems
              </li>
            </ul>
          </div>
        </Section>

        <Section
          id="projects"
          kicker="PROJECTS"
          title="Selected projects"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {featuredProjects.map((p) => (
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
              </a>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          kicker="LET'S CONNECT"
          title="Contact"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-slate-50">
                Open to
              </div>
              <p className="mt-3 text-sm text-slate-300">
                Senior backend / data platform roles, healthcare tech, graph
                + vector search systems, and reliability-focused engineering.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <LinkBtn
                  href="https://www.linkedin.com/in/moran-jay"
                  icon={Linkedin}
                  label="linkedin.com/in/moran-jay"
                />
                <LinkBtn
                  href="https://github.com/jay-m-dev"
                  icon={Github}
                  label="github.com/jay-m-dev"
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="text-sm font-semibold text-slate-50">
                © {year} Jay Moran
              </div>
            </div>
          </div>
        </Section>

        <div className="pb-14" />
      </main>
    </div>
  );
}
