
import { create } from 'zustand';

export const usersStore = create((set) => ({
    user: [],
    isAuthenticated: false,
    loadUser: (userLogin) => set({
        user: userLogin,
        isAuthenticated: true,
    }),

    setUser: (userdata) => set({
        user: userdata,
        isAuthenticated: true,
    }),
    clearUser: () => set({
        user: null,
        isAuthenticated: false,
    }),
}));
