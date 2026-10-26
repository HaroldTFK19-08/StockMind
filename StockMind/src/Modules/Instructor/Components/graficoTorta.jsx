import { ChartPie } from 'lucide-react'
import {
    Cell,
    Pie,
    PieChart as RechartsPieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

const colores = ['#39A900', '#F4B400', '#F06449', '#3983D1']

const GraficoTorta = ({ datos = [] }) => {
    const total = datos.reduce((suma, dato) => suma + dato.cantidad, 0)

    return (
        <article className="h-fit rounded-[20px] border border-[#edf1eb] bg-white p-5 shadow-[0_8px_24px_rgba(8,27,40,0.06)] sm:p-6">
            <header className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="text-base font-bold text-[#081B28]">Resumen general</h3>
                    <p className="mt-1 text-xs text-[#64748b]">Distribución de indicadores</p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff9e9] text-[#39A900]">
                    <ChartPie size={20} />
                </span>
            </header>

            <div className="relative mt-3 h-[210px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                        <Pie
                            data={datos}
                            dataKey="cantidad"
                            nameKey="nombre"
                            cx="50%"
                            cy="50%"
                            innerRadius={66}
                            outerRadius={94}
                            paddingAngle={4}
                            cornerRadius={5}
                            stroke="none"
                        >
                            {datos.map((dato, indice) => (
                                <Cell key={dato.nombre} fill={dato.fill || colores[indice % colores.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(valor, nombre) => [valor, nombre]}
                            contentStyle={{
                                border: '1px solid #edf1eb',
                                borderRadius: '12px',
                                boxShadow: '0 8px 24px rgba(8, 27, 40, 0.08)',
                                fontSize: '12px',
                            }}
                        />
                    </RechartsPieChart>
                </ResponsiveContainer>
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold tracking-tight text-[#081B28]">{total}</span>
                    <span className="mt-0.5 text-[11px] font-medium text-[#64748b]">en total</span>
                </div>
            </div>

            <ul className="mt-2 space-y-3">
                {datos.map((dato, indice) => {
                    const color = dato.fill || colores[indice % colores.length]
                    const porcentaje = total ? Math.round((dato.cantidad / total) * 100) : 0

                    return (
                        <li key={dato.nombre} className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-2.5">
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: color }} />
                                <span className="truncate text-xs font-medium text-[#475569]">{dato.nombre}</span>
                            </div>
                            <span className="shrink-0 text-xs font-semibold text-[#081B28]">
                                {dato.cantidad}
                                <span className="ml-1 font-normal text-[#94a3b8]">{porcentaje}%</span>
                            </span>
                        </li>
                    )
                })}
            </ul>
        </article>
    )
}

export default GraficoTorta