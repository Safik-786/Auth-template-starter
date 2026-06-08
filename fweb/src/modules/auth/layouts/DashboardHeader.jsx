import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { CiUser } from 'react-icons/ci';
import { useAuthMeta } from '../contexts/AuthContext';

import { getAccessToken, setAccessToken } from '../lib/axiosClient';
import { useLogoutApi } from '../hooks/useAuthQueries';

export default function DashboardHeader({ onMenuClick }) {
    const { user, setUser } = useAuthMeta();
    const navigate = useNavigate();
    const { mutateAsync: logout } = useLogoutApi();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error("Logout error", err);
        } finally {
            setAccessToken(null);
            setUser(null);
            navigate("/login");
        }
    };

    return (
        <header className="flex items-center justify-between h-16 px-4 bg-white border-b border-slate-200 shadow-sm z-20">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 mr-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <FiMenu className="w-6 h-6" />
                </button>
                <div className="md:hidden flex items-center cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className='flex items-center gap-2 text-slate-700 p-2 rounded-full shadow'>
                    <CiUser className="w-4 h-4" />
                </div>
                <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
                <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-700 hidden sm:block">
                        {user?.name || user?.email}
                    </span>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
