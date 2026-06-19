/**
 * ██████╗  ██████╗ ██████╗ ████████╗███████╗ ██████╗ ██╗     ██╗ ██████╗
 * ██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██╔═══██╗██║     ██║██╔═══██╗
 * ██████╔╝██║   ██║██████╔╝   ██║   █████╗  ██║   ██║██║     ██║██║   ██║
 * ██╔═══╝ ██║   ██║██╔══██╗   ██║   ██╔══╝  ██║   ██║██║     ██║██║   ██║
 * ██║     ╚██████╔╝██║  ██║   ██║   ██║     ╚██████╔╝███████╗██║╚██████╔╝
 *
 * DESIGN DIRECTION: Cyberpunk Luxury — Electric Neon on Deep Black
 * STANDOUT FEATURES:
 *   • Magnetic cursor that follows + expands on hover
 *   • Interactive particle grid that repels from mouse
 *   • Morphing organic blob backgrounds
 *   • Glitch text effect with chromatic aberration
 *   • 3D card tilt on mouse move (perspective transform)
 *   • Animated skill bar fills with glowing tips
 *   • Typewriter hero name with blinking cursor
 *   • Staggered cinematic scroll reveals
 *   • Scan line effects
 *   • Hex-clipped buttons with cyberpunk corners
 *
 * HOW TO RUN:
 *   npm create vite@latest portfolio -- --template react
 *   cd portfolio && npm install
 *   Replace src/App.jsx with this file
 *   npm run dev
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// DESIGN TOKENS — Edit these to restyle everything
// ═══════════════════════════════════════════════════════════════
const C = {
  bg: "#030507",
  bgDeep: "#010203",
  bgCard: "#0A0E14",
  cyan: "#00F5FF",
  cyanDim: "#00C4CC",
  cyanGlow: "rgba(0,245,255,0.15)",
  magenta: "#FF0080",
  green: "#00FF88",
  border: "rgba(0,245,255,0.12)",
  borderHover: "rgba(0,245,255,0.4)",
  textPrimary: "#E8F4F8",
  textSecondary: "#6B8A94",
  textMuted: "#2A4A54",
  fontDisplay: "'Syne', sans-serif",
  fontBody: "'Cabinet Grotesk', 'DM Sans', sans-serif",
  fontMono: "'JetBrains Mono', monospace",
};

// ═══════════════════════════════════════════════════════════════
// PORTFOLIO DATA — Edit this to personalize
// ═══════════════════════════════════════════════════════════════
const DATA = {
  name: "ALEX RIVERA",
  role: "Full-Stack Engineer",
  tagline: "Architecting digital experiences at the intersection of engineering and art.",
  email: "alex@example.com",
  github: "github.com/alexrivera",
  linkedin: "linkedin.com/in/alexrivera",
  about: "I build products that millions of people use. With 5+ years crafting high-performance web applications, I obsess over the details — from microsecond-level performance to pixel-perfect interfaces. The best code is invisible; the experience it creates is everything.",
  skills: [
    { name: "React / Next.js", level: 96 },
    { name: "TypeScript", level: 92 },
    { name: "Node.js / Express", level: 88 },
    { name: "PostgreSQL / MongoDB", level: 85 },
    { name: "AWS / Docker", level: 80 },
    { name: "Figma / Design Systems", level: 88 },
  ],
  projects: [
    {
      id: "01", title: "NEURAL DASH", subtitle: "AI Analytics Platform",
      description: "Real-time ML dashboard processing 2M+ events/day. Reduced decision latency by 60% across 3 Fortune 500 clients.",
      tech: ["React", "Python", "TensorFlow", "Redis"], color: C.cyan,
    },
    {
      id: "02", title: "VERDANT", subtitle: "E-Commerce Ecosystem",
      description: "Full-stack marketplace with live inventory and Stripe payments. $2.4M GMV in first 6 months post-launch.",
      tech: ["Next.js", "Postgres", "Stripe", "AWS"], color: C.green,
    },
    {
      id: "03", title: "SYNAPSE", subtitle: "Collaborative Notes App",
      description: "Real-time multiplayer note editor with offline-first PWA architecture. 50K+ active users.",
      tech: ["React", "Firebase", "WebSockets", "PWA"], color: C.magenta,
    },
    {
      id: "04", title: "DEVFLOW", subtitle: "CLI Scaffolding Tool",
      description: "Open-source CLI with 8K+ GitHub stars. Automates project setup and git workflows for dev teams.",
      tech: ["Node.js", "Commander", "TypeScript", "NPM"], color: C.cyan,
    },
  ],
  experience: [
    {
      role: "Senior Frontend Engineer", company: "MERIDIAN LABS",
      period: "2022 — NOW", tags: ["React", "TypeScript", "GraphQL"],
      detail: "Led team of 4 engineers. 40% bundle reduction. Core Web Vitals from D → A grade.",
    },
    {
      role: "Full-Stack Developer", company: "PIXEL & CODE",
      period: "2020 — 2022", tags: ["Next.js", "Node.js", "AWS"],
      detail: "15+ client projects. Built component library that cut dev time by 30%.",
    },
    {
      role: "Junior Developer", company: "STARTUP STUDIO",
      period: "2019 — 2020", tags: ["React", "MongoDB", "Jest"],
      detail: "Grew test coverage 20% → 75%. Built core internal tooling from scratch.",
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// GLOBAL STYLES
// ═══════════════════════════════════════════════════════════════
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');
      @import url('https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }

      body {
        font-family: ${C.fontBody};
        background: ${C.bg};
        color: ${C.textPrimary};
        overflow-x: hidden;
        cursor: none;
      }

      /* ── Magnetic Cursor ── */
      .cur-dot {
        position: fixed; top: 0; left: 0; z-index: 99999;
        width: 8px; height: 8px; border-radius: 50%;
        background: ${C.cyan};
        pointer-events: none;
        transform: translate(-50%, -50%);
        mix-blend-mode: screen;
        transition: width .2s, height .2s;
      }
      .cur-ring {
        position: fixed; top: 0; left: 0; z-index: 99998;
        width: 44px; height: 44px; border-radius: 50%;
        border: 1px solid rgba(0,245,255,0.45);
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition:
          width .35s cubic-bezier(.23,1,.32,1),
          height .35s cubic-bezier(.23,1,.32,1),
          border-color .3s, background .3s;
      }
      .cur-ring.hov {
        width: 72px; height: 72px;
        border-color: ${C.cyan};
        background: rgba(0,245,255,0.06);
      }

      /* ── Scrollbar ── */
      ::-webkit-scrollbar { width: 2px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: ${C.cyan}; }

      /* ── Layout ── */
      section { padding: 120px 0; position: relative; }
      .container { max-width: 1160px; margin: 0 auto; padding: 0 32px; }

      /* ── Glitch ── */
      @keyframes glitch1 {
        0%,100% { clip-path:inset(0 0 95% 0); transform:translate(-4px,0) skewX(-2deg); }
        20% { clip-path:inset(30% 0 55% 0); transform:translate(4px,0) skewX(2deg); }
        40% { clip-path:inset(60% 0 20% 0); transform:translate(-4px,0); }
        60% { clip-path:inset(80% 0 5% 0); transform:translate(4px,0) skewX(-1deg); }
        80% { clip-path:inset(10% 0 70% 0); transform:translate(-2px,0); }
      }
      @keyframes glitch2 {
        0%,100% { clip-path:inset(0 0 90% 0); transform:translate(4px,0) skewX(2deg); }
        25% { clip-path:inset(50% 0 30% 0); transform:translate(-4px,0); }
        50% { clip-path:inset(70% 0 10% 0); transform:translate(3px,0) skewX(-2deg); }
        75% { clip-path:inset(20% 0 60% 0); transform:translate(-3px,0); }
      }

      /* ── Misc ── */
      @keyframes floatY {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-18px); }
      }
      @keyframes blink { 50% { opacity: 0; } }
      @keyframes scanLine {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100vh); }
      }
      @keyframes pulseGlow {
        0%,100% { box-shadow: 0 0 16px ${C.cyanGlow}; }
        50% { box-shadow: 0 0 40px rgba(0,245,255,0.3); }
      }
      @keyframes revealUp {
        from { opacity:0; transform:translateY(50px); }
        to { opacity:1; transform:translateY(0); }
      }
      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      /* ── Scroll-reveal classes ── */
      .rv {
        opacity:0; transform:translateY(50px);
        transition: opacity .85s cubic-bezier(.23,1,.32,1),
                    transform .85s cubic-bezier(.23,1,.32,1);
      }
      .rv.on { opacity:1; transform:none; }
      .d1{transition-delay:.1s!important}
      .d2{transition-delay:.2s!important}
      .d3{transition-delay:.3s!important}
      .d4{transition-delay:.4s!important}
      .d5{transition-delay:.5s!important}

      a { text-decoration:none; color:inherit; }
      button { font-family:inherit; cursor:none; }

      @media(max-width:768px){
        section { padding:80px 0; }
        body { cursor:auto; }
        .cur-dot, .cur-ring { display:none; }
      }
    `}</style>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAGNETIC CURSOR COMPONENT
// ═══════════════════════════════════════════════════════════════
function MagneticCursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf;
    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const tick = () => {
      if (dot.current) {
        dot.current.style.left = mouse.current.x + "px";
        dot.current.style.top = mouse.current.y + "px";
      }
      if (ring.current) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.11;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.11;
        ring.current.style.left = smooth.current.x + "px";
        ring.current.style.top = smooth.current.y + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    const addHov = () => ring.current?.classList.add("hov");
    const remHov = () => ring.current?.classList.remove("hov");

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[data-h]").forEach(el => {
      el.addEventListener("mouseenter", addHov);
      el.addEventListener("mouseleave", remHov);
    });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); document.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <>
      <div ref={dot} className="cur-dot" />
      <div ref={ring} className="cur-ring" />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// INTERACTIVE PARTICLE GRID
// ═══════════════════════════════════════════════════════════════
function ParticleGrid() {
  const cvs = useRef(null);

  useEffect(() => {
    const canvas = cvs.current;
    const ctx = canvas.getContext("2d");
    let raf;
    const mouse = { x: -9999, y: -9999 };
    const COLS = 22, ROWS = 13;
    let pts = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pts = [];
      const gx = canvas.width / COLS;
      const gy = canvas.height / ROWS;
      for (let r = 0; r <= ROWS; r++) {
        for (let c = 0; c <= COLS; c++) {
          pts.push({
            ox: c * gx, oy: r * gy,
            x: c * gx, y: r * gy,
            sz: Math.random() * 1.8 + 0.4,
            op: Math.random() * 0.25 + 0.04,
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        const dx = mouse.x - p.ox, dy = mouse.y - p.oy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 130 - dist) / 130;
        const ang = Math.atan2(dy, dx);
        p.x += (p.ox - force * Math.cos(ang) * 35 - p.x) * 0.08;
        p.y += (p.oy - force * Math.sin(ang) * 35 - p.y) * 0.08;

        // Draw connections
        pts.forEach(p2 => {
          const d = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (d < 90 && d > 0) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0,245,255,${0.025 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sz + force * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,245,255,${p.op + force * 0.5})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={cvs} style={{
      position: "fixed", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 0, opacity: 0.55,
    }} />
  );
}

// ═══════════════════════════════════════════════════════════════
// MORPHING BLOB BACKGROUND
// ═══════════════════════════════════════════════════════════════
function Blob({ color, size = 600, style: s = {}, opacity = 0.06 }) {
  const ref = useRef(null);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      t += 0.004;
      const v = Array.from({ length: 8 }, (_, i) => Math.sin(t * (0.7 + i * 0.15) + i) * 10 + 50);
      if (ref.current)
        ref.current.style.borderRadius = `${v[0]}% ${v[1]}% ${v[2]}% ${v[3]}% / ${v[4]}% ${v[5]}% ${v[6]}% ${v[7]}%`;
    }, 16);
    return () => clearInterval(id);
  }, []);
  return (
    <div ref={ref} style={{
      position: "absolute", width: size, height: size,
      background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
      opacity, pointerEvents: "none", zIndex: 0, filter: "blur(70px)",
      ...s,
    }} />
  );
}

// ═══════════════════════════════════════════════════════════════
// GLITCH TEXT
// ═══════════════════════════════════════════════════════════════
function Glitch({ children, size, weight = 800, color = C.textPrimary }) {
  const base = { fontFamily: C.fontDisplay, fontSize: size, fontWeight: weight };
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ ...base, color, position: "relative", zIndex: 2 }}>{children}</span>
      <span aria-hidden style={{ ...base, color: C.cyan, position: "absolute", inset: 0, animation: "glitch1 3.5s infinite linear", zIndex: 1, opacity: 0.65 }}>{children}</span>
      <span aria-hidden style={{ ...base, color: C.magenta, position: "absolute", inset: 0, animation: "glitch2 3.5s infinite linear 0.4s", zIndex: 1, opacity: 0.45 }}>{children}</span>
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// SCROLL REVEAL HOOK
// ═══════════════════════════════════════════════════════════════
function useReveal(thresh = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: thresh });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [thresh]);
  return [ref, vis];
}

// ═══════════════════════════════════════════════════════════════
// 3D TILT HOOK (for project cards)
// ═══════════════════════════════════════════════════════════════
function useTilt() {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) translateZ(12px)`;
    ref.current.style.boxShadow = `${-x * 24}px ${-y * 24}px 60px rgba(0,245,255,0.1)`;
  }, []);
  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
    ref.current.style.boxShadow = "none";
  }, []);
  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

