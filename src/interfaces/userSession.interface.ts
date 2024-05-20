export interface UserSession {
    id: string;
    name: string;
    email: string;
    address: string;
    role: string;
    image?: string | null;
}