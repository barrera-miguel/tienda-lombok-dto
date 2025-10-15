package com.tienda.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    private ObjectId id;
    private String nombre;
    private String categoria;
    private Double precio;
}
