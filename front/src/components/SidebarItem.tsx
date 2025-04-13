import { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

type Props = {
  icon: LucideIcon;
  label: string;
  to: string;
  collapsed: boolean;
};

export default function SidebarItem({ icon: Icon, label, to, collapsed }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center ${collapsed ? 'justify-center' : 'gap-3'} 
        px-2 py-2 rounded-md transition-colors
        hover:bg-zinc-200 dark:hover:bg-zinc-700 
        ${isActive ? 'bg-zinc-300 dark:bg-zinc-800 font-medium' : ''}`
      }
    >
      <Icon size={20} />
      {!collapsed && <span className="text-sm">{label}</span>}
    </NavLink>
  );
}
