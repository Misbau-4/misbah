import { useRef } from 'react'
import gsap from 'gsap'
import arrowPinkVector from '../assets/arrow-pink-vector.svg'
import smileyVector from '../assets/pixel-smile.svg'
import blueSeriousVector from '../assets/blue-serious-vector.svg'
import yellowSeriousVector from '../assets/yellow-smile-Vector.svg'
import greenVector from '../assets/green-asterisk.svg'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin)

/* ── Mail icon for CTA ──────────────────────────────────── */
function MailIcon() {
  return (
    <svg
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" />
    </svg>
  )
}

/* ── Panel 000 ────────────────────────────────────────────
   Desktop: shown inside horizontal scroll container
   Mobile:  hidden (mobile layout renders its own block)
*/
function Panel000({ textRef, btnRef, btnTextRef, btnIconRef, flairRef, onBtnEnter, onBtnLeave, onBtnMove }) {
  return (
    <div className="about-panel relative flex-shrink-0 h-[100dvh] bg-[#FFFFFF] overflow-hidden flex items-center xl:items-start xl:justify-center">
      <div className="panel-000-desktop-wrapper">
        <div className="frame-000-main">
          <div className="frame-000-text-container">
            <p ref={textRef} className="text-000-main">
              I'm <em style={{ fontStyle: 'italic', color: '#00C896' }}>Misbah,</em> I am a Developer and Designer focused on bringing intuitive concepts to life.
            </p>
          </div>
          <button
            ref={btnRef}
            type="button"
            className="btn-000-frame group relative overflow-hidden transition-colors duration-200"
            style={{ borderColor: '#000000', backgroundColor: '#FFFFFF' }}
            onMouseEnter={onBtnEnter}
            onMouseLeave={onBtnLeave}
            onMouseMove={onBtnMove}
          >
            <div
              ref={flairRef}
              className="absolute pointer-events-none rounded-full"
              style={{ width: 10, height: 10, background: '#131313', top: 0, left: 0, transform: 'translate(-50%, -50%) scale(0)', zIndex: 0 }}
            />
            <div className="relative z-10 flex items-center gap-[1.2rem]">
              <span ref={btnTextRef} className="btn-000-text inline-block transition-colors duration-200 group-hover:text-white">Let's Talk</span>
              <div ref={btnIconRef} className="btn-000-icon inline-block transition-colors duration-200 group-hover:text-white"><MailIcon /></div>
            </div>
          </button>
        </div>
        <img src={arrowPinkVector} alt="" className="vector-176-000" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ── Panel Merged (001 + 002 + 003) — desktop only ───────── */
function PanelMerged({ textRef }) {
  return (
    <div className="about-panel relative flex-shrink-0 h-[100dvh] bg-[#FFFFFF] overflow-hidden flex items-center xl:items-start">
       <div className="panel-merged-desktop-wrapper">
          <div ref={textRef} className="frame-merged-row">
             <div className="text-merged-I" style={{ fontWeight: 500 }}>I</div>
             
             <div className="text-merged-build">
                <span className="inline-block mr-[2px]">b</span>
                <span 
                  className="inline-block"
                  style={{
                    width: '3.8rem', height: '4.2rem',
                    background: '#6972F0',
                    border: '1.4px solid #6972F0',
                    borderRadius: '0 0 2rem 2rem',
                    margin: '0 0.4rem',
                    verticalAlign: 'middle'
                  }}
                  aria-hidden="true"
                />
                <span className="inline-block ml-[2px]">ild</span>
             </div>
             
             <div className="text-merged-digital" style={{ fontWeight: 500 }}>digital products where</div>
             
             <div className="frame-merged-highlight">
                <div className="text-merged-discoverability">discoverability</div>
             </div>
             
             <div className="text-merged-effortless" style={{ fontWeight: 500 }}>is effortless and</div>
             
             <div className="text-merged-understanding">
               <span style={{ color: '#9295FE', fontFamily: 'Nohemi', marginRight: '1.6rem' }}>understanding</span>
               <span style={{ color: '#131313', fontFamily: 'var(--font-custom-xh)', fontWeight: 500 }}>is</span>
             </div>
             
             <div className="frame-1321315526">
                <div className="text-merged-instant">
                  inst
                  <span 
                    className="inline-block"
                    style={{
                      width: 0, height: 0,
                      borderLeft: '0.28em solid transparent',
                      borderRight: '0.28em solid transparent',
                      borderBottom: '0.55em solid #01CB70',
                      margin: '0 0.4rem',
                      verticalAlign: 'baseline',
                    }}
                    aria-hidden="true"
                  />
                  nt.
                </div>
             </div>
          </div>
          
          <img src={blueSeriousVector} alt="" className="vector-001-smiley" aria-hidden="true" />
          <img src={smileyVector} alt="" className="image-001-71" aria-hidden="true" />
          <img src={greenVector} alt="" className="group-13714" />
          <img src={yellowSeriousVector} alt="" className="vector-003-ghost" aria-hidden="true" />
       </div>
    </div>
  )
}

/* ── Mobile Layout — shown only on < 102.4rem ─────────────── */
function MobileAboutLayout({ introRef, descRef, mobileBtnRef, mobileBtnTextRef, mobileBtnIconRef, mobileFlairRef, onBtnEnter, onBtnLeave, onBtnMove }) {
  return (
    <div className="about-mobile-layout">
      <div className="about-mobile-frame">
        <p ref={introRef} className="about-mobile-intro">
          I'm <em style={{ fontStyle: 'italic', color: '#00C896' }}>Misbah,</em> I am a &#123;Developer&#125; and Designer focused on bringing intuitive concepts to life.
        </p>
        <p ref={descRef} className="about-mobile-desc">
          I build digital products where{' '}
          <span style={{ color: '#00C896' }}>discoverability</span> is effortless and{' '}
          <span style={{ color: '#00C896' }}>understanding</span> is instant.
        </p>
      </div>
      <button
        ref={mobileBtnRef}
        type="button"
        className="btn-000-frame group relative overflow-hidden"
        style={{ borderColor: '#000000', backgroundColor: '#FFFFFF' }}
        onMouseEnter={onBtnEnter}
        onMouseLeave={onBtnLeave}
        onMouseMove={onBtnMove}
      >
        <div
          ref={mobileFlairRef}
          className="absolute pointer-events-none rounded-full"
          style={{ width: 10, height: 10, background: '#131313', top: 0, left: 0, transform: 'translate(-50%, -50%) scale(0)', zIndex: 0 }}
        />
        <div className="relative z-10 flex items-center gap-[1.2rem]">
          <span ref={mobileBtnTextRef} className="btn-000-text inline-block">Let's Talk</span>
          <div ref={mobileBtnIconRef} className="btn-000-icon inline-block"><MailIcon /></div>
        </div>
      </button>
    </div>
  )
}

/* ── Main AboutSection ──────────────────────────────────── */
export default function AboutSection() {
  const wrapperRef      = useRef(null)
  const containerRef    = useRef(null)
  const text000Ref      = useRef(null)
  const textMergedRef   = useRef(null)
  // Mobile text refs
  const mobileIntroRef  = useRef(null)
  const mobileDescRef   = useRef(null)
  
  // Desktop button refs
  const btnRef          = useRef(null)
  const btnTextRef      = useRef(null)
  const btnIconRef      = useRef(null)
  const flairRef        = useRef(null)
  // Mobile button refs
  const mobileBtnRef      = useRef(null)
  const mobileBtnTextRef  = useRef(null)
  const mobileBtnIconRef  = useRef(null)
  const mobileFlairRef    = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    /* ── Desktop: horizontal scroll pinning ────────────── */
    mm.add(
      '(min-width: 102.4rem) and (prefers-reduced-motion: no-preference)',
      () => {
        const getScrollAmount = () => {
          if (!containerRef.current) return 0
          return Math.max(0, containerRef.current.scrollWidth - window.innerWidth)
        }

        const scrollTween = gsap.to(containerRef.current, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: true,
            scrub: 1,
            end: () => '+=' + getScrollAmount(),
            invalidateOnRefresh: true,
          },
        })

        let blueTween = gsap.to('.vector-001-smiley', {
          duration: 1.5, x: 300, ease: 'power1.inOut', paused: true
        }).reverse()

        ScrollTrigger.create({
          trigger: '.vector-001-smiley',
          containerAnimation: scrollTween,
          start: 'left 90%', end: 'right 10%',
          onUpdate: (self) => {
            if (self.direction === 1) blueTween.play()
            else blueTween.reverse()
          }
        })

        let smileyTween = gsap.to('.image-001-71', {
          duration: 1.5, x: 300, y: 40, ease: 'bounce.out', paused: true
        }).reverse()

        ScrollTrigger.create({
          trigger: '.image-001-71',
          containerAnimation: scrollTween,
          start: 'left 90%', end: 'right 10%',
          onUpdate: (self) => {
            if (self.direction === 1) smileyTween.play()
            else smileyTween.reverse()
          }
        })

        gsap.to('.group-13714', {
          rotation: 360, ease: 'none',
          scrollTrigger: {
            trigger: '.group-13714',
            containerAnimation: scrollTween,
            start: 'left right', end: 'right left', scrub: 1,
          }
        })

        if (text000Ref.current) {
          const split0 = SplitText.create(text000Ref.current, { type: 'words', aria: 'auto' })
          gsap.from(split0.words, {
            opacity: 0, y: 30, duration: 0.8, stagger: 0.04, ease: 'power3.out',
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            }
          })
        }

        if (textMergedRef.current) {
          const simpleNodes = Array.from(textMergedRef.current.querySelectorAll(
            '.text-merged-I, .text-merged-build, .text-merged-discoverability, .text-merged-understanding, .text-merged-instant'
          ))
          const splitNodes = Array.from(textMergedRef.current.querySelectorAll(
            '.text-merged-digital, .text-merged-effortless'
          ))
          
          simpleNodes.forEach(node => {
            gsap.from(node, {
              opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
              scrollTrigger: {
                trigger: node,
                containerAnimation: scrollTween,
                start: 'left 95%',
                toggleActions: 'play none none reverse',
              }
            })
          })

          splitNodes.forEach(node => {
            const split = SplitText.create(node, { type: 'words', aria: 'auto' })
            gsap.from(split.words, {
              opacity: 0, y: 30, duration: 0.8, stagger: 0.04, ease: 'power3.out',
              scrollTrigger: {
                trigger: node,
                containerAnimation: scrollTween,
                start: 'left 95%',
                toggleActions: 'play none none reverse',
              }
            })
          })
        }
      }
    )

    /* ── Mobile / Tablet: vertical + scroll reveals ── */
    mm.add(
      '(max-width: 102.3rem)',
      () => {
        if (containerRef.current) {
          gsap.set(containerRef.current, { clearProps: 'all' })
          containerRef.current.style.display = 'block'
          containerRef.current.style.width   = '100%'
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!reducedMotion) {
          // Animate mobile intro text
          if (mobileIntroRef.current) {
            const split = SplitText.create(mobileIntroRef.current, { type: 'words', aria: 'auto' })
            gsap.from(split.words, {
              opacity: 0, y: 20, duration: 0.6, stagger: 0.03, ease: 'power3.out',
              scrollTrigger: {
                trigger: mobileIntroRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            })
          }
          // Animate mobile desc text
          if (mobileDescRef.current) {
            const split = SplitText.create(mobileDescRef.current, { type: 'words', aria: 'auto' })
            gsap.from(split.words, {
              opacity: 0, y: 20, duration: 0.6, stagger: 0.03, ease: 'power3.out',
              scrollTrigger: {
                trigger: mobileDescRef.current,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            })
          }
        }
      }
    )
  }, { scope: wrapperRef })

  /* ── Button interactions ── */
  const { contextSafe } = useGSAP({ scope: wrapperRef })

  const onBtnEnter = contextSafe((e) => {
    const activeBtn     = btnRef.current     || mobileBtnRef.current
    const activeText    = btnTextRef.current  || mobileBtnTextRef.current
    const activeIcon    = btnIconRef.current  || mobileBtnIconRef.current
    const activeFlair   = flairRef.current    || mobileFlairRef.current

    gsap.to([activeText, activeIcon], { duration: 0.35, color: '#FFFFFF', ease: 'none' })
    gsap.to(activeText, { duration: 0.35, text: { value: 'Say Hello' }, ease: 'none' })

    if (activeBtn && activeFlair) {
      const rect = activeBtn.getBoundingClientRect()
      gsap.set(activeFlair, { x: e.clientX - rect.left, y: e.clientY - rect.top })
      gsap.to(activeFlair, { scale: 40, duration: 0.5, ease: 'power2.out' })
    }
  })

  const onBtnMove = contextSafe((e) => {
    const activeBtn   = btnRef.current   || mobileBtnRef.current
    const activeText  = btnTextRef.current || mobileBtnTextRef.current
    const activeIcon  = btnIconRef.current || mobileBtnIconRef.current
    if (!activeBtn) return
    const { left, top, width, height } = activeBtn.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    gsap.to(activeBtn,  { x: x * 0.4, y: y * 0.4, duration: 0.6, ease: 'power2.out' })
    gsap.to(activeText, { x: x * 0.2, y: y * 0.2, duration: 0.6, ease: 'power2.out' })
    gsap.to(activeIcon, { x: x * 0.2, y: y * 0.2, duration: 0.6, ease: 'power2.out' })
  })

  const onBtnLeave = contextSafe((e) => {
    const activeBtn   = btnRef.current   || mobileBtnRef.current
    const activeText  = btnTextRef.current || mobileBtnTextRef.current
    const activeIcon  = btnIconRef.current || mobileBtnIconRef.current
    const activeFlair = flairRef.current   || mobileFlairRef.current

    gsap.to(activeText, { duration: 0.35, text: { value: "Let's Talk" }, color: '#181818', ease: 'none' })
    gsap.to(activeIcon, { duration: 0.35, color: '#181818', ease: 'none' })
    gsap.to([activeBtn, activeText, activeIcon], { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.3)' })

    if (activeBtn && activeFlair) {
      const rect = activeBtn.getBoundingClientRect()
      gsap.to(activeFlair, { x: e.clientX - rect.left, y: e.clientY - rect.top, scale: 0, duration: 0.5, ease: 'power2.inOut' })
    }
  })

  return (
    <section ref={wrapperRef} id="about" className="relative overflow-hidden">
      {/* Desktop horizontal wrapper — hidden on mobile */}
      <div ref={containerRef} className="about-horizontal-wrapper flex flex-nowrap w-max">
        <Panel000
          textRef={text000Ref}
          btnRef={btnRef}
          btnTextRef={btnTextRef}
          btnIconRef={btnIconRef}
          flairRef={flairRef}
          onBtnEnter={onBtnEnter}
          onBtnLeave={onBtnLeave}
          onBtnMove={onBtnMove}
        />
        {/* PanelMerged — desktop only */}
        <PanelMerged textRef={textMergedRef} />
      </div>

      {/* Mobile layout — only shown on < 102.4rem */}
      <MobileAboutLayout
        introRef={mobileIntroRef}
        descRef={mobileDescRef}
        mobileBtnRef={mobileBtnRef}
        mobileBtnTextRef={mobileBtnTextRef}
        mobileBtnIconRef={mobileBtnIconRef}
        mobileFlairRef={mobileFlairRef}
        onBtnEnter={onBtnEnter}
        onBtnLeave={onBtnLeave}
        onBtnMove={onBtnMove}
      />

      <style>{`
        /* ============================================= */
        /* PANEL 000 — Desktop                          */
        /* ============================================= */
        .panel-000-desktop-wrapper {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 11.3rem 8rem; gap: 1rem; isolation: isolate;
          width: 118.5rem; height: 66.2rem; position: relative; flex-shrink: 0;
        }
        .frame-000-main {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0px; gap: 4rem; width: 77.1rem; height: 27.8rem; z-index: 2;
        }
        .frame-000-text-container {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0px; gap: 4.8rem; width: 77.1rem; height: 17.4rem;
        }
        .text-000-main {
          width: 77.1rem; height: 17.4rem;
          font-family: var(--font-custom);
          font-weight: 400;
          font-size: clamp(3.2rem, 3.7vw, 4.8rem);
          line-height: 1.2; color: #181818;
        }
        .btn-000-frame {
          box-sizing: border-box; display: flex; flex-direction: row;
          justify-content: center; align-items: center;
          padding: 2rem 2.8rem; gap: 1.2rem;
          background: #FFFFFF; border: 1px solid #000000; border-radius: 40px;
          cursor: pointer; width: auto; height: auto;
        }
        .btn-000-text {
          font-family: 'Google Sans Flex', sans-serif;
          font-weight: 500; font-size: 1.6rem; line-height: 2rem;
          text-align: center; color: #181818; white-space: nowrap;
        }
        .btn-000-icon svg { width: 2.4rem; height: 2.4rem; }
        .vector-176-000 {
          position: absolute; width: 15.3rem; height: 17.2rem;
          left: 83.135rem; top: 31.012999999999998rem;
          transform: matrix(-0.97, 0.26, 0.26, 0.97, 0, 0); z-index: 1;
        }

        /* ============================================= */
        /* MERGED PANEL (001+002+003) — Desktop          */
        /* ============================================= */
        .panel-merged-desktop-wrapper {
          display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
          padding: 11.3rem 0px 11.3rem 10.5rem; gap: 1rem; isolation: isolate;
          position: relative; width: 364.5rem; height: 66.2rem; background: #FFFFFF; flex-shrink: 0;
        }
        .frame-merged-row {
          display: flex; flex-direction: row; align-items: center;
          padding: 0px; gap: 1.677rem;
          width: 314.618rem; height: 9.4rem; z-index: 0;
        }
        .text-merged-I, .text-merged-build, .text-merged-digital,
        .text-merged-effortless, .text-merged-understanding, .text-merged-instant {
          font-family: var(--font-custom-xh); font-weight: 500;
          font-size: 7.82517rem; line-height: 1.2; letter-spacing: -0.02em;
          color: #131313; white-space: nowrap; height: 9.4rem;
        }
        /* .text-merged-build line-height override removed for baseline alignment */
        .frame-merged-highlight {
          display: flex; flex-direction: row; justify-content: center; align-items: center;
          padding: 0px 1.67682rem; gap: 1.397rem; height: 9.4rem; background: #F6FF52;
        }
        .text-merged-discoverability {
          font-family: 'Nohemi', sans-serif; font-weight: 500;
          font-size: 7.82517rem; line-height: 1.2; letter-spacing: -0.01em;
          color: #010005; white-space: nowrap; height: 9.4rem;
        }
        .frame-1321315526 {
          height: 9.4rem; position: relative; display: flex; align-items: center;
        }
        .text-merged-instant {
          font-family: var(--font-custom-xh); font-weight: 500;
          font-size: 7.82517rem; line-height: 1.2; letter-spacing: -0.02em;
          color: #01CB70; white-space: nowrap;
        }
        .vector-001-smiley {
          position: absolute; width: 9.2rem; height: 8.487rem; left: 31.9rem; top: 42.245999999999995rem; z-index: 1;
        }
        .image-001-71 {
          position: absolute; width: 15.25rem; height: 17.15rem; left: 75rem; top: 7.5rem; z-index: 2;
        }
        .group-13714 {
          position: absolute; width: 14.5rem; height: 15rem; left: 173.7rem; top: 41.3rem; z-index: 3;
        }
        .vector-003-ghost {
          position: absolute; width: 8.437999999999999rem; height: 9.269rem; left: 241.3rem; top: 15.9rem;
          transform: matrix(-1, 0, 0, 1, 0, 0); z-index: 4;
        }

        /* ============================================= */
        /* MOBILE LAYOUT (< 102.4rem)                     */
        /* ============================================= */

        /* Hide desktop horizontal scroll on mobile */
        @media (max-width: 63.9375em) {
          .about-horizontal-wrapper {
            display: none !important;
          }

          /* Mobile layout: Figma spec — padding 14.6rem 1.6rem 10rem, gap 4.8rem */
          .about-mobile-layout {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 12rem 1.6rem 10rem;
            gap: 4.8rem;
            width: 100%;
            box-sizing: border-box;
          }

          .about-mobile-frame {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 0;
            gap: 4.8rem;
            width: 100%;
          }

          /* Intro text: Haffer-TRIAL, 2.8rem → clamp for all sizes */
          .about-mobile-intro {
            font-family: var(--font-custom);
            font-style: normal;
            font-weight: 400;
            font-size: clamp(2rem, 5.5vw, 2.8rem);
            line-height: 1.2;
            color: #181818;
            margin: 0;
            width: 100%;
          }

          /* Desc text: Haffer XH-TRIAL, 2.8rem → clamp */
          .about-mobile-desc {
            font-family: var(--font-custom-xh);
            font-style: normal;
            font-weight: 400;
            font-size: clamp(2rem, 5.5vw, 2.8rem);
            line-height: 1.2;
            letter-spacing: -0.02em;
            color: #131313;
            margin: 0;
            width: 100%;
          }

          /* Mobile CTA button — Figma: padding 1.4rem 1.6rem, gap 1.2rem */
          .btn-000-frame {
            padding: 1.4rem 1.6rem !important;
          }
          .btn-000-text {
            font-size: 1.6rem !important;
            line-height: 2rem !important;
            width: auto !important;
            height: auto !important;
          }
          .btn-000-icon svg { width: 1.8rem !important; height: 1.8rem !important; }

          /* Decorative vectors: always hidden on mobile */
          .vector-176-000, .vector-001-smiley, .image-001-71,
          .group-13714, .vector-003-ghost { display: none !important; }
        }

        /* Hide mobile layout on desktop */
        @media (min-width: 64em) {
          .about-mobile-layout { display: none !important; }
        }

        /* Extra small devices (≤ 37.5rem) */
        @media (max-width: 23.4375em) {
          .about-mobile-intro,
          .about-mobile-desc {
            font-size: clamp(1.8rem, 5vw, 2.2rem);
          }
          .about-mobile-layout {
            padding-top: 12rem;
          }
        }
      `}</style>
    </section>
  )
}
