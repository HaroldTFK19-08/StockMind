import sala from '../../../assets/ambientes/sala.jpg'

// Ambientes de formación. centroId dice a qué centro pertenece.
const ambientesData = [
    { id: 1, nombre: 'Software 1', area: 'Desarrollo de software', centroId: 1, capacidad: 26, estado: 'Activo', imagen: sala },
    { id: 2, nombre: 'Software 2', area: 'Desarrollo de software', centroId: 1, capacidad: 30, estado: 'Activo', imagen: sala },
    { id: 3, nombre: 'Laboratorio TIC', area: 'Redes y soporte', centroId: 1, capacidad: 20, estado: 'Activo', imagen: sala },
    { id: 4, nombre: 'Cocina', area: 'Gastronomía', centroId: 1, capacidad: 22, estado: 'En mantenimiento', imagen: sala },
    { id: 5, nombre: 'Ambiente 101', area: 'Software', centroId: 2, capacidad: 45, estado: 'Activo', imagen: sala },
    { id: 6, nombre: 'Ambiente 102', area: 'Redes y telecomunicaciones', centroId: 2, capacidad: 30, estado: 'Activo', imagen: sala },
    { id: 7, nombre: 'Ambiente 103', area: 'Multimedia', centroId: 2, capacidad: 40, estado: 'En mantenimiento', imagen: sala },
    { id: 8, nombre: 'Laboratorio de suelos', area: 'Agronomía', centroId: 3, capacidad: 24, estado: 'Activo', imagen: sala },
    { id: 9, nombre: 'Taller agroindustrial', area: 'Agroindustria', centroId: 3, capacidad: 20, estado: 'Activo', imagen: sala },
]

export const buscarAmbiente = (id) => ambientesData.find((ambiente) => ambiente.id === Number(id))

export const nombreAmbiente = (id) => buscarAmbiente(id)?.nombre ?? 'Sin ambiente'

export default ambientesData
