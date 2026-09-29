import { GraduationCap, UserRoundCog } from 'lucide-react'
import { Link } from 'react-router-dom'

const iconos = {
    aprendiz: GraduationCap,
    instructor: UserRoundCog
}

const RegistroRol = ({ rol }) => {
    const Icon = iconos[rol.tipo]

    return (
        <Link
            to={rol.ruta}
            className="group flex min-h-[190px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-sena hover:shadow-[0_10px_25px_rgba(57,169,0,0.15)]"
        >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-sena/10 text-sena transition-all duration-300 group-hover:bg-sena group-hover:text-white">
                <Icon
                    size={32}
                    strokeWidth={2}
                />
            </div>

            <span className="text-sm font-bold tracking-wide text-text-primary transition-colors duration-300 group-hover:text-sena">
                {rol.nombre}
            </span>

            <span className="mt-2 text-xs text-text-secondary">
                {rol.descripcion}
            </span>
        </Link>
    )
}

export default RegistroRol