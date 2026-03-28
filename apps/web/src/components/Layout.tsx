import { Outlet, Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Dashboard", icon: "grid" },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Top Navigation Bar — Revit-inspired ribbon */}
      <header className="glass sticky top-0 z-50 border-b border-[var(--color-border-light)]">
        <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mr-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white text-sm font-bold">
              D
            </div>
            <span className="text-base font-semibold tracking-tight text-[var(--color-text)]">
              DrawAI
            </span>
          </Link>

          {/* Nav Tabs — Revit ribbon style */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "glass text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-white/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-3">
            <button className="glass-button text-sm text-[var(--color-text-secondary)]">
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-screen-2xl px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}
