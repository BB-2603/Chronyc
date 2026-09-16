import React, { useState } from "react";
import { Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { mockApi } from "../api/mockApi";

export default function LoginScreen({ onNext }) {
    const [phone, setPhone] = useState("000 000 0000");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await mockApi.sendOtp(phone);
        setLoading(false);
        onNext({ phone });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-xl flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 text-teal-600 font-bold text-2xl mb-8">
                        <div className="bg-teal-500 text-white p-2 rounded-xl shadow-sm">
                            <Activity size={24} />
                        </div>
                        <span>Chronyc</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                        Your Health. Remembered.
                    </h1>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                        Securely manage your family’s medical records in one structured timeline.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        <div>
                            <label className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                                Enter Phone Number
                            </label>
                            <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-3 mt-1.5 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-50 transition">
                                <span className="text-sm font-semibold text-slate-700 pr-3 border-r border-slate-200">
                                    🇺🇸 +1
                                </span>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-3 text-sm outline-none text-slate-800 font-medium bg-transparent"
                                    placeholder="000 000 0000"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-sm transition shadow-sm"
                        >
                            {loading ? "Sending Code..." : "Continue"}
                            <ArrowRight size={16} />
                        </button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <span className="relative px-3 bg-white text-xs font-medium text-slate-400 uppercase">
                            Or
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => onNext({ phone: "+1 555-0199" })}
                        className="w-full border border-slate-200 hover:bg-slate-50 font-medium py-3 rounded-xl flex items-center justify-center gap-2 text-xs text-slate-700 transition"
                    >
                        <span className="font-bold text-red-500 text-sm">G</span> Continue with Google
                    </button>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => onNext({ phone: "guest" })}
                            className="text-xs text-teal-600 font-semibold hover:underline"
                        >
                            Explore without an account
                        </button>
                    </div>
                </div>

                <div className="text-center text-xs text-slate-400 mt-8 leading-normal border-t border-slate-100 pt-4">
                    By continuing, you agree to Chronyc's updated{" "}
                    <a href="#terms" className="underline hover:text-slate-600">Terms of Service</a>.
                </div>
            </div>
        </div>
    );
}