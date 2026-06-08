import React from 'react'
import { getAccessToken } from '../axiosAuth'
import { Navigate } from 'react-router-dom'
import { useAuthMeta } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
    const { isInitializing } = useAuthMeta()
    const token = getAccessToken()

    if (isInitializing) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50">
                <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-500 font-medium animate-pulse">Loading your workspace...</p>
            </div>
        )
    }

    if (!token) {
        return <Navigate to="/login" />
    }
    
    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute