import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FiHome, FiSettings, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

import DashboardHeader from './DashboardHeader';

function DashboardLayout() {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <FiHome className="w-5 h-5" /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <FiUser className="w-5 h-5" /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <FiSettings className="w-5 h-5" /> },
    ];

    return (
        <div className="flex h-screen bg-slate-50 w-full relative overflow-hidden">
            {/* Sidebar (Desktop) */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-full shadow-sm z-10">
                <div className="p-6 border-b border-slate-100 flex items-center">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <span className="ml-3 font-bold text-xl tracking-tight text-slate-900">SaaSFlow</span>
                </div>
                
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm font-medium' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Mobile Drawer Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/50 z-[60] md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Mobile Drawer */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="ml-3 font-bold text-xl tracking-tight text-slate-900">SaaSFlow</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg">
                        <FiX className="w-6 h-6" />
                    </button>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-indigo-50 text-indigo-700 shadow-sm font-medium' 
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
