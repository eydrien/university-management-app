# 🎓 **university-management-app** 📚

Este es un proyecto para la gestión de estudiantes, asignaturas y profesores en un contexto universitario. La aplicación permite gestionar datos de forma eficiente utilizando un backend robusto y un frontend intuitivo.

---

## 🔧 **Características** ✨

- **Backend:** Node.js, Express y TypeScript. 🖥️
- **Frontend:** HTML, CSS y JavaScript. 🌐
- **API REST:** Soporta métodos HTTP (GET, POST, PUT, DELETE). 🔄
- **Persistencia de Datos:** Base de datos para almacenar la información. 💾

---

## 📋 **Requisitos** ⚙️

Asegúrate de tener las siguientes versiones de herramientas:

- **Node.js** (v16 o superior) 🔑
- **npm** (v8 o superior) 📦

---

## 🛠️ **Instalación** 🚀

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/eydrien/university-management-app.git
   cd university-management-app

2. **Instala las dependencias**
  ```  bash
    npm install
3. **Configura el entorno de desarrollo**

    Crea un archivo .env en la raíz del proyecto con las variables necesarias (por ejemplo, conexión a la base de datos, puertos, etc.)
    Si no tienes un archivo .env, puedes basarte en el archivo .env.example para configurarlo.

4. **Ejecuta la aplicación**
    Para iniciar el servidor en modo desarrollo, ejecuta:
    Esto arrancará el servidor con nodemon para reiniciar automáticamente en caso de cambios en el código.
    ``` bash
    npm run dev

🌍 Acceso a la API 💡
La API está configurada para interactuar con los siguientes métodos HTTP:

GET /students: Obtener lista de estudiantes.
POST /students: Crear un nuevo estudiante.
PUT /students/:id: Actualizar un estudiante por su ID.
DELETE /students/:id: Eliminar un estudiante por su ID.
Puedes modificar o extender estos métodos según sea necesario para tu aplicación.

📄 Licencia 🔒
Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

🌐 Grupo de trabajo 📱
1. Lorena
2. Joynner
3. Adrian 
