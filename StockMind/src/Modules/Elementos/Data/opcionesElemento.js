// Valores que acepta el backend en el campo "estado" de un elemento
export const estadosElemento = ['disponible', 'asignado', 'prestado', 'en traslado', 'en mantenimiento', 'dado de baja']

// "asignado" y "prestado" no se eligen a mano: el backend solo los acepta
// desde los módulos de asignaciones y préstamos.
export const estadosAutomaticos = ['asignado', 'prestado']
export const estadosManuales = estadosElemento.filter((estado) => !estadosAutomaticos.includes(estado))

// Valores que acepta el backend en el campo "condicion"
export const condicionesElemento = ['bueno', 'regular', 'malo']

// Dónde está el elemento: en un ambiente, en un almacén o sin ubicación
export const ubicacionDe = (elemento) =>
    elemento.environment?.nombre ?? elemento.warehouse?.nombre ?? 'Sin ubicación'
