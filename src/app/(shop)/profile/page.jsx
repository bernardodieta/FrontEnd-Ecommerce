'use client';
import { usersStore } from "@/store/ui/user-store";
import { AddressList } from "@/components/ui/address/AddressList";

export default function Profile() {
    const dataUser = usersStore((state) => state.user);
    console.log(dataUser);
    return (
        <div className="flex flex-col w-1/2 mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Perfil de {dataUser.firstName} {dataUser.lastName}</h2>
            <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h2 className="text-xl font-semibold mb-2">Datos del Usuario</h2>
                <div className="text-gray-700">
                    <h3 className="mb-1"><span className="font-semibold">Nombre:</span> {dataUser.firstName}</h3>
                    <h3 className="mb-1"><span className="font-semibold">Apellido:</span> {dataUser.lastName}</h3>
                    <h3 className="mb-1"><span className="font-semibold">Email:</span> {dataUser.email}</h3>
                    <h3 className="mb-1"><span className="font-semibold">Rol:</span> {dataUser.role}</h3>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-2">Direcciones de envío</h2>
                <AddressList />
            </div>
        </div>
    );
}
