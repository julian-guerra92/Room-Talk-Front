import axios from 'axios';

const roomTalkApi = axios.create({
   baseURL: 'http://localhost:8080/api',
});

export default roomTalkApi;