import { useState } from 'react';
import api from '../api';

function CargarMascota({ token }) {
  const [form, setForm] = useState({
    nombre: '',
    raza: '',
    edad: '',
    detalles: ''
  });
  const [imagen, setImagen] = useState(null);
  const [qrUrl, setQrUrl] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    for (const key in form) {
      data.append(key, form[key]);
    }
    if (imagen) data.append('imagen', imagen);

    try {
      const res = await api.post('/mascotas', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setQrUrl(`http://localhost:3001${res.data.qr}`);
      setMensaje('Mascota registrada con éxito');
    } catch (error) {
      setMensaje('Error al registrar mascota');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar Mascota</h2>
      <input type="text" name="nombre" placeholder="Nombre" onChange={handleChange} required />
      <input type="text" name="raza" placeholder="Raza" onChange={handleChange} />
      <input type="number" name="edad" placeholder="Edad" onChange={handleChange} />
      <textarea name="detalles" placeholder="Detalles (alergias, anomalías, etc.)" onChange={handleChange}></textarea>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Subir Mascota</button>
      <p>{mensaje}</p>
      {qrUrl && <div><h3>QR generado:</h3><img src={qrUrl} alt="QR Mascota" /></div>}
    </form>
  );
}

export default CargarMascota;
