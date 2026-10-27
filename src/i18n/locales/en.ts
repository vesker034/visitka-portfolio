import type { Translations } from "../types";

export const en: Translations = {
  meta: {
    title: "MomCare — support at every stage of pregnancy",
    description:
      "MomCare helps you track your term, well-being, visits, and important tasks — all in one app.",
  },
  header: {
    download: "Download",
    nav: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  hero: {
    floatingCards: [
      "24 weeks and 3 days",
      "Baby the size of a kiwi",
      "Water 5 of 8 glasses",
      "Next visit tomorrow, 10:00",
      "Well-being: good",
      "Questions for doctor: 3",
      "Report ready PDF for doctor",
    ],
    title: "Pregnancy becomes clearer when everything important is nearby",
    subtitle:
      "MomCare helps you track your term, well-being, visits, and important tasks — all in one app.",
    disclaimer:
      "Available on iOS and Android. MomCare helps you navigate during pregnancy but does not replace a doctor.",
    steps: [
      { title: "Term", description: "Track weeks and baby development stages" },
      { title: "Well-being", description: "Record feelings and symptoms daily" },
      { title: "Visits", description: "Never miss appointments and tests" },
      { title: "Reminders", description: "Vitamins, water, and important events" },
      { title: "Doctor report", description: "Convenient PDF report for appointments" },
    ],
  },
  calendar: {
    title: "Not just a pregnancy calendar",
    subtitle:
      "MomCare helps you track your term and collect everything important between doctor visits.",
    cards: [
      {
        title: "Shows",
        description:
          "Current week, baby development, changes for mom, and what's important at this stage.",
      },
      {
        title: "Helps track",
        description: "Well-being, symptoms, water, habits, visits, and reminders.",
      },
      {
        title: "Prepares for doctor",
        description: "Collects questions, metrics, and notes into a clear report.",
      },
    ],
    reportTitle: "Report for doctor",
    reportItems: [
      { label: "24th week of pregnancy", highlight: "" },
      { label: "Period:", highlight: "last 14 days" },
      { label: "Symptoms:", highlight: "fatigue, heartburn" },
      { label: "Metrics:", highlight: "weight, blood pressure" },
      { label: "Questions for doctor:", highlight: "3" },
      { label: "Next visit:", highlight: "tomorrow" },
    ],
    reportButtons: { show: "Show to doctor", pdf: "Download PDF" },
    phoneReport: {
      title: "Report for doctor",
      readyTitle: "Ready for visit",
      readySub: "All data collected for the last 14 days",
      summaryTitle: "Summary",
      items: [
        { title: "24 weeks of pregnancy", sub: "2nd trimester" },
        { title: "Symptoms", sub: "fatigue, heartburn" },
        { title: "Metrics", sub: "weight, blood pressure" },
        { title: "Questions for doctor", sub: "3 questions" },
        { title: "Next visit", sub: "tomorrow, 10:00" },
      ],
    },
    preparationTitle: "Prepare for your doctor's visit without chaos in your notes",
    flowSteps: ["Well-being", "Symptoms", "Metrics", "Questions", "Report"],
    callouts: [
      { text: "Everything at hand", emoji: "📋" },
      { text: "Confidence at appointment", emoji: "💪" },
      { text: "Time saving", emoji: "⏱️" },
    ],
  },
  currentWeek: {
    title: "Always clear what's happening right now",
    subtitle:
      "MomCare shows the current week, baby development, and important recommendations at this stage.",
    floatingCards: [
      { title: "Baby development", description: "What happens this week" },
      { title: "Baby the size of a kiwi", description: "Visual size comparison" },
      { title: "What's happening to mom", description: "Changes and feelings" },
      { title: "Important this week", description: "Recommendations and reminders" },
    ],
    phoneWeek: {
      week: "24th week",
      trimester: "2nd trimester",
      daysToBirthPrefix: "Approximately until birth",
      daysToBirthValue: "109 days",
      sizeComparePrefix: "Baby is the size of",
      sizeCompareValue: "a kiwi 🥝",
      sections: [
        {
          title: "Baby development",
          description:
            "Your baby moves actively, hears your voice and music. Lungs are developing, and the skin is covered with protective vernix.",
        },
        {
          title: "What's happening to mom",
          description:
            "Shortness of breath and fatigue may appear. The belly becomes more noticeable, and you may feel pulling sensations in the lower abdomen.",
        },
        {
          title: "Important this week",
          description: "Monitor your weight, drink enough water, do light exercises, and rest.",
        },
      ],
      cta: "More about week 24",
    },
    phoneDiary: {
      title: "Diary",
      prompt: "How do you feel?",
      sleepLabel: "Sleep",
      sleep: "7h 20m",
      energyLabel: "Energy",
      energy: "4 of 5",
      symptomsLabel: "Symptoms",
      symptoms: "heartburn",
    },
    phoneTasks: {
      title: "My tasks",
      nextVisitTitle: "Next visit",
      nextVisitDate: "May 26, 10:00 — Doctor appointment",
      nextVisitCountdown: "2 days left",
      items: [
        { title: "Ultrasound", sub: "Ultrasound May 28", kind: "link" },
        { title: "Tests", sub: "Tests May 26", kind: "link" },
        { title: "Water", sub: "5 of 8 glasses", kind: "water" },
        { title: "Vitamins", sub: "2 tablets today", kind: "check" },
        { title: "Reminders", sub: "2 active", kind: "badge", badge: "2" },
      ],
    },
    diary: {
      title: "Record well-being in a minute",
      subtitle: "Track mood, symptoms, sleep, and notes — all in a convenient diary.",
      items: [
        { title: "Mood", description: "Choose how you feel" },
        { title: "Sleep", description: "Record duration and quality" },
        { title: "Energy", description: "Rate your energy level" },
        { title: "Symptoms", description: "Mark and track" },
        { title: "Note", description: "Add thoughts and observations" },
      ],
    },
    visits: {
      title: "Don't forget visits and reminders",
      subtitle: "Add doctor visits, tests, and important events — the app will remind you.",
      items: [
        { title: "Doctor visits", description: "Track appointment schedule" },
        { title: "Ultrasound and tests", description: "Don't miss important exams" },
        { title: "Water and vitamins", description: "Daily habits under control" },
        { title: "Reminders", description: "The app reminds you in advance" },
      ],
    },
  },
  visits: {
    title: "Don't forget visits, tests, and important events",
    subtitle: "MomCare keeps all important medical information in one place.",
    floatingCards: [
      { title: "Next visit", description: "Date, time, and reminder" },
      { title: "Ultrasound and tests", description: "List and schedule of exams" },
      { title: "Water and vitamins", description: "Daily reminders" },
      { title: "Reminders", description: "Never miss anything" },
      { title: "Questions for doctor", description: "Write them as you go" },
      { title: "Everything under control", description: "Order without chaos" },
    ],
    preparation: {
      title: "Prepare for your appointment calmly",
      subtitle: "Gather questions, test results, and notes — everything will be at hand.",
      questionsTitle: "Questions for doctor",
      questions: [
        "How is the baby developing this week?",
        "Should I change my diet?",
        "What tests should I take before the next visit?",
      ],
      checklist: ["Questions", "Test results", "Documents", "Notes"],
      cta: "I'm ready for the appointment",
    },
    sidebar: [
      { title: "Visits", description: "Schedule and reminders" },
      { title: "Ultrasound and tests", description: "All exams in one place" },
      { title: "Reminders", description: "Vitamins, water, events" },
      { title: "Preparation", description: "Everything for a calm visit" },
    ],
  },
  tools: {
    badge: "05 · USEFUL TOOLS",
    title: "Everything you need for a calm pregnancy",
    subtitle: "MomCare collects useful tools and materials in one app to support you every day.",
    sidebarTitle: "Useful features every day",
    sidebarText: "Short tips, checklists, and materials without overload or complex terms.",
    cards: [
      { title: "Nutrition", description: "Trimester tips and healthy foods." },
      { title: "Activity", description: "Safe exercises, walks, breathing." },
      { title: "Checklists", description: "Trimester prep and hospital bag list." },
      { title: "Knowledge base", description: "Short articles and Q&A." },
      { title: "Birth preparation", description: "Reminders for final weeks." },
    ],
    benefits: [
      { title: "Short and clear", description: "Without overload or complex terms" },
      { title: "By stage", description: "Materials for your pregnancy term" },
      { title: "Always with you", description: "Everything important on your phone" },
      { title: "With care", description: "Support every day" },
    ],
  },
  trust: {
    badge: "06 · TRUST AND SUPPORT",
    title: "Calmness, support, and clear answers",
    subtitle: "MomCare helps you navigate pregnancy but does not replace a doctor's consultation.",
    cards: [
      { title: "Informational", description: "The app does not diagnose and does not replace a doctor." },
      { title: "Confidentiality", description: "Your personal notes and data are available only to you." },
      { title: "Daily support", description: "Tips, reminders, and order in one app." },
      { title: "PDF report", description: "Show the doctor only what's important at the appointment." },
    ],
    faqTitle: "FAQ",
    faqSubtitle: "The most important about the app — short and clear.",
    faq: [
      { question: "Does MomCare replace a doctor?", answer: "No. The app is informational and helps organize data but does not replace a specialist." },
      { question: "When can I start using it?", answer: "MomCare is useful at any stage — from early weeks to birth preparation." },
      { question: "Is registration required?", answer: "Registration is not required for basic features. Data is stored on your device." },
      { question: "Can I share data with a doctor?", answer: "Yes, you can generate a PDF report and show it at your appointment." },
      { question: "Is the app free?", answer: "Basic features are free. Details are in the app." },
    ],
    ctaTitle: "Download MomCare and keep everything important nearby",
    ctaSubtitle: "Track pregnancy, record well-being, and prepare for visits calmly.",
    socialProof: "Thousands of expectant moms already use MomCare",
  },
  download: {
    apk: "Download APK",
    rustore: "RuStore",
    googlePlay: "Google Play",
    appStore: "App Store",
    unavailable: "Soon",
  },
  footer: {
    copyright: "© 2026 MomCare",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
    disclaimer: "Information in the app is for reference and does not replace a doctor's consultation.",
  },
  admin: {
    title: "Admin panel",
    subtitle: "Manage app download links",
    apkUrl: "APK file URL",
    rustoreUrl: "RuStore link",
    googlePlayUrl: "Google Play link",
    appStoreUrl: "App Store link",
    save: "Save",
    saved: "Settings saved",
    saveError: "Failed to save settings",
    back: "Back to home",
    note: "Password-protected access. Links are stored in data/settings.json on the server.",
    loginTitle: "Admin sign in",
    loginSubtitle: "Enter the administrator username and password",
    username: "Username",
    password: "Password",
    loginButton: "Sign in",
    loginLoading: "Signing in...",
    loginError: "Invalid username or password",
    loginFailed: "Sign in failed",
    authNotConfigured: "VISITKA_AUTH_SECRET, VISITKA_ADMIN_USERNAME and VISITKA_ADMIN_PASSWORD are not configured on the server",
    logout: "Sign out",
  },
};
