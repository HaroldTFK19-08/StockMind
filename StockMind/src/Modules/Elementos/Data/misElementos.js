import { Headphones, Keyboard, Laptop, Mouse, PlugZap } from 'lucide-react'

import computadorDanado from '../../../assets/aprendiz/computador-danado.png'
import tecladoDanado from '../../../assets/aprendiz/teclado-danado.png'
import mouseDanado from '../../../assets/aprendiz/mouse-danado.png'
import cargadorDanado from '../../../assets/aprendiz/cargador-danado.png'

// Tipos de elemento que puede tener un aprendiz (ícono + imagen para reportar daños)
export const tiposElemento = {
    computador: { nombre: 'Computador', icono: Laptop, imagen: computadorDanado },
    teclado: { nombre: 'Teclado', icono: Keyboard, imagen: tecladoDanado },
    mouse: { nombre: 'Mouse', icono: Mouse, imagen: mouseDanado },
    cargador: { nombre: 'Cargador', icono: PlugZap, imagen: cargadorDanado },
    diadema: { nombre: 'Diadema', icono: Headphones, imagen: null },
}

// Elementos asignados al aprendiz que inició sesión
const misElementos = [
    { id: 'EL-001', nombre: 'Portátil Lenovo ThinkPad E14', tipo: 'computador', placa: 'SENA-CPU-0412', serial: 'PF3K9X21', ambiente: 'Software 1', estado: 'Buen estado', asignadoDesde: '2026-02-03' },
    { id: 'EL-002', nombre: 'Teclado Genius KB-110', tipo: 'teclado', placa: 'SENA-TEC-1187', serial: 'GK110-77812', ambiente: 'Software 1', estado: 'Dañado', asignadoDesde: '2026-02-03' },
    { id: 'EL-003', nombre: 'Mouse óptico Genius', tipo: 'mouse', placa: 'SENA-MOU-0023', serial: 'LM110-55430', ambiente: 'Software 1', estado: 'Buen estado', asignadoDesde: '2026-04-21' },
    { id: 'EL-004', nombre: 'Cargador Lenovo 65W USB-C', tipo: 'cargador', placa: 'SENA-CAR-0221', serial: 'ADLX65Y-9921', ambiente: 'Software 1', estado: 'En reparación', asignadoDesde: '2026-02-03' },
    { id: 'EL-005', nombre: 'Diadema Genius HS-200C', tipo: 'diadema', placa: 'SENA-DIA-0078', serial: 'GH200-11209', ambiente: 'Software 1', estado: 'Buen estado', asignadoDesde: '2026-04-15' },
]

export default misElementos
