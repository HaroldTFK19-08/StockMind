import { Building2, GraduationCap, Hash, IdCard, Mail, MapPin, Phone, UserRound } from 'lucide-react'
import foto from '../../../assets/aprendizlogo.png'

// Datos de prueba del aprendiz que inició sesión
const perfilAprendiz = {
    nombres: 'Laura Camila',
    apellidos: 'Muñoz Ortega',
    rol: 'Aprendiz · Etapa lectiva',
    correo: 'lcmunoz@soy.sena.edu.co',
    telefono: '312 456 7890',
    foto,
    nombreReportes: 'Laura Camila Muñoz', // así aparece en los reportes
    ficha: '2885412',
    ambiente: 'Software 1',
    datos: [
        { icono: IdCard, etiqueta: 'Documento', valor: 'C.C. 1061789452' },
        { icono: Mail, etiqueta: 'Correo institucional', valor: 'lcmunoz@soy.sena.edu.co' },
        { icono: Phone, etiqueta: 'Teléfono', valor: '312 456 7890' },
        { icono: GraduationCap, etiqueta: 'Programa', valor: 'Análisis y Desarrollo de Software' },
        { icono: Hash, etiqueta: 'Ficha', valor: '2885412 · Jornada mañana' },
        { icono: Building2, etiqueta: 'Centro', valor: 'Centro de Comercio y Servicios' },
        { icono: MapPin, etiqueta: 'Ambiente', valor: 'Software 1' },
        { icono: UserRound, etiqueta: 'Instructor líder', valor: 'Juan Pablo Chamizzo' },
    ],
}

export default perfilAprendiz
