/**
 * main.jsx
 *
 * Application entry point.
 * – Imports GSAP plugin registration (side-effect)
 * – Wraps the app in Lenis smooth scroll
 * – Syncs Lenis ↔ GSAP ticker for ScrollTrigger compatibility
 */

import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Side-effect import: registers all GSAP plugins globally */
import './lib/gsapSetup'
import './index.css'
import App from './App.jsx'

/* ── Lenis ↔ GSAP sync wrapper ──────────────────────────── */
function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => gsap.ticker.remove(update)
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
)
