
import StatsCards from "@/components/dashboard/StatsCards";

const campaigns = [
  {
    name: "Summer Product Launch",
    client: "Acme Corporation",
    status: "Active",
    progress: 78,
    platform: "Meta",
  },
  {
    name: "Brand Awareness Q4",
    client: "Nova Labs",
    status: "In Review",
    progress: 52,
    platform: "LinkedIn",
  },
  {
    name: "Product Retargeting",
    client: "Vertex Systems",
    status: "Draft",
    progress: 24,
    platform: "Google",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-gray-200 bg-white px-4 py-6 md:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm text-gray-500">Saturday, September 19, 2026</p>

          <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                Good evening, Chandan
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Here&apos;s what&apos;s happening across your marketing workspace.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 md:px-6">
        <StatsCards />

        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <div>
              <h2 className="font-semibold text-gray-900">Recent Campaigns</h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Your latest campaign activity
              </p>
            </div>

            <button className="text-sm font-medium text-[#635bff] hover:underline">
              View all
            </button>
          </div>

          <div className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <div
                key={campaign.name}
                className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                    <MegaphoneIcon />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {campaign.name}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {campaign.client} · {campaign.platform}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="w-32">
                    <div className="mb-1 flex justify-between text-[11px] text-gray-500">
                      <span>Progress</span>
                      <span>{campaign.progress}%</span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-[#635bff]"
                        style={{ width: `${campaign.progress}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${campaign.status === "Active"
                      ? "bg-green-50 text-green-700"
                      : campaign.status === "In Review"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {campaign.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">AI Activity</h2>
            <p className="mt-1 text-sm text-gray-500">
              Recent automation activity
            </p>

            <div className="mt-5 space-y-4">
              {[
                "Campaign strategy generated",
                "Audience research completed",
                "Content validation completed",
                "Campaign insights generated",
              ].map((activity, index) => (
                <div key={activity} className="flex gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-[#635bff]" />

                  <div>
                    <p className="text-sm text-gray-800">{activity}</p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {index + 1} hour{index !== 0 ? "s" : ""} ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold">Quick Actions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Start your next marketing workflow
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                "Create Campaign",
                "Add Client",
                "Upload Knowledge",
                "View Analytics",
              ].map((action) => (
                <button
                  key={action}
                  className="rounded-lg border border-gray-200 p-4 text-left text-sm font-medium transition hover:border-[#635bff] hover:bg-gray-50"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MegaphoneIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="text-gray-600"
    >
      <path d="m3 11 18-5v12L3 14v-3Z" />
      <path d="M11.6 16.8 13 21" />
    </svg>
  );
}