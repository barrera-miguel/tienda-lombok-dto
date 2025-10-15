package com.tienda.dao;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.tienda.config.MongoDBConnection;
import com.tienda.model.Cliente;
import com.tienda.model.Pedido;
import com.tienda.model.Producto;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

public class PedidoDAO {
    private final MongoCollection<Document> pedidosCollection;
    private final MongoCollection<Document> clientesCollection;
    private final MongoCollection<Document> productosCollection;

    public PedidoDAO() {
        MongoDatabase database = MongoDBConnection.getDatabase();
        this.pedidosCollection = database.getCollection("pedidos");
        this.clientesCollection = database.getCollection("clientes");
        this.productosCollection = database.getCollection("productos");
    }

    public List<Pedido> findAll() {
        List<Pedido> pedidos = new ArrayList<>();
        for (Document doc : pedidosCollection.find()) {
            pedidos.add(documentToPedido(doc));
        }
        return pedidos;
    }

    public Pedido findById(String id) {
        Document doc = pedidosCollection.find(eq("_id", new ObjectId(id))).first();
        return doc != null ? documentToPedido(doc) : null;
    }

    public Cliente findClienteById(ObjectId id) {
        Document doc = clientesCollection.find(eq("_id", id)).first();
        return doc != null ? documentToCliente(doc) : null;
    }

    public List<Producto> findProductosByIds(List<ObjectId> ids) {
        List<Producto> productos = new ArrayList<>();
        for (ObjectId id : ids) {
            Document doc = productosCollection.find(eq("_id", id)).first();
            if (doc != null) {
                productos.add(documentToProducto(doc));
            }
        }
        return productos;
    }

    private Pedido documentToPedido(Document doc) {
        List<ObjectId> productosIds = doc.getList("productosIds", ObjectId.class);

        LocalDate fecha = null;
        Object fechaObj = doc.get("fecha");
        if (fechaObj instanceof String) {
            fecha = LocalDate.parse((String) fechaObj);
        } else if (fechaObj instanceof java.util.Date) {
            fecha = ((java.util.Date) fechaObj).toInstant()
                    .atZone(java.time.ZoneId.systemDefault())
                    .toLocalDate();
        }

        return Pedido.builder()
                .id(doc.getObjectId("_id"))
                .clienteId(doc.getObjectId("clienteId"))
                .productosIds(productosIds != null ? productosIds : new ArrayList<>())
                .fecha(fecha)
                .total(getDoubleValue(doc, "total"))
                .build();
    }


    private Cliente documentToCliente(Document doc) {
        return Cliente.builder()
                .id(doc.getObjectId("_id"))
                .nombre(doc.getString("nombre"))
                .email(doc.getString("email"))
                .telefono(doc.getString("telefono"))
                .build();
    }

    private Producto documentToProducto(Document doc) {
        return Producto.builder()
                .id(doc.getObjectId("_id"))
                .nombre(doc.getString("nombre"))
                .categoria(doc.getString("categoria"))
                .precio(getDoubleValue(doc, "precio"))
                .build();
    }

    /**
     * Método auxiliar para convertir cualquier tipo Number a Double
     * Maneja tanto Integer como Double de MongoDB
     */
    private Double getDoubleValue(Document doc, String field) {
        Object value = doc.get(field);
        if (value == null) {
            return 0.0;
        }
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        return 0.0;
    }
}