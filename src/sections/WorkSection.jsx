import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, Flip, Observer } from 'gsap/all'
import image1 from '../assets/Fleetkit.png'
import image2 from '../assets/Acemyx.png'
import image3 from '../assets/Looprail.png'

gsap.registerPlugin(ScrollTrigger, Flip, Observer)

const PROJECTS = [
  { id: 'fleekit',   name: 'Fleetkit', year: '2025', tags: ['Ecommerce', 'Web App', 'Figma'],      bg: image1, yearColor: '#54FED1' },
  { id: 'acemyx',    name: 'AcemyX',   year: '2023', tags: ['EdTech', 'Landing-Page', 'Figma'],    bg: image2, yearColor: '#54FED1' },
  { id: 'looprail',  name: 'Looprail', year: '2024', tags: ['E-commerce', 'Web App'],              bg: image3, yearColor: '#54FED1' },
]

function MobileProjectCard({ project }) {
  return (
    <div
      className="mobile-project-card"
      style={{
        width: '100%',
        maxWidth: '343px',
        background: '#131313',
        border: '5.02031px solid #181818',
        borderRadius: '20.918px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Media */}
      <div style={{ width: '100%', aspectRatio: '343 / 213', borderRadius: '0 0 20.918px 20.918px', overflow: 'hidden' }}>
        <img src={project.bg} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '12px 20px 0', gap: '10px', background: '#131313' }}>
          <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '16px', lineHeight: '20px', color: '#FDFDFD' }}>
            {project.name}
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6.69px 10px', background: '#1F1F1F', borderRadius: '20px' }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: project.yearColor }}>
              {project.year}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', padding: '13px 20px 20px', gap: '20px', background: '#131313' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '15px', color: '#6B6B6B' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function DesktopProjectCard({ project, index }) {
  const offsets = [
    { left: '43px',                  zIndex: 1 },
    { left: 'calc(50% - 279.46px)', zIndex: 2 },
    { left: '676px',                 zIndex: 1 },
  ]
  const pos = offsets[index] || offsets[0]

  return (
    <div
      className="project-card absolute cursor-grab active:cursor-grabbing"
      data-flip-id={project.id}
      style={{
        width: '558.93px', height: '423.5px',
        left: pos.left, top: 0, zIndex: pos.zIndex,
        background: '#131313',
        border: index === 1 ? '5.02031px solid #181818' : '5.02031px solid #131313',
        borderRadius: '20.918px',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', height: '317.87px', flex: 'none', borderRadius: '0px 0px 20.918px 20.918px' }}>
        <img src={project.bg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ width: '100%', height: '105.63px', display: 'flex', flexDirection: 'column', flex: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20.08px 20.08px 0px', width: '100%', height: '48.47px', background: '#131313' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10.04px', flexGrow: 1 }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '20.918px', lineHeight: '26px', color: '#FDFDFD' }}>
              {project.name}
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6.69px 10.04px', background: '#1F1F1F', borderRadius: '20.08px' }}>
              <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '12.55px', lineHeight: '15px', color: project.yearColor }}>
                {project.year}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', padding: '13.39px 20.08px 26.77px', gap: '20.08px', width: '100%', height: '57.16px', background: '#131313' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '14.22px', lineHeight: '17px', color: '#6B6B6B' }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArrowRightIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 16h20M18 8l8 8-8 8" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WorkSection() {
  const sectionRef       = useRef(null)
  const desktopRef       = useRef(null)
  const cardsContainerRef = useRef(null)
  const mobileCarouselRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [mobileIndex, setMobileIndex] = useState(0)

  /* ── Desktop GSAP ── */
  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray('.project-card', cardsContainerRef.current)

      gsap.from(cards, {
        x: -120, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: desktopRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      let isAnimating = false

      function shiftCards(direction) {
        if (isAnimating) return
        isAnimating = true
        const container = cardsContainerRef.current
        const cardEls   = gsap.utils.toArray('.project-card', container)
        if (cardEls.length < 2) { isAnimating = false; return }

        const state = Flip.getState(cardEls)

        if (direction === 'next') container.appendChild(cardEls[0])
        else container.prepend(cardEls[cardEls.length - 1])

        const newCards = gsap.utils.toArray('.project-card', container)
        const offsets  = [
          { left: '43px',                 zIndex: 1 },
          { left: 'calc(50% - 279.46px)', zIndex: 2 },
          { left: '676px',                zIndex: 1 },
        ]
        newCards.forEach((card, i) => {
          const pos = offsets[i] || offsets[0]
          card.style.left   = pos.left
          card.style.zIndex = pos.zIndex
          card.style.border = i === 1 ? '5.02031px solid #181818' : '5.02031px solid #131313'
        })

        Flip.from(state, {
          duration: 0.6, ease: 'power2.inOut', absolute: true,
          onComplete: () => {
            isAnimating = false
            const centerCard = newCards[1]
            const idx = PROJECTS.findIndex(p => p.id === centerCard.dataset.flipId)
            setActiveIndex(idx >= 0 ? idx : 1)
          },
        })
      }

      Observer.create({
        target: cardsContainerRef.current,
        type: 'touch,pointer',
        onLeft:  () => shiftCards('next'),
        onRight: () => shiftCards('prev'),
        tolerance: 40,
        preventDefault: false,
      })
    })

    /* ── Mobile: swipe carousel ── */
    mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
      if (!mobileCarouselRef.current) return
      Observer.create({
        target: mobileCarouselRef.current,
        type: 'touch,pointer',
        onLeft: () => setMobileIndex(i => Math.min(i + 1, PROJECTS.length - 1)),
        onRight: () => setMobileIndex(i => Math.max(i - 1, 0)),
        tolerance: 40,
        preventDefault: false,
      })
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="works" className="relative w-full bg-white overflow-hidden">

      {/* ── Desktop layout ── */}
      <div
        ref={desktopRef}
        className="works-desktop"
        style={{ height: '954px', position: 'relative' }}
      >
        <div
          ref={cardsContainerRef}
          className="cards-container relative mx-auto"
          style={{ width: '1280px', maxWidth: '100%', height: '423.5px', marginTop: '164.25px' }}
        >
          {PROJECTS.map((project, i) => (
            <DesktopProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="pagination-dots flex items-center justify-center gap-[8px]" style={{ marginTop: '146.2px' }}>
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="transition-colors duration-300"
              style={{ width: 20, height: 20, background: i === activeIndex ? '#6B6B6B' : '#D9D9D9', borderRadius: '50%' }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center" style={{ marginTop: '75px' }}>
          <Link
            to="/projects"
            className="flex items-center gap-[12px] group"
            style={{
              fontFamily: 'var(--font-custom)',
              fontWeight: 400, fontSize: 'clamp(18px, 2vw, 28px)',
              lineHeight: '40px', textDecorationLine: 'underline',
              textTransform: 'capitalize', color: '#131313',
            }}
          >
            See All Works
            <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="works-mobile">
        {/* Swipeable card area */}
        <div ref={mobileCarouselRef} className="mobile-carousel-wrapper">
          <div
            className="mobile-carousel-track"
            style={{ transform: `translateX(calc(-${mobileIndex * 100}%))` }}
          >
            {PROJECTS.map(project => (
              <div key={project.id} className="mobile-carousel-slide">
                <MobileProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-[8px]" style={{ marginTop: '24px' }}>
          {PROJECTS.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => setMobileIndex(i)}
              style={{
                width: 12, height: 12, borderRadius: '50%', border: 'none', cursor: 'pointer',
                background: i === mobileIndex ? '#6B6B6B' : '#D9D9D9',
                padding: 0, transition: 'background 0.3s',
              }}
            />
          ))}
        </div>

        {/* See more link */}
        <div className="flex items-center justify-center" style={{ marginTop: '24px', paddingBottom: '48px' }}>
          <Link
            to="/projects"
            className="flex items-center gap-[8px]"
            style={{
              fontFamily: 'var(--font-custom)',
              fontWeight: 400, fontSize: '16px',
              lineHeight: '140%', textDecoration: 'underline',
              textTransform: 'capitalize', color: '#131313',
            }}
          >
            See more work
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>

      <style>{`
        /* Desktop */
        @media (min-width: 1024px) {
          .works-mobile  { display: none !important; }
          .works-desktop { display: block; }
        }

        /* Mobile / Tablet */
        @media (max-width: 1023px) {
          .works-desktop { display: none !important; }
          .works-mobile  { display: block; padding-top: 40px; }

          .mobile-carousel-wrapper {
            overflow: hidden;
            width: 100%;
            padding: 0 16px;
            box-sizing: border-box;
          }

          .mobile-carousel-track {
            display: flex;
            transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            will-change: transform;
          }

          .mobile-carousel-slide {
            flex: 0 0 100%;
            display: flex;
            justify-content: center;
          }

          .mobile-project-card {
            width: 100% !important;
          }
        }

        /* Tablets (768px–1023px): card wider */
        @media (min-width: 600px) and (max-width: 1023px) {
          .mobile-carousel-wrapper {
            padding: 0 clamp(16px, 5vw, 48px);
          }
          .mobile-project-card {
            max-width: clamp(343px, 70vw, 540px) !important;
          }
        }
      `}</style>
    </section>
  )
}
