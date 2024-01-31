import { type Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/app/settings/components/sidebar-nav";
import { BackButton } from "@/app/settings/components/BackButton";

export const metadata: Metadata = {
  title: "Settings",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },

  {
    title: "Notifications",
    href: "/settings/notifications",
  },
  {
    title: "Config System",
    href: "/settings/config",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="custom-container space-y-6 p-10 pb-16">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <BackButton />
        </div>

        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="relative -mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
            <Separator
              className="absolute right-0 top-0"
              orientation={"vertical"}
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
