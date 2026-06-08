import { useMutation } from "@tanstack/react-query"
import axiosClient from "../lib/axiosClient"

export const useSignupApi = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await axiosClient.post("/auth/register", data)
            return response.data
        }
    })
}

export const useLoginApi = () => {
    return useMutation({
        mutationFn: async (data) => {
            const response = await axiosClient.post("/auth/login", data)
            return response.data
        }
    })
}



export const useLogoutApi = () => {
    return useMutation({
        mutationFn: async () => {
            const response = await axiosClient.post("/auth/logout")
             return response.data
        }
    })
}