let totalIngresos = 0
let alumnos = []

// Cargar datos almacenados en el Storage al cargar la página
window.addEventListener('load', () => {
  const alumnosJSON = localStorage.getItem('alumnos')
  if (alumnosJSON) {
    alumnos = JSON.parse(alumnosJSON)
    totalIngresos = calcularTotalIngresos()
    mostrarAlumnosRegistrados()
  }
});

document.getElementById('formulario-alumno').addEventListener('submit', (event) => {
  event.preventDefault()

  const nombreInput = document.getElementById('nombre')
  const apellidosInput = document.getElementById('apellidos')
  const arancelInput = document.getElementById('arancel')

  const nombre = nombreInput.value.trim()
  const apellidos = apellidosInput.value.trim()
  const arancel = parseFloat(arancelInput.value)

  if (!nombre || !apellidos || isNaN(arancel) || arancel <= 0) {
    alert("Por favor, ingrese valores válidos.")
    return
  }

  const alumno = { nombre, apellidos, arancel }
  alumnos.push(alumno)
  totalIngresos += arancel

  mostrarAlumnosRegistrados()
  limpiarInputs()
  guardarDatosEnStorage()
});

document.getElementById('formulario-filtros').addEventListener('submit', (event) => {
  event.preventDefault()

  const filtroNombreInput = document.getElementById('filtro-nombre')
  const filtroArancelInput = document.getElementById('filtro-arancel')

  const filtroNombre = filtroNombreInput.value.trim().toLowerCase()
  const filtroArancel = parseFloat(filtroArancelInput.value)

  const resultados = alumnos.filter(({ nombre, apellidos, arancel }) => {
    const nombreCompleto = `${nombre} ${apellidos}`.toLowerCase()

    if (filtroNombre && !nombreCompleto.includes(filtroNombre)) {
      return false
    }

    if (!isNaN(filtroArancel) && filtroArancel > 0 && arancel !== filtroArancel) {
      return false
    }

    return true
  });

  mostrarResultadosFiltrados(resultados)
});

function mostrarAlumnosRegistrados() {
  const tablaAlumnos = document.getElementById('tabla-alumnos')
  tablaAlumnos.innerHTML = ''

  alumnos.forEach(({ nombre, apellidos, arancel }) => {
    const fila = document.createElement('tr')

    const celdaNombre = document.createElement('td')
    celdaNombre.textContent = nombre + ' ' + apellidos
    fila.appendChild(celdaNombre)

    const celdaArancel = document.createElement('td')
    celdaArancel.textContent = '$' + arancel
    fila.appendChild(celdaArancel)

    tablaAlumnos.appendChild(fila)
  });
}

function mostrarResultadosFiltrados(resultados) {
  const tablaAlumnos = document.getElementById('tabla-alumnos')
  tablaAlumnos.innerHTML = ''

  resultados.forEach(({ nombre, apellidos, arancel }) => {
    const fila = document.createElement('tr')

    const celdaNombre = document.createElement('td')
    celdaNombre.textContent = nombre + ' ' + apellidos
    fila.appendChild(celdaNombre)

    const celdaArancel = document.createElement('td')
    celdaArancel.textContent = '$' + arancel
    fila.appendChild(celdaArancel)

    tablaAlumnos.appendChild(fila)
  });
}

function limpiarInputs() {
  document.getElementById('nombre').value = ''
  document.getElementById('apellidos').value = ''
  document.getElementById('arancel').value = ''
}

function limpiarFiltros() {
  document.getElementById('filtro-nombre').value = ''
  document.getElementById('filtro-arancel').value = ''

  mostrarAlumnosRegistrados()
}

function calcularTotalIngresos() {
  return alumnos.reduce((total, { arancel }) => total + arancel, 0)
}

function guardarDatosEnStorage() {
  const alumnosJSON = JSON.stringify(alumnos)
  localStorage.setItem('alumnos', alumnosJSON)
}
