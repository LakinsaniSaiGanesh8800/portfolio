import { useState, useEffect, useRef, useCallback } from "react";

// THEME & DATA 
const THEME = {
  bg: "#0B1120",
  bgCard: "#111827",
  bgCard2: "#0f1929",
  primary: "#00D9FF",
  secondary: "#38BDF8",
  success: "#22C55E",
  textPrimary: "#E5E7EB",
  muted: "#6B7280",
  border: "rgba(0,217,255,0.15)",
};

const DATA = {
  name: "Lakinsani Sai Ganesh",
  role: "Full Stack Developer",
  roles: ["Full Stack Developer", "MERN Stack Engineer", "AI Enthusiast", "Product Builder"],
  tagline: "Building scalable web applications, AI-powered solutions, and user-centric digital products.",
  about:
    "Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning with strong hands-on experience in MERN Stack development. Passionate about building scalable products, solving real-world problems, integrating AI into applications, and continuously learning modern technologies.",
  location: "Hyderabad, India",
  github: "https://github.com/LakinsaniSaiGanesh8800",
  email: "lakinsanisaiganesh8800@gmail.com",
  linkedin: "#",

  stats: [
    { value: "4+", label: "Major Projects" },
    { value: "10+", label: "Technologies" },
    { value: "1000+", label: "Coding Hours" },
    { value: "∞", label: "GitHub Growth" },
  ],

  traits: ["B.Tech CSE (AI & ML)", "MERN Stack Dev", "AI Enthusiast", "Problem Solver", "Continuous Learner"],

  skills: {
    Frontend: [
      { name: "React.js", icon: "⚛️", level: 90 },
      { name: "Next.js", icon: "▲", level: 75 },
      { name: "JavaScript", icon: "📜", level: 88 },
      { name: "Tailwind CSS", icon: "🎨", level: 85 },
    ],
    Backend: [
      { name: "Node.js", icon: "🟢", level: 85 },
      { name: "Express.js", icon: "🚂", level: 85 },
      { name: "REST APIs", icon: "🔌", level: 90 },
      { name: "JWT Auth", icon: "🔐", level: 82 },
    ],
    Database: [
      { name: "MongoDB", icon: "🍃", level: 82 },
      { name: "SQL", icon: "🗄️", level: 70 },
    ],
    Programming: [
      { name: "Java", icon: "☕", level: 78 },
      { name: "Python", icon: "🐍", level: 75 },
    ],
    Tools: [
      { name: "Git", icon: "🌿", level: 85 },
      { name: "GitHub", icon: "⬡", level: 85 },
      { name: "Postman", icon: "📮", level: 80 },
    ],
  },

  projects: [
    {
      num: "01",
      title: "MindFlow AI",
      tagline: "AI-powered Second Brain platform",
      description:
        "Helps users store, organize, and retrieve knowledge using AI. Built with Groq AI integration for intelligent querying of personal knowledge bases.",
      problem: "Students struggle to organize and retrieve knowledge efficiently.",
      solution: "AI-powered platform for intelligent note storage and natural language retrieval.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Groq AI"],
      features: ["Knowledge Storage", "AI Query Engine", "Authentication", "Category Management"],
      status: "DEPLOYED",
      color: "#00D9FF",
      github: "https://github.com/LakinsaniSaiGanesh8800",
      live:"https://mind-flow-ai-frontend-6ikn.vercel.app",
      metrics: [
        { label: "Stack", value: "MERN + AI" },
        { label: "Auth", value: "JWT" },
        { label: "AI", value: "Groq LLM" },
      ],
    },
    {
      num: "02",
      title: "Real-Time Chat App",
      tagline: "Instant messaging with live presence",
      description:
        "WebSocket-powered chat application with real-time messaging, authentication, and live user presence indicators.",
      problem: "Building reliable real-time communication with persistent message history.",
      solution: "Socket.IO-powered chat with authentication and live user tracking.",
      tech: ["React", "Node.js", "Socket.IO", "MongoDB"],
      features: ["Real-Time Messaging", "Authentication", "Online User Tracking"],
      status: "LIVE",
      color: "#38BDF8",
      github: "https://github.com/LakinsaniSaiGanesh8800",
      live:"https://chat-application-3pqj-mh9ghuky6-lakinsani-sai-ganeshs-projects.vercel.app",
      metrics: [
        { label: "Protocol", value: "WebSocket" },
        { label: "Latency", value: "<50ms" },
        { label: "DB", value: "MongoDB" },
      ],
    },
    {
      num: "03",
      title: "Restaurant Reservation",
      tagline: "End-to-end booking workflow",
      description:
        "Full-stack platform with real-time table availability, customer-facing booking, and admin reservation management.",
      problem: "Manual reservations cause double bookings and poor customer experience.",
      solution: "Full-stack booking platform with availability management and confirmations.",
      tech: ["React", "Node.js", "Express", "MongoDB"],
      features: ["Table Reservation", "Booking Management", "Customer Workflow"],
      status: "DEPLOYED",
      color: "#22C55E",
      github: "https://github.com/LakinsaniSaiGanesh8800",
      metrics: [
        { label: "Stack", value: "MERN" },
        { label: "UX", value: "Customer-first" },
        { label: "Type", value: "Full Stack" },
      ],
    },
    {
      num: "04",
      title: "Stock Price Prediction",
      tagline: "ML-powered forecasting system",
      description:
        "ARIMA-based stock prediction system with interactive data visualization and confidence intervals for trend analysis.",
      problem: "Investors need accessible, interpretable short-term stock trend analysis tools.",
      solution: "Python-powered ARIMA prediction with Flask API and interactive visualizations.",
      tech: ["Python", "Flask", "ARIMA", "Machine Learning", "Pandas", "Matplotlib"],
      features: ["Prediction Models", "Forecasting", "Data Visualization"],
      status: "RESEARCH",
      color: "#A78BFA",
      github: "https://github.com/LakinsaniSaiGanesh8800",
      metrics: [
        { label: "Model", value: "ARIMA" },
        { label: "Stack", value: "Python+Flask" },
        { label: "Domain", value: "ML/Finance" },
      ],
    },
  ],

  journey: [
    { icon: "🌱", year: "2023", title: "Started Programming", desc: "First lines of code in C and Java. Discovered the joy of problem solving." },
    { icon: "☕", year: "2023", title: "Learned Java & Python", desc: "Strengthened DSA foundations. Explored Python for scripting and automation." },
    { icon: "⚛️", year: "2024", title: "Learned MERN Stack", desc: "Dived into MongoDB, Express, React, and Node.js. Built my first full stack apps." },
    { icon: "💬", year: "2024", title: "Built Chat Application", desc: "First production-grade real-time app with Socket.IO and JWT authentication." },
    { icon: "🍽️", year: "2025", title: "Restaurant Reservation System", desc: "End-to-end booking platform — complete full-stack product lifecycle." },
    { icon: "🧠", year: "2025", title: "Built MindFlow AI", desc: "Integrated Groq AI into a MERN platform. First AI-powered SaaS product." },
    { icon: "🚀", year: "2026", title: "Targeting Product Companies", desc: "Preparing for tier-1 companies. DSA + System Design + open source." },
  ],

  startupCards: [
    { icon: "⚡", title: "Fast Learning", desc: "New stack, new domain — I ship within days. Learning velocity is my core advantage." },
    { icon: "🎯", title: "Ownership", desc: "I treat every feature like I own the product. No hand-holding required." },
    { icon: "🔍", title: "Problem Solving", desc: "I dig to root causes, not just symptoms. Architecture decisions matter." },
    { icon: "🔄", title: "Adaptability", desc: "Pivot? No problem. I thrive in changing requirements and evolving priorities." },
    { icon: "📦", title: "Product Thinking", desc: "I think in user outcomes, not just tickets. Every line serves a purpose." },
    { icon: "📈", title: "Growth Mindset", desc: "Daily practice, side projects, open source — compounding at 1% per day." },
  ],

  aiReport: [
    { label: "Frontend Development", value: 90 },
    { label: "Backend Development", value: 85 },
    { label: "Database Design", value: 80 },
    { label: "API Development", value: 90 },
    { label: "Problem Solving", value: 85 },
    { label: "Communication", value: 75 },
    { label: "Learning Ability", value: 95 },
  ],
};

