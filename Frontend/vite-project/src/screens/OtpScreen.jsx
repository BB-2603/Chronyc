import React, { useState, useRef } from "react";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { mockApi } from "../api/mockApi";

export default function OtpScreen({ onBack, onVerified }) {
    const [code, setCode] = useState(new Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef([]);

    const handleChange = (e, index) => {
        const val = e.target.value;
        if (!/^\d*$/.test(val)) return; // Only allow numeric characters

        const updated = [...code];
        // Grab the last typed character
        updated[index] = val.slice(-1);
        setCode(updated);

        // Auto-focus next field if a digit was entered
        if (val && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Navigate backwards on Backspace if field is already empty
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();
        if (!/^\d+$/.test(pastedData)) return;

        const digits = pastedData.slice(0, 6).split("");
        const updated = [...code];
        digits.forEach((digit, idx) => {
            updated[idx] = digit;
        });
        setCode(updated);

        // Focus the next empty box or the final box
        const nextIdx = Math.min(digits.length, 5);
        inputRefs.current[nextIdx]?.focus();
    };

    const handleVerify = async () => {
        const fullCode = code.join("");
        if (fullCode.length < 6) {
            setError("Please enter all 6 digits.");
            return;
        }

        setLoading(true);
        setError("");
        const res = await mockApi.verifyOtp(fullCode);
        setLoading(false);

        if (res.success) {
            onVerified();
        } else {
            setError("Invalid code. Enter 528000 (or any 6 digits) to continue.");
        }
    };

    return (
        <div className="flex flex-col min-h-screen px-7 py-8 bg-white justify-between">
            <div>
                <button onClick={onBack} className="text-slate-600 p-1 -ml-2 rounded-lg hover:bg-slate-100">
                    <ArrowLeft size={20} />
                </button>

                <div className="flex flex-col items-center text-center mt-8">
                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
                        <ShieldCheck size={26} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">Verification</h2>
                    <p className="text-slate-400 text-xs mt-1">
                        We sent a 6-digit code to <span className="font-semibold text-slate-600">+1 ••• ••• 1234</span>
                    </p>
                </div>

                {/* 6-Digit Inputs with auto-focus and paste support */}
                <div className="flex justify-center gap-2 max-w-[320px] mx-auto mt-8">
                    {code.map((num, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputRefs.current[i] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={num}
                            autoFocus={i === 0}
                            onChange={(e) => handleChange(e, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            onPaste={handlePaste}
                            className={`w-11 h-12 border-2 text-center font-bold text-lg rounded-xl transition outline-none ${num
                                    ? "border-teal-500 bg-teal-50/20 text-teal-900"
                                    : "border-slate-200 text-slate-800 focus:border-teal-400"
                                }`}
                        />
                    ))}
                </div>

                {error && <p className="text-red-500 text-xs text-center mt-3">{error}</p>}

                <button
                    onClick={handleVerify}
                    disabled={loading || code.join("").length < 6}
                    className={`w-full font-medium py-3 rounded-xl text-sm mt-8 transition shadow-sm ${code.join("").length === 6 && !loading
                            ? "bg-teal-500 hover:bg-teal-600 text-white cursor-pointer"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="text-center mt-4 space-y-2">
                    <button className="text-xs text-teal-600 font-medium block mx-auto hover:underline">
                        Resend Code in 00:45
                    </button>
                    <button onClick={onBack} className="text-xs text-slate-400 font-medium block mx-auto hover:text-slate-600">
                        Change phone number
                    </button>
                </div>
            </div>

            <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Secure 256-bit encrypted verification
            </div>
        </div>
    );
}