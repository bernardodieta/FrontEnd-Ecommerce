'use client'
import axios from 'axios';
import { usersStore } from '@/store/ui/user-store';
import useCartStore from '@/store/ui/cart-store';
import { apiCart } from '@/api/apiCart';

const verifyAuthStatus = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/auth/verify', { withCredentials: true });
    const { isAuthenticated, user } = response.data;
    //console.log(response.data);
    if (isAuthenticated == true) {
      const data = response.data;
      const initialUser = await apiCart.get('/users/');
      const initialCart = await apiCart.get('/cart');
      usersStore.getState().setUser(initialUser.data.payload);
      useCartStore.getState().setCart(initialCart.data.payload.items)
      localStorage.setItem('Data', JSON.stringify(data));

      return true
    } else {
      localStorage.clear();
      console.log('no token')
    }

  } catch (error) {
    console.log(error);

  }
}

export default verifyAuthStatus;
