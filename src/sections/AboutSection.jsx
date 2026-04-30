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

/* ── Panel 000 ──────────────────────────────────────────── */
function Panel000({ textRef, btnRef, btnTextRef, btnIconRef, flairRef, onBtnEnter, onBtnLeave, onBtnMove }) {
  return (
    <div className="about-panel relative flex-shrink-0 h-[100dvh] bg-[#FFFFFF] overflow-hidden flex items-center xl:items-start xl:justify-center">
      <div className="panel-000-desktop-wrapper">
        <div className="frame-000-main">
          <div className="frame-000-text-container">
            <p ref={textRef} className="text-000-main">
              I’m <em style={{ fontStyle: 'italic', color: '#00C896' }}>Misbah,</em> I am a Developer and Designer focused on bringing intuitive concepts to life.
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
            {/* Magnetic Flair */}
            <div 
              ref={flairRef} 
              className="absolute pointer-events-none rounded-full" 
              style={{ width: 10, height: 10, background: '#131313', top: 0, left: 0, transform: 'translate(-50%, -50%) scale(0)', zIndex: 0 }} 
            />
            {/* Content Container */}
            <div className="relative z-10 flex items-center gap-[12px]">
              <span ref={btnTextRef} className="btn-000-text inline-block transition-colors duration-200 group-hover:text-white">Let’s Talk</span>
              <div ref={btnIconRef} className="btn-000-icon inline-block transition-colors duration-200 group-hover:text-white"><MailIcon /></div>
            </div>
          </button>
        </div>
        
        <img src={arrowPinkVector} alt="" className="vector-176-000" aria-hidden="true" />
      </div>
    </div>
  )
}

/* ── Panel Merged (001 + 002 + 003) ─────────────────────── */
function PanelMerged({ textRef }) {
  return (
    <div className="about-panel relative flex-shrink-0 h-[100dvh] bg-[#FFFFFF] overflow-hidden flex items-center xl:items-start">
       <div className="panel-merged-desktop-wrapper">
          <div ref={textRef} className="frame-merged-row">
             <div className="text-merged-I">I</div>
             
             <div className="text-merged-build">
                <span className="inline-block mr-[2px]">b</span>
                <span 
                  className="inline-block"
                  style={{
                    width: '38px', height: '42px',
                    background: '#6972F0',
                    border: '1.4px solid #6972F0',
                    borderRadius: '0 0 20px 20px',
                    margin: '0 4px',
                    verticalAlign: 'middle'
                  }}
                  aria-hidden="true"
                />
                <span className="inline-block ml-[2px]">ild</span>
             </div>
             
             <div className="text-merged-digital">digital products where</div>
             
             <div className="frame-merged-highlight">
                <div className="text-merged-discoverability">discoverability</div>
             </div>
             
             <div className="text-merged-effortless">is effortless and</div>
             
             <div className="text-merged-understanding">
               <span style={{ color: '#9295FE', fontFamily: 'Nohemi', marginRight: '16px' }}>understanding</span>
               <span style={{ color: '#131313', fontFamily: 'Haffer XH-TRIAL' }}>is</span>
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
                      margin: '0 4px',
                      verticalAlign: 'baseline',
                    }}
                    aria-hidden="true"
                  />
                  nt.
                </div>
             </div>
          </div>
          
          {/* Decorative images */}
          <img src={blueSeriousVector} alt="" className="vector-001-smiley" aria-hidden="true" />
          
          <img src={smileyVector} alt="" className="image-001-71" aria-hidden="true" />
          
          <img src={greenVector} alt="" className="group-13714" />
          
          <img src={yellowSeriousVector} alt="" className="vector-003-ghost" aria-hidden="true" />
       </div>
    </div>
  )
}

