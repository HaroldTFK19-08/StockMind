import perfilInstructor from './perfilInstructor'
import ambientesData from '../../Ambientes/Data/ambientesData'
import inventarioData from '../../Elementos/Data/inventarioData'
import reportesData from '../../Reportes/Data/reportesData'

// Lo que ve el instructor: solo lo de su centro de formación.
// Cuando haya backend, esto vendrá filtrado desde la API.
export const ambientesInstructor = ambientesData.filter((a) => a.centroId === perfilInstructor.centroId)

const idsAmbientes = ambientesInstructor.map((a) => a.id)

export const elementosInstructor = inventarioData.filter((e) => idsAmbientes.includes(e.ambienteId))
export const reportesInstructor = reportesData.filter((r) => idsAmbientes.includes(r.ambienteId))
