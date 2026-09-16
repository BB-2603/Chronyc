import React from "react";
import { Activity, Bell } from "lucide-react";

export default function TopHeader({ title }) {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100 md:border-b-0 md:bg-transparent">
            {/* Logo shown only on mobile header */}
            <div className="flex items-center gap-2 md:hidden">
                <div className="bg-teal-500 text-white p-1 rounded-md">
                    <Activity size={18} />
                </div>
                <span className="text-teal-700 tracking-tight text-lg font-bold">Chronyc</span>
            </div>

            <div className="hidden md:block">
                {title && <h1 className="text-xl font-bold text-slate-800">{title}</h1>}
            </div>

            <div className="flex items-center gap-3">
                <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100">
                    <Bell size={18} />
                </button>
                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-semibold text-slate-600">
                    JD
                </div>
            </div>
        </header>
    );
}