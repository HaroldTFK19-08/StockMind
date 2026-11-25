import { motion } from 'motion/react'
import { useLocation } from 'react-router-dom'

import MindBot from '../../../assets/mindbot-logo.svg'

// Rutas donde NO se debe mostrar el botón flotante de MindBot.
// El usuario solicitó excluir login y registro; Inicio ya tiene su propio acceso a MindBot.
const RUTAS_OCULTAS = ['/', '/login', '/registro']

/**
 * Botón flotante de MindBot.
 * Se muestra en las páginas de la plataforma para dar acceso rápido al asistente,
 * excepto en las rutas excluidas (inicio con acceso propio, login y registros).
 */
const BotonMindBot = () => {
    const { pathname } = useLocation()

    // Normaliza la ruta (quita slash final) para comparar de forma segura.
    const rutaActual = pathname !== '/' ? pathname.replace(/\/$/, '') : '/'
    const ocultar = RUTAS_OCULTAS.includes(rutaActual)

    if (ocultar) return null

    return (
        <motion.button
            type="button"
            aria-label="Abrir MindBot"
            title="MindBot"
            // Animación de entrada suave para que aparezca de forma natural.
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ y: -3, scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#dce8dd] bg-white shadow-[0_10px_30px_rgba(8,27,40,0.14)] ring-1 ring-white/70 transition-colors hover:border-[#39A900]/40 hover:shadow-[0_14px_34px_rgba(57,169,0,0.18)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39A900]"
        >
            {/* Ícono de MindBot con flotación ligera para hacerlo más llamativo */}
            <motion.img
                src={MindBot}
                alt=""
                aria-hidden="true"
                className="h-10 w-10"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            />
        </motion.button>
    )
}

export default BotonMindBot
