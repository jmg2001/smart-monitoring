import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-slate-800 text-white p-4">
        <h1 className="text-xl font-bold">Production Monitor</h1>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
