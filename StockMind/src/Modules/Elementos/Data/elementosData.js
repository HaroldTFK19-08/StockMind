import { Laptop, Keyboard, Mouse, PlugZap, Headphones } from 'lucide-react'

import computadorDanado from '../../../assets/aprendiz/computador-danado.png'
import tecladoDanado from '../../../assets/aprendiz/teclado-danado.png'
import mouseDanado from '../../../assets/aprendiz/mouse-danado.png'
import cargadorDanado from '../../../assets/aprendiz/cargador-danado.png'

// Tipos de elemento que maneja el inventario
export const tiposElemento = {
    computador: { nombre: 'Computador', icono: Laptop, imagen: computadorDanado },
    teclado: { nombre: 'Teclado', icono: Keyboard, imagen: tecladoDanado },
    mouse: { nombre: 'Mouse', icono: Mouse, imagen: mouseDanado },
    cargador: { nombre: 'Cargador', icono: PlugZap, imagen: cargadorDanado },
    diadema: { nombre: 'Diadema', icono: Headphones, imagen: null },
}

// Estados posibles de un elemento
export const estadosElemento = ['Operativo', 'Con daño reportado', 'En mantenimiento']

// Elementos asignados al aprendiz (datos de prueba)
const elementosData = [
    {
        id: 'EL-001',
        nombre: 'Portátil Lenovo ThinkPad E14',
        tipo: 'computador',
        placa: 'SENA-CPU-0412',
        serial: 'PF3K9X21',
        ambiente: 'Ambiente 204 · Software',
        estado: 'Operativo',
        asignadoDesde: '2026-02-03',
    },
    {
        id: 'EL-002',
        nombre: 'Teclado Genius KB-110',
        tipo: 'teclado',
        placa: 'SENA-TEC-1187',
        serial: 'GK110-77812',
        ambiente: 'Ambiente 204 · Software',
        estado: 'Con daño reportado',
        asignadoDesde: '2026-02-03',
    },
    {
        id: 'EL-003',
        nombre: 'Mouse óptico Logitech M110',
        tipo: 'mouse',
        placa: 'SENA-MOU-0935',
        serial: 'LM110-55430',
        ambiente: 'Ambiente 204 · Software',
        estado: 'Operativo',
        asignadoDesde: '2026-02-03',
    },
    {
        id: 'EL-004',
        nombre: 'Cargador Lenovo 65W USB-C',
        tipo: 'cargador',
        placa: 'SENA-CAR-0221',
        serial: 'ADLX65Y-9921',
        ambiente: 'Ambiente 204 · Software',
        estado: 'En mantenimiento',
        asignadoDesde: '2026-02-03',
    },
    {
        id: 'EL-005',
        nombre: 'Diadema Genius HS-200C',
        tipo: 'diadema',
        placa: 'SENA-DIA-0078',
        serial: 'GH200-11209',
        ambiente: 'Ambiente 204 · Software',
        estado: 'Operativo',
        asignadoDesde: '2026-04-15',
    },
]

export default elementosData
