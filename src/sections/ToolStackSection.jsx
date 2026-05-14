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

      {/* ── Mobile — Figma: col, gap 48px ── */}
      <div className="ts-mobile">
        {/* Intro: 16px */}
        <p className="tool-stack-intro ts-mobile-intro">{DATA.intro}</p>

        {/* Tool sections */}
        {DATA.sections.map((section) => (
          <div key={section.title} className="ts-mobile-section">
            {/* Section title: 18px */}
            <span className="ts-mobile-section-title">{section.title}</span>

            {/* Details: gap 24px */}
            <div className="ts-mobile-details">
              {/* Description: 16px, line-height 120% */}
              <p className="ts-mobile-desc">{section.description}</p>

              {/* Tools grid: 3-col, 16px muted */}
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
        /* DESKTOP (≥ 1024px)                           */
        /* ============================================= */
        @media (min-width: 1024px) {
          .ts-mobile  { display: none !important; }

          .ts-desktop {
            display: flex; flex-direction: column;
            align-items: center;
            padding: clamp(60px, 9vw, 120px) clamp(24px, 3vw, 40px);
          }
          .ts-container {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 62px;
            width: 100%; max-width: 1200px;
          }
          .ts-intro {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(20px, 2vw, 28px);
            line-height: 120%; color: #131313; margin: 0; width: 100%;
          }
          .ts-row {
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: flex-start;
            width: 100%; gap: 40px; flex-wrap: wrap;
          }
          .ts-title {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 40px; color: #131313; min-width: 145px;
          }
          .ts-details {
            display: flex; flex-direction: row;
            align-items: flex-start; gap: clamp(40px, 9vw, 130px);
            flex: 1; max-width: 1010px;
            justify-content: space-between; flex-wrap: wrap;
          }
          .ts-desc {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 120%; color: #999999; margin: 0;
            max-width: 554px; flex: 1; min-width: 280px;
          }
          .ts-tools-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(80px, 151px));
            column-gap: 24px; row-gap: 24px;
          }
          .ts-tool {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(16px, 1.5vw, 24px);
            line-height: 120%; color: #0E0E0E;
            display: flex; align-items: center; height: 29px;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 1024px)                   */
        /* ============================================= */
        @media (max-width: 1023px) {
          .ts-desktop { display: none !important; }

          /* Figma: flex-col, align-items flex-end, gap 48px — padding handled by App wrapper */
          .ts-mobile {
            display: flex; flex-direction: column;
            align-items: flex-end;
            padding: 0;
            gap: 48px; width: 100%; box-sizing: border-box;
          }

          /* Intro: 16px, line-height 140% */
          .ts-mobile-intro {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 140%; color: #131313; margin: 0; width: 100%;
            align-self: flex-start;
          }

          /* Each section: gap 16px */
          .ts-mobile-section {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 16px; width: 100%;
          }

          /* Section title: Haffer-TRIAL 18px */
          .ts-mobile-section-title {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: 18px;
            line-height: 120%; color: #131313; display: block;
          }

          /* Details container: gap 24px */
          .ts-mobile-details {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 24px; width: 100%;
          }

          /* Description: 16px, line-height 120% */
          .ts-mobile-desc {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 120%; color: #0E0E0E; margin: 0; width: 100%;
          }

          /* Tools: 3-col grid, absolute positions from Figma
             col 0: left 0, col 1: left 122.33px, col 2: left 244.67px → ~3 equal cols */
          .ts-mobile-tools {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            row-gap: 24px;
            width: 100%;
          }

          .ts-mobile-tool {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 140%; color: #999999; display: block;
          }
        }

        /* Tablets: wider padding */
        @media (min-width: 600px) and (max-width: 1023px) {
          .ts-mobile {
            padding-left: clamp(16px, 5vw, 40px);
            padding-right: clamp(16px, 5vw, 40px);
          }
        }
      `}</style>
    </section>
  )
}
