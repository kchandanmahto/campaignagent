import {
    ArrowDownRight,
    ArrowUpRight,
    BarChart3,
    MousePointerClick,
    Target,
    Users,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

export default function AnalyticsPage() {
    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div>
                    <p className="text-sm text-gray-500">Workspace</p>
                    <h1 className="mt-1 text-2xl font-semibold">Analytics</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Understand campaign performance and marketing outcomes.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <Metric title="Total Reach" value="248.6K" change="+24.8%" up icon={<Users size={18} />} />
                    <Metric title="Engagement" value="8.42%" change="+12.4%" up icon={<MousePointerClick size={18} />} />
                    <Metric title="Conversions" value="3,842" change="+18.7%" up icon={<Target size={18} />} />
                    <Metric title="Cost / Result" value="$4.82" change="-8.3%" icon={<BarChart3 size={18} />} />
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-semibold">Campaign Performance</h2>
                                <p className="mt-1 text-xs text-gray-500">
                                    Last 30 days
                                </p>
                            </div>

                            <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm">
                                <option>Last 30 days</option>
                                <option>Last 90 days</option>
                                <option>This year</option>
                            </select>
                        </div>

                        <div className="mt-8 flex h-64 items-end gap-2">
                            {[42, 55, 48, 72, 61, 78, 68, 84, 74, 92, 81, 96].map(
                                (height, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-1 items-end"
                                    >
                                        <div
                                            className="w-full rounded-t-md bg-[#635bff]/80"
                                            style={{ height: `${height}%` }}
                                        />
                                    </div>
                                )
                            )}
                        </div>

                        <div className="mt-3 flex justify-between text-[11px] text-gray-400">
                            <span>Aug 20</span>
                            <span>Aug 27</span>
                            <span>Sep 3</span>
                            <span>Sep 10</span>
                            <span>Sep 19</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="font-semibold">Top Campaigns</h2>

                        <div className="mt-5 space-y-5">
                            {[
                                ["Summer Product Launch", "9.8%"],
                                ["Brand Awareness Q4", "7.4%"],
                                ["Product Retargeting", "5.2%"],
                                ["Holiday Sale", "4.8%"],
                            ].map(([name, rate]) => (
                                <div key={name}>
                                    <div className="flex justify-between">
                                        <span className="text-sm">{name}</span>
                                        <span className="text-sm font-medium">{rate}</span>
                                    </div>

                                    <div className="mt-2 h-1.5 rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-[#635bff]"
                                            style={{ width: rate }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

function Metric({
    title,
    value,
    change,
    up,
    icon,
}: {
    title: string;
    value: string;
    change: string;
    up?: boolean;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                    {icon}
                </div>

                <span
                    className={`flex items-center gap-1 text-xs font-medium ${up ? "text-green-600" : "text-green-600"
                        }`}
                >
                    {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {change}
                </span>
            </div>

            <p className="mt-4 text-sm text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
    );
}