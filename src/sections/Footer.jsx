import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

const SOCIAL_LINKS = ['LinkedIN', 'Twitter/X', 'Instagram', 'Behance']

export default function Footer() {
  const footerRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const children = footerRef.current?.querySelectorAll('.footer-item')
      if (!children?.length) return

      gsap.from(children, {
        y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: 'bounce.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.footer-item', { opacity: 1, y: 0 })
    })
  }, { scope: footerRef })

  return (
    <footer ref={footerRef} className="footer-root">

      {/* ── Desktop layout ── */}
      <div className="footer-desktop">
        <div className="footer-inner">
          {/* Heading CTA */}
          <div className="footer-item footer-cta">
            <div>Let's make it,</div>
            <div>
              <span style={{ color: '#A3A3A3', fontStyle: 'italic' }}>worth</span> it.
            </div>
            <div>
              <a href="mailto:hello@misbah.com" style={{ textDecoration: 'underline' }}>
                hello@misbah.com
              </a>
            </div>
          </div>

          {/* Bottom row */}
          <div className="footer-item footer-bottom">
            <div className="footer-copy">© 2025-2026</div>
            <div className="footer-links">
              {SOCIAL_LINKS.map(label => (
                <a key={label} href="#" className="footer-link">{label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile layout — Figma: padding 14.4rem 1.6rem 2.4rem, gap 9.6rem ── */}
      <div className="footer-mobile">
        {/* Top block: gap 4.8rem — heading + social links */}
        <div className="footer-item footer-mobile-top">
          {/* Heading: 3.2rem, line-height 110% */}
          <div className="footer-mobile-cta">
            <span>Let's make <em style={{ fontStyle: 'italic' }}>it</em>,</span><br />
            <span style={{ color: '#A3A3A3', fontStyle: 'italic' }}>worth </span>
            <span>it.</span><br />
            <a href="mailto:hello@misbah.com" className="footer-mobile-email">
              hello@misbah.com
            </a>
          </div>

          {/* Second sub-block: gap 4.8rem */}
          <div className="footer-mobile-sub">
            {/* Social links row */}
            <div className="footer-mobile-links">
              {SOCIAL_LINKS.map(label => (
                <a key={label} href="#" className="footer-mobile-link">{label}</a>
              ))}
            </div>

            {/* Copyright */}
            <div className="footer-mobile-copy">© 2025-2026</div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          width: 100%;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        /* ============================================= */
        /* DESKTOP (≥ 102.4rem)                           */
        /* ============================================= */
        @media (min-width: 64em) {
          .footer-mobile  { display: none !important; }

          .footer-desktop {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: clamp(4.8rem, 7vw, 9.6rem) clamp(2.4rem, 3vw, 4rem) 3.2rem;
            min-height: 45.6rem;
          }

          .footer-inner {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 12rem;
            width: 100%; max-width: 120rem;
          }

          .footer-cta {
            max-width: 50rem;
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(3.6rem, 4vw, 5.6rem);
            line-height: 1; letter-spacing: -0.02em; color: #131313;
          }

          .footer-bottom {
            display: flex; flex-direction: row;
            justify-content: space-between; align-items: flex-end;
            width: 100%; flex-wrap: wrap; gap: 2.4rem;
          }
          .footer-copy {
            font-family: var(--font-custom);
            font-weight: 400; font-size: 1.6rem; line-height: 2rem;
            letter-spacing: 0.28px; color: #131313;
          }
          .footer-links {
            display: flex; flex-direction: row;
            align-items: center; flex-wrap: wrap; gap: 2.4rem;
          }
          .footer-link {
            font-family: var(--font-custom);
            font-weight: 400; font-size: clamp(1.4rem, 1.2vw, 1.8rem); line-height: 4rem;
            text-decoration: underline; text-transform: capitalize; color: #131313;
          }
        }

        /* ============================================= */
        /* MOBILE / TABLET (< 102.4rem)                   */
        /* ============================================= */
        @media (max-width: 63.9375em) {
          .footer-desktop { display: none !important; }

          /* Figma: padding 14.4rem 1.6rem 2.4rem, gap 9.6rem, align-items flex-start */
          .footer-mobile {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: clamp(8rem, 20vw, 14.4rem) 1.6rem 2.4rem;
            gap: 9.6rem;
            width: 100%;
            box-sizing: border-box;
          }

          /* Top block: gap 4.8rem */
          .footer-mobile-top {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 4.8rem;
            width: 100%;
          }

          /* Heading: 3.2rem, line-height 110%, letter-spacing -0.02em */
          .footer-mobile-cta {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(2.4rem, 8vw, 3.2rem);
            line-height: 1.1; letter-spacing: -0.02em; color: #131313;
          }

          /* Email: underlined */
          .footer-mobile-email {
            text-decoration: underline; color: #131313;
          }

          /* Sub block: gap 4.8rem */
          .footer-mobile-sub {
            display: flex; flex-direction: column;
            align-items: flex-start; gap: 4.8rem; width: 100%;
          }

          /* Social links: row, gap 1.6rem */
          .footer-mobile-links {
            display: flex; flex-direction: row;
            align-items: center; gap: clamp(1.2rem, 4vw, 1.6rem);
            flex-wrap: wrap;
          }
          .footer-mobile-link {
            font-family: var(--font-custom);
            font-weight: 400; font-size: 1.4rem; line-height: 1.2;
            text-decoration: underline; text-transform: capitalize; color: #131313;
          }

          /* Copyright: 1.4rem */
          .footer-mobile-copy {
            font-family: var(--font-custom);
            font-weight: 400; font-size: 1.4rem; line-height: 2rem;
            letter-spacing: 0.28px; color: #131313;
          }
        }

        /* Extra small (≤ 37.5rem) */
        @media (max-width: 23.4375em) {
          .footer-mobile-cta { font-size: clamp(2.2rem, 7vw, 2.8rem); }
          .footer-mobile { padding-top: clamp(6.4rem, 18vw, 10rem); }
        }
      `}</style>
    </footer>
  )
}
