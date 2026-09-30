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
            <div className="mb-8 text-center">
                <img
                    src={loginData.logo.stockmind}
                    alt="StockMind"
                    className="mx-auto mb-5 block w-[150px] object-contain"
                />
                <h1 className="text-[34px] font-bold tracking-[-0.5px] text-[#081B28] sm:text-[38px]">
                    {loginData.titulo}
                </h1>
            </div>
            <form
                onSubmit={handleSubmit(async (datos) => {
                    await iniciarSesion(datos)
                    navigate(loginData.rutas.inicioAprendiz)
                })}
                className="w-full"
            >
                <LoginInput
                    icon={Mail}
                    type="email"
                    name="email"
                    placeholder={loginData.correoPlaceholder}
                    register={register}
                    error={errors.email}
                />
                <LoginInput
                    icon={Lock}
                    type="password"
                    name="password"
                    placeholder={loginData.passwordPlaceholder}
                    register={register}
                    error={errors.password}
                    password
                />
                <div className="mb-5 text-center">
                    <button
                        type="button"
                        className="border-none bg-transparent p-0 text-[13px] text-gray-500 transition-colors duration-300 hover:text-[#39A900]"
                    >
                        {loginData.olvidarPassword}
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-[30px] bg-[#39A900] px-5 py-3.5 font-bold text-white shadow-[0_6px_18px_rgba(57,169,0,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#2f8f00] hover:shadow-[0_10px_25px_rgba(57,169,0,0.28)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
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
        </div>
    )
}
export default LoginFormulario

