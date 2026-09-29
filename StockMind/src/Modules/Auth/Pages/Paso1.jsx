import RegistroHeader from "../Components/RegistroHeader"
import RegistroRol from '../Components/RegistroRol'
import RegistroFooter from '../Components/RegistroFooter'
import { registroData } from "../Data/RegistroData"

const RegistroPaso1 = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-background px-5 py-8">
            <div className="w-full max-w-[700px] rounded-[20px] bg-white px-6 py-10 shadow-[0_15px_35px_rgba(0,0,0,0.10)] sm:px-10 sm:py-12">

                <RegistroHeader
                    logo={registroData.logo}
                    titulo={registroData.titulo}
                    descripcion={registroData.descripcion}
                />

                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {registroData.roles.map((rol) => (
                        <RegistroRol
                            key={rol.tipo}
                            rol={rol}
                        />
                    ))}
                </section>

                <RegistroFooter
                    texto={registroData.login.texto}
                    enlace={registroData.login.enlace}
                    ruta={registroData.login.ruta}
                />

            </div>
        </main>
    )
}

export default RegistroPaso1