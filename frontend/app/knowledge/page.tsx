"use client";

import { useState } from "react";
import {
    BookOpen,
    File,
    FileText,
    Folder,
    Plus,
    Search,
    Upload,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const documents = [
    {
        name: "Brand Guidelines.pdf",
        type: "PDF",
        size: "4.2 MB",
        status: "Processed",
    },
    {
        name: "Product Documentation.docx",
        type: "DOCX",
        size: "2.8 MB",
        status: "Processed",
    },
    {
        name: "Campaign Research.pdf",
        type: "PDF",
        size: "7.1 MB",
        status: "Processing",
    },
];

export default function KnowledgePage() {
    const [search, setSearch] = useState("");

    const filtered = documents.filter((doc) =>
        doc.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm text-gray-500">Workspace</p>
                        <h1 className="mt-1 text-2xl font-semibold">Knowledge</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage the knowledge used by CampaignAgent.
                        </p>
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-medium text-white">
                        <Upload size={17} />
                        Upload Document
                    </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <Stat icon={<BookOpen size={18} />} label="Knowledge Bases" value="6" />
                    <Stat icon={<FileText size={18} />} label="Documents" value="84" />
                    <Stat icon={<Folder size={18} />} label="Storage Used" value="2.8 GB" />
                </div>

                <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div>
                            <h2 className="font-semibold">Documents</h2>
                            <p className="mt-1 text-xs text-gray-500">
                                Organization knowledge and uploaded references.
                            </p>
                        </div>

                        <div className="relative md:w-72">
                            <Search
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />

                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search documents..."
                                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-[#635bff]"
                            />
                        </div>
                    </div>

                    <div className="mt-5 divide-y divide-gray-100">
                        {filtered.map((doc) => (
                            <div
                                key={doc.name}
                                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center"
                            >
                                <div className="flex flex-1 items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                                        <File size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium">{doc.name}</p>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {doc.type} · {doc.size}
                                        </p>
                                    </div>
                                </div>

                                <span
                                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${doc.status === "Processed"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-amber-50 text-amber-700"
                                        }`}
                                >
                                    {doc.status}
                                </span>
                            </div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="py-12 text-center">
                            <FileText className="mx-auto text-gray-300" />
                            <p className="mt-3 text-sm font-medium">
                                No documents found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}

function Stat({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                {icon}
            </div>
            <p className="mt-4 text-sm text-gray-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
    );
}