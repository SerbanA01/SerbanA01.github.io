import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Model3D from './Model3D'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: 'Soluții industriale și comerciale',
      description: 'Structuri robuste pentru depozite, unități de producție sau spații comerciale, ce rezistă rigorilor mediilor solicitante.',
      link: '/portofoliu',
      linkText: 'Află mai mult'
    },
    {
      title: 'Structuri arhitecturale',
      description: 'Spații de locuit modulare și alte elemente arhitecturale ce îmbină perfect estetica și funcționalitatea.',
      link: '/servicii#structuri_metalice',
      linkText: 'Află mai mult'
    },
    {
      title: 'Piese utilaje agricole',
      description: 'Piese și accesorii fiabile și rezistente pentru o agricultură performantă.',
      link: '/servicii#piese_agricole',
      linkText: 'Află mai mult'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <>
      {/* Hero Slider Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
  <div
    key={index}
    className={`absolute inset-0 transition-opacity duration-1000 ${
      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
    }`}
  >
{/* Background Image */}
<div 
  className="absolute inset-0"
  style={{
    backgroundImage: `url(/images/edited/carousel/carouselimg${index + 1}.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}
/>

    {/* Lighter gradient overlay - shows more of the image */}
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/40 to-transparent z-10" />

    {/* Content */}
    {/* Content */}
<div className="relative z-20 h-full flex items-center">
  <div className="container-custom">
    <div className="max-w-3xl px-12 md:px-0">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight drop-shadow-2xl">
        {slide.title}
      </h1>
      <p className="text-lg md:text-2xl text-gray-200 mb-6 md:mb-8 leading-relaxed drop-shadow-lg">
        {slide.description}
      </p>
      <Link 
        to={slide.link}
        className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
      >
        {slide.linkText}
      </Link>
    </div>
  </div>
</div>
  </div>
))}
        {/* Navigation Arrows */}
        {/* Navigation Arrows */}
<button
  onClick={prevSlide}
  className="absolute left-2 md:left-8 top-1/2 md:top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300"
  aria-label="Previous slide"
>
  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
</button>
<button
  onClick={nextSlide}
  className="absolute right-2 md:right-8 top-1/2 md:top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300"
  aria-label="Next slide"
>
  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
</button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Section with 3D Model */}
          <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 px-4">
            Dezvoltă-ți proiectele pe structuri metalice durabile
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 px-4">
            <p className="text-lg text-gray-700 leading-relaxed">
              Ești exact unde trebuie. Aici, designul se întâlnește cu precizia, producția cu 
              măiestria, iar viziunea ta devine realitate. Oferim un proces complet, de la proiectare 
              și fabricare până la montaj, pentru a aduce la viață structuri metalice robuste și 
              inovatoare, create cu grijă și atenție la detalii. Indiferent de complexitatea proiectului 
              tău, echipa noastră te va ghida pas cu pas pentru a transforma ideile în construcții 
              solide și durabile.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Descoperă cât de accesibil poate fi proiectul tău.
            </p>
            <div className="pt-4">
              <Link 
                to="/estimator-cost"
                className="btn-primary inline-block"
              >
                Estimator cost
              </Link>
            </div>
          </div>

          <div className="relative px-4">
            <Model3D />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Hero