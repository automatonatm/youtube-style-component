import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:2000/api",
    credentials: 'include',
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

export default api