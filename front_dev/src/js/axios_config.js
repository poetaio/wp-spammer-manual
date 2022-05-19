const API_PROTOCOL = "http";
const API_HOST = "localhost";
const API_PORT = "8882";
const API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;


const api = axios.create({
    baseURL: API_URL,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
  });
