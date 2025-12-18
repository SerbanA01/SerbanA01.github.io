import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Wrench, Home, TrendingUp, Users, Award, CheckCircle, X } from 'lucide-react'

const Portofoliu = () => {
  const [activeFilter, setActiveFilter] = useState('toate')
  const [selectedProject, setSelectedProject] = useState(null)

  // Project data matching your available photos
  const projects = [
    {
      id: 1,
      title: 'Hală Industrială Premium',
      category: 'structuri_metalice',
      description: 'Structură metalică pentru depozitare industrială, cu rezistență înaltă și design modern.',
      shortDescription: 'Structură metalică de mare capacitate pentru depozitare industrială.',
      image: '/images/edited/portofoliu/hala/hala_1_0.png',
      images: ['/images/edited/portofoliu/hala/hala_1_1.png', '/images/edited/portofoliu/hala/hala_1_2.png','/images/edited/portofoliu/hala/hala_1_3.png' ], // Can add more images later
      year: '2024',
      location: 'România',
      details: {
        suprafata: '2000 mp',
        materiale: 'Oțel structural certificat',
        durata: '3 luni',
        caracteristici: [
          'Structură metalică rezistentă',
          'Acoperire completă',
          'Rezistență la intemperii',
          'Montaj rapid și eficient'
        ]
      }
    },
    {
      id: 2,
      title: 'Casă Modulară Contemporană',
      category: 'metalurgie_arhitecturala',
      description: 'Locuință modulară pe structură metalică cu design modern și eficiență energetică.',
      shortDescription: 'Locuință modulară pe structură metalică, design modern.',
      image: '/images/edited/portofoliu/mhouse/mhouse_1_0.png',
      images: ['/images/edited/portofoliu/mhouse/mhouse_1_1.png', '/images/edited/portofoliu/mhouse/mhouse_1_2.png', '/images/edited/portofoliu/mhouse/mhouse_1_3.png'],
      year: '2024',
      location: 'România',
      details: {
        suprafata: '40 mp',
        materiale: 'Structură metalică + finisaje premium',
        durata: '2 luni',
        caracteristici: [
          'Design arhitectural modern',
          'Eficiență energetică',
          'Montaj rapid',
          'Personalizare completă'
        ]
      }
    },
    {
      id: 3,
      title: 'Piese Utilaje Agricole - Set 2',
      category: 'piese_agricole',
      description: 'Componente metalice de precizie pentru tractoare și utilaje agricole profesionale.',
      shortDescription: 'Componente metalice pentru echipamente agricole.',
      image: '/images/edited/portofoliu/piesa/piesa_2_0.png',
      images: ['/images/edited/portofoliu/piesa/piesa_2_0.png','/images/edited/portofoliu/piesa/piesa_1_0.png','/images/edited/portofoliu/piesa/piesa_1_2.png'],
      year: '2024',
      location: 'România',
      details: {
        tip: 'Componente tractoare',
        materiale: 'Oțel de înaltă calitate',
        durata: '2 săptămâni',
        caracteristici: [
          'Fabricație la comandă',
          'Testare în condiții reale',
          'Garanție extinsă',
          'Suport tehnic inclus'
        ]
      }
    }
  ]

  const categories = [
    { id: 'toate', label: 'Toate Proiectele', icon: TrendingUp },
    { id: 'structuri_metalice', label: 'Structuri Metalice', icon: Building2 },
    { id: 'piese_agricole', label: 'Piese Agricole', icon: Wrench },
    { id: 'metalurgie_arhitecturala', label: 'Metalurgie Arhitecturală', icon: Home }
  ]

  const stats = [
    { number: '150+', label: 'Proiecte Finalizate', icon: CheckCircle },
    { number: '50+', label: 'Clienți Mulțumiți', icon: Users },
    { number: '15+', label: 'Ani de Experiență', icon: Award },
    { number: '100%', label: 'Rate de Satisfacție', icon: TrendingUp }
  ]

  const filteredProjects = activeFilter === 'toate' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

  const getCategoryColor = (category) => {
    const colors = {
      structuri_metalice: 'bg-primary-100 text-primary-700 border-primary-300',
      piese_agricole: 'bg-primary-100 text-primary-700 border-primary-300',
      metalurgie_arhitecturala: 'bg-purple-100 text-purple-700 border-purple-300'
    }
    return colors[category] || 'bg-gray-100 text-gray-700 border-gray-300'
  }

  const getCategoryIcon = (category) => {
    const icons = {
      structuri_metalice: Building2,
      piese_agricole: Wrench,
      metalurgie_arhitecturala: Home
    }
    return icons[category] || Building2
  }

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden' // Prevent background scroll
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset' // Restore scroll
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}
        />
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Proiectele Noastre
            </h1>
            <p className="text-xl md:text-2xl text-primary-100 mb-8">
              Descoperă portofoliul nostru de structuri metalice durabile și inovatoare. Fiecare proiect reflectă angajamentul nostru față de calitate și excelență.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-12 bg-white border-b-2 border-gray-200 sticky top-20 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    activeFilter === category.id
                      ? 'bg-primary-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category)
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 backdrop-blur-sm ${getCategoryColor(project.category)}`}>
                        {categories.find(c => c.id === project.category)?.label}
                      </span>
                    </div>
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                      {project.year}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {project.shortDescription}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {project.location}
                    </div>
                    <button 
                      onClick={() => openModal(project)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Vezi Detalii
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">Nu s-au găsit proiecte în această categorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-all duration-200 shadow-lg"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              {/* Image Gallery */}
<div className="mb-6">
  {selectedProject.images && selectedProject.images.length > 0 ? (
    <div className="space-y-4">
      {/* Main/Cover Image */}
      <div className="rounded-xl overflow-hidden">
        <img 
          src={selectedProject.image}
          alt={selectedProject.title}
          className="w-full h-96 object-cover"
        />
      </div>
      
      {/* Additional Images Grid */}
      {selectedProject.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {selectedProject.images.map((img, index) => (
            <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-200 cursor-pointer">
              <img 
                src={img}
                alt={`${selectedProject.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="rounded-xl overflow-hidden">
      <img 
        src={selectedProject.image}
        alt={selectedProject.title}
        className="w-full h-96 object-cover"
      />
    </div>
  )}
