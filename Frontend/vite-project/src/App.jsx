import React, { useState } from "react";
import LoginScreen from "./screens/LoginScreen";
import OtpScreen from "./screens/OtpScreen";
import OnboardingProfile from "./screens/OnboardingProfile";
import FamilyHubScreen from "./screens/FamilyHubScreen";
import DashboardScreen from "./screens/DashboardScreen";
import TimelineScreen from "./screens/TimelineScreen";
import Navigation from "./components/Navigation";

export default function App() {
  const [authStep, setAuthStep] = useState("login");
  const [activeTab, setActiveTab] = useState("family");

  // Authentication & Onboarding Views (Centered modal layout for desktop & mobile)
  if (authStep === "login") {
    return <LoginScreen onNext={() => setAuthStep("otp")} />;
  }

  if (authStep === "otp") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
          <OtpScreen
            onBack={() => setAuthStep("login")}
            onVerified={() => setAuthStep("onboarding")}
          />
        </div>
      </div>
    );
  }

  if (authStep === "onboarding") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
          <OnboardingProfile
            onBack={() => setAuthStep("otp")}
            onComplete={() => setAuthStep("main")}
          />
        </div>
      </div>
    );
  }

  // Main Application (Responsive Shell: Desktop Sidebar + Main Content Canvas)
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased">
      {/* Desktop Sidebar + Mobile Bottom Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setAuthStep("login")}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {activeTab === "family" && (
          <FamilyHubScreen onSelectMember={() => setActiveTab("timeline")} />
        )}
        {activeTab === "dashboard" && (
          <DashboardScreen onNavigateTimeline={() => setActiveTab("timeline")} />
        )}
        {activeTab === "timeline" && <TimelineScreen />}
        {activeTab === "insights" && (
          <div className="p-12 text-center text-slate-400 text-sm">
            Health Insights & Trends coming soon.
          </div>
        )}
        {activeTab === "profile" && (
          <div className="p-12 text-center text-slate-400 text-sm">
            User Settings & Connected Devices.
          </div>
        )}
      </main>
    </div>
  );
}