// ═══════════════════════════════════════════════════════════════
// HEX CLIP BUTTON
// ═══════════════════════════════════════════════════════════════
function HexBtn({ children, href, onClick, variant = "solid", style: s = {} }) {
  const solid = variant === "solid";
  const clip = "polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px))";
  const base = {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "15px 30px", clipPath: clip,
    fontFamily: C.fontMono, fontSize: 11,
    fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase",
    border: "none", transition: "all .25s ease",
    background: solid ? C.cyan : "transparent",
    color: solid ? C.bg : C.textSecondary,
    outline: solid ? "none" : `1px solid ${C.border}`,
    ...s,
  };
  const hover = solid
    ? { background: C.cyanDim, transform: "translateY(-3px)", boxShadow: `0 12px 40px ${C.cyanGlow}` }
    : { outline: `1px solid ${C.cyan}`, color: C.cyan, transform: "translateY(-3px)" };

  const [hov, setHov] = useState(false);
  const style = { ...base, ...(hov ? hover : {}) };

  return href
    ? <a href={href} data-h style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</a>
    : <button onClick={onClick} data-h style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>{children}</button>;
}

// ═══════════════════════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════════════════════
function SectionHead({ num, label, title, accent }) {
  return (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
        <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.cyan, letterSpacing: "3px", textTransform: "uppercase" }}>
          {num} / {label}
        </span>
        <div style={{ flex: 1, height: 1, background: C.border }} />
      </div>
      <h2 style={{
        fontFamily: C.fontDisplay, fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
        fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 64,
      }}>
        {title}<br />
        <span style={{ color: accent || C.cyan }}>{accent ? null : null}</span>
      </h2>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// NAVBAR
