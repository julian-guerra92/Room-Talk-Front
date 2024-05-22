export interface User {
   id: string;
   name: string;
   email: string;
   emailVerified?: Date | null;
   password: string;
   role: string;
   image?: string | null;
}

export interface FormDataUser {
   name: string;
   email: string;
   address: string;
   file?: any;
}

