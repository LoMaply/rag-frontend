import axios from 'axios';

const BASE_URL = "http://localhost:52773/csp/rag";

const username = 'superuser';
const password  = 'sys';
const credentials = btoa(`${username}:${password}`);

const axiosinstance = axios.create({
  baseURL: BASE_URL,
  headers: {'Authorization': `Basic ${credentials}`}
});

export default axiosinstance