import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200">
      <header className="bg-[#111827] border-b border-gray-700 p-4">
        <h1 className="text-xl font-bold tracking-wide">SMART MONITOR</h1>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
