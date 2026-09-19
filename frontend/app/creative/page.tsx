import {
    Image,
    LayoutGrid,
    Palette,
    Plus,
    Sparkles,
} from "lucide-react";
import AppShell from "@/components/layout/AppShell";

const assets = [
    { name: "Summer Hero Banner", type: "Banner", color: "bg-orange-100" },
    { name: "Product Launch Creative", type: "Social", color: "bg-blue-100" },
    { name: "Brand Awareness Visual", type: "Social", color: "bg-purple-100" },
    { name: "Retargeting Ad", type: "Ad", color: "bg-green-100" },
    { name: "Product Feature Card", type: "Social", color: "bg-pink-100" },
    { name: "Campaign Thumbnail", type: "Thumbnail", color: "bg-yellow-100" },
];

export default function CreativePage() {
    return (
        <AppShell>
            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <p className="text-sm text-gray-500">Workspace</p>
                        <h1 className="mt-1 text-2xl font-semibold">Creative</h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage creative assets and campaign visuals.
                        </p>
                    </div>

                    <button className="flex items-center justify-center gap-2 rounded-lg bg-[#635bff] px-4 py-2.5 text-sm font-medium text-white">
                        <Sparkles size={17} />
                        Generate Creative
                    </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <Stat title="Total Assets" value="128" icon={<Image size={18} />} />
                    <Stat title="Templates" value="24" icon={<LayoutGrid size={18} />} />
                    <Stat title="Brand Assets" value="42" icon={<Palette size={18} />} />
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <h2 className="font-semibold">Creative Library</h2>

                    <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm">
                        <Plus size={16} />
                        Upload
                    </button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {assets.map((asset) => (
                        <div
                            key={asset.name}
                            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
                        >
                            <div
                                className={`flex h-44 items-center justify-center ${asset.color}`}
                            >
                                <Image size={38} className="text-gray-500" />
                            </div>

                            <div className="p-4">
                                <p className="text-sm font-medium">{asset.name}</p>
                                <p className="mt-1 text-xs text-gray-500">
                                    {asset.type}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}

function Stat({
    title,
    value,
    icon,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                {icon}
            </div>
            <p className="mt-4 text-sm text-gray-500">{title}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
        </div>
    );
}