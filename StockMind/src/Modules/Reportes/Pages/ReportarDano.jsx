import { useLocation } from 'react-router-dom'
import { CircleCheck, LoaderCircle, Send } from 'lucide-react'

import Tarjeta from '../../../Shared/Components/Cards/Tarjeta'
import Campo, { claseInput } from '../../../Shared/Components/Forms/Campo'
import Boton from '../../../Shared/Components/UI/Boton'

import SelectorElemento from '../Components/SelectorElemento'
import useReportarDano from '../Hooks/useReportarDano'
import { tiposDano } from '../Data/reportesData'
import misElementos from '../../Elementos/Data/misElementos'

const LIMITE = 500

const pasos = [
    { titulo: 'Pendiente', texto: 'Tu reporte llega al instructor encargado del ambiente.' },
    { titulo: 'En revisión', texto: 'Se revisa el elemento y se decide si se repara o se cambia.' },
    { titulo: 'Resuelto', texto: 'Te avisamos cuando el elemento esté listo para usar.' },
]

const ReportarDano = ({ elementos = misElementos, rutaReportes = '/aprendiz/reportes' }) => {
    // Si venimos desde "Mis elementos", el elemento ya viene seleccionado
    const { state } = useLocation()
    const { register, handleSubmit, watch, errors, isSubmitting, enviarReporte, reporteEnviado, nuevoReporte } =
        useReportarDano(state?.elementoId ?? '')

    const descripcion = watch('descripcion') ?? ''

    // Pantalla de éxito
    if (reporteEnviado) {
        return (
            <Tarjeta className="mx-auto max-w-[560px] py-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0fdf4] text-[#39A900]">
                    <CircleCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold text-[#081B28]">Reporte enviado</h2>
                <p className="mt-2 text-sm text-[#64748b]">
                    Tu reporte <strong className="text-[#081B28]">{reporteEnviado.numero}</strong> quedó en estado Pendiente.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Boton to={rutaReportes}>Ver mis reportes</Boton>
                    <Boton variante="secundario" onClick={nuevoReporte}>Reportar otro daño</Boton>
                </div>
            </Tarjeta>
        )
    }

    return (
        <section className="grid gap-6 lg:grid-cols-[1fr_300px]">
            <Tarjeta>
                <form onSubmit={handleSubmit(enviarReporte)} noValidate className="space-y-7">
                    <SelectorElemento elementos={elementos} register={register} seleccionado={watch('elementoId')} error={errors.elementoId} />

                    <Campo etiqueta="Tipo de daño" htmlFor="tipoDano" error={errors.tipoDano?.message}>
                        <select id="tipoDano" className={claseInput} {...register('tipoDano', { required: 'Elige el tipo de daño' })}>
                            <option value="">Selecciona una opción</option>
                            {tiposDano.map((tipo) => <option key={tipo}>{tipo}</option>)}
                        </select>
                    </Campo>

                    <Campo etiqueta="Describe lo que pasó" htmlFor="descripcion" error={errors.descripcion?.message}>
                        <textarea
                            id="descripcion"
                            rows={5}
                            maxLength={LIMITE}
                            placeholder="Ej: desde el martes la tecla Enter no responde."
                            className={claseInput}
                            {...register('descripcion', {
                                required: 'Cuéntanos qué le pasa al elemento',
                                minLength: { value: 15, message: 'Escribe al menos 15 caracteres' },
                            })}
                        />
                        <p className="mt-1 text-right text-xs text-[#94a3b8]">{descripcion.length}/{LIMITE}</p>
                    </Campo>

                    <div className="flex flex-col-reverse gap-3 border-t border-[#f1f5f9] pt-6 sm:flex-row sm:justify-end">
                        <Boton to={rutaReportes} variante="texto">Cancelar</Boton>
                        <Boton type="submit" disabled={isSubmitting} icono={isSubmitting ? LoaderCircle : Send}>
                            {isSubmitting ? 'Enviando...' : 'Enviar reporte'}
                        </Boton>
                    </div>
                </form>
            </Tarjeta>

            {/* Qué pasa después de enviar */}
            <aside className="h-fit rounded-[20px] bg-[#081B28] p-6 text-white">
                <h2 className="font-bold">Después de enviarlo</h2>
                <ol className="mt-5 space-y-5">
                    {pasos.map((paso, indice) => (
                        <li key={paso.titulo} className="flex gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#39A900] text-xs font-bold">{indice + 1}</span>
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
