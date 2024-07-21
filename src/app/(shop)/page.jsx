'use client';
import { useEffect, useState } from 'react';
import { ProductGrid, Title } from '@/components';
import axios from 'axios';
import { useStore } from 'zustand';
import { usersStore } from '@/store/ui/user-store';
import verifyAuthStatus from './api/user.js'

export default function Home() {
  const [products, setProducts] = useState([]);

  const loadUser = useStore(usersStore, (state) => state.loadUser);
  const auth = useStore(usersStore, (state) => state.isAuthenticated);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await axios.get('http://localhost:8080/api/products/');
        setProducts(result.data.payload.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts()
  }, []);

  return (
    <div className='flex flex-col w-full items-center justify-center'>
      <Title title='Shop' />
      <ProductGrid products={products} />
    </div>
  );
}
