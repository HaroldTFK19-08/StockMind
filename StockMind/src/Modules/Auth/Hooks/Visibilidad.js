import { useState } from 'react'

const Visibilidad = () => {
    const [visible, setVisible] = useState(false)

    const alternarVisibilidad = () => {
        setVisible((prev) => !prev)
    }

    return {
        visible,
        alternarVisibilidad
    }
}

export default Visibilidad