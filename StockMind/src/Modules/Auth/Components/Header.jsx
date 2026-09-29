import Capa1 from '../../../assets/Capa 1.svg'
import useSeccionActiva from '../Hooks/Secciones'

const SECCIONES = [
    'inicio',
    'nosotros',
    'servicios',
    'contacto'
]

const Header = () => {
    const {
        seccionActiva,
        irASeccion
    } = useSeccionActiva(SECCIONES)

    const navClass = (id) =>
        `relative border-none bg-transparent px-5 py-2.5 text-sm transition-all duration-300 ${
            seccionActiva === id
                ? 'font-semibold text-[#39A900]'
                : 'font-medium text-gray-600 hover:text-[#39A900]'
        } after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:-translate-x-1/2 after:rounded-full after:bg-[#39A900] after:transition-all after:duration-300 ${
            seccionActiva === id
                ? 'after:w-5'
                : 'after:w-0 hover:after:w-5'
        }`

    return (
        <header className="sticky top-0 z-[1000] px-4 pt-4 sm:px-6">
            <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between rounded-2xl border border-gray-200/70 bg-white/95 px-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:px-7">

                <button
                    type="button"
                    onClick={() => irASeccion('inicio')}
                    className="flex shrink-0 border-none bg-transparent"
                >
                    <img
                        src={Capa1}
                        alt="StockMind"
                        className="h-[58px] w-auto max-w-[190px] object-contain"
                    />
                </button>

                <nav className="hidden items-center gap-1 md:flex">

                    <button
                        type="button"
                        onClick={() => irASeccion('inicio')}
                        className={navClass('inicio')}
                    >
                        Inicio
                    </button>

                    <button
                        type="button"
                        onClick={() => irASeccion('nosotros')}
                        className={navClass('nosotros')}
                    >
                        Nosotros
                    </button>

                    <button
                        type="button"
                        onClick={() => irASeccion('servicios')}
                        className={navClass('servicios')}
                    >
                        Servicios
                    </button>

                    <button
                        type="button"
                        onClick={() => irASeccion('contacto')}
                        className={navClass('contacto')}
                    >
                        Contacto
                    </button>

                </nav>

                <a
                    href="/login"
                    className="rounded-xl bg-[#39A900] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#2f8f00] sm:px-6"
                >
                    Acceder
                </a>

            </div>
        </header>
    )
}

export default Header