import { ENDPOINTS } from '../../../Core/Config/endpoints'
import { obtenerTodos } from '../../../Core/Services/apiUtils'

// Consultas de solo lectura -> /v1/consultas/*
// Los filtros aceptados por el backend están en ConsultaRequest.php:
// per_page, estado, especialidad, tipo_instructor, ambiente_id, usuario_id,
// solo_vigentes, tipo, aprendiz_id, ficha_id, desde, hasta.
const listar = (definicion, params = {}) => obtenerTodos(definicion.ruta, params)

export const obtenerInstructores = (params) => listar(ENDPOINTS.consultas.instructores, params)
export const obtenerCuentasDante = (params) => listar(ENDPOINTS.consultas.cuentasDante, params)
export const obtenerMisSolicitudes = (params) => listar(ENDPOINTS.consultas.misSolicitudes, params)
export const obtenerSolicitudesFicha = (params) => listar(ENDPOINTS.consultas.solicitudesFicha, params)
export const obtenerReportesConsulta = (params) => listar(ENDPOINTS.consultas.reportes, params)
