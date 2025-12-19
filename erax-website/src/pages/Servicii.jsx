import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Building2, Wrench, Home, Download, CheckCircle } from 'lucide-react'

const Servicii = () => {
  const [activeAccordion, setActiveAccordion] = useState(null)

  // Scroll to section if hash is present in URL
  // Scroll to section if hash is present in URL
// Scroll to section if hash is present in URL
// Scroll to section if hash is present in URL
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash
    if (hash) {
      const sectionId = hash.substring(1) // Remove the '#'
      
      // Set the accordion to open
      setActiveAccordion(sectionId)
      
      // Then scroll to it
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }

  // Custom event handler for when already on the page
  const handleOpenAccordion = (event) => {
    const sectionId = event.detail
    setActiveAccordion(sectionId)
    
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  // Handle initial load
  handleHashChange()

  // Listen for hash changes
  window.addEventListener('hashchange', handleHashChange)
  
  // Listen for custom accordion open event
  window.addEventListener('openAccordion', handleOpenAccordion)
  
  return () => {
    window.removeEventListener('hashchange', handleHashChange)
    window.removeEventListener('openAccordion', handleOpenAccordion)
  }
}, [])
const toggleAccordion = (id) => {
  // If clicking the same accordion, just toggle it
  if (activeAccordion === id) {
    setActiveAccordion(null)
    return
  }
  
  // Open the new accordion first
  setActiveAccordion(id)
  
  // Then scroll to it after it starts opening
  setTimeout(() => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 100) // Small delay to let the accordion start opening
}

  const services = [
    {
      id: 'structuri_metalice',
      title: 'Structuri metalice',
      subtitle: 'Producție de Precizie pentru Structuri Metalice Durabile',
      icon: Building2,
      image: '/images/edited/servicii/servicii_1.png'    },
    {
      id: 'piese_agricole',
      title: 'Piese și accesorii agricole',
      subtitle: 'Crește Eficiența Lucrărilor Agricole\nPiese de Precizie, Adaptate Nevoilor Tale',
      icon: Wrench,
      image: '/images/edited/servicii/servicii_2.png'
    },
    {
      id: 'metalurgie_arhitecturala',
      title: 'Metalurgie arhitecturală',
      subtitle: 'Spații de Locuit pe Structură Metalică\nMetalurgia Întâlnește Arhitectura',
      icon: Home,
      image: '/images/edited/servicii/servicii_3.png'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Sticky Title */}
            <div className="lg:sticky lg:top-32">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Soluții Complete în Metalurgie: Agricultură, Arhitectură, Locuințe
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                De la structuri metalice și piese agricole la spații modulare de locuit – calitate, precizie și inovație în fiecare proiect.
              </p>
            </div>

            {/* Right: Service Cards */}
            <div className="space-y-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                    style={{ 
                      position: 'sticky',
                      top: `${150 + index * 20}px`
                    }}
                  >
                    {/* Service Image */}
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={service.image} 
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                      </div>
                    
                    <div className="p-8 text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 mb-6 whitespace-pre-line">
                        {service.subtitle}
                      </p>
                      
                      <a
                       href={`#${service.id}`}
                       onClick={(e) => {
                         e.preventDefault()
                         setActiveAccordion(service.id)
                         setTimeout(() => {
                           const element = document.getElementById(service.id)
                           if (element) {
                             element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                           }
                         }, 100)
                       }}
                       className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"                      >
                        Află mai mult
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          
          {/* Structuri Metalice Section */}
          <div id="structuri_metalice" className="scroll-mt-24 mb-20">
            <AccordionItem
              id="structuri_metalice"
              title="Structuri Metalice"
              isActive={activeAccordion === 'structuri_metalice'}
              onToggle={() => toggleAccordion('structuri_metalice')}
            >
              <StructuriMetaliceContent />
            </AccordionItem>
          </div>

          {/* Piese Agricole Section */}
          <div id="piese_agricole" className="scroll-mt-24 mb-20">
            <AccordionItem
              id="piese_agricole"
              title="Piese și Accesorii Agricole"
              isActive={activeAccordion === 'piese_agricole'}
              onToggle={() => toggleAccordion('piese_agricole')}
            >
              <PieseAgricoleContent />
            </AccordionItem>
          </div>

          {/* Metalurgie Arhitecturală Section */}
          <div id="metalurgie_arhitecturala" className="scroll-mt-24">
            <AccordionItem
              id="metalurgie_arhitecturala"
              title="Metalurgie Arhitecturală"
              isActive={activeAccordion === 'metalurgie_arhitecturala'}
              onToggle={() => toggleAccordion('metalurgie_arhitecturala')}
            >
              <MetalurgieArhitecturalaContent />
            </AccordionItem>
          </div>

        </div>
      </section>
    </div>
  )
}

