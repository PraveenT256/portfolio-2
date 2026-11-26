import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile, stats, experience, projects, skillGroups, sphereSkills, education, achievements } from '../data'
import { Counter, Magnetic, Reveal, SectionHead, SplitText, TiltCard } from './ui'
import { ContactSheets, openSheet } from './ContactSheets'

/* ---------------- HERO ---------------- */
function RoleRotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2400)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero({ ready }) {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        {ready && (
          <>
            <motion.div className="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <span className="pulse" /> Open to opportunities · {profile.location}
            </motion.div>
            <h1 className="hero-title">
              <SplitText text="Praveen" delay={0.3} />
              <span className="hero-line2">
                <SplitText text="Kumar" delay={0.55} className="outline" />
                <motion.span className="hero-badge" initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.1, type: 'spring' }}>
                  <img src={profile.photo} alt="Praveen Kumar" />
                </motion.span>
              </span>
            </h1>
            <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
              <RoleRotator /> who ships <em>production</em> multi-tenant SaaS — from pixel-perfect React to
              role-secured Node &amp; MongoDB backends.
            </motion.p>
            <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
              <Magnetic><a className="btn btn-primary" href="#projects">See my work <span>→</span></a></Magnetic>
              <Magnetic><a className="btn btn-ghost" href="#contact">Let’s talk</a></Magnetic>
            </motion.div>
          </>
        )}
      </div>
      <div className="hero-foot">
        <span>Scroll to explore the stack</span>
        <span className="scroll-line"><i /></span>
        <span className="mono">M · E · R · N</span>
      </div>
    </section>
  )
}

