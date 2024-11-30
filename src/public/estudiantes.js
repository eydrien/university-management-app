const API_URL = 'http://localhost:3000/estudiante';

// Función para obtener estudiantes del servidor
async function obtenerEstudiantes() {
  const respuesta = await fetch(API_URL);
  const data = await respuesta.json();
  renderTabla(data); // Pasa los estudiantes al renderTabla
}


document.getElementById('formEstudiante').addEventListener('submit', function (event) {
  event.preventDefault();

  const estudiante = {
      cod_e: document.getElementById('cod_e').value,
      nom_e: document.getElementById('nom_e').value,
      dir_e: document.getElementById('dir_e').value,
      tel_e: document.getElementById('tel_e').value,
      fech_nac: document.getElementById('fech_nac').value
  };

  fetch('http://localhost:3000/estudiante', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(estudiante),
  })
  .then(response => {
      if (response.ok) {
          // Limpiar campos del formulario
          document.getElementById('cod_e').value = '';
          document.getElementById('nom_e').value = '';
          document.getElementById('dir_e').value = '';
          document.getElementById('tel_e').value = '';
          document.getElementById('fech_nac').value = '';

          // Mostrar mensaje de éxito
          alert('Estudiante creado con éxito');
      }
      return response.json();
  })
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
});





















/* 


// Función para agregar o actualizar un estudiante
document.getElementById('formEstudiante').addEventListener('submit', async (e) => {
  e.preventDefault();
  const cod_e = document.getElementById('cod_e').value;
  const nom_e = document.getElementById('nom_e').value;
  const dir_e = document.getElementById('dir_e').value;
  const tel_e = document.getElementById('tel_e').value;
  const fech_nac = document.getElementById('fech_nac').value;

  const estudiante = { cod_e, nom_e, dir_e, tel_e, fech_nac };

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
  obtenerEstudiantes(); // Actualizar la lista de estudiantes
});

// Función para editar un estudiante
function editarEstudiante(cod_e) {
  fetch(API_URL)
    .then((res) => res.json())
    .then((data) => {
      const estudiante = data.find(e => e.cod_e === cod_e); // Usar find para encontrar el estudiante
      document.getElementById('cod_e').value = estudiante.cod_e;
      document.getElementById('nom_e').value = estudiante.nom_e;
      document.getElementById('dir_e').value = estudiante.dir_e;
      document.getElementById('tel_e').value = estudiante.tel_e;
      document.getElementById('fech_nac').value = estudiante.fech_nac;
    });
}

// Función para eliminar un estudiante
async function eliminarEstudiante(cod_e) {
  await fetch(`${API_URL}/${cod_e}`, { method: 'DELETE' });
  obtenerEstudiantes(); // Actualizar la lista después de eliminar
}

// Inicializar
obtenerEstudiantes(); */
