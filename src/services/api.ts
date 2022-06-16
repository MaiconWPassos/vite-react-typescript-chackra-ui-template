import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: { "Access-Control-Allow-Origin": "*" },
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw error.response;
  }
);

export default api;
