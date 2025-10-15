package com.tienda.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class FuncionApp {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static String getFechaString(LocalDate fecha) {
        if (fecha == null) {
            return "";
        }
        return fecha.format(FORMATTER);
    }

    public static LocalDate parseFecha(String fechaStr) {
        if (fechaStr == null || fechaStr.isEmpty()) {
            return null;
        }
        return LocalDate.parse(fechaStr, FORMATTER);
    }
}
