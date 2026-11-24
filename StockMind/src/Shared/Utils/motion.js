// Presets de animación reutilizables (Motion / Framer-style API de motion/react).
// Centralizar estos valores mantiene consistencia visual y facilita ajustes globales.

export const transicionSuave = {
    duration: 0.35,
    ease: [0.2, 0.7, 0.2, 1],
}

export const transicionRapida = {
    duration: 0.2,
    ease: [0.2, 0.7, 0.2, 1],
}

export const aparecerArriba = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
}

export const viewportUnaVez = {
    once: true,
    amount: 0.15,
}
