/* -------------------------------------------------------
 *  Inscribe – Lógica de Front-End
 * -----------------------------------------------------*/

const API_URL = 'http://localhost:3000';

// Referencias del DOM
const tabla = document.getElementById("tabla-inscribe");
const form = document.getElementById("filtros");
const limpiarBtn = document.getElementById("limpiar");



// Renderizar datos
function renderTabla(datos) {
  tabla.innerHTML = "";

  if (!Array.isArray(datos) || datos.length === 0) {
    tabla.innerHTML = "<tr><td colspan='10'>No se encontraron registros</td></tr>";
    return;
  }

  datos.forEach(item => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${item.cod_e}</td>
      <td>${item.nombre_estudiante || "Desconocido"}</td>
      <td>${item.cod_a}</td>
      <td>${item.nombre_asignatura || "N/A"}</td>
      <td>${item.grupo}</td>
      <td>${item.semestre}</td>
      <td>${item.n1}</td>
      <td>${item.n2}</td>
      <td>${item.n3}</td>
      <td>
        <button onclick="editarRegistro(${item.cod_e}, '${item.cod_a}', ${item.grupo})">✏️Editar</button>
        <button onclick="eliminarRegistro(${item.cod_e}, '${item.cod_a}', ${item.grupo})">🗑️Eliminar</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}


// Obtener todos los inscribe
async function obtenerTodos() {
  try {
    const res = await fetch(`${API_URL}/inscribe`);
    const data = await res.json();
    renderTabla(data.data);
  } catch (err) {
    console.error("Error al cargar inscripciones:", err);
  }
}

// Filtrar según campos
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cod_e = document.getElementById("cod_e").value.trim();
  const cod_a = document.getElementById("cod_a").value.trim();
  const grupo = document.getElementById("grupo").value.trim();
  const semestre = document.getElementById("semestre").value.trim();

  let endpoint = "";

  // Ruta para buscar por código de estudiante
  if (cod_e && !cod_a && !grupo && !semestre) {
    endpoint = `/inscribe/estudiante/${cod_e}`;
  }
  // Ruta para buscar por código de estudiante, asignatura y grupo
  else if (cod_e && cod_a && grupo && !semestre) {
    endpoint = `/inscribe/estudiante?cod_e=${cod_e}&cod_a=${cod_a}&grupo=${grupo}`;
  }
  // Ruta para buscar por asignatura y semestre
  else if (cod_e && !cod_a && semestre && !grupo) {
    endpoint = `/inscribe/asignaturas?cod_e=${cod_e}&semestre=${semestre}`;
  }
  // Ruta para buscar por asignatura y grupo
  else if (cod_a && grupo && !cod_e && !semestre) {
    endpoint = `/inscribe/estudiantes?cod_a=${cod_a}&grupo=${grupo}`;
  }
  // Ruta para buscar por asignatura, grupo y semestre
  else if (cod_a && grupo && semestre && !cod_e) {
    endpoint = `/inscribe/estudiantes-semestre?cod_a=${cod_a}&grupo=${grupo}&semestre=${semestre}`;
  } else {
    return alert("Para realizar esta busqueda solo escriba el codigo del estudiante.");
  }

  try {
    // Llamar a la API con la ruta construida
    const res = await fetch(`${API_URL}${endpoint}`);
    const data = await res.json();
    renderTabla(data.data); // Mostrar los resultados en la tabla
  } catch (err) {
    console.error("Error en la búsqueda:", err);
  }
});

// Botón limpiar
limpiarBtn.addEventListener("click", () => {
  form.reset();
  obtenerTodos();
});
// Cargar todos al inicio
obtenerTodos();

const formCrearEditar = document.getElementById("form-inscribe");
const btnCrearActualizar = document.getElementById("btn-crear-actualizar");

let modoEdicion = false;
let datosEdicion = {}; // Guardar cod_e, cod_a, grupo originales

// Cargar selects con datos desde API
async function cargarSelects() {
  const [estudiantesRes, asignaturasRes] = await Promise.all([
    fetch(`${API_URL}/estudiantes`),
    fetch(`${API_URL}/asignaturas`)
  ]);

  const estudiantes = await estudiantesRes.json();
  const asignaturas = await asignaturasRes.json();

  const selectEstudiantes = document.getElementById("crear-cod_e");
  const selectAsignaturas = document.getElementById("crear-cod_a");

  selectEstudiantes.innerHTML = estudiantes.data.map(e => `<option value="${e.cod_e}">${e.nom_e} (${e.cod_e})</option>`).join('');
  selectAsignaturas.innerHTML = asignaturas.data.map(a => `<option value="${a.cod_a}">${a.nom_a} (${a.cod_a})</option>`).join('');
}



// Cargar al inicio
cargarSelects();
