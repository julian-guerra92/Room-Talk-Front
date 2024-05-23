import { User } from "@/interfaces";
import roomTalkApi from "@/api/room-talk-api";


export const getAllUSers = async (): Promise<User[] | null> => {
   try {
      const { data } = await roomTalkApi.get('/users/get-all');
      return data;
   } catch (error) {
      console.log(error);
      return null;
   }
}