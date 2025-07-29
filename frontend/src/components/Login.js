import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './Login.css';

function Login({ setToken }) {
  const [form, setForm] = useState({ email: '', contraseña: '' });
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token;

      localStorage.setItem('token', token);
      setToken(token);
      setMensaje('Login exitoso ✅');

      // 🔍 Buscar mascotas del usuario
      const mascotasRes = await api.get('/mascotas', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const mascotas = mascotasRes.data;
      if (mascotas.length > 0) {
        navigate(`/ver/${mascotas[0].id}`);
      } else {
        navigate('/mascota');
      }

    } catch (error) {
      setMensaje('Login fallido ❌');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="contraseña"
            placeholder="Contraseña"
            onChange={handleChange}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        <p className="mensaje">{mensaje}</p>
      </div>
    </div>
  );
}

export default Login;

