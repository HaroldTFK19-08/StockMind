import { useState } from 'react'
import { AlertTriangle, FileText } from 'lucide-react'

import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import Boton from '../../../Shared/Components/UI/Boton'
import MensajeError from '../../../Shared/Components/Feedback/MensajeError'
import { useCarga } from '../../../Shared/Hooks/useCarga'
import { contarPor, incluyeTexto } from '../../../Shared/Utils/texto'
import useAuth from '../../Auth/Hooks/useAuth'
import { obtenerUsuario } from '../../Administrador/Services/usuariosService'

import ListaReportes from '../Components/ListaReportes'
import { estadosReporte } from '../Data/reportesData'
import { obtenerReportes } from '../Services/reportesService'

const opciones = ['Todos', ...estadosReporte]

/**
 * Reportes hechos por el aprendiz.
 * <MisReportes reportes={reportesDelAprendiz} rutaReportar="/aprendiz/reportes/reportarDano" />
 */
const MisReportes = ({ rutaReportar }) => {
    const [busqueda, setBusqueda] = useState('')
    const [estado, setEstado] = useState('Todos')
    const { usuario } = useAuth()
    const { datos: perfil, cargando: cargandoPerfil, error: errorPerfil } = useCarga(
        () => usuario?.id ? obtenerUsuario(usuario.id) : Promise.resolve(null),
        usuario?.id ?? ''
    )
    const { datos: todosReportes = [], cargando: cargandoReportes, error: errorReportes } =
        useCarga(obtenerReportes, 'reportes')
    const reportes = perfil?.apprentice?.id
        ? (todosReportes ?? []).filter((reporte) => Number(reporte.apprentice_id) === Number(perfil.apprentice.id))
        : []

    const filtrados = reportes.filter(
        (r) => (estado === 'Todos' || r.estado === estado) && incluyeTexto(r.id + r.elemento + r.placa, busqueda)
    )

    const conteos = { Todos: reportes.length }
    estadosReporte.forEach((e) => (conteos[e] = contarPor(reportes, 'estado', e)))

    if (reportes.length === 0) {
        if (errorPerfil || errorReportes) {
            return <MensajeError>{errorPerfil || errorReportes}</MensajeError>
        }
        if (cargandoPerfil || cargandoReportes) {
            return <p className="py-8 text-center text-sm text-[#64748b]">Cargando tus reportes...</p>
        }
        return (
            <EstadoVacio icono={FileText} titulo="Aún no has reportado daños" descripcion="Cuando un elemento a tu cargo falle, repórtalo para que tu instructor lo revise.">
                <Boton to={rutaReportar}>Reportar un daño</Boton>
            </EstadoVacio>
        )
    }

    return (
        <section>
            {(errorPerfil || errorReportes) && <MensajeError>{errorPerfil || errorReportes}</MensajeError>}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#64748b]">Consulta el estado de los daños que has reportado.</p>
                <Boton to={rutaReportar} icono={AlertTriangle}>Reportar daño</Boton>
            </div>

            <SearchBar placeholder="Buscar por número, elemento o placa..." value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
            <FiltroChips opciones={opciones} valor={estado} onCambiar={setEstado} conteos={conteos} />

            {filtrados.length > 0 ? (
                <ListaReportes reportes={filtrados} />
            ) : (
                <EstadoVacio titulo="Ningún reporte coincide" descripcion="Revisa el número o la placa, o cambia el filtro de estado." />
            )}
        </section>
    )
}

export default MisReportes
