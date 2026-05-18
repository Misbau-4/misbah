import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  { num: '1.', title: 'Get to the real problem, not just what you told me', icon: 'bulb'  },
  { num: '2.', title: "Define what we're actually trying to solve",           icon: 'arrow' },
  { num: '3.', title: 'Try multiple directions before locking in',            icon: 'arrow' },
  { num: '4.', title: 'Build the structure first, make it pretty later',      icon: 'arrow' },
  { num: '5.', title: 'Test it with real people, then act on what they say',  icon: 'arrow' },
  { num: '6.', title: 'Ship it — design to live product',                     icon: 'arrow' },
]

function BulbIcon({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="20" r="10" stroke="#000000" strokeWidth="2" fill="none" />
      <path d="M20 33 h8" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
      <path d="M21 37 h6" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ArrowIcon({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <line x1="8" y1="20" x2="32" y2="20" stroke="#000000" strokeWidth="1.5" />
      <polyline points="22,12 32,20 22,28" fill="none" stroke="#000000" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function DesignProcessSection() {
  const sectionRef = useRef(null)
  const rowRefs    = useRef([])
  const headerRef  = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(headerRef.current, {
          opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        })
        gsap.from(rowRefs.current, {
          opacity: 0, y: 32, duration: 0.55, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="design-process" className="dp-section">

      {/* ── Desktop layout ── */}
      <div className="dp-desktop">
        <div ref={headerRef} className="dp-header">
          <h2 className="dp-heading">How I actually think when I design</h2>
          <p className="dp-subtext">
            Most designers open Figma first. I don't. I start with what's broken and I
            don't stop until it's shipped. Here's what working with me actually looks like.
          </p>
        </div>

        <div className="dp-rows">
          {STEPS.map((step, i) => (
            <div key={step.num} ref={el => (rowRefs.current[i] = el)} className="dp-row">
              <div className="dp-row-left">
                <div className="dp-row-inner">
                  <span className="dp-num">{step.num}</span>
                  <span className="dp-title">{step.title}</span>
                </div>
                <div className="dp-divider" aria-hidden="true" />
              </div>
              <div className="dp-icon">
                {step.icon === 'bulb' ? <BulbIcon /> : <ArrowIcon />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile layout — Figma spec ── */}
      <div className="dp-mobile">
        {/* Header block: gap 2rem, heading 2.2rem, desc 1.6rem */}
        <div ref={headerRef} className="dp-mobile-header">
          <h2 className="dp-mobile-heading">How I actually think when I design</h2>
          <p className="dp-mobile-desc">
            Most designers open Figma first. I don't. I start with what's broken and I
            don't stop until it's shipped. Here's what working with me actually looks like.
          </p>
        </div>

        {/* Steps — bordered rows, 5.6rem tall, 1.4rem text */}
        <div className="dp-mobile-steps">
          {STEPS.map((step, i) => (
            <div key={step.num} ref={el => (rowRefs.current[i] = el)} className="dp-mobile-step">
              <span className="dp-mobile-step-text">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .dp-section {
          width: 100%;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .dp-mobile  { display: none !important; }

          .dp-desktop {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: clamp(4.8rem, 6vw, 8.4rem) clamp(2.4rem, 3vw, 4rem) clamp(6rem, 9vw, 12rem);
            gap: 6.4rem;
          }

          .dp-header {
            display: flex; flex-direction: column;
            align-items: flex-start; padding: 0; gap: 3.2rem;
            width: clamp(48rem, 65vw, 78.2rem);
          }
          .dp-heading {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(2.8rem, 2.8vw, 4rem);
            line-height: 1.2; letter-spacing: -0.01em;
            color: #131313; margin: 0;
          }
          .dp-subtext {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 1.2; color: #222222; margin: 0;
          }

          .dp-rows {
            display: flex; flex-direction: column;
            align-items: flex-start; padding: 0; gap: 1.8rem; width: 100%;
          }
          .dp-row {
            box-sizing: border-box;
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: center;
            padding: 1px 3.4rem;
            width: 100%; height: 9.3rem;
            border: 1px solid #E9E9E9;
          }
          .dp-row-left {
            display: flex; flex-direction: row;
            align-items: center; gap: 2.4rem; flex: 1;
          }
          .dp-row-inner {
            display: flex; flex-direction: row;
            align-items: center; gap: clamp(2.4rem, 8vw, 12.7rem); flex: 1;
          }
          .dp-num {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 1.2; color: #131313;
            flex-shrink: 0; min-width: 2.3rem;
          }
          .dp-title {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.6rem, 1.5vw, 2.4rem);
            line-height: 1.2; color: #131313; flex: 1;
          }
          .dp-divider {
            width: 0; height: 9.1rem;
            border-left: 1px solid rgba(233, 233, 233, 0.99);
            flex-shrink: 0;
          }
          .dp-icon { flex-shrink: 0; }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .dp-desktop { display: none !important; }

          /* Figma: padding 4.8rem 1.6rem, gap 1.6rem, align-items flex-end */
          .dp-mobile {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: clamp(3.2rem, 8vw, 4.8rem) 1.6rem;
            gap: 1.6rem;
            width: 100%;
            box-sizing: border-box;
          }

          /* Header: gap 2rem */
          .dp-mobile-header {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 2rem;
            width: 100%;
          }

          /* Heading: Haffer XH-TRIAL 2.2rem, line-height 2.6rem */
          .dp-mobile-heading {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(2rem, 5.5vw, 2.2rem);
            line-height: 2.6rem; letter-spacing: -0.01em;
            color: #131313; margin: 0;
            width: 100%;
          }

          /* Description: Haffer-TRIAL 1.6rem, line-height 140% */
          .dp-mobile-desc {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.4rem, 4vw, 1.6rem);
            line-height: 1.4; color: #222222; margin: 0;
            width: 100%;
          }

          /* Steps container: gap 1.2rem */
          .dp-mobile-steps {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 1.2rem;
            width: 100%;
          }

          /* Each step: 5.6rem tall, bordered, padding 0.8rem 1.2rem 0.8rem 1.8rem */
          .dp-mobile-step {
            box-sizing: border-box;
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: center;
            padding: 0.8rem 1.2rem 0.8rem 1.8rem;
            width: 100%; min-height: 5.6rem;
            border: 1px solid #E9E9E9;
            flex-shrink: 0;
          }

          /* Step text: Haffer-TRIAL 1.4rem */
          .dp-mobile-step-text {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.3rem, 3.7vw, 1.4rem);
            line-height: 1.2; color: #131313; flex: 1;
          }
        }

        /* Tablets: slightly larger step text */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .dp-mobile {
            padding-left: clamp(1.6rem, 5vw, 4rem);
            padding-right: clamp(1.6rem, 5vw, 4rem);
          }
          .dp-mobile-heading { font-size: clamp(2rem, 3.5vw, 2.6rem); }
          .dp-mobile-step-text { font-size: 1.5rem; }
        }
      `}</style>
    </section>
  )
}
