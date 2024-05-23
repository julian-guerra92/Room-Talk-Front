import roomTalkApi from "@/api/room-talk-api";
import { LogginInterface } from "@/interfaces/auth.interface";
import { RegisterUser } from "@/interfaces/register.interface";
import { UpdatePassword } from "@/interfaces/updatePassword.interface";
import { FormDataUser } from "@/interfaces/user.interface";


export const loggin = async (email: string, password: string): Promise<any> => {
   const body: LogginInterface = {
      email,
      password
   }
   try {
      const { data } = await roomTalkApi.post('/auth/login', body);
      return data;
   } catch (error) {
      console.log(error)
   }
}

export const registerUser = async (name: string, email: string, address: string, password: string): Promise<any> => {
   const body: RegisterUser = {
      name,
      email,
      password,
      address
   }
   try {
      const { data } = await roomTalkApi.post('/auth/register', body);
      return data;
   } catch (error) {
      console.log(error)
   }
}

export const updatePassword = async (id: string, oldPassword: string, newPassword: string): Promise<any> => {
   const body: UpdatePassword = {
      id,
      oldPassword,
      newPassword
   }
   try {
      const { data } = await roomTalkApi.put('/users/update-password', body);
      return data;
   } catch (error) {
      console.log(error)
   }
}

export const updateUser = async (file: any, name: string, email: string, address: string): Promise<any> => {
   const formData = new FormData();
   formData.append('name', name);
   formData.append('email', email);
   formData.append('address', address);
   formData.append('file', file);

   try {
      const { data } = await roomTalkApi.put('/users/update', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      return data;
   } catch (error) {
      console.log(error)
   }
}