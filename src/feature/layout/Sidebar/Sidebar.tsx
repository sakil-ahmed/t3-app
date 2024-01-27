"use client";
import * as React from "react";
import { ListTodo, GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProjectSwitcher from "@/components/project-switcher";
import { Nav } from "@/feature/layout/Sidebar/nav";
import { useGlobalStore } from "@/store/global.store";

export function Sidebar() {
  const { isCollapsed } = useGlobalStore();

  return (
    <div
      className={`h-screen ${isCollapsed ? "w-[50px]" : "w-[350px]"} border-r`}
    >
      <TooltipProvider delayDuration={0}>
        <div
          className={cn(
            "flex h-[70px] items-center justify-center border-b",
            isCollapsed ? "h-[52px]" : "px-2",
          )}
        >
          <ProjectSwitcher />
        </div>
        <Nav
          links={[
            {
              title: "Board",
              label: "",
              icon: ListTodo,
              variant: "default",
            },
            {
              title: "Analytics",
              label: "",
              icon: GanttChartSquare,
              variant: "ghost",
            },
          ]}
        />
      </TooltipProvider>
    </div>
  );
}
