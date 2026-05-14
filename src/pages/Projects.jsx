/**
 * Projects.jsx
 *
 * Full projects listing page.
 * Desktop: 3-column grid, large typography, wide padding
 * Mobile:  Figma-exact — margin-top 120px, 16px side padding, single column,
 *          filter row gap 12px, article 250px image + 24px case-study row
 */

import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'
import image1 from '../assets/Fleetkit.png'
import image2 from '../assets/Acemyx.png'
import image3 from '../assets/Looprail.png'

gsap.registerPlugin(ScrollTrigger)

/* ── Arrow-up-right icon ── */
function ArrowIcon({ color = '#636363', size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 13L13 3M13 3H5M13 3V11"
        stroke={color} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

/* ── Project data ── */
const PROJECTS = [
  { id: 'acemyx',     name: 'ACEMYX',     category: ['Web Apps'],                  bgColor: '#005EE6', img: image2, linkText: 'View Live Site',   linkHref: '#' },
  { id: 'fleetkit',   name: 'FLEETKIT',   category: ['Web Apps', 'Development'],   bgColor: '#08AE42', img: image1, linkText: 'View Live Site',   linkHref: '#' },
  { id: 'locusverse', name: 'LOCUSVERSE', category: ['Web Apps', 'Websites'],      bgColor: '#005EE6', img: null,   linkText: 'Read Case Study', linkHref: '#' },
  { id: 'studione',   name: 'STUDIONE',   category: ['Websites'],                  bgColor: '#08AE42', img: null,   linkText: 'Read Case Study', linkHref: '#' },
  { id: 'looprail',   name: 'LOOPRAIL',   category: ['Development', 'Web Apps'],   bgColor: '#005EE6', img: image3, linkText: 'Read Case Study', linkHref: '#' },
  { id: 'techfest',   name: 'TECHFEST',   category: ['Websites', 'Graphics'],      bgColor: '#005EE6', img: null,   linkText: 'Read Case Study', linkHref: '#' },
  { id: 'rtig',       name: 'RTIG',       category: ['Graphics'],                  bgColor: '#005EE6', img: null,   linkText: 'Read Case Study', linkHref: '#' },
]

const CATEGORIES = ['All', 'Web Apps', 'Mobile Apps', 'Websites', 'Graphics', 'Development']

function getCategoryCount(cat) {
  if (cat === 'All') return PROJECTS.length
  return PROJECTS.filter(p => p.category.includes(cat)).length
}

/* ── Project card ── */
function ProjectCard({ project, mobile = false }) {
  const cardRef = useRef(null)

  const handleEnter = () => {
    const img = cardRef.current?.querySelector('.proj-img')
    if (img) gsap.to(img, { scale: 1.04, duration: 0.4, ease: 'power2.out' })
  }
  const handleLeave = () => {
    const img = cardRef.current?.querySelector('.proj-img')
    if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' })
  }

  return (
    <article
      ref={cardRef}
      className="project-card"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Image block — Figma: 250px tall on mobile, aspect 343/250 */}
      <a
        href={project.linkHref}
        aria-label={`Visit ${project.name}`}
        className="proj-img-link"
      >
        <div className="proj-img-wrap">
          {project.img ? (
            <img
              src={project.img}
              alt={project.name}
              className="proj-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div
              className="proj-img"
              style={{ width: '100%', height: '100%', background: project.bgColor }}
            />
          )}
        </div>
      </a>

      {/* Case Study row — Figma: space-between, 17px uppercase name + muted link */}
      <div className="proj-meta">
        <span className="proj-name">{project.name}</span>
        <a href={project.linkHref} className="proj-link">
          <span className="proj-link-text">{project.linkText}</span>
          <ArrowIcon />
        </a>
      </div>
    </article>
  )
}

/* ── Page ── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const gridRef    = useRef(null)
  const headerRef  = useRef(null)
  const filtersRef = useRef(null)

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.includes(activeFilter))

  /* Filter change animation */
  useEffect(() => {
    if (!gridRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const cards = gridRef.current.querySelectorAll('.project-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.07, ease: 'power3.out' }
    )
  }, [activeFilter])

  /* Entrance animation */
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', once: true },
      })
      gsap.from(filtersRef.current, {
        y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: filtersRef.current, start: 'top 90%', once: true },
      })
    })
  }, [])

  return (
    <>
      <Navbar />

      <main className="projects-main">
        <div className="projects-container">

          {/* Title */}
          <h1 ref={headerRef} className="projects-title">Projects</h1>

          {/* Projects Wrap */}
          <div className="projects-wrap">

            {/* Filter row */}
            <div ref={filtersRef} className="projects-filters">
              {CATEGORIES.map(cat => {
                const isActive = activeFilter === cat
                const count = getCategoryCount(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    aria-pressed={isActive}
                    className="filter-btn"
                  >
                    <span
                      className="filter-name"
                      style={{ fontWeight: isActive ? 700 : 500, color: isActive ? '#131313' : '#ADB3BA' }}
                    >
                      {cat}
                    </span>
                    <span className="filter-badge">{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Grid */}
            <div ref={gridRef} className="projects-grid">
              {filtered.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        /* ── Base ── */
        .projects-main {
          width: 100%;
          background: #FFFFFF;
          box-sizing: border-box;
          min-height: 100vh;
        }

        /* ── Project card shared ── */
        .project-card {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 17px;
          cursor: pointer;
        }
        .proj-img-link {
          display: block;
          overflow: hidden;
          width: 100%;
          text-decoration: none;
        }
        .proj-img-wrap {
          width: 100%;
          overflow: hidden;
        }
        .proj-meta {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .proj-name {
          font-family: var(--font-custom);
          font-weight: 700;
          font-size: 17px;
          line-height: 24px;
          text-transform: uppercase;
          color: #131313;
          white-space: nowrap;
        }
        .proj-link {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .proj-link-text {
          font-family: var(--font-custom);
          font-weight: 400;
          font-size: 17px;
          line-height: 24px;
          color: #636363;
          white-space: nowrap;
        }

        /* ── Filter button ── */
        .filter-btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }
        .filter-name {
          font-family: var(--font-custom);
          font-size: 14px;
          line-height: 24px;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .filter-badge {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 4px;
          width: 30px;
          height: 25px;
          background: #F6F6F6;
          border-radius: 32px;
          font-family: var(--font-custom);
          font-weight: 400;
          font-size: 14px;
          line-height: 120%;
          color: #A9B5B9;
        }

        /* ============================================= */
        /* DESKTOP (≥ 1024px)                           */
        /* ============================================= */
        @media (min-width: 1024px) {
          .projects-main {
            padding: 180px 40px 161px;
          }
          .projects-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 68px;
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
          }
          .projects-title {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(48px, 6vw, 78.25px);
            line-height: 120%;
            letter-spacing: -0.02em;
            color: #131313;
            margin: 0; width: 100%;
          }
          .projects-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 48px;
            width: 100%;
          }
          .projects-filters {
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px 56px;
          }
          .filter-name { font-size: 17px; }
          .projects-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 64px 40px;
            width: 100%;
          }
          .proj-img-wrap {
            aspect-ratio: 352 / 326;
          }
        }

        /* ── Tablet (768–1023px) ── */
        @media (min-width: 768px) and (max-width: 1023px) {
          .projects-main { padding: 140px 32px 100px; }
          .projects-container { gap: 48px; }
          .projects-title { font-size: clamp(36px, 5vw, 52px); }
          .projects-grid { grid-template-columns: repeat(2, 1fr); gap: 48px 32px; }
          .proj-img-wrap { aspect-ratio: 352 / 300; }
          .projects-filters { gap: 12px 32px; }
        }

        /* ============================================= */
        /* MOBILE (< 768px) — Figma exact               */
        /* ============================================= */
        @media (max-width: 767px) {
          /* Figma: position relative, padding 0 16px, margin-top 120px on container */
          .projects-main {
            padding: 0 16px;
            box-sizing: border-box;
          }

          .projects-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 48px;
            width: 100%;
            margin-top: 120px;
            padding-bottom: 80px;
          }

          /* Title: Haffer XH-TRIAL 32px, letter-spacing -0.02em */
          .projects-title {
            font-family: var(--font-custom-xh);
            font-weight: 400;
            font-size: clamp(28px, 8vw, 32px);
            line-height: 120%;
            letter-spacing: -0.02em;
            color: #131313;
            margin: 0;
            width: 100%;
          }

          .projects-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 40px;
            width: 100%;
          }

          /* Filters: row, gap 12px, no wrap → horizontal scroll if overflow */
          .projects-filters {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 12px;
            width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 4px;
          }
          .projects-filters::-webkit-scrollbar { display: none; }

          /* Filter name: 14px */
          .filter-name { font-size: 14px; }

          /* Projects box: flex-col, gap 40px */
          .projects-grid {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 40px;
            width: 100%;
          }

          /* Each article: full width, gap 17px */
          .project-card {
            width: 100%;
          }

          /* Image: 250px tall — Figma spec */
          .proj-img-wrap {
            height: clamp(200px, 55vw, 250px);
            width: 100%;
          }

          /* Case study row */
          .proj-name { font-size: 17px; }
          .proj-link-text { font-size: 17px; }
        }

        /* Extra small (≤ 375px) */
        @media (max-width: 375px) {
          .projects-title { font-size: 28px; }
          .projects-container { margin-top: 100px; }
        }
      `}</style>
    </>
  )
}
