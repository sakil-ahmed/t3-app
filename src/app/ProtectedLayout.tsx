"use client";
import { type ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useGlobalStore } from "@/store/global.store";

export const ProtectedLayout = ({ children }: { children: ReactNode }) => {
  const session = useSession();
  const router = useRouter();
  const [childComp, setChildren] = useState<ReactNode>(LoadingScreen);
  const pathname = usePathname();
  const { selectedProject } = useGlobalStore();

  useEffect(() => {
    const isAuthRoute = pathname.split("/").includes("auth");
    if (!isAuthRoute && !session.data) {
      router.push("/auth/login");
      return setChildren(LoadingScreen);
    }
    if (isAuthRoute && session.data) {
      router.push(`/${selectedProject?.id}/board`);
      return setChildren(LoadingScreen);
    }
    setChildren(children);
  }, [children, pathname, router, selectedProject?.id, session]);

  return <>{childComp}</>;
};

export function LoadingScreen() {
  return (
    <div className="flex h-screen w-full items-center  justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full
                    border-4 border-solid border-black border-t-transparent"
      ></div>
    </div>
  );
}
