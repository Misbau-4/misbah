import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import experienceImg from '../assets/preview-1.png'

gsap.registerPlugin(ScrollTrigger)

const EXPERIENCES = [
  { title: 'Freelancer',            duration: '2020–Till Date' },
  { title: 'Rework',                duration: '2020–Till Date' },
  { title: 'AcemyX – Web Designer', duration: '2020–Till Date' },
]

function ArrowRight({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <line x1="6" y1="16" x2="26" y2="16" stroke="#131313" strokeWidth="1.5" />
      <polyline points="18,9 26,16 18,23" fill="none" stroke="#131313" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const itemRefs   = useRef([])
  const rightRef   = useRef(null)
  const imgRef     = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* Experience rows stagger from left */
        gsap.from(itemRefs.current.filter(Boolean), {
          x: -40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', once: true },
        })

        /* Right desc fades up */
        if (rightRef.current) {
          gsap.from(rightRef.current, {
            opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          })
        }

        /* Image fades on mobile */
        if (imgRef.current) {
          gsap.from(imgRef.current, {
            opacity: 0, y: 20, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          })
        }
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="experience" className="exp-section">

      {/* ── Desktop: two-column ── */}
      <div className="exp-desktop">
        {/* Left: experience list */}
        <div className="exp-left">
          <div className="exp-list">
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.title} ref={el => (itemRefs.current[i] = el)} className="exp-item">
                <div className="exp-row">
                  <div className="exp-details">
                    <span className="exp-title">{exp.title}</span>
                    <span className="exp-duration">{exp.duration}</span>
                  </div>
                </div>
                <hr className="exp-divider" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div ref={el => (itemRefs.current[EXPERIENCES.length] = el)} className="exp-cta">
            <button className="exp-cta-btn">
              <span className="exp-cta-text">Know More About Me</span>
              <ArrowRight />
            </button>
          </div>
        </div>

        {/* Right: description */}
        <div ref={rightRef} className="exp-right">
          <p className="exp-desc exp-desc-grey">
            With 5 years of experience in product design,{' '}
            <span className="exp-desc-dark">I help brands transform complex ideas into minimalist, high-standard products.</span>
          </p>
          <p className="exp-desc exp-desc-dark">
            I work with{' '}
            <span className="exp-desc-grey">pre-seed</span>{' '}
            and{' '}
            <span className="exp-desc-grey">seed founders</span>{' '}
            to design products their users actually understand and{' '}
            <span className="exp-desc-grey">build</span>{' '}
            them end-to-end, from Figma to production.
          </p>
        </div>
      </div>

      {/* ── Mobile: stacked ── */}
      <div className="exp-mobile">
        {/* Image at top */}
        <div ref={imgRef} className="exp-mobile-img-wrap">
          <img src={experienceImg} alt="" className="exp-mobile-img" />
        </div>

        {/* Description paragraphs */}
        <div className="exp-mobile-desc-wrap">
          <p className="exp-mobile-desc-grey">
            With 5 years of experience in product design,{' '}
            <span className="exp-mobile-desc-dark">I help brands transform complex ideas into minimalist, high-standard products.</span>
          </p>
          <p className="exp-mobile-desc-dark">
            I work with{' '}
            <span style={{ color: '#999999' }}>pre-seed</span>{' '}
            and{' '}
            <span style={{ color: '#999999' }}>seed founders</span>{' '}
            to design products their users actually understand and{' '}
            <span style={{ color: '#999999' }}>build</span>{' '}
            them end-to-end, from Figma to production.
          </p>
        </div>

        {/* Experience list */}
        <div className="exp-mobile-list">
          {EXPERIENCES.map((exp, i) => (
            <div key={exp.title} className="exp-mobile-item">
              <span className="exp-mobile-title">{exp.title}</span>
              <span className="exp-mobile-duration">{exp.duration}</span>
              <hr className="exp-divider" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="exp-mobile-cta">
          <button className="exp-cta-btn">
            <span className="exp-mobile-cta-text">Know More About Me</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .exp-section {
          width: 100%;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .exp-mobile { display: none !important; }

          .exp-desktop {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
            padding: clamp(6rem, 8vw, 10.8rem) clamp(2.4rem, 3vw, 4rem);
            gap: clamp(6rem, 12vw, 17.5rem);
          }

          .exp-left {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 4rem; flex: 1;
            min-width: 0;
          }
          .exp-list {
            display: flex; flex-direction: column;
            align-items: center; gap: 3rem; align-self: stretch;
          }
          .exp-item {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 0; align-self: stretch;
          }
          .exp-row {
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: center;
            padding: 0; gap: clamp(4rem, 20vw, 36.9rem);
            align-self: stretch; margin-bottom: 0.8rem;
          }
          .exp-details {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 0.8rem; flex: 1;
          }
          .exp-title {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 4rem; text-transform: uppercase; color: #131313; display: block;
          }
          .exp-duration {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.4rem, 1.2vw, 1.7rem);
            line-height: 2.4rem; text-transform: uppercase; color: #131313; display: block;
          }
          .exp-divider {
            width: 100%; height: 0; border: none;
            border-top: 1px solid rgba(198, 198, 198, 0.45);
            margin: 0; align-self: stretch;
          }
          .exp-cta {
            display: flex; flex-direction: row;
            align-items: center; padding: 0; gap: 1.6rem;
          }
          .exp-cta-btn {
            display: flex; flex-direction: row;
            align-items: center; padding: 0; gap: 1.2rem;
            background: none; border: none; cursor: pointer;
          }
          .exp-cta-text {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 4rem; text-decoration: underline;
            text-transform: capitalize; color: #131313;
          }

          .exp-right {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 4.4rem;
            width: clamp(28rem, 40vw, 53.4rem); flex-shrink: 0;
          }
          .exp-desc {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 1.2; margin: 0;
            width: 100%;
          }
          .exp-desc-grey { color: #999999; }
          .exp-desc-dark { color: #131313; }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .exp-desktop { display: none !important; }

          .exp-mobile {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: clamp(4rem, 8vw, 5.6rem) 1.6rem 4.8rem;
            gap: 6.4rem;
            width: 100%;
            box-sizing: border-box;
          }

          /* Image — Figma: 343×250 */
          .exp-mobile-img-wrap {
            width: 100%;
            max-width: 34.3rem;
            height: clamp(18rem, 50vw, 25rem);
            overflow: hidden;
            border-radius: 0.4rem;
            align-self: center;
          }
          .exp-mobile-img {
            width: 100%; height: 100%; object-fit: cover; display: block;
          }

          /* Description container */
          .exp-mobile-desc-wrap {
            display: flex; flex-direction: column; gap: 4.4rem; width: 100%;
          }
          .exp-mobile-desc-grey {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.6rem, 4.5vw, 1.8rem);
            line-height: 1.4; color: #999999; margin: 0; width: 100%;
          }
          .exp-mobile-desc-dark {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.6rem, 4.5vw, 1.8rem);
            line-height: 1.4; color: #131313; margin: 0; width: 100%;
          }

          /* Experience list */
          .exp-mobile-list {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 4rem; width: 100%;
          }
          .exp-mobile-item {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 0.4rem; width: 100%;
          }
          .exp-mobile-title {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.4rem, 4vw, 1.6rem);
            line-height: 1.2; text-transform: uppercase; color: #131313; display: block;
          }
          .exp-mobile-duration {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.2rem, 3.5vw, 1.4rem);
            line-height: 2.4rem; text-transform: uppercase; color: #131313; display: block;
            margin-bottom: 0.8rem;
          }
          .exp-divider {
            width: 100%; height: 0; border: none;
            border-top: 1px solid rgba(198, 198, 198, 0.45);
            margin: 0;
          }

          /* CTA */
          .exp-mobile-cta { display: flex; }
          .exp-cta-btn {
            display: flex; flex-direction: row;
            align-items: center; gap: 1.2rem;
            background: none; border: none; cursor: pointer; padding: 0;
          }
          .exp-mobile-cta-text {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.4rem, 4vw, 1.6rem);
            line-height: 1.2; text-decoration: underline;
            text-transform: capitalize; color: #131313;
          }
        }

        /* Tablets: center image, wider content */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .exp-mobile-img-wrap {
            max-width: clamp(34.3rem, 70vw, 56rem);
            height: clamp(20rem, 40vw, 32rem);
          }
          .exp-mobile {
            padding-left: clamp(1.6rem, 5vw, 4.8rem);
            padding-right: clamp(1.6rem, 5vw, 4.8rem);
          }
        }
      `}</style>
    </section>
  )
}
