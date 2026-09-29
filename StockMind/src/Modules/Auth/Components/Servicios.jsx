import { CheckCircle2 } from "lucide-react";
import servicios from "../Data/Servicios";
export default function Servicios(){
    return(
        <>
            <section
                id="servicios"
                className="bg-[#f8fafc] px-[10%] py-[100px]"
            >
                <div className="mx-auto max-w-[1200px]">
                    <div className="mb-[60px] text-center">
                        <span className="font-bold uppercase tracking-[2px] text-[#39A900]">
                            Nuestros Servicios
                        </span>
                        <h2 className="my-[15px] text-4xl font-bold text-[#111827] sm:text-5xl">
                            Soluciones a tu Medida
                        </h2>
                        <p className="mx-auto max-w-2xl text-base leading-7 text-[#6b7280] sm:text-lg">
                            Explora las funcionalidades diseñadas específicamente
                            para cada integrante de la comunidad SENA.
                        </p>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[30px]">
                        {servicios.map((servicio) => {
                            const Icono = servicio.icono
                            return (
                                <div
                                    key={servicio.titulo}
                                    className={`relative rounded-[30px] bg-white px-[35px] py-[50px] text-center transition-all duration-300 ${
                                        servicio.destacado
                                            ? 'scale-105 border-2 border-[#39A900] shadow-[0_20px_40px_rgba(57,169,0,0.1)] hover:-translate-y-2.5'
                                            : 'border border-[#e5e7eb] hover:-translate-y-2.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)]'
                                    }`}
                                >
                                    {servicio.destacado && (
                                        <span className="absolute left-1/2 top-[-15px] -translate-x-1/2 rounded-[20px] bg-[#39A900] px-5 py-[5px] text-[0.8rem] font-bold text-white">
                                            Más Popular
                                        </span>
                                    )}
                                    <div className="mb-[25px] flex justify-center text-[#39A900]">
                                        <Icono size={56} strokeWidth={1.8} />
                                    </div>

                                    <h3 className="mb-[25px] text-[1.8rem] font-bold text-[#1f2937]">
                                        {servicio.titulo}
                                    </h3>
                                    <ul className="list-none space-y-[15px] p-0 text-left">
                                        {servicio.caracteristicas.map((caracteristica) => (
                                            <li
                                                key={caracteristica}
                                                className="flex items-center gap-[10px] text-[#4b5563]"
                                            >
                                                <CheckCircle2
                                                    size={20}
                                                    className="shrink-0 font-bold text-[#39A900]"
                                                />
                                                <span>
                                                    {caracteristica}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </>
    )
}