</div>

              {/* Category Badge */}
              <div className="mb-4">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border-2 ${getCategoryColor(selectedProject.category)}`}>
                  {categories.find(c => c.id === selectedProject.category)?.label}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedProject.title}
              </h2>

              {/* Location & Year */}
              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {selectedProject.location}
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  {selectedProject.year}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              {/* Project Details */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Detalii Proiect</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(selectedProject.details).filter(([key]) => key !== 'caracteristici').map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                      <p className="text-gray-900 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Caracteristici */}
              {selectedProject.details.caracteristici && (
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Caracteristici</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedProject.details.caracteristici.map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  onClick={() => {
                    document.body.style.overflow = 'unset'
                    setSelectedProject(null)
                  }}
                  className="flex-1 text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Solicită Ofertă Similară
                </Link>
                <Link
                  to="/estimator-cost"
                  onClick={() => {
                    document.body.style.overflow = 'unset'
                    setSelectedProject(null)
                  }}
                  className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Estimează Costul
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Rezultate de Care Suntem Mândri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cifrele vorbesc de la sine despre dedicarea și expertiza echipei noastre
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="bg-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-primary-700 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Gata să începem propriul tău proiect?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Fie că ai nevoie de structuri metalice, piese agricole sau soluții arhitecturale, echipa noastră este pregătită să transforme viziunea ta în realitate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contactează-ne
            </Link>
            <Link
              to="/estimator-cost"
              className="inline-block bg-primary-700 hover:bg-primary-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white"
            >
              Estimează Costul
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Portofoliu