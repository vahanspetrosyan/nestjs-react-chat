const HOSTS = import.meta.env.VITE_API_ENDPOINT ?? 'http://localhost:3003';
const API_URL = `${HOSTS}`;
const SOCKET_URL = `${HOSTS}/chat`;

export { API_URL, SOCKET_URL };
