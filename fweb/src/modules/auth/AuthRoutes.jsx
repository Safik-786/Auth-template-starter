import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import PublicLayout from './layouts/PublicLayout'
import GuestGuard from './guards/GuestGuard'
import Dashboard from './components/Dashboard'
import DashboardLayout from './layouts/DashboardLayout'
import AuthGuard from './guards/AuthGuard'

function AuthRoutes() {
    return (
        <Routes>
                {/* Public Routes with Public Layout */}
                <Route element={<PublicLayout />}>
                    <Route path='/login' element={
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    } />
                    <Route path='/register' element={
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    } />
                </Route>

                {/* Protected Routes with Dashboard Layout */}
                <Route path="/dashboard" element={
                    <AuthGuard>
                        <DashboardLayout />
                    </AuthGuard>
                }>
                    <Route index element={<Dashboard />} />
                </Route>
        </Routes>
    )
}

export default AuthRoutes