import { useState } from 'react';
import api from '../api';

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
      setMensaje(error.response.data.mensaje || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>
      {['nombre', 'email', 'contraseña', 'whatsapp', 'instagram'].map(campo => (
        <input
          key={campo}
          type={campo === 'contraseña' ? 'password' : 'text'}
          name={campo}
          placeholder={campo}
          value={form[campo]}
          onChange={handleChange}
        />
      ))}
      <button type="submit">Registrarse</button>
      <p>{mensaje}</p>
    </form>
  );
}

export default RegistroUsuario;
