import {
    ArrowUpRight,
    BarChart3,
    Megaphone,
    Users,
    Zap,
} from "lucide-react";

const stats = [
    {
        title: "Active Campaigns",
        value: "12",
        change: "+18.2%",
        icon: Megaphone,
    },
    {
        title: "Total Reach",
        value: "248.6K",
        change: "+24.8%",
        icon: Users,
    },
    {
        title: "Engagement Rate",
        value: "8.42%",
        change: "+12.4%",
        icon: BarChart3,
    },
    {
        title: "AI Actions",
        value: "1,284",
        change: "+31.6%",
        icon: Zap,
    },
];

export default function StatsCards() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.title}
                        className="rounded-xl border border-gray-200 bg-white p-5"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                <Icon size={19} className="text-gray-700" />
                            </div>

                            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                                <ArrowUpRight size={14} />
                                {stat.change}
                            </span>
                        </div>

                        <p className="mt-4 text-sm text-gray-500">{stat.title}</p>

                        <p className="mt-1 text-2xl font-semibold tracking-tight">
                            {stat.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}