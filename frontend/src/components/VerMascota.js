import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

function VerMascota() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);

  useEffect(() => {
    api.get(`/mascotas/${id}`).then(res => {
      setMascota(res.data);
    });
  }, [id]);

  if (!mascota) return <p>Cargando...</p>;

  return (
    <div>
      <h2>{mascota.nombre}</h2>
      <p><strong>Raza:</strong> {mascota.raza}</p>
      <p><strong>Edad:</strong> {mascota.edad}</p>
      <p><strong>Detalles:</strong> {mascota.detalles}</p>
      {mascota.imagen && <img src={`http://localhost:3001/uploads/${mascota.imagen}`} alt="Mascota" width="200" />}
      <h3>Contacto del Dueño</h3>
      <p><strong>Nombre:</strong> {mascota.Usuario?.nombre}</p>
      <p><a href={`https://wa.me/${mascota.Usuario?.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp</a></p>
      <p><a href={`https://instagram.com/${mascota.Usuario?.instagram}`} target="_blank" rel="noreferrer">Instagram</a></p>
    </div>
  );
}

export default VerMascota;
