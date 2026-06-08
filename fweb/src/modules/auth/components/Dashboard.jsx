import React from 'react'
import { useAuthMeta } from '../contexts/AuthContext'

function Dashboard() {
    const { user } = useAuthMeta()

    return (
        <div className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                <p className="mt-2 text-slate-500">Welcome back, {user?.name || user?.email || 'User'}! Here's an overview of your workspace.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-slate-500">Total Revenue</span>
                    <span className="text-3xl font-bold text-slate-900 mt-2">$24,500</span>
                    <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        +14.5% from last month
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-slate-500">Active Users</span>
                    <span className="text-3xl font-bold text-slate-900 mt-2">1,234</span>
                    <div className="mt-4 flex items-center text-sm text-emerald-600 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        +5.2% from last month
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
                    <span className="text-sm font-medium text-slate-500">Pending Tickets</span>
                    <span className="text-3xl font-bold text-slate-900 mt-2">42</span>
                    <div className="mt-4 flex items-center text-sm text-rose-500 font-medium">
                        <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                        -2.1% from last month
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900">Recent Activity</h3>
                    <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">View all</button>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
                        No recent activity to show.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard