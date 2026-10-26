import perfilCuentaDante from './perfilCuentaDante'
import ambientesData from '../../Ambientes/Data/ambientesData'
import inventarioData from '../../Elementos/Data/inventarioData'
import reportesData from '../../Reportes/Data/reportesData'

// Lo que tiene a cargo el cuentadante: los ambientes de su centro.
// Cuando haya backend, esto vendrá filtrado desde la API.
export const ambientesCuentaDante = ambientesData.filter((a) => a.centroId === perfilCuentaDante.centroId)

const idsAmbientes = ambientesCuentaDante.map((a) => a.id)

export const elementosCuentaDante = inventarioData.filter((e) => idsAmbientes.includes(e.ambienteId))
export const reportesCuentaDante = reportesData.filter((r) => idsAmbientes.includes(r.ambienteId))
