import axiosClient from "../lib/axiosClient";
import { useAuthMeta } from "../contexts/AuthContext";

const {setAccessToken, setUser} =useAuthMeta()


export const login = async (email, password) => {
  const res = await axiosClient.post("/auth/login", {
    email,
    password,
  });

  setAccessToken(res.data.accessToken);
  setUser(res.data.user);
};


export const refreshAccessToken = async () => {
  const res = await axiosClient.post(
    "/auth/refresh"
  );

  setAccessToken(res.data.accessToken);

  return res.data.accessToken;
};