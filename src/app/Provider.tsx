"use client";
import { type ReactNode } from "react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { persistStore } from "@/store/persist.store";
import { globalStore } from "@/store/global.store";

persistStore(globalStore, "GLOBAL_STORE");
export const Provider = ({
  children,
  session,
}: {
  children: ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      {children}
      <Toaster />
    </SessionProvider>
  );
};
