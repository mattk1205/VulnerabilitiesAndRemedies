import {Link} from "react-router-dom";
import type {Level} from "../services/types.ts";

export default function LevelButton(level:Level) {
    return (
        level.available ? (
                <Link
                    to={`/game/level/${level.number}`}
                    className="flex items-center justify-center h-24 w-24 rounded-lg border-2
                border-slate-600 text-2xl font-bold bg-slate-700
                !text-white hover:animate-wiggle"
                >
                    {level.number}
                </Link>
            )    :
            (
                <li className="flex items-center justify-center h-24 w-24 rounded-lg border-2
                              border-red-600 text-2xl font-bold bg-red-700 hover:transform-none
                              hover:!text-red animate-pulse">
                    {level.number}
                </li>
            )
    )
}