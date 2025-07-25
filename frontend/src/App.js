import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import RegistroUsuario from './components/RegistroUsuario';
import Login from './components/Login';
import CargarMascota from './components/CargarMascota';
import VerMascota from './components/VerMascota';

function App() {
  const [token, setToken] = useState('');

  return (
    <Router>
      <div className="App">
        <h1>🐾 Pet QR</h1>
        <Routes>
          <Route path="/" element={<RegistroUsuario />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/cargar" element={<CargarMascota token={token} />} />
          <Route path="/mascota/:id" element={<VerMascota />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

