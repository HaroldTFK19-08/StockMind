import LogoBlanco from '../../../assets/LOGO FULL.svg'

const Footer = () => {
    return (
        <footer className="bg-[#008000] px-[10%] pb-5 pt-[60px] font-['Poppins'] text-white">

            <div className="mb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">

                <div>
                    <img
                        src={LogoBlanco}
                        alt="StockMind"
                        className="mb-5 h-[60px] w-auto brightness-0 invert"
                    />

                    <p className="text-[0.95rem] leading-[1.6] opacity-90">
                        Solución integral para la gestión administrativa de bienes y suministros del{' '}
                        <strong>
                            Servicio Nacional de Aprendizaje (SENA)
                        </strong>.
                    </p>
                </div>

                <div>
                    <h4 className="relative mb-5 text-[1.2rem] font-bold after:mt-2 after:block after:h-[2px] after:w-[30px] after:bg-white after:content-['']">
                        Plataforma
                    </h4>

                    <ul className="list-none space-y-[10px] p-0">
                        <li className="text-[0.9rem] opacity-80">
                            Uso exclusivo SENA
                        </li>
                        <li className="text-[0.9rem] opacity-80">
                            Control de Inventario
                        </li>
                        <li className="text-[0.9rem] opacity-80">
                            Gestión de Elementos
                        </li>
                        <li className="text-[0.9rem] opacity-80">
                            Toma de Decisiones
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="relative mb-5 text-[1.2rem] font-bold after:mt-2 after:block after:h-[2px] after:w-[30px] after:bg-white after:content-['']">
                        Integral
                    </h4>

                    <ul className="list-none space-y-[10px] p-0">
                        <li className="text-[0.9rem] opacity-80">
                            Alta Disponibilidad
                        </li>
                        <li className="text-[0.9rem] opacity-80">
                            Tiempo Real
                        </li>
                        <li className="text-[0.9rem] opacity-80">
                            Integridad de Datos
                        </li>
                        <li className="text-[0.9rem] opacity-80">
                            Escalabilidad
                        </li>
                    </ul>
                </div>

            </div>

            <div className="flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-[25px] text-[0.85rem] sm:flex-row">

                <div>
                    <span>
                        © 2026 STOCKMIND | ADSO | SENA
                    </span>
                </div>

                <div className="flex items-center gap-[10px]">
                    <span>Colombia</span>
                    <span className="w-[25px] rounded-[2px] text-xl">
                        🇨🇴
                    </span>
                </div>

            </div>

        </footer>
    )
}

export default Footer