# 🐾 Pet QR - Identificador para Mascotas Perdidas

Este sistema permite que cualquier persona registre su mascota y genere un **código QR** que puede ser impreso y colocado en el collar del animal. Al escanear ese QR, se podrá acceder a los datos de la mascota y sus dueños, incluyendo nombre, raza, edad, datos de contacto, y más. Ideal para **recuperar mascotas perdidas** de manera rápida.

---

## 🌐 Tecnologías Utilizadas

### Backend
- **Node.js** + **Express**
- **PostgreSQL**
- **Sequelize**
- **JWT** + **bcrypt**
- **Multer**
- **qrcode (npm)**

### Frontend
- **React.js**
- **Bootstrap**
- **CSS personalizado**

---

## 🧩 Funcionalidades

### Autenticación
- Registro e inicio de sesión con contraseña encriptada
- Acceso a rutas protegidas con token JWT

### Gestión de Mascotas
- Registro de mascotas con datos e imagen
- Generación automática de código QR
- Visualización pública desde el QR escaneado

---

## 🗂️ Estructura del Proyecto

```
pet-qr-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── views/
│   │   └── App.js
├── uploads/
├── qr/
├── .env
└── README.md
```

---

## ⚙️ Instalación

### Backend

```bash
cd backend
npm install
```

Archivo `.env`:

```
PORT=3001
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=petqr
DB_HOST=localhost
SECRET=clave_supersecreta
```

```bash
npx sequelize db:migrate
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 👨‍💻 Autor

Desarrollado por Cristhian Miño.
