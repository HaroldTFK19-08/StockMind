import { ClipboardCheck, Download, FileText, PackageCheck, Plus, RefreshCw, Users } from 'lucide-react'

import StatCard from '../../../Shared/Components/Cards/StatCard'
import SearchBar from '../../../Shared/Forms/SearchBar'
import FiltroChips from '../../../Shared/Components/UI/FiltroChips'
import Boton from '../../../Shared/Components/UI/Boton'
import EstadoVacio from '../../../Shared/Components/Feedback/EstadoVacio'
import MensajeExito from '../../../Shared/Components/Feedback/MensajeExito'
import ModalEliminar from '../../../Shared/Components/Modals/ModalEliminar'
import ModalNuevaAsignacion from '../Components/ModalNuevaAsignacion'
import TarjetaAsignacion from '../Components/TarjetaAsignacion'
import DetalleAsignacion from '../Components/DetalleAsignacion'
import useAsignaciones from '../Hooks/useAsignaciones'

const Asignaciones = () => {
    const {
        abrirDetalle,
        abrirEdicion,
        abrirNueva,
        asignacionAEliminar,
        asignacionEnEdicion,
        asignaciones,
        aprendices,
        aprendicesUnicos,
        busqueda,
        cargando,
        cargandoDetalle,
        cerrarDetalle,
        conteos,
        descargarPdf,
        detalle,
        detalleAbierto,
        devolver,
        eliminarSeleccionada,
        elementosDisponibles,
        elementosFormulario,
        error,
        filtradas,
        filtro,
        guardarAsignacion,
        instructores,
        mensaje,
        modalAbierto,
        pdfCargando,
        recargar,
        setAsignacionAEliminar,
        setBusqueda,
        setFiltro,
        setModalAbierto,
        terminarEliminacion,
        verPdf,
    } = useAsignaciones()

    const estados = ['Todas', 'Activa', 'Devuelta', 'Vencida']
    const editarDesdeDetalle = (asignacion) => {
        cerrarDetalle()
        abrirEdicion(asignacion.apiId)
    }

    return (
        <section>
            {mensaje && <MensajeExito>{mensaje}</MensajeExito>}

            {error && (
                <div role="alert" className="mb-6 flex flex-col gap-3 rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-4 text-sm text-[#b42318] sm:flex-row sm:items-center sm:justify-between">
                    <p>{error}</p>
                    <Boton variante="secundario" icono={RefreshCw} onClick={recargar}>Reintentar</Boton>
                </div>
            )}

            <div className="mb-8 grid gap-5 sm:grid-cols-3">
                <StatCard etiqueta="Asignaciones activas" valor={conteos.Activa} icono={ClipboardCheck} />
                <StatCard etiqueta="Aprendices con elementos" valor={aprendicesUnicos} icono={Users} color="azul" />
                <StatCard etiqueta="Elementos disponibles" valor={elementosDisponibles.length} icono={PackageCheck} color="ambar" />
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-bold text-[#081B28]">Asignaciones</h2>
                <div className="flex flex-col gap-2 sm:flex-row">
                    <Boton variante="secundario" icono={FileText} onClick={verPdf} disabled={pdfCargando}>
                        Ver PDF
                    </Boton>
                    <Boton variante="secundario" icono={Download} onClick={descargarPdf} disabled={pdfCargando}>
                        Descargar PDF
                    </Boton>
                    <Boton icono={Plus} onClick={abrirNueva}>Nueva asignación</Boton>
                </div>
            </div>

            <SearchBar
                placeholder="Buscar por aprendiz, documento o elemento..."
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
            />
            <FiltroChips opciones={estados} valor={filtro} onCambiar={setFiltro} conteos={conteos} />

            {cargando && !asignaciones.length ? (
                <p role="status" className="py-12 text-center text-sm text-[#64748b]">Cargando asignaciones...</p>
            ) : filtradas.length ? (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {filtradas.map((asignacion) => (
                        <TarjetaAsignacion
                            key={asignacion.apiId}
                            asignacion={asignacion}
                            onVer={(registro) => abrirDetalle(registro.apiId)}
                            onEditar={editarDesdeDetalle}
                            onDevolver={devolver}
                            onEliminar={setAsignacionAEliminar}
                        />
                    ))}
                </div>
            ) : (
                <EstadoVacio
                    titulo={busqueda || filtro !== 'Todas' ? 'No hay asignaciones con ese filtro' : 'Aún no hay asignaciones'}
                    descripcion={busqueda || filtro !== 'Todas'
                        ? 'Prueba con otro término o cambia el estado seleccionado.'
                        : 'Crea una asignación para registrar la entrega de un elemento.'}
                />
            )}

            {modalAbierto && (
                <ModalNuevaAsignacion
                    abierto
                    asignacion={asignacionEnEdicion}
                    aprendices={aprendices}
                    instructores={instructores}
                    elementos={elementosFormulario}
                    onCerrar={() => setModalAbierto(false)}
                    onGuardar={guardarAsignacion}
                />
            )}

            <DetalleAsignacion
                abierto={detalleAbierto}
                asignacion={detalle}
                cargando={cargandoDetalle}
                onCerrar={cerrarDetalle}
                onEditar={editarDesdeDetalle}
                onDevolver={devolver}
            />

            {asignacionAEliminar && (
                <ModalEliminar
                    titulo="Eliminar asignación"
                    nombre={`la asignación de ${asignacionAEliminar.apprenticeName} para ${asignacionAEliminar.element?.nombre ?? 'este elemento'}`}
                    eliminar={eliminarSeleccionada}
                    onEliminado={terminarEliminacion}
                    onCerrar={() => setAsignacionAEliminar(null)}
                />
            )}
        </section>
    )
}

export default Asignaciones
