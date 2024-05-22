import axios from 'axios';

const roomTalkApi = axios.create({
   baseURL: 'https://room-talk-api.azurewebsites.net/api',
});

export default roomTalkApi;