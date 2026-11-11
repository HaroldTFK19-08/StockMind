// Compara sin importar mayúsculas: incluyeTexto("Laptop HP", "lap") -> true
export const incluyeTexto = (valor, busqueda) =>
    String(valor).toLowerCase().includes(busqueda.trim().toLowerCase())

// Cuenta cuántos elementos de la lista tienen cierto valor en un campo
// contarPor(reportes, "estado", "Pendiente") -> 3
export const contarPor = (lista, campo, valor) => lista.filter((item) => item[campo] === valor).length

// Pone la primera letra en mayúscula: capitalizar("en mantenimiento") -> "En mantenimiento"
export const capitalizar = (texto) => (texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : '')
