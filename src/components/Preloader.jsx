import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { interpolate } from 'flubber'

gsap.registerPlugin(useGSAP)

/* ── SVG Path Definitions ── */
const path_rect     = "M0 0H43V43H0Z"
const path_tri      = "M24.6817 0L49.3634 42.75H0L24.6817 0Z"
const path_circle   = "M0,21.5C0,9.62588 9.62588,0 21.5,0C33.3741,0 43,9.62588 43,21.5C43,33.3741 33.3741,43 21.5,43C9.62588,43 0,33.3741 0,21.5Z"

const path_slant    = "M0 0L22.1367 16.5L43 0V43H0V0Z"
const path_arch     = "M0 0H21.5C33.3741 0 43 9.62588 43 21.5C43 33.3741 33.3741 43 21.5 43H0V0Z"

const path_blob     = "M1.064 44.912C0.765333 44.128 0.522667 43.1387 0.336 41.944C0.149333 40.7493 0.0373333 39.5173 0 38.248C0 36.9413 0.0373333 35.6907 0.112 34.496C0.224 33.3013 0.410667 32.312 0.672 31.528C1.86667 31.2667 2.78133 30.7253 3.416 29.904C4.088 29.0453 4.57333 28.0187 4.872 26.824C5.17067 25.592 5.41333 24.3227 5.6 23.016C5.824 21.6347 5.97333 20.3093 6.048 19.04C6.12267 17.7333 5.97333 16.632 5.6 15.736C5.264 14.84 4.51733 14.2987 3.36 14.112C3.024 13.44 2.78133 12.5253 2.632 11.368C2.48267 10.2107 2.408 8.97867 2.408 7.672C2.44533 6.328 2.55733 5.04 2.744 3.808C2.93067 2.53867 3.21067 1.456 3.584 0.559999C5.11467 0.709333 7 0.858667 9.24 1.008C11.48 1.12 14.4667 1.176 18.2 1.176C20.7387 1.176 23.4827 1.08266 26.432 0.895998C29.4187 0.671999 32.48 0.466666 35.616 0.28C38.752 0.0933332 41.8133 0 44.8 0C47.3387 0 49.336 0.541333 50.792 1.624C52.2853 2.66933 53.4053 4.05067 54.152 5.768C54.8987 7.48533 55.384 9.33333 55.608 11.312C55.832 13.2907 55.9253 15.232 55.888 17.136C55.888 19.0027 55.888 20.6267 55.888 22.008C55.888 24.2107 56.0933 25.9653 56.504 27.272C56.9147 28.5413 57.456 29.4933 58.128 30.128C58.8373 30.7627 59.584 31.2293 60.368 31.528C60.6293 32.312 60.7973 33.3013 60.872 34.496C60.984 35.6907 61.0213 36.9413 60.984 38.248C60.984 39.5173 60.8907 40.7493 60.704 41.944C60.5173 43.1387 60.2747 44.128 59.976 44.912C58.4453 44.7627 56.5973 44.576 54.432 44.352C52.304 44.128 49.728 44.016 46.704 44.016C43.6053 44.016 40.6747 44.128 37.912 44.352C35.1867 44.576 33.0587 44.7627 31.528 44.912C31.3787 44.128 31.248 43.1387 31.136 41.944C31.024 40.7493 30.9493 39.5173 30.912 38.248C30.8747 36.9413 30.8747 35.6907 30.912 34.496C30.9493 33.3013 31.024 32.312 31.136 31.528H32.704V28.728H27.832V31.528H29.4C29.5493 32.312 29.6427 33.3013 29.68 34.496C29.7547 35.6907 29.7733 36.9413 29.736 38.248C29.6987 39.5173 29.624 40.7493 29.512 41.944C29.4 43.1387 29.232 44.128 29.008 44.912C28 44.8 26.9173 44.6693 25.76 44.52C24.64 44.408 23.3147 44.296 21.784 44.184C20.2907 44.072 18.4427 44.016 16.24 44.016C12.768 44.016 9.78133 44.1093 7.28 44.296C4.77867 44.52 2.70667 44.7253 1.064 44.912ZM28.224 20.496H32.256V17.864H28.224V20.496Z"
const path_complex3 = "M28.952 45.192C25.9653 45.192 23.352 45.136 21.112 45.024C18.872 44.9493 16.7627 44.856 14.784 44.744C12.8053 44.6693 10.752 44.6133 8.624 44.576C6.496 44.576 4.05067 44.632 1.288 44.744C0.989333 43.96 0.746667 42.9893 0.56 41.832C0.373333 40.6373 0.261333 39.3867 0.224 38.08C0.224 36.7733 0.261333 35.5413 0.336 34.384C0.448 33.1893 0.634667 32.2 0.896 31.416C1.68 31.192 2.352 30.7813 2.912 30.184C3.472 29.5493 3.90133 28.5787 4.2 27.272C4.49867 25.9653 4.648 24.192 4.648 21.952C4.648 19.824 4.46133 18.2 4.088 17.08C3.752 15.96 3.304 15.176 2.744 14.728C2.184 14.28 1.568 14 0.896 13.888C0.522667 12.8053 0.261333 11.4427 0.112 9.8C-0.0373333 8.12 -0.0373333 6.42133 0.112 4.704C0.298667 2.94933 0.634667 1.456 1.12 0.224C3.50933 0.448 5.768 0.559999 7.896 0.559999C10.0613 0.559999 12.2827 0.522667 14.56 0.448001C16.8373 0.336 19.32 0.242667 22.008 0.168001C24.696 0.0560004 27.776 0 31.248 0C39.1627 0 45.2107 1.64267 49.392 4.928C53.6107 8.21333 55.72 13.4773 55.72 20.72C55.72 23.1467 55.496 25.5547 55.048 27.944C54.6373 30.296 53.872 32.5173 52.752 34.608C51.6693 36.6613 50.12 38.4907 48.104 40.096C46.088 41.664 43.512 42.9147 40.376 43.848C37.2773 44.744 33.4693 45.192 28.952 45.192ZM26.432 25.872H29.848V18.648H26.432V25.872Z"

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null)
  
  // Element A: Starts as Square
  const elA = useRef(null)
  // Element B: Starts as Triangle
  const elB = useRef(null)
  // Element C: Starts as Circle
  const elC = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) onComplete()
      }
    })

    // Helper for morphing an SVG path via flubber
    const morphTo = (ref, fromPath, toPath, duration = 0.5, ease = "power2.inOut") => {
      const interpolator = interpolate(fromPath, toPath, { maxSegmentLength: 2 })
      const proxy = { val: 0 }
      return gsap.to(proxy, {
        val: 1,
        duration,
        ease,
        onUpdate: function() {
          ref.current.setAttribute('d', interpolator(this.targets()[0].val))
        }
      })
    }

    // --- STATE 1 Initial Setup ---
    // A: Square (w:43, x:0)
    // B: Triangle (w:49.36, x:55)
    // C: Circle (w:43, x:109)
    // Container total width: 15.2rem. To center this, GSAP moves absolute items.
    gsap.set(elA.current, { x: 0 })
    gsap.set(elB.current, { x: 55 })
    gsap.set(elC.current, { x: 109 })
    gsap.set(containerRef.current, { width: 152, xPercent: -50, yPercent: -50, left: '50%', top: '50%' })

    // Brief hold on State 1
    tl.to({}, { duration: 0.5 })

    // --- STATE 2 Swap (Morph In-Place) ---
    // Container width expands to 15.936000000000002rem
    // Element A (x=0) morphs from Rectangle to Triangle.
    // Element B (x=55) morphs from Triangle to Rectangle and shifts to x=61.36.
    // Element C (x=109) stays Circle and shifts to x=116.36.
    tl.addLabel("state2")
    tl.to(containerRef.current, { width: 159.36, duration: 0.6, ease: "power2.inOut" }, "state2")
    tl.to(elB.current, { x: 61.36, duration: 0.6, ease: "power2.inOut" }, "state2")
    tl.to(elC.current, { x: 116.36, duration: 0.6, ease: "power2.inOut" }, "state2")
    tl.add(morphTo(elA, path_rect, path_tri, 0.6), "state2")
    tl.add(morphTo(elB, path_tri, path_rect, 0.6), "state2")

    // --- STATE 3 Morph 1 ---
    // A (Left) stays Triangle
    // B (Center, Rectangle) -> Slant
    // C (Right, Circle) -> Arch
    tl.addLabel("state3", "+=0.3")
    tl.add(morphTo(elB, path_rect, path_slant, 0.6), "state3")
    tl.add(morphTo(elC, path_circle, path_arch, 0.6), "state3")

    // --- STATE 4 Morph 2 ---
    // Container width: 17.1rem
    // A (Left, Triangle) -> Blobby
    // B (Center, Slant) -> Slant, shifts to 73
    // C (Right, Arch) -> Arch, shifts to 128
    tl.addLabel("state4", "+=0.3")
    tl.to(containerRef.current, { width: 171, duration: 0.6, ease: "power2.inOut" }, "state4")
    tl.to(elB.current, { x: 73, duration: 0.6, ease: "power2.inOut" }, "state4")
    tl.to(elC.current, { x: 128, duration: 0.6, ease: "power2.inOut" }, "state4")
    tl.add(morphTo(elA, path_tri, path_blob, 0.6), "state4")

    // --- STATE 5 Morph 3 ---
    // Container width: 17.208000000000002rem
    // A (Left, Blobby) -> Triangle
    // B (Center, Slant) -> Slant, shifts to 61.36
    // C (Right, Arch) -> Complex3, shifts to 116.36
    tl.addLabel("state5", "+=0.3")
    tl.to(containerRef.current, { width: 172.08, duration: 0.6, ease: "power2.inOut" }, "state5")
    tl.to(elB.current, { x: 61.36, duration: 0.6, ease: "power2.inOut" }, "state5")
    tl.to(elC.current, { x: 116.36, duration: 0.6, ease: "power2.inOut" }, "state5")
    tl.add(morphTo(elA, path_blob, path_tri, 0.6), "state5")
    tl.add(morphTo(elC, path_arch, path_complex3, 0.6), "state5")

    // --- STATE 6 Morph 4 ---
    // Container width: 15.936000000000002rem
    // C (Right, Complex3) -> Arch
    tl.addLabel("state6", "+=0.3")
    tl.to(containerRef.current, { width: 159.36, duration: 0.6, ease: "power2.inOut" }, "state6")
    tl.add(morphTo(elC, path_complex3, path_arch, 0.6), "state6")

    // --- STATE 7 Morph 5 ---
    // B (Center, Slant) -> Rectangle
    // C (Right, Arch) -> Circle
    tl.addLabel("state7", "+=0.3")
    tl.add(morphTo(elB, path_slant, path_rect, 0.6), "state7")
    tl.add(morphTo(elC, path_arch, path_circle, 0.6), "state7")

    // --- STATE 8 Collapse ---
    // A (Left, Triangle) moves +5rem and fades out
    // C (Right, Circle) moves -5rem and fades out
    tl.addLabel("state8", "+=0.3")
    tl.to(elA.current, { x: "+=50", opacity: 0, duration: 0.5, ease: "power2.in" }, "state8")
    tl.to(elC.current, { x: "-=50", opacity: 0, duration: 0.5, ease: "power2.in" }, "state8")
    
    // Quick center wrapper to perfectly align the remaining Rectangle (B)
    tl.to(elB.current, { x: 79.68 - 21.5, duration: 0.5, ease: "power2.inOut" }, "state8")

    // --- STATE 9 Scale out Mask ---
    // Scale B massive to cover screen
    tl.addLabel("state9", "+=0.2")
    // Use scale up to 100 to fill standard screens
    tl.to(elB.current, { scale: 100, transformOrigin: "50% 50%", duration: 1, ease: "expo.in" }, "state9")
    // Fade out overlay bg at the very end
    tl.to(".preloader-bg", { opacity: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")

  }, { scope: containerRef })

  return (
    <div className="preloader-bg fixed inset-0 z-[9999] bg-[#FF9750] overflow-hidden pointer-events-none">
      <div ref={containerRef} className="absolute h-[4.6rem]" style={{ width: 152 }}>
        
        {/* Element A (Starts as Square) */}
        <svg className="absolute top-0 overflow-visible" width="62" height="46" viewBox="0 0 62 46" fill="none" style={{ left: 0 }}>
          <path ref={elA} d={path_rect} fill="white" />
        </svg>

        {/* Element B (Starts as Triangle) */}
        <svg className="absolute top-0 overflow-visible" width="62" height="46" viewBox="0 0 62 46" fill="none" style={{ left: 0 }}>
          <path ref={elB} d={path_tri} fill="white" />
        </svg>

        {/* Element C (Starts as Circle) */}
        <svg className="absolute top-0 overflow-visible" width="62" height="46" viewBox="0 0 62 46" fill="none" style={{ left: 0 }}>
          <path ref={elC} d={path_circle} fill="white" />
        </svg>

      </div>
    </div>
  )
}
