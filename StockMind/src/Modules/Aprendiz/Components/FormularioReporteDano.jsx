import { Link } from 'react-router-dom'
import {
    AlertTriangle,
    Megaphone,
    Package,
    Wrench,
    CalendarDays,
    Clock,
    MessageSquareText,
    CloudUpload,
    Send
} from 'lucide-react'

import { RUTAS_APRENDIZ } from '../Routes/rutasAprendiz'
import { ELEMENTOS_ASIGNADOS } from '../Data/elementosAprendiz'
import { TIPOS_FALLA } from '../Data/opcionesReporte'

const FormularioReporteDano = () => {
    const handleSubmit = (e) => {
        e.preventDefault()

        const datos = Object.fromEntries(new FormData(e.currentTarget))

        console.log('Reporte a enviar:', datos)
    }

    return (
        <section className="mx-auto my-5 w-full max-w-[900px] rounded-[24px] border border-[#edf2f7] bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] sm:p-10">
            <header className="mb-[30px] flex flex-col gap-3 border-b-2 border-[#bfc0c0] pb-[25px]">
                <h2 className="m-0 flex items-center gap-3 text-[1.75rem] font-extrabold text-[#1e293b]">
                    <AlertTriangle
                        size={27}
                        strokeWidth={2.2}
                        className="text-[#ef4444]"
                    />
                    Reportar Daño o Falla
                </h2>

                <h3 className="my-[5px] flex w-fit items-center gap-2.5 rounded-xl border border-[#dcfce7] bg-[#f0fdf4] px-4 py-2 text-base font-semibold text-[#166534]">
                    <Megaphone
                        size={18}
                        strokeWidth={2}
                        className="text-[#39A900]"
                    />

                    Nuevo Reporte para:
                    <strong className="font-extrabold text-[#39A900]">
                        Dante
                    </strong>
                </h3>

                <p className="m-0 max-w-[600px] text-[0.95rem] leading-[1.6] text-[#64748b]">
                    Describe el inconveniente detalladamente. Dante recibirá
                    esta información para procesar la revisión técnica.
                </p>
            </header>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-[30px] md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label
                            htmlFor="elementoId"
                            className="mb-2.5 block text-[0.9rem] font-bold uppercase tracking-[0.5px] text-[#475569]"
                        >
                            Elemento afectado
                        </label>

                        <div className="group flex items-center gap-[15px] rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-[#38a900] focus-within:bg-white focus-within:shadow-[0_10px_20px_rgba(56,169,0,0.08),0_0_0_4px_rgba(56,169,0,0.1)]">
                            <Package
                                size={20}
                                className="shrink-0 text-[#64748b] transition-colors group-focus-within:text-[#39A900]"
                            />

                            <select
                                id="elementoId"
                                name="elementoId"
                                defaultValue=""
                                required
                                className="w-full cursor-pointer appearance-none border-none bg-transparent text-base font-medium text-[#1e293b] outline-none"
                            >
                                <option value="" disabled>
                                    Selecciona el elemento que presenta la
                                    falla...
                                </option>

                                {ELEMENTOS_ASIGNADOS.map((elemento) => (
                                    <option
                                        key={elemento.id}
                                        value={elemento.id}
                                    >
                                        {elemento.nombre} - {elemento.codigo}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="tipoFalla"
                            className="mb-2.5 block text-[0.9rem] font-bold uppercase tracking-[0.5px] text-[#475569]"
                        >
                            Tipo de Falla
                        </label>

                        <div className="group flex items-center gap-[15px] rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-[#38a900] focus-within:bg-white focus-within:shadow-[0_10px_20px_rgba(56,169,0,0.08),0_0_0_4px_rgba(56,169,0,0.1)]">
                            <Wrench
                                size={20}
                                className="shrink-0 text-[#64748b] transition-colors group-focus-within:text-[#39A900]"
                            />

                            <select
                                id="tipoFalla"
                                name="tipoFalla"
                                defaultValue=""
                                className="w-full cursor-pointer appearance-none border-none bg-transparent text-base font-medium text-[#1e293b] outline-none"
                            >
                                {TIPOS_FALLA.map((tipo) => (
                                    <option
                                        key={tipo.value}
                                        value={tipo.value}
                                    >
                                        {tipo.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="fechaDano"
                            className="mb-2.5 block text-[0.9rem] font-bold uppercase tracking-[0.5px] text-[#475569]"
                        >
                            Fecha del Suceso
                        </label>

                        <div className="group flex items-center gap-[15px] rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-[#38a900] focus-within:bg-white focus-within:shadow-[0_10px_20px_rgba(56,169,0,0.08),0_0_0_4px_rgba(56,169,0,0.1)]">
                            <CalendarDays
                                size={20}
                                className="shrink-0 text-[#64748b] transition-colors group-focus-within:text-[#39A900]"
                            />

                            <input
                                id="fechaDano"
                                type="date"
                                name="fechaDano"
                                className="w-full border-none bg-transparent text-base font-medium text-[#1e293b] outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="horaDano"
                            className="mb-2.5 block text-[0.9rem] font-bold uppercase tracking-[0.5px] text-[#475569]"
                        >
                            Hora Aproximada
                        </label>

                        <div className="group flex items-center gap-[15px] rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-[#38a900] focus-within:bg-white focus-within:shadow-[0_10px_20px_rgba(56,169,0,0.08),0_0_0_4px_rgba(56,169,0,0.1)]">
                            <Clock
                                size={20}
                                className="shrink-0 text-[#64748b] transition-colors group-focus-within:text-[#39A900]"
                            />

                            <input
                                id="horaDano"
                                type="time"
                                name="horaDano"
                                className="w-full border-none bg-transparent text-base font-medium text-[#1e293b] outline-none"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="descripcion"
                            className="mb-2.5 block text-[0.9rem] font-bold uppercase tracking-[0.5px] text-[#475569]"
                        >
                            Descripción del problema
                        </label>

                        <div className="group flex items-start gap-[15px] rounded-2xl border-2 border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 transition-all duration-300 focus-within:-translate-y-0.5 focus-within:border-[#38a900] focus-within:bg-white focus-within:shadow-[0_10px_20px_rgba(56,169,0,0.08),0_0_0_4px_rgba(56,169,0,0.1)]">
                            <MessageSquareText
                                size={20}
                                className="mt-1 shrink-0 text-[#64748b] transition-colors group-focus-within:text-[#39A900]"
                            />

                            <textarea
                                id="descripcion"
                                name="descripcion"
                                rows={5}
                                placeholder="Ej: La pantalla del computador parpadea en color verde y se apaga después de 5 minutos de uso..."
                                className="w-full resize-y border-none bg-transparent text-base font-medium leading-6 text-[#1e293b] outline-none placeholder:text-[#94a3b8]"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2.5 block text-[0.9rem] font-bold uppercase tracking-[0.5px] text-[#475569]">
                            Evidencia Fotográfica{' '}
                            <span className="font-medium normal-case tracking-normal text-[#94a3b8]">
                                (Opcional)
                            </span>
                        </label>

                        <div className="group mt-2 overflow-hidden rounded-[20px] border-2 border-dashed border-[#cbd5e1] bg-[#f8fafc] px-5 py-[35px] text-center transition-all duration-300 hover:border-[#39A900] hover:bg-[#f0fdf4] hover:shadow-[0_8px_20px_rgba(57,169,0,0.05)] active:scale-[0.99]">
                            <input
                                type="file"
                                name="fotoDano"
                                id="fotoDano"
                                accept="image/*"
                                hidden
                            />

                            <label
                                htmlFor="fotoDano"
                                className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                            >
                                <CloudUpload
                                    size={51}
                                    strokeWidth={1.8}
                                    className="mb-3 text-[#94a3b8] transition-all duration-300 group-hover:-translate-y-[5px] group-hover:text-[#39A900]"
                                />

                                <div className="flex flex-col gap-1">
                                    <strong className="text-[1.05rem] font-bold text-[#334155] transition-colors duration-300 group-hover:text-[#166534]">
                                        Haz clic para subir
                                    </strong>

                                    <span className="text-[0.85rem] font-medium text-[#94a3b8]">
                                        o arrastra la foto aquí
                                    </span>

                                    <span className="mt-1 text-[0.85rem] font-medium text-[#94a3b8]">
                                        PNG, JPG (Máx. 5MB)
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-5 border-t border-[#f1f5f9] pt-[30px] sm:flex-row">
                    <button
                        type="submit"
                        className="order-2 inline-flex flex-2 items-center justify-center gap-2.5 rounded-[14px] border-none bg-[#273b1e] px-6 py-4 text-base font-bold text-white transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#39A900] hover:shadow-[0_10px_20px_rgba(57,169,0,0.25)] active:-translate-y-px active:shadow-[0_5px_10px_rgba(57,169,0,0.2)] sm:order-1"
                    >
                        <Send size={20} />
                        Enviar Reporte a Dante
                    </button>

                    <Link
                        to={RUTAS_APRENDIZ.elementos}
                        className="order-1 inline-flex flex-1 items-center justify-center rounded-[14px] border-2 border-[#e2e8f0] bg-white px-6 py-4 text-base font-semibold text-[#64748b] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:border-[#cbd5e1] hover:bg-[#f8fafc] hover:text-[#1e293b] active:translate-y-0 sm:order-2"
                    >
                        Volver
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default FormularioReporteDano

