import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

// Interceptors
axiosClient.interceptors.request.use((config) => {
  // Do something before request is sent
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "ACCESS_TOKEN"
  )}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
