"use client";
import { UserNav } from "@/feature/layout/Topbar/UserNav";
import { useGlobalStore } from "@/store/global.store";

export const Topbar = () => {
  const { selectedProject } = useGlobalStore();
  return (
    <div className="flex h-[70px] w-full items-center justify-between border-b p-5">
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {selectedProject?.name}
      </h1>
      <UserNav />
    </div>
  );
};
