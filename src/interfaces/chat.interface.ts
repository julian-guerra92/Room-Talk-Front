import { User } from "./user.interface";

export type ChatType = 'public' | 'private';

export interface Chat {
   _id: string;
   name: string;
   type: ChatType;
   description?: string;
   participants: User[];
   referenceImage?: string;
}


export interface FormDataChat {
   name: string;
   description: string;
   referenceImage?: any;
}