import { usersApi } from "@/api/usersApi";
import { usersStore } from "@/store/ui/user-store";
export const login = async (userData) => {

    try {
        const resp = await usersApi.post('/users/login', userData)
        console.log(resp)
        if (resp.status === 200) {
            const userLogin = resp.data.payload;
            console.log('userLogin', userLogin)
            usersStore.getState().setUser(userLogin);
            return true
        }

    } catch (error) {
        console.log(error)
        return false
    }
}