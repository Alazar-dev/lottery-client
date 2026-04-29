import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api"
});

export const setAuthToken = (token: string) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};