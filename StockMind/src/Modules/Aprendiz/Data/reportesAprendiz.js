import Cargador from '../../../assets/aprendiz/cargador-danado.png'
import PC from '../../../assets/aprendiz/computador-danado.png'
import Mouse from '../../../assets/aprendiz/mouse-danado.png'
import Teclado from '../../../assets/aprendiz/teclado-danado.png'

// estado: 'revision' | 'pendiente' | 'solucionado'
export const ETIQUETAS_ESTADO = {
    revision: 'En Revisión',
    pendiente: 'Pendiente',
    solucionado: 'Solucionado',
}

export const REPORTES_APRENDIZ = [
    {
        id: 1,
        elemento: 'Cargador - SENA-18',
        tipoFalla: 'Falla Eléctrica',
        claseFalla: 'tag-falla-electrico',
        descripcion: 'El adaptador de corriente se sobrecalienta excesivamente a los pocos minutos de conexión y emite un sonido agudo (pitido). No carga el equipo asignado.',
        fecha: '20/04/2026',
        hora: '11:20 AM',
        tecnico: 'Dante',
        estado: 'revision',
        imagen: Cargador,
        altImagen: 'Evidencia Cargador',
    },
    {
        id: 2,
        elemento: 'PC #10',
        tipoFalla: 'Daño Físico',
        claseFalla: 'tag-falla-fisico',
        descripcion: 'La pantalla del computador parpadea en color verde y se apaga después de 5 minutos de uso...',
        fecha: '22/04/2026',
        hora: '02:30 PM',
        tecnico: 'Dante',
        estado: 'pendiente',
        imagen: PC,
        altImagen: 'Evidencia Daño',
    },
    {
        id: 3,
        elemento: 'Mouse Logitech - M170',
        tipoFalla: 'Falla de Periférico',
        claseFalla: 'tag-falla',
        descripcion: 'El botón izquierdo presenta "doble clic" involuntario o clic fantasma, lo que dificulta la navegación y el uso de software de diseño.',
        fecha: '18/04/2026',
        hora: '09:15 AM',
        tecnico: 'Dante',
        estado: 'solucionado',
        imagen: Mouse,
        altImagen: 'Evidencia Mouse',
    },
    {
        id: 4,
        elemento: 'Teclado Dell - Lote B',
        tipoFalla: 'Daño Físico',
        claseFalla: 'tag-falla',
        descripcion: "Faltan las teclas 'Enter' y 'Shift' derecho. Al parecer fueron desprendidas durante la última jornada de formación.",
        fecha: '24/04/2026',
        hora: '03:45 PM',
        tecnico: 'Dante',
        estado: 'pendiente',
        imagen: Teclado,
        altImagen: 'Evidencia Teclado',
    },
]
