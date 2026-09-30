export const estadosReporte = ['Pendiente', 'En revisión', 'Resuelto']

export const tiposDano = [
    { value: 'no-enciende', label: 'No enciende' },
    { value: 'dano-fisico', label: 'Daño físico (golpe, grieta, pieza rota)' },
    { value: 'teclas-botones', label: 'Teclas o botones no responden' },
    { value: 'cable', label: 'Cable o conector dañado' },
    { value: 'rendimiento', label: 'Funciona lento o se reinicia' },
    { value: 'otro', label: 'Otro' },
]

export const etiquetaTipoDano = (valor) =>
    tiposDano.find((tipo) => tipo.value === valor)?.label ?? valor

// Reportes hechos por el aprendiz (datos de prueba)
const reportesData = [
    {
        id: 'REP-0031',
        elementoId: 'EL-002',
        elemento: 'Teclado Genius KB-110',
        placa: 'SENA-TEC-1187',
        tipoDano: 'teclas-botones',
        descripcion: 'Las teclas Enter y Shift derecho no responden desde el lunes.',
        fecha: '2026-09-24',
        estado: 'Pendiente',
    },
    {
        id: 'REP-0027',
        elementoId: 'EL-004',
        elemento: 'Cargador Lenovo 65W USB-C',
        placa: 'SENA-CAR-0221',
        tipoDano: 'cable',
        descripcion: 'El cable está pelado cerca del conector y el portátil carga de forma intermitente.',
        fecha: '2026-09-15',
        estado: 'En revisión',
    },
    {
        id: 'REP-0019',
        elementoId: 'EL-003',
        elemento: 'Mouse óptico Logitech M110',
        placa: 'SENA-MOU-0935',
        tipoDano: 'teclas-botones',
        descripcion: 'El clic derecho hacía doble clic. Se cambió el mouse.',
        fecha: '2026-08-21',
        estado: 'Resuelto',
    },
    {
        id: 'REP-0012',
        elementoId: 'EL-001',
        elemento: 'Portátil Lenovo ThinkPad E14',
        placa: 'SENA-CPU-0412',
        tipoDano: 'rendimiento',
        descripcion: 'Se reiniciaba al abrir el IDE. Se le hizo mantenimiento y limpieza.',
        fecha: '2026-07-08',
        estado: 'Resuelto',
    },
]

export default reportesData
