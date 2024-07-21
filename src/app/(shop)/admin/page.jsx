'use client';
import { useEffect } from 'react';
import verifyAuthStatus from '@/api/user';
import Link from "next/link"



export default function () {
    useEffect(() => {
        const fetchCart = async () => {
            //const data = await verifyAuthStatus();
            console.log(data);
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