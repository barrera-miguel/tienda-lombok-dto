// Script opcional para agregar más datos de prueba
// use tienda_db

// Agregar más productos
db.productos.insertMany([
    {
        nombre: "SSD Samsung 1TB",
        categoria: "Almacenamiento",
        precio: 120.00
    },
    {
        nombre: "RAM Corsair 16GB DDR4",
        categoria: "Componentes",
        precio: 85.00
    },
    {
        nombre: "Auriculares Sony WH-1000XM4",
        categoria: "Audio",
        precio: 299.99
    },
    {
        nombre: "Impresora HP LaserJet",
        categoria: "Periféricos",
        precio: 250.00
    },
    {
        nombre: "Router WiFi 6",
        categoria: "Redes",
        precio: 89.99
    },
    {
        nombre: "Tablet iPad Air",
        categoria: "Electrónica",
        precio: 599.00
    },
    {
        nombre: "Cámara Web Logitech 4K",
        categoria: "Periféricos",
        precio: 150.00
    },
    {
        nombre: "Disco Duro Externo 2TB",
        categoria: "Almacenamiento",
        precio: 79.99
    },
    {
        nombre: "Hub USB-C 7 puertos",
        categoria: "Accesorios",
        precio: 45.00
    },
    {
        nombre: "Cable HDMI 2.1 - 3m",
        categoria: "Accesorios",
        precio: 25.00
    }
]);

// Agregar más clientes
db.clientes.insertMany([
    {
        nombre: "Laura Fernández",
        email: "laura.fernandez@email.com",
        telefono: "+54 261 4445555"
    },
    {
        nombre: "Roberto Díaz",
        email: "roberto.diaz@email.com",
        telefono: "+54 261 6667777"
    },
    {
        nombre: "Sofía Martínez",
        email: "sofia.martinez@email.com",
        telefono: "+54 261 8889999"
    },
    {
        nombre: "Diego López",
        email: "diego.lopez@email.com",
        telefono: "+54 261 3334444"
    },
    {
        nombre: "Valentina Ruiz",
        email: "valentina.ruiz@email.com",
        telefono: "+54 261 2223333"
    }
]);

print("Datos adicionales agregados correctamente");
print("Total productos: " + db.productos.countDocuments());
print("Total clientes: " + db.clientes.countDocuments());