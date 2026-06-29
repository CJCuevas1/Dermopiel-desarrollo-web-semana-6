// --- 1. SELECCIÓN DE ELEMENTOS DEL DOM ---
const formulario = document.getElementById('formularioRegistro');
const campoNombre = document.getElementById('campoNombre');
const campoCategoria = document.getElementById('campoCategoria');
const campoDescripcion = document.getElementById('campoDescripcion');

const listaRegistros = document.getElementById('listaRegistros');
const contadorRegistros = document.getElementById('contadorRegistros');
const alertaGlobal = document.getElementById('alertaGlobal');

// Estado de la aplicación (Arreglo de objetos en memoria)
let registros = [];

// --- 2. FUNCIONES DE VALIDACIÓN INDIVIDUALES ---

// Valida el campo Nombre (Obligatorio, min 3 letras)
function validarNombre() {
    const valor = campoNombre.value.trim();
    if (valor === '' || valor.length < 3) {
        marcarInvalido(campoNombre);
        return false;
    } else {
        marcarValido(campoNombre);
        return true;
    }
}

// Valida la Categoría (Debe seleccionar algo diferente al default)
function validarCategoria() {
    if (campoCategoria.value === '') {
        marcarInvalido(campoCategoria);
        return false;
    } else {
        marcarValido(campoCategoria);
        return true;
    }
}

// Valida la Descripción (Obligatoria, min 10 caracteres)
function validarDescripcion() {
    const valor = campoDescripcion.value.trim();
    if (valor === '' || valor.length < 10) {
        marcarInvalido(campoDescripcion);
        return false;
    } else {
        marcarValido(campoDescripcion);
        return true;
    }
}

// Funciones auxiliares para aplicar clases visuales de Bootstrap
function marcarInvalido(elemento) {
    elemento.classList.remove('is-valid');
    elemento.classList.add('is-invalid');
}

function marcarValido(elemento) {
    elemento.classList.remove('is-invalid');
    elemento.classList.add('is-valid');
}

// Limpia los estilos de validación del formulario
function resetearEstilosValidacion() {
    [campoNombre, campoCategoria, campoDescripcion].forEach(elemento => {
        elemento.classList.remove('is-valid', 'is-invalid');
    });
}

// --- 3. MANEJO DE EVENTOS EN TIEMPO REAL (input / blur) ---
// Se ejecutan dinámicamente mientras el usuario escribe o sale del campo
campoNombre.addEventListener('input', validarNombre);
campoNombre.addEventListener('blur', validarNombre);

campoCategoria.addEventListener('change', validarCategoria);
campoCategoria.addEventListener('blur', validarCategoria);

campoDescripcion.addEventListener('input', validarDescripcion);
campoDescripcion.addEventListener('blur', validarDescripcion);


// --- 4. CONTROL DEL EVENTO SUBMIT ---
formulario.addEventListener('submit', function(evento) {
    // Evita que la página se recargue por defecto
    evento.preventDefault();

    // Forzar la validación de todos los campos antes de registrar
    const nombreOk = validarNombre();
    const categoriaOk = validarCategoria();
    const descripcionOk = validarDescripcion();

    // Si todas las validaciones pasan exitosamente
    if (nombreOk && categoriaOk && descripcionOk) {
        
        // Crear el nuevo objeto de registro
        const nuevoRegistro = {
            id: Date.now(), // ID único basado en tiempo
            nombre: campoNombre.value.trim(),
            categoria: campoCategoria.value,
            descripcion: campoDescripcion.value.trim()
        };

        // Agregar al arreglo de datos
        registros.push(nuevoRegistro);

        // Actualizar la interfaz
        actualizarInterfaz();

        // Mostrar alerta de éxito
        alertaGlobal.classList.remove('d-none');
        setTimeout(() => {
            alertaGlobal.classList.add('d-none');
        }, 3000);

        // Resetear el formulario y sus estilos
        formulario.reset();
        resetearEstilosValidacion();
    }
});

// --- 5. OPERACIONES DEL CRUD (Mostrar, Contar, Eliminar) ---

function actualizarInterfaz() {
    // 1. Limpiar el contenedor actual de la tabla
    listaRegistros.innerHTML = '';

    // 2. Renderizar los registros actualizados
    registros.forEach(reg => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td><strong>${reg.nombre}</strong></td>
            <td><span class="badge bg-secondary">${reg.categoria}</span></td>
            <td>${reg.descripcion}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="eliminarRegistro(${reg.id})">
                    Eliminar
                </button>
            </td>
        `;
        listaRegistros.appendChild(fila);
    });

    // 3. Actualizar el contador dinámico
    contadorRegistros.textContent = registros.length;
}

// Función global para eliminar registros de la lista
window.eliminarRegistro = function(id) {
    // Filtramos el arreglo para excluir el id seleccionado
    registros = registros.filter(reg => reg.id !== id);
    // Volvemos a pintar la interfaz y actualizar el contador
    actualizarInterfaz();
};