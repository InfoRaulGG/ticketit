# 🎟️ Ticketit - API REST de Gestión de Tickets

**Ticketit** es una API REST ligera y escalable para la gestión de tickets de soporte, desarrollada con **Node.js**, **Express** y **MongoDB**. Diseñada como solución interna o como punto de partida para sistemas de soporte más completos.

---

## ✨ Características principales

* 📌 Crear, actualizar y eliminar tickets
* 🗂️ Gestión de estado, prioridad y categoría
* 📅 Filtros por fecha y estado
* 🧪 Pruebas automatizadas con Mocha + Chai
* 🐳 Despliegue rápido con Docker

---

## 🧰 Tecnologías utilizadas

* **Node.js** + **Express** para la lógica de backend
* **MongoDB** + **Mongoose** como base de datos NoSQL
* **Mocha**, **Chai** y **Supertest** para pruebas unitarias e integración
* **Docker** para contenerización y despliegue
* **dotenv** para gestión de variables de entorno

---

## 🚀 Instalación local

```bash
git clone https://github.com/InfoRaulGG/ticketit.git
cd ticketit
npm install
cp .env.example .env  # Configura tu conexión a MongoDB
npm run dev            # Ejecuta en modo desarrollo
```

> Asegúrate de que MongoDB esté corriendo y configurado correctamente en el archivo `.env`.

---

## 🐳 Despliegue con Docker

```bash
docker build -t ticketit .
docker run -p 3000:3000 --env-file .env ticketit
```

---

## 📬 Endpoints principales

| Método | Ruta              | Descripción               |
| ------ | ----------------- | ------------------------- |
| GET    | /api/tickets      | Obtener todos los tickets |
| POST   | /api/tickets      | Crear un nuevo ticket     |
| GET    | /api/tickets/\:id | Ver un ticket por ID      |
| PUT    | /api/tickets/\:id | Actualizar un ticket      |
| DELETE | /api/tickets/\:id | Eliminar un ticket        |

> Actualmente no requiere autenticación. Ideal para pruebas, entornos de desarrollo o uso interno.

---

## 🧪 Ejecutar pruebas

```bash
npm test
```

> Las pruebas están desarrolladas con Mocha, Chai y Supertest para validar los endpoints y el comportamiento de la API.

---

## 📁 Estructura del proyecto

```
ticketit/
├── controllers/    # Lógica de negocio
├── models/         # Esquemas de Mongoose
├── routes/         # Definición de rutas
├── tests/          # Pruebas automatizadas
├── utils/          # Funciones auxiliares
├── .env.example    # Variables de entorno
├── Dockerfile      # Configuración de Docker
├── app.js          # Configuración principal de Express
└── server.js       # Arranque del servidor
```

---

## 👨‍💻 Autor

**Raúl González Galán**
🔗 [LinkedIn](https://www.linkedin.com/in/raul-gonzalez-galan-141702199/)
💻 [GitHub](https://github.com/InfoRaulGG)

---

## 📄 Licencia

MIT License
