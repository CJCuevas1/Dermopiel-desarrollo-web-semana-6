// 1. Estructura de datos inicial utilizando un Arreglo de Objetos
let productos = [
    { nombre: "Serum Facial de Vitamina C", precio: 24.99, stock: 15 },
    { nombre: "Crema Hidratante Profunda", precio: 18.50, stock: 0 },  // Producto agotado para probar la condición
    { nombre: "Protector Solar SPF 50+", precio: 29.00, stock: 7 }
];

// 2. Captura de elementos del DOM
const formulario = document.getElementById('formularioProducto');
const contenedorProductos = document.getElementById('contenedorProductos');
const mensajeEstado = document.getElementById('mensajeEstado');

// 3. Función para Renderizar dinámicamente los datos
function renderizarProductos() {
    // Limpiamos el contenedor para evitar duplicaciones innecesarias de HTML
    contenedorProductos.innerHTML = "";
    
    // IMPLEMENTACIÓN DE CONDICIÓN: Evaluar el estado general de los datos
    if (productos.length === 0) {
        mensajeEstado.innerHTML = `<div class="alert alert-warning text-center">No hay registros disponibles en el inventario.</div>`;
        return;
    } else {
        mensajeEstado.innerHTML = `<div class="alert alert-success text-center">Mostrando ${productos.length} producto(s) en tiempo real.</div>`;
    }

    // IMPLEMENTACIÓN DE ESTRUCTURA REPETITIVA: Ciclo forEach para iterar los registros
    productos.forEach((producto, indice) => {
        
        // CONDICIÓN INTERNA: Cambiar estilos y etiquetas según el stock disponible
        let estadoStock = "";
        let colorBorde = "";
        
        if (producto.stock > 0) {
            estadoStock = `<span class="badge bg-success">Disponibles: ${producto.stock} uds</span>`;
            colorBorde = "border-start border-success border-4";
        } else {
            estadoStock = `<span class="badge bg-danger">Agotado</span>`;
            colorBorde = "border-start border-danger border-4";
        }

        // Generación dinámica del bloque HTML sin repetirlo manualmente
        const tarjetaHTML = `
            <div class="col-sm-6">
                <div class="card h-100 shadow-sm ${colorBorde}">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 class="card-title text-dark fw-bold">${producto.nombre}</h5>
                            <p class="card-text text-primary fs-5 fw-semibold">$${producto.precio.toFixed(2)}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            ${estadoStock}
                            <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${indice})">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        contenedorProductos.innerHTML += tarjetaHTML;
    });
}

// 4. Gestión del formulario y Conservación de Validaciones Dinámicas (Semana 6)
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Detiene el refresco de página automático

    // Activa los estilos visuales de validación de Bootstrap
    formulario.classList.add('was-validated');

    // Comprobamos si todos los campos cumplen las condiciones requeridas (HTML5 nativo)
    if (formulario.checkValidity()) {
        const nombreInput = document.getElementById('nombre').value;
        const precioInput = parseFloat(document.getElementById('precio').value);
        const stockInput = parseInt(document.getElementById('stock').value);

        // Agregamos el nuevo objeto al arreglo de datos
        productos.push({
            nombre: nombreInput,
            precio: precioInput,
            stock: stockInput
        });

        // Re-renderizamos para actualizar el catálogo dinámicamente
        renderizarProductos();

        // Limpieza y reinicio del estado de validación del formulario
        formulario.reset();
        formulario.classList.remove('was-validated');
    }
});

// Función adicional para remover un producto del arreglo y actualizar la vista
function eliminarProducto(indice) {
    productos.splice(indice, 1);
    renderizarProductos();
}

// Renderizado inicial una vez que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', renderizarProductos);