/* -------------------------------------------------------
 *  ASIGNATURAS – Lógica de Front-End
 * -----------------------------------------------------*/
const API_URL = 'http://localhost:3000/asignaturas';  

let modoEdicion      = false;
let asignaturaEditando = null;

/* ------------------
 *  SUBMIT del FORM
 * ----------------*/
document.getElementById('formAsignaturas').addEventListener('submit', async e => {
  e.preventDefault();

  const asignatura = {
    cod_a   : parseInt(document.getElementById('cod_a').value),
    nom_a   : document.getElementById('nom_a').value,
    int_h   : parseInt(document.getElementById('int_h').value),
    creditos: parseInt(document.getElementById('creditos').value)
  };

  const url    = modoEdicion ? `${API_URL}/${asignaturaEditando}` : API_URL;
  const metodo = modoEdicion ? 'PUT' : 'POST';

  try {
    const res  = await fetch(url, {
      method : metodo,
      headers: { 'Content-Type': 'application/json' },
      body   : JSON.stringify(asignatura)
    });
    const data = await res.json();

    const tipo = modoEdicion ? 'PUT (actualización)' : 'POST (creación)';
    console.log(`%c[API ${tipo}] Respuesta del servidor:`, 'color: green; font-weight: bold;', data);

    if (!res.ok) throw new Error(data.message || 'Error desconocido en la API');

    alert(modoEdicion ? 'Asignatura actualizada con éxito' : 'Asignatura creada con éxito');
    document.getElementById('formAsignaturas').reset();
    modoEdicion        = false;
    asignaturaEditando = null;
    document.querySelector('button[type="submit"]').textContent = 'Guardar';
    cargarAsignaturas();

  } catch (err) {
    console.error('%c[ERROR] Falló la solicitud al servidor:', 'color: red; font-weight: bold;', err);
    alert(`Error: ${err.message}`);
  }
});

/* -------------
 *  BOTÓN CANCELAR
 * ------------ */
document.getElementById('cancelBtn').addEventListener('click', () => {
  document.getElementById('formAsignaturas').reset();
  modoEdicion        = false;
  asignaturaEditando = null;
  document.querySelector('button[type="submit"]').textContent = 'Guardar';
});

/* ---------------------------
 *  CARGAR TODAS LAS ASIGNATURAS
 * -------------------------*/
async function cargarAsignaturas() {
  try {
    const res        = await fetch(API_URL);
    const response   = await res.json();

    console.log('%c[API GET] Lista de asignaturas:', 'color: blue; font-weight: bold;', response);

    if (!res.ok) throw new Error(response.message || 'Error al obtener asignaturas');

    const asignaturas = response.data;
    const tbody       = document.getElementById('tablaBody');
    tbody.innerHTML   = '';

    asignaturas.forEach(a => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${a.cod_a}</td>
        <td>${a.nom_a}</td>
        <td>${a.int_h}</td>
        <td>${a.creditos}</td>
        <td>
          <button onclick="editarAsignatura(${a.cod_a})">✏️Editar</button>
          <button onclick="eliminarAsignatura(${a.cod_a})">🗑️Eliminar</button>
        </td>`;
      tbody.appendChild(tr);
    });

  } catch (err) {
    console.error('%c[ERROR] al cargar las asignaturas:', 'color: red; font-weight: bold;', err);
    alert(`Error: ${err.message}`);
  }
}

/* -------------------
 *  EDITAR ASIGNATURA
 * -----------------*/
async function editarAsignatura(cod_a) {
  try {
    const res      = await fetch(`${API_URL}/${cod_a}`);
    const response = await res.json();

    console.log('%c[API GET by ID] Asignatura a editar:', 'color: orange; font-weight: bold;', response);

    if (!res.ok) throw new Error(response.message || 'Error al obtener la asignatura');

    const a = response.data;
    document.getElementById('cod_a').value   = a.cod_a;
    document.getElementById('nom_a').value   = a.nom_a;
    document.getElementById('int_h').value   = a.int_h;
    document.getElementById('creditos').value = a.creditos;

    document.querySelector('button[type="submit"]').textContent = 'Actualizar Asignatura';
    modoEdicion        = true;
    asignaturaEditando = a.cod_a;

  } catch (err) {
    console.error('%c[ERROR] al obtener asignatura:', 'color: red; font-weight: bold;', err);
    alert(`Error: ${err.message}`);
  }
}

/* --------------------
 *  ELIMINAR ASIGNATURA
 * ------------------*/
async function eliminarAsignatura(cod_a) {
  if (!confirm(`¿Estás seguro de eliminar la asignatura ${cod_a}?`)) return;

  try {
    const res      = await fetch(`${API_URL}/${cod_a}`, { method: 'DELETE' });
    const response = await res.json();

    console.log('%c[API DELETE] Asignatura eliminada:', 'color: red; font-weight: bold;', response);

    if (!res.ok) throw new Error(response.message || 'Error al eliminar');

    alert('Asignatura eliminada');
    cargarAsignaturas();

  } catch (err) {
    console.error('%c[ERROR] al eliminar asignatura:', 'color: red; font-weight: bold;', err);
    alert(`Error: ${err.message}`);
  }
}

/* --------------------------
 *  CARGAR AL INICIAR LA PÁGINA
 * ------------------------*/
window.addEventListener('DOMContentLoaded', cargarAsignaturas);
