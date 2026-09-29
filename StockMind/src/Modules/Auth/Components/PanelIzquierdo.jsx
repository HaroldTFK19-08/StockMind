import { Link, useNavigate } from 'react-router-dom'
import {
    House,
    LogIn,
    ArrowLeftCircle,
    CircleHelp,
    ArrowLeft
} from 'lucide-react'

import Instructor from '../../../assets/InstructorLogo.png'

const PaneLIzquierdo = () => {
    const navigate = useNavigate()

    return (
        <aside className="relative hidden w-1/2 overflow-hidden bg-sena px-10 py-10 text-white lg:flex lg:items-center lg:justify-center">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />

            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-sena-light/10" />

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
            >
                <ArrowLeft size={18} />
                <span>Volver</span>
            </button>

            <div className="relative z-10 w-full max-w-[300px]">
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-white/30 bg-white/10">
                        <img
                            src={Instructor}
                            alt="Instructor"
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <h2 className="text-2xl font-bold">
                        ¡Bienvenido Instructor!
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-white/80">
                        Completa tu información para crear tu cuenta en StockMind.
                    </p>
                </div>

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
                            <Link
                                to="/registropaso1"
                                className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition-all duration-300 hover:bg-white/10 hover:text-white"
                            >
                                <ArrowLeftCircle size={19} />
                                <span>Cambiar Rol</span>
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
            </div>
        </aside>
    )
}

export default PaneLIzquierdo