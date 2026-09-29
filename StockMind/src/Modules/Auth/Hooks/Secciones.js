import { useEffect, useState } from 'react'

const useSeccionActiva = (secciones) => {
    const [seccionActiva, setSeccionActiva] = useState(secciones[0])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibles = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            Math.abs(a.boundingClientRect.top) -
                            Math.abs(b.boundingClientRect.top)
                    )

                if (visibles.length > 0) {
                    setSeccionActiva(visibles[0].target.id)
                }
            },
            {
                threshold: 0,
                rootMargin: '-100px 0px -50% 0px'
            }
        )

        secciones.forEach((id) => {
            const elemento = document.getElementById(id)

            if (elemento) {
                observer.observe(elemento)
            }
        })

        return () => observer.disconnect()
    }, [secciones])

    const irASeccion = (id) => {
        const elemento = document.getElementById(id)

        if (!elemento) return

        const headerOffset = 100
        const posicion =
            elemento.getBoundingClientRect().top +
            window.scrollY -
            headerOffset

        window.scrollTo({
            top: posicion,
            behavior: 'smooth'
        })

        setSeccionActiva(id)
    }

    return {
        seccionActiva,
        irASeccion
    }
}

export default useSeccionActiva