/* ── Main AboutSection ──────────────────────────────────── */
export default function AboutSection() {
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)
  const text000Ref = useRef(null)
  const textMergedRef = useRef(null)
  
  // Magnetic Button Refs
  const btnRef = useRef(null)
  const btnTextRef = useRef(null)
  const btnIconRef = useRef(null)
  const flairRef = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    /* ── Desktop: horizontal scroll pinning ────────────── */
    mm.add(
      '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
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

        /* Decorative Vectors - Scroll direction toggle animations */
        let blueTween = gsap.to('.vector-001-smiley', {
          duration: 1.5,
          x: 300, // explicit pixel value for clarity
          ease: 'power1.inOut',
          paused: true
        }).reverse()

        ScrollTrigger.create({
          trigger: '.vector-001-smiley',
          containerAnimation: scrollTween,
          start: 'left 90%', // Starts slightly before it enters fully
          end: 'right 10%',
          onUpdate: (self) => {
            if (self.direction === 1) {
              blueTween.play()
            } else {
              blueTween.reverse()
            }
          }
        })

        let smileyTween = gsap.to('.image-001-71', {
          duration: 1.5,
          x: 300,
          y: 40, // Modest vertical displacement for the bounce
          ease: 'bounce.out',
          paused: true
        }).reverse()

        ScrollTrigger.create({
          trigger: '.image-001-71',
          containerAnimation: scrollTween,
          start: 'left 90%',
          end: 'right 10%',
          onUpdate: (self) => {
            if (self.direction === 1) {
              smileyTween.play()
            } else {
              smileyTween.reverse()
            }
          }
        })

        /* Green Asterisk Vector - Scrub rotation animation */
        gsap.to('.group-13714', {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: '.group-13714',
            containerAnimation: scrollTween,
            start: 'left right',
            end: 'right left',
            scrub: 1, // Smooth scrub
          }
        })

        /* SplitText reveals: Panel 000 (Vertical Trigger) */
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

        /* SplitText reveals: Merged Panel (Horizontal containerAnimation) */
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

    /* ── Tablet / Mobile: vertical stack + scroll reveals ── */
    mm.add(
      '(max-width: 1023px), (prefers-reduced-motion: reduce)',
      () => {
        if (containerRef.current) {
          // Un-flex the horizontal wrapper for normal scrolling
          gsap.set(containerRef.current, { clearProps: "all" })
          containerRef.current.style.display = 'block'
          containerRef.current.style.width = '100%'
        }

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!reducedMotion) {
          /* Panel 000 */
          if (text000Ref.current) {
            const split0 = SplitText.create(text000Ref.current, { type: 'words', aria: 'auto' })
            gsap.from(split0.words, {
              opacity: 0, y: 20, duration: 0.6, stagger: 0.03, ease: 'power3.out',
              scrollTrigger: {
                trigger: text000Ref.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              }
            })
          }
          
          /* Merged Panel text blocks */
          if (textMergedRef.current) {
             const textNodes = Array.from(textMergedRef.current.querySelectorAll(
                '.text-merged-I, .text-merged-build, .text-merged-digital, .text-merged-discoverability, .text-merged-effortless, .text-merged-understanding, .text-merged-instant'
             ))
             
             textNodes.forEach(node => {
               const split = SplitText.create(node, { type: 'words', aria: 'auto' })
               gsap.from(split.words, {
                 opacity: 0, y: 20, duration: 0.6, stagger: 0.03, ease: 'power3.out',
                 scrollTrigger: {
                   trigger: node,
                   start: 'top 85%',
                   toggleActions: 'play none none reverse',
                 }
               })
             })
          }
        }
      }
    )
  }, { scope: wrapperRef })

  /* ── TextPlugin hover (contextSafe for event-driven) ──── */
  const { contextSafe } = useGSAP({ scope: wrapperRef })

  const onBtnEnter = contextSafe((e) => {
    // text change & color change
    gsap.to(btnTextRef.current, {
      duration: 0.35,
      text: { value: 'Say Hello' },
      color: '#FFFFFF',
      ease: 'none',
    })
    gsap.to(btnIconRef.current, {
      duration: 0.35,
      color: '#FFFFFF',
      ease: 'none',
    })

    // Flair entry
    if (btnRef.current && flairRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      gsap.set(flairRef.current, { x, y })
      gsap.to(flairRef.current, {
        scale: 40,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  })

  const onBtnMove = contextSafe((e) => {
    if (!btnRef.current) return
    const { clientX, clientY } = e
    const { left, top, width, height } = btnRef.current.getBoundingClientRect()
    
    // Calculate distance from center of button
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)

    // Magnetic pull on the button itself
    gsap.to(btnRef.current, { 
      x: x * 0.4, 
      y: y * 0.4, 
      duration: 0.6, 
      ease: 'power2.out' 
    })
    
    // Parallax effect on text and icon
    gsap.to(btnTextRef.current, { 
      x: x * 0.2, 
      y: y * 0.2, 
      duration: 0.6, 
      ease: 'power2.out' 
    })
    gsap.to(btnIconRef.current, { 
      x: x * 0.2, 
      y: y * 0.2, 
      duration: 0.6, 
      ease: 'power2.out' 
    })
  })

  const onBtnLeave = contextSafe((e) => {
    gsap.to(btnTextRef.current, {
      duration: 0.35,
      text: { value: "Let's Talk" },
      color: '#181818',
      ease: 'none',
    })
    gsap.to(btnIconRef.current, {
      duration: 0.35,
      color: '#181818',
      ease: 'none',
    })
    
    // Reset magnetic positions
    gsap.to([btnRef.current, btnTextRef.current, btnIconRef.current], {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.3)'
    })

    // Flair exit - shrink to mouse leave point
    if (btnRef.current && flairRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      gsap.to(flairRef.current, {
        x, 
        y, 
        scale: 0,
        duration: 0.5,
        ease: 'power2.inOut'
      })
    }
  })

  return (
    <section ref={wrapperRef} id="about" className="relative overflow-hidden">
      {/* Container needs max-content width or flex to wrap panels horizontally */}
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
        <PanelMerged textRef={textMergedRef} />
      </div>

      {/* ── Exact Figma CSS mapped to classes ──────────────── */}
      <style>{`
        /* ============================================= */
        /* PANEL 000 — unchanged                           */
        /* ============================================= */
        .panel-000-desktop-wrapper {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 113px 80px; gap: 10px; isolation: isolate;
          width: 1185px; height: 662px; position: relative; flex-shrink: 0;
        }
        .frame-000-main {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0px; gap: 40px; width: 771px; height: 278px;
          z-index: 2;
        }
        .frame-000-text-container {
          display: flex; flex-direction: column; align-items: flex-start;
          padding: 0px; gap: 48px; width: 771px; height: 174px;
        }
        .text-000-main {
          width: 771px; height: 174px;
          font-family: 'Haffer-TRIAL', sans-serif;
          font-weight: 400; font-size: 48px; line-height: 120%;
          color: #181818;
        }
        .btn-000-frame {
          box-sizing: border-box; display: flex; flex-direction: row;
          justify-content: center; align-items: center;
          padding: 20px 28px; gap: 12px; width: 161px; height: 64px;
          background: #FFFFFF; border: 1px solid #000000; border-radius: 40px;
          cursor: pointer;
        }
        .btn-000-text {
          width: 69px; height: 20px;
          font-family: 'Google Sans Flex', sans-serif;
          font-weight: 500; font-size: 16px; line-height: 20px;
          text-align: center; color: #181818; white-space: nowrap;
        }
        .vector-176-000 {
          position: absolute; width: 153px; height: 172px;
          left: 831.35px; top: 310.13px;
          transform: matrix(-0.97, 0.26, 0.26, 0.97, 0, 0); z-index: 1;
        }

        /* ============================================= */
        /* MERGED PANEL (001+002+003)                    */
        /* ============================================= */
        .panel-merged-desktop-wrapper {
          display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
          padding: 113px 0px 113px 105px; gap: 10px; isolation: isolate;
          position: relative; width: 3645px; height: 662px; background: #FFFFFF; flex-shrink: 0;
        }
        .frame-merged-row {
          display: flex; flex-direction: row; align-items: center;
          padding: 0px; gap: 16.77px;
          width: 3146.18px; height: 94px;
          z-index: 0;
        }
        
        .text-merged-I {
          width: auto; height: 94px;
          font-family: 'Haffer XH-TRIAL', sans-serif; font-style: normal; font-weight: 500;
          font-size: 78.2517px; line-height: 120%; letter-spacing: -0.02em; color: #131313;
          white-space: nowrap;
        }
        .text-merged-build {
          width: auto; height: 61.95px;
          font-family: 'Haffer XH-TRIAL', sans-serif; font-style: normal; font-weight: 500;
          font-size: 78.2517px; line-height: 61.95px; letter-spacing: -0.02em; color: #131313;
          white-space: nowrap;
        }
        .text-merged-digital {
          width: auto; height: 94px;
          font-family: 'Haffer XH-TRIAL', sans-serif; font-style: normal; font-weight: 500;
          font-size: 78.2517px; line-height: 120%; letter-spacing: -0.02em; color: #131313;
          white-space: nowrap;
        }
        
        /* Inline Frame mapping to highlight */
        .frame-merged-highlight {
          display: flex; flex-direction: row; justify-content: center; align-items: center;
          padding: 0px 16.7682px; gap: 13.97px; width: auto; height: 94px; background: #F6FF52;
        }
        .text-merged-discoverability {
          width: auto; height: 94px;
          font-family: 'Nohemi', sans-serif; font-style: normal; font-weight: 500;
          font-size: 78.2517px; line-height: 120%; letter-spacing: -0.01em; color: #010005;
          white-space: nowrap;
        }
        
        .text-merged-effortless {
          width: auto; height: 94px;
          font-family: 'Haffer XH-TRIAL', sans-serif; font-style: normal; font-weight: 500;
          font-size: 78.2517px; line-height: 120%; letter-spacing: -0.02em; color: #131313;
          white-space: nowrap;
        }
        
        .text-merged-understanding {
          width: auto; height: 94px;
          font-size: 78.2517px; line-height: 120%; letter-spacing: -0.02em;
          white-space: nowrap;
        }
        
        .frame-1321315526 {
          width: auto; height: 94px; position: relative; display: flex; align-items: center;
        }
        .text-merged-instant {
          width: auto; height: 61.04px; position: static;
          font-family: 'Haffer XH-TRIAL', sans-serif; font-style: normal; font-weight: 500;
          font-size: 78.2517px; line-height: 61.04px; letter-spacing: -0.02em; color: #01CB70;
          white-space: nowrap;
        }

        /* Merged Decorative Elements */
        .vector-001-smiley {
          position: absolute; width: 92px; height: 84.87px; left: 319px; top: 422.46px; z-index: 1;
        }
        .image-001-71 {
          position: absolute; width: 152.5px; height: 171.5px; left: 750px; top: 75px; z-index: 2;
        }
        .group-13714 {
          position: absolute; width: 145px; height: 150px; left: 1737px; top: 413px; z-index: 3;
        }
        .vector-003-ghost {
          position: absolute; width: 84.38px; height: 92.69px; left: 2413px; top: 159px; transform: matrix(-1, 0, 0, 1, 0, 0); z-index: 4;
        }

        /* ============================================= */
        /* RESPONSIVE FALLBACKS                          */
        /* ============================================= */
        @media (max-width: 1023px) {
          .panel-000-desktop-wrapper,
          .panel-merged-desktop-wrapper {
             height: auto; width: 100%; padding: 48px 20px; align-items: flex-start; overflow: hidden;
          }
          .frame-merged-row {
             width: 100% !important; height: auto !important; flex-wrap: wrap; gap: 12px;
          }
          .text-000-main { font-size: 32px; width: 100%; height: auto; }
          .frame-000-main, .frame-000-text-container { width: 100%; height: auto; }
          
          .text-merged-I, .text-merged-digital, .text-merged-build,
          .text-merged-discoverability, .text-merged-effortless,
          .text-merged-understanding, .text-merged-instant {
             font-size: 36px !important; line-height: 130%; width: auto !important; height: auto !important; white-space: normal !important;
          }
          
          .text-merged-digital, .text-merged-effortless, .text-merged-understanding {
             width: 100% !important;
          }
          
          .frame-merged-highlight {
             width: max-content !important; height: auto !important; padding: 4px 12px;
          }
          .frame-1321315526 {
             width: auto !important; height: auto !important; position: static;
          }
          .text-merged-instant {
             position: static;
          }
          
          .vector-176-000, .vector-001-smiley, .image-001-71,
          .group-13714, .vector-003-ghost {
             display: none;
          }
        }
      `}</style>
    </section>
  )
}
