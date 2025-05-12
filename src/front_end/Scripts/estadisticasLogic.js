 window.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/stats/estadisticas') // o la URL real de tu API
      .then(response => response.json())
      .then(data => {
        document.getElementById('totalEstudiantes').innerText = data.estudiantes;
        document.getElementById('totalProfesores').innerText = data.profesores;
        document.getElementById('totalAsignaturas').innerText = data.asignaturas;
      })
      .catch(err => {
        console.error('Error cargando las estadísticas:', err);
      });
  });