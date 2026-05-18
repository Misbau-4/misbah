import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import avatar1 from '../assets/Avatar1.png'
import avatar2 from '../assets/Avatar2.png'
import avatar3 from '../assets/Avatar3.png'
import avatar4 from '../assets/Avatar4.png'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    id: 'card-1',
    quote: `"Working with Musbaudeen was a game changer for our brand. Their innovative design approach and attention to detail transformed our vision into a stunning reality. The team was incredibly responsive and collaborative, making the entire process seamless. We are thrilled with the results and have received countless compliments on our new look!"`,
    name: 'Abdur-Rahman Adeniji',
    role: 'CEO @ AcemyX',
    avatar: avatar1,
  },
  {
    id: 'card-2',
    quote: `"Misbah has an incredible eye for detail. Every component felt considered and purposeful. The handoff was seamless and the final product was well beyond what we imagined. Our users immediately noticed the quality upgrade and engagement improved dramatically."`,
    name: 'Layla Okonkwo',
    role: 'Founder @ Stacklane',
    avatar: avatar2,
  },
  {
    id: 'card-3',
    quote: `"From concept to final delivery, Misbah kept us in the loop at every step. The result exceeded our expectations — a polished, high-converting landing page that helped us close our seed round. Highly recommend working with him!"`,
    name: 'Aryan Mehta',
    role: 'CTO @ Lumina',
    avatar: avatar3,
  },
  {
    id: 'card-4',
    quote: `"Incredible talent. Misbah has this rare ability to balance aesthetic beauty with functional design. Our product metrics improved within the first month of the redesign. A true professional and a genuine creative partner."`,
    name: 'Sara Al-Rashid',
    role: 'Head of Product @ Nexus',
    avatar: avatar4,
  },
]

