"use client";

import { useState } from "react";
import {
    Bell,
    Building2,
    KeyRound,
    Palette,
    Save,
    Shield,
    Users,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const sections = [
    { name: "Organization", icon: Building2 },
    { name: "Team", icon: Users },
    { name: "Roles & Permissions", icon: Shield },
    { name: "Brand", icon: Palette },
    { name: "Notifications", icon: Bell },
    { name: "Integrations", icon: KeyRound },
];

export default function SettingsPage() {
    const [active, setActive] = useState("Organization");

    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div>
                    <p className="text-sm text-gray-500">Workspace</p>
                    <h1 className="mt-1 text-2xl font-semibold">Settings</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage organization, team and workspace preferences.
                    </p>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
                    <aside className="rounded-xl border border-gray-200 bg-white p-2">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            const selected = active === section.name;

                            return (
                                <button
                                    key={section.name}
                                    onClick={() => setActive(section.name)}
                                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${selected
                                            ? "bg-gray-100 font-medium text-gray-900"
                                            : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <Icon size={17} />
                                    {section.name}
                                </button>
                            );
                        })}
                    </aside>

                    <section className="rounded-xl border border-gray-200 bg-white p-5 md:p-6">
                        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 md:flex-row md:items-center">
                            <div>
                                <h2 className="font-semibold">{active}</h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Configure your {active.toLowerCase()} settings.
                                </p>
                            </div>

                            <button className="flex items-center justify-center gap-2 rounded-lg bg-[#635bff] px-4 py-2 text-sm font-medium text-white">
                                <Save size={16} />
                                Save Changes
                            </button>
                        </div>

                        <div className="mt-6 grid gap-5 md:grid-cols-2">
                            <Field label="Organization Name" value="Acme Corporation" />
                            <Field label="Workspace Name" value="Acme Marketing" />
                            <Field label="Industry" value="Technology" />
                            <Field label="Primary Website" value="https://acme.example" />
                        </div>

                        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                            <p className="text-sm font-medium text-amber-800">
                                Settings foundation
                            </p>
                            <p className="mt-1 text-xs text-amber-700">
                                These controls are currently UI-only. Backend
                                organization, RBAC and integration settings will be
                                connected in the identity and enterprise phases.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </AppShell>
    );
}

function Field({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-gray-700">{label}</span>

            <input
                defaultValue={value}
                className="mt-2 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#635bff]"
            />
        </label>
    );
}