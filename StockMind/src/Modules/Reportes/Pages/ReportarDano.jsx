import { Link, useLocation } from 'react-router-dom'
import { CircleCheck, LoaderCircle, Send } from 'lucide-react'

import SelectorElemento from '../Components/SelectorElemento'
import useReportarDano from '../Hooks/useReportarDano'
import { tiposDano } from '../Data/reportesData'
import elementosData from '../../Elementos/Data/elementosData'

const LIMITE_DESCRIPCION = 500

const pasosSeguimiento = [
    { titulo: 'Pendiente', texto: 'Tu reporte llega al instructor encargado del ambiente.' },
    { titulo: 'En revisión', texto: 'Se revisa el elemento y se decide si se repara o se cambia.' },
    { titulo: 'Resuelto', texto: 'Te avisamos cuando el elemento esté listo para usar.' },
]

const claseCampo =
    'w-full rounded-[15px] border-2 border-[#edf2f7] bg-white px-4 py-3 text-[0.95rem] text-[#081B28] outline-none transition-all duration-300 placeholder:text-[#94a3b8] focus:border-[#39A900] focus:shadow-[0_0_0_4px_rgba(73,169,25,0.1)]'

const ReportarDano = ({
    elementos = elementosData,
    rutaReportes = '/aprendiz/reportes',
}) => {
    const { state } = useLocation()
    const {
        register,
        handleSubmit,
        watch,
        errors,
        isSubmitting,
        enviarReporte,
        reporteEnviado,
        nuevoReporte,
    } = useReportarDano({ elementoInicial: state?.elementoId ?? '' })

    const elementoSeleccionado = watch('elementoId')
    const descripcion = watch('descripcion') ?? ''

    if (reporteEnviado) {
        return (
            <section className="mx-auto max-w-[560px] rounded-[20px] border border-[#f1f5f9] bg-white px-8 py-12 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4] text-[#39A900]">
                    <CircleCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#081B28]">Reporte enviado</h2>
                <p className="mt-2 text-sm text-[#64748b]">
                    Tu reporte <strong className="text-[#081B28]">{reporteEnviado.numero}</strong> quedó
                    en estado Pendiente. Puedes seguirlo desde tus reportes.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        to={rutaReportes}
                        className="rounded-[30px] bg-[#39A900] px-6 py-3 text-sm font-bold text-white hover:bg-[#2f8f00]"
                    >
                        Ver mis reportes
                    </Link>
                    <button
                        type="button"
                        onClick={nuevoReporte}
                        className="rounded-[30px] border-2 border-[#edf2f7] px-6 py-3 text-sm font-semibold text-[#081B28] hover:border-[#cbd5e1]"
                    >
                        Reportar otro daño
                    </button>
                </div>
            </section>
        )
    }

    return (
        <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <form
                onSubmit={handleSubmit(enviarReporte)}
                noValidate
                className="space-y-7 rounded-[20px] border border-[#f1f5f9] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)] sm:p-8"
            >
                <SelectorElemento
                    elementos={elementos}
                    register={register}
                    seleccionado={elementoSeleccionado}
                    error={errors.elementoId}
                />

                <div>
                    <label htmlFor="tipoDano" className="mb-2 block text-sm font-semibold text-[#081B28]">
                        Tipo de daño
                    </label>
                    <select
                        id="tipoDano"
                        className={claseCampo}
                        {...register('tipoDano', { required: 'Elige el tipo de daño' })}
                    >
                        <option value="">Selecciona una opción</option>
                        {tiposDano.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>
                                {tipo.label}
                            </option>
                        ))}
                    </select>
                    {errors.tipoDano && (
                        <p className="mt-2 text-sm text-[#dc2626]">{errors.tipoDano.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="descripcion" className="mb-2 block text-sm font-semibold text-[#081B28]">
                        Describe lo que pasó
                    </label>
                    <textarea
                        id="descripcion"
                        rows={5}
                        maxLength={LIMITE_DESCRIPCION}
                        placeholder="Ej: desde el martes la tecla Enter no responde y el teclado se desconecta solo."
                        className={`${claseCampo} resize-y`}
                        {...register('descripcion', {
                            required: 'Cuéntanos qué le pasa al elemento',
                            minLength: { value: 15, message: 'Escribe al menos 15 caracteres' },
                        })}
                    />
                    <div className="mt-2 flex justify-between gap-4 text-sm">
                        <span className="text-[#dc2626]">{errors.descripcion?.message}</span>
                        <span className="shrink-0 text-[#94a3b8]">
                            {descripcion.length}/{LIMITE_DESCRIPCION}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[#f1f5f9] pt-6 sm:flex-row sm:justify-end">
                    <Link
                        to={rutaReportes}
                        className="rounded-[30px] px-6 py-3 text-center text-sm font-semibold text-[#64748b] hover:text-[#081B28]"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center justify-center gap-2 rounded-[30px] bg-[#39A900] px-6 py-3 text-sm font-bold text-white shadow-[0_6px_18px_rgba(57,169,0,0.20)] transition-all duration-300 hover:bg-[#2f8f00] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSubmitting ? (
                            <>
                                <LoaderCircle size={17} className="animate-spin" />
                                Enviando reporte...
                            </>
                        ) : (
                            <>
                                <Send size={16} />
                                Enviar reporte
                            </>
                        )}
                    </button>
                </div>
            </form>

            {/* Qué pasa después de enviar */}
            <aside className="h-fit rounded-[20px] bg-[#081B28] p-6 text-white">
                <h2 className="text-base font-bold">Después de enviarlo</h2>
                <ol className="mt-5 space-y-5">
                    {pasosSeguimiento.map((paso, indice) => (
                        <li key={paso.titulo} className="flex gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#39A900] text-xs font-bold">
                                {indice + 1}
                            </span>
                            <div>
                                <p className="text-sm font-semibold">{paso.titulo}</p>
                                <p className="mt-0.5 text-sm leading-6 text-white/70">{paso.texto}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </aside>
        </section>
    )
}

export default ReportarDano
