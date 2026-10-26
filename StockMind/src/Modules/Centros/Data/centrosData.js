// Centros de formación (datos de prueba)
const centrosData = [
    { id: 1, nombre: 'Centro de Comercio y Servicios', sigla: 'CCYS', ciudad: 'Popayán', estado: 'Activa' },
    { id: 2, nombre: 'Centro de Teleinformática y Producción Industrial', sigla: 'CTPI', ciudad: 'Popayán', estado: 'Activa' },
    { id: 3, nombre: 'Centro Agropecuario', sigla: 'CAP', ciudad: 'Popayán', estado: 'Activa' },
]

export const buscarCentro = (id) => centrosData.find((centro) => centro.id === Number(id))

export default centrosData
