import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import ProjectsPage from './pages/ProjectsPage';

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Marquee />
      <Services />
      <Contact />
    </main>
  );
}

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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project" element={<ProjectsPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
