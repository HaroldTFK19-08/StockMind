import { Link } from 'react-router-dom'
import { UserRound } from 'lucide-react'

import { RUTAS_APRENDIZ } from '../Routes/rutasAprendiz'
import fondoInicio from '../../../assets/aprendiz/fondo-inicio.jpg'

const InicioAprendiz = () => {
    return (
        <>
            <style>
                {`
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(30px);
                        }

                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                `}
            </style>

            <main className="min-h-screen w-full">
                <section
                    className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: `linear-gradient(
                            rgba(23, 193, 31, 0.7),
                            rgba(0, 0, 0, 0.5)
                        ), url(${fondoInicio})`
                    }}
                >
                    <div className="relative z-[2] flex flex-col items-center justify-center px-6 text-center text-white">
                        <div
                            aria-hidden="true"
                            className="absolute -right-[50px] -top-[50px] h-[200px] w-[200px] rounded-full bg-white/10"
                        />

                        <h2
                            className="relative z-[1] mb-5 text-4xl font-bold sm:text-5xl"
                            style={{
                                animation: 'fadeInUp 0.8s ease-out forwards'
                            }}
                        >
                            ¡Bienvenido a StockMind Aprendiz!
                        </h2>

                        <p
                            className="relative z-[1] mb-[30px] text-base font-light sm:text-[1.1rem]"
                            style={{
                                animation: 'fadeInUp 0.8s ease-out 0.3s forwards'
                            }}
                        >
                            Gestiona tus equipos asignados y mantén todo bajo control.
                        </p>

                        <div className="relative z-[1]">
                            <Link
                                to={RUTAS_APRENDIZ.reportes}
                                className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-3.5 font-bold text-[#17c11f] no-underline shadow-[0_4px_6px_rgba(0,0,0,0.1)] opacity-0 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(0,0,0,0.15)]"
                                style={{
                                    animation: 'fadeInUp 0.8s ease-out 0.6s forwards'
                                }}
                            >
                                <UserRound
                                    size={19}
                                    strokeWidth={2}
                                />

                                <span>Ver Reportes</span>
                            </Link>
                        </div>

                        <div className="relative z-[1] mx-auto mt-[30px] h-1 w-20 bg-white" />
                    </div>
                </section>
            </main>
        </>
    )
}

export default InicioAprendiz

