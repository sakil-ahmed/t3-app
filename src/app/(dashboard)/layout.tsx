import { type ReactNode } from "react";
import { Topbar } from "@/feature/layout/Topbar/Topbar";
import { Sidebar } from "@/feature/layout/Sidebar/Sidebar";
import * as React from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-auto">
      <Sidebar />

      <div className="h-screen flex-1">
        <Topbar />
        <div className="h-[calc(100vh-70px)] w-full overflow-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
