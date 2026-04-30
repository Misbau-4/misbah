/**
 * Navbar.jsx
 *
 * Section: Navigation
 * Animation: GSAP — Directionally-aware entrance animation.
 *            Nav children stagger-slide in from the top on mount.
 *            Uses useGSAP() for automatic cleanup + gsap.matchMedia()
 *            for prefers-reduced-motion accessibility.
 * Clock: live UTC/GMT, updates every second via setInterval.
 * Responsive:
 *   mobile  (<640px)  — name only on left, icon + links on right;
 *                        clock hidden to avoid overflow.
 *   tablet  (640-1023) — name + clock on left, links + icon right.
 *   desktop (1024px+)  — same as tablet with wider horizontal padding.
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Container from '../components/Container'

/* ── Sparkle / 4-pointed star SVG (matches Figma icon) ────── */
function SparkleIcon({ className = '' }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/*
        A classic 4-pointed star (✦ shape):
        top, right, bottom, left points meeting at centre.
      */}
      <path
        d="M9 0 C9 0 9.6 5.4 9 9 C8.4 12.6 9 18 9 18
           C9 18 8.4 12.6 9 9 C9.6 5.4 9 0 9 0Z"
        fill="currentColor"
      />
      <path
        d="M0 9 C0 9 5.4 9.6 9 9 C12.6 8.4 18 9 18 9
           C18 9 12.6 8.4 9 9 C5.4 9.6 0 9 0 9Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ── Live GMT clock hook ────────────────────────────────────── */
function useGMTClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const hh = now.getUTCHours().toString().padStart(2, '0')
      const mm = now.getUTCMinutes().toString().padStart(2, '0')
      setTime(`${hh}:${mm} GMT`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

/* ── Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const navRef = useRef(null)
  const time = useGMTClock()

  /* ── Directionally-aware entrance animation via useGSAP ─── */
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* Stagger each nav child from the top */
      const children = navRef.current?.querySelectorAll(
        '#nav-identity, #nav-links > *'
      )
      if (!children?.length) return

      gsap.set(navRef.current, { opacity: 1 })

      gsap.from(children, {
        y: -32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      })
    })

    /* Reduced motion: just show instantly */
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(navRef.current, { opacity: 1 })
    })
  }, { scope: navRef })

  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'About', href: '#about' },
  ]

  return (
    <header
      ref={navRef}
      role="banner"
      className={[
        /* Full-width fixed bar — bg spans edge-to-edge */
        'navbar',
        'fixed top-0 left-0 right-0 z-50',
        'bg-white opacity-0',
      ].join(' ')}
    >
      {/* Inner row — capped at 1280px, carries the padding */}
      <Container className="navbar-inner flex items-center justify-between">
      {/* ── Left: name + clock ─────────────────────────────── */}
      <div
        id="nav-identity"
        className="flex items-center gap-0 text-[13px] sm:text-sm font-normal tracking-tight text-[#0d0d0d] select-none whitespace-nowrap"
      >
        <span className="font-medium">Musbaudeen</span>

        {/* Clock: hidden on mobile to prevent overflow */}
        <span className="hidden sm:inline text-[#0d0d0d]">
          &nbsp;|&nbsp;{time}
        </span>
      </div>

      {/* ── Right: nav links + sparkle ──────────────────────── */}
      <nav
        id="nav-links"
        aria-label="Primary navigation"
        className="flex items-center gap-5 sm:gap-7"
      >
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={[
              'text-[13px] sm:text-sm font-normal text-[#0d0d0d]',
              'relative after:absolute after:left-0 after:bottom-0',
              'after:h-px after:w-0 after:bg-[#0d0d0d]',
              'after:transition-[width] after:duration-300',
              'hover:after:w-full',
              'transition-opacity duration-200 hover:opacity-70',
            ].join(' ')}
          >
            {label}
          </a>
        ))}

        {/* Sparkle icon — subtle spin on hover via CSS */}
        <button
          id="nav-sparkle"
          aria-label="Menu or theme toggle"
          className="flex items-center justify-center text-[#0d0d0d] transition-transform duration-500 hover:rotate-90 cursor-pointer"
        >
          <SparkleIcon />
        </button>
      </nav>
      </Container>
    </header>
  )
}
