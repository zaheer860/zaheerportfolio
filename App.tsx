
import React, { FormEvent, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, CircleAlert, CircleCheck,
  Download, FileText, Linkedin, Mail, Maximize2, Menu, Phone, Send, X
} from 'lucide-react';

import {
  PERSONAL_INFO, HERO_DISCIPLINES, FOCUS_AREAS, ABOUT_STATS, EXPERIENCES, EDUCATIONS,
  PROJECTS, SKILL_GROUPS, TOOLCHAIN, ACHIEVEMENTS, CERTIFICATIONS
} from './constants';
import type { Project, ProjectDiagram, ProjectImage } from './types';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
];
const SECTION_IDS = ['home', ...NAV_ITEMS.map((item) => item.id)];
const LINKEDIN_URL = `https://www.${PERSONAL_INFO.linkedin}`;
const RESUME_DOWNLOAD_NAME = 'Zaheer_Ahamad_Mohammed_Resume.pdf';

const pad = (n: number) => String(n).padStart(2, '0');
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Tracks which section sits in the middle band of the viewport, for the nav's active state
const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const Navbar = ({ active }: { active: string }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    const desktop = window.matchMedia('(min-width: 768px)');
    const onResize = () => desktop.matches && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    desktop.addEventListener('change', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      desktop.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);
  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        solid
          ? 'border-line bg-paper/90 shadow-[0_1px_14px_-8px_rgba(23,22,29,0.22)] backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a href="#home" onClick={close} aria-label="Zaheer Ahamad Mohammed, back to top" className="font-serif text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">
          Zaheer<span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-6 md:flex lg:gap-9">
          {NAV_ITEMS.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} className="nav-link" aria-current={active === id ? 'location' : undefined}>{label}</a>
            </li>
          ))}
        </ul>

        <a href={PERSONAL_INFO.resume} download={RESUME_DOWNLOAD_NAME} className="btn btn-primary btn-sm hidden lg:inline-flex">
          <Download aria-hidden="true" /> Resume
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-ink transition-colors hover:bg-paper-deep md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        inert={!menuOpen}
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${menuOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <ul className="container-x border-t border-line pb-6 pt-1">
            {NAV_ITEMS.map(({ id, label }, i) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={close}
                  aria-current={active === id ? 'location' : undefined}
                  className="flex items-baseline gap-4 border-b border-line py-4 text-lg font-medium text-ink transition-colors hover:text-accent-deep aria-[current]:text-accent-deep"
                >
                  <span className="meta">{pad(i + 1)}</span>
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a href={PERSONAL_INFO.resume} download={RESUME_DOWNLOAD_NAME} onClick={close} className="btn btn-primary w-full">
                <Download aria-hidden="true" /> Download Resume
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

// Drawing-style ring around the portrait: centre lines, a tick scale and one accent arc
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

const Portrait = () => (
  <div data-hero-portrait className="relative mx-auto aspect-square w-full max-w-[15.5rem] sm:max-w-[20rem] lg:max-w-[27rem]">
    <svg aria-hidden="true" viewBox="0 0 400 400" fill="none" className="absolute inset-0 h-full w-full overflow-visible text-ink/25">
      <path d="M200 -8V408M-8 200H408" stroke="currentColor" strokeWidth="0.75" strokeDasharray="16 5 3 5" />
      <circle cx="200" cy="200" r="172" stroke="currentColor" strokeWidth="0.75" />
      {TICKS.map((deg) => {
        const long = deg % 30 === 0;
        const rad = (deg * Math.PI) / 180;
        const r1 = long ? 179 : 184;
        return (
          <line
            key={deg}
            x1={200 + r1 * Math.cos(rad)} y1={200 + r1 * Math.sin(rad)}
            x2={200 + 190 * Math.cos(rad)} y2={200 + 190 * Math.sin(rad)}
            stroke="currentColor" strokeWidth={long ? 1 : 0.6}
          />
        );
      })}
      <path d="M258.8 38.4A172 172 0 0 1 355.9 127.3" stroke="var(--color-accent)" strokeWidth="1.5" />
    </svg>

    <div className="absolute inset-[12%] rounded-full bg-surface p-1.5 shadow-[0_30px_60px_-30px_rgba(23,22,29,0.5)] ring-1 ring-line">
      <img
        src="/profile-hero.webp"
        srcSet="/profile-hero-480.webp 480w, /profile-hero.webp 800w"
        sizes="(min-width: 1024px) 330px, 250px"
        width={800}
        height={800}
        alt="Portrait of Zaheer Ahamad Mohammed"
        fetchPriority="high"
        decoding="async"
        className="h-full w-full rounded-full object-cover"
      />
    </div>

    <p className="absolute right-0 top-[10%] hidden items-center gap-2 rounded-md border border-line bg-surface/95 px-3 py-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-soft shadow-[0_12px_24px_-18px_rgba(23,22,29,0.45)] sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> CAD · NPD
    </p>
    <p className="absolute bottom-[10%] left-0 hidden items-center gap-2 rounded-md border border-line bg-surface/95 px-3 py-2 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-ink-soft shadow-[0_12px_24px_-18px_rgba(23,22,29,0.45)] sm:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Robotics · Vision
    </p>
  </div>
);

const Hero = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-hero]', { y: 18, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', clearProps: 'transform,opacity' });
      gsap.from('[data-hero-portrait]', { opacity: 0, scale: 0.97, duration: 0.9, delay: 0.15, ease: 'power2.out', clearProps: 'transform,opacity' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero-surface relative isolate overflow-hidden pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden="true" className="hero-grid absolute inset-0 -z-10" />
      <div className="container-x">
        <div className="grid items-center gap-12 pb-12 sm:pb-16 lg:grid-cols-12 lg:gap-8 lg:pb-24">
          <div className="lg:col-span-7">
            <p data-hero className="eyebrow flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Engineering Portfolio · 2026
            </p>
            <h1 data-hero className="display mt-6">{PERSONAL_INFO.name}</h1>
            <p data-hero className="mt-6 text-xl font-medium leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
              {PERSONAL_INFO.role}
              <span className="block text-accent-deep">{PERSONAL_INFO.specialism}</span>
            </p>
            <p data-hero className="lede mt-5 max-w-xl">{PERSONAL_INFO.intro}</p>
            <div data-hero className="mt-9 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View Projects <ArrowRight aria-hidden="true" className="icon-shift" />
              </a>
              <a href={PERSONAL_INFO.resume} download={RESUME_DOWNLOAD_NAME} className="btn btn-secondary">
                <Download aria-hidden="true" /> Download Resume
              </a>
              <a href="#contact" className="btn btn-ghost"><span>Contact Me</span></a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Portrait />
          </div>
        </div>

        <ul data-hero aria-label="Disciplines" className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {HERO_DISCIPLINES.map((item, i) => (
            <li
              key={item.title}
              className="border-line py-5 pr-4 sm:py-6 max-lg:even:border-l max-lg:even:pl-5 max-lg:nth-[n+3]:border-t lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <span className="meta text-accent-deep">{pad(i + 1)}</span>
              <p className="mt-2 font-semibold tracking-[-0.01em] text-ink">{item.title}</p>
              <p className="mt-1 text-sm text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const SectionHeader = ({ index, label, title, lede, dark = false }: {
  index: string; label: string; title: string; lede?: string; dark?: boolean;
}) => (
  <header data-reveal className="mb-12 grid gap-5 md:mb-16 lg:grid-cols-12 lg:items-end lg:gap-10">
    <div className="lg:col-span-7">
      <p className={`eyebrow flex items-center gap-3 ${dark ? 'text-[#a9a7b8]' : ''}`}>
        <span className={dark ? 'text-[#b9b5ff]' : 'text-accent-deep'}>{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-current opacity-40" />
        {label}
      </p>
      <h2 className={`section-title mt-5 ${dark ? 'text-white' : ''}`}>{title}</h2>
    </div>
    {lede && (
      <p className={`lede max-w-md lg:col-span-5 lg:justify-self-end lg:pb-1.5 ${dark ? 'text-[#b8b7c6]' : ''}`}>{lede}</p>
    )}
  </header>
);

const Section = ({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) => (
  <section id={id} className={`border-t border-line py-20 sm:py-24 lg:py-32 ${className}`}>
    <div className="container-x">{children}</div>
  </section>
);

// Column heading shared by Experience / Education and the Achievements panel
const ColumnHead = ({ title, meta, dark = false, className = '' }: {
  title: string; meta: string; dark?: boolean; className?: string;
}) => (
  <div data-reveal className={`flex items-baseline justify-between gap-4 border-b pb-3 ${dark ? 'border-white/20' : 'border-ink/70'} ${className}`}>
    <h3 className={`text-[0.8125rem] font-semibold uppercase tracking-[0.14em] ${dark ? 'text-white' : 'text-ink'}`}>{title}</h3>
    <span className={`meta ${dark ? 'text-[#9d9bb0]' : ''}`}>{meta}</span>
  </div>
);

const About = () => (
  <Section id="about">
    <SectionHeader
      index="01"
      label="About"
      title="From CAD model to working mechanism."
      lede="Industry NPD experience, a mechanism-design internship at IIT Tirupati, and hands-on robotics builds."
    />
    <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
      <figure data-reveal className="lg:col-span-5">
        <div className="relative mx-auto max-w-sm lg:max-w-none">
          <div className="overflow-hidden rounded-xl bg-paper-deep shadow-[0_30px_60px_-38px_rgba(23,22,29,0.5)] ring-1 ring-line">
            <img
              src="/profile-about.webp"
              srcSet="/profile-about-560.webp 560w, /profile-about.webp 960w"
              sizes="(min-width: 1024px) 420px, (min-width: 640px) 384px, 100vw"
              width={960}
              height={1200}
              loading="lazy"
              decoding="async"
              alt="Zaheer Ahamad Mohammed in a navy blazer"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div aria-hidden="true" className="corner-marks pointer-events-none absolute -inset-3" />
        </div>
        <figcaption className="mx-auto mt-7 flex max-w-sm items-start justify-between gap-4 border-t border-line pt-4 lg:max-w-none">
          <span className="meta text-ink-soft">Zaheer Ahamad Mohammed</span>
          <span className="meta text-right">B.Tech, Mechanical Engineering<br />2022 – 2026</span>
        </figcaption>
      </figure>

      <div data-reveal className="lg:col-span-7">
        <p className="font-serif text-[1.5rem] leading-[1.35] tracking-[-0.012em] text-ink sm:text-[1.75rem] lg:text-[2rem]">
          {PERSONAL_INFO.summary}
        </p>
        <p className="lede mt-6 max-w-2xl">
          {PERSONAL_INFO.skillsLine} Most recently, I supported new product development for automotive components as an
          NPD Intern at Pricol Precision Products — across design documentation, SAP MM operations and CMM inspection
          reviews for quality validation.
        </p>

        <div className="mt-10">
          <p className="eyebrow">Areas of focus</p>
          <ul className="mt-4 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
            {FOCUS_AREAS.map((area, i) => (
              <li key={area} className="flex items-baseline gap-4 border-b border-line py-3.5">
                <span className="meta text-accent-deep">{pad(i + 1)}</span>
                <span className="font-medium text-ink">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col border-l border-line pl-4 sm:pl-5">
              <dt className="order-2 mt-2 text-[0.8125rem] leading-snug text-muted">{stat.label}</dt>
              <dd className="order-1 font-serif text-[2rem] leading-none text-ink sm:text-[2.5rem]">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </Section>
);

const Skills = () => (
  <Section id="skills">
    <SectionHeader
      index="02"
      label="Skills"
      title="Tools, systems & engineering disciplines."
      lede="CAD and simulation at the core, supported by industrial SAP workflows, embedded programming and computer vision."
    />
    <div data-reveal className="card overflow-hidden">
      <ul className="divide-y divide-line">
        {SKILL_GROUPS.map((group, i) => (
          <li key={group.id} className="group grid gap-4 px-5 py-6 transition-colors duration-300 hover:bg-paper/60 sm:px-8 md:grid-cols-12 md:items-center md:gap-8">
            <div className="flex items-start gap-4 md:col-span-4">
              <span className="meta pt-1 transition-colors duration-300 group-hover:text-accent-deep">{pad(i + 1)}</span>
              <div>
                <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{group.title}</h3>
                <p className="mt-0.5 text-sm text-muted">{group.focus}</p>
              </div>
            </div>
            <ul className="flex flex-wrap gap-2 md:col-span-8" aria-label={`${group.title} skills`}>
              {group.items.map((item) => <li key={item} className="chip">{item}</li>)}
            </ul>
          </li>
        ))}
      </ul>
      <div className="grid gap-3 border-t border-line bg-paper/70 px-5 py-5 sm:px-8 md:grid-cols-12 md:items-center md:gap-8">
        <p className="eyebrow md:col-span-4 md:pl-10">Technologies & Tools</p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-ink-soft md:col-span-8">
          {TOOLCHAIN.map((tool, i) => (
            <li key={tool} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-line-strong" />}
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

// Explicit grid rows keep each Experience card level with its Education neighbour on desktop,
// while the DOM order still stacks Experience first, then Education, on smaller screens
const ROW_START = ['lg:row-start-2', 'lg:row-start-3', 'lg:row-start-4'];

const ExperienceTimeline = () => (
  <Section id="experience">
    <SectionHeader
      index="03"
      label="Experience"
      title="Professional journey."
      lede="Hands-on NPD work on automotive components, preceded by mechanism research at IIT Tirupati."
    />
    <div className="grid gap-5 lg:grid-cols-12 lg:gap-x-8">
      <ColumnHead title="Experience" meta="2025 – 2026" className="lg:col-span-7 lg:row-start-1" />
      {EXPERIENCES.map((exp, i) => (
        <div key={exp.id} data-reveal className={`lg:col-span-7 lg:col-start-1 ${ROW_START[i]}`}>
          <article className="card flex h-full flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="meta">{exp.duration}</p>
              {i === 0 && <span className="tag">Most recent</span>}
            </div>
            <h4 className="project-title mt-4">{exp.role}</h4>
            <p className="mt-1 font-medium text-accent-deep">{exp.organization}</p>
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {exp.points.map((point) => (
                <li key={point} className="relative pl-6 text-[0.9375rem] leading-relaxed before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-accent">
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </div>
      ))}

      <ColumnHead title="Education" meta="2020 – 2026" className="mt-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-0" />
      {EDUCATIONS.map((edu, i) => (
        <div key={edu.id} data-reveal className={`lg:col-span-5 lg:col-start-8 ${ROW_START[i]}`}>
          <article className="card flex h-full flex-col p-6 sm:p-8">
            <p className="meta">{edu.duration}</p>
            <h4 className="project-title mt-4">{edu.degree}</h4>
            <p className="mt-1 font-medium text-ink-soft">{edu.institution}</p>
            {edu.grade && (
              <div className="mt-auto pt-6">
                <p className="flex items-baseline justify-between gap-4 border-t border-line pt-5">
                  <span className="text-sm text-muted">{edu.grade.label}:</span>
                  <span className="font-serif text-[2rem] leading-none text-ink">{edu.grade.value}</span>
                </p>
              </div>
            )}
          </article>
        </div>
      ))}
    </div>
  </Section>
);

/* ---------------------------------------------------------------------------
   System diagrams for projects without photography.
   Every block and connection is taken from the project description — nothing more.
   --------------------------------------------------------------------------- */
const D = {
  text: '#ecebf5',
  sub: 'rgba(236,235,245,0.6)',
  wire: 'rgba(236,235,245,0.45)',
  box: 'rgba(199,196,255,0.4)',
  hot: '#a5a0ff',
};

const Block = ({ x, y, w, h, title, sub, hot = false }: {
  x: number; y: number; w: number; h: number; title: string; sub?: string; hot?: boolean;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={4} fill={hot ? 'rgba(99,91,255,0.18)' : 'rgba(255,255,255,0.03)'} stroke={hot ? D.hot : D.box} />
    <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} textAnchor="middle" fill={D.text} fontSize="12" fontWeight="500" letterSpacing="0.04em">{title}</text>
    {sub && <text x={x + w / 2} y={y + h / 2 + 14} textAnchor="middle" fill={D.sub} fontSize="10.5">{sub}</text>}
  </g>
);

const Wire = ({ d, id, both = false }: { d: string; id: string; both?: boolean }) => (
  <path d={d} fill="none" stroke={D.wire} markerEnd={`url(#${id})`} markerStart={both ? `url(#${id})` : undefined} />
);

const Caption = ({ x = 200, y, anchor = 'middle', children }: { x?: number; y: number; anchor?: 'start' | 'middle'; children: string }) => (
  <text x={x} y={y} textAnchor={anchor} fill={D.sub} fontSize="9.5" letterSpacing="0.1em">{children}</text>
);

const DIAGRAM_LABELS: Record<ProjectDiagram, string> = {
  drone: 'System diagram: the DJI Tello camera streams video to Python and OpenCV for face detection; the Tello SDK sends tracking commands back to the drone.',
  humanoid: 'System diagram: Wi-Fi control and AI voice/text interaction connect to an ESP8266 controller, which drives servos for head and multi-directional movement.',
  arm: 'System diagram: two control modes, ESP32 Wi-Fi and OpenCV plus MediaPipe gesture control, feed PWM servo actuation of a five-degree-of-freedom arm.',
};

const SystemDiagram = ({ kind, className = '' }: { kind: ProjectDiagram; className?: string }) => {
  const arrow = `arrow-${kind}`;
  return (
    <svg viewBox="0 0 400 250" role="img" aria-label={DIAGRAM_LABELS[kind]} className={className} fontFamily="'IBM Plex Mono', ui-monospace, monospace">
      <defs>
        <marker id={arrow} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0.5L7.5 4L0 7.5z" fill={D.wire} />
        </marker>
      </defs>

      {kind === 'drone' && (
        <g>
          <rect x="134" y="66" width="256" height="102" rx="6" fill="none" stroke={D.box} strokeDasharray="3 4" />
          <Caption x={144} y={82} anchor="start">PYTHON</Caption>
          <Block x={16} y={96} w={92} h={56} title="DJI TELLO" sub="camera" />
          <Block x={146} y={96} w={108} h={56} title="OPENCV" sub="face detection" hot />
          <Block x={290} y={96} w={92} h={56} title="TELLO SDK" sub="tracking" />
          <Wire id={arrow} d="M108 124H143" />
          <Caption x={126} y={116}>VIDEO</Caption>
          <Wire id={arrow} d="M254 124H287" />
          <Wire id={arrow} d="M336 152V192H62V155" />
          <Caption y={186}>FLIGHT COMMANDS</Caption>
          <Caption y={226}>REAL-TIME · PERIMETER MONITORING</Caption>
        </g>
      )}

      {kind === 'humanoid' && (
        <g>
          <Block x={16} y={52} w={108} h={50} title="WI-FI" sub="remote control" />
          <Block x={16} y={148} w={108} h={50} title="AI" sub="voice · text" />
          <Block x={160} y={95} w={88} h={60} title="ESP8266" sub="controller" hot />
          <Block x={284} y={52} w={100} h={50} title="SERVO" sub="head" />
          <Block x={284} y={148} w={100} h={50} title="SERVOS" sub="movement" />
          <Wire id={arrow} d="M124 77H142V113H157" />
          <Wire id={arrow} both d="M127 173H142V137H157" />
          <Wire id={arrow} d="M248 113H266V77H281" />
          <Wire id={arrow} d="M248 137H266V173H281" />
          <Caption y={232}>WI-FI CONTROL · SERVO ACTUATION</Caption>
        </g>
      )}

      {kind === 'arm' && (
        <g>
          <Block x={16} y={50} w={124} h={52} title="MODE A · ESP32" sub="Wi-Fi control" />
          <Block x={16} y={148} w={124} h={52} title="MODE B · VISION" sub="OpenCV + MediaPipe" />
          <Block x={172} y={98} w={70} h={54} title="PWM" sub="actuation" hot />
          <Wire id={arrow} d="M140 76H156V116H169" />
          <Wire id={arrow} d="M140 174H156V134H169" />
          <Wire id={arrow} d="M242 125H278" />
          {/* Kinematic chain: five revolute joints */}
          <path d="M292 206H352" stroke={D.text} strokeOpacity="0.6" strokeWidth="1.5" />
          {[298, 310, 322, 334, 346].map((x) => (
            <path key={x} d={`M${x} 206l-6 7`} stroke={D.sub} strokeWidth="0.75" />
          ))}
          <polyline points="322,196 322,162 350,132 364,98 352,68" fill="none" stroke={D.text} strokeOpacity="0.75" strokeWidth="2" strokeLinejoin="round" />
          <path d="M352 68l-11-12M352 68l2-16" stroke={D.text} strokeOpacity="0.75" strokeWidth="1.5" strokeLinecap="round" />
          {[[322, 196], [322, 162], [350, 132], [364, 98], [352, 68]].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="5" fill="#131219" stroke={D.hot} strokeWidth="1.5" />
              <text x={i < 3 ? cx - 11 : cx + 11} y={cy + 3} textAnchor={i < 3 ? 'end' : 'start'} fill={D.sub} fontSize="8.5">J{i + 1}</text>
            </g>
          ))}
          <Caption x={16} y={232} anchor="start">DUAL CONTROL · 5-DOF ARM</Caption>
        </g>
      )}
    </svg>
  );
};

// Pre-fills the contact form's subject so a recruiter can ask about a specific build
const prefillSubject = (title: string) => {
  const input = document.getElementById('contact-subject') as HTMLInputElement | null;
  if (input) input.value = `About your project: ${title}`;
};

const ProjectTags = ({ tech }: { tech: string[] }) => (
  <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
    {tech.map((t) => <li key={t} className="tag">{t}</li>)}
  </ul>
);

const ProjectNumber = ({ number }: { number: string }) => (
  <p className="meta text-accent-deep">
    {number} <span className="text-muted">/ {pad(PROJECTS.length)}</span>
  </p>
);

const Lightbox = ({ dialogRef, images, index, onIndex }: {
  dialogRef: RefObject<HTMLDialogElement | null>; images: ProjectImage[]; index: number; onIndex: (i: number) => void;
}) => {
  const count = images.length;
  const go = (step: number) => onIndex((index + step + count) % count);
  const close = () => dialogRef.current?.close();
  const image = images[index];

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby="lightbox-title"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3 sm:px-5">
        <p id="lightbox-title" className="meta text-ink-soft">NX CAD model · {pad(index + 1)} / {pad(count)}</p>
        <button type="button" onClick={close} className="icon-btn" aria-label="Close viewer" autoFocus>
          <X aria-hidden="true" />
        </button>
      </div>
      <div className="cad-stage aspect-[16/10] w-full">
        <img key={image.src} src={`${image.src}-1600.webp`} width={1600} height={1000} loading="lazy" alt={image.alt} className="fade-in h-full w-full object-contain" />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-3 sm:px-5">
        <button type="button" onClick={() => go(-1)} className="icon-btn" aria-label="Previous view"><ChevronLeft aria-hidden="true" /></button>
        <p className="min-w-0 flex-1 text-center text-sm text-muted">{image.alt}</p>
        <button type="button" onClick={() => go(1)} className="icon-btn" aria-label="Next view"><ChevronRight aria-hidden="true" /></button>
      </div>
    </dialog>
  );
};

const FeaturedProject = ({ project }: { project: Project }) => {
  const images = project.gallery ?? [];
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openViewer = () => dialogRef.current?.showModal();
  const current = images[active];

  return (
    <>
      <article className="card card-interactive group overflow-hidden lg:grid lg:grid-cols-12">
        <div className="border-b border-line p-3 sm:p-4 lg:col-span-7 lg:flex lg:flex-col lg:border-b-0 lg:border-r">
          <div className="cad-stage relative aspect-[16/10] overflow-hidden rounded-lg lg:aspect-auto lg:min-h-[22rem] lg:flex-1">
            <button type="button" onClick={openViewer} className="block h-full w-full cursor-zoom-in" aria-label={`Expand render: ${current.alt}`}>
              <img
                key={current.src}
                src={`${current.src}-800.webp`}
                srcSet={`${current.src}-800.webp 800w, ${current.src}-1600.webp 1600w`}
                sizes="(min-width: 1200px) 660px, (min-width: 1024px) 56vw, calc(100vw - 4rem)"
                width={1600}
                height={1000}
                loading="lazy"
                decoding="async"
                alt={current.alt}
                className="fade-in media-zoom h-full w-full object-contain lg:absolute lg:inset-0"
              />
            </button>
            <span className="stage-label pointer-events-none absolute left-3 top-3 rounded-[3px] bg-white/85 px-2 py-1 text-ink-soft ring-1 ring-line">
              {project.discipline}
            </span>
            <span className="meta pointer-events-none absolute right-3 top-3">{pad(active + 1)} / {pad(images.length)}</span>
            <span aria-hidden="true" className="icon-btn pointer-events-none absolute bottom-3 right-3"><Maximize2 /></span>
          </div>
          <div className="mt-3 grid grid-cols-6 gap-2" role="group" aria-label="CAD views">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                aria-label={`Show view ${i + 1}: ${img.alt}`}
                className={`cad-stage aspect-[16/10] cursor-pointer overflow-hidden rounded-md transition-shadow duration-200 ${
                  i === active ? 'ring-2 ring-accent' : 'ring-1 ring-line hover:ring-line-strong'
                }`}
              >
                <img src={`${img.src}-240.webp`} width={240} height={150} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div className="flex items-center justify-between gap-4">
            <ProjectNumber number={project.number} />
            <span className="eyebrow">Featured</span>
          </div>
          <h3 className="project-title mt-5 lg:text-[1.875rem]">{project.title}</h3>
          <p className="mt-4 text-[0.9375rem] leading-relaxed">{project.description}</p>
          {project.facts && (
            <dl className="mt-7 grid grid-cols-2 overflow-hidden rounded-lg border border-line">
              {project.facts.map((fact, i) => (
                <div key={fact.label} className={`border-line p-3.5 ${i % 2 === 0 ? 'border-r' : ''} ${i < project.facts!.length - 2 ? 'border-b' : ''}`}>
                  <dt className="meta">{fact.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-6"><ProjectTags tech={project.tech} /></div>
          <div className="mt-auto pt-8">
            <button type="button" onClick={openViewer} className="text-action">
              View all {images.length} renders <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </article>
      <Lightbox dialogRef={dialogRef} images={images} index={active} onIndex={setActive} />
    </>
  );
};

const ProjectCard = ({ project, wide = false }: { project: Project; wide?: boolean }) => (
  <article className={`card card-interactive group flex h-full flex-col overflow-hidden ${wide ? 'md:grid md:grid-cols-2 lg:flex' : ''}`}>
    <div className={`p-3 pb-0 ${wide ? 'md:pb-3 lg:pb-0' : ''}`}>
      <div className={`diagram-stage relative aspect-[16/10] overflow-hidden rounded-lg ${wide ? 'md:aspect-auto md:h-full md:min-h-56 lg:aspect-[16/10] lg:h-auto lg:min-h-0' : ''}`}>
        {project.diagram && <SystemDiagram kind={project.diagram} className="media-zoom absolute inset-0 h-full w-full" />}
        <span className="stage-label pointer-events-none absolute left-3 top-3 text-[#b8b6ca]">{project.discipline}</span>
        <span className="stage-label pointer-events-none absolute right-3 top-3 text-[#8f8da6]">Fig. {project.number}</span>
      </div>
    </div>
    <div className="flex flex-1 flex-col p-6 sm:p-7">
      <ProjectNumber number={project.number} />
      <h3 className="project-title mt-3">{project.title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed">{project.description}</p>
      <div className="mt-5"><ProjectTags tech={project.tech} /></div>
      <div className="mt-auto pt-7">
        <a href="#contact" onClick={() => prefillSubject(project.title)} className="text-action">
          Ask about this project <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </div>
  </article>
);

const Projects = () => {
  const [featured, ...rest] = PROJECTS;
  return (
    <Section id="projects">
      <SectionHeader
        index="04"
        label="Projects"
        title="Selected engineering work."
        lede="Mechanical assemblies modeled and validated in NX CAD, alongside robotics and computer-vision builds."
      />
      <div data-reveal>
        <FeaturedProject project={featured} />
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rest.map((project, i) => {
          const wide = i === rest.length - 1 && rest.length % 2 === 1;
          return (
            <div key={project.id} data-reveal className={wide ? 'md:col-span-2 lg:col-span-1' : ''}>
              <ProjectCard project={project} wide={wide} />
            </div>
          );
        })}
      </div>
    </Section>
  );
};

const Achievements = () => (
  <section id="achievements" className="border-t border-line py-20 sm:py-24 lg:py-32">
    <div className="container-x">
      <div className="night-panel relative isolate overflow-hidden rounded-[1.25rem] px-5 py-14 shadow-[0_40px_80px_-44px_rgba(19,18,25,0.7)] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
        <div aria-hidden="true" className="night-grid absolute inset-0 -z-10" />
        <SectionHeader
          dark
          index="05"
          label="Recognition"
          title="Achievements & certifications."
          lede="Recognised at project expos and competitions for drone innovation, with certification in mechanical CAD, CAE and robotics."
        />
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <ColumnHead dark title="Awards & milestones" meta={pad(ACHIEVEMENTS.length)} />
            <ol>
              {ACHIEVEMENTS.map((item, i) => (
                <li key={item.id} data-reveal className="group flex gap-5 border-b border-white/10 py-5 sm:py-6">
                  <span className="meta pt-1 text-[#8f8da6] transition-colors duration-300 group-hover:text-[#b9b5ff]">{pad(i + 1)}</span>
                  <div>
                    <h4 className="font-semibold leading-snug text-white">{item.title}</h4>
                    <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-[#b3b2c2]">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <ColumnHead dark title="Certifications" meta={pad(CERTIFICATIONS.length)} />
            <ul>
              {CERTIFICATIONS.map((cert, i) => (
                <li key={cert.id} data-reveal className="group flex gap-5 border-b border-white/10 py-5 sm:py-6">
                  <span className="meta pt-1 text-[#8f8da6] transition-colors duration-300 group-hover:text-[#b9b5ff]">{pad(i + 1)}</span>
                  <div className="min-w-0">
                    <h4 className="font-semibold leading-snug text-white">{cert.name}</h4>
                    <p className="meta mt-1.5 text-[#a3a1b8]">{cert.issuer}</p>
                    {cert.topics && (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Topics covered">
                        {cert.topics.map((topic) => <li key={topic} className="tag tag-dark">{topic}</li>)}
                      </ul>
                    )}
                    {cert.grade && (
                      <p className="mt-3 text-sm text-[#b3b2c2]">Grade: <span className="font-semibold text-white">{cert.grade}</span></p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CONTACT_ROWS = [
  // Zero-width space after "@" lets the long address wrap at a natural point instead of mid-domain
  { icon: Mail, label: 'Email', value: PERSONAL_INFO.email.replace('@', '@\u200B'), href: `mailto:${PERSONAL_INFO.email}` },
  { icon: Phone, label: 'Phone', value: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone.replace(/\s/g, '')}` },
  { icon: Linkedin, label: 'LinkedIn', value: PERSONAL_INFO.linkedin, href: LINKEDIN_URL, external: true },
  { icon: FileText, label: 'Résumé', value: 'Download PDF', href: PERSONAL_INFO.resume, download: RESUME_DOWNLOAD_NAME },
];

type FieldName = 'name' | 'email' | 'message';
type FormErrors = Partial<Record<FieldName, string>>;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} className="field-error">
      <CircleAlert size={14} aria-hidden="true" /> {message}
    </p>
  ) : null;

const Contact = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  // No backend: validate, then hand the message to the visitor's email client, pre-filled
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const subject = String(data.get('subject') ?? '').trim() || `Portfolio enquiry from ${name}`;
    const message = String(data.get('message') ?? '').trim();

    const next: FormErrors = {};
    if (!name) next.name = 'Please enter your name.';
    if (!email) next.email = 'Please enter your email address.';
    else if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter a valid email address.';
    if (!message) next.message = 'Please write a short message.';
    setErrors(next);

    const firstInvalid = (Object.keys(next) as FieldName[])[0];
    if (firstInvalid) {
      setSent(false);
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    const body = `${message}\n\n— ${name}\n${email}`;
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const clearError = (field: FieldName) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const fieldProps = (field: FieldName) => ({
    id: `contact-${field}`,
    name: field,
    required: true,
    className: 'field',
    'aria-invalid': Boolean(errors[field]),
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
    onInput: () => clearError(field),
  });

  return (
    <Section id="contact">
      <SectionHeader
        index="06"
        label="Contact"
        title="Let's build something precise."
        lede="Open to opportunities in CAD design, product development and mechanical engineering. Reach out directly, or send a message below."
      />
      <div data-reveal className="card overflow-hidden lg:grid lg:grid-cols-12">
        <aside className="night-panel relative isolate p-6 sm:p-8 lg:col-span-5 lg:p-10">
          <div aria-hidden="true" className="night-grid absolute inset-0 -z-10" />
          <p className="eyebrow text-[#a9a7b8]">Direct contact</p>
          <h3 className="mt-4 font-serif text-[1.625rem] font-medium leading-snug tracking-[-0.01em] text-white">
            {PERSONAL_INFO.name}
          </h3>
          <p className="mt-1 text-sm text-[#b3b2c2]">{PERSONAL_INFO.role} — {PERSONAL_INFO.specialism}</p>
          <ul className="mt-8 border-t border-white/10">
            {CONTACT_ROWS.map(({ icon: Icon, label, value, href, external, download }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  {...(download ? { download } : {})}
                  className="group flex items-center gap-4 border-b border-white/10 py-4 focus-visible:outline-offset-[-2px]"
                >
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-white/[0.06] text-[#c9c6ff] ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="meta block text-[#8f8da6]">{label}</span>
                    <span className="block text-[0.9375rem] font-medium text-white [overflow-wrap:anywhere]">{value}</span>
                  </span>
                  <ArrowUpRight size={18} aria-hidden="true" className="flex-none text-[#8f8da6] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <form className="p-6 sm:p-8 lg:col-span-7 lg:p-10" onSubmit={handleSubmit} noValidate aria-label="Contact form">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="field-label">Name</label>
              <input {...fieldProps('name')} type="text" autoComplete="name" placeholder="Your name" />
              <FieldError id="contact-name-error" message={errors.name} />
            </div>
            <div>
              <label htmlFor="contact-email" className="field-label">Email</label>
              <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="you@company.com" />
              <FieldError id="contact-email-error" message={errors.email} />
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="contact-subject" className="field-label">
              Subject <span className="font-normal text-muted">(optional)</span>
            </label>
            <input id="contact-subject" name="subject" type="text" placeholder="Role, project or enquiry" className="field" />
          </div>
          <div className="mt-5">
            <label htmlFor="contact-message" className="field-label">Message</label>
            <textarea {...fieldProps('message')} rows={5} placeholder="How can I help?" className="field resize-y min-h-32" />
            <FieldError id="contact-message-error" message={errors.message} />
          </div>
          <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted">Opens your email app with the message ready to send.</p>
            <button type="submit" className="btn btn-primary w-full sm:w-auto">
              Send Message <Send aria-hidden="true" className="icon-shift" />
            </button>
          </div>
          <div aria-live="polite">
            {sent && (
              <p className="mt-5 flex items-start gap-2.5 rounded-lg border border-[#abefc6] bg-[#ecfdf3] px-4 py-3 text-sm text-[#05603a]">
                <CircleCheck size={18} aria-hidden="true" className="mt-px flex-none" />
                <span>
                  Your email app should open with the message ready to send. If it doesn't, write to{' '}
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="font-semibold underline underline-offset-2 [overflow-wrap:anywhere]">{PERSONAL_INFO.email}</a>.
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </Section>
  );
};

const FOOTER_LINKS = [
  { icon: Linkedin, label: 'LinkedIn', href: LINKEDIN_URL, external: true },
  { icon: Mail, label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, external: false },
  { icon: FileText, label: 'Resume (PDF)', href: PERSONAL_INFO.resume, external: true },
];

const Footer = () => (
  <footer className="border-t border-line">
    <div className="container-x flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
      <div>
        <a href="#home" className="font-serif text-[1.375rem] font-semibold tracking-[-0.02em] text-ink">Zaheer<span className="text-accent">.</span></a>
        <p className="mt-1.5 text-sm text-muted">{PERSONAL_INFO.role} — {PERSONAL_INFO.specialism}</p>
      </div>
      <p className="meta">© {new Date().getFullYear()} {PERSONAL_INFO.name}</p>
      <div className="flex gap-2">
        {FOOTER_LINKS.map(({ icon: Icon, label, href, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="icon-btn hover:-translate-y-0.5"
          >
            <Icon aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default function App() {
  const active = useActiveSection(SECTION_IDS);

  // One scroll-reveal for every [data-reveal] element; hover transitions live on inner elements so they never fight GSAP
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
      gsap.set(items, { opacity: 0, y: 20 });
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power3.out', clearProps: 'transform,opacity'
        }),
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Recalculate trigger positions once images and fonts have settled
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div className="selection:bg-accent-soft">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white">
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <ExperienceTimeline />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
