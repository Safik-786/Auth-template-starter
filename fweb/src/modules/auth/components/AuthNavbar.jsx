import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuthMeta } from '../contexts/AuthContext';
import { getAccessToken, setAccessToken } from '../axiosAuth';
import { useLogoutApi } from '../hooks/useAuthApi';
import { CiUser } from 'react-icons/ci';

function AuthNavbar() {

    const { user, setUser } = useAuthMeta()
    const navigate = useNavigate()
    const token = getAccessToken()

    const { mutateAsync: logout } = useLogoutApi()

    const navLinks = [
        { path: "/login", title: "Login" },
        { path: "/register", title: "Register" }
    ]

    const activeClass = "text-indigo-600 font-semibold bg-indigo-50/50";
    const inactiveClass = "text-slate-500 hover:text-slate-900 hover:bg-slate-50/50";

    const handleLogout = async () => {
        try {
            await logout()
        } catch (err) {
            console.error("Logout error", err)
        } finally {
            setAccessToken(null)
            setUser(null)
            navigate("/login")
        }
    }

    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-white/70 backdrop-blur-lg border-b border-slate-200/50 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate("/")}>
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="ml-3 font-bold text-xl tracking-tight text-slate-900">SaaSFlow</span>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                        {!user ? (
                            navLinks.map((navLink) => (
                                <NavLink
                                    key={navLink.path}
                                    to={navLink.path}
                                    className={({ isActive }) =>
                                        `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive ? activeClass : inactiveClass}`
                                    }
                                >
                                    {navLink.title}
                                </NavLink>
                            ))
                        ) : (
                            <>
                                <div className='flex items-center gap-2 text-slate-700 p-2 rounded-full shadow'>
                                    <CiUser className="w-4 h-4" />
                                </div>
                                <div className="h-4 w-px bg-slate-200 mx-2 hidden sm:block"></div>
                                <div className="flex items-center gap-4 pl-2">
                                    <span className="text-sm font-medium text-slate-700 hidden sm:block">
                                        {user.name || user.email}
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AuthNavbar