// HOOKS 
function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function useTypewriter(strings, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.substring(0, display.length + 1));
        if (display.length + 1 === current.length) setTimeout(() => setDeleting(true), pause);
      } else {
        setDisplay(current.substring(0, display.length - 1));
        if (display.length === 0) { setDeleting(false); setIdx((idx + 1) % strings.length); }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [display, deleting, idx, strings, speed, pause]);
  return display;
}

// PARTICLE CANVAS 
function ParticleCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    class P {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W; this.y = Math.random() * H;
        this.size = Math.random() * 1.4 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.28; this.vy = (Math.random() - 0.5) * 0.28;
        this.op = Math.random() * 0.5 + 0.1; this.ph = Math.random() * Math.PI * 2;
      }
      update() {
        this.x += this.vx; this.y += this.vy; this.ph += 0.018;
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
      }
      draw() {
        ctx.save(); ctx.globalAlpha = this.op * (0.7 + 0.3 * Math.sin(this.ph));
        ctx.fillStyle = "#00D9FF"; ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore();
      }
    }
    for (let i = 0; i < 110; i++) particles.push(new P());
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (d < 95) {
            ctx.save(); ctx.globalAlpha = (1 - d / 95) * 0.1; ctx.strokeStyle = "#00D9FF";
            ctx.lineWidth = 0.5; ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke(); ctx.restore();
          }
        }
        particles[i].update(); particles[i].draw();
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none", opacity: 0.45 }} />;
}

