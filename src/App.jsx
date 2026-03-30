import Navbar      from './sections/Navbar'
import HeroSection from './sections/HeroSection'

function App() {
  return (
    <>
      <Navbar />

      <main className="pt-[55px] sm:pt-[80px] lg:pt-[64px]">
        <HeroSection />

        {/* ── Further sections added here progressively ── */}
      </main>
    </>
  )
}

export default App
