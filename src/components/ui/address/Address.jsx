import { useEffect, useState } from 'react';
import { usersApi } from '@/api/usersApi';
import { FaEdit, FaCity, FaFlag, FaHome, FaEnvelope, FaMapMarkerAlt, FaGlobeAmericas } from 'react-icons/fa';

export const Address = ({ address, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [editable, setEditable] = useState(false);
    const [editedAddress, setEditedAddress] = useState({ ...address });

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
        setEditable(false); 
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setEditable(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedAddress({ ...editedAddress, [name]: value });
    };

    const handleSave = async (e) => {
        e.stopPropagation(); 
        try {
            const response = await usersApi.put(`/address/${address._id}`, editedAddress, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onUpdate(response.data.payload); 
            setEditable(false); 
        } catch (error) {
            console.error('Error al actualizar la dirección:', error);
       
        }
    };


    useEffect(() => {
        setEditedAddress({ ...address });
    }, [address]);

    return (
        <div className="w-1/2 p-4 bg-yellow-100 rounded-lg shadow mb-4">
            <div onClick={handleToggle} className="cursor-pointer">
                {isExpanded ? (
                    <div>
                        <div>
                            <h3><FaCity className="inline mr-2" /> Ciudad:
                                {editable ? (
                                    <input
                                        type="text"
                                        name="city"
                                        value={editedAddress.city}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mb-2 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    <span className="font-semibold">{address.city}</span>
                                )}
                            </h3>
                            <h3><FaMapMarkerAlt className="inline mr-2" /> Estado:
                                {editable ? (
                                    <input
                                        type="text"
                                        name="state"
                                        value={editedAddress.state}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mb-2 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    <span className="font-semibold">{address.state}</span>
                                )}
                            </h3>
                            <h3><FaGlobeAmericas className="inline mr-2" /> País:
                                {editable ? (
                                    <input
                                        type="text"
                                        name="country"
                                        value={editedAddress.country}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mb-2 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    <span className="font-semibold">{address.country}</span>
                                )}
                            </h3>
                            <h3><FaHome className="inline mr-2" /> Dirección:
                                {editable ? (
                                    <input
                                        type="text"
                                        name="addressText"
                                        value={editedAddress.addressText}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mb-2 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    <span className="font-semibold">{address.addressText}</span>
                                )}
                            </h3>
                            <h3><FaEnvelope className="inline mr-2" /> Número exterior:
                                {editable ? (
                                    <input
                                        type="text"
                                        name="numext"
                                        value={editedAddress.numext}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mb-2 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    <span className="font-semibold">{address.numext}</span>
                                )}
                            </h3>
                            <h3><FaEnvelope className="inline mr-2" /> Código Postal:
                                {editable ? (
                                    <input
                                        type="text"
                                        name="zipcode"
                                        value={editedAddress.zipcode}
                                        onChange={handleChange}
                                        onClick={(e) => e.stopPropagation()}
                                        className="mb-2 p-1 border border-gray-300 rounded"
                                    />
                                ) : (
                                    <span className="font-semibold">{address.zipcode}</span>
                                )}
                            </h3>
                        </div>
                        <div className='flex flex-row gap-2'>
                            {!editable && (
                                <button onClick={handleEdit} className="flex items-center text-blue-500 bg-blue-500 p-2 mt-2 rounded shadow hover:bg-blue-800 text-white">
                                    <FaEdit className="mr-1" /> Editar
                                </button>

                            )}
                            {!editable && (
                                <button onClick={handleEdit} className="flex items-center text-blue-500 bg-red-500 p-2 mt-2 rounded shadow hover:bg-red-800 text-white">
                                    <FaEdit className="mr-1" /> Borrar
                                </button>

                            )}

                        </div>

                        {editable && (
                            <div className="flex items-center space-x-2">
                                <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Guardar
                                </button>
                                <button onClick={() => setEditable(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h3><FaCity className="inline mr-2" /> Ciudad: <span className="font-semibold">{address.city}</span></h3>
                        <p>Click para desplegar</p>
                    </div>
                )}
            </div>
        </div>
    );
};
