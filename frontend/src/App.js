import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from 'react-router-dom';
import RegistroUsuario from './components/RegistroUsuario';
import Login from './components/Login';
import CargarMascota from './components/CargarMascota';
import VerMascota from './components/VerMascota';
import Inicio from './components/Inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    navigate('/'); // 🔁 Redirige al inicio
  };

  // 📍 Hook para detectar la ruta actual
  const location = useLocation();
  const ocultarNavbar = location.pathname === '/';
  const navigate = useNavigate();


  return (
    <>
      {!ocultarNavbar && (
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">🐾 PetConnect</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {!token ? (
                  <>
                    
                  </>
                ) : (
                  <>
                    <li className="nav-item"><Link className="nav-link" to="/mascota">Cargar Mascota</Link></li>
                    <li className="nav-item">
                      <button className="btn btn-danger ms-2" onClick={handleLogout}>Cerrar sesión</button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/registro" element={<RegistroUsuario />} />
        <Route path="/mascota" element={token ? <CargarMascota token={token} /> : <Navigate to="/login" />} />
        <Route path="/ver/:id" element={<VerMascota />} />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
