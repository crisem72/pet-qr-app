import { useState } from 'react';
import api from '../api';
import './CargarMascota.css';
import fondo from '../assets/fondo.png';

function CargarMascota({ token }) {
  const [form, setForm] = useState({
    nombre: '',
    raza: '',
    edad: '',
    detalles: ''
  });
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(''); // 🆕
  const [qrUrl, setQrUrl] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = e => {
    const file = e.target.files[0];
    setImagen(file);
    if (file) {
      const reader = new FileReader(); // 🆕
      reader.onloadend = () => setPreviewUrl(reader.result); // 🆕
      reader.readAsDataURL(file); // 🆕
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (imagen) data.append('imagen', imagen);

    try {
      const res = await api.post('/mascotas', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setQrUrl(`http://localhost:3001${res.data.qr}`);
      setMensaje('✅ Mascota registrada con éxito');
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al registrar mascota');
    }
  };

  return (
    <div
      className="cargar-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem'
      }}
    >
      <form className="cargar-box" onSubmit={handleSubmit}>
        <h2>Registrar Mascota</h2>
        <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="raza" placeholder="Raza" onChange={handleChange} />
        <input type="number" name="edad" placeholder="Edad" onChange={handleChange} />
        <textarea name="detalles" placeholder="Detalles (alergias, anomalías, etc.)" onChange={handleChange}></textarea>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        {/* 🆕 Vista previa de la imagen seleccionada */}
        {previewUrl && (
          <div className="qr-preview">
            <h4>Vista previa:</h4>
            <img src={previewUrl} alt="Vista previa" />
          </div>
        )}

        <button type="submit">Subir Mascota</button>
        <p>{mensaje}</p>

        {qrUrl && (
          <div className="qr-preview">
            <h4>QR generado:</h4>
            <img src={qrUrl} alt="QR Mascota" />
          </div>
        )}
      </form>
    </div>
  );
}

export default CargarMascota;



