import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger, Flip, Observer } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger, Flip, Observer)

const PROJECTS = [
  {
    id: 'fleekit',
    name: 'Fleetkit',
    year: '2025',
    tags: ['Ecommerce', 'Web App', 'Figma'],
    bgColor: '#CDEB45',
  },
  {
    id: 'acemyx',
    name: 'AcemyX',
    year: '2023',
    tags: ['EdTech', 'Landing-Page', 'Figma'],
    bgColor: '#54FED1',
  },
  {
    id: 'project3',
    name: 'Creative',
    year: '2024',
    tags: ['Branding', 'UI Design', 'Figma'],
    bgColor: '#7B61FF',
  },
]

function ProjectCard({ project, index }) {
  const offsets = [
    { left: '43px', zIndex: 1 },
    { left: 'calc(50% - 279.46px)', zIndex: 2 },
    { left: '676px', zIndex: 1 },
  ]
  const pos = offsets[index] || offsets[0]

  return (
    <div
      className="project-card absolute cursor-grab active:cursor-grabbing"
      data-flip-id={project.id}
      style={{
        width: '558.93px',
        height: '423.5px',
        left: pos.left,
        top: 0,
        zIndex: pos.zIndex,
        background: '#131313',
        border: index === 1 ? '5.02031px solid #181818' : '5.02031px solid #131313',
        borderRadius: '20.918px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Media area (Top) */}
      <div
        style={{
          width: '100%',
          height: '317.87px',
          background: project.bgColor,
          flex: 'none',
          borderRadius: '0px 0px 20.918px 20.918px',
        }}
      />

      {/* Text area (Bottom) */}
      <div
        style={{
          width: '100%',
          height: '105.63px',
          display: 'flex',
          flexDirection: 'column',
          flex: 'none',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '20.08px 20.08px 0px',
            width: '100%',
            height: '48.47px',
            background: '#131313',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10.04px', flexGrow: 1 }}>
            <span
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 400,
                fontSize: '20.918px',
                lineHeight: '26px',
                color: '#FDFDFD',
              }}
            >
              {project.name}
            </span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '6.69px 10.04px',
                background: '#1F1F1F',
                borderRadius: '20.08px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: '12.55px',
                  lineHeight: '15px',
                  color: project.bgColor, 
                }}
              >
                {project.year}
              </span>
            </div>
          </div>
        </div>

        {/* Tags row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: '13.39px 20.08px 26.77px',
            gap: '20.08px',
            width: '100%',
            height: '57.16px',
            background: '#131313',
          }}
        >
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 400,
                fontSize: '14.22px',
                lineHeight: '17px',
                color: '#6B6B6B',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 16h20M18 8l8 8-8 8" stroke="#131313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function WorkSection() {
  const sectionRef = useRef(null)
  const cardsContainerRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(1) // Center card starts as active

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const cards = gsap.utils.toArray('.project-card', cardsContainerRef.current)
      
      // Entrance animation
      gsap.from(cards, {
        y: 120,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // Swipe / Drag to Flip Logic
      let isAnimating = false

      function shiftCards(direction) {
        if (isAnimating) return
        isAnimating = true

        const container = cardsContainerRef.current
        const cardEls = gsap.utils.toArray('.project-card', container)
        if (cardEls.length < 2) { isAnimating = false; return }

        // Capture state before DOM mutation
        const state = Flip.getState(cardEls)

        // Reorder DOM
        if (direction === 'next') {
          container.appendChild(cardEls[0]) // Move first to end
        } else {
          container.prepend(cardEls[cardEls.length - 1]) // Move last to start
        }

        // Apply new layout styles to the newly ordered array
        const newCards = gsap.utils.toArray('.project-card', container)
        const offsets = [
          { left: '43px', zIndex: 1 },
          { left: 'calc(50% - 279.46px)', zIndex: 2 },
          { left: '676px', zIndex: 1 },
        ]

        newCards.forEach((card, i) => {
          const pos = offsets[i] || offsets[0]
          card.style.left = pos.left
          card.style.zIndex = pos.zIndex
          card.style.border = i === 1 ? '5.02031px solid #181818' : '5.02031px solid #131313'
        })

        // Animate from old state to new state
        Flip.from(state, {
          duration: 0.6,
          ease: 'power2.inOut',
          absolute: true,
          onComplete: () => {
            isAnimating = false
            const centerCard = newCards[1]
            const idx = PROJECTS.findIndex(p => p.id === centerCard.dataset.flipId)
            setActiveIndex(idx >= 0 ? idx : 1)
          },
        })
      }

      // Detect swipe/drag using Observer, STRICTLY ignoring wheel events
      Observer.create({
        target: cardsContainerRef.current,
        type: 'touch,pointer', // Swipe/drag only, no scroll/wheel
        onLeft: () => shiftCards('next'),
        onRight: () => shiftCards('prev'),
        tolerance: 40, // Requires 40px drag to trigger flip
        preventDefault: false, // Allow normal vertical page scrolling
      })
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="works"
      className="relative w-full"
      style={{
        background: '#FFFFFF',
        height: '954px',
        overflow: 'hidden',
      }}
    >
      <div
        ref={cardsContainerRef}
        className="cards-container relative mx-auto"
        style={{
          width: '1280px',
          maxWidth: '100%',
          height: '423.5px',
          marginTop: '164.25px',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      <div
        className="pagination-dots flex items-center justify-center gap-[8px]"
        style={{ marginTop: '146.2px' }}
      >
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="transition-colors duration-300"
            style={{
              width: 20,
              height: 20,
              background: i === activeIndex ? '#6B6B6B' : '#D9D9D9',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      <div
        className="flex items-center justify-center"
        style={{ marginTop: '75px' }}
      >
        <a
          href="#works"
          className="flex items-center gap-[12px] group"
          style={{
            fontFamily: "'Haffer-TRIAL', 'Inter', system-ui, sans-serif",
            fontWeight: 400,
            fontSize: '28px',
            lineHeight: '40px',
            textDecorationLine: 'underline',
            textTransform: 'capitalize',
            color: '#131313',
          }}
        >
          See more work
          <ArrowRightIcon />
        </a>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          #works {
            height: auto !important;
            padding-bottom: 100px !important;
          }
          #works .cards-container {
            width: 100% !important;
            height: auto !important;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            margin-top: 60px !important;
          }
          #works .project-card {
            position: relative !important;
            left: auto !important;
            width: 100% !important;
            max-width: 558.93px;
          }
          #works .pagination-dots {
            margin-top: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}
