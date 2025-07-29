import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import html2pdf from 'html2pdf.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './VerMascota.css';
import fondo from '../assets/fondo.png';

function VerMascota() {
  const { id } = useParams();
  const [mascota, setMascota] = useState(null);
  const contenidoRef = useRef();

  useEffect(() => {
    api.get(`/mascotas/${id}`)
      .then(res => setMascota(res.data))
      .catch(err => console.error('Error al obtener mascota:', err));
  }, [id]);

  const generarPDF = () => {
    if (!contenidoRef.current) return;

    const images = contenidoRef.current.querySelectorAll('img');
    const promises = Array.from(images).map(img => {
      return new Promise(resolve => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }
      });
    });

    Promise.all(promises).then(() => {
      const opciones = {
        margin: 0.5,
        filename: `mascota-${mascota.nombre}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: null
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      html2pdf().set(opciones).from(contenidoRef.current).save();
    });
  };

  if (!mascota) return <p className="text-center mt-5">Cargando mascota...</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        paddingTop: '2rem'
      }}
    >
      <div className="container mt-4">
        <div className="text-end">
          <button className="btn btn-outline-dark mb-3" onClick={generarPDF}>
            📄 Descargar PDF
          </button>
        </div>

        <div
          ref={contenidoRef}
          className="card shadow-lg p-4 mx-auto"
          style={{
            maxWidth: '600px',
            backgroundImage: `url(${fondo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: 'black'
          }}
        >
          <h2 className="text-center mb-3">{mascota.nombre}</h2>

          {mascota.imagen && (
            <img
              src={`http://localhost:3001/uploads/${mascota.imagen}`}
              alt="Mascota"
              className="img-fluid rounded mx-auto d-block mb-3"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          )}

          <p><strong>Raza:</strong> {mascota.raza}</p>
          <p><strong>Edad:</strong> {mascota.edad}</p>
          <p><strong>Detalles:</strong> {mascota.detalles}</p>

          {mascota.id && (
            <div className="text-center mt-4">
              <h5>Código QR</h5>
              <img
                src={`http://localhost:3001/qr/qr-${mascota.id}.png`}
                alt="QR mascota"
                className="img-fluid"
                style={{ maxHeight: '180px' }}
              />
            </div>
          )}

          <hr />

          {mascota.Usuario && (
            <>
              <h5 className="text-center mt-4">📞 Contacto del Dueño</h5>
              <p><strong>Nombre:</strong> {mascota.Usuario.nombre}</p>

              {mascota.Usuario.whatsapp && (
                <p>
                  <a
                    href={`https://wa.me/${mascota.Usuario.whatsapp}`}
                    className="btn btn-success w-100 mb-2"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </p>
              )}

              {mascota.Usuario.instagram && (
                <p>
                  <a
                    href={`https://instagram.com/${mascota.Usuario.instagram}`}
                    className="btn btn-primary w-100"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerMascota;