// MAGNETIC CURSOR 
function MagneticCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    const raf = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 18}px, ${pos.current.y - 18}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 3}px, ${target.current.y - 3}px)`;
      }
      requestAnimationFrame(raf);
    };
    window.addEventListener("mousemove", move);
    const id = requestAnimationFrame(raf);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(id); };
  }, []);
  return (
    <>
      <div ref={cursorRef} style={{ position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(0,217,255,0.5)", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, top: 0, left: 0, transition: "border-color 0.2s" }} />
      <div ref={dotRef} style={{ position: "fixed", width: 6, height: 6, background: "#00D9FF", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, top: 0, left: 0 }} />
    </>
  );
}

// NAV 
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["About", "Skills", "Projects", "Journey", "Contact"];
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(11,17,32,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${THEME.border}` : "1px solid transparent",
      padding: "0 5%", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.3s"
    }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", color: THEME.primary, fontWeight: 700, fontSize: "0.9rem", letterSpacing: 2 }}>&lt;LSG/&gt;</span>
      <ul style={{ display: "flex", gap: 28, listStyle: "none", margin: 0, padding: 0 }}>
        {links.map(l => (
          <li key={l} style={{ display: window.innerWidth < 768 ? "none" : "block" }}>
            <a href={`#${l.toLowerCase()}`} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: THEME.muted, textDecoration: "none", letterSpacing: 1, textTransform: "uppercase", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = THEME.primary}
              onMouseLeave={e => e.target.style.color = THEME.muted}>{l}</a>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: THEME.success }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: THEME.success, display: "inline-block", animation: "devos-pulse 2s infinite" }} />
        AVAILABLE
      </div>
    </nav>
  );
}

// TERMINAL HERO 
function Terminal() {
  const lines = [
    { delay: 400, content: <><span style={{ color: THEME.primary }}>$</span> <span style={{ color: "#f8fafc" }}>npm run devos:init</span></> },
    { delay: 1000, content: <span style={{ color: THEME.secondary }}>▶ Booting Developer OS...</span> },
    { delay: 1600, content: <><span style={{ color: THEME.success }}>✔</span> MERN Stack loaded</> },
    { delay: 2000, content: <><span style={{ color: THEME.success }}>✔</span> AI modules active</> },
    { delay: 2400, content: <><span style={{ color: THEME.success }}>✔</span> Problem solver ready</> },
    { delay: 2800, content: <><span style={{ color: THEME.success }}>✔</span> Product mindset online</> },
    { delay: 3200, content: <><span style={{ color: THEME.success }}>✔</span> Continuous learning enabled</> },
    { delay: 3700, content: "" },
    { delay: 3800, content: <><span style={{ color: THEME.primary }}>$</span> <span style={{ color: "#f8fafc" }}>npm run build-future</span></> },
    { delay: 4400, content: <span style={{ color: THEME.secondary }}>▶ Focus: MERN + AI Applications</span> },
    { delay: 4900, content: <span style={{ color: THEME.secondary }}>▶ Status: Available for Opportunities</span> },
    { delay: 5400, content: <><span style={{ color: THEME.success }}>✔</span> System ready <span style={{ display: "inline-block", width: 8, height: 14, background: THEME.primary, verticalAlign: "middle", marginLeft: 2, animation: "devos-blink 1s step-end infinite" }} /></> },
  ];
  const [shown, setShown] = useState([]);
  useEffect(() => {
    lines.forEach(({ delay }, i) => {
      setTimeout(() => setShown(p => [...p, i]), delay);
    });
  }, []);
  return (
    <div style={{ background: THEME.bgCard, border: `1px solid ${THEME.border}`, borderRadius: 12, overflow: "hidden", boxShadow: `0 0 30px rgba(0,217,255,0.2), 0 40px 80px rgba(0,0,0,0.5)` }}>
      <div style={{ background: "#1f2937", padding: "10px 16px", display: "flex", alignItems: "center", gap: 8 }}>
        {["#ef4444", "#f59e0b", "#22c55e"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
        <span style={{ flex: 1, textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem", color: THEME.muted }}>devos — terminal v2.0</span>
      </div>
      <div style={{ padding: "20px 24px", minHeight: 300, fontFamily: "'JetBrains Mono',monospace", fontSize: "0.8rem", lineHeight: 1.9, color: "#94a3b8" }}>
        {lines.map((line, i) => shown.includes(i) && (
          <div key={i} style={{ opacity: 1, transform: "translateX(0)", transition: "all 0.3s", marginBottom: line.content === "" ? 8 : 0 }}>
            {line.content || <br />}
          </div>
        ))}
      </div>
    </div>
  );
}

// SECTION WRAPPER 
function Section({ id, children, style = {} }) {
  return (
    <section id={id} style={{ position: "relative", zIndex: 1, padding: "100px 5%", ...style }}>
      {children}
    </section>
  );
}

// REVEAL WRAPPER 
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: `opacity 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1), transform 0.7s ${delay}s cubic-bezier(0.22,1,0.36,1)`, ...style }}>
      {children}
    </div>
  );
}

