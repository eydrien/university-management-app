const API_URL = 'http://localhost:3000/profesor';

// Función para obtener estudiantes del servidor



document.getElementById('formProfesor').addEventListener('submit', function (event) {
  event.preventDefault();

  const profesor = {
      id_p: document.getElementById('id_p').value,
      nom_p: document.getElementById('nom_p').value,
      dir_p: document.getElementById('dir_p').value,
      tel_p: document.getElementById('tel_p').value,
      profesion: document.getElementById('profesion').value
  };

  fetch('http://localhost:3000/profesor', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(profesor),
  })
  .then(response => {
      if (response.ok) {
          // Limpiar campos del formulario
          document.getElementById('id_p').value = '';
          document.getElementById('nom_p').value = '';
          document.getElementById('dir_p').value = '';
          document.getElementById('tel_p').value = '';
          document.getElementById('profesion').value = '';

          // Mostrar mensaje de éxito
          alert('Estudiante creado con éxito');
      }
      return response.json();
  })
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
});







function cargarProfesores() {
    fetch('http://localhost:3000/profesor')
      .then(response => response.json())
      .then(responseData => {
        console.log('Datos recibidos:', responseData);
        const profesores = responseData.data;

        if (Array.isArray(profesores)) {
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
                <button onclick="editarProfesor(${profesor.id_p})">Editar</button>
                <button onclick="eliminarProfesor(${profesor.id_p})">Eliminar</button>
              </td>
            `;
            tbody.appendChild(tr);
          });
        } else {
          console.error('La respuesta no contiene un array en la propiedad "data":', profesores);
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos:', error);
      });
  }
  window.onload = cargarProfesores;







// Función para eliminar un estudiante
async function eliminarEstudiante(id_p) {
  await fetch(`${API_URL}/${id_p}`, { method: 'DELETE' });

}


