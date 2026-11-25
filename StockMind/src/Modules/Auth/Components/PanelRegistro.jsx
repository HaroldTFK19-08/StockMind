import { motion } from 'motion/react'
import { Link, useNavigate } from 'react-router-dom'
import { House, LogIn, CircleHelp, ArrowLeft, ShieldCheck } from 'lucide-react'

import Sena from '../../../assets/SENAblanco.svg'

// Panel lateral informativo del registro (lado izquierdo en desktop).
// Refuerza identidad visual y ofrece accesos rápidos sin afectar la lógica del formulario.
const PanelRegistro = () => {
    const navigate = useNavigate()

    return (
        <aside className="relative hidden w-[42%] overflow-hidden bg-[linear-gradient(160deg,#2f8f00_0%,#39a900_55%,#2f8f00_100%)] px-10 py-10 text-white lg:flex lg:items-center lg:justify-center">
            {/* Decoración de fondo para dar profundidad visual */}
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-sm" />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#8AFD5D]/15 blur-sm" />
            <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent)]" />

            {/* Botón volver */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
            >
                <ArrowLeft size={18} />
                <span>Volver</span>
            </button>

            <motion.div
                // Entrada suave del contenido del panel lateral.
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative z-10 w-full max-w-[320px]"
            >
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/25 bg-white/10 shadow-[0_12px_30px_rgba(8,27,40,0.12)]">
                        <img src={Sena} alt="SENA" className="w-16 object-contain" />
                    </div>

                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/75">StockMind</p>
                    <h2 className="text-3xl font-bold leading-tight">Crea tu cuenta</h2>
                    <p className="mt-3 text-sm leading-6 text-white/85">
                        Completa tu información para registrarte y comenzar a gestionar el inventario de forma organizada.
                    </p>
                </div>

                {/* Beneficio/confianza visual */}
                <div className="mb-6 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                            <ShieldCheck size={18} />
                        </span>
                        <div>
                            <p className="text-sm font-semibold">Registro seguro</p>
                            <p className="mt-1 text-xs leading-5 text-white/80">Tus datos se usan para crear tu acceso a la plataforma.</p>
                        </div>
                    </div>
                </div>

                {/* Navegación secundaria */}
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="/"
                                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                            >
                                <House size={19} />
                                <span>Ir al Inicio</span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/login"
                                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                            >
                                <LogIn size={19} />
                                <span>Iniciar Sesión</span>
                            </Link>
                        </li>

                        <li>
                            <button
                                type="button"
                                className="group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                            >
                                <CircleHelp size={19} />
                                <span>Ayuda</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </motion.div>
        </aside>
    )
}

export default PanelRegistro

