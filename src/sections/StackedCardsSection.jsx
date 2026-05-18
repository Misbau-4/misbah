/**
 * StackedCardsSection.jsx
 *
 * Three overlapping cards with Figma-exact positions.
 *
 * Z-index stacking (front → back, per user spec):
 *   1. Left dark card   (473×384, left:138,    top:89,     rotate(-6.96°))  — z:3 (top)
 *   2. Center white card (598×384, left:288.05, top:134.66, rotate(0°))      — z:2
 *   3. Right card        (473×384, left:629.92, top:152.3,  rotate(6.26°))   — z:1 (back)
 *
 * Interactions:
 *   • Hover  → rotate −4.96° (anticlockwise from current angle) + translateY(+1rem)
 *   • Click  → card lifts to top of stack (centre of section, z:20)
 *   • Mouse  leave (lifted) → returns to original position + rotation
 *   • Scroll reveal → simple fade-in + settle with back.out ease, staggered
 */

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import card1 from '../assets/StackedCard1.png'
import card2 from '../assets/StackedCard2.png'
import card3 from '../assets/StackedCard3.png'

gsap.registerPlugin(ScrollTrigger)

/* ─── Card definitions — ordered by z-index (front to back) ─ */
const CARDS = [
  {
    id:       'left-dark',
    width:    473.04,
    height:   383.81,
    left:     138,
    top:      89,
    rotation: -6.96,      // anticlockwise tilt
    bg:       card1,
    phColor:  '141414/2a2a2a',
    zBase:    3,           // FRONT — on top of all others
  },
  {
    id:       'center-white',
    width:    598.52,
    height:   384.01,
    left:     288.05,
    top:      134.66,
    rotation: 0,
    bg:       card2,
    phColor:  'F0F0F0/DDDDDD',
    zBase:    2,
  },
  {
    id:       'right-card',
    width:    473.04,
    height:   383.81,
    left:     629.92,
    top:      152.3,
    rotation: 6.26,       // clockwise tilt
    bg:       card3,
    phColor:  '7B2FFF/9955FF',
    zBase:    1,           // BACK — behind all others
  },
]

/* ─── Component ─────────────────────────────────────────────── */
export default function StackedCardsSection() {
  const sectionRef = useRef(null)
  const cardRefs   = useRef([])
  /* Per-card lifted flag */
  const liftedRef  = useRef(CARDS.map(() => false))

  const { contextSafe } = useGSAP({ scope: sectionRef })

  /* ── Scroll reveal: cards settle from slight offset ─────── */
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Start slightly offset + invisible */
        gsap.set(cardRefs.current, (i) => ({
          y:       40 + i * 10,
          opacity: 0,
        }))

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   'top 82%',
          once:    true,
          onEnter: () => {
            CARDS.forEach((_, i) => {
              gsap.to(cardRefs.current[i], {
                y:        0,
                opacity:  1,
                duration: 0.75,
                delay:    i * 0.12,
                ease:     'back.out(1.4)',
              })
            })
          },
        })
      })
    },
    { scope: sectionRef }
  )

  /* ── Hover: anticlockwise −4.96° + slide down 1rem ──────── */
  const handleEnter = contextSafe((i) => {
    if (liftedRef.current[i]) return
    gsap.to(cardRefs.current[i], {
      rotation: CARDS[i].rotation - 4.96,
      y:        10,
      duration: 0.35,
      ease:     'power2.out',
    })
  })

  /* ── Mouse leave: either un-hover or return lifted card ──── */
  const handleLeave = contextSafe((i) => {
    if (liftedRef.current[i]) {
      /* Return lifted card to home */
      liftedRef.current[i] = false
      gsap.to(cardRefs.current[i], {
        x:        0,
        y:        0,
        rotation: CARDS[i].rotation,
        scale:    1,
        zIndex:   CARDS[i].zBase,
        duration: 0.65,
        ease:     'power3.out',
      })
    } else {
      /* Un-hover */
      gsap.to(cardRefs.current[i], {
        rotation: CARDS[i].rotation,
        y:        0,
        duration: 0.4,
        ease:     'power3.out',
      })
    }
  })

  /* ── Click: stack on top at section centre ───────────────── */
  const handleClick = contextSafe((i) => {
    if (liftedRef.current[i]) return  // already lifted; leave handles return

    liftedRef.current[i] = true
    const card    = cardRefs.current[i]
    const section = sectionRef.current

    const sR = section.getBoundingClientRect()
    const cR = card.getBoundingClientRect()

    /* Offset needed to centre the card within the section */
    const tx = (sR.width  / 2) - (cR.left - sR.left) - CARDS[i].width  / 2
    const ty = (sR.height / 2) - (cR.top  - sR.top)  - CARDS[i].height / 2

    gsap.to(card, {
      x:        tx,
      y:        ty - 16,
      rotation: 0,
      scale:    1.04,
      zIndex:   20,
      duration: 0.55,
      ease:     'power3.out',
    })
  })

  return (
    <section
      ref={sectionRef}
      id="showcase"
      style={{
        position:   'relative',
        width:      '100%',
        height:     673,
        overflow:   'hidden',
        background: '#FFFFFF',
      }}
    >
      {CARDS.map((card, i) => (
        <div
          key={card.id}
          ref={(el) => (cardRefs.current[i] = el)}
          onMouseEnter={() => handleEnter(i)}
          onMouseLeave={() => handleLeave(i)}
          onClick={() => handleClick(i)}
          style={{
            position:     'absolute',
            boxSizing:    'border-box',
            width:        card.width,
            height:       card.height,
            left:         card.left,
            top:          card.top,
            background:   card.bg,
            borderRadius: 3.83053,
            transform:    `rotate(${card.rotation}deg)`,
            zIndex:       card.zBase,
            cursor:       'pointer',
            overflow:     'hidden',
            willChange:   'transform',
            boxShadow:    'none',
          }}
        >
          <img
            src={card.bg}
            alt=""
            draggable={false}
            style={{
              width:      '100%',
              height:     '100%',
              objectFit:  'cover',
              display:    'block',
              userSelect: 'none',
            }}
          />
        </div>
      ))}
    </section>
  )
}
