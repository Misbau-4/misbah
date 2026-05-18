/**
 * ColorCardsSection.jsx
 *
 * A section featuring three colored square cards inside a grey container.
 * Includes a smooth GSAP hover bounce animation.
 */

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function ColorCardsSection() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  const { contextSafe } = useGSAP({ scope: sectionRef })

  /* ── Hover Animations ── */
  const handleMouseEnter = contextSafe((i) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(cardRefs.current[i], {
      y: -30,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    })
  })

  const handleMouseLeave = contextSafe((i) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.to(cardRefs.current[i], {
      y: 0,
      duration: 0.6,
      ease: 'bounce.out',
    })
  })

  const CARDS = [
    { id: 0, color: '#7EC9FF' },
    { id: 1, color: '#C5A9F2' },
    { id: 2, color: '#C5A9F2' },
  ]

  return (
    <section
      ref={sectionRef}
      id="color-cards"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 542,
        background: '#FFFFFF',
        marginBottom: 80,
      }}
    >
      {/* Content Container (120rem total width based on padding/gap/card logic) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '8.9rem 16rem',
          gap: 98,
          background: '#ECEAED',
          width: 1200,
          height: 406,
          boxSizing: 'border-box',
        }}
      >
        {CARDS.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => (cardRefs.current[i] = el)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{
              width: 228,
              height: 228,
              background: card.color,
              flex: 'none',
              cursor: 'pointer',
              willChange: 'transform',
            }}
          />
        ))}
      </div>
    </section>
  )
}
