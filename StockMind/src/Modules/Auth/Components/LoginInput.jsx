import { AnimatePresence, motion } from 'motion/react'
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
            {/* Contenedor del campo con icono y estados visuales mejorados (hover/focus/error). */}
            <div className="group relative">
                <Icon
                    size={19}
                    strokeWidth={2}
                    className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        error
                            ? 'text-red-500'
                            : 'text-gray-500 group-hover:text-[#2f8f00] group-focus-within:text-[#39A900]'
                    }`}
                />

                <input
                    type={tipoInput}
                    placeholder={placeholder}
                    {...register(name)}
                    className={`w-full rounded-xl border bg-[#F3F4F6] px-[45px] py-3.5 pr-12 text-sm text-[#081B28] outline-none transition-all duration-300 placeholder:text-gray-500 hover:bg-[#eef2ee] focus:bg-white focus:ring-4 ${
                        error
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                            : 'border-transparent focus:border-[#39A900]/30 focus:ring-[#39A900]/10'
                    }`}
                />

                {password && (
                    <button
                        type="button"
                        onClick={alternarVisibilidad}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border-none bg-transparent p-1.5 text-gray-500 transition-colors hover:bg-white/70 hover:text-[#39A900]"
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

            {/* Mensaje de error animado para feedback inmediato sin cambiar la estructura del formulario. */}
            <AnimatePresence initial={false}>
                {error && (
                    <motion.p
                        key={error.message}
                        initial={{ opacity: 0, y: -4, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -2, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 overflow-hidden px-1 text-xs font-medium text-red-500"
                    >
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

export default LoginInput