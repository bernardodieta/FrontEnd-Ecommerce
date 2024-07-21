'use client'
import { useUIStore } from "@/store/ui/ui-store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonOutline, IoSearchOutline, IoTicketOutline } from "react-icons/io5"
import { usersStore } from "@/store/ui/user-store";
import { logout } from "@/app/auth/logout/logout"
import { useRouter } from 'next/router';

export const Sidebar = () => {
    const router = useRouter
    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen)
    const closeMenu = useUIStore(state => state.closeSideMenu)
    const user = usersStore((state) => state.user);
    //console.log('user2', user);
    const handleLogout = async (e) => {
        e.preventDefault();
        const success = await logout();
        if (success) {
            window.location.href = '/';
        } else {
            console.error('Logout failed');
        }
    };
    return (
        <div>

            {
                isSideMenuOpen && (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
                )
            }

            {
                isSideMenuOpen && (
                    <div
                        onClick={closeMenu}
                        className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm" />
                )
            }


            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )
            }>

                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={closeMenu}
                />

                {user && user.role != '' &&
                    <Link href='/profile'
                        className="flex items-center mt-20 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoPersonOutline size={25} />
                        <span className="ml-3 text-lg">Mi Perfil</span>
                    </Link>
                }
                {user && user.role != '' &&
                    <Link href='/'
                        className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoTicketOutline size={25} />
                        <span className="ml-3 text-lg">Mis Ordenes</span>
                    </Link>
                }
                {user && user.role === 'PREMIUM' &&
                    <Link href='/admin'
                        className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoLogInOutline size={25} />
                        <span className="ml-3 text-lg">Menu de ventas</span>
                    </Link>
                }
                {!user.role &&
                    <Link href='/auth/login'
                        className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoLogInOutline size={25} />
                        <span className="ml-3 text-lg">Ingresar</span>
                    </Link>
                }
                {!user &&
                    <Link href='/user/'
                        className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all">
                        <IoLogInOutline size={25} />
                        <span className="ml-3 text-lg">Registrarme</span>
                    </Link>
                }

                {
                    user &&
                    <Link href='/auth/logout'
                        className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={handleLogout}>
                        <IoLogOutOutline size={25} />
                        <span className="ml-3 text-lg">Salir</span>
                    </Link>
                }



            </nav>

        </div>
    )
}
