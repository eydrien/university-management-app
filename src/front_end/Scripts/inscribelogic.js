// ==========================
// Configuración y Selectores
// ==========================
const API_URL = "http://localhost:3000";

const form = document.getElementById("filtros");
const limpiarBtn = document.getElementById("limpiar");
const formInscribe = document.getElementById("form-inscribe");
const btnCrearActualizar = document.getElementById("btn-crear-actualizar");
const btnCancelar = document.getElementById("btn-cancelar");
const tablaBody = document.getElementById("tabla-inscribe");

const codESelect = document.getElementById("crear-cod_e");
const codASelect = document.getElementById("crear-cod_a");
const idPSelect = document.getElementById("crear-id_p");
const grupoInput = document.getElementById("crear-grupo");
const semestreInput = document.getElementById("crear-semestre");
const n1Input = document.getElementById("crear-n1");
const n2Input = document.getElementById("crear-n2");
const n3Input = document.getElementById("crear-n3");

// Estado de edición
let editando = false;
let inscripcionActual = null;

// ==========================
// Funciones auxiliares
// ==========================
async function cargarEstudiantes() {
  const res = await fetch(`${API_URL}/estudiantes`);
  const data = await res.json();
  codESelect.innerHTML = data.data.map(e => `<option value="${e.cod_e}">${e.nom_e} - ${e.cod_e}</option>`).join("");
}

async function cargarAsignaturas() {
  const res = await fetch(`${API_URL}/asignaturas`);
  const data = await res.json();
  codASelect.innerHTML = data.data.map(a => `<option value="${a.cod_a}">${a.nom_a} - ${a.cod_a}</option>`).join("");
}

async function cargarProfesores() {
  const res = await fetch(`${API_URL}/profesores`);
  const data = await res.json();
  idPSelect.innerHTML = data.data.map(p => `<option value="${p.id_p}">${p.nom_p} - ${p.id_p}</option>`).join("");
}


// ==========================
// Obtener todas las inscripciones
// ==========================
async function obtenerTodos() {
  try {
    const res = await fetch(`${API_URL}/inscribe`);
    const data = await res.json();
    renderTabla(data.data);
  } catch (err) {
    console.error("Error al cargar inscripciones:", err);
  }
}

// ==========================
// Renderizar tabla
// ==========================
function renderTabla(inscripciones) {
  tablaBody.innerHTML = "";

  inscripciones.forEach(ins => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${ins.cod_e}</td>
      <td>${ins.nombre_estudiante}</td>
      <td>${ins.cod_a}</td>
      <td>${ins.nombre_asignatura}</td>
      <td>${ins.grupo}</td>
      <td>${ins.semestre}</td>
      <td>${ins.n1}</td>
      <td>${ins.n2}</td>
      <td>${ins.n3}</td>
      <td>
        <button onclick='editar(${JSON.stringify(ins)})'>✏️Editar</button>
        <button onclick='eliminar(${ins.cod_e}, ${ins.cod_a}, ${ins.id_p}, ${ins.grupo}, ${ins.semestre})'>🗑️Eliminar</button>
      </td>
    `;

    tablaBody.appendChild(fila);
  });
}

// ==========================
// Función para editar
// ==========================
function editar(ins) {
  editando = true;
  inscripcionActual = ins;
  btnCrearActualizar.textContent = "Actualizar";

  codESelect.value = ins.cod_e;
  codASelect.value = ins.cod_a;
  idPSelect.value = ins.id_p;
  grupoInput.value = ins.grupo;
  semestreInput.value = ins.semestre;
  n1Input.value = ins.n1;
  n2Input.value = ins.n2;
  n3Input.value = ins.n3;
}

// ==========================
// Función para cancelar edición
// ==========================
btnCancelar.addEventListener("click", () => {
  editando = false;
  inscripcionActual = null;
  btnCrearActualizar.textContent = "Crear";
  formInscribe.reset();
});

// ==========================
// Crear o actualizar
// ==========================
formInscribe.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    cod_e: parseInt(codESelect.value),
    cod_a: parseInt(codASelect.value),
    id_p: parseInt(idPSelect.value),
    grupo: parseInt(grupoInput.value),
    semestre: parseInt(semestreInput.value),
    n1: parseFloat(n1Input.value),
    n2: parseFloat(n2Input.value),
    n3: parseFloat(n3Input.value),
  };

  try {
    if (editando && inscripcionActual) {
      const url = `${API_URL}/inscribe?cod_e=${inscripcionActual.cod_e}&cod_a=${inscripcionActual.cod_a}&id_p=${inscripcionActual.id_p}&grupo=${inscripcionActual.grupo}&semestre=${inscripcionActual.semestre}`;
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API_URL}/inscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    formInscribe.reset();
    editando = false;
    inscripcionActual = null;
    btnCrearActualizar.textContent = "Crear";
    obtenerTodos();
  } catch (err) {
    console.error("Error al guardar:", err);
  }
});

// ==========================
// Eliminar inscripción
// ==========================
async function eliminar(cod_e, cod_a, id_p, grupo, semestre) {
  if (!confirm("¿Seguro que deseas eliminar esta inscripción?")) return;

  try {
    const url = `${API_URL}/inscribe?cod_e=${cod_e}&cod_a=${cod_a}&id_p=${id_p}&grupo=${grupo}&semestre=${semestre}`;
    await fetch(url, { method: "DELETE" });
    obtenerTodos();
  } catch (err) {
    console.error("Error al eliminar:", err);
  }
}

// ==========================
// Buscar con filtros
// ==========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cod_e = document.getElementById("cod_e").value.trim();
  const cod_a = document.getElementById("cod_a").value.trim();
  const grupo = document.getElementById("grupo").value.trim();
  const semestre = document.getElementById("semestre").value.trim();

  let endpoint = "";

  if (cod_e && !cod_a && !grupo && !semestre) {
    endpoint = `/inscribe/estudiante/${cod_e}`;
  } else if (cod_e && cod_a && grupo && !semestre) {
    endpoint = `/inscribe/estudiante?cod_e=${cod_e}&cod_a=${cod_a}&grupo=${grupo}`;
  } else if (cod_e && !cod_a && semestre && !grupo) {
    endpoint = `/inscribe/asignaturas?cod_e=${cod_e}&semestre=${semestre}`;
  } else if (cod_a && grupo && !cod_e && !semestre) {
    endpoint = `/inscribe/estudiantes?cod_a=${cod_a}&grupo=${grupo}`;
  } else if (cod_a && grupo && semestre && !cod_e) {
    endpoint = `/inscribe/estudiantes-semestre?cod_a=${cod_a}&grupo=${grupo}&semestre=${semestre}`;
  } else {
    return alert("Para realizar esta búsqueda solo escriba el código del estudiante.");
  }

  try {
    const res = await fetch(`${API_URL}${endpoint}`);
    const data = await res.json();

    // Validación si no hay resultados
    if (!Array.isArray(data.data) || data.data.length === 0) {
       tablaBody.innerHTML = "<tr><td colspan='10'>No se encontraron registros</td></tr>";
      return;
    }

    renderTabla(data.data); // Mostrar los resultados en la tabla si hay datos
  } catch (err) {
    console.error("Error en la búsqueda:", err);
  }
});


// ==========================
// Limpiar filtros
// ==========================
limpiarBtn.addEventListener("click", () => {
  form.reset();
  obtenerTodos();
});

// ==========================
// Inicialización
// ==========================
document.addEventListener("DOMContentLoaded", async () => {
  await cargarEstudiantes();
  await cargarAsignaturas();
  await cargarProfesores();
  obtenerTodos();
});
