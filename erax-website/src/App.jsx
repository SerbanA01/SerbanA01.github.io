import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutPreview from './components/AboutPreview'
import Footer from './components/Footer'
import Servicii from './pages/Servicii'
import DespreNoi from './pages/DespreNoi'
import Contact from './pages/Contact'
import Portofoliu from './pages/Portofoliu'
import EstimatorCost from './pages/EstimatorCost'
import ScrollToTop from './components/ScrollToTop'; // Import the component
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop /> 
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <AboutPreview />
            </>
          } />
          <Route path="/servicii" element={<Servicii />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portofoliu" element={<Portofoliu />} />
          <Route path="/estimator-cost" element={<EstimatorCost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App