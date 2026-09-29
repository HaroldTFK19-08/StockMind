import { useEffect, useState } from 'react'

const useLoginAnimation = () => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(true)
        }, 100)
        return () => clearTimeout(timer)
    }, [])
    return {
        visible
    }
}
export default useLoginAnimation