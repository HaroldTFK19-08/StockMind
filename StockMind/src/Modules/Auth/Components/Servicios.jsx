import { CheckCircle2 } from "lucide-react";
import servicios from "../Data/Servicios";
import { actualizarPunteroTarjeta, restablecerPunteroTarjeta } from "../Hooks/animacionesTarjeta";

const clasesTarjetaAnimada =
    "group auth-card-3d auth-card-spotlight origin-bottom opacity-0 will-change-transform transition-[transform,box-shadow,border-color] duration-[320ms] ease-[cubic-bezier(0.2,0.75,0.25,1)] hover:-translate-y-2 hover:scale-[1.015] motion-reduce:opacity-100 motion-reduce:origin-center motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100 motion-reduce:transition-none";

const clasesIconoAnimado =
    "transition-[transform,background-color,color] duration-[520ms] ease-[cubic-bezier(0.2,0.75,0.25,1)] group-hover:rotate-[-7deg] group-hover:scale-110 motion-reduce:group-hover:rotate-0 motion-reduce:group-hover:scale-100 motion-reduce:transition-none";

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
                        {servicios.map((servicio, index) => {
                            const Icono = servicio.icono
                            return (
                                <div
                                    key={servicio.titulo}
                                    data-reveal-card
                                    style={{ "--auth-card-delay": `${index * 120}ms` }}
                                    onPointerMove={actualizarPunteroTarjeta}
                                    onPointerLeave={restablecerPunteroTarjeta}
                                    className={`${clasesTarjetaAnimada} relative rounded-[30px] bg-white px-[35px] py-[50px] text-center ${
                                        servicio.destacado
                                            ? 'border-2 border-[#39A900] shadow-[0_20px_40px_rgba(57,169,0,0.1)] hover:shadow-[0_25px_50px_rgba(57,169,0,0.16)]'
                                            : 'border border-[#e5e7eb] hover:shadow-[0_20px_40px_rgba(8,27,40,0.10)]'
                                    }`}
                                >
                                    {servicio.destacado && (
                                        <span className="absolute left-1/2 top-[-15px] -translate-x-1/2 rounded-[20px] bg-[#39A900] px-5 py-[5px] text-[0.8rem] font-bold text-white shadow-[0_8px_20px_rgba(57,169,0,0.24)]">
                                            Más Popular
                                        </span>
                                    )}
                                    <div className={`${clasesIconoAnimado} mb-[25px] flex justify-center text-[#39A900]`}>
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