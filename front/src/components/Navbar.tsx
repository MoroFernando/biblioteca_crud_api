import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";

import { Link } from "react-router-dom";
import { BookOpen, Users, Tag, User, RefreshCcw, Home } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-zinc-800">📖 Biblioteca</h1>

        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/" className="flex items-center gap-2 hover:text-primary">
                  <Home size={18} />
                  Início
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/books" className="flex items-center gap-2 hover:text-primary">
                  <BookOpen size={18} />
                  Livros
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/authors" className="flex items-center gap-2 hover:text-primary">
                  <Users size={18} />
                  Autores
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/categories" className="flex items-center gap-2 hover:text-primary">
                  <Tag size={18} />
                  Categorias
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/members" className="flex items-center gap-2 hover:text-primary">
                  <User size={18} />
                  Membros
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link to="/loans" className="flex items-center gap-2 hover:text-primary">
                  <RefreshCcw size={18} />
                  Empréstimos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
