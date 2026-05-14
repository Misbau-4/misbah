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
  { width: 204, padding: '39px 48px' },
  { width: 204, padding: '39px 48px' },
  { width: 204, padding: '39px 48px' },
  { width: 204, padding: '39px 48px' },
  { width: 204, padding: '39px 48px' },
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
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
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
              el.innerHTML = `<img src="${brand.src}" alt="${brand.name}" style="height: 30px; width: auto; object-fit: contain; display: block;" />`
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
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
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
              el.innerHTML = `<img src="${brand.src}" alt="${brand.name}" style="height: 24px; width: auto; object-fit: contain; display: block;" />`
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
                  <img src={BRANDS[DESKTOP_SLOT_INDEXES[i]].src} alt={BRANDS[DESKTOP_SLOT_INDEXES[i]].name} style={{ height: '30px', width: 'auto', objectFit: 'contain', display: 'block' }} />
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
                  <img src={BRANDS[MOBILE_SLOT_INDEXES[i]].src} alt={BRANDS[MOBILE_SLOT_INDEXES[i]].name} style={{ height: '24px', width: 'auto', objectFit: 'contain', display: 'block' }} />
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
        /* DESKTOP (≥ 1024px)                           */
        /* ============================================= */
        @media (min-width: 1024px) {
          .brands-mobile { display: none !important; }

          .brands-desktop {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 32px 21px 94px;
            gap: 32px;
            width: 100%;
          }

          .brands-header-pill {
            display: flex; justify-content: center; align-items: center;
            padding: 10px; gap: 10px;
            width: 315px; height: 49px;
            background: #F7F7F7; flex-shrink: 0;
          }
          .brands-header-text {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 120%;
            color: #131313;
          }

          .brands-logo-wrap {
            display: flex; flex-direction: row; align-items: center;
            padding: 0; gap: 48px;
            width: min(1238px, 100%);
            height: 100px; flex-shrink: 0;
            mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
          }
          .brands-slot-desktop {
            display: flex; flex-direction: column;
            align-items: flex-start;
            gap: 10px; height: 100px;
            border-radius: 48px; flex-shrink: 0; overflow: hidden;
            box-sizing: border-box;
          }
          .brands-slot-text-desktop {
            font-family: 'Haffer XH-TRIAL', 'Haffer-TRIAL', sans-serif;
            line-height: 1; color: #131313;
            display: block; white-space: nowrap;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 1024px)                   */
        /* ============================================= */
        @media (max-width: 1023px) {
          .brands-desktop { display: none !important; }

          .brands-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 16px 48px;
            gap: 30px;
            width: 100%;
            box-sizing: border-box;
          }

          /* Header pill — Figma: 168×34 */
          .brands-mobile-pill {
            display: flex; justify-content: center; align-items: center;
            padding: 10px;
            width: clamp(140px, 45vw, 168px);
            height: 34px;
            background: #F7F7F7;
          }
          .brands-mobile-pill-text {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(10px, 3vw, 12px);
            line-height: 14px;
            color: #131313;
            white-space: nowrap;
          }

          /* Logo wrap — Figma: 343×61, 3 slots */
          .brands-mobile-logo-wrap {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: clamp(16px, 5vw, 24px);
            width: 100%;
            max-width: 343px;
            height: 61px;
          }
          .brands-mobile-slot {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            flex: 1;
            height: 61px;
            overflow: hidden;
            padding: 16px 16px;
          }
          .brands-mobile-slot-text {
            font-family: 'Haffer XH-TRIAL', 'Haffer-TRIAL', sans-serif;
            line-height: 1;
            color: #131313;
            display: block;
            white-space: nowrap;
            font-size: clamp(14px, 3.5vw, 20px) !important;
          }
        }

        /* Tablets (600–1023): slightly larger text */
        @media (min-width: 600px) and (max-width: 1023px) {
          .brands-mobile-logo-wrap {
            max-width: clamp(343px, 70vw, 560px);
          }
        }
      `}</style>
    </section>
  )
}
