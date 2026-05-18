import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import acemyxImg from '../assets/Logo01.png'
import campusXImg from '../assets/Logo02.png'
import fleetKitImg from '../assets/Logo03.png'
import loopRailImg from '../assets/Logo04.png'
import studioneImg from '../assets/Logo05.png'

const BRANDS = [
  { name: 'AcemyX',    src: acemyxImg, fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' },
  { name: 'campusx',   src: campusXImg, fontSize: 26, fontWeight: 400, fontStyle: 'italic'      },
  { name: 'Fleetkit',  src: fleetKitImg, fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' },
  { name: 'Looprail',  src: loopRailImg, fontSize: 26, fontWeight: 400                            },
  { name: 'Studione',  src: studioneImg, fontSize: 27, fontWeight: 400, letterSpacing: '-0.02em' },
]

/* Desktop: 5 slots. Mobile: 3 slots. */
const DESKTOP_SLOT_INDEXES = [0, 1, 2, 3, 4]
const MOBILE_SLOT_INDEXES  = [0, 1, 2]

const DESKTOP_SLOT_CONFIG = [
  { width: 204, padding: '3.9rem 4.8rem' },
  { width: 204, padding: '3.9rem 4.8rem' },
  { width: 204, padding: '3.9rem 4.8rem' },
  { width: 204, padding: '3.9rem 4.8rem' },
  { width: 204, padding: '3.9rem 4.8rem' },
]

const MOBILE_SLOT_CONFIG = [
  { padding: '0 0' },
  { padding: '0 0' },
  { padding: '0 0' },
]

export default function BrandSection() {
  const sectionRef         = useRef(null)
  const desktopSlotRefs    = useRef([])
  const mobileSlotRefs     = useRef([])
  const desktopSlotIndexes = useRef([...DESKTOP_SLOT_INDEXES])
  const mobileSlotIndexes  = useRef([...MOBILE_SLOT_INDEXES])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      /* ── Desktop crossfade ── */
      mm.add('(min-width: 102.4rem) and (prefers-reduced-motion: no-preference)', () => {
        desktopSlotRefs.current.forEach((el, slotIdx) => {
          if (!el) return

          const nextUnusedBrand = () => {
            const inUse = new Set(desktopSlotIndexes.current)
            let next = (desktopSlotIndexes.current[slotIdx] + 1) % BRANDS.length
            let safety = 0
            while (inUse.has(next) && safety < BRANDS.length) {
              next = (next + 1) % BRANDS.length
              safety++
            }
            return next
          }

          const applyBrandStyle = (brand) => {
            if (brand.src) {
              el.innerHTML = `<img src="${brand.src}" alt="${brand.name}" style="height: 3rem; width: auto; object-fit: contain; display: block;" />`
            } else {
              el.style.fontSize      = `${brand.fontSize}px`
              el.style.fontWeight    = brand.fontWeight
              el.style.letterSpacing = brand.letterSpacing || 'normal'
              el.style.fontStyle     = brand.fontStyle || 'normal'
              el.textContent         = brand.name
            }
          }

          const cycle = () => {
            gsap.to(el, {
              autoAlpha: 0, y: -10, duration: 0.45, ease: 'power2.in',
              onComplete: () => {
                const nextIdx = nextUnusedBrand()
                desktopSlotIndexes.current[slotIdx] = nextIdx
                applyBrandStyle(BRANDS[nextIdx])
                gsap.set(el, { y: 10 })
                gsap.to(el, {
                  autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out',
                  onComplete: () => gsap.delayedCall(2.5 + slotIdx * 0.4, cycle),
                })
              },
            })
          }

          gsap.delayedCall(slotIdx * 1.1 + 1.5, cycle)
        })
      })

      /* ── Mobile crossfade (3 slots) ── */
      mm.add('(max-width: 102.3rem) and (prefers-reduced-motion: no-preference)', () => {
        mobileSlotRefs.current.forEach((el, slotIdx) => {
          if (!el) return

          const nextUnusedBrand = () => {
            const inUse = new Set(mobileSlotIndexes.current)
            let next = (mobileSlotIndexes.current[slotIdx] + 1) % BRANDS.length
            let safety = 0
            while (inUse.has(next) && safety < BRANDS.length) {
              next = (next + 1) % BRANDS.length
              safety++
            }
            return next
          }

          const applyBrandStyle = (brand) => {
            if (brand.src) {
              el.innerHTML = `<img src="${brand.src}" alt="${brand.name}" style="height: 2.4rem; width: auto; object-fit: contain; display: block;" />`
            } else {
              const scale = 0.75
              el.style.fontSize      = `${Math.round(brand.fontSize * scale)}px`
              el.style.fontWeight    = brand.fontWeight
              el.style.letterSpacing = brand.letterSpacing || 'normal'
              el.style.fontStyle     = brand.fontStyle || 'normal'
              el.textContent         = brand.name
            }
          }

          const cycle = () => {
            gsap.to(el, {
              autoAlpha: 0, y: -8, duration: 0.4, ease: 'power2.in',
              onComplete: () => {
                const nextIdx = nextUnusedBrand()
                mobileSlotIndexes.current[slotIdx] = nextIdx
                applyBrandStyle(BRANDS[nextIdx])
                gsap.set(el, { y: 8 })
                gsap.to(el, {
                  autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out',
                  onComplete: () => gsap.delayedCall(2 + slotIdx * 0.5, cycle),
                })
              },
            })
          }

          gsap.delayedCall(slotIdx * 0.9 + 1.0, cycle)
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="brands" className="brands-section">

      {/* ── Desktop layout ── */}
      <div className="brands-desktop">
        <div className="brands-header-pill">
          <span className="brands-header-text">Alongside leading brands</span>
        </div>

        <div className="brands-logo-wrap">
          {DESKTOP_SLOT_CONFIG.map((slot, i) => (
            <div key={i} className="brands-slot-desktop" style={{ width: slot.width, padding: slot.padding }}>
              <span
                ref={el => (desktopSlotRefs.current[i] = el)}
                className="brands-slot-text-desktop"
                style={{
                  fontSize:      BRANDS[DESKTOP_SLOT_INDEXES[i]].fontSize,
                  fontWeight:    BRANDS[DESKTOP_SLOT_INDEXES[i]].fontWeight,
                  letterSpacing: BRANDS[DESKTOP_SLOT_INDEXES[i]].letterSpacing || 'normal',
                  fontStyle:     BRANDS[DESKTOP_SLOT_INDEXES[i]].fontStyle || 'normal',
                }}
              >
                {BRANDS[DESKTOP_SLOT_INDEXES[i]].src ? (
                  <img src={BRANDS[DESKTOP_SLOT_INDEXES[i]].src} alt={BRANDS[DESKTOP_SLOT_INDEXES[i]].name} style={{ height: '3rem', width: 'auto', objectFit: 'contain', display: 'block' }} />
                ) : (
                  BRANDS[DESKTOP_SLOT_INDEXES[i]].name
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile layout — 3 brands ── */}
      <div className="brands-mobile">
        <div className="brands-mobile-pill">
          <span className="brands-mobile-pill-text">Alongside leading brands</span>
        </div>

        <div className="brands-mobile-logo-wrap">
          {MOBILE_SLOT_CONFIG.map((slot, i) => (
            <div key={i} className="brands-mobile-slot">
              <span
                ref={el => (mobileSlotRefs.current[i] = el)}
                className="brands-mobile-slot-text"
                style={{
                  fontSize:      Math.round(BRANDS[MOBILE_SLOT_INDEXES[i]].fontSize * 0.75),
                  fontWeight:    BRANDS[MOBILE_SLOT_INDEXES[i]].fontWeight,
                  letterSpacing: BRANDS[MOBILE_SLOT_INDEXES[i]].letterSpacing || 'normal',
                  fontStyle:     BRANDS[MOBILE_SLOT_INDEXES[i]].fontStyle || 'normal',
                }}
              >
                {BRANDS[MOBILE_SLOT_INDEXES[i]].src ? (
                  <img src={BRANDS[MOBILE_SLOT_INDEXES[i]].src} alt={BRANDS[MOBILE_SLOT_INDEXES[i]].name} style={{ height: '2.4rem', width: 'auto', objectFit: 'contain', display: 'block' }} />
                ) : (
                  BRANDS[MOBILE_SLOT_INDEXES[i]].name
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .brands-section {
          width: 100%;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .brands-mobile { display: none !important; }

          .brands-desktop {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 3.2rem 2.1rem 9.4rem;
            gap: 3.2rem;
            width: 100%;
          }

          .brands-header-pill {
            display: flex; justify-content: center; align-items: center;
            padding: 1rem; gap: 1rem;
            width: 31.5rem; height: 4.9rem;
            background: #F7F7F7; flex-shrink: 0;
          }
          .brands-header-text {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 1.2;
            color: #131313;
          }

          .brands-logo-wrap {
            display: flex; flex-direction: row; align-items: center;
            padding: 0; gap: 4.8rem;
            width: min(123.8rem, 100%);
            height: 10rem; flex-shrink: 0;
            mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          }
          .brands-slot-desktop {
            display: flex; flex-direction: column;
            align-items: flex-start;
            gap: 1rem; height: 10rem;
            border-radius: 4.8rem; flex-shrink: 0; overflow: hidden;
            box-sizing: border-box;
          }
          .brands-slot-text-desktop {
            font-family: var(--font-custom-xh);
            line-height: 1; color: #131313;
            display: block; white-space: nowrap;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .brands-desktop { display: none !important; }

          .brands-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 1.6rem 4.8rem;
            gap: 3rem;
            width: 100%;
            box-sizing: border-box;
          }

          /* Header pill — Figma: 168×34 */
          .brands-mobile-pill {
            display: flex; justify-content: center; align-items: center;
            padding: 1rem;
            width: clamp(14rem, 45vw, 16.8rem);
            height: 3.4rem;
            background: #F7F7F7;
          }
          .brands-mobile-pill-text {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(1rem, 3vw, 1.2rem);
            line-height: 1.4rem;
            color: #131313;
            white-space: nowrap;
          }

          /* Logo wrap — Figma: 343×61, 3 slots */
          .brands-mobile-logo-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: clamp(1.6rem, 5vw, 2.4rem);
            width: 100%;
            max-width: 34.3rem;
            height: 6.1rem;
          }
          .brands-mobile-slot {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            flex: 1;
            height: 6.1rem;
            overflow: hidden;
            padding: 1.6rem 1.6rem;
          }
          .brands-mobile-slot-text {
            font-family: var(--font-custom-xh);
            line-height: 1;
            color: #131313;
            display: block;
            white-space: nowrap;
            font-size: clamp(1.4rem, 3.5vw, 2rem) !important;
          }
        }

        /* Tablets (600–1023): slightly larger text */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .brands-mobile-logo-wrap {
            max-width: clamp(34.3rem, 70vw, 56rem);
          }
        }
      `}</style>
    </section>
  )
}
