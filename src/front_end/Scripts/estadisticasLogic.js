function cargarEstadisticas() {
  fetch('http://localhost:3000/stats/estadisticas')
    .then(response => response.json())
    .then(data => {
      document.getElementById('totalEstudiantes').innerText = data.estudiantes;
      document.getElementById('totalProfesores').innerText = data.profesores;
      document.getElementById('totalAsignaturas').innerText = data.asignaturas;
    })
    .catch(err => {
      console.error('Error cargando las estadísticas:', err);
    });
}

window.addEventListener('DOMContentLoaded', () => {
  cargarEstadisticas(); // Carga inicial
  setInterval(cargarEstadisticas, 10000); // Actualiza cada 10 segundos (10000 ms)
});
