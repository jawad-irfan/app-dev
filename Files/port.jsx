import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Github, Mail, MessageCircle, Menu, X, ChevronRight, Sparkles,
  GraduationCap, ExternalLink, Heart, Sun, Moon, Send, ShieldCheck,
  Home, User, Wrench, FolderKanban, BookOpen, MessageSquare,
  Zap, Target, Rocket, Award
} from "lucide-react";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer2q
} from "recharts";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Wrench },
  { id: "project", label: "Project", icon: ShieldCheck },
  { id: "work", label: "Work", icon: FolderKanban },
  { id: "education", label: "Education", icon: BookOpen },
  { id: "contact", label: "Contact", icon: MessageSquare },
];

const ROLES = [
  "Cybersecurity Enthusiast",
  "Full-Stack Developer",
  "DAE CIT Student",
  "Network Security Learner",
];

const RADAR_DATA = [
  { area: "Frontend", value: 73 },
  { area: "Backend", value: 65 },
  { area: "Databases", value: 67 },
  { area: "Networking", value: 65 },
  { area: "Security", value: 60 },
  { area: "Programming", value: 67 },
];

const SKILLS = [
  { name: "HTML & CSS", level: 85 },
  { name: "JavaScript", level: 70 },
  { name: "React", level: 70 },
  { name: "Angular", level: 60 },
  { name: "Node.js & Express", level: 65 },
  { name: "MongoDB", level: 65 },
  { name: "C / C++", level: 75 },
  { name: "Python", level: 70 },
  { name: "Dart", level: 55 },
  { name: "Networking & OS", level: 65 },
];

const VALUES = [
  { icon: Zap, title: "Fast Learner", desc: "Picked up 10+ technologies across two years of coursework and self-practice." },
  { icon: ShieldCheck, title: "Security-Minded", desc: "Every project is approached with a security-first, detail-oriented mindset." },
  { icon: Rocket, title: "Ships Real Work", desc: "From to-do apps to a full threat-detection platform — I build and finish." },
];

const PROJECTS = [
  {
    title: "Personal Portfolio",
    tag: "PROJECT_01",
    desc: "A responsive personal website built with HTML, CSS and JavaScript to showcase skills and work.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "To-Do List App",
    tag: "PROJECT_02",
    desc: "A task manager to add, complete and delete tasks, using vanilla JavaScript and local state.",
    stack: ["JavaScript", "DOM"],
  },
  {
    title: "Quiz App",
    tag: "PROJECT_03",
    desc: "An interactive quiz app with score tracking, built with JavaScript logic and dynamic DOM updates.",
    stack: ["JavaScript", "HTML", "CSS"],
  },
];

const EDUCATION = [
  {
    year: "2022 – 2024",
    title: "Matriculation (SSC) — Science",
    place: "Govt. High School 42-43 TDA, Bhakkar",
    desc: "Completed secondary education with a Science focus, building the foundation for technical study.",
  },
  {
    year: "2024 – 2027",
    title: "DAE — Computer Information Technology",
    place: "GCT, Bhakkar",
    desc: "Three-year Diploma of Associate Engineering covering programming, networking, databases and operating systems.",
  },
];

function useTypewriter(words, speed = 55, pause = 1400) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), speed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), speed / 2);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, speed, pause]);
  return text;
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return value;
}

