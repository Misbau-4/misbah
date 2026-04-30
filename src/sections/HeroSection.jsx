/**
 * HeroSection.jsx
 *
 * Section : First / Hero
 * Layout  : Two-line headline — dark words + muted gray highlight words
 * Font    : Haffer XH-TRIAL, 80px, weight 400 (with DM Sans fallback)
 * Spacing : margin-top 109px, margin-left 188px (desktop — exact Figma)
 *
 * Animation: GSAP Cursor Tracking Image Preview
 * ─────────────────────────────────────────────
 * Uses gsap.quickTo() for buttery-smooth mouse tracking (avoids
 * re-creating tweens on every mousemove). A floating preview card
 * appears when hovering the muted words ("Worthless", "Invisible"),
 * centred on the cursor with a slight lag & scale spring.
 *
 * On touch devices the preview is disabled entirely (no hover state).
 */

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import Container from '../components/Container'
import preview1 from '../assets/preview-1.png'
import preview2 from '../assets/preview-2.png'

/* ── word definitions ────────────────────────────────────── */
const WORDS = [
  { id: 'worthless', label: 'Worthless', src: preview1 },
  { id: 'invisible', label: 'Invisible',  src: preview2 },
]

/* ── HeroSection ─────────────────────────────────────────── */
export default function HeroSection() {
  const previewRef  = useRef(null)       // the floating preview card
  const imgRef      = useRef(null)       // <img> inside the card
  const xTo         = useRef(null)       // gsap.quickTo x
  const yTo         = useRef(null)       // gsap.quickTo y
  const visible     = useRef(false)      // track visibility to avoid redundant tweens
  const [src, setSrc] = useState(WORDS[0].src)

  /* ── Setup: quickTo trackers + global mousemove ───────── */
  useEffect(() => {
    const el = previewRef.current

    /* Set start state: hidden, centred on cursor via xPercent/yPercent */
    gsap.set(el, {
      xPercent: -50,
      yPercent: -50,
      scale: 0.85,
      opacity: 0,
      x: window.innerWidth  / 2,
      y: window.innerHeight / 2,
    })

    /* quickTo — smooth follow with power3 ease */
    xTo.current = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
    yTo.current = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })

    const onMouseMove = (e) => {
      xTo.current(e.clientX)
      yTo.current(e.clientY)
    }

    /* Only attach on non-touch devices */
    const isTouch = window.matchMedia('(hover: none)').matches
    if (!isTouch) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
    }

    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  /* ── Show preview ─────────────────────────────────────── */
  const showPreview = (imageSrc) => {
    setSrc(imageSrc)
    visible.current = true
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  /* ── Hide preview ─────────────────────────────────────── */
  const hidePreview = () => {
    visible.current = false
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.3,
      ease: 'power2.in',
    })
  }

  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] -mt-[55px] sm:-mt-[80px] lg:-mt-[64px] flex flex-col justify-center"
      /* overflow-x hidden so the preview card never makes a scrollbar */
      style={{ overflowX: 'clip' }}
      onMouseLeave={hidePreview}
    >
      {/* ── Floating cursor-tracking preview card ────────── */}
      <div
        ref={previewRef}
        className="
          fixed top-0 left-0 z-[200]
          pointer-events-none will-change-transform
          overflow-hidden shadow-2xl
        "
        style={{ width: 252, height: 176, borderRadius: '1.76px' }}
      >
        <img
          ref={imgRef}
          src={src}
          alt="Project preview"
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* ── Container keeps headline within 1280px ───────── */}
      <Container>
        <h1
          className="hero-text font-normal"
          style={{
            fontFamily: "'Haffer XH-TRIAL', 'DM Sans', 'Inter', system-ui, sans-serif",
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
            color: '#0d0d0d',
          }}
          onMouseLeave={hidePreview}
        >
          {/* Line 1 */}
          <span>Great Features are </span>
          <HoverWord word={WORDS[0]} onEnter={showPreview} onLeave={hidePreview} />

          <br />

          {/* Line 2 */}
          <span>If they&rsquo;re </span>
          <HoverWord word={WORDS[1]} onEnter={showPreview} onLeave={hidePreview} />
          <span style={{ color: '#0d0d0d' }}>.</span>
        </h1>
      </Container>
    </section>
  )
}

/* ── HoverWord sub-component ─────────────────────────────── */
function HoverWord({ word, onEnter, onLeave }) {
  return (
    <span
      className="cursor-none select-none"
      style={{
        color: '#b0b0b0',       /* muted gray — matches Figma */
        transition: 'color 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#888'
        onEnter(word.src)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#b0b0b0'
        onLeave()
      }}
    >
      {word.label}
    </span>
  )
}
