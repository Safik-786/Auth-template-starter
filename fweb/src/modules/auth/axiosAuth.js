import axios from "axios";

// Local variable to store the access token in memory
let accessToken = null;

// Exported getter and setter so other parts of the app (like Login/Logout) can update the token
export const getAccessToken = () => accessToken;
export const setAccessToken = (token) => {
  accessToken = token;
};

const authApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    // Read the token directly from the local variable
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        // Save the new token to the local variable
        setAccessToken(newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return authApi(originalRequest);
      } catch (refreshError) {
        // Clear local variable
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authApi;