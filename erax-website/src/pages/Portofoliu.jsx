import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Wrench, Home, TrendingUp, Users, Award, CheckCircle } from 'lucide-react'

const Portofoliu = () => {
  const [activeFilter, setActiveFilter] = useState('toate')

  // Sample project data - you can replace with real projects later
  const projects = [
    {
      id: 1,
      title: 'Hală Industrială Premium',
      category: 'structuri_metalice',
      description: 'Structură metalică de 2000mp pentru producție industrială, cu rezistență înaltă și design modern.',
      image: null, // Placeholder
      year: '2024',
      location: 'București'
    },
    {
      id: 2,
      title: 'Piese Combină Agricolă',
      category: 'piese_agricole',
      description: 'Set complet de piese metalice personalizate pentru utilaje agricole de mare tonaj.',
      image: null,
      year: '2024',
      location: 'Iași'
    },
    {
      id: 3,
      title: 'Casă Modulară Contemporană',
      category: 'metalurgie_arhitecturala',
      description: 'Locuință modulară pe structură metalică, 120mp, design modern și eficiență energetică.',
      image: null,
      year: '2023',
      location: 'Cluj-Napoca'
    },
    {
      id: 4,
      title: 'Depozit Logistic',
      category: 'structuri_metalice',
      description: 'Spațiu de depozitare 1500mp cu sisteme de rafturi integrate și acces optim.',
      image: null,
      year: '2024',
      location: 'Timișoara'
    },
    {
      id: 5,
      title: 'Componente Tractor',
      category: 'piese_agricole',
      description: 'Fabricare piese rezistente pentru tractoare agricole, cu tratament anti-coroziune.',
      image: null,
      year: '2023',
      location: 'Constanța'
    },
    {
      id: 6,
      title: 'Complex Rezidențial Modular',
      category: 'metalurgie_arhitecturala',
      description: '4 locuințe modulare pe structură metalică, proiect pilot pentru dezvoltare rezidențială.',
      image: null,
      year: '2023',
      location: 'Brașov'
    },
    {
      id: 7,
      title: 'Hală Producție Auto',
      category: 'structuri_metalice',
      description: 'Structură metalică 3000mp pentru industria auto, cu pod rulant și instalații complete.',
      image: null,
      year: '2024',
      location: 'Pitești'
    },
    {
      id: 8,
      title: 'Accesorii Pluguri',
      category: 'piese_agricole',
      description: 'Gamă completă de accesorii și piese de schimb pentru pluguri agricole profesionale.',
      image: null,
      year: '2024',
      location: 'Galați'
    },
    {
      id: 9,
      title: 'Vilă Architecturală',
      category: 'metalurgie_arhitecturala',
      description: 'Vilă de lux pe structură metalică cu design arhitectural unic și finisaje premium.',
      image: null,
      year: '2023',
      location: 'Sibiu'
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
    { number: '10+', label: 'Ani de Experiență', icon: Award },
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const CategoryIcon = getCategoryIcon(project.category)
              return (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  {/* Project Image Placeholder */}
                  <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <CategoryIcon className="w-24 h-24 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getCategoryColor(project.category)}`}>
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
                      {project.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {project.location}
                    </div>
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
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