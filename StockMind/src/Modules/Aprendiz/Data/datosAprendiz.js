import perfilAprendiz from './perfilAprendiz'
import reportesData from '../../Reportes/Data/reportesData'

// Reportes hechos por el aprendiz que inició sesión.
// Cuando haya backend, esto vendrá filtrado desde la API.
export const reportesDelAprendiz = reportesData.filter((r) => r.aprendiz === perfilAprendiz.nombreReportes)
