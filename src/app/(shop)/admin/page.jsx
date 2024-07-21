'use client';
import { useEffect } from 'react';

import Link from "next/link"



const AdminPage = () => {
    useEffect(() => {
        const fetchCart = async () => {

        };
        fetchCart();
    }, []);
    return (
        <div className='container flex flex-col justify-center items-center  mx-auto'>
            <h1>Menu de administracion de productos</h1>
            <Link href='/admin/addProduct'
                className="flex justify-center items-center mt-4 p-2 bg-blue-500 hover:bg-blue-100 rounded transition-all text-white w-80">
                Vender un producto
            </Link>

            <Link href='/admin/addProduct'
                className="flex justify-center items-center mt-4 p-2 bg-blue-500 hover:bg-blue-100 rounded transition-all text-white w-80">
                Ver todos mis productos
            </Link>
            <Link href='/admin/addProduct'
                className="flex justify-center items-center mt-4 p-2 bg-blue-500 hover:bg-blue-100 rounded transition-all text-white w-80">
                Editar un producto
            </Link>
            <Link href='/admin/addProduct'
                className="flex justify-center items-center mt-4 p-2 bg-blue-500 hover:bg-blue-100 rounded transition-all text-white w-80">
                Eliminar un producto
            </Link>


        </div>
    )
}

AdminPage.displayName = 'AdminPage'

export default AdminPage