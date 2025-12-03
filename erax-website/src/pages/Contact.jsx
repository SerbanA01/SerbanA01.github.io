import React, { useState } from 'react'
import { Phone, MapPin, Mail, Clock, Send, Upload } from 'lucide-react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    file: null
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefon',
      detail: '+40 123 456 789',
      link: 'tel:+40123456789',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: MapPin,
      title: 'Adresa',
      detail: 'Strada Exemplu, Nr. 123, București',
      link: null,
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      detail: 'contact@erax.ro',
      link: 'mailto:contact@erax.ro',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Program de lucru',
      detail: 'Luni - Vineri: 8:00 - 17:00',
      link: null,
      color: 'from-orange-400 to-orange-600'
    }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      file: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success')
      setIsSubmitting(false)
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
        file: null
      })
      // Reset file input
      document.getElementById('file').value = ''
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="pt-20">
      {/* Hero Section - More Vibrant */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Mail className="w-10 h-10 text-accent-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Transformă-ți proiectul în realitate
          </h1>
          <p className="text-lg md:text-xl text-primary-100 max-w-3xl mx-auto">
            Îți mulțumim că ai ales EraX ca partener pentru proiectele tale. Suntem pregătiți să-ți aducem viziunea la viață prin expertiza noastră în proiectarea, fabricarea și instalarea structurilor metalice.
          </p>
        </div>
      </section>

      {/* Contact Info Cards - More Colorful */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Ne poți contacta cu ușurință:
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Suntem aici să răspundem la toate întrebările tale
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              const content = (
                <div className="group h-full bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-transparent hover:border-primary-200">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${info.color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-900 transition-colors">
                    {info.detail}
                  </p>
                </div>
              )

              if (info.link) {
                return (
                  <a key={index} href={info.link} className="block">
                    {content}
                  </a>
                )
              }
              return <div key={index}>{content}</div>
            })}
          </div>
        </div>
      </section>

      {/* Map & Form Section - Enhanced */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Google Maps - Left Side (3 columns) */}
            <div className="lg:col-span-3">
              <div className="sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  📍 Vizitează-ne
                </h3>
                <p className="text-gray-600 mb-6">
                  Vino să ne cunoști personal și să discutăm despre proiectul tău
                </p>
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary-100 h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2613.329964900044!2d27.898138876161543!3d46.441438271106755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b5f9bd617a8de1%3A0xaf7b3991b1930179!2sEra%20Drills!5e1!3m2!1sro!2sro!4v1729844970882!5m2!1sro!2sro"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="EraX Location"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form - Right Side (2 columns) - More Attractive */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-primary-50 via-white to-accent-50 rounded-2xl p-8 shadow-2xl border-2 border-primary-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-3">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Trimite-ne un mesaj
                  </h3>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4 mb-6 animate-fadeIn">
                    <p className="text-green-700 font-semibold flex items-center">
                      <span className="text-2xl mr-2">✓</span>
                      Mesajul tău a fost trimis cu succes! Te vom contacta în curând.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      Nume <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none bg-white"
                      placeholder="Numele tău complet"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none bg-white"
                      placeholder="email@exemplu.ro"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">
                      Mesaj <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none resize-none bg-white"
                      placeholder="Descrie-ne proiectul tău..."
                    />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label htmlFor="file" className="block text-sm font-bold text-gray-700 mb-2">
                      Adaugă planul tău (opțional)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 transition-all duration-200 outline-none bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-primary-600 file:to-primary-700 file:text-white file:cursor-pointer hover:file:from-primary-700 hover:file:to-primary-800 file:transition-all file:duration-300"
                      />
                    </div>
                    {formData.file && (
                      <p className="mt-2 text-sm text-gray-600 flex items-center">
                        <Upload className="w-4 h-4 inline mr-1 text-green-600" />
                        <span className="font-semibold">Fișier selectat:</span> {formData.file.name}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : 'transform hover:-translate-y-1'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Se trimite...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Trimite Mesajul</span>
                      </>
                    )}
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  Câmpurile marcate cu <span className="text-red-500 font-bold">*</span> sunt obligatorii
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section - More Engaging */}
      <section className="py-20 bg-gradient-to-r from-accent-500 via-accent-600 to-accent-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
            }}
          />
        </div>

        <div className="container-custom text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Phone className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ai nevoie de ajutor imediat?
          </h2>
          <p className="text-xl text-accent-100 mb-8 max-w-2xl mx-auto">
            Sună-ne acum și vorbește direct cu un specialist EraX
          </p>
          
          <a
            href="tel:+40123456789"
            className="inline-flex items-center space-x-3 bg-white text-accent-700 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            <Phone className="w-6 h-6" />
            <span className="text-lg">+40 123 456 789</span>
          </a>
          <p className="text-accent-100 mt-6 text-sm">
            Luni - Vineri: 8:00 - 17:00
          </p>
        </div>
      </section>
    </div>
  )
}

export default Contact