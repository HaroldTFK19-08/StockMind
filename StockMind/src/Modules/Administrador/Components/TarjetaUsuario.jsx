import { Eye, Pencil } from 'lucide-react'

import Boton from '../../../Shared/Components/UI/Boton'

const iniciales = (nombre) => String(nombre)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase()

const TarjetaUsuario = ({ usuario, actualizando, onCambiarEstado, onVer, onEditar }) => {
    const activo = usuario.estado === 'Activo'
    const pendiente = usuario.estado === 'Pendiente'
    const claseEstado = activo
        ? 'bg-[#E8F7E3] text-[#2F8F00]'
        : pendiente
            ? 'bg-[#FFF7E6] text-[#A16207]'
            : 'bg-[#F1F5F9] text-[#475569]'
    const clasePunto = activo
        ? 'bg-[#39A900]'
        : pendiente
            ? 'bg-[#D97706]'
            : 'bg-[#94A3B8]'

    return (
        <article className="min-w-0 rounded-2xl border border-[#e5ece6] bg-white p-4">
            <header className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#E8F7E3] text-sm font-bold text-[#2F8F00]"
                >
                    {iniciales(usuario.nombre)}
                </span>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-[#081B28]">{usuario.nombre}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <span className="max-w-full rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs font-semibold text-[#475569]">
                            {usuario.roles.join(', ') || 'Sin rol'}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${claseEstado}`}>
                            <span aria-hidden="true" className={`size-1.5 rounded-full ${clasePunto}`} />
                            {usuario.estado}
                        </span>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-1.5">
                    <button
                        type="button"
                        aria-label={`Ver detalles de ${usuario.nombre}`}
                        onClick={onVer}
                        className="flex size-11 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#475569] transition-colors hover:bg-[#E2E8F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
                    >
                        <Eye size={18} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        aria-label={`Editar datos de ${usuario.nombre}`}
                        onClick={onEditar}
                        className="flex size-11 items-center justify-center rounded-xl bg-[#F1F5F9] text-[#475569] transition-colors hover:bg-[#E2E8F0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#39A900]"
                    >
                        <Pencil size={18} aria-hidden="true" />
                    </button>
                </div>
            </header>

            <Boton
                variante={activo ? 'peligro' : 'secundario'}
                className="mt-4 w-full"
                disabled={actualizando}
                onClick={() => onCambiarEstado(usuario)}
            >
                {actualizando
                    ? 'Guardando...'
                    : pendiente
                        ? 'Aprobar cuenta'
                        : activo ? 'Desactivar' : 'Activar'}
            </Boton>
        </article>
    )
}

export default TarjetaUsuario