// Accordion Item Component
const AccordionItem = ({ id, title, isActive, onToggle, children }) => {
  return (
    <div className="border-b-2 border-gray-200">
      <button
        onClick={onToggle}
        className="w-full py-8 flex items-center justify-between text-left group hover:bg-gray-50 transition-colors duration-200 px-4 rounded-lg"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
          {title}
        </h2>
        <div className="ml-6 flex-shrink-0">
          {isActive ? (
            <ChevronUp className="w-8 h-8 text-primary-600" />
          ) : (
            <ChevronDown className="w-8 h-8 text-gray-400 group-hover:text-primary-600 transition-colors duration-200" />
          )}
        </div>
      </button>
      
      {isActive && (
        <div className="pb-12 px-4 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  )
}

// Content Components for each service
const StructuriMetaliceContent = () => {
  return (
    <div className="space-y-16">
      {/* Introduction */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Structuri Metalice Premium – Soluții Personalizate pentru Proiecte de Orice Dimensiune
        </h3>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <p className="text-lg text-gray-700 leading-relaxed">
            Indiferent dacă ai nevoie de o structură metalică simplă sau de un proiect complex, EraX oferă fabricarea și montajul structurilor metalice care se potrivesc perfect nevoilor tale. Fie că este vorba despre hale industriale, depozite, spații comerciale sau proiecte rezidențiale, asigurăm calitate superioară, durabilitate și soluții personalizate care se încadrează în bugetul tău.
          </p>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <Building2 className="w-16 h-16 text-primary-600 mb-4" />
            <p className="text-gray-700">
              Structuri concepute să reziste testului timpului, cu materiale de cea mai înaltă calitate și execuție impecabilă.
            </p>
          </div>
        </div>
      </div>

      {/* Structuri Metalice Gallery Image */}
        <div className="rounded-2xl h-[32rem] overflow-hidden shadow-lg">
          <img 
            src="/images/edited/servicii/servicii_4.png"
            alt="Galerie structuri metalice"
            className="w-full h-full object-cover"
          />
        </div>

      {/* De ce să alegi EraX */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          De ce să alegi EraX pentru Structurile Tale Metalice?
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            'Fabricare la comandă, adaptată cerințelor specifice',
            'Materiale certificate și de înaltă calitate',
            'Montaj rapid și profesionist',
            'Consultanță tehnică gratuită',
            'Prețuri competitive și transparente',
            'Garanție extinsă pentru materialele și execuția'
          ].map((item, index) => (
            <div key={index} className="flex items-start space-x-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Servicii oferite */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Servicii Oferite
        </h3>
        <div className="space-y-6">
          {[
            {
              title: 'Hale industriale',
              description: 'Structuri metalice robuste pentru producție, depozitare sau logistică.'
            },
            {
              title: 'Depozite și spații de stocare',
              description: 'Soluții eficiente pentru maximizarea spațiului de depozitare.'
            },
            {
              title: 'Spații comerciale',
              description: 'Structuri moderne pentru magazine, showroom-uri sau centre comerciale.'
            },
            {
              title: 'Extinderi și modificări',
              description: 'Adaptăm și extindem structurile existente conform nevoilor tale.'
            },
            {
              title: 'Proiecte rezidențiale',
              description: 'Case cu structură metalică, garaje și anexe moderne.'
            }
          ].map((service, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-200">
              <h4 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h4>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Gata să îți transformi viziunea în realitate?
        </h3>
        <p className="text-xl mb-8 text-primary-100">
          Contactează-ne astăzi pentru o consultație gratuită și o ofertă personalizată!
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Solicită o Ofertă
        </Link>
      </div>
    </div>
  )
}

const PieseAgricoleContent = () => {
  return (
    <div className="space-y-16">
      {/* Introduction */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Piese și Accesorii Agricole de Înaltă Performanță
        </h3>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <p className="text-lg text-gray-700 leading-relaxed">
            În agricultură, fiecare piesă contează. La EraX, fabricăm piese și accesorii metalice robuste, proiectate să reziste în cele mai dure condiții de lucru. De la componente pentru utilaje agricole până la soluții personalizate pentru ferme, oferim produse durabile care îți optimizează munca și îți cresc eficiența.
          </p>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <Wrench className="w-16 h-16 text-primary-600 mb-4" />
            <p className="text-gray-700">
              Piese fabricate cu precizie pentru a îmbunătăți performanța utilajelor tale agricole.
            </p>
          </div>
        </div>
      </div>

      {/* Piese Agricole Gallery Image */}
        <div className="rounded-2xl h-[32rem] overflow-hidden shadow-lg bg-gray-100">
          <img 
            src="/images/edited/servicii/servicii_5.png"
            alt="Galerie piese agricole"
            className="w-full h-full object-contain"
          />
        </div>

      {/* Produse oferite */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Produse și Servicii Oferite
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            'Piese pentru pluguri și grape',
            'Componente pentru combine și semănători',
            'Accesorii pentru tractoare',
            'Elemente de fixare și prindere',
            'Piese personalizate după specificații',
            'Reparații și întreținere utilaje'
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 border-2 border-gray-100 hover:border-primary-300">
              <CheckCircle className="w-8 h-8 text-primary-500 mb-3" />
              <p className="text-gray-800 font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Avantaje */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Avantajele Pieselor EraX
        </h3>
        <div className="space-y-4">
          {[
            {
              title: 'Rezistență superioară',
              description: 'Materiale de calitate premium, testate în condiții extreme.'
            },
            {
              title: 'Precizie în fabricație',
              description: 'Tehnologie modernă pentru toleranțe minime și ajustare perfectă.'
            },
            {
              title: 'Durabilitate garantată',
              description: 'Produse concepute să reziste ani de zile în condiții dificile.'
            },
            {
              title: 'Personalizare completă',
              description: 'Adaptăm piesele la necesitățile specifice ale utilajelor tale.'
            },
            {
              title: 'Livrare rapidă',
              description: 'Stock disponibil și producție eficientă pentru comenzi urgente.'
            },
            {
              title: 'Suport tehnic',
              description: 'Consultanță specializată pentru alegerea pieselor potrivite.'
            }
          ].map((advantage, index) => (
            <div key={index} className="flex items-start space-x-4 bg-gray-50 p-6 rounded-xl hover:bg-primary-50 transition-colors duration-200">
              <div className="bg-primary-500 rounded-full p-2 flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-1">{advantage.title}</h4>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ai nevoie de piese agricole de calitate?
        </h3>
        <p className="text-xl mb-8 text-primary-100">
          Contactează-ne pentru a discuta despre cerințele tale specifice!
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Solicită o Ofertă
        </Link>
      </div>
    </div>
  )
}

const MetalurgieArhitecturalaContent = () => {
  const benefits = [
    'Proiectate cu viziune arhitecturală: Construite cu pasiune inginerească.',
    'Design atractiv, realitate modulară: O estetică inovatoare adaptată spațiilor funcționale.',
    'Materiale de calitate: Execuție impecabilă pentru durabilitate.',
    'Eficiență energetică: Gândite pentru un consum redus de resurse.',
    'Versatile și confortabile: Optimizate pentru orice stil de viață.',
    'Forma se îmbină cu funcția: Fiecare spațiu are un scop bine definit.',
    'Structură solidă: Sustenabile din punct de vedere al mediului.',
    'Personalizare: Viziunea ta combinată cu expertiza noastră.',
    'Alternativă locativă accesibilă: Fără compromisuri în materie de estetică sau funcționalitate.'
  ]

  return (
    <div className="space-y-16">
      {/* Introduction */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Spații de Locuit pe Structură Metalică
        </h3>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <p className="text-lg text-gray-700 leading-relaxed">
            Credem că locuințele ar trebui să reflecte stilul de viață modern: dinamic, adaptabil și prietenos cu mediul. La EraX, am regândit procesul tradițional de construire, oferind o alternativă mai rapidă, mai durabilă și mai versatilă.
          </p>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6">
            <Home className="w-16 h-16 text-primary-600 mb-4" />
            <p className="text-gray-700">
              Locuințe modulare care combină perfect estetica modernă cu funcționalitatea practică.
            </p>
          </div>
        </div>
      </div>

      {/* Metalurgie Gallery Image */}
          <div className="rounded-2xl h-[32rem] overflow-hidden shadow-lg">
            <img 
              src="/images/edited/servicii/servicii_6_2.png"
              alt="Galerie locuințe modulare"
              className="w-full h-full object-cover"
            />
          </div>

      {/* Rescriem Regulile */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Rescriem Regulile Construcției Locuințelor cu Containere Modulare
        </h3>
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="rounded-2xl h-64 overflow-hidden shadow-lg">
              <img 
                src="/images/edited/servicii/servicii_7.png"
                alt="Detalii locuințe modulare"
                className="w-full h-full object-cover"
              />
          </div>
          <p className="text-lg text-gray-700 leading-relaxed">
            Pasiunea noastră pentru inovație și sustenabilitate ne inspiră să creăm locuințe nu doar confortabile, ci și eficiente și rentabile. Fiecare casă modulară este realizată cu precizie, folosind materiale de cea mai înaltă calitate și tehnici avansate de construcție. Prin angajamentul nostru față de excelență, creăm spații estetice și durabile.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          De ce Merită Să Alegi Locuințele Modulare EraX?
        </h3>
        <div className="space-y-3">
          {benefits.map((benefit, index) => {
            const [title, ...description] = benefit.split(':')
            return (
              <div key={index} className="flex items-start space-x-3 bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border-l-4 border-primary-500">
                <CheckCircle className="w-6 h-6 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">
                  <strong className="text-gray-900">{title}:</strong>
                  {description.join(':')}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Prototype */}
      <div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Prototip Locuință Modulară EraX
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Asamblare la fața locului</h4>
            <p className="text-gray-700 text-lg">Rapid și eficient.</p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Suprafață totală</h4>
            <p className="text-primary-700 text-3xl font-bold">40 mp</p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-200">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Configurare spațială</h4>
            <p className="text-gray-700">
              <strong>1</strong> <em>dormitor</em>, <strong>1</strong> <em>living</em>,{' '}
              <strong>1</strong> <em>toaletă</em>, <strong>1</strong> <em>bucătărie</em>
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 text-center hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Vezi proiectul arhitectural</h4>
            <button className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
              <Download className="w-5 h-5" />
              <span>Descarcă</span>
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Gata să îți construiești casa visurilor tale?
        </h3>
        <p className="text-xl mb-8 text-primary-100">
          Descoperă cum locuințele modulare pot transforma modul în care trăiești!
        </p>
        <Link
          to="/contact"
          className="inline-block bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Contactează-ne Acum
        </Link>
      </div>
    </div>
  )
}

export default Servicii