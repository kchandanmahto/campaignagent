"use client";

import {
    BarChart3,
    BookOpen,
    FileText,
    Home,
    Megaphone,
    Palette,
    Settings,
    Users,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    mobileOpen: boolean;
    onClose: () => void;
}

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "Campaigns", href: "/campaigns", icon: Megaphone },
    { name: "Content", href: "/content", icon: FileText },
    { name: "Creative", href: "/creative", icon: Palette },
    { name: "Knowledge", href: "/knowledge", icon: BookOpen },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
];

export default function Sidebar({
    mobileOpen,
    onClose,
}: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {mobileOpen && (
                <button
                    onClick={onClose}
                    aria-label="Close sidebar"
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#0b0f19] text-white transition-transform duration-200 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                    <Link href="/dashboard" className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#635bff] font-bold">
                            C
                        </div>

                        <div>
                            <div className="text-sm font-semibold">
                                CampaignAgent
                            </div>
                            <div className="text-[11px] text-gray-400">
                                AI Marketing OS
                            </div>
                        </div>
                    </Link>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-1 text-gray-400 hover:bg-white/10 lg:hidden"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Workspace */}
                <div className="border-b border-white/10 p-4">
                    <button className="flex w-full items-center gap-3 rounded-xl bg-white/5 p-3 text-left hover:bg-white/10">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xs font-semibold">
                            AC
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                Acme Corporation
                            </p>
                            <p className="text-[11px] text-gray-400">
                                Workspace
                            </p>
                        </div>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4">
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
                        Workspace
                    </p>

                    <div className="space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;

                            const active =
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${active
                                            ? "bg-white/10 text-white"
                                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* Bottom */}
                <div className="border-t border-white/10 p-4">
                    <Link
                        href="/settings"
                        onClick={onClose}
                        className={`mb-3 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${pathname.startsWith("/settings")
                                ? "bg-white/10 text-white"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <Settings size={18} />
                        Settings
                    </Link>

                    <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#635bff] text-xs font-semibold">
                            CK
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                                Chandan Kumar
                            </p>
                            <p className="truncate text-[11px] text-gray-400">
                                Administrator
                            </p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}