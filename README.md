# 🎓 **university-management-app** 📚

Este es un proyecto para la gestión de estudiantes, asignaturas y profesores en un contexto universitario. La aplicación permite gestionar datos de forma eficiente utilizando un backend robusto y un frontend intuitivo.

---

## 🔧 **Características** ✨

- **Backend:** Node.js, Express y TypeScript. 🖥️
- **Frontend:** HTML, CSS y JavaScript. 🌐
- **API REST:** Soporta métodos HTTP ( **GET**,  **POST**,  **PUT**, DELETE). 🔄
- **Persistencia de Datos:** Base de datos para almacenar l **a info**rmación. 💾

---

## 📋 **Requisitos** ⚙️

Asegúrate de tener las siguientes versiones de herramientas:

- **Node.js** (v16 o superior) 🔑
- **npm** (v8 o superior) 📦

---

## 🛠️ **Instalación** 🚀

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/eydrien/university-management-app.git
   cd university-management-app

2. **Instala las dependencias**
   ```bash
    npm install express nodemon body-parser mysql2 dotenv cors
    npm install --save-dev ts-node nodemon
    npm install typescript --save-dev
3. **Configura el entorno de desarrollo**
    ```bash
    #Crea un archivo .env en la raíz del proyecto con las variables necesarias (por ejemplo, conexión a la base de datos, puertos, etc.)
    #Si no tienes un archivo .env, puedes basarte en el archivo .env.example para configurarlo.

4. **Ejecuta la aplicación**
    ```bash
    #Para iniciar el servidor en modo desarrollo, ejecuta:
    #Esto arrancará el servidor con nodemon para reiniciar automáticamente en caso de cambios en el código.
    npm run dev

---
## **🌍 Acceso a la API 💡**

 La API está configurada para interactuar con los siguientes métodos HTTP:

 **PROFESORES**
- **GET** /profesor: Obtener lista de profesores.
- **POST** /profesor: Crear un nuevo profesor.
- **PUT** /profesor/:cod_e: Actualizar un profesor por su ID.
- **DELETE** /profesor/:cod_e: Eliminar un profesor por su ID.   

**ESTUDIANTES**
- **GET** /estrudiante: Obtener lista de estudiantes.
- **POST** /estrudiante: Crear un nuevo estudiante.
- **PUT** /estrudiante/:cod_e: Actualizar un estudiante por su ID.
- **DELETE** /estrudiante/:cod_e: Eliminar un estudiante por su ID.

**ASIGNATURAS**
- **GET** /asignatura: Obtener lista de asignaturas.
- **POST** /asignatura: Crear una nueva asignatura.
- **PUT** /asignatura/:cod_e: Actualizar una asignatura por su ID.
- **DELETE** /asignatura/:cod_e: Eliminar una asignatura por su ID.

---


## **📄 Licencia 🔒**
    Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

---
## **🌐 Grupo de trabajo 📱**
    1. Lorena
    2. Joynner
    3. Adrian 
