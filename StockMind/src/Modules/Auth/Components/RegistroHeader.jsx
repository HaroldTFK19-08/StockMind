const RegistroHeader = ({ logo, titulo, descripcion }) => {
    return (
        <header className="mb-10 text-center">
            <img
                src={logo}
                alt="Logo StockMind"
                className="mx-auto mb-6 block w-[150px] object-contain"
            />

            <h1 className="mb-3 text-2xl font-bold tracking-[-0.5px] text-text-primary sm:text-[30px]">
                {titulo}
            </h1>

            <p className="mx-auto max-w-[520px] text-sm leading-6 text-text-secondary">
                {descripcion}
            </p>
        </header>
    )
}

export default RegistroHeader