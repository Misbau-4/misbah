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
        {/* Header block: gap 20px, heading 22px, desc 16px */}
        <div ref={headerRef} className="dp-mobile-header">
          <h2 className="dp-mobile-heading">How I actually think when I design</h2>
          <p className="dp-mobile-desc">
            Most designers open Figma first. I don't. I start with what's broken and I
            don't stop until it's shipped. Here's what working with me actually looks like.
          </p>
        </div>

        {/* Steps — bordered rows, 56px tall, 14px text */}
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
        /* DESKTOP (≥ 1024px)                           */
        /* ============================================= */
        @media (min-width: 1024px) {
          .dp-mobile  { display: none !important; }

          .dp-desktop {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: clamp(48px, 6vw, 84px) clamp(24px, 3vw, 40px) clamp(60px, 9vw, 120px);
            gap: 64px;
          }

          .dp-header {
            display: flex; flex-direction: column;
            align-items: flex-start; padding: 0; gap: 32px;
            width: clamp(480px, 65vw, 782px);
          }
          .dp-heading {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(28px, 2.8vw, 40px);
            line-height: 120%; letter-spacing: -0.01em;
            color: #131313; margin: 0;
          }
          .dp-subtext {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 120%; color: #222222; margin: 0;
          }

          .dp-rows {
            display: flex; flex-direction: column;
            align-items: flex-start; padding: 0; gap: 18px; width: 100%;
          }
          .dp-row {
            box-sizing: border-box;
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: center;
            padding: 1px 34px;
            width: 100%; height: 93px;
            border: 1px solid #E9E9E9;
          }
          .dp-row-left {
            display: flex; flex-direction: row;
            align-items: center; gap: 24px; flex: 1;
          }
          .dp-row-inner {
            display: flex; flex-direction: row;
            align-items: center; gap: clamp(24px, 8vw, 127px); flex: 1;
          }
          .dp-num {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 120%; color: #131313;
            flex-shrink: 0; min-width: 23px;
          }
          .dp-title {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(16px, 1.5vw, 24px);
            line-height: 120%; color: #131313; flex: 1;
          }
          .dp-divider {
            width: 0; height: 91px;
            border-left: 1px solid rgba(233, 233, 233, 0.99);
            flex-shrink: 0;
          }
          .dp-icon { flex-shrink: 0; }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 1024px)                   */
        /* ============================================= */
        @media (max-width: 1023px) {
          .dp-desktop { display: none !important; }

          /* Figma: padding 48px 16px, gap 16px, align-items flex-end */
          .dp-mobile {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            padding: clamp(32px, 8vw, 48px) 16px;
            gap: 16px;
            width: 100%;
            box-sizing: border-box;
          }

          /* Header: gap 20px */
          .dp-mobile-header {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 20px;
            width: 100%;
          }

          /* Heading: Haffer XH-TRIAL 22px, line-height 26px */
          .dp-mobile-heading {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(20px, 5.5vw, 22px);
            line-height: 26px; letter-spacing: -0.01em;
            color: #131313; margin: 0;
            width: 100%;
          }

          /* Description: Haffer-TRIAL 16px, line-height 140% */
          .dp-mobile-desc {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(14px, 4vw, 16px);
            line-height: 140%; color: #222222; margin: 0;
            width: 100%;
          }

          /* Steps container: gap 12px */
          .dp-mobile-steps {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 12px;
            width: 100%;
          }

          /* Each step: 56px tall, bordered, padding 8px 12px 8px 18px */
          .dp-mobile-step {
            box-sizing: border-box;
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: center;
            padding: 8px 12px 8px 18px;
            width: 100%; min-height: 56px;
            border: 1px solid #E9E9E9;
            flex-shrink: 0;
          }

          /* Step text: Haffer-TRIAL 14px */
          .dp-mobile-step-text {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(13px, 3.7vw, 14px);
            line-height: 120%; color: #131313; flex: 1;
          }
        }

        /* Tablets: slightly larger step text */
        @media (min-width: 600px) and (max-width: 1023px) {
          .dp-mobile {
            padding-left: clamp(16px, 5vw, 40px);
            padding-right: clamp(16px, 5vw, 40px);
          }
          .dp-mobile-heading { font-size: clamp(20px, 3.5vw, 26px); }
          .dp-mobile-step-text { font-size: 15px; }
        }
      `}</style>
    </section>
  )
}
