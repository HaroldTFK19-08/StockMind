import { AnimatePresence, motion } from 'motion/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const RegistroInput = ({
    icon: Icon,
    name,
    type = 'text',
    label,
    placeholder,
    register,
    error,
    rules,
    password = false,
    autoComplete
}) => {
    const [visible, setVisible] = useState(false)

    const tipoInput = password && visible
        ? 'text'
        : type

    return (
        <div className="mb-3 w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-1.5 block text-[13px] font-semibold text-slate-700"
                >
                    {label}
                </label>
            )}

            {/* Contenedor del campo con icono y estados visuales mejorados (hover/focus/error). */}
            <div className="group relative">
                <Icon
                    size={18}
                    strokeWidth={2}
                    className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                        error
                            ? 'text-red-500'
                            : 'text-gray-500 group-hover:text-sena-dark group-focus-within:text-sena'
                    }`}
                />

                <input
                    id={name}
                    type={tipoInput}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    spellCheck={type === 'email' ? false : undefined}
                    required={Boolean(rules && rules.required)}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${name}-error` : undefined}
                    {...register(name, rules)}
                    className={`min-h-11 w-full rounded-xl border bg-slate-50 px-[45px] py-2.5 pr-12 text-sm text-text-primary outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-400 hover:bg-white focus:bg-white focus:ring-4 ${
                        error
                            ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10'
                            : 'border-slate-300 focus:border-sena focus:ring-sena/20'
                    }`}
                />

                {password && (
                    <button
                        type="button"
                        onClick={() => setVisible((prev) => !prev)}
                        aria-pressed={visible}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white/70 hover:text-sena"
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
                        id={`${name}-error`}
                        role="alert"
                        className="mt-1.5 overflow-hidden px-1 text-xs font-medium text-red-500"
                    >
                        {error.message}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    )
}

export default RegistroInput