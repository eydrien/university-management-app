const tabla = document.getElementById("tabla-inscribe");
const form = document.getElementById("filtros");
const limpiarBtn = document.getElementById("limpiar");

// Ruta base
const API_BASE = "http://localhost:3000/inscribe";
const API_URL_SELECTS= 'http://localhost:3000';

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
    const res = await fetch(`${API_BASE}`);
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
    endpoint = `/estudiante/${cod_e}`;
  }
  // Ruta para buscar por código de estudiante, asignatura y grupo
  else if (cod_e && cod_a && grupo && !semestre) {
    endpoint = `/estudiante?cod_e=${cod_e}&cod_a=${cod_a}&grupo=${grupo}`;
  }
  // Ruta para buscar por asignatura y semestre
  else if (cod_e && !cod_a && semestre && !grupo) {
    endpoint = `/asignaturas?cod_e=${cod_e}&semestre=${semestre}`;
  }
  // Ruta para buscar por asignatura y grupo
  else if (cod_a && grupo && !cod_e && !semestre) {
    endpoint = `/estudiantes?cod_a=${cod_a}&grupo=${grupo}`;
  }
  // Ruta para buscar por asignatura, grupo y semestre
  else if (cod_a && grupo && semestre && !cod_e) {
    endpoint = `/estudiantes-semestre?cod_a=${cod_a}&grupo=${grupo}&semestre=${semestre}`;
  } else {
    return alert("Para realizar esta busqueda solo escriba el codigo del estudiante.");
  }

  try {
    // Llamar a la API con la ruta construida
    const res = await fetch(`${API_BASE}${endpoint}`);
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

//Ventana modal
const btnCrearInscripcion = document.getElementById("btnCrearInscripcion");
const modalInscripcion = document.getElementById("modalInscripcion");
const closeModal = document.getElementById("closeModal");
const formInscripcion = document.getElementById("formInscripcion");
const cod_aSelect = document.getElementById("cod_a");
const semestreSelect = document.getElementById("semestre");
const id_pSelect = document.getElementById("id_p");

// Abre el modal cuando el usuario haga clic en "Crear Inscripción"
btnCrearInscripcion.addEventListener("click", () => {
  modalInscripcion.style.display = "flex";
  cargarAsignaturas(); // Llamar para cargar las asignaturas
 /*  cargarSemestres(); */ // Llamar para cargar los semestres
});

// Cierra el modal cuando el usuario haga clic en la "X"
closeModal.addEventListener("click", () => {
  modalInscripcion.style.display = "none";
});

// Función para cargar asignaturas
async function cargarAsignaturas() {
  try {
    const res = await fetch(`${API_URL_SELECTS}/asignaturas`);
    const data = await res.json();
    console.log(data)
    const asignaturas = data.data;

    cod_aSelect.innerHTML = "<option value=''>Seleccione una asignatura</option>";
    asignaturas.forEach(asignatura => {
      const option = document.createElement('option');
      option.value = asignatura.cod_a;
      option.textContent = asignatura.nom_a;
      cod_aSelect.appendChild(option);
    });
  } catch (err) {
    console.error("Error al cargar asignaturas:", err);
  }
}

// Enviar formulario de inscripción
formInscripcion.addEventListener("submit", async (e) => {
  e.preventDefault();

  const cod_e = document.getElementById("cod_e").value;
  const cod_a = cod_aSelect.value;
  const id_p = id_pSelect.value;
  const grupo = document.getElementById("grupo").value;
  const semestre = semestreSelect.value;
  const n1 = 0;
  const n2 = 0;
  const n3 = 0;

  const inscripcion = { cod_e, cod_a, id_p, grupo, semestre, n1, n2, n3 };

  try {
    const res = await fetch(`${API_URL_SELECTS}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(inscripcion)
    });

    const data = await res.json();

    if (data.statusCode === 200) {
      alert("Inscripción creada exitosamente");
      modalInscripcion.style.display = "none";
      formInscripcion.reset();
    } else {
      alert("Hubo un error al crear la inscripción");
    }
  } catch (err) {
    console.error("Error al crear la inscripción:", err);
  }
});


// Cargar todos al inicio
obtenerTodos();
