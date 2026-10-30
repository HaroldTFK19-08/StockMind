export const ObterCategorias = async () => {
    const response = await fetch("/categorias")

    if (!response.ok) {
        throw new Error(`Error al obtener categorías: ${response.status}`)
    }

    return response.json()
}