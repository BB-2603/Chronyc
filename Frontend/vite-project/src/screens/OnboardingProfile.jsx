import React, { useState } from "react";
import { Activity, Calendar, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { mockApi } from "../api/mockApi";

export default function OnboardingProfile({ onComplete, onBack }) {
    const [formData, setFormData] = useState({
        fullName: "Alexander Hamilton",
        dob: "",
        gender: "Male"
    });
    const [loading, setLoading] = useState(false);

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        await mockApi.saveProfile(formData);
        setLoading(false);
        onComplete();
    };

    return (
        <div className="flex flex-col min-h-screen px-6 py-6 bg-white justify-between">
            <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <button onClick={onBack} className="text-slate-600 p-1">
                        <ArrowLeft size={18} />
                    </button>
                    <div className="flex items-center gap-1 text-teal-600 font-bold text-sm">
                        <Activity size={16} /> Chronyc
                    </div>
                    <button onClick={onComplete} className="text-teal-600 text-xs font-semibold">
                        Skip
                    </button>
                </div>

                <div className="mt-4">
                    <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider text-teal-600">
                        <span>Onboarding</span>
                        <span className="text-slate-400">Step 1 of 2</span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-800 mt-1">Create your profile</h2>

                    <div className="bg-teal-50/70 border border-teal-100 rounded-xl p-3 flex gap-2.5 mt-4">
                        <ShieldCheck className="text-teal-600 shrink-0 mt-0.5" size={16} />
                        <p className="text-[11px] text-teal-800 leading-snug">
                            Your information is encrypted and only visible to you and family members you explicitly authorize.
                        </p>
                    </div>

                    <form onSubmit={handleSave} className="mt-5 space-y-4">
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase">Full Name</label>
                            <input
                                type="text"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full border border-slate-200 rounded-xl px-3 py-2.5 mt-1 text-sm outline-none focus:border-teal-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase">Date of Birth</label>
                            <div className="relative mt-1">
                                <input
                                    type="date"
                                    value={formData.dob}
                                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500"
                                />
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1">Required for accurate health metric analysis.</p>
                        </div>

                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase">Gender</label>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                                {["Male", "Female", "Other"].map((g) => (
                                    <button
                                        key={g}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, gender: g })}
                                        className={`py-2 rounded-xl text-xs font-semibold border transition ${formData.gender === g
                                                ? "bg-teal-50 border-teal-500 text-teal-600"
                                                : "border-slate-200 text-slate-600"
                                            }`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-1.5 text-sm transition mt-6"
                        >
                            {loading ? "Saving..." : "Continue"}
                            <ArrowRight size={16} />
                        </button>

                        <button
                            type="button"
                            onClick={onComplete}
                            className="w-full text-center text-xs text-slate-400 font-medium py-1 hover:text-slate-600"
                        >
                            Add these details later
                        </button>
                    </form>
                </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 mt-6">
                © 2026 Chronyc. Your Health. Remembered. Secure & Private.
            </div>
        </div>
    );
}