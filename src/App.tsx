import { useState, useCallback } from 'react';
import './App.css';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading && <Preloader onComplete={handlePreloaderComplete} />}
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Marquee />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
