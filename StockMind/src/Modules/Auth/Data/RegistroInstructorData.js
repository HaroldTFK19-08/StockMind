import StockMind from '../../../assets/Capa 1.svg'
import Sena from '../../../assets/SENAblanco.svg'

export const registroInstructorData = {
    lateral: {
        logo: Sena,
        titulo: '¡Bienvenido a StockMind!',
        descripcion:
            'Regístrate como instructor SENA y comienza a utilizar nuestra plataforma para gestionar tus recursos y procesos de formación.'
    },

    formulario: {
        logo: StockMind,
        titulo: 'Crear cuenta',
        subtitulo: 'Regístrate como instructor',
        boton: 'REGISTRARSE'
    },

    tiposIdentificacion: [
        {
            value: 'C.C.',
            label: 'C.C.'
        },
        {
            value: 'C.E.',
            label: 'C.E.'
        }
    ],

    centros: [
        {
            value: 'agropecuario',
            label: 'Centro Agropecuario - Regional Cauca'
        },
        {
            value: 'ctpi',
            label: 'CTPI - Teleinformática y Producción Industrial'
        },
        {
            value: 'comercio',
            label: 'Centro de Comercio y Servicios'
        }
    ]
}