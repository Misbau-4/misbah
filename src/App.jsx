/**
 * App.jsx
 *
 * Root application component.
 * Renders: Navbar → Hero → About (3-panel horizontal scroll) → Work → Footer
 */

import Navbar      from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import WorkSection from './sections/WorkSection'
import Footer      from './sections/Footer'

function App() {
  return (
    <>
      <Navbar />

      <main className="pt-[55px] sm:pt-[80px] lg:pt-[64px]">
        {/* Hero — normal vertical scroll */}
        <HeroSection />

        {/* About — 3 panels with horizontal scroll pinning */}
        <AboutSection />

        {/* Work / Selected Projects */}
        <WorkSection />
      </main>

      <Footer />
    </>
  )
}

export default App
