// Traslados de elementos entre ambientes (Cuentadante).
// origenId / destinoId son ambientes; "Taller de soporte" no es un ambiente, por eso va como texto.
const trasladosData = [
    { id: 'TR-005', motivo: 'Revisión técnica', origen: 'Software 2', destino: 'Taller de soporte técnico', fecha: '2026-09-17', estado: 'En tránsito', elementos: ['009', '010'] },
    { id: 'TR-004', motivo: 'Reubicación de puestos', origen: 'Software 1', destino: 'Laboratorio TIC', fecha: '2026-09-01', estado: 'Completado', elementos: ['006', '012'] },
    { id: 'TR-003', motivo: 'Retorno al almacén central', origen: 'Laboratorio TIC', destino: 'Almacén central', fecha: '2026-08-06', estado: 'Completado', elementos: ['016'] },
    { id: 'TR-002', motivo: 'Revisión técnica', origen: 'Software 1', destino: 'Taller de soporte técnico', fecha: '2026-07-30', estado: 'Completado', elementos: ['001', '003'] },
    { id: 'TR-001', motivo: 'Dotación de ambiente nuevo', origen: 'Almacén central', destino: 'Cocina', fecha: '2026-06-15', estado: 'Completado', elementos: ['013', '017'] },
]

export const destinosExtra = ['Taller de soporte técnico', 'Almacén central']

export default trasladosData
