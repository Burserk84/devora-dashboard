import { Home, Users, Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 p-4 text-white bg-black/50 backdrop-blur-lg border-r border-white/10 hidden md:block">
      <div className="text-2xl font-bold mb-10">Devora</div>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Home className="mr-3" />
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Users className="mr-3" />
              Devora Team
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="flex items-center p-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              <Settings className="mr-3" />
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
