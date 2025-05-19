/* -------------------------------------------------------
 *  IMPARTE – Lógica de Front-End
 * -----------------------------------------------------*/

const API_URL = 'http://localhost:3000';

// Referencias del DOM
const form = document.getElementById('form-imparte');
const tbody = document.getElementById('imparte-body');
const selectProfesor = document.getElementById('id_p');
const selectAsignatura = document.getElementById('cod_a');
const btnCancelar = document.getElementById('cancelar-edicion');

// Estado de edición
let editando = false;
let clavesPrimarias = null;

/* -------------------------
 *  CARGAR SELECTS (profesores/asignaturas)
 * -------------------------*/
async function cargarSelects() {
  try {
    const profesores = await fetch(`${API_URL}/profesores`).then(res => res.json());
    const asignaturas = await fetch(`${API_URL}/asignaturas`).then(res => res.json());

    // Limpiar selects y agregar opción por defecto
    selectProfesor.innerHTML = '<option value="">-- Seleccione un profesor --</option>';
    selectAsignatura.innerHTML = '<option value="">-- Seleccione una asignatura --</option>';

    profesores.data.forEach(prof => {
      const option = document.createElement('option');
      option.value = prof.id_p;
      option.textContent = `${prof.id_p} - ${prof.nom_p}`;
      selectProfesor.appendChild(option);
    });

    asignaturas.data.forEach(asig => {
      const option = document.createElement('option');
      option.value = asig.cod_a;
      option.textContent = `${asig.cod_a} - ${asig.nom_a}`;
      selectAsignatura.appendChild(option);
    });

    console.log('%c[OK] Selects cargados correctamente.', 'color: green; font-weight: bold;');

  } catch (error) {
    console.error('%c[ERROR] al cargar los selects:', 'color: red; font-weight: bold;', error);
  }
}


/* -----------------------------
 *  CARGAR TODOS LOS REGISTROS
 * ---------------------------*/
async function cargarImpartes() {
  tbody.innerHTML = '';
  try {
    const res = await fetch(`${API_URL}/imparte`);
    const data = await res.json();

    data.data.forEach(imparte => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${imparte.id_p}</td>
        <td>${imparte.nombre_profesor}</td>
        <td>${imparte.cod_a}</td>
        <td>${imparte.nombre_asignatura}</td>
        <td>${imparte.grupo}</td>
        <td>${imparte.semestre}</td>
        <td>${imparte.horario}</td>
        <td>
          <button onclick='editar(${JSON.stringify(imparte)})'>✏️Editar</button>
          <button onclick='eliminar(${imparte.id_p}, ${imparte.cod_a}, ${imparte.grupo}, ${imparte.semestre})'>🗑️Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    console.log('%c[API GET] Registros de imparte cargados.', 'color: blue; font-weight: bold;', data);

  } catch (error) {
    console.error('%c[ERROR] al cargar registros de imparte:', 'color: red; font-weight: bold;', error);
  }
}

/* ------------------
 *  SUBMIT del FORM
 * ----------------*/
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevo = {
    id_p: Number(selectProfesor.value),
    cod_a: Number(selectAsignatura.value),
    grupo: Number(document.getElementById('grupo').value),
    semestre: Number(document.getElementById('semestre').value),
    horario: document.getElementById('horario').value
  };

  try {
    if (!editando) {
      // Crear nuevo registro
      const res = await fetch(`${API_URL}/imparte`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      const data = await res.json();
      console.log('%c[API POST] Registro creado:', 'color: green; font-weight: bold;', data);
      alert('Registro creado con éxito');
    } else {
      // Actualizar registro existente
      const query = new URLSearchParams(clavesPrimarias).toString();
      const res = await fetch(`${API_URL}/imparte?${query}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      const data = await res.json();
      console.log('%c[API PUT] Registro actualizado:', 'color: orange; font-weight: bold;', data);
      alert('Registro actualizado con éxito');
    }

    cancelarEdicion();
    await cargarImpartes();

  } catch (error) {
    console.error('%c[ERROR] al guardar registro:', 'color: red; font-weight: bold;', error);
  }
});

/* -------------------
 *  ELIMINAR REGISTRO
 * ------------------*/
async function eliminar(id_p, cod_a, grupo, semestre) {
  if (!confirm('¿Seguro que quieres eliminar este registro?')) return;

  try {
    const query = `id_p=${id_p}&cod_a=${cod_a}&grupo=${grupo}&semestre=${semestre}`;
    const res = await fetch(`${API_URL}/imparte?${query}`, { method: 'DELETE' });
    const data = await res.json();

    console.log('%c[API DELETE] Registro eliminado:', 'color: red; font-weight: bold;', data);
    alert('Registro eliminado con éxito');
    await cargarImpartes();

  } catch (error) {
    console.error('%c[ERROR] al eliminar registro:', 'color: red; font-weight: bold;', error);
  }
}

/* --------------------
 *  EDITAR REGISTRO
 * ------------------*/
function editar(imparte) {
  document.getElementById('grupo').value = imparte.grupo;
  document.getElementById('semestre').value = imparte.semestre;
  document.getElementById('horario').value = imparte.horario;
  selectProfesor.value = imparte.id_p;
  selectAsignatura.value = imparte.cod_a;

  editando = true;
  clavesPrimarias = {
    id_p: imparte.id_p,
    cod_a: imparte.cod_a,
    grupo: imparte.grupo,
    semestre: imparte.semestre
  };

  form.querySelector('button[type="submit"]').textContent = 'Actualizar Registro';
  document.querySelector('form h2').textContent = 'Editar Imparte';
  btnCancelar.style.display = 'inline';

  console.log('%c[EDITANDO] Registro cargado al formulario:', 'color: purple; font-weight: bold;', imparte);
}

/* --------------------
 *  CANCELAR EDICIÓN
 * ------------------*/
function cancelarEdicion() {
  form.reset();
  editando = false;
  clavesPrimarias = null;
  form.querySelector('button[type="submit"]').textContent = 'Crear';
  document.querySelector('form h2').textContent = 'Agregar Imparte';
  btnCancelar.style.display = 'none';

  console.log('%c[CANCELADO] Se canceló la edición.', 'color: gray; font-style: italic;');
}

// Botón cancelar
btnCancelar.addEventListener('click', cancelarEdicion);

/* -------------------------
 *  INICIALIZACIÓN AL CARGAR
 * -------------------------*/
window.onload = async () => {
  await cargarSelects();
  await cargarImpartes();
};
