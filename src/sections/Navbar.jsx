/**
 * Navbar.jsx
 *
 * Section: Navigation
 * Animation: GSAP — Directionally-aware entrance animation.
 *            Nav children stagger-slide in from the top on mount.
 *            Uses useGSAP() for automatic cleanup + gsap.matchMedia()
 *            for prefers-reduced-motion accessibility.
 * Clock: live UTC/GMT, updates every second via setInterval.
 * Responsive:
 *   mobile  (<640px)  — name only on left, icon + links on right;
 *                        clock hidden to avoid overflow.
 *   tablet  (640-1023) — name + clock on left, links + icon right.
 *   desktop (1024px+)  — same as tablet with wider horizontal padding.
 */

import { useEffect, useRef, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PreloadContext } from '../App'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../components/Container'
import projectImage from '../assets/Work-4.png'

gsap.registerPlugin(ScrollTrigger)

/* ── Icons ──────────────────────────────────────────────────── */

function SparkleIcon({ className = '' }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 0 C9 0 9.6 5.4 9 9 C8.4 12.6 9 18 9 18 C9 18 8.4 12.6 9 9 C9.6 5.4 9 0 9 0Z" fill="currentColor" />
      <path d="M0 9 C0 9 5.4 9.6 9 9 C12.6 8.4 18 9 18 9 C18 9 12.6 8.4 9 9 C5.4 9.6 0 9 0 9Z" fill="currentColor" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <line x1="4" y1="8"  x2="24" y2="8"  stroke="#000" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="14" x2="24" y2="14" stroke="#000" strokeWidth="2" strokeLinecap="round" />
      <line x1="4" y1="20" x2="24" y2="20" stroke="#000" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <line x1="6" y1="6"   x2="22" y2="22" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="6"  x2="6"  y2="22" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

/* ── Live GMT clock hook ────────────────────────────────────── */
function useGMTClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const hh = now.getUTCHours().toString().padStart(2, '0')
      const mm = now.getUTCMinutes().toString().padStart(2, '0')
      setTime(`${hh}:${mm} GMT`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

/* ── Full-screen mobile overlay ─────────────────────────────── */
function MobileMenuOverlay({ isOpen, onClose }) {
  const overlayRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const ctaRef = useRef(null)
  
  const [activePreview, setActivePreview] = useState('projects')
  const navigate = useNavigate()

  useGSAP(() => {
    if (!overlayRef.current) return
    if (isOpen) {
      gsap.fromTo(overlayRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        [projectsRef.current, aboutRef.current, ctaRef.current].filter(Boolean),
        { y: 30, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
      )
    } else {
      gsap.to(overlayRef.current, { autoAlpha: 0, duration: 0.25, ease: 'power2.in' })
    }
  }, { scope: overlayRef, dependencies: [isOpen] })

  const handleImageClick = () => {
    if (activePreview === 'projects') navigate('/projects')
    else if (activePreview === 'about') navigate('/#about')
    onClose()
  }

  return (
    <div
      ref={overlayRef}
      className="fixed top-0 left-0 w-full h-[100dvh] bg-white z-[100] flex flex-col items-center pb-[58px] gap-[39px] overflow-y-auto overflow-x-hidden"
      style={{ visibility: isOpen ? 'visible' : 'hidden', opacity: isOpen ? 1 : 0 }}
      aria-hidden={!isOpen}
    >
      {/* Top bar (Frame 1321315528) */}
      <div className="flex flex-row justify-end items-center px-4 py-6 w-full max-w-[375px] h-[76px] shrink-0">
        <button onClick={onClose} aria-label="Close menu" className="w-[28px] h-[28px] flex items-center justify-center p-0 bg-transparent border-none cursor-pointer">
          <CloseIcon />
        </button>
      </div>

      {/* Main Content (Frame 1321315627) */}
      <div className="flex flex-col items-center gap-[245px] w-[304px] shrink-0">
        
        {/* Links Frame (Frame 1321315626) */}
        <div className="flex flex-col items-center gap-[39px] w-[304px]">
          
          {/* Projects Frame */}
          <div className="flex flex-col items-center gap-[20px]">
            <div
              ref={projectsRef}
              className="w-full text-center text-[48px] leading-[120%] text-[#181818] cursor-pointer transition-opacity duration-300"
              style={{ fontFamily: 'var(--font-custom)', opacity: activePreview === 'projects' ? 1 : 1 }}
              onClick={() => setActivePreview('projects')}
            >
              Projects
            </div>

            {/* Image shown only when Projects is active */}
            {activePreview === 'projects' && (
              <div 
                className="w-[181px] h-[132px] cursor-pointer transition-transform duration-200 hover:scale-105 rounded-[2px]"
                onClick={handleImageClick}
                style={{ 
                  background: `url(${projectImage})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '14px', fontWeight: 'bold'
                }}
              >
                Click to View Projects
              </div>
            )}
          </div>

          {/* Divider (Vector 124) */}
          <div className="w-[304px] h-0 border-t-[2px] border-solid border-[rgba(198,198,198,0.45)]"></div>

          {/* About Frame */}
          <div className="flex flex-col items-center gap-[20px]">
            <div
              ref={aboutRef}
              className="w-full text-center text-[48px] leading-[120%] text-[#181818] cursor-pointer transition-opacity duration-300"
              style={{ fontFamily: 'var(--font-custom)', opacity: activePreview === 'about' ? 1 : 1 }}
              onClick={() => setActivePreview('about')}
            >
              About
            </div>

            {/* Image shown only when About is active */}
            {activePreview === 'about' && (
              <div 
                className="w-[181px] h-[132px] cursor-pointer transition-transform duration-200 hover:scale-105 rounded-[2px]"
                onClick={handleImageClick}
                style={{ 
                  background: `url(${projectImage})`,
                  backgroundSize: '100% 100%',
                  backgroundPosition: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '14px', fontWeight: 'bold'
                }}
              >
                Click to View About
              </div>
            )}
          </div>
        </div>

        {/* CTA button (Frame) */}
        <button ref={ctaRef} type="button" className="flex flex-row justify-center items-center px-4 py-[14px] gap-[12px] w-[131px] h-[48px] bg-white border border-solid border-black rounded-[40px] cursor-pointer shrink-0">
          <span className="font-medium text-[16px] leading-[20px] text-[#181818]" style={{ fontFamily: "'Google Sans Flex', sans-serif" }}>Let's Talk</span>
          <MailIcon />
        </button>
      </div>
    </div>
  )
}

/* ── Navbar ─────────────────────────────────────────────────── */
export default function Navbar() {
  const navRef = useRef(null)
  const time = useGMTClock()
  const [menuOpen, setMenuOpen] = useState(false)
  const { isPreloading } = useContext(PreloadContext)

  /* ── Scroll-aware hide/show ─────────────────────────────── */
  useEffect(() => {
    let scrollTimer = null
    let isHidden = false

    const handleScroll = () => {
      if (!isHidden) {
        isHidden = true
        gsap.to(navRef.current, { y: -80, opacity: 0, duration: 0.35, ease: 'power2.inOut' })
      }
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        isHidden = false
        gsap.to(navRef.current, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
      }, 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimer)
    }
  }, [])

  /* ── Directionally-aware entrance animation via useGSAP ─── */
  useGSAP(() => {
    if (isPreloading) {
      gsap.set(navRef.current, { opacity: 0 })
      return
    }

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const children = navRef.current?.querySelectorAll('#nav-identity, #nav-links > *')
      if (!children?.length) return
      gsap.set(navRef.current, { opacity: 1 })
      gsap.from(children, { y: -32, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', delay: 0.15 })
    })
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(navRef.current, { opacity: 1 })
    })
  }, { scope: navRef, dependencies: [isPreloading] })

  /* Lock body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { label: 'Works', href: '/projects', internal: true },
    { label: 'About', href: '/#about', internal: false },
  ]

  return (
    <>
      <header
        ref={navRef}
        role="banner"
        className="navbar fixed top-0 left-0 right-0 z-50 bg-white opacity-0"
      >
        <Container className="navbar-inner flex items-end lg:items-center justify-between w-full box-border">
          {/* ── Left: name + clock ─────── */}
          <Link
            to="/"
            id="nav-identity"
            className="flex items-center gap-0 text-[14px] leading-[17px] lg:text-base font-normal tracking-tight text-[#0d0d0d] select-none whitespace-nowrap"
            style={{ textDecoration: 'none' }}
            aria-label="Go to home page"
          >
            <span style={{ fontFamily: 'var(--font-custom-xh)' }}>Musbaudeen</span>
            <span className="hidden lg:inline" style={{ fontFamily: 'var(--font-custom-xh)' }}>
              &nbsp;|&nbsp;{time}
            </span>
          </Link>

          {/* ── Right: nav links + sparkle (Desktop) ──────────────────────── */}
          <nav
            id="nav-links"
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-5 sm:gap-7"
          >
            {navLinks.map(({ label, href, internal }) =>
              internal ? (
                <Link
                  key={label}
                  to={href}
                  className="text-base font-normal text-[#0d0d0d] relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#0d0d0d] after:transition-[width] after:duration-300 hover:after:w-full transition-opacity duration-200 hover:opacity-70"
                  style={{ fontFamily: 'var(--font-custom-xh)' }}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="text-base font-normal text-[#0d0d0d] relative after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#0d0d0d] after:transition-[width] after:duration-300 hover:after:w-full transition-opacity duration-200 hover:opacity-70"
                  style={{ fontFamily: 'var(--font-custom-xh)' }}
                >
                  {label}
                </a>
              )
            )}
            <button
              id="nav-sparkle"
              aria-label="Menu"
              className="flex items-center justify-center text-[#0d0d0d] transition-transform duration-500 hover:rotate-90 cursor-pointer"
            >
              <SparkleIcon />
            </button>
          </nav>

          {/* ── Mobile Hamburger ── */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="lg:hidden flex items-center justify-center w-[28px] h-[28px] bg-transparent border-none p-0 cursor-pointer"
          >
            <HamburgerIcon />
          </button>
        </Container>
      </header>

      {/* Full-screen overlay — mobile only */}
      <div className="lg:hidden">
        <MobileMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>

      <style>{`
        /* ── Shared navbar sizing ── */
        .navbar {
          border-bottom: none;
        }
      `}</style>
    </>
  )
}
