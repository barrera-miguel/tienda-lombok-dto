package com.tienda.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cliente {
    private ObjectId id;
    private String nombre;
    private String email;
    private String telefono;
    private List<ObjectId> pedidosIds;
}