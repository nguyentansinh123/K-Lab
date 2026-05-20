export interface MetricCardData {
  icon: string;
  iconColorClass: string;
  iconBgClass: string;
  iconBorderClass: string;
  label: string;
  value: string;
  subtext: string;
  subtextColorClass: string;
}

interface MetricsCardsProps {
  cards?: MetricCardData[];
}

const defaultCards: MetricCardData[] = [
  {
    icon: "schedule",
    iconColorClass: "text-primary",
    iconBgClass: "bg-primary/10",
    iconBorderClass: "border-primary/20",
    label: "Total Deep Work",
    value: "128.5h",
    subtext: "+18.4h vs last month",
    subtextColorClass: "text-primary",
  },
  {
    icon: "local_fire_department",
    iconColorClass: "text-error",
    iconBgClass: "bg-error/10",
    iconBorderClass: "border-error/20",
    label: "Current Streak",
    value: "14 days",
    subtext: "Best: 21 days",
    subtextColorClass: "text-outline",
  },
  {
    icon: "my_location",
    iconColorClass: "text-tertiary",
    iconBgClass: "bg-tertiary/10",
    iconBorderClass: "border-tertiary/20",
    label: "Focus Score",
    value: "86%",
    subtext: "+7% vs last month",
    subtextColorClass: "text-primary",
  },
  {
    icon: "trending_up",
    iconColorClass: "text-secondary",
    iconBgClass: "bg-secondary/10",
    iconBorderClass: "border-secondary/20",
    label: "Daily Average",
    value: "2.3h",
    subtext: "+0.6h vs last month",
    subtextColorClass: "text-primary",
  },
];

export default function MetricsCards({ cards = defaultCards }: MetricsCardsProps) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-surface-container p-6 border border-outline-variant/10 flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 ${card.iconBgClass} flex items-center justify-center ${card.iconColorClass} border ${card.iconBorderClass}`}
            >
              <span className="material-symbols-outlined text-sm">{card.icon}</span>
            </div>
            <div className="text-[10px] font-label text-outline uppercase tracking-widest">
              {card.label}
            </div>
          </div>
          <div>
            <div className="text-3xl font-display font-bold text-on-surface">{card.value}</div>
            <div className={`text-[10px] font-body mt-1 ${card.subtextColorClass}`}>
              {card.subtext}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