function useOnScreen(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

function Reveal({ children, className = "", dir = "up" }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const hidden = dir === "left" ? "-translate-x-8" : dir === "right" ? "translate-x-8" : "translate-y-6";
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${hidden}`} ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({ label, target, suffix = "", c }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref);
  const val = useCountUp(target, visible);
  return (
    <div ref={ref} className={`rounded-2xl border p-4 text-center ${c.panel}`}>
      <div className={`bg-clip-text text-2xl font-bold text-transparent ${c.gradText}`}>{val}{suffix}</div>
      <div className={`mt-1 text-[11px] uppercase tracking-wider ${c.mute}`}>{label}</div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrollPct, setScrollPct] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const typed = useTypewriter(ROLES);

  const c = dark
    ? {
        page: "bg-slate-950",
        panel: "bg-slate-900/60 border-slate-800",
        panelSolid: "bg-slate-900 border-slate-800",
        text: "text-slate-50",
        sub: "text-slate-300",
        mute: "text-slate-500",
        border: "border-slate-800",
        sidebar: "bg-slate-950/95 border-slate-800",
        inputBg: "bg-slate-950 border-slate-700 text-slate-50",
        chip: "bg-slate-900 border-slate-700 text-slate-300",
        gradText: "bg-gradient-to-r from-indigo-400 via-blue-400 to-amber-300",
        accentBtn: "bg-gradient-to-r from-indigo-500 to-blue-500",
        ring: "shadow-indigo-500/20",
      }
    : {
        page: "bg-slate-50",
        panel: "bg-white border-slate-200",
        panelSolid: "bg-white border-slate-200",
        text: "text-slate-900",
        sub: "text-slate-600",
        mute: "text-slate-400",
        border: "border-slate-200",
        sidebar: "bg-white/95 border-slate-200",
        inputBg: "bg-white border-slate-300 text-slate-900",
        chip: "bg-slate-100 border-slate-200 text-slate-600",
        gradText: "bg-gradient-to-r from-indigo-600 via-blue-600 to-amber-500",
        accentBtn: "bg-gradient-to-r from-indigo-600 to-blue-600",
        ring: "shadow-indigo-500/10",
      };

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));

    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(isNaN(pct) ? 0 : pct);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Write a short message";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <div className={`min-h-screen font-sans ${c.page} ${c.text} transition-colors duration-500 lg:flex`}>
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        .caret { animation: blink 1s step-end infinite; }
        @keyframes floaty { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .floaty { animation: floaty 6s ease-in-out infinite; }
        @keyframes glow { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
        .glow { animation: glow 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .caret, .floaty, .glow { animation: none !important; } }
      `}</style>

      {/* SCROLL PROGRESS */}
      <div className="fixed left-0 top-0 z-[60] h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-amber-400" style={{ width: `${scrollPct}%` }} />

      {/* MOBILE TOP BAR */}
      <div className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-5 py-3 backdrop-blur lg:hidden ${c.sidebar}`}>
        <button onClick={() => scrollTo("home")} className="font-bold">
          jawad<span className={`bg-clip-text text-transparent ${c.gradText}`}>.irfan</span>
        </button>
        <div className="flex items-center gap-2">
          <button onClick={() => setDark((v) => !v)} className={`flex h-9 w-9 items-center justify-center rounded-full border ${c.chip}`} aria-label="Toggle theme">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className={`fixed inset-x-0 top-14 z-40 border-b lg:hidden ${c.panelSolid}`}>
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollTo(n.id)} className={`block w-full border-b px-6 py-3 text-left text-sm ${c.border} ${c.sub}`}>
              {n.label}
            </button>
          ))}
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className={`fixed left-0 top-0 hidden h-screen w-64 flex-col justify-between border-r p-8 lg:flex ${c.sidebar}`}>
        <div>
          <button onClick={() => scrollTo("home")} className="text-lg font-bold">
            jawad<span className={`bg-clip-text text-transparent ${c.gradText}`}>.irfan</span>
          </button>
          <nav className="mt-12 space-y-1">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active === n.id ? `${c.accentBtn} text-white shadow-lg ${c.ring}` : `${c.sub}`
                }`}
              >
                <n.icon size={16} /> {n.label}
              </button>
            ))}
          </nav>
        </div>
        <div>
          <button onClick={() => setDark((v) => !v)} className={`mb-4 flex w-full items-center justify-center gap-2 rounded-xl border py-2.5 text-sm ${c.chip}`}>
            {dark ? <Sun size={15} /> : <Moon size={15} />} {dark ? "Light mode" : "Dark mode"}
          </button>
          <div className="flex justify-center gap-4">
            <a href="mailto:jawadirfan.arain@gmail.com" className={`${c.mute} hover:text-indigo-400`}><Mail size={17} /></a>
            <a href="https://github.com/jawad-irfan" target="_blank" rel="noopener noreferrer" className={`${c.mute} hover:text-indigo-400`}><Github size={17} /></a>
            <a href="https://wa.me/923430611314" target="_blank" rel="noopener noreferrer" className={`${c.mute} hover:text-indigo-400`}><MessageCircle size={17} /></a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="w-full pt-16 lg:ml-64 lg:pt-0">
        {/* HERO */}
        <section id="home" className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-20 sm:px-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
          <Reveal className="relative">
            <div className={`glow mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${c.chip}`}>
              <Sparkles size={13} className="text-amber-400" /> Available for internship
            </div>
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl">
              Muhammad<br />
              <span className={`bg-clip-text text-transparent ${c.gradText}`}>Jawad Irfan</span>
            </h1>
            <div className={`mt-5 h-7 text-lg font-medium ${c.sub}`}>{typed}<span className="caret">|</span></div>
            <p className={`mt-6 max-w-lg ${c.sub}`}>
              DAE Computer Information Technology student building secure,
              production-quality software — currently leading a final year
              project on AI-assisted threat detection.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button onClick={() => scrollTo("project")} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl ${c.accentBtn} ${c.ring}`}>
                See flagship project <ChevronRight size={16} />
              </button>
              <button onClick={() => scrollTo("contact")} className={`rounded-full border px-6 py-3 text-sm font-medium ${c.chip}`}>
                Hire / Contact Me
              </button>
            </div>
          </Reveal>
          <Reveal className="relative mt-16 grid max-w-xl grid-cols-4 gap-4">
            <StatCard label="Projects Built" target={4} suffix="+" c={c} />
            <StatCard label="Tech Skills" target={14} suffix="+" c={c} />
            <StatCard label="Years in Tech" target={3} suffix="+" c={c} />
            <StatCard label="Final Year Proj." target={1} c={c} />
          </Reveal>
        </section>

        {/* VALUE PROPS */}
        <section className="px-6 pb-4 sm:px-12">
          <div className="grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <Reveal key={v.title} className={`rounded-2xl border p-6 ${c.panel}`}>
                <v.icon className="text-amber-400" size={26} />
                <h3 className="mt-3 font-semibold">{v.title}</h3>
                <p className={`mt-1 text-sm ${c.sub}`}>{v.desc}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="grid gap-10 px-6 py-24 sm:px-12 md:grid-cols-2 md:items-center">
          <Reveal dir="left">
            <div className={`floaty relative mx-auto flex h-56 w-56 items-center justify-center rounded-[2.5rem] border ${c.panel}`}>
              <div className={`absolute inset-0 rounded-[2.5rem] ${c.accentBtn} opacity-10`} />
              <ShieldCheck size={72} className="text-indigo-400" />
            </div>
          </Reveal>
          <Reveal dir="right">
            <span className={`text-xs font-semibold uppercase tracking-widest text-indigo-400`}>About Me</span>
            <h2 className="mt-2 text-3xl font-bold">A little about my journey</h2>
            <p className={`mt-4 ${c.sub}`}>
              I'm a Diploma of Associate Engineering student majoring in{" "}
              <strong className={c.text}>Computer Information Technology</strong> in
              Pakistan. I'm genuinely curious about how technology works —
              from writing clean code to understanding how networks and
              systems talk to each other.
            </p>
            <p className={`mt-4 ${c.sub}`}>
              I'm currently seeking an internship to apply my skills in a
              real-world environment, with the long-term goal of growing
              into a cybersecurity-focused developer.
            </p>
            <div className={`mt-6 rounded-2xl border-l-4 border-amber-400 p-4 ${c.panel}`}>
              <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-amber-400">Career Goal</span>
              Build secure, network-aware systems that solve real problems.
            </div>
          </Reveal>
        </section>

        {/* SKILLS */}
        <section id="skills" className="px-6 py-24 sm:px-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Skills</span>
            <h2 className="mt-2 text-3xl font-bold">What I work with</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-5">
            <Reveal dir="left" className={`md:col-span-2 rounded-3xl border p-4 ${c.panel}`}>
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={RADAR_DATA}>
                  <PolarGrid stroke={dark ? "#1e293b" : "#e2e8f0"} />
                  <PolarAngleAxis dataKey="area" tick={{ fill: dark ? "#94a3b8" : "#475569", fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: dark ? "#475569" : "#94a3b8", fontSize: 9 }} />
                  <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </Reveal>
            <Reveal dir="right" className="md:col-span-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SKILLS.map((s) => (
                <div key={s.name} className={`rounded-xl border p-3 ${c.panel}`}>
                  <div className="flex items-center justify-between text-sm font-medium">
                    <span>{s.name}</span>
                    <span className={c.mute}>{s.level}%</span>
                  </div>
                  <div className={`mt-2 h-1.5 overflow-hidden rounded-full ${dark ? "bg-slate-800" : "bg-slate-200"}`}>
                    <div className={`h-full rounded-full ${c.accentBtn} transition-all duration-1000`} style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* FLAGSHIP PROJECT */}
        <section id="project" className="px-6 py-24 sm:px-12">
          <Reveal className="flex items-center gap-2">
            <Award className="text-amber-400" size={20} />
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Final Year Project — CIT-362</span>
          </Reveal>
          <Reveal><h2 className="mt-2 text-3xl font-bold">CyberShield</h2></Reveal>
          <Reveal className={`mt-8 overflow-hidden rounded-3xl border ${c.panel} ${c.ring} shadow-2xl`}>
            <div className="grid gap-0 md:grid-cols-2">
              <div className="p-8">
                <div className={`mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${c.chip}`}>
                  <Target size={14} className="text-amber-400" /> Networking &amp; Security
                </div>
                <p className={c.sub}>
                  An AI-assisted threat detection &amp; auto-response security
                  platform — designed to spot suspicious network activity and
                  react to it automatically, with a hands-on focus on
                  networking fundamentals.
                </p>
                <div className={`mt-4 space-y-2 text-sm ${c.sub}`}>
                  <p><span className={`font-semibold ${c.text}`}>Timeline:</span> 6-month build, targeting completion ahead of the final deadline.</p>
                  <p><span className={`font-semibold ${c.text}`}>Focus:</span> traffic patterns, detection logic and automated response.</p>
                  <p><span className={`font-semibold ${c.text}`}>Goal:</span> a unique, dashboard-driven platform not already common in the market.</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["React", "Node.js", "Express", "MongoDB", "Python", "Networking"].map((t) => (
                    <span key={t} className={`rounded-full border px-3 py-1 text-xs ${c.chip}`}>{t}</span>
                  ))}
                </div>
              </div>
              <div className={`flex items-center justify-center border-t p-8 md:border-l md:border-t-0 ${c.border}`}>
                <div className={`w-full max-w-xs rounded-2xl border p-5 ${c.panelSolid}`}>
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck className="text-indigo-400" size={20} />
                    <span className="text-sm font-semibold">Scan Report</span>
                  </div>
                  <ul className={`space-y-2 text-sm ${c.sub}`}>
                    <li>✓ 214 packets analyzed</li>
                    <li>⚠ 1 anomaly flagged</li>
                    <li>✓ auto-response triggered</li>
                    <li className="font-medium text-amber-500">✓ threat isolated</li>
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* OTHER WORK */}
        <section id="work" className="px-6 py-24 sm:px-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Projects</span>
            <h2 className="mt-2 text-3xl font-bold">Other things I've built</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {PROJECTS.map((p) => (
              <Reveal key={p.title}>
                <div className={`group h-full rounded-3xl border p-6 transition hover:-translate-y-1 hover:shadow-xl ${c.panel}`}>
                  <span className={`text-[10px] font-semibold uppercase tracking-widest ${c.mute}`}>{p.tag}</span>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <p className={`mt-2 text-sm ${c.sub}`}>{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <span key={t} className={`rounded-full border px-3 py-1 text-[11px] ${c.chip}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="px-6 py-24 sm:px-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Education</span>
            <h2 className="mt-2 text-3xl font-bold">Academic timeline</h2>
          </Reveal>
          <div className={`relative mt-10 space-y-8 border-l pl-8 ${c.border}`}>
            {EDUCATION.map((e) => (
              <Reveal key={e.title} className="relative">
                <span className={`absolute -left-[38px] top-1 h-3 w-3 rounded-full border-2 border-indigo-400 ${dark ? "bg-slate-950" : "bg-white"}`} />
                <div className={`rounded-3xl border p-6 ${c.panel}`}>
                  <span className="text-xs font-semibold text-amber-500">{e.year}</span>
                  <div className="mt-1 flex items-center gap-2 text-lg font-semibold">
                    <GraduationCap size={18} className="text-indigo-400" /> {e.title}
                  </div>
                  <div className={`mt-1 text-sm ${c.sub}`}>{e.place}</div>
                  <p className={`mt-2 text-sm ${c.mute}`}>{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-6 py-24 sm:px-12">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">Contact</span>
            <h2 className="mt-2 text-3xl font-bold">Let's build something great</h2>
            <p className={`mt-2 max-w-xl ${c.sub}`}>Open to internships, freelance work and collaborations.</p>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Reveal dir="left" className="space-y-3">
              {[
                { icon: Mail, label: "jawadirfan.arain@gmail.com", href: "mailto:jawadirfan.arain@gmail.com" },
                { icon: Github, label: "github.com/jawad-irfan", href: "https://github.com/jawad-irfan" },
                { icon: MessageCircle, label: "+92 343 0611314", href: "https://wa.me/923430611314" },
              ].map((ct) => (
                <a key={ct.label} href={ct.href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-medium transition hover:translate-x-1 ${c.panel}`}>
                  <ct.icon size={18} className="text-indigo-400" />
                  {ct.label}
                  <ExternalLink size={13} className={`ml-auto ${c.mute}`} />
                </a>
              ))}
            </Reveal>
            <Reveal dir="right">
              <form onSubmit={handleSubmit} className={`space-y-4 rounded-3xl border p-6 ${c.panel}`}>
                <div>
                  <label className={`mb-1 block text-xs font-semibold uppercase tracking-widest ${c.mute}`}>Name</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-indigo-400 ${c.inputBg}`} />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className={`mb-1 block text-xs font-semibold uppercase tracking-widest ${c.mute}`}>Email</label>
                  <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com" className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:border-indigo-400 ${c.inputBg}`} />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <div>
                  <label className={`mb-1 block text-xs font-semibold uppercase tracking-widest ${c.mute}`}>Message</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4} placeholder="Write your message..." className={`w-full resize-none rounded-xl border px-3 py-2 text-sm outline-none focus:border-indigo-400 ${c.inputBg}`} />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                </div>
                <button type="submit" className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-xl ${c.accentBtn} ${c.ring}`}>
                  <Send size={15} /> Send Message
                </button>
                {sent && <p className="text-center text-xs text-indigo-400">Message ready — connect this form to a backend to send it for real.</p>}
              </form>
            </Reveal>
          </div>
        </section>

        <footer className={`border-t py-8 text-center ${c.border}`}>
          <p className={`flex items-center justify-center gap-1 text-xs ${c.mute}`}>
            © {new Date().getFullYear()} Jawad Irfan — made with <Heart size={12} className="text-amber-400" /> · DAE CIT
          </p>
        </footer>
      </main>
    </div>
  );
}
