export type Locale = "ru" | "en" | "ar";

export type NavItem = { label: string; href: string };
export type CardItem = { title: string; description: string };
export type StepItem = { title: string; description: string };
export type FaqItem = { question: string; answer: string };

export type Translations = {
  meta: { title: string; description: string };
  header: {
    download: string;
    nav: NavItem[];
  };
  hero: {
    floatingCards: string[];
    title: string;
    subtitle: string;
    disclaimer: string;
    steps: StepItem[];
  };
  calendar: {
    title: string;
    subtitle: string;
    cards: CardItem[];
    reportTitle: string;
    reportItems: Array<{ label: string; highlight: string }>;
    reportButtons: { show: string; pdf: string };
    phoneReport: {
      title: string;
      readyTitle: string;
      readySub: string;
      summaryTitle: string;
      items: Array<{ title: string; sub: string }>;
    };
    preparationTitle: string;
    flowSteps: string[];
    callouts: Array<{ text: string; emoji: string }>;
  };
  currentWeek: {
    title: string;
    subtitle: string;
    floatingCards: CardItem[];
    phoneWeek: {
      week: string;
      trimester: string;
      daysToBirthPrefix: string;
      daysToBirthValue: string;
      sizeComparePrefix: string;
      sizeCompareValue: string;
      sections: CardItem[];
      cta: string;
    };
    phoneDiary: {
      title: string;
      prompt: string;
      sleepLabel: string;
      sleep: string;
      energyLabel: string;
      energy: string;
      symptomsLabel: string;
      symptoms: string;
    };
    phoneTasks: {
      title: string;
      nextVisitTitle: string;
      nextVisitDate: string;
      nextVisitCountdown: string;
      items: Array<{
        title: string;
        sub: string;
        kind: "link" | "water" | "check" | "badge";
        badge?: string;
      }>;
    };
    diary: { title: string; subtitle: string; items: CardItem[] };
    visits: { title: string; subtitle: string; items: CardItem[] };
  };
  visits: {
    title: string;
    subtitle: string;
    floatingCards: CardItem[];
    preparation: {
      title: string;
      subtitle: string;
      questionsTitle: string;
      questions: string[];
      checklist: string[];
      cta: string;
    };
    sidebar: CardItem[];
  };
  tools: {
    badge: string;
    title: string;
    subtitle: string;
    sidebarTitle: string;
    sidebarText: string;
    cards: CardItem[];
    benefits: CardItem[];
  };
  trust: {
    badge: string;
    title: string;
    subtitle: string;
    cards: CardItem[];
    faqTitle: string;
    faqSubtitle: string;
    faq: FaqItem[];
    ctaTitle: string;
    ctaSubtitle: string;
    socialProof: string;
  };
  download: {
    apk: string;
    rustore: string;
    googlePlay: string;
    appStore: string;
    unavailable: string;
  };
  footer: {
    copyright: string;
    privacy: string;
    terms: string;
    disclaimer: string;
  };
  admin: {
    title: string;
    subtitle: string;
    apkUrl: string;
    rustoreUrl: string;
    googlePlayUrl: string;
    appStoreUrl: string;
    save: string;
    saved: string;
    saveError: string;
    back: string;
    note: string;
    loginTitle: string;
    loginSubtitle: string;
    username: string;
    password: string;
    loginButton: string;
    loginLoading: string;
    loginError: string;
    loginFailed: string;
    authNotConfigured: string;
    logout: string;
  };
};
