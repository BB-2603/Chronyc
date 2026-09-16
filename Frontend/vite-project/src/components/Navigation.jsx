import React from "react";
import { Home, Users, Clock, LayoutDashboard, Settings, Activity, LogOut } from "lucide-react";

export default function Navigation({ activeTab, setActiveTab, onLogout }) {
    const tabs = [
        { id: "dashboard", label: "Home", icon: Home },
        { id: "timeline", label: "Timeline", icon: Clock },
        { id: "family", label: "Family", icon: Users },
        { id: "insights", label: "Insights", icon: LayoutDashboard },
        { id: "profile", label: "Settings", icon: Settings }
    ];

    return (
        <>
            {/* --- Desktop Sidebar (md and up) --- */}
            <aside className="hidden md:flex md:w-64 bg-white border-r border-slate-200 flex-col justify-between h-screen sticky top-0 shrink-0 z-40">
                <div>
                    {/* Brand Logo */}
                    <div className="flex items-center gap-2.5 px-6 py-6 border-b border-slate-100">
                        <div className="bg-teal-500 text-white p-1.5 rounded-lg shadow-sm">
                            <Activity size={20} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-teal-800">Chronyc</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-1.5">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl font-medium text-sm transition ${isActive
                                            ? "bg-teal-50 text-teal-700 font-semibold"
                                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                        }`}
                                >
                                    <Icon size={19} className={isActive ? "text-teal-600" : "text-slate-400"} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* User Card & Logout */}
                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-xs font-bold text-teal-700">
                                JD
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-slate-800">John Doe</p>
                                <p className="text-[11px] text-slate-400">Personal Plan</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            title="Logout"
                            className="text-slate-400 hover:text-red-500 p-1 rounded-lg"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- Mobile Bottom Nav (below md) --- */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 flex justify-between items-center z-50">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex flex-col items-center gap-1 py-1 px-2 ${isActive ? "text-teal-600 font-semibold" : "text-slate-400"
                                }`}
                        >
                            <Icon size={20} />
                            <span className="text-[10px] font-medium">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </>
    );
}