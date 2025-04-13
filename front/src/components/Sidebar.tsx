import {
  Book,
  Users,
  LayoutDashboard,
  Tags,
  UserRound,
  Repeat2,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <aside
      className={`h-screen sticky top-0 left-0 bg-zinc-100 dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-2 flex flex-col transition-all duration-300 ${
        collapsed ? 'w-[60px]' : 'w-[220px]'
      }`}
    >
      <div className="flex justify-between items-center px-2 py-3">
        {!collapsed && <h1 className="text-lg font-bold">📚 Biblioteca</h1>}
        <button onClick={toggle} className="p-1 cursor-pointer">
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex flex-col gap-2 mt-4">
        <SidebarItem icon={LayoutDashboard} label="Home" to="/" collapsed={collapsed} />
        <SidebarItem icon={Book} label="Livros" to="/books" collapsed={collapsed} />
        <SidebarItem icon={Users} label="Autores" to="/authors" collapsed={collapsed} />
        <SidebarItem icon={Tags} label="Categorias" to="/categories" collapsed={collapsed} />
        <SidebarItem icon={UserRound} label="Membros" to="/members" collapsed={collapsed} />
        <SidebarItem icon={Repeat2} label="Empréstimos" to="/loans" collapsed={collapsed} />
      </nav>
    </aside>
  );
}
