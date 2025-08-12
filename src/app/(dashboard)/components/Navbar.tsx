import { ThemeSwitcher } from "./ThemeSwitcher";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  return (
    <header className="p-4 text-foreground bg-white/10 backdrop-blur-lg rounded-xl m-4 border border-white/20">
      <div className="container mx-auto flex justify-between items-center">
        <div>{/* Placeholder for mobile menu button */}</div>
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
        </div>
      </div>
    </header>
  );
}
