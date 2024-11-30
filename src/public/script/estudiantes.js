
const API_URL = 'http://localhost:3000/estudiante';

// Función para obtener estudiantes del servidor
async function obtenerEstudiantes() {
  const respuesta = await fetch(API_URL);
  const data = await respuesta.json();
  renderTabla(data);
}

// Función para renderizar la tabla
function renderTabla(estudiantes, tablaEstudiantes) {
  tablaEstudiantes.innerHTML = '';
  estudiantes.forEach((_estudiantes, cod_e) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${estudiante.cod_e}</td>
      <td>${estudiante.nom_e}</td>
      <td>${estudiante.dir_e}</td>
      <td>${estudiante.tel_e}</td>
      <td>${estudiante.fech_nac}</td>
      <td>
        <button onclick="editarEstudiante(${cod_e})">Editar</button>
        <button class="delete" onclick="eliminarEstudiante(${cod_e})">Eliminar</button>
      </td>
    `;
    tablaEstudiantes.appendChild(fila);
  });
}

// Función para agregar o actualizar un estudiante
document.getElementById('formEstudiante').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cod_e = document.getElementById('cod_e').value;
  const nom_e = document.getElementById('nom_e').value;
  const dir_e = document.getElementById('dir_e').value;
  const tel_e = document.getElementById('tel_e').value;
  const fech_nac = document.getElementById('fech_nac').value;

  const estudiante = {cod_e, nom_e, dir_e, tel_e, fech_nac };

  if (cod_e) {
    // Actualizar estudiante
    await fetch(`${API_URL}/${cod_e}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante),
    });
  } else {
    // Crear estudiante
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(estudiante),
    });
  }

  document.getElementById('formEstudiante').reset();
  obtenerEstudiantes();
});

// Función para editar un estudiante
function editarEstudiante(cod_e) {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const estudiante = data[cod_e];
      document.getElementById('cod_e').value = cod_e;
      document.getElementById('nom_e').value = estudiante.nom_e;
      document.getElementById('dir_e').value = estudiante.dir_e;
      document.getElementById('tel_e').value = estudiante.tel_e;
      document.getElementById('fech_nac').value = estudiante.fech_nac;
    });
}

// Función para eliminar un estudiante
async function eliminarEstudiante(cod_e) {
  await fetch(`${API_URL}/${cod_e}`, { method: 'DELETE' });
  obtenerEstudiantes();
}

// Inicializar
obtenerEstudiantes();
