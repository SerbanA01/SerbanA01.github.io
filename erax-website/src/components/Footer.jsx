import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <div className="text-2xl font-bold">
                <span className="text-primary-400">Era</span>
                <span className="text-white">X</span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6">
              Structuri metalice de calitate superioară pentru proiecte industriale și comerciale.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* EraX Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">EraX</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/estimator-cost" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Estimator de cost
                </Link>
              </li>
              <li>
                <Link 
                  to="/portofoliu" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Portofoliu
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Resurse</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Model hala 1
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Model spațiu locuit modular
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Piese utilaje agricole
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  Vezi toate resursele →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  Strada Exemplu, Nr. 123<br />
                  București, România
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="tel:+40123456789" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  +40 123 456 789
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a 
                  href="mailto:contact@erax.ro" 
                  className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                >
                  contact@erax.ro
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="text-center text-gray-400 text-sm">
            Copyright © {currentYear} EraX. Toate drepturile rezervate.
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer