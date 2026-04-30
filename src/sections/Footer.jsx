import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
  const footerRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const children = footerRef.current?.querySelectorAll('.footer-item')
      if (!children?.length) return

      gsap.from(children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'bounce.out',
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
    <footer
      ref={footerRef}
      className="relative w-full flex flex-col items-center"
      style={{
        background: '#FFFFFF',
        height: '456px',
        padding: '96px 40px 32px',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '120px',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {/* Top Section */}
        <div 
          className="footer-item"
          style={{
            maxWidth: '500px',
            fontFamily: "'Haffer XH-TRIAL', 'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '56px',
            lineHeight: '100%',
            letterSpacing: '-0.02em',
            color: '#131313'
          }}
        >
          <div>Let’s make it,</div>
          <div>
            <span style={{ color: '#A3A3A3', fontStyle: 'italic' }}>worth</span> it.
          </div>
          <div>
            <a href="mailto:hello@misbah.com" style={{ textDecoration: 'underline' }}>
              hello@misbah.com
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="footer-item"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          <div
            style={{
              fontFamily: "'Haffer-TRIAL', 'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              letterSpacing: '0.28px',
              color: '#131313'
            }}
          >
            © 2025-2026
          </div>

          <div 
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            {['LinkedIN', 'Twitter/X', 'Instagram', 'Behance'].map((label) => (
              <a
                key={label}
                href="#"
                style={{
                  fontFamily: "'Haffer-TRIAL', 'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '18px',
                  lineHeight: '40px',
                  textDecorationLine: 'underline',
                  textTransform: 'capitalize',
                  color: '#131313'
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1023px) {
          footer {
            height: auto !important;
            padding: 60px 20px 32px !important;
          }
          footer > div {
            gap: 60px !important;
          }
        }
      `}</style>
    </footer>
  )
}
