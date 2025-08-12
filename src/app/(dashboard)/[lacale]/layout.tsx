import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
  params: {
    locale: string;
  };
};

export default function DashboardLayout({
  children,
  params: { locale },
}: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background bg-gradient-to-br from-indigo-900 via-slate-900 to-black">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
