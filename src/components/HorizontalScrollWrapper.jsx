/**
 * HorizontalScrollWrapper.jsx
 *
 * Wraps Hero + About sections into a horizontal scroll "section pinning"
 * container. On desktop, scrolling vertically slides panels horizontally.
 * On tablet/mobile or with reduced motion, panels stack vertically.
 *
 * Technique: ScrollTrigger.pin() + gsap.to(xPercent) — the same pattern
 * used on gsap.com for their side-scrolling sections.
 */

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import HeroSection  from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'

export default function HorizontalScrollWrapper() {
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    /* ── Desktop: horizontal scroll with pinning ─────────── */
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
      () => {
        const panels = gsap.utils.toArray('.panel', containerRef.current)

        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => '+=' + containerRef.current.offsetWidth,
            invalidateOnRefresh: true,
          },
        })
      }
    )

    /* ── Tablet / Mobile / Reduced-motion: vertical stack ── */
    mm.add(
      '(max-width: 1023px), (prefers-reduced-motion: reduce)',
      () => {
        /* Remove horizontal layout — panels stack naturally */
        if (containerRef.current) {
          containerRef.current.style.width = '100%'
          containerRef.current.style.flexDirection = 'column'
        }
        const panels = containerRef.current?.querySelectorAll('.panel')
        panels?.forEach((p) => {
          p.style.width = '100%'
        })
      }
    )
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      <div ref={containerRef} className="horizontal-scroll-wrapper">
        {/* Panel 1: Hero */}
        <div className="panel">
          <HeroSection />
        </div>

        {/* Panel 2: About */}
        <div className="panel">
          <AboutSection />
        </div>
      </div>
    </div>
  )
}
