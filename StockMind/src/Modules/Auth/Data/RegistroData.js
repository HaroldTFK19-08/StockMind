import StockMind from '../../../assets/Capa 1.svg'

export const registroData = {
    logo: StockMind,

    titulo: 'Bienvenido, Miembro SENA',

    descripcion:
        'Por favor, para continuar, selecciona el rol con el que interactuarás en el sistema.',

    roles: [
        {
            nombre: 'APRENDIZ',
            ruta: '/registroaprendiz',
            descripcion: 'Regístrate como aprendiz',
            tipo: 'aprendiz'
        },
        {
            nombre: 'INSTRUCTOR',
            ruta: '/registroinstructor',
            descripcion: 'Regístrate como instructor',
            tipo: 'instructor'
        }
    ],

    login: {
        texto: '¿Ya tienes cuenta?',
        enlace: 'Iniciar Sesión',
        ruta: '/login'
    }
}