import NavButton from "./NavButton.tsx";
import { useLocation } from "react-router-dom";
import { CircleUser } from "lucide-react";

export default function Navigation() {
  const location = useLocation();
  const isCreatePage = location.pathname === "/enter-name";

  if (isCreatePage) {
    return (
      <></>
    );
  } else
    return (
      <nav className="flex justify-center p-4 relative z-20 top-50 bg-transparent">
        <NavButton to="/profile" className="flex gap-3 px-3 py-2 text-4xl rounded-md font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/50 hover:border-cyan-400/50 transition-all duration-300"
                   image={<CircleUser size={40}/>} label="Profile" />
      </nav>
    );
}