import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor (Staples the access token to requests)
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Response Interceptor (Catches 401s and refreshes)
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // If the server says 401 Unauthorized, and we haven't retried yet...
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true;
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        try {
          // FIX 1: Use plain 'axios' here, NOT 'axiosInstance'!
          // This bypasses the request interceptor so we don't send the dead access token.
          const response = await axios.post(`${baseURL}/token/refresh/`, {
            refresh: refreshToken,
          });

          // Save the new token
          localStorage.setItem("accessToken", response.data.access);

          // Update the original request with the shiny new token
          originalRequest.headers["Authorization"] =
            `Bearer ${response.data.access}`;

          // Try the original request again
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // FIX 2: If the refresh token is ALSO dead, kick them to the login screen
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      } else {
        // If there's no refresh token in storage, kick them out
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