// SECTION HEADER 
function SectionHeader({ eyebrow, title, sub }) {
  return (
    <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem", color: THEME.primary, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>{eyebrow}</div>
      <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 800, background: `linear-gradient(135deg, #f8fafc, ${THEME.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", margin: 0 }}>{title}</h2>
      {sub && <p style={{ fontSize: "0.95rem", color: THEME.muted, marginTop: 12 }}>{sub}</p>}
    </Reveal>
  );
}

// GLASS CARD 
function GlassCard({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: "rgba(17,24,39,0.8)", backdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? "rgba(0,217,255,0.4)" : THEME.border}`,
        borderRadius: 16, padding: 28,
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 0 24px rgba(0,217,255,0.25), 0 20px 40px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s",
        ...style
      }}
    >{children}</div>
  );
}

//  HERO SECTION 
function HeroSection() {
  const typed = useTypewriter(DATA.roles);
  return (
    <Section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 60, alignItems: "center" }}>
        {/* Left */}
        <Reveal>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: THEME.primary, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 30, height: 1, background: THEME.primary, display: "inline-block" }} />
            SYSTEM STATUS: 🟢ONLINE
          </div>
          <h1 style={{ fontSize: "clamp(2rem,4.5vw,3.8rem)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 12px", background: `linear-gradient(135deg, #f8fafc 0%, ${THEME.primary} 60%, ${THEME.secondary} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {DATA.name.split(" ")[0]}<br />{DATA.name.split(" ").slice(1).join(" ")}
          </h1>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1rem", color: THEME.secondary, marginBottom: 20, height: 28 }}>
            &gt; {typed}<span style={{ animation: "devos-blink 1s step-end infinite", display: "inline-block", width: 8, height: 16, background: THEME.secondary, verticalAlign: "middle", marginLeft: 2 }} />
          </div>
          <p style={{ fontSize: "0.95rem", color: THEME.muted, maxWidth: 440, marginBottom: 32, lineHeight: 1.75 }}>{DATA.tagline}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
            {["✔ MERN Stack", "✔ AI Solutions", "✔ Product Dev", "✔ Problem Solving", "✔ Continuous Learner"].map(b => (
              <span key={b} style={{ padding: "6px 14px", background: "rgba(0,217,255,0.07)", border: `1px solid ${THEME.border}`, borderRadius: 100, fontSize: "0.72rem", fontFamily: "'JetBrains Mono',monospace", color: THEME.secondary }}>{b}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a href="#projects" style={{ padding: "12px 28px", background: THEME.primary, color: "#0B1120", borderRadius: 8, fontWeight: 700, fontSize: "0.85rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#00b8d9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = THEME.primary; e.currentTarget.style.transform = "translateY(0)"; }}>
              ⚡ View Projects
            </a>
            <a href="#contact" style={{ padding: "12px 28px", background: "transparent", color: THEME.textPrimary, border: `1px solid ${THEME.border}`, borderRadius: 8, fontSize: "0.85rem", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.primary; e.currentTarget.style.color = THEME.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = THEME.border; e.currentTarget.style.color = THEME.textPrimary; e.currentTarget.style.transform = "translateY(0)"; }}>
              📬 Contact Me
            </a>
            <a href={DATA.github} target="_blank" rel="noopener noreferrer" style={{ padding: "12px 28px", background: "transparent", color: THEME.textPrimary, border: `1px solid ${THEME.border}`, borderRadius: 8, fontSize: "0.85rem", textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.primary; e.currentTarget.style.color = THEME.primary; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = THEME.border; e.currentTarget.style.color = THEME.textPrimary; e.currentTarget.style.transform = "translateY(0)"; }}>
              ⬡ GitHub
            </a>
          </div>
        </Reveal>
        {/* Right: Terminal */}
        <Reveal delay={0.2}><Terminal /></Reveal>
      </div>
    </Section>
  );
}

// ABOUT SECTION 
function AboutSection() {
  const statsRef = useRef(null);
  const statsVisible = useIntersection(statsRef);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = [4, 10, 1000, 99];
    targets.forEach((t, i) => {
      let cur = 0;
      const step = Math.ceil(t / 60);
      const iv = setInterval(() => {
        cur = Math.min(cur + step, t);
        setCounts(p => { const n = [...p]; n[i] = cur; return n; });
        if (cur >= t) clearInterval(iv);
      }, 20);
    });
  }, [statsVisible]);

  return (
    <Section id="about">
      <SectionHeader title="The Engineer Behind The Code" sub="CS Engineering · AI/ML Specialization · Full Stack Practitioner" />
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 50, alignItems: "start" }}>
        <Reveal>
          
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "LOCATION", val: "📍 Hyderabad, India" },
              { label: "STATUS", val: "● Actively Seeking", valColor: THEME.success },
              { label: "FOCUS", val: "MERN + AI", valColor: THEME.secondary },
              { label: "EDUCATION", val: "B.Tech CSE (AI & ML)" },
              { label: "CGPA", val: "8.9 / 10", valColor: THEME.primary },
              { label: "PROJECTS", val: "4+ Completed", valColor: THEME.success },
              { label: "TECH STACK", val: "React • Node • MongoDB" },
            ].map(i => (
              <GlassCard key={i.label} style={{ padding: "13px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 12 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", color: THEME.muted }}>{i.label}</span>
                <span style={{ fontSize: "0.82rem", color: i.valColor || THEME.textPrimary }}>{i.val}</span>
              </GlassCard>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.8rem", color: THEME.primary, marginBottom: 8 }}>&gt; B.Tech CSE (AI & ML)</div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 700, margin: "0 0 8px" }}>Full Stack Developer & AI Enthusiast</h3>
          <p style={{ color: THEME.muted, fontSize: "0.95rem", marginBottom: 24, lineHeight: 1.8 }}>{DATA.about}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
            {DATA.traits.map(t => (
              <span key={t} style={{ padding: "7px 16px", background: "rgba(0,217,255,0.06)", border: `1px solid ${THEME.border}`, borderRadius: 8, fontSize: "0.78rem", color: THEME.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
            ))}
          </div>
          <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {DATA.stats.map((s, i) => (
              <div key={s.label} style={{ background: "rgba(0,217,255,0.05)", border: `1px solid ${THEME.border}`, borderRadius: 12, padding: "18px 12px", textAlign: "center" }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "1.6rem", fontWeight: 800, color: THEME.primary, display: "block" }}>
                  {s.value.includes("+") ? (statsVisible ? counts[i] + "+" : "0+") : s.value.includes("∞") ? "∞" : s.value}
                </span>
                <div style={{ fontSize: "0.68rem", color: THEME.muted, marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

// SKILLS SECTION
function SkillsSection() {
  const [hovered, setHovered] = useState(null);
  return (
    <Section id="skills">
      <SectionHeader title="Skill Galaxy" sub="Hover to explore depth and context across every technology" />
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {Object.entries(DATA.skills).map(([cat, items], ci) => (
          <Reveal key={cat} delay={ci * 0.07} style={{ marginBottom: 36 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: THEME.muted, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>{cat}</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {items.map(s => {
                const key = `${cat}-${s.name}`;
                const isHov = hovered === key;
                return (
                  <div key={s.name} onMouseEnter={() => setHovered(key)} onMouseLeave={() => setHovered(null)}
                    style={{ background: isHov ? "rgba(0,217,255,0.1)" : THEME.bgCard, border: `1px solid ${isHov ? "rgba(0,217,255,0.5)" : THEME.border}`, borderRadius: 12, padding: "16px 20px", cursor: "default", transition: "all 0.25s", transform: isHov ? "translateY(-4px)" : "none", boxShadow: isHov ? "0 0 20px rgba(0,217,255,0.2)" : "none", minWidth: 120 }}>
                    <div style={{ fontSize: "1.6rem", marginBottom: 6 }}>{s.icon}</div>
                    <div style={{ fontSize: "0.78rem", fontFamily: "'JetBrains Mono',monospace", color: THEME.textPrimary, fontWeight: 500 }}>{s.name}</div>
                    {isHov && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: s.level + "%", background: `linear-gradient(to right, ${THEME.primary}, ${THEME.secondary})`, borderRadius: 2, transition: "width 0.5s" }} />
                        </div>
                        <div style={{ fontSize: "0.62rem", color: THEME.primary, marginTop: 4, fontFamily: "'JetBrains Mono',monospace" }}>{s.level}%</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

//PROJECT CARD 
function ProjectCard({ project, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background: THEME.bgCard, border: `1px solid ${hov ? "rgba(0,217,255,0.45)" : THEME.border}`, borderRadius: 16, overflow: "hidden", transition: "all 0.3s", transform: hov ? "translateY(-6px)" : "none", boxShadow: hov ? `0 20px 60px rgba(0,0,0,0.4), 0 0 24px rgba(0,217,255,0.2)` : "none" }}>
        {/* Header */}
        <div style={{ padding: "24px 28px 20px", borderBottom: `1px solid ${THEME.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: project.color, letterSpacing: 2, marginBottom: 6 }}>PROJECT_{project.num}</div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 6px" }}>{project.title}</h3>
            <p style={{ fontSize: "0.83rem", color: THEME.muted, margin: 0 }}>{project.tagline}</p>
          </div>
          <span style={{ padding: "4px 12px", background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: 100, fontSize: "0.63rem", color: THEME.success, fontFamily: "'JetBrains Mono',monospace", whiteSpace: "nowrap" }}>{project.status}</span>
        </div>
        {/* Body */}
        <div style={{ padding: "22px 28px" }}>
          {/* Problem/Solution */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            {[{ label: "PROBLEM", text: project.problem }, { label: "SOLUTION", text: project.solution }].map(ps => (
              <div key={ps.label} style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: THEME.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>{ps.label}</div>
                <p style={{ fontSize: "0.8rem", color: "#d1d5db", lineHeight: 1.5, margin: 0 }}>{ps.text}</p>
              </div>
            ))}
          </div>
          {/* Tech */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
            {project.tech.map(t => (
              <span key={t} style={{ padding: "3px 10px", background: "rgba(56,189,248,0.07)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 6, fontSize: "0.68rem", color: THEME.secondary, fontFamily: "'JetBrains Mono',monospace" }}>{t}</span>
            ))}
          </div>
          {/* Features */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            {project.features.map(f => (
              <span key={f} style={{ fontSize: "0.75rem", color: THEME.textPrimary, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ color: project.color, fontSize: "0.6rem" }}>▸</span>{f}
              </span>
            ))}
          </div>
          {/* Metrics */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            {project.metrics.map(m => (
              <div key={m.label} style={{ flex: 1, background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "10px", textAlign: "center", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize: "0.68rem", color: THEME.muted, fontFamily: "'JetBrains Mono',monospace", marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: "0.78rem", fontWeight: 600, color: project.color }}>{m.value}</div>
              </div>
            ))}
          </div>
          {/* Links */}
          <div style={{ display: "flex", gap: 12 }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              style={{ padding: "9px 20px", background: THEME.primary, color: "#0B1120", borderRadius: 8, fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", transition: "all 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#00b8d9"}
              onMouseLeave={e => e.currentTarget.style.background = THEME.primary}>
              ⬡ GitHub
            </a>
            <a
              href={project.live || "#"}
              target={project.live ? "_blank" : "_self"}
              rel="noopener noreferrer"
              style={{
                padding: "9px 20px",
                background: "transparent",
                border: `1px solid ${THEME.border}`,
                color: project.live ? THEME.textPrimary : THEME.muted,
                borderRadius: 8,
                fontSize: "0.78rem",
                textDecoration: "none",
                opacity: project.live ? 1 : 0.5,
                pointerEvents: project.live ? "auto" : "none",
                cursor: project.live ? "pointer" : "not-allowed"
  }}
>
  {project.live ? "↗ Live Demo" : "🚧 Coming Soon"}
</a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeader title="Engineering Projects" sub="Real problems · Real solutions · Real code" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(480px,1fr))", gap: 28, maxWidth: 1200, margin: "0 auto" }}>
        {DATA.projects.map((p, i) => <ProjectCard key={p.num} project={p} delay={i * 0.08} />)}
      </div>
    </Section>
  );
}

//JOURNEY SECTION 
function JourneySection() {
  return (
    <Section id="journey">
      <SectionHeader title="Engineering Journey" sub="From first compile to production deployments" />
      <div style={{ maxWidth: 680, margin: "0 auto", position: "relative" }}>
        <div style={{ position: "absolute", left: 29, top: 0, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${THEME.primary}, ${THEME.secondary}, transparent)` }} />
        {DATA.journey.map((j, i) => (
          <Reveal key={j.title} delay={i * 0.09} style={{ display: "flex", gap: 24, marginBottom: 34, alignItems: "flex-start" }}>
            <div style={{ width: 60, minWidth: 60, height: 60, borderRadius: "50%", background: THEME.bgCard, border: `2px solid ${THEME.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", position: "relative", zIndex: 1, flexShrink: 0, transition: "all 0.3s" }}>
              {j.icon}
            </div>
            <GlassCard style={{ flex: 1, padding: "18px 22px", borderRadius: 12 }}>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.63rem", color: THEME.primary, letterSpacing: 2, marginBottom: 4 }}>{j.year}</div>
              <div style={{ fontSize: "0.98rem", fontWeight: 600, marginBottom: 4 }}>{j.title}</div>
              <div style={{ fontSize: "0.81rem", color: THEME.muted }}>{j.desc}</div>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

//STARTUP SECTION 
function StartupSection() {
  return (
    <Section id="startup">
      <SectionHeader title="Why Startups?" sub="Built for high-velocity teams that move fast and ship with quality" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 20, maxWidth: 1000, margin: "0 auto" }}>
        {DATA.startupCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.07}>
            <GlassCard>
              <div style={{ fontSize: "2rem", marginBottom: 14 }}>{c.icon}</div>
              <div style={{ fontSize: "0.98rem", fontWeight: 700, marginBottom: 8 }}>{c.title}</div>
              <p style={{ fontSize: "0.82rem", color: THEME.muted, lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// AI REPORT SECTION 
function AnimatedBar({ value, visible }) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: visible ? value + "%" : "0%", background: `linear-gradient(to right, ${THEME.primary}, ${THEME.secondary})`, borderRadius: 3, transition: "width 1.5s cubic-bezier(0.22,1,0.36,1)" }} />
    </div>
  );
}

function AIReportSection() {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  const avg = Math.round(DATA.aiReport.reduce((a, m) => a + m.value, 0) / DATA.aiReport.length);
  return (
    <Section id="report">
      <SectionHeader title="Developer Analytics" sub="Capability assessment across core engineering dimensions" />
      <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 30, maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <GlassCard hover={false}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: THEME.primary, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>// CAPABILITY_METRICS.log</div>
            {DATA.aiReport.map(m => (
              <div key={m.label} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 7 }}>
                  <span>{m.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", color: THEME.primary }}>{m.value}%</span>
                </div>
                <AnimatedBar value={m.value} visible={visible} />
              </div>
            ))}
          </GlassCard>
        </Reveal>
        <Reveal delay={0.15}>
          <GlassCard hover={false}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: THEME.primary, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>// INTELLIGENCE_SUMMARY</div>
            <div style={{ textAlign: "center", padding: "24px 0 28px" }}>
              <div style={{ width: 110, height: 110, borderRadius: "50%", background: `conic-gradient(${THEME.primary} ${avg}%, rgba(255,255,255,0.06) 0)`, margin: "0 auto 16px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "absolute", inset: 8, borderRadius: "50%", background: THEME.bgCard }} />
                <span style={{ position: "relative", zIndex: 1, fontFamily: "'JetBrains Mono',monospace", fontSize: "1.5rem", fontWeight: 800, color: THEME.primary }}>{avg}</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: 4 }}>Overall Score</div>
              <div style={{ fontSize: "0.78rem", color: THEME.muted }}>Full Stack Readiness Index</div>
            </div>
            {[
              { label: "STRONGEST SKILL", val: "Learning Ability — 95%", color: THEME.success },
              { label: "CORE STRENGTH", val: "API + Frontend — 90%", color: THEME.primary },
              { label: "GROWTH AREA", val: "Communication", color: THEME.secondary },
              { label: "PROFILE TYPE", val: "Product Engineer", color: "#A78BFA" },
            ].map(s => (
              <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, padding: "10px 14px", background: "rgba(0,0,0,0.25)", borderRadius: 8 }}>
                <span style={{ fontSize: "0.68rem", color: THEME.muted, fontFamily: "'JetBrains Mono',monospace" }}>{s.label}</span>
                <span style={{ fontSize: "0.78rem", fontWeight: 600, color: s.color }}>{s.val}</span>
              </div>
            ))}
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

// CONTACT SECTION 
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

  return (
    <Section id="contact">
      <SectionHeader title="Command Center" sub="> Ready to build something amazing together?" />
      <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 40 }}>
        <Reveal>
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 20 }}>Get In Touch</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📧", label: "EMAIL", value: DATA.email, href: `mailto:${DATA.email}` },
              { icon: "⬡", label: "GITHUB", value: "LakinsaniSaiGanesh8800", href: DATA.github },
              { icon: "🔗", label: "LINKEDIN", value: "Lakinsani Sai Ganesh", href: DATA.linkedin },
              { icon: "📍", label: "LOCATION", value: DATA.location, href: null },
            ].map(c => (
              <a key={c.label} href={c.href || undefined} target={c.href && !c.href.startsWith("mailto") ? "_blank" : undefined} rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 14, background: THEME.bgCard, border: `1px solid ${THEME.border}`, borderRadius: 12, padding: "14px 18px", textDecoration: "none", transition: "all 0.25s", cursor: c.href ? "pointer" : "default" }}
                onMouseEnter={e => { if (c.href) { e.currentTarget.style.borderColor = "rgba(0,217,255,0.4)"; e.currentTarget.style.transform = "translateX(4px)"; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = THEME.border; e.currentTarget.style.transform = "translateX(0)"; }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, background: "rgba(0,217,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.15rem", flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: THEME.muted, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: "0.85rem", color: THEME.textPrimary, fontWeight: 500 }}>{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <GlassCard hover={false}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: THEME.primary, letterSpacing: 2, marginBottom: 22 }}>&gt; SEND_MESSAGE.sh</div>
            <form onSubmit={handleSubmit}>
              {[
                { key: "name", label: "NAME", type: "text", ph: "Your name" },
                { key: "email", label: "EMAIL", type: "email", ph: "your@email.com" },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontSize: "0.72rem", color: THEME.muted, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "11px 14px", fontSize: "0.88rem", color: THEME.textPrimary, fontFamily: "'Inter',sans-serif", outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }}
                    onFocus={e => e.target.style.borderColor = THEME.primary}
                    onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
                </div>
              ))}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: "0.72rem", color: THEME.muted, marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>MESSAGE</label>
                <textarea placeholder="Tell me about your project or opportunity..." value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ width: "100%", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "11px 14px", fontSize: "0.88rem", color: THEME.textPrimary, fontFamily: "'Inter',sans-serif", outline: "none", resize: "none", height: 100, transition: "border-color 0.2s", boxSizing: "border-box" }}
                  onFocus={e => e.target.style.borderColor = THEME.primary}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} />
              </div>
              <button type="submit"
                style={{ width: "100%", padding: 13, background: sent ? THEME.success : THEME.primary, color: "#0B1120", border: "none", borderRadius: 8, fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", transition: "all 0.25s", fontFamily: "'Inter',sans-serif" }}
                onMouseEnter={e => !sent && (e.target.style.background = "#00b8d9")}
                onMouseLeave={e => !sent && (e.target.style.background = THEME.primary)}>
                {sent ? "✔ Message Sent!" : "⚡ Send Message"}
              </button>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </Section>
  );
}

