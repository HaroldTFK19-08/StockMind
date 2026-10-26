export const estadosReporte = ['Pendiente', 'En revisión', 'Resuelto']

export const prioridades = ['Alta', 'Media', 'Baja']

export const tiposDano = [
    'No enciende',
    'Daño físico (golpe, grieta o pieza rota)',
    'Teclas o botones no responden',
    'Cable o conector dañado',
    'Funciona lento o se reinicia',
    'Otro',
]

// Todos los reportes de daños. ambienteId conecta el reporte con su ambiente.
const reportesData = [
    { id: 'REP-0031', elemento: 'Teclado Genius KB-110', placa: 'SENA-TEC-1187', tipoDano: 'Teclas o botones no responden', descripcion: 'Las teclas Enter y Shift derecho no responden desde el lunes.', fecha: '2026-09-24', estado: 'Pendiente', prioridad: 'Media', aprendiz: 'Laura Camila Muñoz', ambienteId: 1 },
    { id: 'REP-0030', elemento: 'Monitor Dell UltraSharp 27"', placa: 'SENA-MON-0014', tipoDano: 'No enciende', descripcion: 'El monitor del puesto 12 no da imagen tras el último corte de luz.', fecha: '2026-09-23', estado: 'Pendiente', prioridad: 'Alta', aprendiz: 'Harold Chantre', ambienteId: 1 },
    { id: 'REP-0029', elemento: 'Silla RIMAX', placa: 'SENA-MUE-0010', tipoDano: 'Daño físico (golpe, grieta o pieza rota)', descripcion: 'Se partió una pata de la silla. Hay otras dos sillas con el espaldar flojo.', fecha: '2026-09-22', estado: 'En revisión', prioridad: 'Baja', aprendiz: 'Luis Noriega', ambienteId: 2 },
    { id: 'REP-0028', elemento: 'Laptop HP ZBook', placa: 'SENA-CPU-0005', tipoDano: 'Funciona lento o se reinicia', descripcion: 'Se reinicia sola al abrir el IDE y el ventilador suena muy fuerte.', fecha: '2026-09-18', estado: 'Pendiente', prioridad: 'Alta', aprendiz: 'Kevin Adrada', ambienteId: 3 },
    { id: 'REP-0027', elemento: 'Cargador Lenovo 65W USB-C', placa: 'SENA-CAR-0221', tipoDano: 'Cable o conector dañado', descripcion: 'El cable está pelado cerca del conector y el portátil carga de forma intermitente.', fecha: '2026-09-15', estado: 'En revisión', prioridad: 'Media', aprendiz: 'Laura Camila Muñoz', ambienteId: 1 },
    { id: 'REP-0024', elemento: 'Estufa industrial 4 puestos', placa: 'SENA-HER-0017', tipoDano: 'Otro', descripcion: 'Dos quemadores no encienden y huele a gas.', fecha: '2026-09-10', estado: 'En revisión', prioridad: 'Alta', aprendiz: 'Mariana Trujillo', ambienteId: 4 },
    { id: 'REP-0021', elemento: 'Balanza de precisión', placa: 'SENA-LAB-0022', tipoDano: 'No enciende', descripcion: 'La pantalla no prende aunque tiene baterías nuevas.', fecha: '2026-09-02', estado: 'Pendiente', prioridad: 'Media', aprendiz: 'Cristian Torres', ambienteId: 8 },
    { id: 'REP-0019', elemento: 'Mouse óptico Genius', placa: 'SENA-MOU-0023', tipoDano: 'Teclas o botones no responden', descripcion: 'El clic derecho hacía doble clic. Se cambió el mouse.', fecha: '2026-08-21', estado: 'Resuelto', prioridad: 'Baja', aprendiz: 'Laura Camila Muñoz', ambienteId: 1 },
    { id: 'REP-0016', elemento: 'Cámara Sony Alpha', placa: 'SENA-MUL-0020', tipoDano: 'Daño físico (golpe, grieta o pieza rota)', descripcion: 'El lente quedó rayado después de una caída.', fecha: '2026-08-12', estado: 'Resuelto', prioridad: 'Media', aprendiz: 'Karina López', ambienteId: 7 },
    { id: 'REP-0012', elemento: 'Portátil Lenovo ThinkPad E14', placa: 'SENA-CPU-0412', tipoDano: 'Funciona lento o se reinicia', descripcion: 'Se reiniciaba al abrir el IDE. Se le hizo mantenimiento y limpieza.', fecha: '2026-07-08', estado: 'Resuelto', prioridad: 'Media', aprendiz: 'Laura Camila Muñoz', ambienteId: 1 },
]

export default reportesData
