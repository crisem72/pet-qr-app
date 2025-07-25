# 🐾 Pet QR - Identificador para Mascotas Perdidas

Este proyecto permite a los usuarios registrar sus datos y los de su mascota. Una vez registrados, se genera un **código QR** que puede ser pegado en el collar de la mascota para que, si se pierde, cualquier persona pueda escanearlo y ver sus datos.

---

## 🛠️ Tecnologías utilizadas

- **Backend**: Node.js + Express
- **Base de datos**: PostgreSQL con Sequelize
- **Autenticación**: JWT + bcrypt
- **Subida de imágenes**: Multer
- **Generación de QR**: 'qrcode' (npm)
- **Frontend**: React (en carpeta separada)
  
---

## 🔐 Registro y Login

- POST `/api/auth/register` → Crear nuevo usuario  
- POST `/api/auth/login` → Iniciar sesión y obtener token JWT

---

## 🐶 Gestión de mascotas

- POST `/api/mascotas` (requiere token) → Registrar mascota con imagen  
- GET `/api/mascotas/:id` → Ver datos públicos de la mascota (usado por QR)

---

## 📁 Carpetas importantes

- `/uploads` → Imágenes de las mascotas  
- `/qr` → Imágenes de los códigos QR generados

---

## 🧪 Cómo ejecutar el proyecto

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Crear un archivo `.env` con:

   ```env
   PORT=3001
   DB_NAME=mascotas_db
   DB_USER=postgres
   DB_PASSWORD=tu_contraseña
   DB_HOST=localhost
   JWT_SECRET=supersecreto123
   ```

3. Iniciar el servidor:
   ```bash
   node app.js
   ```

---

## 💬 Autor

Hecho por [Tu Nombre Aquí]  
