/* -------------------------------------------------------
 *  PROFESORES – Lógica de Front-End
 * -----------------------------------------------------*/
const API_URL = 'http://localhost:3000/profesores';
let modoEdicion = false;
let profesorEditando = null;

/* ------------------
 *  SUBMIT del FORM
 * ----------------*/
document.getElementById('formProfesor').addEventListener('submit', function (event) {
  event.preventDefault();

  const profesor = {
    id_p: document.getElementById('id_p').value,
    nom_p: document.getElementById('nom_p').value,
    dir_p: document.getElementById('dir_p').value,
    tel_p: document.getElementById('tel_p').value,
    profesion: document.getElementById('profesion').value
  };

  const url = modoEdicion ? `${API_URL}/${profesorEditando}` : API_URL;
  const metodo = modoEdicion ? 'PUT' : 'POST';

  fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(profesor),
  })
    .then(response => response.json())
    .then(data => {
      const tipo = modoEdicion ? 'PUT (actualización)' : 'POST (creación)';
      console.log(`%c[API ${tipo}] Respuesta del servidor:`, 'color: green; font-weight: bold;', data);

      alert(modoEdicion ? 'Profesor actualizado con éxito' : 'Profesor creado con éxito');
      document.getElementById('formProfesor').reset();
      modoEdicion = false;
      profesorEditando = null;
      document.querySelector('button[type="submit"]').textContent = 'Guardar';
      cargarProfesores();
    })
    .catch(error => {
      console.error('%c[ERROR] Falló la solicitud al servidor:', 'color: red; font-weight: bold;', error);
    });
});

/* -------------
 *  BOTÓN CANCELAR
 * ------------ */
document.getElementById('cancelBtn').addEventListener('click', function () {
  document.getElementById('formProfesor').reset();  // Resetea el formulario
  modoEdicion = false;  // Cambia el modo de edición a "false"
  profesorEditando = null;  // Limpia la variable que guarda el ID del profesor en edición
  document.querySelector('button[type="submit"]').textContent = 'Guardar';  // Cambia el texto del botón de "Actualizar" a "Guardar"
});

/* ---------------------------
 *  CARGAR TODAS LOS PROFESORES
 * -------------------------*/
function cargarProfesores() {
  fetch(API_URL)
    .then(response => response.json())
    .then(responseData => {
      console.log('%c[API GET] Lista de profesores:', 'color: blue; font-weight: bold;', responseData);
      const profesores = responseData.data;

      const tbody = document.getElementById('tablaBody');
      tbody.innerHTML = '';

      profesores.forEach(profesor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${profesor.id_p}</td>
          <td>${profesor.nom_p}</td>
          <td>${profesor.dir_p}</td>
          <td>${profesor.tel_p}</td>
          <td>${profesor.profesion}</td>
          <td>
            <button onclick="editarProfesor('${profesor.id_p}')">✏️Editar</button>
            <button onclick="eliminarProfesor('${profesor.id_p}')">🗑️Eliminar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('%c[ERROR] al cargar los datos:', 'color: red; font-weight: bold;', error);
    });
}

/* -------------------
 *  EDITAR PROFESOR
 * -----------------*/
function editarProfesor(id_p) {
  fetch(`${API_URL}/${id_p}`)
    .then(response => response.json())
    .then(data => {
      console.log('%c[API GET by ID] Profesor a editar:', 'color: orange; font-weight: bold;', data);
      const profesor = data.data;
      document.getElementById('id_p').value = profesor.id_p;
      document.getElementById('nom_p').value = profesor.nom_p;
      document.getElementById('dir_p').value = profesor.dir_p;
      document.getElementById('tel_p').value = profesor.tel_p;
      document.getElementById('profesion').value = profesor.profesion;

      document.querySelector('button[type="submit"]').textContent = 'Actualizar Profesor';  // Cambia el texto del botón
      modoEdicion = true;  // Cambia el modo a edición
      profesorEditando = profesor.id_p;  // Guarda el ID del profesor en edición
    })
    .catch(error => {
      console.error('%c[ERROR] al obtener profesor:', 'color: red; font-weight: bold;', error);
    });
}

/* --------------------
 *  ELIMINAR PROFESOR
 * ------------------*/
function eliminarProfesor(id_p) {
  if (!confirm(`¿Estás seguro de eliminar al profesor ${id_p}?`)) return;

  fetch(`${API_URL}/${id_p}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log('%c[API DELETE] Profesor eliminado:', 'color: red; font-weight: bold;', data);
      alert('Profesor eliminado');
      cargarProfesores();
    })
    .catch(error => {
      console.error('%c[ERROR] al eliminar profesor:', 'color: red; font-weight: bold;', error);
    });
}

/* --------------------------
 *  CARGAR AL INICIAR LA PÁGINA
 * ------------------------*/
window.onload = cargarProfesores;
