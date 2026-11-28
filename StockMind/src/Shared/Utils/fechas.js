const formato = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

// "2026-09-24" -> "24 sept 2026"
export const formatearFecha = (fecha) => {
    if (typeof fecha !== 'string' || !fecha.trim()) return 'Fecha no disponible'

    const texto = fecha.trim()
    const valor = /^\d{4}-\d{2}-\d{2}$/.test(texto)
        ? new Date(`${texto}T00:00:00`)
        : new Date(texto)

    return Number.isNaN(valor.getTime()) ? 'Fecha no disponible' : formato.format(valor)
}

// Fecha de hoy en formato "2026-09-30" (para inputs type="date")
export const fechaHoy = () => new Date().toISOString().slice(0, 10)
