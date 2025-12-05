import React from 'react'
import { Link } from 'react-router-dom'
import { Lightbulb, Award, Users, Clock, UserCheck, MapPin, Target, Sparkles, TrendingUp, Zap, Shield, Heart } from 'lucide-react'

const DespreNoi = () => {
  const timeline = [
    {
      year: '2010',
      title: 'Începuturile',
      description: 'Am început într-un mic atelier, cu o viziune clară: să împingem limitele în prelucrarea metalului.'
    },
    {
      year: '2015',
      title: 'Expansiune',
      description: 'Am evoluat într-o unitate de producție echipată cu tehnologie avansată și o echipă de profesioniști pasionați.'
    },
    {
      year: '2020',
      title: 'Lideri pe piață',
      description: 'Ne-am impus ca lideri în industria locală, oferind soluții flexibile și servicii accesibile.'
    },
    {
      year: 'Prezent',
      title: 'Inovație continuă',
      description: 'Continuăm să investim în oameni, tehnologie și procese pentru a rămâne relevanți și competitivi.'
    }
  ]

  const values = [
    {
      icon: Lightbulb,
      title: 'Inovație',
      description: 'Ne place să explorăm noi tehnologii și metode de fabricare pentru a îmbunătăți constant procesele noastre.',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      icon: Award,
      title: 'Calitate',
      description: 'Calitatea este ne-negociabilă pentru noi. Fiecare piesă trece prin controale stricte înainte de a ajunge la client.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Users,
      title: 'Abordare Centrată pe Client',
      description: 'Colaborăm îndeaproape cu fiecare client, ascultându-i cerințele și adăugându-ne creativitatea.',
      color: 'from-purple-400 to-purple-600'
    }
  ]

  const whyChooseUs = [
    {
      icon: Target,
      title: 'Experiență',
      stat: '10+ ani',
      description: 'Cu peste un deceniu în industrie, folosim toate cunoștințele pentru a transforma provocările tale în succes.'
    },
    {
      icon: Shield,
      title: 'Asigurarea Calității',
      stat: '100%',
      description: 'Fiecare structură metalică trece prin teste riguroase pentru a respecta cele mai înalte standarde.'
    },
    {
      icon: Clock,
      title: 'Livrare la Timp',
      stat: 'Mereu',
      description: 'Prin procese optimizate și management eficient, ne asigurăm că livrăm la timp, de fiecare dată.'
    },
    {
      icon: UserCheck,
      title: 'Abordare Colaborativă',
      stat: 'Partnership',
      description: 'Construim relații pe termen lung. Fiecare etapă este realizată în strânsă colaborare cu tine.'
    },
    {
      icon: MapPin,
      title: 'Acoperire Națională',
      stat: 'Peste tot',
      description: 'Livrăm structuri metalice oriunde în țară, asigurând servicii de încredere pentru toți clienții.'
    },
    {
      icon: Heart,
      title: 'Pasiune',
      stat: '100%',
      description: 'Profesioniști cu rigori inginerești și dăruire de artizani, dedicați preciziei și inovației.'
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section - Improved */}
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'slide 20s linear infinite'
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-primary-400" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Meșteri în Fabricarea Structurilor Metalice
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              <strong className="text-primary-400">EraX</strong> este mai mult decât un brand specializat în structuri metalice – suntem profesioniști cu rigori inginerești și dăruire de artizani. Dedicăm totul preciziei și inovației, cu scopul constant de a atinge excelența.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Timeline Section - Company Story */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Povestea Noastră
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De la un mic atelier la o unitate de producție modernă - o călătorie condusă de pasiune și inovație
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <div key={index} className="relative pl-8 pb-12 last:pb-0">
                {/* Timeline line */}
                {index !== timeline.length - 1 && (
                  <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-primary-200" />
                )}
                
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-3xl font-bold text-primary-600">{item.year}</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-primary-600 to-transparent" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section - Redesigned */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Valorile Care Ne Definesc
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Principiile fundamentale care ne ghidează în fiecare proiect
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Vision Section - Clean Design */}
      <section className="py-20 md:py-32 bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Target className="w-10 h-10 text-primary-400" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Viziunea Noastră
            </h2>
            <p className="text-xl md:text-2xl text-primary-100 leading-relaxed">
              Viziunea noastră este să continuăm această călătorie de evoluție, extinzându-ne pe piața internațională și devenind un nume de referință în domeniul structurilor metalice. Ne propunem să investim constant în oameni, tehnologie și procese, pentru a rămâne relevanți și competitivi într-o lume în continuă schimbare.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Grid Layout */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              De ce EraX?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Motivele pentru care clienții ne aleg și rămân alături de noi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-100 hover:border-primary-300 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary-100 rounded-lg p-3 group-hover:bg-primary-600 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                      {reason.stat}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {reason.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Hai să construim împreună viitorul
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Fie că ai un proiect mare sau unul mai mic, suntem aici să transformăm ideile în realitate cu structuri metalice de calitate superioară.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-primary-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Contactează-ne
            </Link>
            <Link
              to="/portofoliu"
              className="inline-block bg-primary-600 hover:bg-primary-800 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 border-2 border-white/30 hover:border-white"
            >
              Vezi Portofoliul
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DespreNoi