// FOOTER 
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${THEME.border}`, padding: "28px 5%", textAlign: "center", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem", color: THEME.muted, position: "relative", zIndex: 1 }}>
      <p>© <span style={{ color: THEME.primary }}>Lakinsani Sai Ganesh</span> · Built with React, MERN Stack, and Continuous Learning</p>
      <p style={{ marginTop: 8, fontSize: "0.68rem" }}>Hyderabad, India · Full Stack Developer · MERN · AI</p>
    </footer>
  );
}

// GLOBAL STYLES 
const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Inter', sans-serif; background: #0B1120; color: #E5E7EB; overflow-x: hidden; line-height: 1.6; cursor: none; }
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0B1120; }
  ::-webkit-scrollbar-thumb { background: #00D9FF; border-radius: 3px; }
  @keyframes devos-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  @keyframes devos-pulse { 0%, 100% { opacity: 1; box-shadow: 0 0 6px #22C55E; } 50% { opacity: 0.5; box-shadow: 0 0 14px #22C55E; } }
  @media (max-width: 768px) {
    body { cursor: auto; }
  }
`;

// APP ROOT 
export default function App() {
  return (
    <>
      <style>{globalCSS}</style>
      <ParticleCanvas />
      <MagneticCursor />
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <StartupSection />
        <AIReportSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
