import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, ArrowRight, ArrowLeft, CheckCircle, Building2, Ruler, Settings, DollarSign, Mail } from 'lucide-react'

const EstimatorCost = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    projectType: '',
    length: '',
    width: '',
    height: '',
    roofType: 'standard',
    sideWalls: true,
    doors: 1,
    windows: 2,
    foundation: true,
    ventilation: false,
    lighting: false,
    drainage: false,
    insulation: false,
    crane: false
  })
  const [estimate, setEstimate] = useState(null)

  const totalSteps = 5

  const projectTypes = [
    { id: 'industrial', name: 'Hală Industrială', basePrice: 150, icon: '🏭' },
    { id: 'storage', name: 'Depozit', basePrice: 120, icon: '📦' },
    { id: 'commercial', name: 'Spațiu Comercial', basePrice: 180, icon: '🏪' },
    { id: 'other', name: 'Altele', basePrice: 140, icon: '🏗️' }
  ]

  const additionalFeatures = [
    { id: 'ventilation', name: 'Sistem de ventilație', price: 3000, icon: '💨' },
    { id: 'lighting', name: 'Iluminat LED', price: 2500, icon: '💡' },
    { id: 'drainage', name: 'Sistem de drenaj', price: 2000, icon: '🌊' },
    { id: 'insulation', name: 'Izolație termică suplimentară', price: 4000, icon: '🧊' },
    { id: 'crane', name: 'Pod rulant', price: 15000, icon: '🏗️' }
  ]

  // Calculate estimate
  const calculateEstimate = () => {
    if (!formData.projectType || !formData.length || !formData.width || !formData.height) {
      return null
    }

    const selectedType = projectTypes.find(t => t.id === formData.projectType)
    const area = parseFloat(formData.length) * parseFloat(formData.width)
    const height = parseFloat(formData.height)

    // Base price calculation
    let basePrice = area * selectedType.basePrice

    // Height multiplier (if above 6m)
    if (height > 6) {
      basePrice *= 1 + ((height - 6) * 0.05)
    }

    // Roof type
    if (formData.roofType === 'insulated') {
      basePrice *= 1.15
    }

    // Side walls
    if (formData.sideWalls) {
      basePrice *= 1.20
    }

    // Doors and windows
    const doorsPrice = parseInt(formData.doors) * 1500
    const windowsPrice = parseInt(formData.windows) * 800

    // Foundation
    const foundationPrice = formData.foundation ? area * 50 : 0

    // Additional features
    let featuresPrice = 0
    additionalFeatures.forEach(feature => {
      if (formData[feature.id]) {
        featuresPrice += feature.price
      }
    })

    const totalPrice = basePrice + doorsPrice + windowsPrice + foundationPrice + featuresPrice

    return {
      area,
      basePrice: Math.round(basePrice),
      doorsPrice,
      windowsPrice,
      foundationPrice,
      featuresPrice,
      totalPrice: Math.round(totalPrice),
      pricePerSqm: Math.round(totalPrice / area)
    }
  }

  useEffect(() => {
    if (currentStep === 5) {
      setEstimate(calculateEstimate())
    }
  }, [currentStep, formData])

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== ''
      case 2:
        return formData.length && formData.width && formData.height
      case 3:
        return true
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="container-custom text-center">
          <Calculator className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Estimator de Costuri
          </h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Obține o estimare rapidă pentru proiectul tău de structuri metalice
          </p>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-20 z-40">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                      step <= currentStep
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
                  </div>
                  <span className="text-xs mt-2 hidden md:block text-gray-600">
                    {step === 1 && 'Tip'}
                    {step === 2 && 'Dimensiuni'}
                    {step === 3 && 'Specificații'}
                    {step === 4 && 'Opțiuni'}
                    {step === 5 && 'Rezultat'}
                  </span>
                </div>
                {step < 5 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? 'bg-primary-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container-custom max-w-4xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Step 1: Project Type */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <Building2 className="w-16 h-16 mx-auto mb-4 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Ce tip de proiect planifici?
                  </h2>
                  <p className="text-gray-600">
                    Selectează categoria care se potrivește cel mai bine proiectului tău
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleChange('projectType', type.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        formData.projectType === type.id
                          ? 'border-primary-600 bg-primary-50 shadow-lg scale-105'
                          : 'border-gray-200 hover:border-primary-300 hover:shadow-md'
                      }`}
                    >
                      <div className="text-4xl mb-3">{type.icon}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {type.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        De la {type.basePrice} €/m²
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Dimensions */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <Ruler className="w-16 h-16 mx-auto mb-4 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Care sunt dimensiunile?
                  </h2>
                  <p className="text-gray-600">
                    Introdu dimensiunile în metri pentru a calcula suprafața
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lungime (m) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.length}
                      onChange={(e) => handleChange('length', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
                      placeholder="ex: 20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lățime (m) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.width}
                      onChange={(e) => handleChange('width', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
                      placeholder="ex: 15"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Înălțime (m) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={formData.height}
                      onChange={(e) => handleChange('height', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
                      placeholder="ex: 6"
                    />
                  </div>

                  {formData.length && formData.width && (
                    <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Suprafață totală</p>
                      <p className="text-4xl font-bold text-primary-700">
                        {(parseFloat(formData.length) * parseFloat(formData.width)).toFixed(2)} m²
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Specifications */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <Settings className="w-16 h-16 mx-auto mb-4 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Specificații de bază
                  </h2>
                  <p className="text-gray-600">
                    Selectează configurația dorită pentru structura ta
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Roof Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tip de acoperiș
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleChange('roofType', 'standard')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          formData.roofType === 'standard'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <p className="font-semibold">Standard</p>
                        <p className="text-sm text-gray-600">Acoperiș basic</p>
                      </button>
                      <button
                        onClick={() => handleChange('roofType', 'insulated')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          formData.roofType === 'insulated'
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-primary-300'
                        }`}
                      >
                        <p className="font-semibold">Izolat</p>
                        <p className="text-sm text-gray-600">+15% cost</p>
                      </button>
                    </div>
                  </div>

                  {/* Side Walls */}
                  <div>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-900">Pereți laterali</p>
                        <p className="text-sm text-gray-600">Include pereți pe toate laturile (+20%)</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.sideWalls}
                        onChange={(e) => handleChange('sideWalls', e.target.checked)}
                        className="w-6 h-6 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                      />
                    </label>
                  </div>

                  {/* Doors */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Număr de uși (1500 € / bucată)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.doors}
                      onChange={(e) => handleChange('doors', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Windows */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Număr de ferestre (800 € / bucată)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.windows}
                      onChange={(e) => handleChange('windows', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200 outline-none"
                    />
                  </div>

                  {/* Foundation */}
                  <div>
                    <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <div>
                        <p className="font-semibold text-gray-900">Fundație inclusă</p>
                        <p className="text-sm text-gray-600">50 € / m² suprafață</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.foundation}
                        onChange={(e) => handleChange('foundation', e.target.checked)}
                        className="w-6 h-6 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Additional Features */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="text-center">
                  <DollarSign className="w-16 h-16 mx-auto mb-4 text-primary-600" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Opțiuni suplimentare
                  </h2>
                  <p className="text-gray-600">
                    Selectează funcționalități adiționale (opțional)
                  </p>
                </div>

                <div className="space-y-4">
                  {additionalFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{feature.icon}</span>
                        <div>
                          <p className="font-semibold text-gray-900">{feature.name}</p>
                          <p className="text-sm text-gray-600">+{feature.price.toLocaleString('ro-RO')} €</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData[feature.id]}
                        onChange={(e) => handleChange(feature.id, e.target.checked)}
                        className="w-6 h-6 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
                      />
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Results */}
            {currentStep === 5 && estimate && (
              <div className="space-y-8">
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Estimare Completă
                  </h2>
                  <p className="text-gray-600">
                    Iată estimarea pentru proiectul tău
                  </p>
                </div>

                {/* Total Price - Big Display */}
                <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 text-center text-white">
                  <p className="text-lg mb-2 text-primary-100">Cost total estimat</p>
                  <p className="text-5xl md:text-6xl font-bold mb-2">
                    {estimate.totalPrice.toLocaleString('ro-RO')} €
                  </p>
                  <p className="text-primary-100">
                    ({estimate.pricePerSqm.toLocaleString('ro-RO')} € / m²)
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Detalii cost:</h3>
                  
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <span className="text-gray-700">Cost de bază ({estimate.area} m²)</span>
                    <span className="font-semibold">{estimate.basePrice.toLocaleString('ro-RO')} €</span>
                  </div>

                  {estimate.doorsPrice > 0 && (
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-700">Uși ({formData.doors})</span>
                      <span className="font-semibold">{estimate.doorsPrice.toLocaleString('ro-RO')} €</span>
                    </div>
                  )}

                  {estimate.windowsPrice > 0 && (
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-700">Ferestre ({formData.windows})</span>
                      <span className="font-semibold">{estimate.windowsPrice.toLocaleString('ro-RO')} €</span>
                    </div>
                  )}

                  {estimate.foundationPrice > 0 && (
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-700">Fundație</span>
                      <span className="font-semibold">{estimate.foundationPrice.toLocaleString('ro-RO')} €</span>
                    </div>
                  )}

                  {estimate.featuresPrice > 0 && (
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-gray-700">Opțiuni suplimentare</span>
                      <span className="font-semibold">{estimate.featuresPrice.toLocaleString('ro-RO')} €</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 text-lg font-bold text-gray-900">
                    <span>TOTAL</span>
                    <span className="text-primary-600">{estimate.totalPrice.toLocaleString('ro-RO')} €</span>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Notă:</strong> Acesta este un cost estimativ. Prețul final poate varia în funcție de specificațiile exacte, locație și alte factori. Pentru o ofertă detaliată, te rugăm să ne contactezi.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center space-x-2"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Solicită Ofertă Detaliată</span>
                  </Link>
                  <button
                    onClick={() => {
                      setCurrentStep(1)
                      setFormData({
                        projectType: '',
                        length: '',
                        width: '',
                        height: '',
                        roofType: 'standard',
                        sideWalls: true,
                        doors: 1,
                        windows: 2,
                        foundation: true,
                        ventilation: false,
                        lighting: false,
                        drainage: false,
                        insulation: false,
                        crane: false
                      })
                    }}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center"
                  >
                    Calculează din nou
                  </button>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 5 && (
              <div className="flex justify-between mt-12 pt-8 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Înapoi</span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    canProceed()
                      ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span>{currentStep === 4 ? 'Vezi Estimarea' : 'Continuă'}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default EstimatorCost