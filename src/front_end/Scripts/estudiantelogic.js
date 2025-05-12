/* -------------------------------------------------------
 *  ESTUDIANTES – Lógica de Front-End
 * -----------------------------------------------------*/
const API_URL = 'http://localhost:3000/estudiantes';
let modoEdicion = false;
let estudianteEditando = null;

/* ------------------
 *  SUBMIT del FORM
 * ----------------*/
document.getElementById('formEstudiante').addEventListener('submit', function (event) {
  event.preventDefault();

  const estudiante = {
    cod_e: document.getElementById('cod_e').value,
    nom_e: document.getElementById('nom_e').value,
    dir_e: document.getElementById('dir_e').value,
    tel_e: document.getElementById('tel_e').value,
    fech_nac: document.getElementById('fech_nac').value
  };

  const url = modoEdicion ? `${API_URL}/${estudianteEditando}` : API_URL;
  const metodo = modoEdicion ? 'PUT' : 'POST';

  fetch(url, {
    method: metodo,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(estudiante),
  })
    .then(response => response.json())
    .then(data => {
      const tipo = modoEdicion ? 'PUT (actualización)' : 'POST (creación)';
      console.log(`%c[API ${tipo}] Respuesta del servidor:`, 'color: green; font-weight: bold;', data);

      alert(modoEdicion ? 'Estudiante actualizado con éxito' : 'Estudiante creado con éxito');
      document.getElementById('formEstudiante').reset();
      modoEdicion = false;
      estudianteEditando = null;
      document.querySelector('button[type="submit"]').textContent = 'Guardar';
      cargarEstudiantes();
    })
    .catch(error => {
      console.error('%c[ERROR] Falló la solicitud al servidor:', 'color: red; font-weight: bold;', error);
    });
});

/* -------------
 *  BOTÓN CANCELAR
 * ------------ */
document.getElementById('cancelBtn').addEventListener('click', function () {
  document.getElementById('formEstudiante').reset();  // Resetea el formulario
  modoEdicion = false;  // Cambia el modo de edición a "false"
  estudianteEditando = null;  // Limpia la variable que guarda el ID del estudiante en edición
  document.querySelector('button[type="submit"]').textContent = 'Guardar';  // Cambia el texto del botón de "Actualizar" a "Guardar"
});

/* ---------------------------
 *  CARGAR TODOS LOS ESTUDIANTES
 * -------------------------*/
function cargarEstudiantes() {
  fetch(API_URL)
    .then(response => response.json())
    .then(responseData => {
      console.log('%c[API GET] Lista de estudiantes:', 'color: blue; font-weight: bold;', responseData);
      const estudiantes = responseData.data;

      const tbody = document.getElementById('tablaBody');
      tbody.innerHTML = '';

      estudiantes.forEach(estudiante => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${estudiante.cod_e}</td>
          <td>${estudiante.nom_e}</td>
          <td>${estudiante.dir_e}</td>
          <td>${estudiante.tel_e}</td>
          <td>${new Date(estudiante.fech_nac).toLocaleDateString()}</td>
          <td>
            <button onclick="editarEstudiante('${estudiante.cod_e}')">✏️Editar</button>
            <button onclick="eliminarEstudiante('${estudiante.cod_e}')">🗑️Eliminar</button>
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
 *  EDITAR Estudiante
 * -----------------*/
function editarEstudiante(cod_e) {
  fetch(`${API_URL}/${cod_e}`)
    .then(response => response.json())
    .then(data => {
      console.log('%c[API GET by ID] Estudiante a editar:', 'color: orange; font-weight: bold;', data);
      const estudiante = data.data;
      document.getElementById('cod_e').value = estudiante.cod_e;
      document.getElementById('nom_e').value = estudiante.nom_e;
      document.getElementById('dir_e').value = estudiante.dir_e;
      document.getElementById('tel_e').value = estudiante.tel_e;
      document.getElementById('fech_nac').value = estudiante.fech_nac.split('T')[0];

      document.querySelector('button[type="submit"]').textContent = 'Actualizar Estudiante';  // Cambia el texto del botón
      modoEdicion = true;  // Cambia el modo a edición
      estudianteEditando = estudiante.cod_e;  // Guarda el ID del estudiante en edición
    })
    .catch(error => {
      console.error('%c[ERROR] al obtener estudiante:', 'color: red; font-weight: bold;', error);
    });
}

/* --------------------
 *  ELIMINAR Estudiante
 * ------------------*/
function eliminarEstudiante(cod_e) {
  if (!confirm(`¿Estás seguro de eliminar al estudiante ${cod_e}?`)) return;

  fetch(`${API_URL}/${cod_e}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      console.log('%c[API DELETE] Estudiante eliminado:', 'color: red; font-weight: bold;', data);
      alert('Estudiante eliminado');
      cargarEstudiantes();
    })
    .catch(error => {
      console.error('%c[ERROR] al eliminar estudiante:', 'color: red; font-weight: bold;', error);
    });
}

/* --------------------------
 *  CARGAR AL INICIAR LA PÁGINA
 * ------------------------*/
window.onload = cargarEstudiantes;
