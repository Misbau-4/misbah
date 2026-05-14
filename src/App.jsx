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

function App() {
  return (
    <>
      <Navbar />

      <main className="pt-[55px] sm:pt-[80px] lg:pt-[64px]">
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
    </>
  )
}

export default App
