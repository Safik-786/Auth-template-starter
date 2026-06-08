import React from 'react'
import { useForm } from 'react-hook-form'
import { useSignupApi } from '../hooks/useAuthApi'
import { setAccessToken } from '../axiosAuth'
import { useNavigate } from 'react-router-dom'
import { useAuthMeta } from '../contexts/AuthContext'

function Register() {

    const {register,handleSubmit}= useForm()
    const {mutateAsync} = useSignupApi()
    const navigate = useNavigate()
    const { setUser } = useAuthMeta()

    const handleRegister= async (data)=>{
        try {
            const response = await mutateAsync(data)
            setAccessToken(response.accessToken)
            setUser(response.user)
            navigate("/dashboard")
        } catch (error) {
            console.error("Registration failed", error)
        }
    }
    return (
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h2>
                    <p className="text-sm text-slate-500 mt-2">Start your 14-day free trial. No credit card required.</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-slate-700" htmlFor="name">Full name</label>
                        <input 
                            type="text" 
                            id="name" 
                            className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all" 
                            placeholder="John Doe"
                            {...register("name")}
                        />
                    </div>
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
                        <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="block w-full rounded-xl border-0 py-2.5 px-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all" 
                            placeholder="Create a strong password"
                            {...register("password")}
                        />
                    </div>

                    <button 
                        type="submit"
                        className="flex w-full justify-center items-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 mt-2"
                    >
                        Create account
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <span 
                        onClick={() => navigate('/login')} 
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                        Sign in instead
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Register