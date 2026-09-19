"use client";

import { useMemo, useState } from "react";
import {
    CalendarDays,
    ChevronDown,
    Filter,
    Megaphone,
    Plus,
    Search,
    TrendingUp,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const campaigns = [
    {
        id: "summer-launch",
        name: "Summer Product Launch",
        client: "Acme Corporation",
        platform: "Meta",
        status: "Active",
        budget: "$12,500",
        reach: "84.2K",
        engagement: "9.8%",
        updated: "2h ago",
    },
    {
        id: "brand-awareness",
        name: "Brand Awareness Q4",
        client: "Nova Labs",
        platform: "LinkedIn",
        status: "In Review",
        budget: "$8,400",
        reach: "52.8K",
        engagement: "7.4%",
        updated: "5h ago",
    },
    {
        id: "retargeting",
        name: "Product Retargeting",
        client: "Vertex Systems",
        platform: "Google",
        status: "Draft",
        budget: "$6,200",
        reach: "31.5K",
        engagement: "5.2%",
        updated: "1d ago",
    },
    {
        id: "holiday-sale",
        name: "Holiday Sale Campaign",
        client: "Orbit Retail",
        platform: "Instagram",
        status: "Paused",
        budget: "$4,800",
        reach: "21.4K",
        engagement: "4.8%",
        updated: "2d ago",
    },
];

const statuses = ["All", "Active", "In Review", "Draft", "Paused"];

export default function CampaignsPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const filtered = useMemo(() => {
        return campaigns.filter((campaign) => {
            const matchesSearch =
                `${campaign.name} ${campaign.client} ${campaign.platform}`
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesStatus =
                status === "All" || campaign.status === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm text-gray-500">Workspace</p>

                        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                            Campaigns
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Plan, manage and monitor your marketing campaigns.
                        </p>
                    </div>

                    <Link
                        href="/campaigns/new"
                        className="flex items-center justify-center gap-2 rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5548e8]"
                    >
                        <Plus size={17} />
                        New Campaign
                    </Link>
                </div>

                {/* KPI */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <CampaignStat
                        label="Total Campaigns"
                        value="42"
                        icon={<Megaphone size={18} />}
                    />

                    <CampaignStat
                        label="Active"
                        value="12"
                        icon={<TrendingUp size={18} />}
                    />

                    <CampaignStat
                        label="Total Budget"
                        value="$184K"
                        icon={<CalendarDays size={18} />}
                    />

                    <CampaignStat
                        label="Avg. Engagement"
                        value="8.42%"
                        icon={<TrendingUp size={18} />}
                    />
                </div>

                {/* Filters */}
                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 lg:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search campaigns..."
                            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-[#635bff] focus:bg-white"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto">
                        {statuses.map((item) => (
                            <button
                                key={item}
                                onClick={() => setStatus(item)}
                                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm ${status === item
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
                        <Filter size={16} />
                        Filters
                    </button>
                </div>

                {/* Campaign list */}
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="hidden grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr] gap-4 border-b border-gray-200 px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 lg:grid">
                        <span>Campaign</span>
                        <span>Client</span>
                        <span>Platform</span>
                        <span>Budget</span>
                        <span>Performance</span>
                        <span>Status</span>
                    </div>

                    {filtered.map((campaign) => (
                        <Link
                            key={campaign.id}
                            href={`/campaigns/${campaign.id}`}
                            className="grid gap-4 border-b border-gray-100 px-5 py-4 transition last:border-0 hover:bg-gray-50 lg:grid-cols-[2fr_1.2fr_1fr_1fr_1fr_1fr] lg:items-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#635bff]/10">
                                    <Megaphone
                                        size={18}
                                        className="text-[#635bff]"
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {campaign.name}
                                    </p>

                                    <p className="mt-1 text-xs text-gray-500">
                                        Updated {campaign.updated}
                                    </p>
                                </div>
                            </div>

                            <span className="text-sm text-gray-600">
                                {campaign.client}
                            </span>

                            <span className="text-sm text-gray-600">
                                {campaign.platform}
                            </span>

                            <span className="text-sm font-medium">
                                {campaign.budget}
                            </span>

                            <div>
                                <p className="text-sm font-medium">
                                    {campaign.engagement}
                                </p>

                                <p className="text-xs text-gray-400">
                                    {campaign.reach} reach
                                </p>
                            </div>

                            <Status status={campaign.status} />
                        </Link>
                    ))}

                    {filtered.length === 0 && (
                        <div className="px-5 py-16 text-center">
                            <Megaphone
                                size={32}
                                className="mx-auto text-gray-300"
                            />

                            <h3 className="mt-3 text-sm font-medium">
                                No campaigns found
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                Try another search or filter.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}

function Status({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Active: "bg-green-50 text-green-700",
        "In Review": "bg-amber-50 text-amber-700",
        Draft: "bg-gray-100 text-gray-600",
        Paused: "bg-red-50 text-red-700",
    };

    return (
        <span
            className={`w-fit rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
        >
            {status}
        </span>
    );
}

function CampaignStat({
    label,
    value,
    icon,
}: {
    label: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                {icon}
            </div>

            <p className="mt-4 text-sm text-gray-500">{label}</p>

            <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
    );
}