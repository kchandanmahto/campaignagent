"use client";

import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    Target,
    Users,
    WandSparkles,
} from "lucide-react";
import Link from "next/link";
import AppShell from "@/components/layout/AppShell";

const steps = [
    "Campaign Brief",
    "Audience",
    "Objective",
    "Budget",
    "Review",
];

export default function NewCampaignPage() {
    const [step, setStep] = useState(0);

    return (
        <AppShell>
            <div className="mx-auto max-w-4xl px-4 py-6 md:px-6">
                <Link
                    href="/campaigns"
                    className="flex w-fit items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
                >
                    <ArrowLeft size={16} />
                    Back to Campaigns
                </Link>

                <div className="mt-6">
                    <h1 className="text-2xl font-semibold">
                        Create Campaign
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Define your campaign and let CampaignAgent help build the strategy.
                    </p>
                </div>

                <div className="mt-8 flex items-center">
                    {steps.map((item, index) => (
                        <div
                            key={item}
                            className="flex flex-1 items-center"
                        >
                            <div className="flex items-center gap-2">
                                <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${index <= step
                                            ? "bg-[#635bff] text-white"
                                            : "bg-gray-100 text-gray-400"
                                        }`}
                                >
                                    {index < step ? <Check size={15} /> : index + 1}
                                </div>

                                <span className="hidden text-xs font-medium sm:block">
                                    {item}
                                </span>
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`mx-3 h-px flex-1 ${index < step
                                            ? "bg-[#635bff]"
                                            : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 md:p-7">
                    {step === 0 && <BriefStep />}
                    {step === 1 && <AudienceStep />}
                    {step === 2 && <ObjectiveStep />}
                    {step === 3 && <BudgetStep />}
                    {step === 4 && <ReviewStep />}

                    <div className="mt-8 flex justify-between border-t border-gray-200 pt-5">
                        <button
                            disabled={step === 0}
                            onClick={() => setStep((value) => value - 1)}
                            className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm disabled:opacity-40"
                        >
                            <ArrowLeft size={16} />
                            Back
                        </button>

                        <button
                            onClick={() =>
                                setStep((value) =>
                                    Math.min(value + 1, steps.length - 1)
                                )
                            }
                            className="flex items-center gap-2 rounded-lg bg-[#635bff] px-4 py-2 text-sm font-medium text-white"
                        >
                            {step === steps.length - 1 ? "Create Campaign" : "Continue"}
                            <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}

function BriefStep() {
    return (
        <div>
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <WandSparkles className="text-[#635bff]" size={20} />
            </div>

            <h2 className="text-lg font-semibold">Campaign Brief</h2>
            <p className="mt-1 text-sm text-gray-500">
                Tell CampaignAgent what you want to achieve.
            </p>

            <div className="mt-6 space-y-5">
                <Field label="Campaign Name" placeholder="e.g. Summer Product Launch" />

                <Field
                    label="Campaign Description"
                    placeholder="Describe the campaign, product, offer or key message..."
                    textarea
                />
            </div>
        </div>
    );
}

function AudienceStep() {
    return (
        <div>
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Users className="text-[#635bff]" size={20} />
            </div>

            <h2 className="text-lg font-semibold">Target Audience</h2>
            <p className="mt-1 text-sm text-gray-500">
                Define who this campaign should reach.
            </p>

            <div className="mt-6 space-y-5">
                <Field label="Audience" placeholder="e.g. B2B SaaS decision makers" />

                <Field label="Location" placeholder="e.g. India, United States" />

                <Field
                    label="Additional Context"
                    placeholder="Interests, behaviors, demographics..."
                    textarea
                />
            </div>
        </div>
    );
}

function ObjectiveStep() {
    return (
        <div>
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
                <Target className="text-[#635bff]" size={20} />
            </div>

            <h2 className="text-lg font-semibold">Campaign Objective</h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                    "Brand Awareness",
                    "Lead Generation",
                    "Conversions",
                    "Website Traffic",
                    "Engagement",
                    "Product Launch",
                ].map((item) => (
                    <button
                        key={item}
                        className="rounded-xl border border-gray-200 p-4 text-left text-sm hover:border-[#635bff] hover:bg-indigo-50"
                    >
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
}

function BudgetStep() {
    return (
        <div>
            <h2 className="text-lg font-semibold">Campaign Budget</h2>

            <div className="mt-6 space-y-5">
                <Field label="Total Budget" placeholder="$10,000" />

                <Field label="Campaign Duration" placeholder="30 days" />

                <Field
                    label="Budget Notes"
                    placeholder="Optional budget constraints..."
                    textarea
                />
            </div>
        </div>
    );
}

function ReviewStep() {
    return (
        <div>
            <h2 className="text-lg font-semibold">
                Review Campaign
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Review the campaign information before creating it.
            </p>

            <div className="mt-6 space-y-3">
                {[
                    ["Campaign", "Summer Product Launch"],
                    ["Audience", "B2B SaaS decision makers"],
                    ["Objective", "Product Launch"],
                    ["Budget", "$10,000"],
                ].map(([label, value]) => (
                    <div
                        key={label}
                        className="flex justify-between rounded-lg bg-gray-50 p-4"
                    >
                        <span className="text-sm text-gray-500">{label}</span>
                        <span className="text-sm font-medium">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Field({
    label,
    placeholder,
    textarea,
}: {
    label: string;
    placeholder: string;
    textarea?: boolean;
}) {
    return (
        <label className="block">
            <span className="text-sm font-medium text-gray-700">
                {label}
            </span>

            {textarea ? (
                <textarea
                    rows={4}
                    placeholder={placeholder}
                    className="mt-2 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#635bff]"
                />
            ) : (
                <input
                    placeholder={placeholder}
                    className="mt-2 h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-[#635bff]"
                />
            )}
        </label>
    );
}