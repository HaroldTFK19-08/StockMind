import { Armchair, FlaskConical, Laptop, Monitor, Printer, Projector, Wrench } from 'lucide-react'
import zbook from '../../../assets/elementos/zbook.png'
import silla from '../../../assets/elementos/silla-rimax.png'

export const categorias = ['Tecnología', 'Muebles', 'Laboratorio', 'Herramientas', 'Oficina']

export const estadosElemento = ['Buen estado', 'En reparación', 'Dañado']

// Ícono por categoría (se usa cuando el elemento no tiene foto)
export const iconosCategoria = {
    'Tecnología': Laptop,
    'Muebles': Armchair,
    'Laboratorio': FlaskConical,
    'Herramientas': Wrench,
    'Oficina': Printer,
}

// Inventario general. ambienteId dice en qué ambiente está cada elemento.
const inventarioData = [
    { id: '001', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'En reparación', ambienteId: 1, placa: 'SENA-CPU-0001', foto: zbook },
    { id: '002', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 2, placa: 'SENA-CPU-0002', foto: zbook },
    { id: '003', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Dañado', ambienteId: 1, placa: 'SENA-CPU-0003', foto: zbook },
    { id: '004', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 2, placa: 'SENA-CPU-0004', foto: zbook },
    { id: '005', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Dañado', ambienteId: 3, placa: 'SENA-CPU-0005', foto: zbook },
    { id: '006', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 3, placa: 'SENA-CPU-0006', foto: zbook },
    { id: '007', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 1, placa: 'SENA-CPU-0007', foto: zbook },
    { id: '008', nombre: 'Laptop HP ZBook', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 1, placa: 'SENA-CPU-0008', foto: zbook },
    { id: '009', nombre: 'Silla RIMAX', categoria: 'Muebles', estado: 'En reparación', ambienteId: 2, placa: 'SENA-MUE-0009', foto: silla },
    { id: '010', nombre: 'Silla RIMAX', categoria: 'Muebles', estado: 'Dañado', ambienteId: 2, placa: 'SENA-MUE-0010', foto: silla },
    { id: '011', nombre: 'Silla RIMAX', categoria: 'Muebles', estado: 'Buen estado', ambienteId: 1, placa: 'SENA-MUE-0011', foto: silla },
    { id: '012', nombre: 'Silla RIMAX', categoria: 'Muebles', estado: 'Buen estado', ambienteId: 3, placa: 'SENA-MUE-0012', foto: silla },
    { id: '013', nombre: 'Silla RIMAX', categoria: 'Muebles', estado: 'Buen estado', ambienteId: 4, placa: 'SENA-MUE-0013', foto: silla },
    { id: '014', nombre: 'Monitor Dell UltraSharp 27"', categoria: 'Tecnología', estado: 'Dañado', ambienteId: 1, placa: 'SENA-MON-0014', icono: Monitor },
    { id: '015', nombre: 'Proyector Epson PowerLite', categoria: 'Oficina', estado: 'Buen estado', ambienteId: 2, placa: 'SENA-OFI-0015', icono: Projector },
    { id: '016', nombre: 'Impresora Epson L3250', categoria: 'Oficina', estado: 'Buen estado', ambienteId: 3, placa: 'SENA-OFI-0016' },
    { id: '017', nombre: 'Estufa industrial 4 puestos', categoria: 'Herramientas', estado: 'En reparación', ambienteId: 4, placa: 'SENA-HER-0017' },
    { id: '018', nombre: 'Portátil Lenovo ThinkPad P15', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 5, placa: 'SENA-CPU-0018' },
    { id: '019', nombre: 'Switch Cisco 24 puertos', categoria: 'Tecnología', estado: 'Buen estado', ambienteId: 6, placa: 'SENA-RED-0019' },
    { id: '020', nombre: 'Cámara Sony Alpha', categoria: 'Tecnología', estado: 'En reparación', ambienteId: 7, placa: 'SENA-MUL-0020' },
    { id: '021', nombre: 'Microscopio óptico', categoria: 'Laboratorio', estado: 'Buen estado', ambienteId: 8, placa: 'SENA-LAB-0021' },
    { id: '022', nombre: 'Balanza de precisión', categoria: 'Laboratorio', estado: 'Dañado', ambienteId: 8, placa: 'SENA-LAB-0022' },
    { id: '023', nombre: 'Taladro percutor Bosch', categoria: 'Herramientas', estado: 'Buen estado', ambienteId: 9, placa: 'SENA-HER-0023' },
    { id: '024', nombre: 'Mesa de trabajo', categoria: 'Muebles', estado: 'Buen estado', ambienteId: 9, placa: 'SENA-MUE-0024' },
]

export default inventarioData
