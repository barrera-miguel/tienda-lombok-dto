package com.tienda.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PedidoDTO {
    private String id;
    private String clienteNombre;
    private List<ProductoDTO> productos;
    private String fechaPedido;
    private Double total;
}