// ═══════════════════════════════════════════════════════════════
function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [hov, setHov] = useState("");
  const [mob, setMob] = useState(false);
  const links = ["About", "Skills", "Projects", "Experience", "Contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 9000,
      padding: "0 32px",
      background: scrolled ? "rgba(3,5,7,0.93)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all .4s ease",
    }}>
      <div style={{
        maxWidth: 1160, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 72,
      }}>
        {/* Logo */}
        <a href="#hero" data-h style={{
          display: "flex", alignItems: "center", gap: 10,
          fontFamily: C.fontDisplay, fontSize: 20, fontWeight: 800,
          letterSpacing: "3px", color: C.textPrimary,
        }}>
          <span style={{
            width: 30, height: 30, background: C.cyan,
            clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, color: C.bg, fontWeight: 900,
          }}>A</span>
          AR<span style={{ color: C.cyan }}>_</span>
        </a>

        {/* Desktop */}
        <div style={{ display: "flex", alignItems: "center", gap: 36 }} className="dsk">
          {links.map((l, i) => (
            <a key={l} href={`#${l.toLowerCase()}`} data-h
              onMouseEnter={() => setHov(l)} onMouseLeave={() => setHov("")}
              style={{
                fontFamily: C.fontMono, fontSize: 11, letterSpacing: "2px",
                textTransform: "uppercase",
                color: hov === l ? C.cyan : C.textSecondary,
                transition: "color .2s",
              }}>
              <span style={{ color: C.cyan, opacity: 0.4, marginRight: 4 }}>
                {String(i + 1).padStart(2, "0")}.
              </span>{l}
            </a>
          ))}
          <HexBtn variant="outline" onClick={toggleTheme} style={{ padding: "8px 16px" }}>
            {dark ? "☀ LIGHT" : "◐ DARK"}
          </HexBtn>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMob(m => !m)} data-h
          style={{ display: "none", background: "none", border: "none", color: C.cyan, fontSize: 22 }}
          className="mbt">
          {mob ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mob && (
        <div style={{
          background: "rgba(3,5,7,0.98)", borderTop: `1px solid ${C.border}`,
          padding: "20px 32px 28px",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              onClick={() => setMob(false)}
              style={{
                display: "block", padding: "13px 0",
                fontFamily: C.fontMono, fontSize: 12, letterSpacing: "2px",
                textTransform: "uppercase", color: C.textSecondary,
                borderBottom: `1px solid ${C.border}`,
              }}>{l}</a>
          ))}
        </div>
      )}

      <style>{`
        @media(max-width:768px){ .dsk{display:none!important} .mbt{display:block!important} }
      `}</style>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════
