# 🐾 Pet QR - Identificador para Mascotas Perdidas

Este sistema permite que cualquier persona registre su mascota y genere un **código QR** que puede ser impreso y colocado en el collar del animal. Al escanear ese QR, se podrá acceder a los datos de la mascota y sus dueños, incluyendo nombre, raza, edad, datos de contacto, y más. Ideal para **recuperar mascotas perdidas** de manera rápida.

---

## 🌐 Tecnologías Utilizadas

### Backend
- **Node.js** + **Express** → Framework y servidor HTTP
- **PostgreSQL** → Base de datos relacional
- **Sequelize** → ORM para manejar la base de datos desde código JS
- **JWT** + **bcrypt** → Autenticación segura
- **Multer** → Subida de imágenes
- **QR Code (qrcode)** → Generación de códigos QR en base a la info de la mascota

### Frontend
- **React.js** → SPA para el cliente web
- **Bootstrap** → Estilización y maquetado visual
- **CSS personalizado** → Fondos temáticos, paleta naranja/blanca, diseño amigable

---

## 🧩 Funcionalidades

### 🔐 Autenticación
- Registro e inicio de sesión con encriptación de contraseña (`bcrypt`)
- Acceso con JWT a rutas protegidas del backend

### 🐶 Gestión de Mascotas
- Formulario para **registrar mascotas** (nombre, edad, raza, detalles, imagen)
- Se genera automáticamente un **código QR** al registrar
- La imagen de la mascota y el QR quedan disponibles
- Página pública accesible desde el QR escaneado

### 🖼️ Carga y Visualización
- Subida de imagen de la mascota desde el formulario
- Se visualiza todo en una sección `/mascota`, con estilo amigable

---

## 🗂️ Estructura de Carpetas

pet-qr-app/
├── backend/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── views/
│ │ └── App.js
├── uploads/ # Imágenes de mascotas
├── qr/ # QR generados
├── .env
└── README.md

---

## ⚙️ Instalación y Ejecución

### 1. Cloná el repositorio


git clone https://github.com/usuario/pet-qr-app.git
cd pet-qr-app
---

2. Configuración del Backend
cd backend
npm install
Configurá el archivo .env con tus datos de PostgreSQL:

PORT=3001
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=petqr
DB_HOST=localhost
SECRET=clave_supersecreta

Creá la base de datos manualmente o con Sequelize:
npx sequelize db:migrate

Iniciá el servidor backend:
npm start

3. Configuración del Frontend

cd ../frontend
npm install
npm run dev
📸 Sugerencias de Capturas
Página de inicio

Formulario de registro de mascotas

Vista del código QR generado

Página pública de visualización desde el QR

👨‍💻 Autor
Desarrollado por [Tu Nombre] para el proyecto académico.
Licencia: MIT


Hecho por Cristhian Miño  
