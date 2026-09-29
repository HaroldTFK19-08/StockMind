import { Clock3 } from 'lucide-react'

import BarraSuperiorAprendiz from '../Components/BarraSuperiorAprendiz'
import ReporteItem from '../Components/ReporteItem'
import SearchBar from '../../../Shared/Forms/SearchBar'
import StatCard from '../../../Shared/Components/Cards/StatCard'
import { ESTADISTICAS_REPORTES } from '../Data/estadisticasAprendiz'
import { REPORTES_APRENDIZ } from '../Data/reportesAprendiz'
const ReportesAprendiz = () => {
    return (
        <div className="flex min-h-screen w-full flex-col px-[50px] py-[30px]">
            <BarraSuperiorAprendiz />

            <main className="flex w-full flex-col">
                <div className="mb-[25px] grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5">
                    {ESTADISTICAS_REPORTES.map((est) => (
                        <StatCard
                            key={est.id}
                            etiqueta={est.etiqueta}
                            valor={est.valor}
                            icono={est.icono}
                            color={est.color}
                        />
                    ))}
                </div>

                <SearchBar placeholder="Buscar reportes (ej: Computador, Mouse...)" />

                <section className="w-full bg-transparent px-0 py-5">
                    <div className="rounded-[24px] border border-[#edf2f7] bg-white p-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                        <header className="mb-[25px] flex flex-col items-start justify-between gap-3 border-b-2 border-[#f8fafc] pb-[15px] sm:flex-row sm:items-center">
                            <h3 className="m-0 flex items-center gap-2.5 text-[1.4rem] font-bold text-[#1e293b]">
                                <Clock3
                                    size={21}
                                    strokeWidth={2}
                                    className="text-[#39A900]"
                                />
                                Mis Reportes Recientes
                            </h3>

                            <span className="text-sm font-medium text-[#64748b]">
                                Mostrando reportes
                            </span>
                        </header>

                        <div className="flex max-h-[720px] flex-col overflow-y-auto pr-[15px] [scrollbar-color:#a0aec0_#f1f1f1] [scrollbar-width:auto]">
                            {REPORTES_APRENDIZ.map((reporte) => (
                                <ReporteItem
                                    key={reporte.id}
                                    reporte={reporte}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ReportesAprendiz

