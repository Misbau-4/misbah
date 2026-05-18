import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DATA = {
  intro: "Every project I take on gets built with this stack. It's how I stay consistent, move quickly, and deliver something real, not just something that looks good in a deck.",
  sections: [
    {
      title: 'Design',
      description: 'This is where the idea gets its first real shape. Not pretty screens, actual decisions about how people move through your product.',
      tools: ['Figma', 'Spline', 'Framer', 'Jitter'],
    },
    {
      title: 'Development',
      description: "Then we build it. Clean, fast, and close enough to the design that your users can't tell where one ends and the other begins.",
      tools: ['React', 'AntiGravity', 'Claude AI', 'GSAP', 'Motion.dev', 'VSCode'],
    },
  ],
}

export default function ToolStackSection() {
  const sectionRef   = useRef(null)
  const containerRef = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.tool-stack-intro', {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        })
        gsap.from('.tool-stack-row', {
          y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: containerRef.current, start: 'top 75%', once: true },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="tool-stack" className="ts-section">

      {/* ── Desktop ── */}
      <div className="ts-desktop">
        <div ref={containerRef} className="ts-container">
          <p className="tool-stack-intro ts-intro">{DATA.intro}</p>

          {DATA.sections.map((section) => (
            <div key={section.title} className="tool-stack-row ts-row">
              <span className="ts-title">{section.title}</span>

              <div className="ts-details">
                <p className="ts-desc">{section.description}</p>

                <div className="ts-tools-grid">
                  {section.tools.map((tool, i) => (
                    <span key={`${tool}-${i}`} className="ts-tool">{tool}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile — Figma: col, gap 4.8rem ── */}
      <div className="ts-mobile">
        {/* Intro: 1.6rem */}
        <p className="tool-stack-intro ts-mobile-intro">{DATA.intro}</p>

        {/* Tool sections */}
        {DATA.sections.map((section) => (
          <div key={section.title} className="ts-mobile-section">
            {/* Section title: 1.8rem */}
            <span className="ts-mobile-section-title">{section.title}</span>

            {/* Details: gap 2.4rem */}
            <div className="ts-mobile-details">
              {/* Description: 1.6rem, line-height 120% */}
              <p className="ts-mobile-desc">{section.description}</p>

              {/* Tools grid: 3-col, 1.6rem muted */}
              <div className="ts-mobile-tools">
                {section.tools.map((tool, i) => (
                  <span key={`${tool}-${i}`} className="ts-mobile-tool">{tool}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .ts-section {
          width: 100%;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .ts-mobile  { display: none !important; }

          .ts-desktop {
            display: flex; flex-direction: column;
            align-items: center;
            padding: clamp(6rem, 9vw, 12rem) clamp(2.4rem, 3vw, 4rem);
          }
          .ts-container {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 6.2rem;
            width: 100%; max-width: 120rem;
          }
          .ts-intro {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(2rem, 2vw, 2.8rem);
            line-height: 1.2; color: #131313; margin: 0; width: 100%;
          }
          .ts-row {
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: flex-start;
            width: 100%; gap: 4rem; flex-wrap: wrap;
          }
          .ts-title {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 4rem; color: #131313; min-width: 14.5rem;
          }
          .ts-details {
            display: flex; flex-direction: row;
            align-items: flex-start; gap: clamp(4rem, 9vw, 13rem);
            flex: 1; max-width: 101rem;
            justify-content: space-between; flex-wrap: wrap;
          }
          .ts-desc {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 1.2; color: #999999; margin: 0;
            max-width: 55.4rem; flex: 1; min-width: 28rem;
          }
          .ts-tools-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(8rem, 15.1rem));
            column-gap: 2.4rem; row-gap: 2.4rem;
          }
          .ts-tool {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.6rem, 1.5vw, 2.4rem);
            line-height: 1.2; color: #0E0E0E;
            display: flex; align-items: center; height: 2.9rem;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .ts-desktop { display: none !important; }

          /* Figma: flex-col, align-items flex-end, gap 4.8rem — padding handled by App wrapper */
          .ts-mobile {
            display: flex; flex-direction: column;
            align-items: flex-end;
            padding: 0;
            gap: 4.8rem; width: 100%; box-sizing: border-box;
          }

          /* Intro: 1.6rem, line-height 140% */
          .ts-mobile-intro {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 1.4; color: #131313; margin: 0; width: 100%;
            align-self: flex-start;
          }

          /* Each section: gap 1.6rem */
          .ts-mobile-section {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 1.6rem; width: 100%;
          }

          /* Section title: Haffer-TRIAL 1.8rem */
          .ts-mobile-section-title {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: 1.8rem;
            line-height: 1.2; color: #131313; display: block;
          }

          /* Details container: gap 2.4rem */
          .ts-mobile-details {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 2.4rem; width: 100%;
          }

          /* Description: 1.6rem, line-height 120% */
          .ts-mobile-desc {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 1.2; color: #0E0E0E; margin: 0; width: 100%;
          }

          /* Tools: 3-col grid, absolute positions from Figma
             col 0: left 0, col 1: left 12.233rem, col 2: left 24.467rem → ~3 equal cols */
          .ts-mobile-tools {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            row-gap: 2.4rem;
            width: 100%;
          }

          .ts-mobile-tool {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: 1.6rem;
            line-height: 1.4; color: #999999; display: block;
          }
        }

        /* Tablets: wider padding */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .ts-mobile {
            padding-left: clamp(1.6rem, 5vw, 4rem);
            padding-right: clamp(1.6rem, 5vw, 4rem);
          }
        }
      `}</style>
    </section>
  )
}
