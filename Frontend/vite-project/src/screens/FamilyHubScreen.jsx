import React, { useEffect, useState } from "react";
import { FileText, Users, AlertCircle, MoreHorizontal, Plus, ShieldCheck } from "lucide-react";
import TopHeader from "../components/TopHeader";
import { mockApi } from "../api/mockApi";

export default function FamilyHubScreen({ onSelectMember }) {
    const [data, setData] = useState(null);

    useEffect(() => {
        mockApi.getFamilyData().then(setData);
    }, []);

    if (!data) return <div className="p-12 text-center text-slate-400 text-sm">Loading family hub...</div>;

    return (
        <div className="pb-24 md:pb-12 bg-slate-50 min-h-screen">
            <TopHeader title="Family Directory" />

            <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-4">
                {/* Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                            <FileText size={22} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Records</div>
                            <div className="text-2xl font-bold text-slate-800 mt-0.5">{data.stats.totalRecords}</div>
                            <div className="text-xs text-teal-600 font-medium">+4 this month</div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                            <Users size={22} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Family Members</div>
                            <div className="text-2xl font-bold text-slate-800 mt-0.5">{data.stats.familyMembers}</div>
                            <div className="text-xs text-blue-600 font-medium">Active Group</div>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/70 shadow-xs flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                            <AlertCircle size={22} />
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Health Flags</div>
                            <div className="text-2xl font-bold text-slate-800 mt-0.5">{data.stats.healthFlags}</div>
                            <div className="text-xs text-red-500 font-medium">Action Required</div>
                        </div>
                    </div>
                </div>

                {/* Desktop Split: Profiles on left (2 cols on large screen), Sidebar caregiving on right */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-800">Profiles ({data.members.length})</h2>
                                <p className="text-xs text-slate-400">Click a profile to inspect their chronological timeline</p>
                            </div>
                            <button className="text-xs text-teal-600 font-semibold hover:underline">Export Overview</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {data.members.map((member) => (
                                <div
                                    key={member.id}
                                    onClick={() => onSelectMember(member)}
                                    className="bg-white rounded-2xl p-4 border border-slate-200/70 shadow-xs hover:border-teal-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-xs">
                                                    {member.name.split(" ").map((n) => n[0]).join("")}
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-slate-800">{member.name}</h3>
                                                    <p className="text-xs text-slate-400">{member.relation}</p>
                                                </div>
                                            </div>
                                            <button className="text-slate-400 hover:text-slate-600 p-1">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
                                            <span>Age: {member.age}</span>
                                            <span>Updated: {member.lastActivity}</span>
                                        </div>
                                    </div>

                                    {member.alert && (
                                        <div className="mt-3 bg-red-50 border border-red-100 rounded-xl p-2.5 text-xs text-red-600 flex items-center gap-2">
                                            <AlertCircle size={14} className="shrink-0" />
                                            <span className="leading-snug">{member.alert}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop Right Rail */}
                    <div className="space-y-4">
                        <div className="border-2 border-dashed border-slate-200 bg-white rounded-2xl p-6 text-center shadow-xs">
                            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 mx-auto flex items-center justify-center mb-2">
                                <Plus size={20} />
                            </div>
                            <h3 className="text-sm font-bold text-slate-800">Add Family Member</h3>
                            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                                Track medical history, prescriptions, and alerts for dependents.
                            </p>
                            <button className="mt-3 bg-teal-500 hover:bg-teal-600 text-white font-medium text-xs py-2 px-4 rounded-xl transition">
                                Add Profile
                            </button>
                        </div>

                        <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-5">
                            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm mb-1">
                                <ShieldCheck size={18} className="text-teal-600" />
                                <span>Collaborative Caregiving</span>
                            </div>
                            <p className="text-xs text-teal-800 leading-relaxed mt-1">
                                Invite siblings or doctors to view and update specific records. Manage granular permission levels securely.
                            </p>
                            <button className="mt-3 text-xs font-bold text-teal-700 hover:text-teal-900 hover:underline">
                                Manage Access Permissions &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}