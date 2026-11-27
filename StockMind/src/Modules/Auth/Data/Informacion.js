import StockMind from "../../../assets/Capa 1.svg"

export const loginData = {
    titulo: 'Inicia Sesión',
    correoPlaceholder: 'Correo Electrónico',
    passwordPlaceholder: 'Contraseña',
    olvidarPassword: '¿Olvidaste tu contraseña?',
    botonLogin: 'INICIAR SESIÓN',
    ayudaAcceso: 'Tu cuenta debe estar activa y tener un rol asignado para iniciar sesión.',
    logo: {
        stockmind: StockMind
    },
    lateral: {
        titulo: '¡Bienvenido a StockMind!',
        descripcion:
            'Ingresa tus datos personales y comienza tu jornada con nosotros.',
        botonRegistro: 'REGISTRARSE'
    },
    rutas: {
        inicio: '/',
        registro: '/registro',
        inicioAprendiz: '/aprendiz/home'
    }
}
