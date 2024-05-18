import roomTalkApi from "@/api/room-talk-api";
import { LogginInterface } from "@/interfaces/auth.interface";


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