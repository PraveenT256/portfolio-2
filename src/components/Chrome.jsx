import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { profile } from '../data'

export function Preloader({ onDone }) {
  const [n, setN] = useState(0)
  const [show, setShow] = useState(true)
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / 1700, 1)
      setN(Math.round(100 * (1 - Math.pow(1 - t, 3))))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setTimeout(() => setShow(false), 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div
          className="preloader"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="pre-top">
            <span>{profile.name}</span>
            <span>booting the stack</span>
          </div>
          <div className="pre-stack">
            {['MongoDB', 'Express', 'React', 'Node'].map((w, i) => (
              <span key={w} className={n > i * 25 ? 'on' : ''}>{w}</span>
            ))}
          </div>
          <div className="pre-count">{String(n).padStart(3, '0')}</div>
          <div className="pre-bar"><span style={{ width: `${n}%` }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hover, setHover] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf
    const move = (e) => {
      x = e.clientX
      y = e.clientY
      const t = e.target.closest?.('a, button, .tilt, [data-cursor]')
      setHover(!!t)
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('mousemove', move)
    loop()
    document.documentElement.classList.add('has-cursor')
    return () => {
      removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
    }
  }, [])
  return (
    <>
      <div ref={ring} className={`cursor-ring ${hover ? 'hover' : ''}`} />
      <div ref={dot} className="cursor-dot" />
    </>
  )
}

const links = [
  ['About', '#about'],
  ['Work', '#experience'],
  ['Projects', '#projects'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

export function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState('')
  useEffect(() => {
    const f = () =>
      setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' }))
    f()
    const id = setInterval(f, 30000)
    return () => clearInterval(id)
  }, [])
  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <header className="nav">
        <a href="#top" className="logo" aria-label="Back to top">
          <span className="logo-mark"><img src="./profile-icon.jpg" alt="" /></span>
          <span className="logo-text">{profile.name}</span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([l, h], i) => (
            <a key={h} href={h} onClick={() => setOpen(false)}>
              <sup>0{i + 1}</sup>{l}
            </a>
          ))}
          <a className="nav-resume-mobile" href={profile.resume} download onClick={() => setOpen(false)}>
            <sup>↓</sup>Résumé
          </a>
        </nav>
        <div className="nav-right">
          <span className="nav-time">IST {time}</span>
          <a className="btn btn-small" href={profile.resume} download>Résumé ↓</a>
          <button className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </header>
    </>
  )
}
