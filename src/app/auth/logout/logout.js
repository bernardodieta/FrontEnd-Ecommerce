import axios from 'axios';

export const logout = async () => {
    try {
        const response = await axios.post('https://ecommerce-fullbackend-production.up.railway.app/api/users/logout', {}, { withCredentials: true });
        return response.status === 200;
    } catch (error) {
        console.error('Error logging out:', error);
        return false;
    }
};