let cuartos = JSON.parse(localStorage.getItem("cuartos")) || [];

let indiceEdicion = null;

// Guardar datos en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("cuartos", JSON.stringify(cuartos));
}

// Mostrar cuartos en el contenedor
function mostrarCuartos() {
  const container = document.getElementById("cuartos-container");
  container.innerHTML = "";

  cuartos.forEach((cuarto, index) => {
    const libre = cuarto.camas - cuarto.ocupadas;
    container.innerHTML += `
      <div class="cuarto">
        <strong>${cuarto.nombre}</strong><br />
        Camas: ${cuarto.camas} | Ocupadas: ${cuarto.ocupadas} | Libres: ${libre}
        <button onclick="editarCuarto(${index})">Editar</button>
        <button onclick="confirmarEliminar(${index})">Eliminar</button>
      </div>
    `;
  });

  mostrarResumen();
}

// Mostrar el resumen de ocupación
function mostrarResumen() {
  const totalCamas = cuartos.reduce((sum, c) => sum + c.camas, 0);
  const totalOcupadas = cuartos.reduce((sum, c) => sum + c.ocupadas, 0);
  const totalLibres = totalCamas - totalOcupadas;

  document.getElementById("resumen-container").innerHTML = `
    <p><strong>Internos:</strong> ${totalOcupadas}</p>
    <p><strong>Camas Libres:</strong> ${totalLibres}</p>
  `;
}

// Agregar o actualizar cuarto
function agregarCuarto() {
  const nombre = document.getElementById("nuevoNombre").value.trim();
  const camas = parseInt(document.getElementById("nuevasCamas").value);

  if (!nombre || isNaN(camas) || camas <= 0) {
    mostrarMensaje("Por favor ingresa datos válidos.", "error");
    return;
  }

  if (indiceEdicion !== null) {
    cuartos[indiceEdicion].nombre = nombre;
    cuartos[indiceEdicion].camas = camas;
    mostrarMensaje("Cuarto actualizado correctamente.", "exito");
    indiceEdicion = null;
  } else {
    cuartos.push({ nombre, camas, ocupadas: 0 });
    mostrarMensaje("Cuarto agregado correctamente.", "exito");
  }

  guardarEnLocalStorage();
  limpiarFormulario();
  mostrarCuartos();
  ocultarFormularioAgregar();
}

// Confirmar antes de eliminar
function confirmarEliminar(index) {
  const confirmado = confirm(`¿Estás seguro de eliminar "${cuartos[index].nombre}"?`);
  if (confirmado) {
    eliminarCuarto(index);
  }
}

// Eliminar cuarto
function eliminarCuarto(index) {
  cuartos.splice(index, 1);
  guardarEnLocalStorage();
  mostrarCuartos();
  mostrarMensaje("Cuarto eliminado.", "exito");
}

// Editar cuarto
function editarCuarto(index) {
  const cuarto = cuartos[index];
  document.getElementById("nuevoNombre").value = cuarto.nombre;
  document.getElementById("nuevasCamas").value = cuarto.camas;
  mostrarFormularioAgregar();
  indiceEdicion = index;
}

// Mostrar formulario de agregar cuarto
function mostrarFormularioAgregar() {
  document.getElementById("formulario-agregar").style.display = "block";
}

// Ocultar formulario de agregar cuarto
function ocultarFormularioAgregar() {
  document.getElementById("formulario-agregar").style.display = "none";
  limpiarFormulario();
}

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById("nuevoNombre").value = "";
  document.getElementById("nuevasCamas").value = "";
  indiceEdicion = null;
}

// Mostrar mensaje visual
function mostrarMensaje(mensaje, tipo) {
  const div = document.createElement("div");
  div.className = `mensaje ${tipo}`;
  div.textContent = mensaje;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}

// Inicializar
mostrarCuartos();