import Header from './components/Header'
import Hero from './components/Hero'
import Calculator from './components/Calculator'
import AsFeaturedIn from './components/AsFeaturedIn'
import SuccessStories from './components/SuccessStories'
import ScreenshotProof from './components/ScreenshotProof'
import Footer from './components/Footer'

function App() {
  return (
    <div id="top" className="min-h-screen bg-brand-bg">
      <Header />
      <main>
        <Hero />
        <Calculator />
        <AsFeaturedIn />
        <SuccessStories />
        <ScreenshotProof />
      </main>
      <Footer />
    </div>
  )
}

export default App