export default function TestimonialSection() {
  const sectionRef      = useRef(null)
  const cardRefs        = useRef([])
  const mobileCardRefs  = useRef([])

  /* ── Desktop: GSAP scroll-pinned crossfade ── */
  useGSAP(
    () => {
      const cards = cardRefs.current
      const mCards = mobileCardRefs.current
      if (!cards.length) return

      const mm = gsap.matchMedia()

      mm.add('(min-width: 102.4rem) and (prefers-reduced-motion: no-preference)', () => {
        gsap.set(cards,    { autoAlpha: 0, y: 40 })
        gsap.set(cards[0], { autoAlpha: 1, y: 0  })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:       sectionRef.current,
            start:         'top top',
            end:           `+=${(TESTIMONIALS.length - 1) * 120}vh`,
            pin:           true,
            scrub:         1,
            anticipatePin: 1,
          },
        })

        TESTIMONIALS.forEach((_, i) => {
          if (i === 0) return
          tl.to(cards[i - 1], { autoAlpha: 0, y: -32, duration: 1, ease: 'power2.inOut' })
            .fromTo(cards[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, '<0.2')
            .to({}, { duration: 0.6 })
        })
      })

      /* Mobile: GSAP scroll-pinned crossfade ── */
      mm.add('(max-width: 102.3rem) and (prefers-reduced-motion: no-preference)', () => {
        if (!mCards.length) return
        
        gsap.set(mCards,    { autoAlpha: 0, y: 40 })
        gsap.set(mCards[0], { autoAlpha: 1, y: 0  })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger:       sectionRef.current,
            start:         'top top',
            end:           `+=${(TESTIMONIALS.length - 1) * 120}vh`,
            pin:           true,
            scrub:         1,
            anticipatePin: 1,
          },
        })

        TESTIMONIALS.forEach((_, i) => {
          if (i === 0) return
          tl.to(mCards[i - 1], { autoAlpha: 0, y: -32, duration: 1, ease: 'power2.inOut' })
            .fromTo(mCards[i], { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 1, ease: 'power2.out' }, '<0.2')
            .to({}, { duration: 0.6 })
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} id="testimonials" className="testimonials-section">

      {/* ── Desktop layout ── */}
      <div className="testimonials-desktop">
        {/* Heading */}
        <div className="t-heading-wrap">
          <h2 className="t-heading">
            Trusted by<br />
            +20 <span>founders.</span>
          </h2>
        </div>

        {/* Side avatars */}
        <div aria-hidden="true" className="t-avatar t-avatar-1"><img src={avatar1} alt="" /></div>
        <div aria-hidden="true" className="t-avatar t-avatar-2"><img src={avatar2} alt="" /></div>
        <div aria-hidden="true" className="t-avatar t-avatar-3"><img src={avatar3} alt="" /></div>
        <div aria-hidden="true" className="t-avatar t-avatar-4"><img src={avatar4} alt="" /></div>

        {/* Decorative SVG Shapes */}
        <div aria-hidden="true" className="t-shape t-star-5">
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40.1597 6.77976C41.5092 5.77072 43.2339 7.42488 42.2821 8.81527L35.4314 18.8225C34.8076 19.7337 35.3567 20.9831 36.4497 21.1398L48.4358 22.8575C50.1029 23.0964 50.1564 25.4839 48.5017 25.7972L36.57 28.0564C35.4876 28.2614 34.994 29.5292 35.6527 30.4121L42.9034 40.1298C43.91 41.4789 42.2582 43.2012 40.8683 42.2518L30.8563 35.4131C29.9467 34.7918 28.7006 35.3379 28.541 36.4279L26.7819 48.4435C26.5379 50.1098 24.1503 50.1561 23.842 48.5004L21.6254 36.5965C21.4232 35.5109 20.152 35.0145 19.2676 35.6757L9.5551 42.9382C8.20565 43.9473 6.48093 42.2931 7.43276 40.9027L14.2835 30.8955C14.9072 29.9843 14.3581 28.7349 13.2651 28.5782L1.27899 26.8605C-0.388082 26.6216 -0.441558 24.2341 1.21315 23.9208L13.1448 21.6616C14.2272 21.4566 14.7209 20.1888 14.0621 19.3059L6.81139 9.58819C5.8048 8.23911 7.45663 6.51683 8.84655 7.46622L18.8585 14.3049C19.7681 14.9262 21.0142 14.3801 21.1738 13.2901L22.9329 1.27451C23.1769 -0.391827 25.5645 -0.438068 25.8728 1.21758L28.0895 13.1215C28.2916 14.2071 29.5629 14.7035 30.4472 14.0423L40.1597 6.77976Z" fill="#1B6AB5"/>
          </svg>
        </div>
        <div aria-hidden="true" className="t-shape t-star-4">
          <svg width="61" height="53" viewBox="0 0 61 53" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.3769 0.407469C44.7124 -0.567511 46.5701 0.508251 46.3893 2.15183L44.7704 16.8617C44.6797 17.6858 45.1332 18.4738 45.8914 18.8093L59.4245 24.7973C60.9366 25.4664 60.9338 27.6131 59.42 28.2782L45.8714 34.2312C45.1124 34.5647 44.6568 35.3515 44.7453 36.1758L46.3261 50.8899C46.5027 52.5339 44.6422 53.6049 43.3092 52.6264L31.3795 43.8695C30.7112 43.3789 29.802 43.3777 29.1324 43.8666L17.18 52.5925C15.8446 53.5675 13.9868 52.4917 14.1677 50.8482L15.7866 36.1383C15.8773 35.3142 15.4237 34.5262 14.6655 34.1907L1.13247 28.2027C-0.37963 27.5336 -0.376848 25.3869 1.13698 24.7218L14.6855 18.7688C15.4446 18.4353 15.9002 17.6485 15.8116 16.8242L14.2309 2.11014C14.0543 0.466091 15.9148 -0.604854 17.2477 0.373586L29.1774 9.13051C29.8458 9.62112 30.7549 9.6223 31.4246 9.13342L43.3769 0.407469Z" fill="#FF7A54"/>
          </svg>
        </div>
        <div aria-hidden="true" className="t-shape t-ellipse-52">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#D84093"/>
          </svg>
        </div>
        <div aria-hidden="true" className="t-shape t-ellipse-53">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#6A26B3"/>
          </svg>
        </div>

        {/* Card stage */}
        <div className="t-card-stage">
          {TESTIMONIALS.map((t, i) => (
            <article key={t.id} ref={el => (cardRefs.current[i] = el)} className="t-card">
              <p className="t-card-quote">{t.quote}</p>
              <div className="t-card-author">
                <img src={t.avatar} alt="" className="t-card-author-avatar" />
                <div className="t-card-author-info">
                  <span className="t-card-name">{t.name}</span>
                  <span className="t-card-role">{t.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="testimonials-mobile">
        {/* Heading */}
        <h2 className="t-mobile-heading">
          Trusted by<br />
          <span>+20</span> founders.
        </h2>

        {/* Card Stage */}
        <div className="t-mobile-card-stage">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.id} ref={el => (mobileCardRefs.current[i] = el)} className="t-mobile-card-wrapper">
              <div className="t-mobile-card">
                <p className="t-mobile-quote">{t.quote}</p>
                <div className="t-mobile-author">
                  <img src={t.avatar} alt="" className="t-card-author-avatar" />
                  <div className="t-card-author-info">
                    <span className="t-mobile-name">{t.name}</span>
                    <span className="t-mobile-role">{t.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Shared ── */
        .testimonials-section {
          position: relative;
          width: 100%;
          background: #FFFFFF;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .testimonials-mobile { display: none !important; }

          .testimonials-desktop {
            position: relative;
            width: 100%;
            height: 74.4rem;
            overflow: hidden;
          }

          .t-heading-wrap {
            position: absolute;
            width: 25.8rem; height: 9.6rem;
            left: calc(50% - 12.9rem);
            bottom: 63.80499999999999rem;
            text-align: center;
          }
          .t-heading {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(2.8rem, 3vw, 4rem);
            line-height: 1.2;
            letter-spacing: -0.01em;
            color: #131313; margin: 0;
          }

          /* Side avatars */
          .t-avatar { position: absolute; overflow: hidden; border-radius: 0; }
          .t-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
          .t-avatar-1 { width: 7.2rem; height: 7.2rem; left: 5.8rem; bottom: 49.4rem; }
          .t-avatar-2 { width: 7.2rem; height: 7.2rem; left: 5.9rem; bottom: 21.5rem; }
          .t-avatar-3 { width: 8.4rem; height: 8.9rem; left: 114.1rem; bottom: 42.2rem; }
          .t-avatar-4 { width: 7.2rem; height: 7.2rem; left: 107.7rem; bottom: 37.1rem; }

          /* Shapes */
          .t-shape { position: absolute; }
          .t-star-5 { left: 16.9rem; top: 31.3rem; width: 4.971rem; height: 4.9719999999999995rem; }
          .t-star-4 { left: 105.2rem; top: 55.5rem; width: 6.056rem; height: 5.3rem; }
          .t-ellipse-52 { left: 10.8rem; top: 51.7rem; width: 2.4rem; height: 2.4rem; }
          .t-ellipse-53 { left: 108.2rem; top: 28.4rem; width: 2.4rem; height: 2.4rem; }

          /* Card stage */
          .t-card-stage {
            position: absolute;
            width: 60.8rem;
            left: 34.4rem;
            top: 16rem;
            height: 46rem;
            overflow: hidden;
            mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
          }
          .t-card {
            position: absolute;
            top: 6.4rem; left: 0;
            display: flex; flex-direction: column;
            align-items: flex-start;
            padding: 0; gap: 3.2rem;
            width: 60.8rem; height: 29.9rem;
          }
          .t-card-quote {
            width: 60.8rem; height: 20.3rem;
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.8rem, 1.7vw, 2.4rem);
            line-height: 1.2;
            color: #161718; margin: 0; flex-shrink: 0;
          }
          .t-card-author {
            display: flex; flex-direction: row; align-items: center;
            padding: 0; gap: 1.8rem; width: 29.6rem; height: 6.4rem; flex-shrink: 0;
          }
          .t-card-author-avatar {
            box-sizing: border-box; width: 6.4rem; height: 6.4rem;
            border: 1px solid #FFFFFF; border-radius: 999px;
            object-fit: cover; flex-shrink: 0;
          }
          .t-card-author-info {
            display: flex; flex-direction: column; align-items: flex-start;
            padding: 0; gap: 0.4rem; width: 21.4rem; height: 4.9rem;
          }
          .t-card-name {
            width: 21.4rem; height: 2.5rem;
            font-family: var(--font-custom);
            font-weight: 500;
            font-size: 2rem;
            line-height: 2.5rem;
            letter-spacing: 0.02em;
            text-transform: capitalize;
            color: #161718;
          }
          .t-card-role {
            width: 21.4rem; height: 2rem;
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: 1.7rem;
            line-height: 2rem;
            color: #6B6B6B;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .testimonials-desktop { display: none !important; }

          .testimonials-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4.8rem 0 6.4rem;
            gap: 3.2rem;
          }

          /* Mobile heading: Figma 2.4rem */
          .t-mobile-heading {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(2rem, 5.5vw, 2.8rem);
            line-height: 1.2;
            text-align: center;
            letter-spacing: -0.01em;
            color: #131313;
            margin: 0;
          }
          .t-mobile-heading span { color: #131313; }

          /* Card Stage */
          .t-mobile-card-stage {
            position: relative;
            width: 100%;
            height: 38rem;
            display: flex;
            justify-content: center;
            overflow: hidden;
            mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          }
          .t-mobile-card-wrapper {
            position: absolute;
            top: 2.4rem;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .t-mobile-card {
            display: flex;
            flex-direction: column;
            gap: 3.2rem;
            width: 100%;
            max-width: clamp(28rem, 85vw, 40rem);
          }
          .t-mobile-quote {
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(1.4rem, 4vw, 1.6rem);
            line-height: 1.2;
            color: #161718;
            margin: 0;
          }
          .t-mobile-author {
            display: flex; flex-direction: row; align-items: center;
            gap: 1.2rem;
          }
          .t-card-author-avatar {
            box-sizing: border-box; width: 4.8rem; height: 4.8rem;
            border: 1px solid #FFFFFF; border-radius: 999px;
            object-fit: cover; flex-shrink: 0;
          }
          .t-card-author-info {
            display: flex; flex-direction: column; align-items: flex-start;
            gap: 0.4rem;
          }
          .t-mobile-name {
            font-family: var(--font-custom);
            font-weight: 500;
            font-size: clamp(1.4rem, 4vw, 1.6rem);
            line-height: 1.56;
            letter-spacing: 0.02em;
            text-transform: capitalize;
            color: #161718;
            display: block;
          }
          .t-mobile-role {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: 1.2rem;
            line-height: 1.4rem;
            color: #6B6B6B;
            display: block;
          }

          }
        }

        /* Tablets: slightly wider cards */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .t-mobile-card {
            max-width: clamp(40rem, 70vw, 56rem);
          }
          .t-mobile-carousel-wrap {
            padding: 0 clamp(1.6rem, 5vw, 4.8rem);
          }
        }
      `}</style>
    </section>
  )
}
