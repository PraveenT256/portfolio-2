import { Suspense, lazy, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { scrollStore } from './scrollStore'
import { Cursor, Nav, Preloader } from './components/Chrome'
import { About, Contact, Education, Experience, Footer, Hero, Marquee, Projects, Skills } from './components/Sections'

const Scene = lazy(() => import('./components/Scene'))

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduce ? null : new Lenis({ lerp: 0.09, smoothWheel: true })
    let raf
    let last = window.scrollY
    const loop = (t) => {
      lenis?.raf(t)
      const y = window.scrollY
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollStore.progress = max > 0 ? y / max : 0
      scrollStore.velocity = scrollStore.velocity * 0.85 + (y - last) * 0.15
      last = y
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Smooth anchor jumps through Lenis
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const target = document.querySelector(a.getAttribute('href'))
      if (!target) return
      e.preventDefault()
      lenis ? lenis.scrollTo(target, { offset: -20, duration: 1.4 }) : target.scrollIntoView()
    }
    const onMouse = (e) => {
      scrollStore.mouseX = (e.clientX / innerWidth) * 2 - 1
      scrollStore.mouseY = (e.clientY / innerHeight) * 2 - 1
    }
    document.addEventListener('click', onClick)
    addEventListener('mousemove', onMouse)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      document.removeEventListener('click', onClick)
      removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <Nav />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
