export function actualizarPunteroTarjeta(evento) {
    if (evento.pointerType !== 'mouse') {
        return
    }

    const tarjeta = evento.currentTarget
    const limites = tarjeta.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (evento.clientX - limites.left) / limites.width))
    const y = Math.min(1, Math.max(0, (evento.clientY - limites.top) / limites.height))
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const inclinacionMaxima = movimientoReducido ? 4 : 8
    const giroMaximo = movimientoReducido ? 5 : 10

    tarjeta.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`)
    tarjeta.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`)
    tarjeta.style.setProperty('--tilt-x', `${((0.5 - y) * inclinacionMaxima).toFixed(2)}deg`)
    tarjeta.style.setProperty('--tilt-y', `${((x - 0.5) * giroMaximo).toFixed(2)}deg`)
}

export function restablecerPunteroTarjeta(evento) {
    const tarjeta = evento.currentTarget

    tarjeta.style.setProperty('--pointer-x', '50%')
    tarjeta.style.setProperty('--pointer-y', '50%')
    tarjeta.style.setProperty('--tilt-x', '0deg')
    tarjeta.style.setProperty('--tilt-y', '0deg')
}
