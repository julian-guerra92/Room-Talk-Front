import { UserState } from '@/interfaces/userState.interface';
import { clearScreenDown } from 'readline';
import { create } from 'zustand'

export const stateUser = create<UserState>((set, get) => ({
    user: null,
    setUser: (user) => {
        console.log('settingUser', user)
        set({user})
    },

    clearUser: () => set({}, true)//usar en el logout
}));