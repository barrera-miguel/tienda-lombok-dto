package com.tienda.servlet;

import com.google.gson.Gson;
import com.tienda.dao.PedidoDAO;
import com.tienda.dto.PedidoDTO;
import com.tienda.model.Cliente;
import com.tienda.model.Pedido;
import com.tienda.model.Producto;
import com.tienda.util.MapperUtil;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "PedidoServlet", urlPatterns = {"/api/pedidos", "/api/pedidos/*"})
public class PedidoServlet extends HttpServlet {
    private final Gson gson = new Gson();
    private final PedidoDAO pedidoDAO = new PedidoDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Configurar CORS
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // GET /api/pedidos - Obtener todos los pedidos
                List<Pedido> pedidos = pedidoDAO.findAll();
                List<PedidoDTO> pedidosDTO = new ArrayList<>();

                for (Pedido pedido : pedidos) {
                    Cliente cliente = pedidoDAO.findClienteById(pedido.getClienteId());
                    List<Producto> productos = pedidoDAO.findProductosByIds(pedido.getProductosIds());

                    if (cliente != null) {
                        PedidoDTO dto = MapperUtil.toPedidoDTO(pedido, cliente, productos);
                        pedidosDTO.add(dto);
                    }
                }

                String json = gson.toJson(pedidosDTO);
                response.getWriter().write(json);

            } else {
                // GET /api/pedidos/{id} - Obtener un pedido específico
                String id = pathInfo.substring(1);
                Pedido pedido = pedidoDAO.findById(id);

                if (pedido != null) {
                    Cliente cliente = pedidoDAO.findClienteById(pedido.getClienteId());
                    List<Producto> productos = pedidoDAO.findProductosByIds(pedido.getProductosIds());

                    PedidoDTO dto = MapperUtil.toPedidoDTO(pedido, cliente, productos);
                    String json = gson.toJson(dto);
                    response.getWriter().write(json);
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    response.getWriter().write("{\"error\": \"Pedido no encontrado\"}");
                }
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}