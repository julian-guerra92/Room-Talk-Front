import axios from 'axios';

const roomTalkApi = axios.create({
   baseURL: 'http://localhost:8080/api',
   // baseURL: 'https://5j4hxxhk-8080.use2.devtunnels.ms/api',
});

export default roomTalkApi;