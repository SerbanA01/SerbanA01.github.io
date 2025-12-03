import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, Facebook, Instagram } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleServicesClick = (e) => {
    e.preventDefault()
    navigate('/servicii')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleServiceLink = (hash) => {
    navigate(`/servicii${hash}`)
    setIsOpen(false)
    setTimeout(() => {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg py-4' 
          : 'bg-white/95 backdrop-blur-sm py-6'
      }`}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-primary-600">Era</span>
              <span className="text-gray-800">X</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Acasa
            </Link>
            
            {/* Services Dropdown - Fixed hover behavior */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button 
                onClick={handleServicesClick}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                <span>Servicii</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Invisible bridge to prevent dropdown from closing */}
              <div className="absolute top-full left-0 w-full h-2" />
              
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                  <button
                    onClick={() => handleServiceLink('#structuri_metalice')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                  >
                    Structuri metalice
                  </button>
                  <button
                    onClick={() => handleServiceLink('#piese_agricole')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                  >
                    Piese și accesorii metalice
                  </button>
                  <button
                    onClick={() => handleServiceLink('#metalurgie_arhitecturala')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                  >
                    Metalurgie arhitecturală
                  </button>
                </div>
              )}
            </div>

            <Link 
              to="/despre-noi" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Despre Noi
            </Link>
            <Link 
              to="/estimator-cost" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Estimator costuri
            </Link>
            <Link 
              to="/portofoliu" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Portofoliu
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Social Icons - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="#" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a 
              href="#" 
              className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 hover:text-primary-600 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden mt-6 pb-6 space-y-4 border-t border-gray-200 pt-6">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Acasa
            </Link>
            
            <div className="space-y-2">
              <button
                onClick={handleServicesClick}
                className="block w-full text-left text-gray-700 font-medium"
              >
                Servicii
              </button>
              <div className="pl-4 space-y-2">
                <button
                  onClick={() => handleServiceLink('#structuri_metalice')}
                  className="block w-full text-left text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Structuri metalice
                </button>
                <button
                  onClick={() => handleServiceLink('#piese_agricole')}
                  className="block w-full text-left text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Piese și accesorii metalice
                </button>
                <button
                  onClick={() => handleServiceLink('#metalurgie_arhitecturala')}
                  className="block w-full text-left text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  Metalurgie arhitecturală
                </button>
              </div>
            </div>

            <Link 
              to="/despre-noi" 
              className="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Despre Noi
            </Link>
            <Link 
              to="/estimator-cost" 
              className="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Estimator costuri
            </Link>
            <Link 
              to="/portofoliu" 
              className="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Portofoliu
            </Link>
            <Link 
              to="/contact" 
              className="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
              onClick={toggleMenu}
            >
              Contact
            </Link>

            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar