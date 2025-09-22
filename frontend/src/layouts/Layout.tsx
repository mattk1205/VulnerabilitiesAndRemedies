import { type ReactNode, useEffect } from "react";
import Navigation from "../components/ui/Navigation.tsx";
import ParticleSystem from "../components/ParticleSystem.tsx";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  showNav?: boolean;
  title?: string;
}

export default function Layout({ children, className = "", showNav, title }: LayoutProps) {
  useEffect(() => {
    if (title) {
      document.title = `${title} - Cybersecurity Game`;
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // handle escape key globally
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [title]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleSystem />

        <div className="absolute inset-0 opacity-20 animate-grid-move bg-cyber-grid" />

        <div className="absolute inset-0">
          <div className="absolute h-2 w-2 rounded-full bg-emerald-400/30 animate-[ping_2s_linear_infinite] [animation-delay:0s] top-[12%] left-[18%]" />
          <div className="absolute h-2 w-2 rounded-full bg-emerald-400/30 animate-[ping_2.5s_linear_infinite] [animation-delay:.5s] top-[28%] left-[65%]" />
          <div className="absolute h-2 w-2 rounded-full bg-emerald-400/30 animate-[ping_3s_linear_infinite] [animation-delay:1s] top-[46%] left-[30%]" />
          <div className="absolute h-2 w-2 rounded-full bg-emerald-400/30 animate-[ping_2.2s_linear_infinite] [animation-delay:1.5s] top-[62%] left-[78%]" />
          <div className="absolute h-2 w-2 rounded-full bg-emerald-400/30 animate-[ping_2.8s_linear_infinite] [animation-delay:2s] top-[72%] left-[12%]" />
          <div className="absolute h-2 w-2 rounded-full bg-emerald-400/30 animate-[ping_3.2s_linear_infinite] [animation-delay:2.5s] top-[84%] left-[52%]" />
        </div>
      </div>


      <main className={`relative z-10 ${className}`}>{children}</main>
      {showNav && <Navigation />}

    </div>
  );
}
