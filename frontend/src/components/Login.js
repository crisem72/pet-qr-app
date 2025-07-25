import { useState } from 'react';
import api from '../api';

function Login({ setToken }) {
  const [form, setForm] = useState({ email: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      setToken(res.data.token);
      setMensaje('Login exitoso');
    } catch (error) {
      setMensaje('Login fallido');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Ingresar</button>
      <p>{mensaje}</p>
    </form>
  );
}

export default Login;
