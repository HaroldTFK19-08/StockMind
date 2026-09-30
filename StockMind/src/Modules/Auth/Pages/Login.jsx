import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import LoginFormulario from '../Components/FormLogin'
import LoginLateral from '../Components/LoginLateral'

import useLoginAnimation from '../Hooks/AnimacionLogin'

import { loginData } from '../Data/Informacion'

const Login = () => {
    const { visible } = useLoginAnimation()
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F7F9F6] px-5 py-8">
            <div
                className={`relative flex min-h-[550px] w-full max-w-[900px] overflow-hidden rounded-[20px] bg-white shadow-[0_15px_35px_rgba(0,0,0,0.10)] transition-all duration-700 ${
                    visible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-6 opacity-0'
                }`}
            >
                <section className="relative flex w-full flex-col justify-center px-8 py-16 sm:px-12 lg:w-1/2">
                    <Link
                        to={loginData.rutas.inicio}
                        title="Volver"
                        className="group absolute left-6 top-6 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.5px] text-gray-500 opacity-70 transition-all duration-300 hover:-translate-x-1 hover:text-[#39A900] hover:opacity-100"
                    >
                        <ArrowLeft
                            size={19}
                            strokeWidth={2.5}
                        />

                        Volver
                    </Link>

                    <LoginFormulario />
                </section>

                <LoginLateral />
            </div>
        </main>
    )
}

export default Login