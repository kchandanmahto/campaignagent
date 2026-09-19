import AppShell from "@/components/layout/AppShell";
import Link from "next/link";

const tabs = [
    "Overview",
    "Brief",
    "Audience",
    "Strategy",
    "Content",
    "Creative",
    "Approval",
    "Activity",
];

export default async function CampaignWorkspace({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div className="mb-6">
                    <Link
                        href="/campaigns"
                        className="text-sm text-gray-500 hover:text-gray-900"
                    >
                        ← Back to Campaigns
                    </Link>

                    <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl font-semibold">
                                    Summer Product Launch
                                </h1>

                                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                    Active
                                </span>
                            </div>

                            <p className="mt-1 text-sm text-gray-500">
                                Acme Corporation · Meta · Campaign ID: {id}
                            </p>
                        </div>

                        <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-50">
                            Campaign actions
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="overflow-x-auto border-b border-gray-200">
                    <div className="flex min-w-max gap-6">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
                                className={`border-b-2 px-1 pb-3 text-sm ${index === 0
                                        ? "border-[#635bff] font-medium text-[#635bff]"
                                        : "border-transparent text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Overview */}
                <div className="mt-6 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 lg:col-span-2">
                        <h2 className="font-semibold">
                            Campaign Overview
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            High-level campaign performance and status.
                        </p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-3">
                            <Metric label="Reach" value="84.2K" />
                            <Metric label="Engagement" value="9.8%" />
                            <Metric label="Budget Used" value="$8,420" />
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                        <h2 className="font-semibold">
                            AI Workflow
                        </h2>

                        <div className="mt-5 space-y-4">
                            <WorkflowStep
                                label="Research"
                                status="Completed"
                            />

                            <WorkflowStep
                                label="Audience"
                                status="Completed"
                            />

                            <WorkflowStep
                                label="Strategy"
                                status="Completed"
                            />

                            <WorkflowStep
                                label="Content"
                                status="In Progress"
                            />

                            <WorkflowStep
                                label="Approval"
                                status="Pending"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

function Metric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-lg bg-gray-50 p-4">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="mt-1 text-xl font-semibold">{value}</p>
        </div>
    );
}

function WorkflowStep({
    label,
    status,
}: {
    label: string;
    status: string;
}) {
    const completed = status === "Completed";
    const progress = status === "In Progress";

    return (
        <div className="flex items-center gap-3">
            <div
                className={`h-2.5 w-2.5 rounded-full ${completed
                        ? "bg-green-500"
                        : progress
                            ? "bg-[#635bff]"
                            : "bg-gray-300"
                    }`}
            />

            <span className="flex-1 text-sm">{label}</span>

            <span className="text-xs text-gray-500">
                {status}
            </span>
        </div>
    );
}