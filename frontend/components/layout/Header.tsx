"use client";

import {
    Bell,
    Menu,
    Plus,
    Search,
} from "lucide-react";

interface HeaderProps {
    onMenuClick: () => void;
}

export default function Header({
    onMenuClick,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/90 px-4 backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                >
                    <Menu size={20} />
                </button>

                <div className="relative hidden md:block">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="search"
                        placeholder="Search campaigns, clients..."
                        className="h-9 w-72 rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none focus:border-[#635bff] focus:bg-white"
                    />
                </div>

                <span className="text-sm font-semibold md:hidden">
                    CampaignAgent
                </span>
            </div>

            <div className="flex items-center gap-2">
                <button className="hidden items-center gap-2 rounded-lg bg-[#635bff] px-3 py-2 text-sm font-medium text-white hover:bg-[#5548e8] sm:flex">
                    <Plus size={16} />
                    New Campaign
                </button>

                <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100">
                    <Bell size={19} />
                    <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
                    CK
                </button>
            </div>
        </header>
    );
}