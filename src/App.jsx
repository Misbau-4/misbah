/**
 * App.jsx
 *
 * Root application component.
 * Renders: Navbar → About (3-panel horizontal scroll) → Hero → Work → Footer
 */

import Navbar      from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import TestimonialSection from './sections/TestimonialSection'
import BrandSection from './sections/BrandSection'
import StackedCardsSection from './sections/StackedCardsSection'
import ExperienceSection from './sections/ExperienceSection'
import DesignProcessSection from './sections/DesignProcessSection'
import BentoGallerySection from './sections/BentoGallerySection'
import ToolStackSection from './sections/ToolStackSection'
import ColorCardsSection from './sections/ColorCardsSection'
import WorkSection from './sections/WorkSection'
import Footer      from './sections/Footer'
import Preloader   from './components/Preloader'
import { useLenis } from 'lenis/react'
import { createContext, useState, useEffect } from 'react'

export const PreloadContext = createContext({ isPreloading: true })

function App() {
  const [isPreloading, setIsPreloading] = useState(true)
  const lenis = useLenis()

  useEffect(() => {
    if (isPreloading) {
      lenis?.stop()
      document.body.style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      lenis?.start()
      document.body.style.overflow = ''
    }
  }, [isPreloading, lenis])

  return (
    <PreloadContext.Provider value={{ isPreloading }}>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      <Navbar />

      <main className="font-custom pt-[5.5rem] sm:pt-[8rem] lg:pt-[6.4rem]">
        {/* About — 3 panels with horizontal scroll pinning */}
        <AboutSection />

        {/* Hero — headline + cursor preview (desktop only) */}
        <div className="hidden lg:block">
          <HeroSection />
        </div>

        {/* Work / Selected Projects */}
        <WorkSection />

        {/* Testimonials — scroll-pinned card transition sequence */}
        <TestimonialSection />

        {/* Brand logos — staggered crossfade ticker */}
        <BrandSection />

        {/* Stacked cards — toss reveal + interactive (desktop only) */}
        <div className="hidden lg:block">
          <StackedCardsSection />
        </div>

        {/* Experience — work history + description */}
        <ExperienceSection />

        {/* Design Thought Process — 6-step process rows */}
        <DesignProcessSection />

        {/* BentoGallery + ToolStack */}
        <div className="bento-toolstack-wrapper">
          <BentoGallerySection />
          <ToolStackSection />
        </div>

        {/* Color Cards — bounce animation (desktop only) */}
        <div className="hidden lg:block">
          <ColorCardsSection />
        </div>
      </main>

      <Footer />
    </PreloadContext.Provider>
  )
}

export default App
