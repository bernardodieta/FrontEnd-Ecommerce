'use client'
import { Sidebar, TopMenu } from "@/components"
import { useStore } from 'zustand';
import { usersStore } from '@/store/ui/user-store';
import verifyAuthStatus from './api/user.js'
import { useEffect, useState } from "react";

export default function ({ children }) {
    const loadUser = useStore(usersStore, (state) => state.loadUser);
    const isAuthenticated = useStore(usersStore, (state) => state.isAuthenticated);

    useEffect(() => {
        const verify = async () => {
            const result = await verifyAuthStatus()
            //console.log(result);
        }
        verify()
    }, []);
    return (
        <main className="min-h-screen">
            <TopMenu />
            <Sidebar />
            <div className="px-0 sm:px-10 text-center">
                {children}
            </div>
        </main>
    )
}