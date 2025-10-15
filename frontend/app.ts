// Interfaces para los DTOs según el PDF
interface ProductoDTO {
    nombre: string;
    precio: number;
}

interface PedidoDTO {
    id: string;
    clienteNombre: string;
    productos: ProductoDTO[];
    fechaPedido: string;
    total: number;
}

// Configuración de la API - AJUSTAR SEGÚN TU SERVIDOR
const API_BASE_URL = 'http://localhost:8080/tienda-lombok-dto';
const API_PEDIDOS = `${API_BASE_URL}/api/pedidos`;

// Referencias a elementos del DOM
const btnCargarPedidos = document.getElementById('btnCargarPedidos') as HTMLButtonElement;
const loadingDiv = document.getElementById('loading') as HTMLDivElement;
const errorDiv = document.getElementById('error') as HTMLDivElement;
const contenedorTabla = document.getElementById('contenedorTabla') as HTMLDivElement;
const tbodyPedidos = document.getElementById('tbodyPedidos') as HTMLTableSectionElement;
const modalDetalle = document.getElementById('modalDetalle') as HTMLDivElement;
const btnCerrarModal = document.getElementById('btnCerrarModal') as HTMLButtonElement;
const detalleProductos = document.getElementById('detalleProductos') as HTMLDivElement;

// Event Listeners
btnCargarPedidos.addEventListener('click', cargarPedidos);
btnCerrarModal.addEventListener('click', cerrarModal);

// Cerrar modal al hacer click fuera de él
modalDetalle.addEventListener('click', (e: MouseEvent) => {
    if (e.target === modalDetalle) {
        cerrarModal();
    }
});

/**
 * Función principal: Cargar todos los pedidos desde el backend
 * Se ejecuta al presionar el botón "Cargar Pedidos"
 */
async function cargarPedidos(): Promise<void> {
    try {
        mostrarLoading(true);
        ocultarError();
        
        const response = await fetch(API_PEDIDOS);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const pedidos: PedidoDTO[] = await response.json();
        
        mostrarLoading(false);
        mostrarTablaPedidos(pedidos);
        
    } catch (error) {
        mostrarLoading(false);
        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        mostrarError(`Error al cargar pedidos: ${mensaje}`);
    }
}

/**
 * Mostrar pedidos en tabla con 3 columnas: fecha, nombre cliente, total
 * Agregar columna con icono "Ver Detalle"
 */
function mostrarTablaPedidos(pedidos: PedidoDTO[]): void {
    tbodyPedidos.innerHTML = '';
    
    if (pedidos.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="4" style="text-align: center; padding: 30px;">No hay pedidos disponibles</td>';
        tbodyPedidos.appendChild(tr);
    } else {
        pedidos.forEach(pedido => {
            const tr = document.createElement('tr');
            
            // Columna: Fecha del Pedido
            const tdFecha = document.createElement('td');
            tdFecha.textContent = pedido.fechaPedido;
            tr.appendChild(tdFecha);
            
            // Columna: Nombre del Cliente
            const tdCliente = document.createElement('td');
            tdCliente.textContent = pedido.clienteNombre;
            tr.appendChild(tdCliente);
            
            // Columna: Total del Pedido
            const tdTotal = document.createElement('td');
            tdTotal.textContent = `$${pedido.total.toFixed(2)}`;
            tr.appendChild(tdTotal);
            
            // Columna: Ver Detalle (icono/botón)
            const tdDetalle = document.createElement('td');
            const btnDetalle = document.createElement('button');
            btnDetalle.className = 'btn-detalle';
            btnDetalle.textContent = '👁️ Ver Detalle';
            
            // Al hacer click, enviar el ID del pedido como parámetro
            btnDetalle.addEventListener('click', () => verDetallePedido(pedido.id));
            
            tdDetalle.appendChild(btnDetalle);
            tr.appendChild(tdDetalle);
            
            tbodyPedidos.appendChild(tr);
        });
    }
    
    contenedorTabla.classList.remove('hidden');
}

/**
 * Función que recibe el ID del pedido y obtiene el detalle
 * Retorna el detalle de los productos involucrados
 */
async function verDetallePedido(idPedido: string): Promise<void> {
    try {
        const response = await fetch(`${API_PEDIDOS}/${idPedido}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        const pedido: PedidoDTO = await response.json();
        
        // Mostrar detalle de productos por pantalla
        mostrarDetalleProductos(pedido);
        
    } catch (error) {
        const mensaje = error instanceof Error ? error.message : 'Error desconocido';
        mostrarError(`Error al cargar detalle: ${mensaje}`);
    }
}

/**
 * Mostrar detalle de los productos del pedido en un modal
 */
function mostrarDetalleProductos(pedido: PedidoDTO): void {
    let html = '<h3>Productos del Pedido</h3>';
    html += '<div style="margin-bottom: 20px;">';
    html += `<p><strong>Cliente:</strong> ${pedido.clienteNombre}</p>`;
    html += `<p><strong>Fecha:</strong> ${pedido.fechaPedido}</p>`;
    html += `<p><strong>ID Pedido:</strong> ${pedido.id}</p>`;
    html += '</div>';
    
    if (pedido.productos.length === 0) {
        html += '<p>No hay productos en este pedido.</p>';
    } else {
        pedido.productos.forEach(producto => {
            html += `
                <div class="producto-item">
                    <span class="producto-nombre">${producto.nombre}</span>
                    <span class="producto-precio">$${producto.precio.toFixed(2)}</span>
                </div>
            `;
        });
        
        html += `
            <div style="margin-top: 20px; padding: 15px; background: #667eea; color: white; border-radius: 8px; text-align: right;">
                <strong style="font-size: 20px;">Total: $${pedido.total.toFixed(2)}</strong>
            </div>
        `;
    }
    
    detalleProductos.innerHTML = html;
    modalDetalle.classList.remove('hidden');
}

/**
 * Cerrar el modal de detalle
 */
function cerrarModal(): void {
    modalDetalle.classList.add('hidden');
}

/**
 * Funciones auxiliares para UI
 */
function mostrarLoading(mostrar: boolean): void {
    if (mostrar) {
        loadingDiv.classList.remove('hidden');
        contenedorTabla.classList.add('hidden');
    } else {
        loadingDiv.classList.add('hidden');
    }
}

function mostrarError(mensaje: string): void {
    errorDiv.textContent = mensaje;
    errorDiv.classList.remove('hidden');
    setTimeout(() => {
        ocultarError();
    }, 5000);
}

function ocultarError(): void {
    errorDiv.classList.add('hidden');
}

// Log inicial
console.log('Aplicación de Gestión de Pedidos cargada correctamente');
console.log(`API configurada en: ${API_PEDIDOS}`);