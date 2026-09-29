import Header from "../Components/Header"
import Seccion_inicio from "../Components/SeccionIntroductorio"
import Nosotros from "../Components/Nosotros"
import Servicios from "../Components/Servicios"
import Contactos from "../Components/Contactos"
import Footer from "../Components/Footer"

export default function Inicio() {
    return (
        <div className="m-0 min-h-screen box-border p-0 font-['Plus_Jakarta_Sans'] text-[#1F2937]">
            <Header />
            <Seccion_inicio/>
            <Nosotros/>
            <Servicios/>
            <Contactos/>
            <Footer/>
        </div>
    )
}