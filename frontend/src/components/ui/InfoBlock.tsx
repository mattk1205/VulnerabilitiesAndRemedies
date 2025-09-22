import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface InfoBlockProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  state?: unknown;
}

export default function InfoBlock({
                                    icon,
                                    title,
                                    children,
                                    className = "",
                                    to,
                                    onClick,
                                    state,
                                  }: InfoBlockProps) {

  const content = (
    <>
      <h2 className="mb-2 flex items-center gap-3 text-xl font-bold">
        {icon}
        <span>{title}</span>
      </h2>
      <div className="text-base text-slate-300">{children}</div>
    </>
  );

  const baseClasses = `rounded-xl border bg-white/5 p-6 transition-all duration-300 ${className}`;

  if (to) {
    return (
      <Link to={to} state={state} className={`${baseClasses} block hover:border-cyan-400 hover:bg-white/10`}>
        {content}
      </Link>
    );
  }

  return (
    <div className={baseClasses} onClick={onClick}>
      {content}
    </div>
  );
}
