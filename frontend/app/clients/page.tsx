"use client";

import { useMemo, useState } from "react";
import {
    Building2,
    Mail,
    MoreHorizontal,
    Plus,
    Search,
    Users,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const clients = [
    {
        id: 1,
        name: "Acme Corporation",
        industry: "Technology",
        email: "marketing@acme.com",
        campaigns: 8,
        status: "Active",
        initials: "AC",
    },
    {
        id: 2,
        name: "Nova Labs",
        industry: "Healthcare",
        email: "team@novalabs.com",
        campaigns: 5,
        status: "Active",
        initials: "NL",
    },
    {
        id: 3,
        name: "Vertex Systems",
        industry: "SaaS",
        email: "growth@vertex.io",
        campaigns: 4,
        status: "Active",
        initials: "VS",
    },
    {
        id: 4,
        name: "Orbit Retail",
        industry: "Retail",
        email: "marketing@orbit.com",
        campaigns: 3,
        status: "Paused",
        initials: "OR",
    },
];

export default function ClientsPage() {
    const [search, setSearch] = useState("");

    const filteredClients = useMemo(() => {
        return clients.filter((client) =>
            `${client.name} ${client.industry}`
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                {/* Header */}
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm text-gray-500">Workspace</p>

                        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                            Clients
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your clients and their marketing workspaces.
                        </p>
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5548e8]">
                        <Plus size={17} />
                        Add Client
                    </button>
                </div>

                {/* Stats */}
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <Stat
                        label="Total Clients"
                        value="24"
                        icon={<Building2 size={18} />}
                    />

                    <Stat
                        label="Active Clients"
                        value="21"
                        icon={<Users size={18} />}
                    />

                    <Stat
                        label="Active Campaigns"
                        value="42"
                        icon={<Mail size={18} />}
                    />
                </div>

                {/* Search */}
                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="relative">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search clients..."
                            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-[#635bff] focus:bg-white"
                        />
                    </div>
                </div>

                {/* Client table */}
                <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="hidden grid-cols-[2fr_1.2fr_1.5fr_1fr_1fr_40px] gap-4 border-b border-gray-200 px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500 md:grid">
                        <span>Client</span>
                        <span>Industry</span>
                        <span>Contact</span>
                        <span>Campaigns</span>
                        <span>Status</span>
                        <span />
                    </div>

                    {filteredClients.map((client) => (
                        <div
                            key={client.id}
                            className="grid gap-4 border-b border-gray-100 px-5 py-4 last:border-0 md:grid-cols-[2fr_1.2fr_1.5fr_1fr_1fr_40px] md:items-center"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#635bff]/10 text-sm font-semibold text-[#635bff]">
                                    {client.initials}
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {client.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        Client #{client.id.toString().padStart(3, "0")}
                                    </p>
                                </div>
                            </div>

                            <div className="text-sm text-gray-600">
                                {client.industry}
                            </div>

                            <div className="text-sm text-gray-600">
                                {client.email}
                            </div>

                            <div className="text-sm font-medium">
                                {client.campaigns}
                            </div>

                            <div>
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${client.status === "Active"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {client.status}
                                </span>
                            </div>

                            <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700">
                                <MoreHorizontal size={18} />
                            </button>
                        </div>
                    ))}

                    {filteredClients.length === 0 && (
                        <div className="px-5 py-16 text-center">
                            <Building2 className="mx-auto text-gray-300" size={32} />
                            <h3 className="mt-3 text-sm font-medium">
                                No clients found
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                Try changing your search.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}

function Stat({
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