import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_-10%,#dff1e4_0%,#f8fafc_35%,#fafaf9_100%)] text-slate-700">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
          <div>
            <p className="text-xl font-semibold tracking-tight text-slate-800">MindCare Cloud</p>
            <p className="text-xs text-slate-500">Mental Health SaaS Platform</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/client"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Client App
            </Link>
            <Link
              href="/practitioner"
              className="rounded-lg bg-sage-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
            >
              Practitioner App
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:items-center md:px-6 md:py-24">
          <div>
            <p className="mb-3 inline-flex rounded-full bg-sage-100 px-3 py-1 text-xs font-semibold text-sage-600 ring-1 ring-sage-600/20">
              Complete mental health SaaS
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-6xl md:leading-[1.05]">
              End-to-end care journeys for clients and practitioners
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-600 md:text-lg">
              MindCare Cloud brings scheduling, mood logs, weekly check-ins, progress tracking, and practitioner
              workflows into one focused workspace.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/client"
                className="rounded-lg bg-sage-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-95"
              >
                Start as Client
              </Link>
              <Link
                href="/practitioner"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Open Practitioner Dashboard
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.5)] md:p-7">
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-sage-100/70 blur-2xl" />
            <p className="text-sm font-medium text-slate-800">Platform Snapshot</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["14-day mood trend", "Visual wellbeing tracking"],
                ["Session lifecycle", "Book, reschedule, complete"],
                ["Clinical notes", "Structured practitioner records"],
                ["Weekly check-ins", "Early stress signal detection"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm">
                  <p className="text-sm font-medium text-slate-800">{title}</p>
                  <p className="mt-1 text-xs text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-10 md:px-6 md:pb-14">
          <h2 className="text-2xl font-semibold text-slate-900">Everything needed to run a mental health SaaS</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Client Experience",
                items: ["Book sessions", "Track mood daily", "Submit check-ins", "View progress"],
              },
              {
                title: "Practitioner Workspace",
                items: ["Client roster", "Weekly schedule", "Case detail view", "Risk flags"],
              },
              {
                title: "Operational Core",
                items: ["Role switching", "Activity feed", "Status workflows", "Responsive UI"],
              },
            ].map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.45)]">
                <p className="text-lg font-semibold text-slate-800">{feature.title}</p>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {feature.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-6 md:pb-20">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sage-50/40 p-6 shadow-[0_20px_55px_-34px_rgba(15,23,42,0.45)] md:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Simple product flow</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {[
                ["1", "Choose role", "Enter as client or practitioner."],
                ["2", "Use dashboard", "Get your daily summary and actions."],
                ["3", "Track progress", "Log mood, check-ins, and sessions."],
                ["4", "Review outcomes", "Follow trends and care plans."],
              ].map(([step, title, desc]) => (
                <div key={title} className="rounded-xl border border-slate-200/70 bg-white p-4">
                  <p className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sage-600 text-xs font-semibold text-white shadow-sm">
                    {step}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">{title}</p>
                  <p className="mt-1 text-sm text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/client" className="rounded-lg bg-sage-600 px-5 py-3 text-sm font-medium text-white shadow-sm">
                Continue as Client
              </Link>
              <Link
                href="/practitioner"
                className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm"
              >
                Continue as Practitioner
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 MindCare Cloud. Calm, connected mental health care.</p>
          <div className="flex gap-4">
            <Link href="/client" className="hover:text-slate-800">
              Client App
            </Link>
            <Link href="/practitioner" className="hover:text-slate-800">
              Practitioner App
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
