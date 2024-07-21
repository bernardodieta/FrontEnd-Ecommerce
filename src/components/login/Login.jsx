'use client'
import { useState } from 'react'
import { login } from '@/app/auth/login/login.js'
import { useRouter } from 'next/navigation.js';
import Link from 'next/link';

export const LoginUsers = () => {  
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const router = useRouter()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })

    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const success = await login(user);

            if (success) {
                router.push('/');
            } else {
                console.log('oCurrio un error al setear los datos')
            }
        } catch (error) {

        }

    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        required
                        value={user.email}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        required
                        value={user.password}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                    Login
                </button>
            </form>
            <div className='flex flex-col mt-4 align-center justify-center text-center'>
                <p>No tienes una cuenta? </p>
                <Link href={'/user/'} className='p-2 bg-yellow-500 rounded-md m-2 hover:bg-yellow-600'><p>Registrate aqui </p></Link>
            </div>

        </div>


    )
}

