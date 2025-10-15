package com.tienda.util;

import com.tienda.dto.PedidoDTO;
import com.tienda.dto.ProductoDTO;
import com.tienda.model.Cliente;
import com.tienda.model.Pedido;
import com.tienda.model.Producto;

import java.util.List;
import java.util.stream.Collectors;

public class MapperUtil {

    public static ProductoDTO toProductoDTO(Producto producto) {
        return ProductoDTO.builder()
                .nombre(producto.getNombre())
                .precio(producto.getPrecio())
                .build();
    }

    public static PedidoDTO toPedidoDTO(Pedido pedido, Cliente cliente, List<Producto> productos) {
        return PedidoDTO.builder()
                .id(pedido.getId().toHexString())
                .clienteNombre(cliente.getNombre())
                .productos(productos.stream()
                        .map(MapperUtil::toProductoDTO)
                        .collect(Collectors.toList()))
                .total(pedido.getTotal())
                .fechaPedido(FuncionApp.getFechaString(pedido.getFecha()))
                .build();
    }
}
