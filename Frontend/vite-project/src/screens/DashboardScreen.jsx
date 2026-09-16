import React, { useEffect, useState } from "react";
import { Upload, UserPlus, ChevronRight, Pill } from "lucide-react";
import TopHeader from "../components/TopHeader";
import { mockApi } from "../api/mockApi";

export default function DashboardScreen({ onNavigateTimeline }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        mockApi.getDashboardData().then(setData);
    }, []);

    if (!data) return <div className="p-12 text-center text-slate-400 text-sm">Loading dashboard...</div>;

    return (
        <div className="pb-24 md:pb-12 bg-slate-50 min-h-screen">
            <TopHeader title="Health Dashboard" />

            <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-4">
                {/* Header Greeting Banner */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/70 shadow-xs flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Hello, {data.userName} 👋</h1>
                        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">Your family health records are up to date and verified.</p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-medium text-slate-600 w-full md:w-auto">
                        <button className="flex-1 md:flex-initial px-4 py-1.5 bg-white text-teal-700 rounded-lg shadow-xs font-bold">
                            Felix
                        </button>
                        <button className="flex-1 md:flex-initial px-4 py-1.5 text-slate-500 hover:text-slate-800">
                            Family Group
                        </button>
                    </div>
                </div>

                {/* High-level counters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs">
                        <div className="text-2xl font-bold text-slate-800">{data.stats.reports}</div>
                        <div className="text-xs uppercase font-bold text-slate-400 mt-0.5">Stored Reports</div>
                        <div className="text-xs text-teal-600 font-semibold mt-1">+1 new uploaded today</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs">
                        <div className="text-2xl font-bold text-slate-800">{data.stats.family}</div>
                        <div className="text-xs uppercase font-bold text-slate-400 mt-0.5">Connected Members</div>
                        <div className="text-xs text-blue-600 font-semibold mt-1">All profiles active</div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs">
                        <div className="text-2xl font-bold text-slate-800">{data.stats.prescriptions}</div>
                        <div className="text-xs uppercase font-bold text-slate-400 mt-0.5">Active Prescriptions</div>
                        <div className="text-xs text-slate-500 font-semibold mt-1">Up to date</div>
                    </div>
                </div>

                {/* 2-column Desktop Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column (Activities) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-base font-bold text-slate-800">Recent Activity</span>
                            <button onClick={onNavigateTimeline} className="text-xs text-teal-600 font-semibold hover:underline">
                                View all timeline records &rarr;
                            </button>
                        </div>

                        <div className="space-y-2.5">
                            {data.activities.map((act) => (
                                <div key={act.id} className="bg-white rounded-2xl p-4 border border-slate-200/70 flex items-center gap-3.5 shadow-xs">
                                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0">
                                        {act.text[0]}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{act.text}</p>
                                        <p className="text-[11px] text-slate-400 mt-0.5">{act.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column (Reminders & Quick Actions) */}
                    <div className="space-y-6">
                        <div>
                            <span className="text-base font-bold text-slate-800">Reminders</span>
                            <div className="mt-2.5 bg-white rounded-2xl p-4 border border-slate-200/70 flex items-center justify-between shadow-xs">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                                        <Pill size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-800">Morning Vitamins</p>
                                        <p className="text-[11px] text-slate-400">Scheduled: Today • 09:00 AM</p>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600">
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div>
                            <span className="text-base font-bold text-slate-800">Quick Actions</span>
                            <div className="grid grid-cols-2 gap-3 mt-2.5">
                                <button className="bg-white border border-slate-200/70 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-xs hover:border-teal-400 transition">
                                    <Upload size={20} className="text-teal-600" />
                                    <span className="text-xs font-semibold text-slate-700">Upload Report</span>
                                </button>
                                <button className="bg-white border border-slate-200/70 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-xs hover:border-teal-400 transition">
                                    <UserPlus size={20} className="text-teal-600" />
                                    <span className="text-xs font-semibold text-slate-700">Add Member</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}