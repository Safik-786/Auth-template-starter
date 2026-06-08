import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import AuthNavbar from './AuthNavbar'
import PublicRoute from '../middlewares/PublicRoute'
import Dashboard from './ProtectedComponents/Dashboard'
import ProtectedRoute from '../middlewares/protectedRoute'

function AuthApp() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <AuthNavbar />

            <main className="pt-16 min-h-screen flex flex-col">
                <Routes>
                    <Route path='/login' element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    <Route path='/register' element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />

                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
        </div>
    )
}

export default AuthApp