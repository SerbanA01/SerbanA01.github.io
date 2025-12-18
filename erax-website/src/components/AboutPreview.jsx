import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Award, Users, Wrench, TrendingUp } from 'lucide-react'

const AboutPreview = () => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const counterRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)

            const timer = setInterval(() => {
              setCount((prevCount) => {
                if (prevCount < 15) {
                  return prevCount + 1
                }
                clearInterval(timer)
                return prevCount
              })
            }, 100)
          }
        })
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
    }
  }, [hasAnimated])

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Cine suntem
          </h2>
          <p className="text-xl md:text-2xl text-primary-100 mb-8">
            Mețteri în fabricarea structurilor metalice.
          </p>

          {/* Counter */}
          <div ref={counterRef} className="inline-flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-12 border border-white/20">
            <div className="text-center">
              <div className="flex items-baseline justify-center">
                <span className="text-6xl md:text-7xl font-bold text-white">
                  {count}
                </span>
                <span className="text-5xl md:text-6xl font-bold text-primary-200 ml-2">
                  +
                </span>
              </div>
              <p className="text-xl text-primary-100 mt-4">
                ani de experiență
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-12 max-w-3xl mx-auto">
            Suntem profesioniști cu rigori inginerești și dăruire de artizani. Dedicați 
            preciziei și inovației, căutăm neîncetat excelența. Ne-am impus ca profesioniști 
            în industria locală cu soluții flexibile și servicii accesibile.
          </p>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Award className="w-12 h-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Calitate Superioară</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Users className="w-12 h-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Echipă Experimentată</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <Wrench className="w-12 h-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Soluții Complete</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
              <TrendingUp className="w-12 h-12 text-primary-200 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg">Inovație Continuă</h3>
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            to="/despre-noi"
            className="inline-block bg-white hover:bg-gray-100 text-primary-700 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Află mai mult
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview