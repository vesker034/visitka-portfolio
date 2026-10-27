"use client";

import {
  ArrowLeft,
  Baby,
  BarChart3,
  Bell,
  Calendar,
  Check,
  ChevronRight,
  ClipboardList,
  Download,
  Droplets,
  Eye,
  FlaskConical,
  Frown,
  Heart,
  HelpCircle,
  Home,
  LayoutGrid,
  MessageCircle,
  Meh,
  Moon,
  MoreHorizontal,
  Pill,
  Plus,
  Share2,
  ShoppingBag,
  Smile,
  Sprout,
  UserRound,
  Zap,
} from "lucide-react";
import { useId, type ReactNode } from "react";
import { useLocale } from "@/context/LocaleContext";
import { BabyInWombIcon } from "@/components/ui/BabyInWombIcon";

const SIZES = {
  sm: "w-[200px]",
  md: "w-[268px]",
  lg: "w-[290px]",
} as const;

/** Shared typography scale for all phone mockup screens */
function phoneType(compact?: boolean) {
  return compact
    ? {
        xs: "text-[8px]",
        sm: "text-[9px]",
        base: "text-[10px]",
        md: "text-[11px]",
        lg: "text-[12px]",
        xl: "text-[13px]",
        icon: { sm: 10, md: 11, lg: 12 },
        status: "text-[8px]",
        nav: "text-[7px]",
        navIcon: 11,
      }
    : {
        xs: "text-[10px]",
        sm: "text-[11px]",
        base: "text-[12px]",
        md: "text-[13px]",
        lg: "text-[14px]",
        xl: "text-[16px]",
        icon: { sm: 12, md: 14, lg: 15 },
        status: "text-[10px]",
        nav: "text-[9px]",
        navIcon: 15,
      };
}

type PhoneSize = keyof typeof SIZES;
type PhoneVariant = "dashboard" | "week" | "tasks" | "diary" | "checklists" | "list" | "report";

type PhoneMockupProps = {
  children?: ReactNode;
  className?: string;
  size?: PhoneSize;
  variant?: PhoneVariant;
  listItems?: string[];
  perspective?: "flat" | "3d";
};

export function PhoneMockup({
  children,
  className = "",
  size = "md",
  variant = "dashboard",
  listItems,
  perspective = "flat",
}: PhoneMockupProps) {
  const compact = size === "sm";

  const phone = (
    <div className={`phone-shell ${perspective === "3d" ? "phone-shell-3d" : ""}`}>
      <div className="phone-island" />
      <div className="phone-display">
        {children ?? (
          <PhoneScreen
            variant={variant}
            listItems={listItems}
            compact={compact}
          />
        )}
      </div>
    </div>
  );

  if (perspective === "3d") {
    return (
      <div className={`phone-3d-scene ${className}`}>
        <div className="phone-3d-shadow" aria-hidden />
        <div className="phone-3d-shadow phone-3d-shadow-soft" aria-hidden />
        <div className="phone-3d-device">
          <div className={`phone-3d-stack shrink-0 ${SIZES[size]}`}>{phone}</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto shrink-0 ${SIZES[size]} ${className}`}>
      {phone}
    </div>
  );
}

function PhoneScreen({
  variant,
  listItems,
  compact,
  cutout,
}: {
  variant: PhoneVariant;
  listItems?: string[];
  compact?: boolean;
  cutout?: boolean;
}) {
  if (variant === "list" && listItems) {
    return <ListScreen items={listItems} compact={compact} />;
  }
  if (variant === "week") return <WeekScreen compact={compact} />;
  if (variant === "diary") return <DiaryScreen compact={compact} cutout={cutout} />;
  if (variant === "tasks") return <TasksScreen compact={compact} cutout={cutout} />;
  if (variant === "checklists") return <ChecklistsScreen compact={compact} />;
  if (variant === "report") return <ReportScreen compact={compact} />;
  return <DashboardScreen compact={compact} />;
}

function StatusBar({ compact }: { compact?: boolean }) {
  const t = phoneType(compact);
  return (
    <div
      className={`flex items-center justify-between px-3 text-[#2d2654] ${compact ? "pt-1" : "pt-1.5"} ${t.status}`}
    >
      <span className="font-semibold">9:41</span>
      <div className="flex items-center gap-1 opacity-70">
        <span className={`rounded-sm bg-current ${compact ? "h-1.5 w-2.5" : "h-2 w-3"}`} />
        <span className={`rounded-sm bg-current ${compact ? "h-1.5 w-2" : "h-2 w-2.5"}`} />
        <span className={`rounded-sm border border-current ${compact ? "h-1.5 w-3" : "h-2 w-3.5"}`} />
      </div>
    </div>
  );
}

function DashboardScreen({ compact }: { compact?: boolean }) {
  const gradientId = useId().replace(/:/g, "");
  const t = phoneType(compact);
  const sizes = compact
    ? {
        fetus: "h-11 w-11",
        quickIcon: 11,
        rowIcon: "h-6 w-6",
        quickBox: "h-7 w-7",
        badge: "h-3 w-3 text-[7px]",
        waterDot: "h-1 w-1",
        quickLabel: "text-[7px] leading-[1.2]",
        heart: "text-[11px]",
      }
    : {
        fetus: "h-16 w-16",
        quickIcon: 15,
        rowIcon: "h-8 w-8",
        quickBox: "h-10 w-10",
        badge: "h-3.5 w-3.5 text-[8px]",
        waterDot: "h-1.5 w-1.5",
        quickLabel: "text-[8px] leading-[1.2]",
        heart: "text-sm",
      };

  const todayItems = [
    {
      icon: Calendar,
      bg: "bg-violet-100 text-violet-600",
      title: "Ближайший визит к врачу",
      sub: "20 мая, вт • 10:00",
    },
    {
      icon: Pill,
      bg: "bg-sky-100 text-sky-600",
      title: "Приём витаминов",
      sub: "Омега-3, Витамин D • 08:00",
    },
    {
      icon: Droplets,
      bg: "bg-blue-100 text-blue-600",
      title: "Вода",
      sub: "5 из 8 стаканов",
      water: true,
    },
    {
      icon: ClipboardList,
      bg: "bg-emerald-100 text-emerald-600",
      title: "Дневник самочувствия",
      sub: "Заполните как себя чувствуете",
      heart: true,
    },
  ];

  const quickActions = [
    { icon: Heart, label: "Визит к врачу", bg: "bg-pink-50" },
    { icon: MessageCircle, label: "Дневник", bg: "bg-violet-50" },
    { icon: Droplets, label: "Вода", bg: "bg-sky-50" },
    { icon: Bell, label: "Напоминания", bg: "bg-amber-50" },
    { icon: MoreHorizontal, label: "Больше", bg: "bg-slate-50" },
  ];

  return (
    <div className="phone-app-screen-dashboard flex h-full min-h-0 flex-col pb-1">
      <StatusBar compact={compact} />

      <div className="flex shrink-0 items-start justify-between gap-2 px-2.5 pt-0.5">
        <div>
          <p className={`font-bold leading-tight text-[#2d2654] ${t.xl}`}>
            Доброе утро, Анна! 👋
          </p>
          <p className={`mt-0.5 text-violet-500 ${t.sm}`}>Мы рядом с вами каждый день</p>
        </div>
        <div className="relative shrink-0">
          <Bell size={t.icon.md + 2} className="text-violet-500" />
          <span
            className={`absolute -top-1 -right-1 flex items-center justify-center rounded-full bg-rose-500 font-bold text-white ${sizes.badge}`}
          >
            2
          </span>
        </div>
      </div>

      <div className="mx-2.5 mt-1 shrink-0 rounded-2xl bg-white p-2.5 shadow-sm ring-1 ring-violet-100/80">
        <p className={`font-bold text-[#2d2654] ${t.lg}`}>Вы на 24 неделе и 3 дня</p>
        <p className={`mt-0.5 text-violet-500 ${t.sm}`}>2 триместр • Осталось 15 недель</p>

        <div className="mt-1.5 flex items-center gap-2.5">
          <BabyInWombIcon className={sizes.fetus} gradientId={gradientId} />
          <div className="min-w-0 flex-1">
            <p className={`text-violet-500 ${t.sm}`}>Размер малыша</p>
            <p className={`font-bold leading-tight text-[#2d2654] ${t.md}`}>~ 30 см</p>
            <p className={`font-bold leading-tight text-[#2d2654] ${t.md}`}>~ 600 г</p>
            <p className={`mt-0.5 text-violet-600 ${t.sm}`}>как крупный киви 🥝</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-2.5 pt-1">
        <p className={`shrink-0 font-semibold text-[#2d2654] ${t.base}`}>Сегодня</p>

        <div className="flex flex-1 flex-col justify-evenly py-0.5">
          {todayItems.map((item) => (
            <div
              key={item.title}
              className={`flex items-center gap-2 rounded-xl bg-white px-2 shadow-sm ring-1 ring-violet-50 ${compact ? "py-1.5" : "py-2"}`}
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-xl ${item.bg} ${sizes.rowIcon}`}
              >
                <item.icon size={t.icon.md} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-medium leading-tight text-[#2d2654] ${t.base}`}>{item.title}</p>
                <p className={`leading-tight text-violet-500 ${t.sm}`}>{item.sub}</p>
                {item.water && (
                  <div className="mt-0.5 flex gap-0.5">
                    {[...Array(8)].map((_, i) => (
                      <span
                        key={i}
                        className={`rounded-full ${sizes.waterDot} ${i < 5 ? "bg-sky-400" : "bg-sky-100"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              {item.heart && <span className={sizes.heart}>🧡</span>}
            </div>
          ))}
        </div>

        <div className="shrink-0 pt-1">
          <p className={`font-semibold text-[#2d2654] ${t.base}`}>Быстрые действия</p>

          <div className="mt-1.5 grid grid-cols-5 gap-1">
          {quickActions.map((action) => (
            <div key={action.label} className="flex min-w-0 flex-col items-center gap-1">
              <div
                className={`flex shrink-0 items-center justify-center rounded-2xl ${action.bg} ${sizes.quickBox}`}
              >
                <action.icon size={sizes.quickIcon} className="text-violet-600" strokeWidth={2} />
              </div>
              <span
                className={`line-clamp-2 w-full overflow-hidden break-words px-px text-center text-violet-600 ${sizes.quickLabel}`}
              >
                {action.label}
              </span>
            </div>
          ))}
          </div>
        </div>
      </div>

      <PhoneNav compact={compact} className="shrink-0" />
    </div>
  );
}

function WeekScreen({ compact }: { compact?: boolean }) {
  const { t } = useLocale();
  const week = t.currentWeek.phoneWeek;
  const gradientId = useId().replace(/:/g, "");

  const tSize = compact
    ? {
        week: phoneType(true).xl,
        trimester: phoneType(true).sm,
        heroSub: phoneType(true).sm,
        heroValue: phoneType(true).lg,
        heroTitle: phoneType(true).base,
        sectionTitle: phoneType(true).base,
        sectionSub: phoneType(true).sm,
        btn: phoneType(true).sm,
        icon: phoneType(true).icon.lg,
        sectionIcon: "h-7 w-7",
        fetus: "h-12 w-12",
      }
    : {
        week: phoneType(false).xl,
        trimester: phoneType(false).sm,
        heroSub: phoneType(false).sm,
        heroValue: phoneType(false).xl,
        heroTitle: phoneType(false).md,
        sectionTitle: phoneType(false).base,
        sectionSub: phoneType(false).sm,
        btn: phoneType(false).sm,
        icon: phoneType(false).icon.lg,
        sectionIcon: "h-9 w-9",
        fetus: "h-16 w-16",
      };

  const sectionIcons = [Baby, ClipboardList, Zap];
  const sectionStyles = [
    "bg-sky-100 text-sky-600",
    "bg-pink-100 text-pink-600",
    "bg-amber-100 text-amber-600",
  ];

  return (
    <div className="phone-app-screen-dashboard flex h-full min-h-0 flex-col pb-1.5">
      <StatusBar compact={compact} />

      <div className="flex shrink-0 items-center justify-between px-2.5 pt-0.5">
        <ArrowLeft size={tSize.icon + 1} className="shrink-0 text-[#2d2654]" strokeWidth={2} />
        <div className="min-w-0 flex-1 px-1 text-center">
          <p className={`font-bold leading-tight text-[#2d2654] ${tSize.week}`}>{week.week}</p>
          <p className={`text-violet-500 ${tSize.trimester}`}>{week.trimester}</p>
        </div>
        <Share2 size={tSize.icon + 1} className="shrink-0 text-[#2d2654]" strokeWidth={2} />
      </div>

      <div className="mx-2.5 mt-1.5 shrink-0 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-violet-100/80">
        <div className="flex items-center gap-3">
          <BabyInWombIcon className={`shrink-0 ${tSize.fetus}`} gradientId={gradientId} />
          <div className="min-w-0 flex-1">
            <p className={`text-violet-500 ${tSize.heroSub}`}>{week.daysToBirthPrefix}</p>
            <p className={`font-bold leading-tight text-primary ${tSize.heroValue}`}>
              {week.daysToBirthValue}
            </p>
            <p className={`mt-1 text-violet-500 ${tSize.heroSub}`}>{week.sizeComparePrefix}</p>
            <p className={`font-bold leading-tight text-[#2d2654] ${tSize.heroTitle}`}>
              {week.sizeCompareValue}
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-1.5 px-2.5 py-1.5">
        {week.sections.map((section, i) => {
          const Icon = sectionIcons[i];
          return (
            <div
              key={section.title}
              className="flex flex-1 items-start gap-2.5 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-violet-50"
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-xl ${sectionStyles[i]} ${tSize.sectionIcon}`}
              >
                <Icon size={tSize.icon} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-semibold leading-tight text-[#2d2654] ${tSize.sectionTitle}`}>
                  {section.title}
                </p>
                <p className={`mt-1 leading-snug text-violet-500 ${tSize.sectionSub}`}>
                  {section.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className={`mx-2.5 mb-1.5 block w-[calc(100%-1.25rem)] shrink-0 rounded-xl bg-primary font-semibold text-white shadow-sm ${compact ? "py-2" : "py-3"} ${tSize.btn}`}
      >
        {week.cta}
      </button>
    </div>
  );
}

function diaryScreenType(compact?: boolean, cutout?: boolean) {
  if (cutout) {
    return {
      title: "text-[17px]",
      prompt: "text-[14px]",
      label: "text-[13px]",
      value: "text-[14px]",
      day: "text-[12px]",
      mood: 22,
      dayNum: "text-[13px]",
      dateCircle: "h-7 w-7",
      rowIcon: "h-8 w-8",
      moodBox: "h-10 w-10",
      statIcon: 15,
      cardPy: "py-2.5",
    };
  }
  if (compact) {
    return {
      title: phoneType(true).lg,
      prompt: phoneType(true).md,
      label: phoneType(true).base,
      value: phoneType(true).md,
      day: phoneType(true).sm,
      mood: 18,
      dayNum: phoneType(true).sm,
      dateCircle: "h-6 w-6",
      rowIcon: "h-7 w-7",
      moodBox: "h-8 w-8",
      statIcon: 13,
      cardPy: "py-2",
    };
  }
  return {
    title: phoneType(false).xl,
    prompt: phoneType(false).md,
    label: phoneType(false).base,
    value: phoneType(false).md,
    day: phoneType(false).sm,
    mood: 22,
    dayNum: phoneType(false).base,
    dateCircle: "h-7 w-7",
    rowIcon: "h-8 w-8",
    moodBox: "h-10 w-10",
    statIcon: 16,
    cardPy: "py-2.5",
  };
}

function DiaryScreen({ compact, cutout }: { compact?: boolean; cutout?: boolean }) {
  const { t } = useLocale();
  const diary = t.currentWeek.phoneDiary;

  const tSize = diaryScreenType(compact, cutout);

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const moods = [
    { icon: Frown, bg: "bg-rose-100 text-rose-500", active: false },
    { icon: Meh, bg: "bg-orange-100 text-orange-500", active: false },
    { icon: Meh, bg: "bg-amber-100 text-amber-500", active: false },
    { icon: Smile, bg: "bg-lime-100 text-lime-600", active: true },
    { icon: Smile, bg: "bg-emerald-100 text-emerald-600", active: false },
  ];

  return (
    <div
      className={`phone-app-screen-dashboard flex flex-col ${cutout ? "h-auto" : "h-full min-h-0"}`}
    >
      {!cutout && <StatusBar compact={compact} />}
      <p className={`shrink-0 px-2.5 pt-0.5 font-bold text-[#2d2654] ${tSize.title}`}>{diary.title}</p>

      <div
        className={`flex flex-col px-2.5 ${cutout ? "gap-3 py-2" : "min-h-0 flex-1 justify-evenly py-1"}`}
      >
        <div>
          <div className="flex justify-between gap-0.5">
            {days.map((day, i) => (
              <div key={day} className="flex flex-1 flex-col items-center gap-0.5">
                <span className={`text-violet-400 ${tSize.day}`}>{day}</span>
                <span
                  className={`flex items-center justify-center rounded-full font-semibold ${tSize.dateCircle} ${tSize.dayNum} ${i === 3 ? "bg-primary text-white" : "bg-violet-100 text-violet-600"}`}
                >
                  {12 + i}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className={`font-medium text-[#2d2654] ${tSize.prompt}`}>{diary.prompt}</p>
          <div className="mt-1.5 flex justify-between gap-1">
            {moods.map((mood, i) => (
              <div
                key={i}
                className={`flex items-center justify-center rounded-full ${mood.bg} ${mood.active ? "ring-2 ring-primary/40" : ""} ${tSize.moodBox}`}
              >
                <mood.icon size={tSize.mood} strokeWidth={2} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <div className={`flex items-center justify-between rounded-xl bg-white px-2.5 ring-1 ring-violet-50 ${tSize.cardPy}`}>
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center rounded-lg bg-violet-100 text-violet-600 ${tSize.rowIcon}`}>
                <Moon size={tSize.statIcon} strokeWidth={2} />
              </div>
              <span className={`text-violet-600 ${tSize.label}`}>{diary.sleepLabel}</span>
            </div>
            <span className={`font-semibold text-[#2d2654] ${tSize.value}`}>{diary.sleep}</span>
          </div>
          <div className={`flex items-center justify-between rounded-xl bg-white px-2.5 ring-1 ring-violet-50 ${tSize.cardPy}`}>
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center rounded-lg bg-amber-100 text-amber-600 ${tSize.rowIcon}`}>
                <Zap size={tSize.statIcon} strokeWidth={2} />
              </div>
              <span className={`text-violet-600 ${tSize.label}`}>{diary.energyLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`rounded-full ${cutout ? "h-1.5 w-1.5" : compact ? "h-1 w-1" : "h-1.5 w-1.5"} ${i < 4 ? "bg-amber-400" : "bg-amber-100"}`}
                  />
                ))}
              </div>
              <span className={`font-semibold text-[#2d2654] ${tSize.value}`}>{diary.energy}</span>
            </div>
          </div>
          <div className={`flex items-center justify-between rounded-xl bg-white px-2.5 ring-1 ring-violet-50 ${tSize.cardPy}`}>
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 ${tSize.rowIcon}`}>
                <Droplets size={tSize.statIcon} strokeWidth={2} />
              </div>
              <span className={`text-violet-600 ${tSize.label}`}>{diary.symptomsLabel}</span>
            </div>
            <span className={`font-semibold text-[#2d2654] ${tSize.value}`}>{diary.symptoms}</span>
          </div>
        </div>
      </div>

      {!cutout && <PhoneNav active="diary" compact={compact} className="shrink-0" />}
    </div>
  );
}

function tasksScreenType(compact?: boolean, cutout?: boolean) {
  if (cutout) {
    return {
      title: "text-[18px]",
      cardTitle: "text-[14px]",
      cardDate: "text-[13px]",
      cardCountdown: "text-[12px]",
      rowTitle: "text-[14px]",
      rowSub: "text-[13px]",
      icon: 15,
      visitIcon: 20,
      visitIconBox: "h-12 w-12",
      rowIcon: "h-9 w-9",
      plus: "h-7 w-7",
      chevron: 15,
      badge: "h-6 w-6 text-[10px]",
      waterDot: "h-1.5 w-1.5",
      rowPy: "py-2",
      cardP: "p-3",
    };
  }
  if (compact) {
    return {
      title: phoneType(true).xl,
      cardTitle: phoneType(true).md,
      cardDate: phoneType(true).base,
      cardCountdown: phoneType(true).sm,
      rowTitle: phoneType(true).md,
      rowSub: phoneType(true).base,
      icon: phoneType(true).icon.md + 1,
      visitIcon: phoneType(true).icon.lg + 1,
      visitIconBox: "h-11 w-11",
      rowIcon: "h-8 w-8",
      plus: "h-6 w-6",
      chevron: 13,
      badge: "h-5 w-5 text-[9px]",
      waterDot: "h-1 w-1",
      rowPy: "py-1.5",
      cardP: "p-2.5",
    };
  }
  return {
    title: "text-[17px]",
    cardTitle: phoneType(false).md,
    cardDate: phoneType(false).base,
    cardCountdown: phoneType(false).sm,
    rowTitle: phoneType(false).md,
    rowSub: phoneType(false).base,
    icon: phoneType(false).icon.md + 1,
    visitIcon: phoneType(false).icon.lg + 1,
    visitIconBox: "h-12 w-12",
    rowIcon: "h-9 w-9",
    plus: "h-7 w-7",
    chevron: 15,
    badge: "h-6 w-6 text-[10px]",
    waterDot: "h-1.5 w-1.5",
    rowPy: "py-2",
    cardP: "p-3",
  };
}

function TasksScreen({ compact, cutout }: { compact?: boolean; cutout?: boolean }) {
  const { t } = useLocale();
  const tasks = t.currentWeek.phoneTasks;

  const tSize = tasksScreenType(compact, cutout);

  const rowIcons = [Smile, FlaskConical, Droplets, Pill, Bell];
  const rowStyles = [
    "bg-violet-100 text-violet-600",
    "bg-violet-100 text-violet-600",
    "bg-sky-100 text-sky-600",
    "bg-emerald-100 text-emerald-600",
    "bg-amber-100 text-amber-600",
  ];

  function TaskTrailing({ kind, badge }: { kind: (typeof tasks.items)[number]["kind"]; badge?: string }) {
    if (kind === "link") {
      return <ChevronRight size={tSize.chevron} className="shrink-0 text-violet-300" strokeWidth={2} />;
    }
    if (kind === "water") {
      return (
        <div className="flex shrink-0 gap-0.5">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className={`rounded-full ${tSize.waterDot} ${i < 5 ? "bg-sky-400" : "bg-sky-100"}`}
            />
          ))}
        </div>
      );
    }
    if (kind === "check") {
      return (
        <div className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white ${tSize.badge}`}>
          <Check size={compact ? 10 : 12} strokeWidth={2.5} />
        </div>
      );
    }
    return (
      <div className={`flex shrink-0 items-center justify-center rounded-full bg-rose-400 font-bold text-white ${tSize.badge}`}>
        {badge}
      </div>
    );
  }

  return (
    <div
      className={`phone-app-screen-dashboard flex flex-col ${cutout ? "h-auto" : "h-full min-h-0"}`}
    >
      {!cutout && <StatusBar compact={compact} />}

      <div className="flex shrink-0 items-center justify-between px-2.5 pt-0.5">
        <p className={`font-bold text-[#2d2654] ${tSize.title}`}>{tasks.title}</p>
        {!cutout && (
          <button
            type="button"
            className={`flex shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm ${tSize.plus}`}
            aria-label="+"
          >
            <Plus size={compact ? 12 : 14} strokeWidth={2.5} />
          </button>
        )}
      </div>

      <div className={`mx-2.5 mt-1.5 shrink-0 rounded-2xl bg-white shadow-sm ring-1 ring-violet-100/80 ${tSize.cardP}`}>
        <div className="flex items-start gap-2.5">
          <div
            className={`flex shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-600 ${tSize.visitIconBox}`}
          >
            <Calendar size={tSize.visitIcon} strokeWidth={1.75} />
          </div>
          <div className="min-w-0 flex-1">
            <p className={`font-bold text-[#2d2654] ${tSize.cardTitle}`}>{tasks.nextVisitTitle}</p>
            <p className={`mt-0.5 leading-snug text-violet-700/85 ${tSize.cardDate}`}>{tasks.nextVisitDate}</p>
            <p className={`mt-1 text-sky-600/80 ${tSize.cardCountdown}`}>{tasks.nextVisitCountdown}</p>
          </div>
        </div>
      </div>

      <div
        className={`flex min-h-0 flex-col px-2.5 pt-2 ${cutout ? "gap-1.5 pb-2" : "flex-1 justify-evenly gap-0.5 pb-1"}`}
      >
        {tasks.items.map((item, i) => {
          const Icon = rowIcons[i];
          return (
            <div
              key={item.title}
              className={`flex items-center gap-2 rounded-xl bg-white px-2 shadow-sm ring-1 ring-violet-50/80 ${tSize.rowPy}`}
            >
              <div
                className={`flex shrink-0 items-center justify-center rounded-full ${rowStyles[i]} ${tSize.rowIcon}`}
              >
                <Icon size={tSize.icon} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={`font-semibold text-[#2d2654] ${tSize.rowTitle}`}>{item.title}</p>
                <p className={`text-violet-500 ${tSize.rowSub}`}>{item.sub}</p>
              </div>
              <TaskTrailing kind={item.kind} badge={item.badge} />
            </div>
          );
        })}
      </div>

      {!cutout && <PhoneNav active="visits" compact={compact} className="shrink-0" />}
    </div>
  );
}

function ReportScreen({ compact }: { compact?: boolean }) {
  const { t: locale } = useLocale();
  const report = locale.calendar.phoneReport;
  const buttons = locale.calendar.reportButtons;

  const t = phoneType(compact);
  const tSize = compact
    ? {
        iconBox: "h-7 w-7",
        checkIcon: 11,
        checkBox: "h-5 w-5",
      }
    : {
        iconBox: "h-9 w-9",
        checkIcon: 13,
        checkBox: "h-7 w-7",
      };

  const rowIcons = [
    { icon: Calendar, bg: "bg-violet-100 text-violet-600" },
    { icon: Frown, bg: "bg-amber-100 text-amber-600" },
    { icon: BarChart3, bg: "bg-sky-100 text-sky-600" },
    { icon: HelpCircle, bg: "bg-purple-100 text-purple-600" },
    { icon: Calendar, bg: "bg-emerald-100 text-emerald-600" },
  ];

  return (
    <div className="phone-app-screen flex h-full min-h-0 flex-col">
      <StatusBar compact={compact} />

      <div className="flex shrink-0 items-center justify-between px-2.5 pt-0.5">
        <ArrowLeft size={t.icon.md + 1} className="text-[#2d2654]" strokeWidth={2} />
        <p className={`font-bold text-[#2d2654] ${t.lg}`}>{report.title}</p>
        <MoreHorizontal size={t.icon.md + 1} className="text-[#2d2654]" strokeWidth={2} />
      </div>

      <div className="mx-2.5 mt-1.5 flex shrink-0 items-start gap-2 rounded-xl bg-emerald-50/90 px-2 py-2 ring-1 ring-emerald-100">
        <div className={`flex shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white ${tSize.checkBox}`}>
          <Check size={tSize.checkIcon} strokeWidth={2.5} />
        </div>
        <div className="min-w-0">
          <p className={`font-semibold text-emerald-800 ${t.base}`}>{report.readyTitle}</p>
          <p className={`text-emerald-700/80 ${t.sm}`}>{report.readySub}</p>
        </div>
      </div>

      <div className="mx-2.5 mt-1.5 flex min-h-0 flex-1 flex-col rounded-2xl bg-white p-2 shadow-sm ring-1 ring-violet-50">
        <p className={`shrink-0 font-semibold text-[#2d2654] ${t.base}`}>{report.summaryTitle}</p>
        <div className="flex min-h-0 flex-1 flex-col justify-evenly divide-y divide-violet-100/80">
          {report.items.map((item, i) => {
            const meta = rowIcons[i];
            return (
              <div key={item.title} className="flex items-center gap-2 py-2 first:pt-1 last:pb-1">
                <div className={`flex shrink-0 items-center justify-center rounded-lg ${meta.bg} ${tSize.iconBox}`}>
                  <meta.icon size={t.icon.md} strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`font-medium text-[#2d2654] ${t.base}`}>{item.title}</p>
                  <p className={`text-violet-500 ${t.sm}`}>{item.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="shrink-0 space-y-1 px-2.5 pb-0.5 pt-1.5">
        <button
          type="button"
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl bg-primary font-semibold text-white shadow-sm ${compact ? "py-1.5" : "py-2.5"} ${t.sm}`}
        >
          <Eye size={t.icon.md} strokeWidth={2} />
          {buttons.show}
        </button>
        <button
          type="button"
          className={`flex w-full items-center justify-center gap-1.5 rounded-xl border border-violet-200 bg-white font-semibold text-violet-700 ${compact ? "py-1.5" : "py-2.5"} ${t.sm}`}
        >
          <Download size={t.icon.md} strokeWidth={2} />
          {buttons.pdf}
        </button>
      </div>
      <PhoneHomeIndicator compact={compact} />
    </div>
  );
}

function ChecklistsScreen({ compact }: { compact?: boolean }) {
  const t = phoneType(compact);
  const items = [
    {
      label: "1 триместр",
      sub: "Первые шаги и важные дела",
      progress: 3,
      total: 12,
      icon: Sprout,
      tone: "bg-emerald-100 text-emerald-600",
    },
    {
      label: "2 триместр",
      sub: "Поддержка и новые привычки",
      progress: 5,
      total: 15,
      icon: Heart,
      tone: "bg-violet-100 text-violet-600",
    },
    {
      label: "3 триместр",
      sub: "Подготовка к встрече",
      progress: 2,
      total: 10,
      icon: Baby,
      tone: "bg-pink-100 text-pink-600",
    },
    {
      label: "Сумка в роддом",
      sub: "Что взять с собой",
      progress: 1,
      total: 8,
      icon: ShoppingBag,
      tone: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="phone-app-screen">
      <StatusBar compact={compact} />
      <p className={`px-3 pt-1 font-bold text-[#2d2654] ${t.lg}`}>Чек-листы</p>
      <div className="mx-3 mt-2 flex rounded-full bg-violet-50/90 p-0.5 ring-1 ring-violet-100/80">
        <span
          className={`flex-1 rounded-full bg-white py-1 text-center font-semibold text-primary shadow-sm ${t.sm}`}
        >
          По триместрам
        </span>
        <span className={`flex-1 py-1 text-center text-violet-400 ${t.sm}`}>Все чек-листы</span>
      </div>
      <div className="mt-2.5 space-y-2 px-3 pb-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-2xl bg-white px-2.5 py-2 ring-1 ring-violet-50">
              <div className="flex items-start gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
                >
                  <Icon size={compact ? 14 : 16} strokeWidth={1.75} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className={`font-semibold text-[#2d2654] ${t.base}`}>{item.label}</span>
                    <span className={`shrink-0 text-violet-400 ${t.sm}`}>
                      {item.progress}/{item.total}
                    </span>
                  </div>
                  <p className={`mt-0.5 text-violet-500 ${t.xs}`}>{item.sub}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-violet-100">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(item.progress / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ListScreen({ items, compact }: { items: string[]; compact?: boolean }) {
  const t = phoneType(compact);
  return (
    <div className="phone-app-screen">
      <StatusBar compact={compact} />
      <div className="px-2 pt-1">
        {items.map((item) => (
          <div
            key={item}
            className={`mb-1.5 rounded-xl bg-white px-2 py-2 font-medium text-violet-800 ring-1 ring-violet-50 ${t.base}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhoneHomeIndicator({ compact }: { compact?: boolean }) {
  return (
    <div className="flex shrink-0 justify-center pb-1 pt-0.5">
      <div className={`rounded-full bg-[#2d2654]/25 ${compact ? "h-0.5 w-10" : "h-1 w-14"}`} />
    </div>
  );
}

function PhoneNav({
  active = "home",
  compact,
  className = "",
}: {
  active?: string;
  compact?: boolean;
  className?: string;
}) {
  const t = phoneType(compact);
  const items = [
    { id: "home", icon: Home, label: "Главная" },
    { id: "calendar", icon: Calendar, label: "Календарь" },
    { id: "diary", icon: MessageCircle, label: "Дневник" },
    { id: "visits", icon: UserRound, label: "Визиты" },
    { id: "more", icon: LayoutGrid, label: "Ещё" },
  ];

  return (
    <div className={`shrink-0 border-t border-violet-100 bg-white/95 px-1 pt-1 pb-0.5 ${className}`}>
      <div className="flex justify-around">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <div key={item.id} className="flex flex-col items-center gap-0.5">
              <item.icon
                size={t.navIcon}
                className={isActive ? "text-primary" : "text-violet-300"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`leading-none ${t.nav} ${isActive ? "font-semibold text-primary" : "text-violet-400"}`}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const CUTOUT_SOURCE_WIDTH = 200;
const CUTOUT_SCALE = 0.7;
const CUTOUT_HEIGHT = 288;

type PhoneCutoutVariant = "diary" | "tasks";

export function PhoneScreenCutout({
  variant,
  className = "",
}: {
  variant: PhoneCutoutVariant;
  className?: string;
}) {
  return (
    <div
      className={`phone-cutout shrink-0 self-start overflow-hidden rounded-[1.35rem] shadow-[0_8px_28px_rgba(107,78,230,0.14)] ring-1 ring-violet-100/90 ${className}`}
      style={{
        width: CUTOUT_SOURCE_WIDTH * CUTOUT_SCALE,
        height: CUTOUT_HEIGHT,
      }}
    >
      <div
        className="origin-top-left"
        style={{
          width: CUTOUT_SOURCE_WIDTH,
          transform: `scale(${CUTOUT_SCALE})`,
        }}
      >
        <PhoneScreen variant={variant} compact cutout />
      </div>
    </div>
  );
}
