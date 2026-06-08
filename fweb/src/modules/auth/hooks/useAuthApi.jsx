import { useMutation } from "@tanstack/react-query"
import authApi from "../axiosAuth"

export const useSignupApi = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authApi.post("/auth/register", data)
            return response.data
        }
    })
}

export const useLoginApi = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await authApi.post("/auth/login", data)
            return response.data
        }
    })
}



export const useLogoutApi = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await authApi.post("/auth/logout")
             return response.data
        }
    })
}