"use client";
import * as React from "react";
import { ListTodo, GanttChartSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import ProjectSwitcher from "@/components/project-switcher";
import { Nav } from "@/feature/layout/Sidebar/nav";
import { useGlobalStore } from "@/store/global.store";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const { isCollapsed } = useGlobalStore();
  const pathName = usePathname().split("/")[2];
  console.log(pathName);

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
              path: `/projects/${pathName}/board`,
            },
            {
              title: "Analytics",
              label: "",
              icon: GanttChartSquare,
              variant: "ghost",
              path: `/projects/${pathName}/analytics`,
            },
          ]}
        />
      </TooltipProvider>
    </div>
  );
}
