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
            font-family: var(--font-custom-xh);
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
          .t-avatar-3 { width: 84px; height: 89px; left: 1141px; bottom: 422px; }
          .t-avatar-4 { width: 72px; height: 72px; left: 1077px; bottom: 371px; }

          /* Shapes */
          .t-shape { position: absolute; }
          .t-star-5 { left: 169px; top: 313px; width: 49.71px; height: 49.72px; }
          .t-star-4 { left: 1052px; top: 555px; width: 60.56px; height: 53px; }
          .t-ellipse-52 { left: 108px; top: 517px; width: 24px; height: 24px; }
          .t-ellipse-53 { left: 1082px; top: 284px; width: 24px; height: 24px; }

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
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(18px, 1.7vw, 24px);
            line-height: 120%;
            color: #161718; margin: 0; flex-shrink: 0;
          }
          .t-card-author {
            display: flex; flex-direction: row; align-items: center;
            padding: 0; gap: 18px; width: 296px; height: 64px; flex-shrink: 0;
          }
          .t-card-author-avatar {
            box-sizing: border-box; width: 64px; height: 64px;
            border: 1px solid #FFFFFF; border-radius: 999px;
            object-fit: cover; flex-shrink: 0;
          }
          .t-card-author-info {
            display: flex; flex-direction: column; align-items: flex-start;
            padding: 0; gap: 4px; width: 214px; height: 49px;
          }
          .t-card-name {
            width: 214px; height: 25px;
            font-family: var(--font-custom);
            font-weight: 500;
            font-size: 20px;
            line-height: 25px;
            letter-spacing: 0.02em;
            text-transform: capitalize;
            color: #161718;
          }
          .t-card-role {
            width: 214px; height: 20px;
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: 17px;
            line-height: 20px;
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
            font-family: var(--font-custom-xh);
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
            font-family: var(--font-custom);
            font-weight: 400;
            font-size: clamp(14px, 4vw, 16px);
            line-height: 120%;
            color: #161718;
            margin: 0;
          }
          .t-mobile-author {
            display: flex; flex-direction: row; align-items: center;
            gap: 12px;
          }
          .t-card-author-avatar {
            box-sizing: border-box; width: 48px; height: 48px;
            border: 1px solid #FFFFFF; border-radius: 999px;
            object-fit: cover; flex-shrink: 0;
          }
          .t-card-author-info {
            display: flex; flex-direction: column; align-items: flex-start;
            gap: 4px;
          }
          .t-mobile-name {
            font-family: var(--font-custom);
            font-weight: 500;
            font-size: clamp(14px, 4vw, 16px);
            line-height: 156%;
            letter-spacing: 0.02em;
            text-transform: capitalize;
            color: #161718;
            display: block;
          }
          .t-mobile-role {
            font-family: var(--font-custom-xh);
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
