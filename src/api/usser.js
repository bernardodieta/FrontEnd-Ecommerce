import { usersStore } from "@/store/ui/user-store";

const verifyAuthStatus = async () => {
  try {

    const response = await fetch('http://localhost:8080/api/users/auth/verify', {

      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.log('No autorizado o error de servidor');
      usersStore.getState().clearUser();
      // Borrar la cookie del navegador      
      localStorage.clear();
    } else {
      const data = await response.json();
      localStorage.setItem('Data', JSON.stringify(data));
    }
    return data;
  } catch (error) {
    console.error('Error al verificar estado de autenticación:', error);
    throw error;
  }
};

export default verifyAuthStatus;
