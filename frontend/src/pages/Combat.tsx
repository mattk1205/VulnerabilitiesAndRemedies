import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Combat() {
  const navigate = useNavigate();
  return (
    <Link
      to={'..'}
      onClick={ (e) => {
        e.preventDefault();
        navigate(-1);
      }} className="back-button"><ArrowLeft/></Link>
  )
}