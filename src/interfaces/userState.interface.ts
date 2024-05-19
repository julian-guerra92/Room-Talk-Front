import { userSession } from "./userSession.interface";

export interface UserState {
    user: userSession|null,
    setUser: (user: userSession) => void,

    clearUser: () => void;
    
}