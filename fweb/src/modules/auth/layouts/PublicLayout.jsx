import React from 'react';
import { Outlet } from 'react-router-dom';
import PublicNavbar from './PublicNavbar';

export default function PublicLayout() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <PublicNavbar />
            <main className="pt-16 min-h-screen flex flex-col">
                <Outlet />
            </main>
        </div>
    );
}
