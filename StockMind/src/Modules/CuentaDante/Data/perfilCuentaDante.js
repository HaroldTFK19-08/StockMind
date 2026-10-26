import { Building2, IdCard, Mail, Phone, Warehouse } from 'lucide-react'
import foto from '../../../assets/InstructorLogo.png'

const perfilCuentaDante = {
    nombres: 'Carlos Mario',
    apellidos: 'Restrepo Gómez',
    rol: 'Cuentadante',
    correo: 'cmrestrepo@sena.edu.co',
    telefono: '315 220 4411',
    foto,
    centroId: 1,
    datos: [
        { icono: IdCard, etiqueta: 'Documento', valor: 'C.C. 76312458' },
        { icono: Mail, etiqueta: 'Correo institucional', valor: 'cmrestrepo@sena.edu.co' },
        { icono: Phone, etiqueta: 'Teléfono', valor: '315 220 4411' },
        { icono: Building2, etiqueta: 'Centro', valor: 'Centro de Comercio y Servicios' },
        { icono: Warehouse, etiqueta: 'Ambientes a cargo', valor: 'Software 1, Software 2, Laboratorio TIC y Cocina' },
    ],
}

export default perfilCuentaDante
