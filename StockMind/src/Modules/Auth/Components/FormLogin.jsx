import { Mail, Lock, LoaderCircle } from 'lucide-react'
import LoginInput from './LoginInput'
import useLogin from '../Hooks/LoginCampos'
import { loginData } from '../Data/Informacion'
import { useNavigate } from 'react-router-dom'

const LoginFormulario = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        iniciarSesion,
        errors,
        isSubmitting
    } = useLogin()
    return (
        <div className="w-full">
            {/* Encabezado del formulario de acceso (logo + título) */}
            <div className="mb-8 text-center">
                <img
                    src={loginData.logo.stockmind}
                    alt="StockMind"
                    className="mx-auto mb-5 block w-[150px] object-contain"
                />
                <h1 className="text-[34px] font-bold tracking-[-0.5px] text-[#081B28] sm:text-[38px]">
                    {loginData.titulo}
                </h1>
                <p className="mt-2 text-sm text-[#64748b]">Ingresa tus credenciales para continuar</p>
            </div>

            {/* Formulario de inicio de sesión (validación con react-hook-form y navegación segura) */}
            <form
                onSubmit={handleSubmit(async (datos) => {
                    const rutaPanel = await iniciarSesion(datos)

                    // Solo navegamos a rutas internas de la app (empiezan por "/") para evitar redirecciones externas.
                    const rutaSegura = typeof rutaPanel === 'string' && rutaPanel.startsWith('/') && !rutaPanel.startsWith('//')
                        ? rutaPanel
                        : '/aprendiz/home'

                    navigate(rutaSegura, { replace: true })
                })}
                className="w-full space-y-1"
            >
                {/* Campo de correo */}
                <LoginInput
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder={loginData.correoPlaceholder}
                    register={register}
                    error={errors.email}
                />

                {/* Campo de contraseña */}
                <LoginInput
                    icon={Lock}
                    type="password"
                    name="password"
                    placeholder={loginData.passwordPlaceholder}
                    register={register}
                    error={errors.password}
                    password
                />

                {/* Acción secundaria: recuperación de contraseña (pendiente de flujo real) */}
                <div className="mb-5 pt-1 text-center">
                    <button
                        type="button"
                        className="rounded-md px-2 py-1 text-[13px] font-medium text-gray-500 transition-colors duration-300 hover:bg-[#f3f6f2] hover:text-[#39A900]"
                    >
                        {loginData.olvidarPassword}
                    </button>
                </div>

                {/* Botón principal de envío */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#2f8f00] px-5 py-3.5 font-bold text-white shadow-[0_8px_20px_rgba(57,169,0,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#277500] hover:shadow-[0_12px_26px_rgba(57,169,0,0.24)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isSubmitting ? (
                        <>
                            <LoaderCircle
                                size={18}
                                className="animate-spin"
                            />
                            INICIANDO...
                        </>
                    ) : (
                        loginData.botonLogin
                    )}
                </button>
            </form>

            {/* Texto de ayuda/demo (informativo) */}
            <p className="mt-5 rounded-xl border border-[#edf2f7] bg-[#fbfdfb] px-4 py-3 text-center text-xs leading-5 text-gray-500">
                {loginData.ayudaDemo}
            </p>
        </div>
    )
}
export default LoginFormulario

