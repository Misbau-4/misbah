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
  },
  {
    id: 'card-2',
    quote: `"Misbah has an incredible eye for detail. Every component felt considered and purposeful. The handoff was seamless and the final product was well beyond what we imagined. Our users immediately noticed the quality upgrade and engagement improved dramatically."`,
    name: 'Layla Okonkwo',
    role: 'Founder @ Stacklane',
  },
  {
    id: 'card-3',
    quote: `"From concept to final delivery, Misbah kept us in the loop at every step. The result exceeded our expectations — a polished, high-converting landing page that helped us close our seed round. Highly recommend working with him!"`,
    name: 'Aryan Mehta',
    role: 'CTO @ Lumina',
  },
  {
    id: 'card-4',
    quote: `"Incredible talent. Misbah has this rare ability to balance aesthetic beauty with functional design. Our product metrics improved within the first month of the redesign. A true professional and a genuine creative partner."`,
    name: 'Sara Al-Rashid',
    role: 'Head of Product @ Nexus',
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

      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
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
      mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
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

        {/* Card stage */}
        <div className="t-card-stage">
          {TESTIMONIALS.map((t, i) => (
            <article key={t.id} ref={el => (cardRefs.current[i] = el)} className="t-card">
              <p className="t-card-quote">{t.quote}</p>
              <div className="t-card-author">
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
                  <span className="t-mobile-name">{t.name}</span>
                  <span className="t-mobile-role">{t.role}</span>
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
        /* DESKTOP (≥ 1024px)                           */
        /* ============================================= */
        @media (min-width: 1024px) {
          .testimonials-mobile { display: none !important; }

          .testimonials-desktop {
            position: relative;
            width: 100%;
            height: 744px;
            overflow: hidden;
          }

          .t-heading-wrap {
            position: absolute;
            width: 258px; height: 96px;
            left: calc(50% - 129px);
            bottom: 638.05px;
            text-align: center;
          }
          .t-heading {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(28px, 3vw, 40px);
            line-height: 120%;
            letter-spacing: -0.01em;
            color: #131313; margin: 0;
          }

          /* Side avatars */
          .t-avatar { position: absolute; overflow: hidden; border-radius: 0; }
          .t-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
          .t-avatar-1 { width: 72px; height: 72px; left: 58px; bottom: 494px; }
          .t-avatar-2 { width: 72px; height: 72px; left: 59px; bottom: 215px; }
          .t-avatar-3 { width: 72px; height: 72px; left: 1077px; bottom: 371px; }
          .t-avatar-4 { width: 84px; height: 89px; left: 1141px; bottom: 422px; }

          /* Card stage */
          .t-card-stage {
            position: absolute;
            width: 608px;
            left: 344px;
            top: 160px;
            height: 460px;
            overflow: hidden;
            mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%);
          }
          .t-card {
            position: absolute;
            top: 64px; left: 0;
            display: flex; flex-direction: column;
            align-items: flex-start;
            padding: 0; gap: 32px;
            width: 608px; height: 299px;
          }
          .t-card-quote {
            width: 608px; height: 203px;
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 120%;
            color: #161718; margin: 0; flex-shrink: 0;
          }
          .t-card-author {
            display: flex; align-items: center;
            gap: 18px; flex-shrink: 0;
          }
          .t-card-author-info {
            display: flex; flex-direction: column; gap: 4px;
          }
          .t-card-name {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 500;
            font-size: clamp(16px, 1.4vw, 20px);
            line-height: 125%;
            letter-spacing: 0.02em;
            text-transform: capitalize;
            color: #161718;
          }
          .t-card-role {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(13px, 1.2vw, 17px);
            line-height: 120%;
            color: #6B6B6B;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 1024px)                   */
        /* ============================================= */
        @media (max-width: 1023px) {
          .testimonials-desktop { display: none !important; }

          .testimonials-mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 48px 0 64px;
            gap: 32px;
          }

          /* Mobile heading: Figma 24px */
          .t-mobile-heading {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(20px, 5.5vw, 28px);
            line-height: 120%;
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
            height: 380px;
            display: flex;
            justify-content: center;
            overflow: hidden;
            mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
          }
          .t-mobile-card-wrapper {
            position: absolute;
            top: 24px;
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .t-mobile-card {
            display: flex;
            flex-direction: column;
            gap: 32px;
            width: 100%;
            max-width: clamp(280px, 85vw, 400px);
          }
          .t-mobile-quote {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 400;
            font-size: clamp(14px, 4vw, 16px);
            line-height: 120%;
            color: #161718;
            margin: 0;
          }
          .t-mobile-author {
            display: flex; flex-direction: column; gap: 4px;
          }
          .t-mobile-name {
            font-family: 'Haffer-TRIAL', sans-serif;
            font-weight: 500;
            font-size: clamp(14px, 4vw, 16px);
            line-height: 156%;
            letter-spacing: 0.02em;
            text-transform: capitalize;
            color: #161718;
            display: block;
          }
          .t-mobile-role {
            font-family: 'Haffer XH-TRIAL', sans-serif;
            font-weight: 400;
            font-size: 12px;
            line-height: 14px;
            color: #6B6B6B;
            display: block;
          }

          }
        }

        /* Tablets: slightly wider cards */
        @media (min-width: 600px) and (max-width: 1023px) {
          .t-mobile-card {
            max-width: clamp(400px, 70vw, 560px);
          }
          .t-mobile-carousel-wrap {
            padding: 0 clamp(16px, 5vw, 48px);
          }
        }
      `}</style>
    </section>
  )
}
