import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
  return (
    <div className="inicio-container">
      <main>
        <img
          src="/logo.png"
          alt="PetConnect Logo"
          className="logo-img"
        />
        <p className="descripcion">
          Registrate, cargá los datos de tu mascota y generá un código QR para que cualquiera pueda identificarla escaneándolo.
        </p>
        <div className="btn-group">
          <Link to="/registro" className="btn btn-primary">Registrarse</Link>
          <Link to="/login" className="btn btn-outline-warning">Iniciar Sesión</Link>
        </div>
      </main>
    </div>
  );
}

export default Inicio;
