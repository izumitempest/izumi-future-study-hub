
import { 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  FileImage,
  Settings,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "notes", label: "Notes", icon: FileText },
  { id: "materials", label: "Study Materials", icon: BookOpen },
  { id: "pdfs", label: "PDF Library", icon: FileImage },
];

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10 p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 text-cyan-300" 
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-cyan-400")} />
              <span className="font-medium">{item.label}</span>
              <ChevronRight className={cn(
                "h-4 w-4 ml-auto transition-transform duration-200",
                isActive ? "rotate-90 text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
              )} />
            </button>
          );
        })}
      </nav>
      
      <div className="mt-8 pt-6 border-t border-white/10">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-200">
          <Settings className="h-5 w-5" />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </aside>
  );
};
