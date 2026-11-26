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
        <div className="mb-0.5 w-full">
            {label && (
                <label
                    htmlFor={name}
                    className="mb-0.5 block text-xs font-semibold text-slate-700"
                >
                    {label}
                </label>
            )}

            {/* Contenedor del campo con icono y estados visuales mejorados (hover/focus/error). */}
            <div className="group relative">
                <Icon
                    size={16}
                    strokeWidth={2}
                    className={`pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
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
                    className={`min-h-9 w-full rounded-lg border bg-white px-9 py-2 pr-10 text-[13px] text-text-primary outline-none transition-all duration-300 placeholder:text-slate-400 hover:border-slate-400 focus:ring-4 ${
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
                            <EyeOff size={16} />
                        ) : (
                            <Eye size={16} />
                        )}
                    </button>
                )}
            </div>

            <div className="mt-0.5 h-3 px-1 min-[540px]:h-6 lg:h-3">
                <AnimatePresence initial={false}>
                    {error && (
                        <motion.p
                            key={error.message}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            id={`${name}-error`}
                            role="alert"
                            className="text-[10px] font-medium leading-3 text-red-500"
                        >
                            {error.message}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default RegistroInput