import authApi from "../axiosAuth";
import { useAuthMeta } from "../contexts/AuthContext";

const {setAccessToken, setUser} =useAuthMeta()


export const login = async (email, password) => {
  const res = await authApi.post("/auth/login", {
    email,
    password,
  });

  setAccessToken(res.data.accessToken);
  setUser(res.data.user);
};


export const refreshAccessToken = async () => {
  const res = await authApi.post(
    "/auth/refresh"
  );

  setAccessToken(res.data.accessToken);

  return res.data.accessToken;
};