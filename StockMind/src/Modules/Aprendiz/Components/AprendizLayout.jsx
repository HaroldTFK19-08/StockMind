
import { Outlet } from 'react-router-dom'
import NavbarAprendiz from '../Components/NavbarAprendiz'

const AprendizLayout = () => {
    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <NavbarAprendiz />

            <main className="ml-[250px] min-h-screen w-[calc(100%-250px)] bg-[#f8f9fa]">
                <Outlet />
            </main>
        </div>
    )
}

export default AprendizLayout
