// Compara sin importar mayúsculas: incluyeTexto("Laptop HP", "lap") -> true
export const incluyeTexto = (valor, busqueda) =>
    String(valor).toLowerCase().includes(busqueda.trim().toLowerCase())

// Cuenta cuántos elementos de la lista tienen cierto valor en un campo
// contarPor(reportes, "estado", "Pendiente") -> 3
export const contarPor = (lista, campo, valor) => lista.filter((item) => item[campo] === valor).length
