
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  UserCircle,
  Phone,
  BookOpenText,
  RefreshCw,
  Clipboard,
  Menu,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
};

const sidebarItems: SidebarItem[] = [
  { name: "Dashboard", icon: Home, path: "/dashboard" },
  { name: "Room Allocation", icon: UserCircle, path: "/room-allocation" },
  { name: "Contact Staff", icon: Phone, path: "/contact" },
  { name: "Mess Menu", icon: BookOpenText, path: "/mess-menu" },
  { name: "Room Switch", icon: RefreshCw, path: "/room-switch" },
  { name: "Complaints", icon: Clipboard, path: "/complaints" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleSidebar} 
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      <aside 
        className={cn(
          "bg-sidebar fixed top-0 left-0 z-40 h-full w-64 transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
      >
        <div className="flex h-20 items-center justify-center border-b border-sidebar-border">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-sidebar-primary">Host</span>ify
          </h1>
        </div>

        <div className="py-4">
          <ul className="space-y-1 px-2">
            {sidebarItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                    location.pathname === item.path && "bg-sidebar-accent font-medium"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="space-y-2">
        
            <Link
              to="/"
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-red-400"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      <div 
        onClick={toggleSidebar}
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
    </>
  );
}