function Hero() {
  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  // Typewriter
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setTyped(DATA.name.slice(0, ++i));
      if (i >= DATA.name.length) { setDone(true); clearInterval(id); }
    }, 75);
    return () => clearInterval(id);
  }, []);

  const orbs = useMemo(() => Array.from({ length: 8 }, (_, i) => ({
    id: i, size: 3 + Math.random() * 7,
    delay: i * 0.6, dur: 3 + Math.random() * 4,
    x: 5 + Math.random() * 90, y: 5 + Math.random() * 90,
  })), []);

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 80 }}>
      {/* Blobs */}
      <Blob color={C.cyan} size={700} style={{ top: -200, right: -200 }} opacity={0.07} />
      <Blob color={C.magenta} size={500} style={{ bottom: -150, left: -150 }} opacity={0.05} />

      {/* Floating orbs */}
      {orbs.map(o => (
        <div key={o.id} style={{
          position: "absolute", left: `${o.x}%`, top: `${o.y}%`,
          width: o.size, height: o.size, borderRadius: "50%",
          background: C.cyan, opacity: 0.25,
          boxShadow: `0 0 ${o.size * 4}px ${C.cyan}`,
          animation: `floatY ${o.dur}s ease-in-out ${o.delay}s infinite`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Scan line */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${C.cyan}, transparent)`,
        animation: "scanLine 7s linear infinite", opacity: 0.12, pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "8px 20px",
          border: `1px solid ${C.border}`,
          background: "rgba(0,245,255,0.04)",
          marginBottom: 44,
          animation: "revealUp .6s ease .2s both",
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%", background: C.green,
            boxShadow: `0 0 10px ${C.green}`, display: "inline-block",
            animation: "pulseGlow 2s ease infinite",
          }} />
          <span style={{ fontFamily: C.fontMono, fontSize: 11, letterSpacing: "2px", color: C.green, textTransform: "uppercase" }}>
            AVAILABLE FOR HIRE
          </span>
        </div>

        {/* Name typewriter */}
        <h1 style={{
          fontFamily: C.fontDisplay,
          fontSize: "clamp(3.2rem, 10vw, 9rem)",
          fontWeight: 800, lineHeight: 0.92,
          letterSpacing: "-3px", marginBottom: 20,
          animation: "revealUp .6s ease .4s both",
        }}>
          {typed}
          <span style={{
            display: "inline-block", width: "3px", height: "0.85em",
            background: C.cyan, marginLeft: 5, verticalAlign: "text-bottom",
            animation: done ? "blink 1s step-end infinite" : "none",
          }} />
        </h1>

        {/* Role glitch */}
        <div style={{ marginBottom: 28, animation: "revealUp .6s ease .6s both" }}>
          <Glitch size="clamp(1.1rem, 3vw, 2rem)" color={C.cyan}>{DATA.role}</Glitch>
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(15px, 1.8vw, 18px)", color: C.textSecondary,
          maxWidth: 510, lineHeight: 1.85, marginBottom: 52,
          animation: "revealUp .6s ease .7s both",
        }}>
          {DATA.tagline}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: "revealUp .6s ease .9s both" }}>
          <HexBtn href="#projects">EXPLORE WORK →</HexBtn>
          <HexBtn href={`mailto:${DATA.email}`} variant="outline">CONTACT ME</HexBtn>
        </div>

        {/* Socials */}
        <div style={{ display: "flex", gap: 32, marginTop: 72, animation: "revealUp .6s ease 1.1s both" }}>
          {[
            { label: "GITHUB", href: `https://${DATA.github}` },
            { label: "LINKEDIN", href: `https://${DATA.linkedin}` },
            { label: "EMAIL", href: `mailto:${DATA.email}` },
          ].map(s => {
            const [h, setH] = useState(false);
            return (
              <a key={s.label} href={s.href} data-h
                onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{
                  fontFamily: C.fontMono, fontSize: 10, letterSpacing: "2px",
                  textTransform: "uppercase", color: h ? C.cyan : C.textMuted,
                  transition: "color .2s", display: "flex", alignItems: "center", gap: 6,
                }}>
                <span style={{ color: C.cyan, opacity: h ? 1 : 0.3, transition: "opacity .2s" }}>↗</span>
                {s.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Floating diamond */}
      <div style={{
        position: "absolute", right: "7%", top: "50%",
        transform: "translateY(-50%)",
        animation: "floatY 5.5s ease-in-out infinite",
        pointerEvents: "none",
      }}>
        <div style={{
          width: 170, height: 170,
          background: `linear-gradient(135deg, ${C.cyan}18, ${C.magenta}18)`,
          border: `1px solid ${C.cyan}35`,
          transform: "rotate(45deg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 0 60px ${C.cyanGlow}`,
        }}>
          <div style={{ transform: "rotate(-45deg)", textAlign: "center" }}>
            <div style={{
              fontFamily: C.fontDisplay, fontSize: "2.6rem", fontWeight: 800,
              color: C.cyan, lineHeight: 1, textShadow: `0 0 30px ${C.cyan}`,
            }}>5+</div>
            <div style={{ fontFamily: C.fontMono, fontSize: 9, color: C.textMuted, letterSpacing: "2px" }}>YEARS</div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        animation: "revealUp .6s ease 1.5s both",
      }}>
        <div style={{
          width: 1, height: 56,
          background: `linear-gradient(to bottom, transparent, ${C.cyan})`,
        }} />
        <span style={{ fontFamily: C.fontMono, fontSize: 9, color: C.textMuted, letterSpacing: "3px" }}>SCROLL</span>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// ABOUT SECTION
// ═══════════════════════════════════════════════════════════════
function About() {
  const [ref, vis] = useReveal();
  const stats = [
    { num: "50+", label: "PROJECTS" },
    { num: "2M+", label: "USERS REACHED" },
    { num: "$4M+", label: "REVENUE DRIVEN" },
    { num: "8K+", label: "GITHUB STARS" },
  ];

  return (
    <section id="about" style={{ overflow: "hidden" }}>
      <Blob color={C.magenta} size={600} style={{ top: -150, left: -200 }} opacity={0.04} />
      <div className="container" ref={ref}>
        <div className={`rv ${vis ? "on" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.cyan, letterSpacing: "3px" }}>01 / ABOUT</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <h2 style={{ fontFamily: C.fontDisplay, fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 64, lineHeight: 1.05 }}>
            THE HUMAN<br />
            <span style={{ color: C.cyan }}>BEHIND THE CODE</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Text */}
          <div className={`rv ${vis ? "on" : ""} d2`}>
            <p style={{
              fontSize: 18, color: C.textSecondary, lineHeight: 1.9, marginBottom: 40,
              borderLeft: `2px solid ${C.cyan}`, paddingLeft: 24,
            }}>{DATA.about}</p>
            {["Currently building at Meridian Labs", "Open to freelance + full-time roles", "Based in San Francisco, CA"].map(t => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: C.fontMono, fontSize: 12, color: C.textSecondary, marginBottom: 14 }}>
                <span style={{ color: C.cyan }}>▹</span>{t}
              </div>
            ))}
          </div>

          {/* Stat cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {stats.map((s, i) => {
              const [h, setH] = useState(false);
              return (
                <div key={s.label}
                  className={`rv ${vis ? "on" : ""} d${i + 2}`}
                  onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{
                    background: C.bgCard, border: `1px solid ${h ? C.cyan + "60" : C.border}`,
                    padding: "32px 24px", position: "relative", overflow: "hidden",
                    transition: "border-color .3s, transform .3s",
                    transform: h ? "translateY(-4px)" : "none",
                  }}>
                  <div style={{
                    fontFamily: C.fontDisplay, fontSize: "2.5rem", fontWeight: 800,
                    color: C.cyan, lineHeight: 1, marginBottom: 8,
                    textShadow: `0 0 40px ${C.cyan}60`,
                  }}>{s.num}</div>
                  <div style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textMuted, letterSpacing: "2px" }}>{s.label}</div>
                  <div style={{
                    position: "absolute", bottom: 0, right: 0,
                    width: 0, height: 0, borderStyle: "solid",
                    borderWidth: "0 0 24px 24px",
                    borderColor: `transparent transparent ${C.cyan}18 transparent`,
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){#about .container>div:last-child{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// SKILLS SECTION
// ═══════════════════════════════════════════════════════════════
function Skills() {
  const [ref, vis] = useReveal();
  const tags = ["React", "Next.js", "TypeScript", "Node.js", "Python", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "AWS", "Docker", "Kubernetes", "Figma", "TailwindCSS", "Jest", "CI/CD"];

  return (
    <section id="skills" style={{ background: C.bgDeep, overflow: "hidden" }}>
      <Blob color={C.cyan} size={500} style={{ top: -100, right: -100 }} opacity={0.05} />
      <div className="container" ref={ref}>
        <div className={`rv ${vis ? "on" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.cyan, letterSpacing: "3px" }}>02 / SKILLS</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <h2 style={{ fontFamily: C.fontDisplay, fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 64 }}>
            TECHNICAL <span style={{ color: C.cyan }}>EXPERTISE</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {DATA.skills.map((sk, i) => <SkillBar key={sk.name} sk={sk} vis={vis} i={i} />)}
        </div>

        {/* Tag cloud */}
        <div className={`rv ${vis ? "on" : ""} d5`} style={{ marginTop: 60, display: "flex", flexWrap: "wrap", gap: 10 }}>
          {tags.map(t => {
            const [h, setH] = useState(false);
            return (
              <span key={t}
                onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{
                  padding: "8px 16px",
                  background: h ? "rgba(0,245,255,0.08)" : "rgba(0,245,255,0.03)",
                  border: `1px solid ${h ? C.cyan : C.border}`,
                  fontFamily: C.fontMono, fontSize: 11,
                  color: h ? C.cyan : C.textSecondary,
                  letterSpacing: "1px", transition: "all .2s",
                  clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                }}>{t}</span>
            );
          })}
        </div>
      </div>
      <style>{`@media(max-width:600px){#skills .container>div:nth-child(2){grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function SkillBar({ sk, vis, i }) {
  const barRef = useRef(null);
  useEffect(() => {
    if (vis) {
      setTimeout(() => { if (barRef.current) barRef.current.style.width = sk.level + "%"; }, i * 120 + 500);
    }
  }, [vis, sk.level, i]);

  const [h, setH] = useState(false);
  return (
    <div className={`rv ${vis ? "on" : ""}`} style={{ transitionDelay: `${i * 0.1}s` }}>
      <div
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{
          background: C.bgCard, border: `1px solid ${h ? C.cyan + "50" : C.border}`,
          padding: "24px 28px", transition: "border-color .3s",
        }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <span style={{ fontSize: 15, color: C.textPrimary, fontWeight: 500 }}>{sk.name}</span>
          <span style={{ fontFamily: C.fontMono, fontSize: 12, color: C.cyan }}>{sk.level}%</span>
        </div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
          <div ref={barRef} style={{
            height: "100%", width: 0,
            background: `linear-gradient(90deg, ${C.cyan}, ${C.cyanDim})`,
            transition: "width 1.4s cubic-bezier(.23,1,.32,1)",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", right: -2, top: -3,
              width: 8, height: 8, borderRadius: "50%",
              background: C.cyan, boxShadow: `0 0 14px ${C.cyan}`,
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PROJECTS SECTION
// ═══════════════════════════════════════════════════════════════
function Projects() {
  const [ref, vis] = useReveal();
  return (
    <section id="projects" style={{ overflow: "hidden" }}>
      <Blob color={C.green} size={500} style={{ bottom: -100, right: -100 }} opacity={0.04} />
      <div className="container" ref={ref}>
        <div className={`rv ${vis ? "on" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.cyan, letterSpacing: "3px" }}>03 / PROJECTS</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <h2 style={{ fontFamily: C.fontDisplay, fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 64 }}>
            SELECTED <span style={{ color: C.cyan }}>WORK</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {DATA.projects.map((p, i) => <ProjectCard key={p.id} p={p} vis={vis} delay={i * 0.15} />)}
        </div>
      </div>
      <style>{`@media(max-width:700px){#projects .container>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function ProjectCard({ p, vis, delay }) {
  const tilt = useTilt();
  const [h, setH] = useState(false);
  return (
    <div className={`rv ${vis ? "on" : ""}`} style={{ transitionDelay: `${delay}s` }}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseEnter={() => setH(true)}
        onMouseLeave={(e) => { tilt.onMouseLeave(e); setH(false); }}
        data-h
        style={{
          background: C.bgCard,
          border: `1px solid ${h ? p.color + "55" : C.border}`,
          padding: "40px 36px", position: "relative", overflow: "hidden",
          transition: "border-color .3s", transformStyle: "preserve-3d",
          minHeight: 330,
        }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 0%, ${p.color}0D 0%, transparent 55%)`,
          opacity: h ? 1 : 0, transition: "opacity .4s", pointerEvents: "none",
        }} />

        {/* Ghost ID */}
        <div style={{
          position: "absolute", top: 16, right: 24,
          fontFamily: C.fontDisplay, fontSize: 60, fontWeight: 800,
          color: p.color, opacity: h ? 0.12 : 0.06, lineHeight: 1,
          transition: "opacity .3s",
        }}>{p.id}</div>

        <p style={{ fontFamily: C.fontMono, fontSize: 11, color: p.color, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 14, opacity: 0.85 }}>
          {p.subtitle}
        </p>
        <h3 style={{ fontFamily: C.fontDisplay, fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-1px", color: C.textPrimary, marginBottom: 18, lineHeight: 1.1 }}>
          {p.title}
        </h3>
        <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8, marginBottom: 28, maxWidth: 320 }}>
          {p.description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontFamily: C.fontMono, fontSize: 10, padding: "4px 12px",
              background: `${p.color}12`, border: `1px solid ${p.color}30`,
              color: p.color, letterSpacing: "1px",
            }}>{t}</span>
          ))}
        </div>
        <div style={{
          fontFamily: C.fontMono, fontSize: 11, color: p.color,
          letterSpacing: "2px", textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 8,
          transform: `translateX(${h ? 8 : 0}px)`, transition: "transform .3s",
        }}>
          VIEW PROJECT →
        </div>

        {/* Bottom accent line */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
          opacity: h ? 1 : 0, transition: "opacity .3s",
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EXPERIENCE SECTION
// ═══════════════════════════════════════════════════════════════
function Experience() {
  const [ref, vis] = useReveal();
  const cols = [C.cyan, C.green, C.magenta];

  return (
    <section id="experience" style={{ background: C.bgDeep, overflow: "hidden" }}>
      <Blob color={C.magenta} size={500} style={{ top: -100, right: -100 }} opacity={0.04} />
      <div className="container" ref={ref}>
        <div className={`rv ${vis ? "on" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.cyan, letterSpacing: "3px" }}>04 / EXPERIENCE</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <h2 style={{ fontFamily: C.fontDisplay, fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 64 }}>
            CAREER <span style={{ color: C.cyan }}>TIMELINE</span>
          </h2>
        </div>

        <div style={{ position: "relative", paddingLeft: 52 }}>
          <div style={{
            position: "absolute", left: 0, top: 8, bottom: 8, width: 1,
            background: `linear-gradient(to bottom, ${C.cyan}, ${C.green}, ${C.magenta}, transparent)`,
            opacity: 0.25,
          }} />
          {DATA.experience.map((job, i) => {
            const [h, setH] = useState(false);
            const col = cols[i % 3];
            return (
              <div key={job.company} className={`rv ${vis ? "on" : ""} d${i + 1}`}
                style={{ marginBottom: 44, position: "relative" }}>
                {/* Dot */}
                <div style={{
                  position: "absolute", left: -56, top: 28,
                  width: 10, height: 10, borderRadius: "50%",
                  background: i === 0 ? col : C.bg,
                  border: `2px solid ${col}`,
                  boxShadow: i === 0 ? `0 0 18px ${col}` : "none",
                  zIndex: 1,
                }} />
                <div
                  onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{
                    background: C.bgCard,
                    border: `1px solid ${h ? col + "55" : C.border}`,
                    padding: "32px 28px", position: "relative", overflow: "hidden",
                    transition: "border-color .3s, transform .3s",
                    transform: h ? "translateX(8px)" : "none",
                  }}>
                  {/* Left accent */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0, width: 2,
                    background: col, opacity: h ? 1 : 0, transition: "opacity .3s",
                    boxShadow: `0 0 20px ${col}`,
                  }} />
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                    <div>
                      <p style={{ fontFamily: C.fontMono, fontSize: 10, color: col, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>{job.period}</p>
                      <h3 style={{ fontFamily: C.fontDisplay, fontSize: "1.35rem", fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>{job.role}</h3>
                      <p style={{ fontFamily: C.fontMono, fontSize: 11, color: C.textMuted, letterSpacing: "1px" }}>@ {job.company}</p>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
                      {job.tags.map(t => (
                        <span key={t} style={{
                          fontFamily: C.fontMono, fontSize: 9, padding: "4px 10px",
                          background: `${col}12`, border: `1px solid ${col}30`, color: col, letterSpacing: "1px",
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.8 }}>
                    <span style={{ color: col, marginRight: 8 }}>▹</span>{job.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// CONTACT SECTION
// ═══════════════════════════════════════════════════════════════
function Contact() {
  const [ref, vis] = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState("");

  const fieldStyle = (name) => ({
    width: "100%", padding: "16px 18px",
    background: focus === name ? "rgba(0,245,255,0.04)" : C.bgCard,
    border: `1px solid ${focus === name ? C.cyan : C.border}`,
    color: C.textPrimary, fontFamily: C.fontBody, fontSize: 15, outline: "none",
    transition: "all .25s",
    clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
    boxShadow: focus === name ? `0 0 30px ${C.cyanGlow}, inset 0 0 20px rgba(0,245,255,0.02)` : "none",
  });

  return (
    <section id="contact" style={{ overflow: "hidden" }}>
      <Blob color={C.cyan} size={600} style={{ top: -150, left: -150 }} opacity={0.05} />
      <Blob color={C.magenta} size={400} style={{ bottom: -100, right: -100 }} opacity={0.04} />
      <div className="container" ref={ref}>
        <div className={`rv ${vis ? "on" : ""}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
            <span style={{ fontFamily: C.fontMono, fontSize: 11, color: C.cyan, letterSpacing: "3px" }}>05 / CONTACT</span>
            <div style={{ flex: 1, height: 1, background: C.border }} />
          </div>
          <h2 style={{ fontFamily: C.fontDisplay, fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 800, letterSpacing: "-2px", marginBottom: 16, lineHeight: 1.05 }}>
            LET'S BUILD<br />
            <span style={{ color: C.cyan }}>SOMETHING GREAT</span>
          </h2>
          <p style={{ fontSize: 16, color: C.textSecondary, maxWidth: 480, marginBottom: 64, lineHeight: 1.85 }}>
            Have a project in mind? My inbox is open. I'm available for full-time roles and select freelance projects.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80 }}>
          {/* Info */}
          <div className={`rv ${vis ? "on" : ""} d2`}>
            {[
              { l: "EMAIL", v: DATA.email, h: `mailto:${DATA.email}` },
              { l: "GITHUB", v: DATA.github, h: `https://${DATA.github}` },
              { l: "LINKEDIN", v: DATA.linkedin, h: `https://${DATA.linkedin}` },
            ].map(item => {
              const [h, setH] = useState(false);
              return (
                <a key={item.l} href={item.h} data-h
                  onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                  style={{
                    display: "block", padding: "22px 0",
                    borderBottom: `1px solid ${C.border}`,
                    transition: "padding .2s",
                    paddingLeft: h ? 12 : 0,
                  }}>
                  <p style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textMuted, letterSpacing: "2px", marginBottom: 6 }}>{item.l}</p>
                  <p style={{ fontSize: 15, color: h ? C.cyan : C.textSecondary, transition: "color .2s" }}>
                    {item.v}<span style={{ color: C.cyan, marginLeft: 8 }}>↗</span>
                  </p>
                </a>
              );
            })}
            <div style={{
              marginTop: 36, padding: "22px",
              background: "rgba(0,255,136,0.04)",
              border: "1px solid rgba(0,255,136,0.18)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green, boxShadow: `0 0 10px ${C.green}`, display: "inline-block" }} />
                <span style={{ fontFamily: C.fontMono, fontSize: 10, color: C.green, letterSpacing: "2px" }}>OPEN TO WORK</span>
              </div>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.75 }}>
                Available for full-time and freelance. Response time under 24h.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className={`rv ${vis ? "on" : ""} d3`}>
            {sent ? (
              <div style={{
                padding: 48, textAlign: "center",
                background: "rgba(0,245,255,0.04)",
                border: `1px solid ${C.cyan}40`,
              }}>
                <div style={{ fontSize: 52, marginBottom: 16, filter: `drop-shadow(0 0 20px ${C.cyan})` }}>✦</div>
                <h3 style={{ fontFamily: C.fontDisplay, fontSize: "2rem", fontWeight: 700, color: C.cyan, marginBottom: 12 }}>
                  MESSAGE SENT
                </h3>
                <p style={{ color: C.textSecondary, lineHeight: 1.75 }}>
                  I'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {["name", "email"].map(f => (
                    <div key={f}>
                      <label style={{
                        display: "block", fontFamily: C.fontMono, fontSize: 10,
                        color: focus === f ? C.cyan : C.textMuted,
                        letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10,
                        transition: "color .2s",
                      }}>{f}</label>
                      <input
                        type={f === "email" ? "email" : "text"}
                        name={f} required
                        placeholder={f === "email" ? "you@domain.com" : "Your name"}
                        value={form[f]}
                        onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))}
                        onFocus={() => setFocus(f)} onBlur={() => setFocus("")}
                        style={fieldStyle(f)}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{
                    display: "block", fontFamily: C.fontMono, fontSize: 10,
                    color: focus === "message" ? C.cyan : C.textMuted,
                    letterSpacing: "2px", textTransform: "uppercase", marginBottom: 10,
                    transition: "color .2s",
                  }}>MESSAGE</label>
                  <textarea
                    name="message" required rows={6}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    onFocus={() => setFocus("message")} onBlur={() => setFocus("")}
                    style={{ ...fieldStyle("message"), resize: "vertical" }}
                  />
                </div>
                <HexBtn style={{ width: "100%", justifyContent: "center" }}>
                  SEND MESSAGE →
                </HexBtn>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media(max-width:768px){#contact .container>div:last-child{grid-template-columns:1fr!important;gap:48px!important}}
        @media(max-width:500px){#contact form>div:first-child{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════
// FOOTER
// ═══════════════════════════════════════════════════════════════
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 32px", background: C.bgDeep }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <p style={{ fontFamily: C.fontMono, fontSize: 11, color: C.textMuted, letterSpacing: "1px" }}>
          © {new Date().getFullYear()} ALEX RIVERA — BUILT WITH REACT
        </p>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.green, boxShadow: `0 0 8px ${C.green}`, display: "inline-block" }} />
          <span style={{ fontFamily: C.fontMono, fontSize: 10, color: C.textMuted, letterSpacing: "2px" }}>ALL SYSTEMS OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [dark, setDark] = useState(true);
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <GlobalStyles />
      <ParticleGrid />
      <MagneticCursor />
      <Navbar dark={dark} toggleTheme={() => setDark(d => !d)} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
