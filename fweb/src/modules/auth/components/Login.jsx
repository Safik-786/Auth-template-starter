import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoginApi } from '../hooks/useAuthQueries'
import { setAccessToken } from '../lib/axiosClient'
import { useNavigate } from 'react-router-dom'
import { useAuthMeta } from '../contexts/AuthContext'
import toast from 'react-hot-toast'

function Login() {

    const {register,handleSubmit}= useForm()

    const {mutateAsync:LoginApi, data}= useLoginApi()
    const navigate= useNavigate()
    const { setUser } = useAuthMeta()

    const handleLogin = async (data) => {
        try {
            // LoginApi returns response.data from the backend
            const response = await LoginApi(data)
            
            // Set the token using the response from the server, not the form data
            setAccessToken(response.accessToken)
            setUser(response.user)
            toast.success("Successfully logged in!")
            navigate("/dashboard")
        } catch (error) {
            console.error("Login failed", error)
            toast.error(error?.response?.data?.message || "Failed to login. Please check your credentials.")
        }
    }
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome back</h2>
                    <p className="text-sm text-slate-500 mt-2">Enter your credentials to access your account</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700" htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all" 
                            placeholder="you@example.com"
                            {...register("email")}
                        />
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                        </div>
                        <input 
                            type="password" 
                            id="password" 
                            className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all" 
                            placeholder="••••••••"
                            {...register("password")}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="flex w-full justify-center items-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200"
                    >
                        Sign in to account
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Don't have an account?{' '}
                    <span 
                        onClick={() => navigate('/register')} 
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                        Create one now
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Login