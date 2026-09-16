export const mockApi = {
  sendOtp: async (phone) => {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, message: `OTP sent to ${phone}` };
  },

  verifyOtp: async (otp) => {
    await new Promise((r) => setTimeout(r, 600));
    return otp === "528000" || otp.length === 6
      ? { success: true, token: "jwt_token_123" }
      : { success: false, error: "Invalid code" };
  },

  saveProfile: async (data) => {
    await new Promise((r) => setTimeout(r, 500));
    return { success: true, profile: data };
  },

  getFamilyData: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return {
      stats: { totalRecords: 128, familyMembers: 5, healthFlags: 2 },
      members: [
        { id: 1, name: "Julian Rivera", relation: "Me", age: 42, lastActivity: "Today", alert: null },
        { id: 2, name: "Elena Rivera", relation: "Spouse", age: 38, lastActivity: "2 days ago", alert: null },
        { id: 3, name: "Mateo Rivera", relation: "Son", age: 15, lastActivity: "Mar 12, 2024", alert: "Missing immunization record for 2024" },
        { id: 4, name: "Sofia Rivera", relation: "Daughter", age: 21, lastActivity: "Jan 05, 2024", alert: null },
        { id: 5, name: "Robert Chen", relation: "Father", age: 72, lastActivity: "Feb 28, 2024", alert: "Blood pressure log overdue" }
      ]
    };
  },

  getDashboardData: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return {
      userName: "Felix",
      stats: { reports: 42, family: 4, prescriptions: 12 },
      activities: [
        { id: 1, text: "Felix uploaded a new Blood Panel Result", time: "2 hours ago" },
        { id: 2, text: "Sarah completed Annual Wellness Visit", time: "Yesterday at 4 PM" },
        { id: 3, text: "Leo added Vaccination Certificate", time: "3 days ago" }
      ],
      reminders: [
        { id: 1, title: "Morning Vitamins", subtitle: "Next: Today • 09:00 AM" }
      ]
    };
  },

  getTimelineData: async () => {
    await new Promise((r) => setTimeout(r, 400));
    return {
      patient: {
        name: "John Doe",
        details: "34 YEARS • O+ POSITIVE",
        stats: { totalEvents: 48, diagnosis: "Hypertension", activeMeds: 3, lastVisit: "Oct 24, 2023" }
      },
      events: [
        {
          id: 1,
          date: "OCT 24",
          tag: "PRESCRIPTION",
          tagColor: "bg-blue-50 text-blue-600 border-blue-200",
          title: "Routine Medication Refill",
          subtitle: "Hypertension Management",
          doctor: "Dr. Sarah Jenkins",
          facility: "Central Health Clinic",
          notes: "Lisinopril 10mg • Amlodipine 5mg",
          files: "3 Docs"
        },
        {
          id: 2,
          date: "OCT 12",
          tag: "LAB TEST",
          tagColor: "bg-amber-50 text-amber-600 border-amber-200",
          title: "Quarterly Blood Panel",
          subtitle: "Lipid Profile & Glucose Check",
          facility: "Quest Diagnostics",
          chips: ["HbA1c", "Lipid Panel", "CBC"],
          files: "3 Docs"
        },
        {
          id: 3,
          date: "SEP 28",
          tag: "CONSULTATION",
          tagColor: "bg-teal-50 text-teal-600 border-teal-200",
          title: "Cardiology Follow-up",
          subtitle: "Stable Sinus Rhythm",
          doctor: "Dr. Marcus Chen",
          facility: "St. Jude Medical Center",
          files: "2 Docs"
        },
        {
          id: 4,
          section: "EARLIER",
          date: "AUG 15",
          tag: "VACCINATION",
          tagColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
          title: "Annual Immunization",
          subtitle: "Influenza (Flu) Vaccine",
          doctor: "Nurse Practitioner Miller",
          facility: "Walgreens Pharmacy",
          files: "1 Doc"
        }
      ]
    };
  }
};