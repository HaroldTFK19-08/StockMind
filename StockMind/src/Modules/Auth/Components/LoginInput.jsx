import { Eye, EyeOff } from 'lucide-react'
import Visibilidad from '../Hooks/Visibilidad'

const LoginInput = ({
    icon: Icon,
    type,
    name,
    placeholder,
    register,
    error,
    password = false
}) => {
    const {
        visible,
        alternarVisibilidad
    } = Visibilidad()

    const tipoInput = password && visible
        ? 'text'
        : type

    return (
        <div className="mb-4 w-full">
            <div className="group relative">
                <Icon
                    size={19}
                    strokeWidth={2}
                    className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        error
                            ? 'text-red-500'
                            : 'text-gray-500 group-focus-within:text-[#39A900]'
                    }`}
                />

                <input
                    type={tipoInput}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`w-full rounded-xl border bg-[#F3F4F6] px-[45px] py-3.5 pr-12 text-sm text-[#081B28] outline-none transition-all duration-300 placeholder:text-gray-500 focus:bg-white focus:ring-4 ${
                        error
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                            : 'border-transparent focus:border-[#39A900]/30 focus:ring-[#39A900]/10'
                    }`}
                />

                {password && (
                    <button
                        type="button"
                        onClick={alternarVisibilidad}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border-none bg-transparent p-1.5 text-gray-500 transition-colors hover:text-[#39A900]"
                        aria-label={
                            visible
                                ? 'Ocultar contraseña'
                                : 'Mostrar contraseña'
                        }
                    >
                        {visible ? (
                            <EyeOff size={18} />
                        ) : (
                            <Eye size={18} />
                        )}
                    </button>
                )}
            </div>

            {error && (
                <p className="mt-1.5 px-1 text-xs font-medium text-red-500">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default LoginInput