export function Marquee() {
  const words = ['React.js', 'Node.js', 'Express', 'MongoDB', 'Material UI', 'REST APIs', 'Vitest', 'RBAC', 'Google Maps', 'CI/CD', 'AI-assisted dev']
  const row = [...words, ...words]
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i}>{w}<b>✦</b></span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- ABOUT ---------------- */
export function About() {
  return (
    <section className="section" id="about">
      <SectionHead index="01" kicker="About" title="Code that ships," accent="not just compiles." />
      <div className="about-grid">
        <Reveal className="about-photo-wrap">
          <TiltCard className="about-photo" max={14}>
            <img src={profile.photo} alt="Portrait of Tangudu Praveen Kumar" />
            <div className="photo-ring" />
            <div className="photo-tag">
              <span className="pulse" /> {profile.name}
            </div>
          </TiltCard>
        </Reveal>
        <div className="about-text">
          <Reveal as="p" className="lead">
            I’m a <strong>MERN Stack Developer</strong> who’s already taken a real product to production —
            a multi-tenant SaaS where organizations onboard, publish and manage property listings end to end.
          </Reveal>
          <Reveal as="p" delay={0.1}>{profile.summary}</Reveal>
          <Reveal as="p" delay={0.15}>
            I lean on <span className="hl">AI-assisted development</span> (1.4 years hands-on) to prototype fast and
            debug faster — then back it with tests, code review and clean Git history.
          </Reveal>
          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 * i} className="stat">
                <div className="stat-num"><Counter value={s.value} decimals={s.decimals} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- EXPERIENCE ---------------- */
export function Experience() {
  const [open, setOpen] = useState(0)
  return (
    <section className="section" id="experience">
      <SectionHead index="02" kicker="Experience" title="Where I’ve" accent="built things." />
      <div className="timeline">
        {experience.map((job, i) => (
          <Reveal key={job.company} delay={0.08 * i}>
            <article className={`job ${open === i ? 'active' : ''}`} onClick={() => setOpen(open === i ? -1 : i)} data-cursor>
              <div className="job-node" />
              <header className="job-head">
                <div>
                  <span className="job-type">{job.type}</span>
                  <h3>{job.role}</h3>
                  <p className="job-co">@ {job.company}</p>
                </div>
                <div className="job-meta">
                  <span className="mono">{job.period}</span>
                  <span className="job-toggle">{open === i ? '−' : '+'}</span>
                </div>
              </header>
              <p className="job-blurb">{job.blurb}</p>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    className="job-body"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <ul>
                      {job.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                    <div className="tags">{job.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- PROJECTS ---------------- */
function ProjectVisual({ p }) {
  return (
    <div className="pv" style={{ '--h1': p.hue[0], '--h2': p.hue[1] }}>
      <div className="pv-bar"><i /><i /><i /><span>{p.title.toLowerCase().replace(/\s+/g, '-')}.app</span></div>
      <div className="pv-body">
        <div className="pv-glyph">{p.glyph}</div>
        <div className="pv-rows">
          <span style={{ width: '80%' }} /><span style={{ width: '55%' }} /><span style={{ width: '68%' }} />
        </div>
        <div className="pv-orb" />
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section className="section" id="projects">
      <SectionHead index="03" kicker="Selected Projects" title="Things I’ve" accent="shipped." />
      <div className="projects">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={0.1 * i} y={60}>
            <TiltCard className="project" max={8} style={{ '--h1': p.hue[0], '--h2': p.hue[1] }}>
              <div className="project-top">
                <span className="mono">{p.id}</span>
                <span className="project-kind">{p.kind}</span>
              </div>
              <ProjectVisual p={p} />
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
              <a className="project-link" href={p.link} target="_blank" rel="noopener noreferrer">
                {p.linkLabel} <span>↗</span>
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- SKILLS: draggable 3D tag sphere ---------------- */
function SkillSphere() {
  const wrap = useRef(null)
  const items = useRef([])
  const [radius, setRadius] = useState(220)
  const points = useMemo(() => {
    const n = sphereSkills.length
    return sphereSkills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / n)
      const theta = Math.sqrt(n * Math.PI) * phi
      return [Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi)]
    })
  }, [])

  useEffect(() => {
    const onResize = () => setRadius(Math.min(220, (wrap.current?.offsetWidth || 440) * 0.42))
    onResize()
    addEventListener('resize', onResize)
    return () => removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    let ax = 0.002, ay = 0.004, raf, dragging = false, lx = 0, ly = 0
    const rot = points.map((p) => [...p])
    const el = wrap.current
    const down = (e) => { dragging = true; lx = e.clientX; ly = e.clientY; el.setPointerCapture?.(e.pointerId) }
    const move = (e) => {
      if (dragging) {
        ay = (e.clientX - lx) * 0.0006 * 8
        ax = -(e.clientY - ly) * 0.0006 * 8
        lx = e.clientX; ly = e.clientY
      } else {
        const r = el.getBoundingClientRect()
        ay = ((e.clientX - r.left) / r.width - 0.5) * 0.02
        ax = -((e.clientY - r.top) / r.height - 0.5) * 0.02
      }
    }
    const up = () => { dragging = false }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    addEventListener('pointerup', up)
    const loop = () => {
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay)
      rot.forEach((p, i) => {
        let [x, y, z] = p
        let y1 = y * cx - z * sx
        let z1 = y * sx + z * cx
        let x2 = x * cy + z1 * sy
        let z2 = -x * sy + z1 * cy
        p[0] = x2; p[1] = y1; p[2] = z2
        const node = items.current[i]
        if (node) {
          const scale = (z2 + 2) / 3
          node.style.transform = `translate(-50%, -50%) translate3d(${x2 * radius}px, ${y1 * radius}px, 0) scale(${scale})`
          node.style.opacity = String(0.25 + ((z2 + 1) / 2) * 0.75)
          node.style.zIndex = String(Math.round(scale * 100))
          node.style.filter = z2 < -0.3 ? 'blur(1px)' : 'none'
        }
      })
      if (!dragging) { ax *= 0.98; ay *= 0.98; if (Math.abs(ay) < 0.002) ay = 0.002 }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      removeEventListener('pointerup', up)
    }
  }, [points, radius])

  return (
    <div className="sphere" ref={wrap} data-cursor>
      <div className="sphere-core" />
      {sphereSkills.map((s, i) => (
        <span key={s} ref={(n) => (items.current[i] = n)} className="sphere-item">{s}</span>
      ))}
      <span className="sphere-hint mono">drag to spin</span>
    </div>
  )
}

export function Skills() {
  return (
    <section className="section" id="skills">
      <SectionHead index="04" kicker="Skills" title="My" accent="toolkit." />
      <div className="skills-grid">
        <Reveal><SkillSphere /></Reveal>
        <div className="skill-groups">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={0.08 * i} className="skill-group">
              <h4><span className="mono">0{i + 1}</span> {g.title}</h4>
              <div className="chips">{g.items.map((s) => <span key={s}>{s}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- EDUCATION ---------------- */
export function Education() {
  return (
    <section className="section" id="education">
      <SectionHead index="05" kicker="Education & Strengths" title="Foundations" accent="& wins." />
      <div className="edu-grid">
        {education.map((e, i) => (
          <Reveal key={e.school} delay={0.08 * i}>
            <TiltCard className="edu" max={10}>
              <span className="mono edu-period">{e.period}</span>
              <h3>{e.degree}</h3>
              <p>{e.school}</p>
              <span className="edu-score">{e.score}</span>
            </TiltCard>
          </Reveal>
        ))}
      </div>
      <div className="achievements">
        {achievements.map((a, i) => (
          <Reveal key={a} delay={0.08 * i} className="ach">
            <span className="ach-star">✦</span> {a}
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------------- CONTACT: interactive terminal ---------------- */
const COMMANDS = {
  help: () => ['Available commands:', '  about    — who am I', '  skills   — my stack', '  projects — what I shipped', '  contact  — reach me', '  resume   — download my résumé', '  hire     — 🚀', '  clear    — clear the screen'],
  about: () => [profile.summary],
  skills: () => skillGroups.map((g) => `${g.title.padEnd(24, ' ')}${g.items.join(', ')}`),
  projects: () => projects.map((p) => `${p.id}  ${p.title} — ${p.kind}`),
  contact: () => [`email     ${profile.email}`, `phone     ${profile.phone}`, `linkedin  ${profile.linkedin}`, `github 1  ${profile.githubPersonal}  (personal)`, `github 2  ${profile.githubProfessional}  (professional)`],
  resume: () => {
    const a = document.createElement('a')
    a.href = profile.resume
    a.download = ''
    a.click()
    return ['Downloading Tangudu_Praveen_Kumar_Resume.pdf …']
  },
  hire: () => {
    setTimeout(() => openSheet('mail'), 700)
    return ['✔ Compiling candidate… done', '✔ Tests passing: React, Node, Express, MongoDB', '→ Choose your mail app…']
  },
  sudo: () => ['Nice try 😄 — but you can just say hi: ' + profile.email],
}

function Terminal() {
  const [lines, setLines] = useState([
    { t: 'out', v: 'praveen.dev shell v1.0 — type "help" and press Enter' },
  ])
  const [val, setVal] = useState('')
  const body = useRef(null)
  useEffect(() => {
    body.current?.scrollTo({ top: body.current.scrollHeight, behavior: 'smooth' })
  }, [lines])
  const run = (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (cmd === 'clear') return setLines([])
    const out = COMMANDS[cmd] ? COMMANDS[cmd]() : cmd ? [`command not found: ${cmd} — try "help"`] : []
    setLines((l) => [...l, { t: 'in', v: raw }, ...out.map((v) => ({ t: 'out', v }))])
  }
  return (
    <div className="terminal" onClick={() => body.current?.querySelector('input')?.focus()} data-cursor>
      <div className="term-bar"><i /><i /><i /><span>~/praveen — zsh</span></div>
      <div className="term-body" ref={body}>
        {lines.map((l, i) => (
          <div key={i} className={`term-line ${l.t}`}>
            {l.t === 'in' && <span className="prompt">➜ ~ </span>}{l.v}
          </div>
        ))}
        <form className="term-input" onSubmit={(e) => { e.preventDefault(); run(val); setVal('') }}>
          <span className="prompt">➜ ~ </span>
          <input value={val} onChange={(e) => setVal(e.target.value)} aria-label="Terminal input" spellCheck="false" autoComplete="off" placeholder="help" />
        </form>
      </div>
      <div className="term-quick">
        {['help', 'about', 'skills', 'projects', 'contact', 'hire'].map((c) => (
          <button key={c} type="button" onClick={(e) => { e.stopPropagation(); run(c) }}>{c}</button>
        ))}
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <section className="section contact" id="contact">
      <SectionHead index="06" kicker="Contact" title="Let’s build" accent="something great." />
      <div className="contact-grid">
        <div>
          <Reveal as="p" className="lead">
            Hiring a MERN developer who can own features from UI to database? My inbox is open — or poke the
            terminal.
          </Reveal>
          <Reveal delay={0.1}>
            <button className="big-mail" onClick={() => openSheet('mail')}>
              {profile.email}
              <span className="copy-tip">Click to email · Gmail, Outlook, Zoho</span>
            </button>
          </Reveal>
          <Reveal delay={0.15} className="socials">
            <Magnetic><button type="button" className="btn btn-primary" onClick={() => openSheet('mail')}>Email me →</button></Magnetic>
            <Magnetic><button type="button" className="btn btn-ghost" onClick={() => openSheet('phone')}>{profile.phone}</button></Magnetic>
            <Magnetic><a className="btn btn-ghost" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={profile.githubPersonal} target="_blank" rel="noopener noreferrer">
                <sup className="gh-num">1</sup>GitHub · Personal ↗
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href={profile.githubProfessional} target="_blank" rel="noopener noreferrer">
                <sup className="gh-num">2</sup>GitHub · Professional ↗
              </a>
            </Magnetic>
          </Reveal>
        </div>
        <Reveal delay={0.1}><Terminal /></Reveal>
      </div>
      <ContactSheets />
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-big" aria-hidden="true">PRAVEEN</div>
      <div className="footer-row">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono">Built with React · Three.js · Framer Motion</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  )
}
