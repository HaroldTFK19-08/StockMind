import Imagen_inicio from '../../../assets/imagenInicio.png'

const Seccion_inicio = () => {
    return (
        <section
            id="inicio"
            className="flex min-h-[80vh] items-center justify-center bg-white px-[5%] py-20 lg:py-[100px]"
        >
            <div className="flex w-full max-w-[1200px] flex-col items-center gap-12 lg:flex-row lg:gap-[50px]">

                <div className="flex-1">
                    <h1 className="mb-5 text-5xl font-black leading-none text-[#1d1c1c] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
                        StockMind
                    </h1>

                    <p className="mb-8 text-base leading-[1.7] text-[#4b5563] sm:text-lg lg:mb-[35px]">
                        StockMind es un sistema de gestión de inventarios desarrollado para controlar,
                        organizar y administrar de manera eficiente los bienes del <strong>SENA</strong>,
                        permitiendo una gestión integral de los recursos institucionales.
                    </p>
                </div>

                <div className="flex flex-1 justify-center">
                    <img
                        src={Imagen_inicio}
                        alt="Sistema de gestión de inventarios StockMind"
                        className="h-auto w-full max-w-[650px] rounded-[30px] shadow-[20px_20px_60px_#d9d9d9,-20px_-20px_60px_#ffffff]"
                    />
                </div>

            </div>
        </section>
    )
}

export default Seccion_inicio