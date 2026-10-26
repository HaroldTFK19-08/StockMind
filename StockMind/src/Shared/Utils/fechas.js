const formato = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })

// "2026-09-24" -> "24 sept 2026"
export const formatearFecha = (fecha) => formato.format(new Date(`${fecha}T00:00:00`))

// Fecha de hoy en formato "2026-09-30" (para inputs type="date")
export const fechaHoy = () => new Date().toISOString().slice(0, 10)
