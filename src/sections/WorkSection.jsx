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
        maxWidth: '34.3rem',
        background: '#131313',
        border: '5.02031px solid #181818',
        borderRadius: '2.0918rem',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Media */}
      <div style={{ width: '100%', aspectRatio: '343 / 213', borderRadius: '0 0 2.0918rem 2.0918rem', overflow: 'hidden' }}>
        <img src={project.bg} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '1.2rem 2rem 0', gap: '1rem', background: '#131313' }}>
          <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '1.6rem', lineHeight: '2rem', color: '#FDFDFD' }}>
            {project.name}
          </span>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.669rem 1rem', background: '#1F1F1F', borderRadius: '2rem' }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '1.2rem', lineHeight: '1.5rem', color: project.yearColor }}>
              {project.year}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', padding: '1.3rem 2rem 2rem', gap: '2rem', background: '#131313' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '1.2rem', lineHeight: '1.5rem', color: '#6B6B6B' }}>
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
    { left: '4.3rem',                  zIndex: 1 },
    { left: 'calc(50% - 27.945999999999998rem)', zIndex: 2 },
    { left: '67.6rem',                 zIndex: 1 },
  ]
  const pos = offsets[index] || offsets[0]

  return (
    <div
      className="project-card absolute cursor-grab active:cursor-grabbing"
      data-flip-id={project.id}
      style={{
        width: '55.892999999999994rem', height: '42.35rem',
        left: pos.left, top: 0, zIndex: pos.zIndex,
        background: '#131313',
        border: index === 1 ? '5.02031px solid #181818' : '5.02031px solid #131313',
        borderRadius: '2.0918rem',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}
    >
      <div style={{ width: '100%', height: '31.787rem', flex: 'none', borderRadius: '0px 0px 2.0918rem 2.0918rem' }}>
        <img src={project.bg} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
      <div style={{ width: '100%', height: '10.562999999999999rem', display: 'flex', flexDirection: 'column', flex: 'none' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '2.008rem 2.008rem 0px', width: '100%', height: '4.8469999999999995rem', background: '#131313' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1.004rem', flexGrow: 1 }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '2.0918rem', lineHeight: '2.6rem', color: '#FDFDFD' }}>
              {project.name}
            </span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.669rem 1.004rem', background: '#1F1F1F', borderRadius: '2.008rem' }}>
              <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '1.2550000000000001rem', lineHeight: '1.5rem', color: project.yearColor }}>
                {project.year}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', padding: '1.339rem 2.008rem 2.677rem', gap: '2.008rem', width: '100%', height: '5.715999999999999rem', background: '#131313' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400, fontSize: '1.4220000000000002rem', lineHeight: '1.7rem', color: '#6B6B6B' }}>
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

    mm.add('(min-width: 102.4rem) and (prefers-reduced-motion: no-preference)', () => {
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
          { left: '4.3rem',                 zIndex: 1 },
          { left: 'calc(50% - 27.945999999999998rem)', zIndex: 2 },
          { left: '67.6rem',                zIndex: 1 },
        ]
        newCards.forEach((card, i) => {
          const pos = offsets[i] || offsets[0]
          card.style.left   = pos.left
          card.style.zIndex = pos.zIndex
          card.style.border = i === 1 ? '0.502031rem solid #181818' : '0.502031rem solid #131313'
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
    mm.add('(max-width: 102.3rem) and (prefers-reduced-motion: no-preference)', () => {
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
        style={{ height: '95.4rem', position: 'relative' }}
      >
        <div
          ref={cardsContainerRef}
          className="cards-container relative mx-auto"
          style={{ width: '128rem', maxWidth: '100%', height: '42.35rem', marginTop: '16.425rem' }}
        >
          {PROJECTS.map((project, i) => (
            <DesktopProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="pagination-dots flex items-center justify-center gap-[0.8rem]" style={{ marginTop: '14.62rem' }}>
          {PROJECTS.map((project, i) => (
            <div key={project.id} className="transition-colors duration-300"
              style={{ width: 20, height: 20, background: i === activeIndex ? '#6B6B6B' : '#D9D9D9', borderRadius: '50%' }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center" style={{ marginTop: '7.5rem' }}>
          <Link
            to="/projects"
            className="flex items-center gap-[1.2rem] group"
            style={{
              fontFamily: 'var(--font-custom)',
              fontWeight: 400, fontSize: 'clamp(1.8rem, 2vw, 2.8rem)',
              lineHeight: '4rem', textDecorationLine: 'underline',
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
        <div className="flex items-center justify-center gap-[0.8rem]" style={{ marginTop: '2.4rem' }}>
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
        <div className="flex items-center justify-center" style={{ marginTop: '2.4rem', paddingBottom: '4.8rem' }}>
          <Link
            to="/projects"
            className="flex items-center gap-[0.8rem]"
            style={{
              fontFamily: 'var(--font-custom)',
              fontWeight: 400, fontSize: '1.6rem',
              lineHeight: 1.4, textDecoration: 'underline',
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
        @media (min-width: 64em) {
          .works-mobile  { display: none !important; }
          .works-desktop { display: block; }
        }

        /* Mobile / Tablet */
        @media (max-width: 63.9375em) {
          .works-desktop { display: none !important; }
          .works-mobile  { display: block; padding-top: 4rem; }

          .mobile-carousel-wrapper {
            overflow: hidden;
            width: 100%;
            padding: 0 1.6rem;
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

        /* Tablets (76.8rem–102.3rem): card wider */
        @media (min-width: 37.5em) and (max-width: 63.9375em) {
          .mobile-carousel-wrapper {
            padding: 0 clamp(1.6rem, 5vw, 4.8rem);
          }
          .mobile-project-card {
            max-width: clamp(34.3rem, 70vw, 54rem) !important;
          }
        }
      `}</style>
    </section>
  )
}
