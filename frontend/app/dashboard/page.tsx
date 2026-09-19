import AppShell from "@/components/layout/AppShell";
import StatsCards from "@/components/dashboard/StatsCards";

const campaigns = [
    {
        name: "Summer Product Launch",
        client: "Acme Corporation",
        platform: "Meta",
        status: "Active",
        progress: 78,
    },
    {
        name: "Brand Awareness Q4",
        client: "Nova Labs",
        platform: "LinkedIn",
        status: "In Review",
        progress: 52,
    },
    {
        name: "Product Retargeting",
        client: "Vertex Systems",
        platform: "Google",
        status: "Draft",
        progress: 24,
    },
];

export default function DashboardPage() {
    return (
        <AppShell>
            <div className="border-b border-gray-200 bg-white px-4 py-6 md:px-6">
                <div className="mx-auto max-w-7xl">
                    <p className="text-sm text-gray-500">
                        Saturday, September 19, 2026
                    </p>

                    <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                        Good evening, Chandan
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Here&apos;s what&apos;s happening across your marketing workspace.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
                <StatsCards />

                <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                        <div>
                            <h2 className="font-semibold">
                                Recent Campaigns
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Your latest campaign activity
                            </p>
                        </div>

                        <button className="text-sm font-medium text-[#635bff]">
                            View all
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                        {campaigns.map((campaign) => (
                            <div
                                key={campaign.name}
                                className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between"
                            >
                                <div>
                                    <p className="text-sm font-medium">
                                        {campaign.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        {campaign.client} · {campaign.platform}
                                    </p>
                                </div>

                                <div className="flex items-center gap-5">
                                    <div className="w-32">
                                        <div className="mb-1 flex justify-between text-[11px] text-gray-500">
                                            <span>Progress</span>
                                            <span>{campaign.progress}%</span>
                                        </div>

                                        <div className="h-1.5 rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-[#635bff]"
                                                style={{
                                                    width: `${campaign.progress}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                        {campaign.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </AppShell>
    );
}