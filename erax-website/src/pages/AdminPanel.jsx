import React, { useState, useEffect } from 'react';
import { db, storage, auth } from '../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { X, Plus, Trash2, Edit2, Upload, LogOut } from 'lucide-react';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'structuri_metalice',
    description: '',
    shortDescription: '',
    year: new Date().getFullYear().toString(),
    location: 'România',
    details: {
      suprafata: '',
      materiale: '',
      durata: '',
      caracteristici: ['', '', '', '']
    }
  });

  const [mainImage, setMainImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const categories = [
    { id: 'structuri_metalice', label: 'Structuri Metalice' },
    { id: 'piese_agricole', label: 'Piese Agricole' },
    { id: 'metalurgie_arhitecturala', label: 'Metalurgie Arhitecturală' }
  ];

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchProjects();
      }
    });
    return () => unsubscribe();
  }, []);

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      alert('Eroare la autentificare: ' + error.message);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert('Eroare la deconectare: ' + error.message);
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projectsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  // Upload image to Firebase Storage
  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('details.')) {
      const detailKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [detailKey]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle caracteristici changes
  const handleCaracteristicaChange = (index, value) => {
    const newCaracteristici = [...formData.details.caracteristici];
    newCaracteristici[index] = value;
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        caracteristici: newCaracteristici
      }
    }));
  };

  // Add caracteristica field
  const addCaracteristica = () => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        caracteristici: [...prev.details.caracteristici, '']
      }
    }));
  };

  // Remove caracteristica field
  const removeCaracteristica = (index) => {
    const newCaracteristici = formData.details.caracteristici.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        caracteristici: newCaracteristici
      }
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress('Se încarcă imaginile...');

    try {
      let mainImageUrl = editingProject?.image || '';
      let additionalImageUrls = editingProject?.images || [];

      // Upload main image
      if (mainImage) {
        setUploadProgress('Se încarcă imaginea principală...');
        const mainImagePath = `projects/${Date.now()}_main_${mainImage.name}`;
        mainImageUrl = await uploadImage(mainImage, mainImagePath);
      }

      // Upload additional images
      if (additionalImages.length > 0) {
        setUploadProgress('Se încarcă imaginile suplimentare...');
        const uploadPromises = additionalImages.map((file, index) => {
          const imagePath = `projects/${Date.now()}_${index}_${file.name}`;
          return uploadImage(file, imagePath);
        });
        const newImageUrls = await Promise.all(uploadPromises);
        additionalImageUrls = [...additionalImageUrls, ...newImageUrls];
      }

      // Prepare project data
      const projectData = {
        ...formData,
        image: mainImageUrl,
        images: additionalImageUrls,
        details: {
          ...formData.details,
          caracteristici: formData.details.caracteristici.filter(c => c.trim() !== '')
        }
      };

      setUploadProgress('Se salvează proiectul...');

      // Add or update project
      if (editingProject) {
        await updateDoc(doc(db, 'projects', editingProject.id), projectData);
        alert('Proiect actualizat cu succes!');
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        alert('Proiect adăugat cu succes!');
      }

      // Reset form
      resetForm();
      fetchProjects();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Eroare la salvarea proiectului: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  // Edit project
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      shortDescription: project.shortDescription,
      year: project.year,
      location: project.location,
      details: project.details
    });
    setShowForm(true);
  };

  // Delete project
  const handleDelete = async (projectId) => {
    if (window.confirm('Sigur doriți să ștergeți acest proiect?')) {
      try {
        await deleteDoc(doc(db, 'projects', projectId));
        alert('Proiect șters cu succes!');
        fetchProjects();
      } catch (error) {
        alert('Eroare la ștergerea proiectului: ' + error.message);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      category: 'structuri_metalice',
      description: '',
      shortDescription: '',
      year: new Date().getFullYear().toString(),
      location: 'România',
      details: {
        suprafata: '',
        materiale: '',
        durata: '',
        caracteristici: ['', '', '', '']
      }
    });
    setMainImage(null);
    setAdditionalImages([]);
    setEditingProject(null);
  };

  // Login form
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Panel</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Parolă</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              Autentificare
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administrare Proiecte</h1>
            <p className="text-gray-600 mt-1">Autentificat ca: {user.email}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              Adaugă Proiect
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
            >
              <LogOut className="w-5 h-5" />
              Deconectare
            </button>
          </div>
        </div>

        {/* Project Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full my-8">
                <div className="p-8">
                  {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProject ? 'Editează Proiect' : 'Adaugă Proiect Nou'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      resetForm();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Titlu Proiect *</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Categorie *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">An *</label>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Locație *</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descriere Scurtă *</label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="O descriere scurtă pentru card..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descriere Completă *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      placeholder="Descriere detaliată a proiectului..."
                      required
                    />
                  </div>

                  {/* Project Details */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Detalii Proiect</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Suprafață</label>
                        <input
                          type="text"
                          name="details.suprafata"
                          value={formData.details.suprafata}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="ex: 2000 mp"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Materiale</label>
                        <input
                          type="text"
                          name="details.materiale"
                          value={formData.details.materiale}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="ex: Oțel structural"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Durată</label>
                        <input
                          type="text"
                          name="details.durata"
                          value={formData.details.durata}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                          placeholder="ex: 3 luni"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Caracteristici */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <label className="block text-sm font-semibold text-gray-700">Caracteristici</label>
                      <button
                        type="button"
                        onClick={addCaracteristica}
                        className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                      >
                        + Adaugă Caracteristică
                      </button>
                    </div>
                    <div className="space-y-3">
                      {formData.details.caracteristici.map((caracteristica, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={caracteristica}
                            onChange={(e) => handleCaracteristicaChange(index, e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder={`Caracteristică ${index + 1}`}
                          />
                          {formData.details.caracteristici.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeCaracteristica(index)}
                              className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Imagine Principală * {!editingProject && '(obligatoriu pentru proiecte noi)'}
                      </label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-5 h-5" />
                          <span>Alege Imagine</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setMainImage(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                        {mainImage && (
                          <span className="text-sm text-gray-600">{mainImage.name}</span>
                        )}
                        {editingProject && !mainImage && (
                          <span className="text-sm text-gray-500">Folosind imaginea existentă</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Imagini Suplimentare</label>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors">
                          <Upload className="w-5 h-5" />
                          <span>Alege Imagini</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setAdditionalImages(Array.from(e.target.files))}
                            className="hidden"
                          />
                        </label>
                        {additionalImages.length > 0 && (
                          <span className="text-sm text-gray-600">{additionalImages.length} imagini selectate</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Message */}
                  {uploadProgress && (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <p className="text-primary-700 font-semibold">{uploadProgress}</p>
                    </div>
                  )}

                  {/* Submit Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Se salvează...' : (editingProject ? 'Actualizează Proiect' : 'Adaugă Proiect')}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        resetForm();
                      }}
                      disabled={loading}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                      Anulează
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Proiecte Existente ({projects.length})</h2>
          
          {projects.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Nu există proiecte. Adaugă primul proiect!</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{project.category}</p>
                    <p className="text-sm text-gray-500 mb-4">{project.year} • {project.location}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(project)}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editează
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Șterge
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;