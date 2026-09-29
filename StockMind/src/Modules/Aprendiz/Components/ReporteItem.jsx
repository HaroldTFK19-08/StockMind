import {
    CalendarDays,
    Clock3,
    UserRound,
    ZoomIn
} from 'lucide-react'

import { ETIQUETAS_ESTADO } from '../Data/reportesAprendiz'

const ReporteItem = ({ reporte }) => {
    const {
        elemento,
        tipoFalla,
        claseFalla,
        descripcion,
        fecha,
        hora,
        tecnico,
        estado,
        imagen,
        altImagen
    } = reporte

    const estilosEstado = {
        solucionado:
            'bg-[#ecfdf5] text-[#065f46] border-[#a7f3d0]',
        pendiente:
            'bg-[#fffbeb] text-[#92400e] border-[#fde68a]',
        revision:
            'bg-[#eff6ff] text-[#1e40af] border-[#bfdbfe]'
    }

    return (
        <article className="mb-[15px] grid grid-cols-1 gap-5 rounded-[18px] border border-[#e2e8f0] bg-[#f8fafc] p-5 transition-all duration-300 last:mb-0 hover:translate-x-[5px] hover:border-[#39A900] hover:bg-white">
            <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_200px]">
                <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="rounded-md bg-[#f0fdf4] px-2.5 py-1 text-xs font-bold text-[#39A900]">
                            {elemento}
                        </span>

                        <span className={claseFalla}>
                            {tipoFalla}
                        </span>
                    </div>

                    <div>
                        <p className="my-[15px] text-base leading-[1.7] text-[#64748b]">
                            <strong className="font-bold text-[#334155]">
                                Descripción:
                            </strong>{' '}
                            {descripcion}
                        </p>

                        <div className="flex flex-wrap gap-5 text-[0.9rem] text-[#94a3b8]">
                            <span className="flex items-center gap-2">
                                <CalendarDays
                                    size={16}
                                    strokeWidth={2}
                                />
                                {fecha}
                            </span>

                            <span className="flex items-center gap-2">
                                <Clock3
                                    size={16}
                                    strokeWidth={2}
                                />
                                {hora}
                            </span>

                            <span className="flex items-center gap-2">
                                <UserRound
                                    size={16}
                                    strokeWidth={2}
                                />
                                Técnico: {tecnico}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between border-l-0 pl-0 md:border-l md:border-[#f1f5f9] md:pl-[25px]">
                    <div
                        className={`inline-flex w-fit items-center justify-center rounded-[50px] border px-3.5 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.5px] transition-all duration-300 hover:scale-105 hover:brightness-95 ${
                            estilosEstado[estado] ||
                            'border-transparent bg-[#f8fafc] text-[#64748b]'
                        }`}
                    >
                        {ETIQUETAS_ESTADO[estado]}
                    </div>

                    <div className="relative mt-4 h-[130px] w-full overflow-hidden rounded-2xl bg-[#f1f5f9] group">
                        <img
                            src={imagen}
                            alt={altImagen}
                            className="block h-full w-full object-cover object-center"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#334155] shadow-lg">
                                <ZoomIn
                                    size={20}
                                    strokeWidth={2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ReporteItem
