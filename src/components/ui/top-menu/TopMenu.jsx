'use client'
import { useUIStore } from "@/store"
import Link from "next/link"
import { usersStore } from "@/store/ui/user-store";
import useCartStore from '@/store/ui/cart-store';
import { IoSearchOutline, IoCartOutline } from 'react-icons/io5'

export const TopMenu = () => {
    const openSideMenu = useUIStore(state => state.openSideMenu);
    const cart = useCartStore(state => state.cart);
    const dataUser = usersStore(state => state.user);
    

    const totalProductInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="flex px-5 justify-between items-center w-full">
            <div>
                <Link href='/'>
                    <span>Bienvenido </span>
                    <span>{dataUser && dataUser.firstName || 'Invitado '}</span>
                </Link>
            </div>
            <div className="hidden sm:block">
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-600" href={'/category/Laptops'}>Laptops</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-600" href={'/category/Televisores'}>Televisores</Link>
                <Link className="m-2 p-2 rounded-md transition-all hover:bg-gray-600" href={'/category/Celulares'}>Celulares</Link>
            </div>

            <div className="flex items-center">
                <Link href='/search' className="mx-2">
                    <IoSearchOutline className="w-t h-7" />
                </Link>
                <Link href='/cart' className="mx-2">
                    <div className="relative">
                        <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2  text-white bg-blue-800">{totalProductInCart}</span>
                        <IoCartOutline className="w-t h-7" />
                    </div>
                </Link>
                <button
                    onClick={openSideMenu}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100">
                    Menú
                </button>
            </div>
        </nav>
    )
}
