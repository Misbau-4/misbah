import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, Flip } from 'gsap/all'
import ProjectImg from '../assets/BentoGallery.gif'

gsap.registerPlugin(ScrollTrigger, Flip)

export default function BentoGallerySection() {
  const sectionRef  = useRef(null)
  const bgRef       = useRef(null)
  const desktopImgWrapRef = useRef(null)
  const mobileImgWrapRef  = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      /* ── Desktop: Flip scrub ── */
      mm.add('(min-width: 102.4rem) and (prefers-reduced-motion: no-preference)', () => {
        if (!bgRef.current || !desktopImgWrapRef.current) return

        const state = Flip.getState(desktopImgWrapRef.current)
        Flip.fit(desktopImgWrapRef.current, bgRef.current)

        const flipTween = Flip.from(state, {
          scale: true,
          ease: 'expoScale(1, 1.91)',
          paused: true,
        })

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 60%',
          end:   'bottom 40%',
          scrub: true,
          animation: flipTween,
        })
      })

      /* ── Mobile: simple fade-in reveal ── */
      mm.add('(max-width: 102.3rem) and (prefers-reduced-motion: no-preference)', () => {
        if (!mobileImgWrapRef.current) return
        gsap.from(mobileImgWrapRef.current, {
          opacity: 0, y: 24, duration: 0.7, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', once: true,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="bento-gallery" className="bento-section">

      {/* ── Desktop: full Flip animation ── */}
      <div className="bento-desktop">
        <div ref={bgRef} className="bento-bg">
          <div ref={desktopImgWrapRef} className="bento-img-wrap">
            <div className="bento-img" style={{ backgroundImage: `url(${ProjectImg})` }} />
          </div>
        </div>
      </div>

      {/* ── Mobile: simple 343×250 image — Figma spec ── */}
      <div className="bento-mobile">
        <div ref={mobileImgWrapRef} className="bento-mobile-img-wrap">
          <img src={ProjectImg} alt="Project gallery" className="bento-mobile-img" />
        </div>
      </div>

      <style>{`
        .bento-section {
          width: 100%;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .bento-mobile  { display: none !important; }

          .bento-desktop {
            position: relative;
            width: 100%;
            height: 67rem;
            margin-bottom: 10rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .bento-bg {
            position: relative;
            width: min(120rem, 100%);
            height: 67rem;
            background: #ECEAED;
            overflow: hidden;
          }

          .bento-img-wrap {
            position: absolute;
            width: 62.625rem;
            height: 54.2rem;
            left: calc(50% - 31.3125rem);
            bottom: 6.4rem;
            background: #005EE5;
            border-radius: 2px;
            overflow: hidden;
          }

          .bento-img {
            position: absolute;
            width: 100%; height: 100%;
            left: 0; bottom: 0;
            background-size: cover;
            background-position: center;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .bento-desktop { display: none !important; }

          /* Figma: 343×250, inside 4.8rem 1.6rem padding container */
          .bento-mobile {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            box-sizing: border-box;
          }

          .bento-mobile-img-wrap {
            width: 100%;
            max-width: 34.3rem;
            height: 25rem;
            background: #ECEAED;
            overflow: hidden;
            border-radius: 2px;
          }

          .bento-mobile-img {
            width: 100%; height: 100%;
            object-fit: cover; display: block;
          }
        }

        /* Tablets: wider image */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .bento-mobile-img-wrap {
            max-width: clamp(34.3rem, 70vw, 64rem);
            height: clamp(22rem, 40vw, 32rem);
          }
        }
      `}</style>
    </section>
  )
}
