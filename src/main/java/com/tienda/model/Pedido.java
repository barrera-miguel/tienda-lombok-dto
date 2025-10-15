package com.tienda.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {
    private ObjectId id;
    private ObjectId clienteId;
    private List<ObjectId> productosIds;
    private LocalDate fecha;
    private Double total;
}
