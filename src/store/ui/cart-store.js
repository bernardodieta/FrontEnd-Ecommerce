// export default useCartStore;

import { create } from 'zustand';
import { apiCart } from '@/api/apiCart.js';

const useCartStore = create((set) => ({
    cart: [],

    addToCart: async (product, quantity) => {
        set((state) => {
            const cart = Array.isArray(state.cart) ? state.cart : [];
            const itemIndex = cart.findIndex((item) => item.product._id === product._id);

            let newCart;
            if (itemIndex > -1) {
                newCart = [...cart];
                newCart[itemIndex].quantity += quantity;
                if (newCart[itemIndex].quantity <= 0) {
                    newCart.splice(itemIndex, 1);
                }
            } else {
                newCart = [...cart, { product, quantity }];
            }
            return { cart: newCart };
        });

        const body = { productId: product._id, quantity };
        try {
            const result = await apiCart.post('/cart/add', body);
            console.log('Result de AddCart', result);
        } catch (error) {
            console.log(error);
        }
    },

    removeFromCart: async (productId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.product._id !== productId),
        }));

        try {
            const result = await apiCart.put(`/cart/remove/${productId}`);
            console.log('Result de Borrar Producto de Carrito', result);
        } catch (error) {
            console.log(error);
        }
    },

    setCart: (cart) => set({ cart: Array.isArray(cart) ? cart : [] }), // Asegúrate de que cart siempre es un array
}));

export default useCartStore;










// import { create } from 'zustand';
// import { apiCart } from '@/api/apiCart.js';


// const useCartStore = create((set) => ({
//     cart: [],
//     addToCart: async (product, quantity) => {
//         set((state) => {
//             const cart = Array.isArray(state.cart) ? state.cart : [];
//             const itemIndex = cart.findIndex((item) => item.product._id === product._id);

//             let newCart;
//             if (itemIndex > -1) {
//                 newCart = [...cart];
//                 newCart[itemIndex].quantity += quantity;
//                 if (newCart[itemIndex].quantity <= 0) {
//                     newCart.splice(itemIndex, 1);
//                 }
//             } else {
//                 newCart = [...cart, { product, quantity }];
//             }
//             return { cart: newCart };
//         });

//         const body = { productId: product._id, quantity };
//         try {
//             result = await apiCart.post('/cart/add', body);
//             console.log('Result de AddCart', result);
//         } catch (error) {
//             console.log(error);
//         }
//     },

//     removeFromCart: async (productId) => {
//         set((state) => ({
//             cart: state.cart.filter((item) => item.productId !== productId),
//         }))

//         try {
//             result = await apiCart.put(`/cart/remove/${productId}`);
//             console.log('Result de Borrar Producto de Carrito', result);
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     setCart: (cart) => set({ cart: Array.isArray(cart) ? cart : [] }), // Asegúrate de que cart siempre es un array
// }));

// export default useCartStore;
