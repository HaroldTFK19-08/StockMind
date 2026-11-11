export const buscarTituloRuta = (pathname, enlaces, titulosExtra = {}) => {
    const titulos = { ...titulosExtra }
    enlaces.forEach((enlace) => {
        titulos[enlace.ruta] = titulos[enlace.ruta] ?? enlace.titulo
    })

    let ruta = pathname.replace(/\/+$/, '')
    while (ruta) {
        if (titulos[ruta]) return titulos[ruta]
        ruta = ruta.slice(0, ruta.lastIndexOf('/'))
    }

    return ''
}
