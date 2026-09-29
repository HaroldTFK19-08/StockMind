import { Link } from 'react-router-dom'

const RegistroFooter = ({ texto, enlace, ruta }) => {
    return (
        <footer className="mt-10 text-center">
            <p className="text-sm text-text-secondary">
                {texto}{' '}
                <Link
                    to={ruta}
                    className="font-semibold text-sena transition-colors duration-300 hover:text-sena-dark"
                >
                    {enlace}
                </Link>
            </p>
        </footer>
    )
}

export default RegistroFooter