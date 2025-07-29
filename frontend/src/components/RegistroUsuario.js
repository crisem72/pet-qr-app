import { useState } from 'react';
import api from '../api';
import './RegistroUsuario.css';

function RegistroUsuario() {
  const [form, setForm] = useState({
    nombre: '', email: '', contraseña: '', whatsapp: '', instagram: ''
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      setMensaje('Usuario registrado exitosamente');
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-box">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          {['nombre', 'email', 'contraseña', 'whatsapp', 'instagram'].map((campo, i) => (
            <input
              key={i}
              type={campo === 'contraseña' ? 'password' : 'text'}
              name={campo}
              placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
              value={form[campo]}
              onChange={handleChange}
              required
            />
          ))}
          <button type="submit">Registrarse</button>
        </form>
        <p className="mensaje">{mensaje}</p>
      </div>
    </div>
  );
}

export default RegistroUsuario;


