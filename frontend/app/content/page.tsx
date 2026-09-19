"use client";

import { useMemo, useState } from "react";
import {
    FileText,
    Filter,
    Grid3X3,
    List,
    Plus,
    Search,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const content = [
    {
        title: "Summer Launch Instagram Copy",
        type: "Social Post",
        client: "Acme Corporation",
        status: "Draft",
        updated: "1h ago",
    },
    {
        title: "Product Launch Email",
        type: "Email",
        client: "Acme Corporation",
        status: "Approved",
        updated: "3h ago",
    },
    {
        title: "LinkedIn Brand Announcement",
        type: "Social Post",
        client: "Nova Labs",
        status: "In Review",
        updated: "5h ago",
    },
    {
        title: "Retargeting Ad Copy",
        type: "Ad Copy",
        client: "Vertex Systems",
        status: "Draft",
        updated: "1d ago",
    },
];

export default function ContentPage() {
    const [search, setSearch] = useState("");
    const [view, setView] = useState<"grid" | "list">("list");

    const filtered = useMemo(
        () =>
            content.filter((item) =>
                `${item.title} ${item.client} ${item.type}`
                    .toLowerCase()
                    .includes(search.toLowerCase())
            ),
        [search]
    );

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm text-gray-500">Workspace</p>
                        <h1 className="mt-1 text-2xl font-semibold">Content</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage campaign content, drafts and approvals.
                        </p>
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#5548e8]">
                        <Plus size={17} />
                        Create Content
                    </button>
                </div>

                <div className="mt-6 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search content..."
                            className="h-10 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-[#635bff] focus:bg-white"
                        />
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 text-sm text-gray-600">
                        <Filter size={16} />
                        Filter
                    </button>

                    <div className="flex rounded-lg border border-gray-200 p-1">
                        <button
                            onClick={() => setView("list")}
                            className={`rounded p-1.5 ${view === "list" ? "bg-gray-100" : ""
                                }`}
                        >
                            <List size={17} />
                        </button>

                        <button
                            onClick={() => setView("grid")}
                            className={`rounded p-1.5 ${view === "grid" ? "bg-gray-100" : ""
                                }`}
                        >
                            <Grid3X3 size={17} />
                        </button>
                    </div>
                </div>

                {view === "list" ? (
                    <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                        {filtered.map((item) => (
                            <div
                                key={item.title}
                                className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 last:border-0 md:flex-row md:items-center"
                            >
                                <div className="flex flex-1 items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                                        <FileText size={18} className="text-[#635bff]" />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">{item.title}</p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {item.type} · {item.client}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xs text-gray-400">
                                    {item.updated}
                                </span>

                                <Status status={item.status} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-xl border border-gray-200 bg-white p-5"
                            >
                                <FileText size={20} className="text-[#635bff]" />
                                <h3 className="mt-4 text-sm font-semibold">
                                    {item.title}
                                </h3>
                                <p className="mt-1 text-xs text-gray-500">
                                    {item.type} · {item.client}
                                </p>
                                <div className="mt-4">
                                    <Status status={item.status} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}

function Status({ status }: { status: string }) {
    const styles: Record<string, string> = {
        Draft: "bg-gray-100 text-gray-600",
        Approved: "bg-green-50 text-green-700",
        "In Review": "bg-amber-50 text-amber-700",
    };

    return (
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    );
}