import axios from 'axios';

const roomTalkApi = axios.create({
   // baseURL: 'https://room-talk-api.azurewebsites.net/api',
   baseURL: 'http://localhost:8080/api',
});

export default roomTalkApi;