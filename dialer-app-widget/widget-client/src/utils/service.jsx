import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "@reduxjs/toolkit";

// import { logout } from "../store/slices/user";
// import { getDeviceId } from "./functions";
// import AuthService from "../services/auth.service";
// import { publicEndpoints } from "../config/api";

const service = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // baseURL: "http://localhost:3030/api/1.0",
  timeout: 60000,
});

const setupInterceptors = (store) => {
  service.interceptors.request.use(
    async (config) => {
      // const token = localStorage.getItem("token");
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDViN2RhNWY1Zjc2ZTJiOGVmNDBlMmUiLCJwaG9uZSI6IjExMjIzMzQ0NTUiLCJlbWFpbCI6InNhbXBsZUBnbWFpbC5jb20iLCJzZXNzaW9uSWQiOiJlNTg0ZGZkOC1hYzUzLTRiNjgtODViNC05ZmI0YTczYjUxNzEiLCJpYXQiOjE2ODU4OTAzNzUsImV4cCI6MTY4NjA2MzE3NX0.gtyvLzkhdGVcfbrZXLEPRcy-DI5RuRgQwHQz-gMVocE"; 
      config.headers.Accept = "application/json";

      config.headers["App-Type"] = "web";
      if (token) {
        //JWT token added to the header
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );
  service.interceptors.response.use(
    (response) => {
      //for success response, same response gets send to the method that called
      return response;
    },
    async (error) => {
      let originalRequest = error.config;
      // for errror response, if its unauthorized error(token expiry) and if the end point is not a public endpoint request to fetch new token will be send with refresh token
      // if (
      //   error?.response?.status === 401 &&
      //   !originalRequest._retry &&
      //   !publicEndpoints.includes(originalRequest.url)
      // ) {
      //   originalRequest._retry = true;
      //   return AuthService.refreshToken()
      //     .then((response) => {
      //       if (response.statusCode === 200) {
      //         //if new token is fetched original request is send again and the response will be given to the method that called it.
      //         return axios(originalRequest);
      //       } else {
      //         throw new Error(response.message || "");
      //       }
      //     })
      //     .catch((err) => {
      //       // if error response => user will be logged out
      //       toast.error(
      //         error?.response?.data?.message || "Something went wrong!"
      //       );
      //       store.dispatch(logout() as any);
      //       return Promise.reject(error.config ? error.response.data : error);
      //     });
      // } else {
      //   //for other cases error response will passed to the method
      //   return error?.response;
      // }
    }
  );
};
export { setupInterceptors };
export default service;
