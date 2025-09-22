import { Link } from "react-router-dom";
import type { JSX } from "react";

type NavButtonProps = {
  to: string;
  className?: string;
  label: string;
  image?: string | JSX.Element;
  state?: object;
}

export default function NavButton({ to, className, label, image, state }: NavButtonProps) {
  return (
    <Link
      to={to}
      state={state}
      className={className}
    >
      {image}
      {label}
    </Link>
  );
}