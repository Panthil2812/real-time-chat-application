import axios from "axios";
import { BACKEND_BASE_URL } from "./baseurl";
const BACKEND_URL = BACKEND_BASE_URL;
const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    if (
      config.url !== "user/add-new-user" &&
      config.url !== "user/user-sign-in"
    ) {
      const token = localStorage.getItem("token");
      config.headers = {
        Authorization: `${token}`,
        Accept: "application/json",
      };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async function (response) {
    // Do something with response data
    const result = response;

    return result.data;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosInstance;
