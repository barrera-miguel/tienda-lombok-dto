// Script para MongoDB - Ejecutar en mongo shell o MongoDB Compass
// use tienda_db

// Limpiar colecciones existentes
db.productos.deleteMany({});
db.clientes.deleteMany({});
db.pedidos.deleteMany({});

// Insertar productos
const productos = [
    {
        _id: ObjectId("507f1f77bcf86cd799439011"),
        nombre: "Laptop Dell XPS 15",
        categoria: "Electrónica",
        precio: NumberDecimal("1200.00")
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439012"),
        nombre: "Mouse Logitech MX Master",
        categoria: "Periféricos",
        precio: NumberDecimal("99.99")
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439013"),
        nombre: "Teclado Mecánico RGB",
        categoria: "Periféricos",
        precio: NumberDecimal("150.00")
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439014"),
        nombre: "Monitor 27 pulgadas 4K",
        categoria: "Electrónica",
        precio: NumberDecimal("450.00")
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439015"),
        nombre: "Webcam HD",
        categoria: "Periféricos",
        precio: NumberDecimal("79.99")
    }
];

db.productos.insertMany(productos);

// Insertar clientes
const clientes = [
    {
        _id: ObjectId("507f1f77bcf86cd799439021"),
        nombre: "Juan Pérez",
        email: "juan.perez@email.com",
        telefono: "+54 261 1234567"
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439022"),
        nombre: "María González",
        email: "maria.gonzalez@email.com",
        telefono: "+54 261 7654321"
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439023"),
        nombre: "Carlos Rodríguez",
        email: "carlos.rodriguez@email.com",
        telefono: "+54 261 5551234"
    }
];

db.clientes.insertMany(clientes);

// Insertar pedidos
const pedidos = [
    {
        _id: ObjectId("507f1f77bcf86cd799439031"),
        clienteId: ObjectId("507f1f77bcf86cd799439021"),
        productosIds: [
            ObjectId("507f1f77bcf86cd799439011"),
            ObjectId("507f1f77bcf86cd799439012")
        ],
        fecha: "2025-10-10",
        total: 1299.99
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439032"),
        clienteId: ObjectId("507f1f77bcf86cd799439022"),
        productosIds: [
            ObjectId("507f1f77bcf86cd799439013"),
            ObjectId("507f1f77bcf86cd799439014")
        ],
        fecha: "2025-10-12",
        total: 600.00
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439033"),
        clienteId: ObjectId("507f1f77bcf86cd799439021"),
        productosIds: [
            ObjectId("507f1f77bcf86cd799439015")
        ],
        fecha: "2025-10-14",
        total: 79.99
    },
    {
        _id: ObjectId("507f1f77bcf86cd799439034"),
        clienteId: ObjectId("507f1f77bcf86cd799439023"),
        productosIds: [
            ObjectId("507f1f77bcf86cd799439011"),
            ObjectId("507f1f77bcf86cd799439013"),
            ObjectId("507f1f77bcf86cd799439015")
        ],
        fecha: "2025-10-15",
        total: 1429.99
    }
];

db.pedidos.insertMany(pedidos);

print("Datos inicializados correctamente");
print("Productos: " + db.productos.countDocuments());
print("Clientes: " + db.clientes.countDocuments());
print("Pedidos: " + db.pedidos.countDocuments());