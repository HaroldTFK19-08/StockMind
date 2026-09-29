import { Link } from 'react-router-dom'
import Sena from '../../../assets/SENAblanco.svg'
import { loginData } from '../Data/Informacion'

const LoginLateral = () => {
    return (
        <div className="relative hidden w-1/2 overflow-hidden bg-[#39A900] px-10 py-10 text-center text-white lg:flex lg:flex-col lg:items-center lg:justify-center">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-[#8AFD5D]/10" />
            <div className="relative z-10 max-w-[330px]">
                <h2 className="mb-5 text-[30px] font-bold leading-tight">
                    {loginData.lateral.titulo}
                </h2>
                <p className="mb-8 text-sm leading-[1.6] text-white/90">
                    {loginData.lateral.descripcion}
                </p>
                <Link
                    to={loginData.rutas.registro}
                    className="mb-10 inline-block rounded-[30px] border-2 border-white px-10 py-3 text-sm font-bold text-white transition-all duration-300 hover:bg-white hover:text-[#39A900]"
                >
                    {loginData.lateral.botonRegistro}
                </Link>
                <div className="flex justify-center">
                    <img
                        src={Sena}
                        alt="SENA"
                        className="h-auto w-[70px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default LoginLateral