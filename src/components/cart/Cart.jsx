'use client';

import useCartStore from '@/store/ui/cart-store';
import { usersStore } from '@/store/ui/user-store';
import { useRouter } from "next/navigation";

export const Cart = () => {
    const router = useRouter()

    const user = usersStore((state) => state.user);
    const cart = useCartStore((state) => state.cart);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    let totalCalc = 0;
    let totalProductPrice = 0;
    console.log(cart);

    const handleAdd = async (product, quantity) => {
        await addToCart(product, quantity);
    };

    const handleRemove = async (productId) => {
        await removeFromCart(productId);
    };
    const handleprePurchase = async () => {
        try {          
            router.push('/checkout/', )

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="cart-items p-4 bg-gray-100 rounded-lg shadow-lg">
            {cart.length > 0 ? (
                <>
                    {cart.map((item) => (
                        <div key={item.product?._id} className="cart-item p-4 bg-white rounded-lg shadow mb-4">
                            <div className="product-info mb-4">
                                <h3 className="text-lg font-semibold">{item.product?.title.substring(0, 30) || 'Product Title Missing'}</h3>
                                <h3 className="text-green-600">Tienes envío gratis para este producto.</h3>
                                <h2 className="text-blue-500">24 meses sin intereses.</h2>
                                <p className="item-price text-gray-700">Precio: ${item.product?.price || 'N/A'}</p>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleRemove(item.product?._id)}>Eliminar</button>
                                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Guardar para después</button>
                            </div>
                            <div className="flex items-center mb-4">
                                Cantidad:
                                <button className="bg-blue-500 text-white px-2 py-1 rounded ml-2" onClick={() => handleAdd(item.product, 1)}>+</button>
                                <p className="item-quantity mx-2">{item.quantity}</p>
                                <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleAdd(item.product, -1)}>-</button>
                            </div>
                            <div className="text-gray-700">Total por {item.quantity} unidades: ${totalProductPrice = item.product?.price * item.quantity}</div>
                            {totalCalc += totalProductPrice}
                        </div>
                    ))}
                    <div className="total p-4 bg-white rounded-lg shadow mt-4">
                        <h2 className="text-xl font-bold">Costo Total: ${totalCalc}</h2>
                    </div>
                </>
            ) : (
                <p className="text-gray-700">No hay productos en tu carrito.</p>
            )}
            <div className="mt-4">
                <button type="button" className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handleprePurchase()}>Continuar comprar</button>
            </div>
        </div>
    );
};
