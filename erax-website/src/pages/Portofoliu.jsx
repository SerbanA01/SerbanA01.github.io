import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Wrench, Home, TrendingUp, Users, Award, CheckCircle, X } from 'lucide-react'
import { db } from '../firebase'
import { collection, getDocs } from 'firebase/firestore'
import Model3DViewer from '../components/Model3DViewer'

const Portofoliu = () => {
  const [activeFilter, setActiveFilter] = useState('toate')
  const [selectedProject, setSelectedProject] = useState(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

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

  // Fetch projects from Firebase
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const querySnapshot = await getDocs(collection(db, 'projects'))
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        // Filter only active projects
        const activeProjects = projectsData.filter(project => project.isActive !== false)
        // Sort by date - newest first
        activeProjects.sort((a, b) => {
          const dateA = new Date(a.date || `${a.year}-01-01`)
          const dateB = new Date(b.date || `${b.year}-01-01`)
          return dateB - dateA // Descending order (newest first)
        })
        setProjects(activeProjects)
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

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
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'unset'
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
<section className="py-6 md:py-12 bg-white border-b-2 border-gray-200 sticky top-20 z-40">
  <div className="container-custom">
    <div className="flex flex-wrap justify-center gap-2 md:gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`flex items-center space-x-1 md:space-x-2 px-3 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 ${
              activeFilter === category.id
                ? 'bg-primary-600 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline">{category.label}</span>
            <span className="sm:hidden">{category.label.split(' ')[0]}</span>
          </button>
        )
      })}
    </div>
  </div>
</section>

      {/* Projects Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Se încarcă proiectele...</p>
            </div>
          ) : (
            <>
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
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          {project.date ? new Date(project.date).toLocaleDateString('ro-RO', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          }) : project.year}
                        </div>
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
              {filteredProjects.length === 0 && !loading && (
                <div className="text-center py-20">
                  <p className="text-xl text-gray-500">Nu s-au găsit proiecte în această categorie.</p>
                </div>
              )}
            </>
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
              {/* 3D Model Viewer */}
              {selectedProject.model3D && selectedProject.model3D.type !== 'none' && (
                <Model3DViewer model3D={selectedProject.model3D} />
              )}

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

              {/* Location & Date */}
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
                  {selectedProject.date ? new Date(selectedProject.date).toLocaleDateString('ro-RO', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  }) : selectedProject.year}
                </div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {selectedProject.description}
              </p>

              {/* Project Details */}
              {selectedProject.details && (
                <>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Detalii Proiect</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {Object.entries(selectedProject.details).filter(([key]) => key !== 'caracteristici').map(([key, value]) => (
                        value && (
                          <div key={key}>
                            <span className="text-sm text-gray-500 capitalize">{key.replace('_', ' ')}:</span>
                            <p className="text-gray-900 font-semibold">{value}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Caracteristici */}
                  {selectedProject.details.caracteristici && selectedProject.details.caracteristici.length > 0 && (
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
                </>
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
