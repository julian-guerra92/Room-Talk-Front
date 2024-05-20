import { UserSession } from '@/interfaces/userSession.interface';
import { create } from 'zustand';
import { persist } from "zustand/middleware";


interface State {
    session: UserSession | null;
    setSession: (user: UserSession) => void;
    clearSession: () => void;
}

export const useUserStore = create<State>()(
    persist(
        (set, get) => ({
            session: null,
            setSession: (user) => {
                console.log('settingUser', user)
                set({ session: user })
            },
            clearSession: () => set({ session: null })
        }),
        {
            name: 'user-session',
        }
    )
);