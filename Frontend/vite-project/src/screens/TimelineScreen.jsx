import React, { useEffect, useState } from "react";
import { Filter, FileText, ChevronRight } from "lucide-react";
import TopHeader from "../components/TopHeader";
import { mockApi } from "../api/mockApi";

export default function TimelineScreen() {
    const [timeline, setTimeline] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        mockApi.getTimelineData().then(setTimeline);
    }, []);

    if (!timeline) return <div className="p-12 text-center text-slate-400 text-sm">Loading health timeline...</div>;

    return (
        <div className="pb-24 md:pb-12 bg-slate-50 min-h-screen">
            <TopHeader title="Medical Records & Timeline" />

            <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-4">
                {/* Patient Switcher */}
                <div className="flex gap-4 border-b border-slate-200 pb-2">
                    <button className="text-sm font-bold text-teal-700 border-b-2 border-teal-500 pb-2">
                        My Record (John Doe)
                    </button>
                    <button className="text-sm font-medium text-slate-400 hover:text-slate-600 pb-2">
                        Sarah (Spouse)
                    </button>
                </div>

                {/* Patient Profile Card */}
                <div className="bg-white border border-slate-200/70 rounded-3xl p-5 shadow-xs mt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center font-bold text-teal-700 text-sm">
                                JD
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-slate-800">{timeline.patient.name}</h2>
                                <p className="text-xs text-teal-600 font-semibold uppercase">{timeline.patient.details}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                            <div className="sm:border-l sm:border-slate-100 sm:pl-4">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">Total Events</div>
                                <div className="text-sm font-bold text-slate-800 mt-0.5">{timeline.patient.stats.totalEvents}</div>
                            </div>
                            <div className="sm:border-l sm:border-slate-100 sm:pl-4">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">Diagnosis</div>
                                <div className="text-sm font-bold text-slate-800 mt-0.5 truncate">{timeline.patient.stats.diagnosis}</div>
                            </div>
                            <div className="sm:border-l sm:border-slate-100 sm:pl-4">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">Active Meds</div>
                                <div className="text-sm font-bold text-slate-800 mt-0.5">{timeline.patient.stats.activeMeds}</div>
                            </div>
                            <div className="sm:border-l sm:border-slate-100 sm:pl-4">
                                <div className="text-[10px] text-slate-400 font-bold uppercase">Last Visit</div>
                                <div className="text-sm font-bold text-slate-800 mt-0.5">{timeline.patient.stats.lastVisit}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-1 text-xs">
                    <button className="p-2 border border-slate-200 rounded-xl bg-white text-slate-600 shadow-xs">
                        <Filter size={15} />
                    </button>
                    {["All", "Prescriptions", "Labs", "Vaccines"].map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-xl font-medium transition shadow-xs ${activeFilter === filter
                                    ? "bg-teal-500 text-white font-semibold"
                                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Timeline Records */}
                <div className="mt-8 relative pl-6 border-l-2 border-slate-200 ml-3 space-y-6 max-w-3xl">
                    {timeline.events.map((event) => (
                        <div key={event.id} className="relative">
                            {/* Timeline Indicator Dot */}
                            <div className="w-3.5 h-3.5 rounded-full bg-teal-500 absolute -left-[31px] top-4 ring-4 ring-slate-50 shadow-xs" />

                            {event.section && (
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                                    {event.section}
                                </div>
                            )}

                            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/70 shadow-xs hover:shadow-md transition">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-slate-400 uppercase">{event.date}</span>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md border ${event.tagColor}`}>
                                        {event.tag}
                                    </span>
                                </div>

                                <h3 className="text-sm sm:text-base font-bold text-slate-800">{event.title}</h3>
                                <p className="text-xs font-semibold text-teal-700 mt-0.5">{event.subtitle}</p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-slate-500 mt-2.5">
                                    {event.doctor && <p>👨‍⚕️ {event.doctor}</p>}
                                    {event.facility && <p>🏥 {event.facility}</p>}
                                </div>

                                {event.chips && (
                                    <div className="flex gap-1.5 mt-3 flex-wrap">
                                        {event.chips.map((chip, cIdx) => (
                                            <span key={cIdx} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                                                {chip}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 text-xs">
                                    <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                                        <FileText size={14} /> {event.files} Attached
                                    </span>
                                    <button className="text-teal-600 font-bold flex items-center gap-1 hover:underline">
                                        Open Visit Summary <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}