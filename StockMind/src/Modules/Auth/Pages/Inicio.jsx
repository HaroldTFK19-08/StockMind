import { useEffect, useRef } from "react"
import Header from "../Components/Header"
import Seccion_inicio from "../Components/SeccionIntroductorio"
import Nosotros from "../Components/Nosotros"
import Servicios from "../Components/Servicios"
import Contactos from "../Components/Contactos"
import Footer from "../Components/Footer"

export default function Inicio() {
    const inicioRef = useRef(null)

    useEffect(() => {
        const cards = inicioRef.current?.querySelectorAll(".auth-landing-card")
        if (!cards?.length) return

        if (!("IntersectionObserver" in window)) {
            cards.forEach((card) => card.classList.add("is-visible"))
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible")
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.15, rootMargin: "0px 0px -24px 0px" },
        )

        cards.forEach((card) => observer.observe(card))
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={inicioRef} className="m-0 min-h-screen box-border p-0 font-['Plus_Jakarta_Sans'] text-[#1F2937]">
            <Header />
            <Seccion_inicio/>
            <Nosotros/>
            <Servicios/>
            <Contactos/>
            <Footer/>
        </div>
    )
}