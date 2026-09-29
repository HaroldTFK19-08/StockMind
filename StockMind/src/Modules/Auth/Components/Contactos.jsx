import {
    MapPin,
    Mail
} from 'lucide-react'
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter
} from 'react-icons/fa6'
const Contactos = () => {
    return (
        <section
            id="contacto"
            className="relative overflow-hidden bg-white px-[10%] py-[120px]"
        >
            <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-16 lg:flex-row lg:gap-[100px]">
                <div className="flex-1">
                    <span className="text-[0.8rem] font-extrabold uppercase tracking-[3px] text-[#39A900]">
                        Contacto Directo
                    </span>
                    <h2 className="my-5 text-4xl font-bold leading-[1.1] text-[#0f172a] sm:text-5xl lg:text-[3.5rem]">
                        Hablemos de
                        <br />
                        <span className="font-extrabold text-[#2d8500]">
                            Gestión Eficiente
                        </span>
                    </h2>
                    <div className="mt-[50px]">
                        <div className="mb-10 flex items-center gap-[25px] border-b border-[#f1f5f9] pb-5">
                            <MapPin
                                size={32}
                                strokeWidth={2}
                                className="shrink-0 text-[#39A900]"
                            />
                            <div>
                                <span className="mb-1 block text-[0.8rem] font-bold uppercase text-[#94a3b8]">
                                    Visítanos
                                </span>
                                <p className="text-lg font-medium text-[#334155]">
                                    SENA Centro de Comercio y Servicios, Popayán
                                </p>
                            </div>
                        </div>
                        <div className="mb-10 flex items-center gap-[25px] border-b border-[#f1f5f9] pb-5">
                            <Mail
                                size={32}
                                strokeWidth={2}
                                className="shrink-0 text-[#39A900]"
                            />
                            <div>
                                <span className="mb-1 block text-[0.8rem] font-bold uppercase text-[#94a3b8]">
                                    Escríbenos
                                </span>
                                <p className="text-lg font-medium text-[#334155]">
                                    soporte.stockmind@sena.edu.co
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex flex-1 justify-center">
                    <div className="absolute h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(57,169,0,0.05)_0%,rgba(255,255,255,0)_70%)]" />
                    <div className="relative z-10 text-left">
                        <p className="mb-[30px] text-xl font-bold text-[#1e293b]">
                            Síguenos en{' '}
                            <span className="text-[#39A900]">
                                @SENACauca
                            </span>
                        </p>
                        <div className="flex flex-col gap-5">
                            <a
                                href="https://www.facebook.com/SENACauca"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-[15px] text-[1.1rem] font-medium text-[#475569] transition-all duration-300 hover:translate-x-[10px] hover:text-[#39A900]"
                            >
                                <FaFacebookF
                                    size={22}
                                    className="transition-transform duration-300 group-hover:scale-125"
                                />
                                <span>Facebook</span>
                            </a>
                            <a
                                href="https://www.instagram.com/senacomunica/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-[15px] text-[1.1rem] font-medium text-[#475569] transition-all duration-300 hover:translate-x-[10px] hover:text-[#39A900]"
                            >
                                <FaInstagram
                                    size={22}
                                    className="transition-transform duration-300 group-hover:scale-125"
                                />
                                <span>Instagram</span>
                            </a>
                            <a
                                href="https://twitter.com/SENAComunica"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-[15px] text-[1.1rem] font-medium text-[#475569] transition-all duration-300 hover:translate-x-[10px] hover:text-[#39A900]"
                            >
                                <FaXTwitter
                                    size={22}
                                    className="transition-transform duration-300 group-hover:scale-125"
                                />
                                <span>Twitter / X</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contactos