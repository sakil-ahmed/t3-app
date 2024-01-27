import { createStore, withDevTools } from "@poly-state/poly-state";
import { useStore } from "@poly-state/react";
import type { RouterOutputs } from "@/trpc/shared";

type project = RouterOutputs["projects"]["getAll"][0];
interface GlobalStore {
  selectedProject: project | null;
  isCollapsed: boolean;
}
export const authInitial: GlobalStore = {
  selectedProject: null,
  isCollapsed: false,
};

export const globalStore = createStore(authInitial);

export const useGlobalStore = () => useStore<GlobalStore>(globalStore);

if (process.env.NODE_ENV === "development") {
  withDevTools(globalStore, "GlobalStore");
}
