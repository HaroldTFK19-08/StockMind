import { Building2, IdCard, Mail, Phone, BookOpen } from 'lucide-react'
import foto from '../../../assets/instructor/perfil-instructor.jpg'

const perfilInstructor = {
    nombres: 'Juan Pablo',
    apellidos: 'Chamizzo Vega',
    rol: 'Instructor',
    correo: 'instructorjp@soy.sena.edu.co',
    telefono: '311 458 3026',
    foto,
    centroId: 1,
    datos: [
        { icono: IdCard, etiqueta: 'Documento', valor: 'C.C. 1001548967' },
        { icono: Mail, etiqueta: 'Correo institucional', valor: 'instructorjp@soy.sena.edu.co' },
        { icono: Phone, etiqueta: 'Teléfono', valor: '311 458 3026' },
        { icono: Building2, etiqueta: 'Centro', valor: 'Centro de Comercio y Servicios' },
        { icono: BookOpen, etiqueta: 'Área', valor: 'Desarrollo de software' },
    ],
}

export default perfilInstructor
