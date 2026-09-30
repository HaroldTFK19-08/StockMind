import {
    Building2,
    GraduationCap,
    Hash,
    IdCard,
    Mail,
    MapPin,
    Phone,
    UserRound,
} from 'lucide-react'

import fotoAprendiz from '../../../assets/aprendizlogo.png'
import perfilAprendiz from '../Data/perfilAprendiz'

const Dato = ({ icono: Icono, etiqueta, valor }) => (
    <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#f0fdf4] text-[#39A900]">
            <Icono size={18} />
        </div>
        <div>
            <dt className="text-xs text-[#64748b]">{etiqueta}</dt>
            <dd className="text-sm font-semibold text-[#081B28]">{valor}</dd>
        </div>
    </div>
)

export default function PerfilAprendiz({ perfil = perfilAprendiz }) {
    const nombreCompleto = `${perfil.nombres} ${perfil.apellidos}`

    return (
        <section className="grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* Tarjeta principal */}
            <div className="h-fit rounded-[20px] border border-[#f1f5f9] bg-white p-6 text-center shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full border-4 border-[#E8F7E3]">
                    <img src={fotoAprendiz} alt={nombreCompleto} className="h-full w-full object-cover" />
                </div>
                <h2 className="text-xl font-bold text-[#081B28]">{nombreCompleto}</h2>
                <p className="mt-1 text-sm text-[#64748b]">Aprendiz · Ficha {perfil.ficha}</p>
                <span className="mt-4 inline-block rounded-full bg-[#f0fdf4] px-3 py-1 text-xs font-semibold text-[#2F8F00]">
                    En formación
                </span>
            </div>

            <div className="space-y-6">
                {/* Datos personales */}
                <div className="rounded-[20px] border border-[#f1f5f9] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                    <h3 className="mb-5 text-base font-bold text-[#081B28]">Datos personales</h3>
                    <dl className="grid gap-5 sm:grid-cols-2">
                        <Dato icono={IdCard} etiqueta="Documento" valor={`${perfil.tipoDocumento} ${perfil.documento}`} />
                        <Dato icono={Mail} etiqueta="Correo institucional" valor={perfil.correo} />
                        <Dato icono={Phone} etiqueta="Teléfono" valor={perfil.telefono} />
                    </dl>
                </div>

                {/* Formación */}
                <div className="rounded-[20px] border border-[#f1f5f9] bg-white p-6 shadow-[0_4px_15px_rgba(0,0,0,0.03)]">
                    <h3 className="mb-5 text-base font-bold text-[#081B28]">Formación</h3>
                    <dl className="grid gap-5 sm:grid-cols-2">
                        <Dato icono={GraduationCap} etiqueta="Programa" valor={perfil.programa} />
                        <Dato icono={Hash} etiqueta="Ficha" valor={`${perfil.ficha} · Jornada ${perfil.jornada.toLowerCase()}`} />
                        <Dato icono={Building2} etiqueta="Centro" valor={`${perfil.centro} (${perfil.regional})`} />
                        <Dato icono={MapPin} etiqueta="Ambiente" valor={perfil.ambiente} />
                        <Dato icono={UserRound} etiqueta="Instructor líder" valor={perfil.instructorLider} />
                    </dl>
                </div>
            </div>
        </section>
    )
}
