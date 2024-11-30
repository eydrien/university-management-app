const API_URL = 'http://localhost:3000/estudiante';



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








function cargarEstudiantes() {
  fetch('http://localhost:3000/estudiante')
    .then(response => response.json())
    .then(responseData => {
      console.log('Datos recibidos:', responseData); // Mostrar respuesta completa
      const estudiantes = responseData.data; // Acceder a la propiedad 'data'

      if (Array.isArray(estudiantes)) {
        const tbody = document.getElementById('tablaBody');
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos

        estudiantes.forEach(estudiante => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${estudiante.cod_e}</td>
            <td>${estudiante.nom_e}</td>
            <td>${estudiante.dir_e}</td>
            <td>${estudiante.tel_e}</td>
            <td>${new Date(estudiante.fech_nac).toLocaleDateString()}</td> <!-- Formato legible -->
            <td>
              <button onclick="editarEstudiante(${estudiante.cod_e})">Editar</button>
              <button onclick="eliminarEstudiante(${estudiante.cod_e})">Eliminar</button>
            </td>
          `;
          tbody.appendChild(tr);
        });
      } else {
        console.error('La respuesta no contiene un array en la propiedad "data":', estudiantes);
      }
    })
    .catch(error => {
      console.error('Error al cargar los datos:', error);
    });
}
window.onload = cargarEstudiantes;







// Función para eliminar un estudiante
async function eliminarEstudiante(cod_e) {
  await fetch(`${API_URL}/${cod_e}`, { method: 'DELETE' });

}


