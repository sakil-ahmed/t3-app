"use client";
import {
  MoreVertical,
  ChevronLast,
  ChevronFirst,
  Briefcase,
  Settings,
} from "lucide-react";
import { useContext, createContext, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarContext = createContext({ expanded: false });

const SidebarItems = [
  {
    path: "/projects",
    icon: <Briefcase />,
    text: "Projects",
    alert: false,
  },
  {
    path: "/settings",
    icon: <Settings />,
    text: "Settings",
    alert: false,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen w-fit">
      <nav className="flex h-full flex-col border-r bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {SidebarItems.map(({ icon, path, text, alert }, index) => {
              const active = path === pathname;
              return (
                <SidebarItem
                  key={index}
                  active={active}
                  alert={alert}
                  text={text}
                  icon={icon}
                  path={path}
                />
              );
            })}
          </ul>
        </SidebarContext.Provider>

        <div className="flex border-t p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="h-10 w-10 rounded-md"
          />
          <div
            className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? "ml-3 w-52" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

interface SidebarItem {
  path: string;
  icon: ReactNode;
  text: string;
  active: boolean;
  alert: boolean;
}
export function SidebarItem({ icon, text, active, alert, path }: SidebarItem) {
  const { expanded } = useContext(SidebarContext);

  return (
    <Link href={path}>
      <li
        className={`
        group relative my-1 flex cursor-pointer items-center
        rounded-md px-3 py-2
        font-medium transition-colors
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "text-gray-600 hover:bg-indigo-50"
        }
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "ml-3 w-52" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
          invisible absolute left-full ml-6 -translate-x-3 rounded-md
          bg-indigo-100 px-2 py-1
          text-sm text-indigo-800 opacity-20 transition-all
          group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
      `}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
}
