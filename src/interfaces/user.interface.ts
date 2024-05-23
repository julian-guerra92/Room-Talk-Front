export interface User {
   _id: string;
   addres: string;
   email: string;
   image: string;
   name: string;
   password: string;
   role: string;
}

export interface FormDataUser {
   name: string;
   email: string;
   address: string;
   file?: any;
}

