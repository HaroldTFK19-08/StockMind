import { NavLink } from 'react-router-dom'
import {
    House,
    TriangleAlert,
    FileCheck,
    UserCheck
} from 'lucide-react'

import StockMind from '../../../assets/Capa 1.svg'
import { RUTAS_APRENDIZ } from '../Routes/rutasAprendiz'

const ENLACES = [
    {
        to: RUTAS_APRENDIZ.inicio,
        icono: House,
        texto: 'Inicio'
    },
    {
        to: RUTAS_APRENDIZ.reportarDano,
        icono: TriangleAlert,
        texto: 'Reportar Daño'
    },
    {
        to: RUTAS_APRENDIZ.reportes,
        icono: FileCheck,
        texto: 'Mis Reportes'
    },
    {
        to: RUTAS_APRENDIZ.elementos,
        icono: UserCheck,
        texto: 'Mis elementos'
    }
]

const NavbarAprendiz = () => {
    return (
        <aside className="fixed left-0 top-0 h-screen w-[250px] bg-white text-left shadow-[2px_0_5px_rgba(0,0,0,0.05)]">
            <div className="flex justify-center">
                <img
                    src={StockMind}
                    alt="StockMind"
                    className="h-[160px] w-[160px] object-contain"
                />
            </div>

            <nav>
                <ul className="m-0 list-none p-0">
                    {ENLACES.map(({ to, icono: Icono, texto }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `mx-5 my-2.5 flex w-[85%] items-center rounded-lg px-2.5 py-2.5 no-underline transition-all duration-300 ${
                                        isActive
                                            ? 'border-l-[5px] border-[#015718] bg-[#ecffe9] font-semibold text-black'
                                            : 'border-l-[5px] border-transparent text-black hover:cursor-pointer hover:border-[#015618] hover:bg-[#ecffe9]'
                                    }`
                                }
                            >
                                <Icono
                                    size={18}
                                    strokeWidth={2}
                                    className="mx-2.5 shrink-0"
                                />

                                <span>{texto}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}

export default NavbarAprendiz

