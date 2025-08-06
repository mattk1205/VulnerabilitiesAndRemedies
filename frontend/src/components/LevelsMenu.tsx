import {Link} from "react-router-dom";
import LevelButton from "./LevelButton.tsx";
import {levelsInfo} from "../services/levelsData.ts";

export default function LevelsMenu() {
    return (
        <>
            <h1 className="flex flex-col mb-20 text-gray-500">Select A Level</h1>
            <div className="flex flex-col items-center p-8">
                <div className="grid grid-cols-5 gap-4 md:gap-4 sm:gap-8 p-12 transition-all duration-1000 hover:gap-12 md:hover:gap-12 sm:hover:gap-x-20">
                    {levelsInfo.map(level => (
                        <LevelButton available={level.available} description={level.description} number={level.number} key={level.number} />
                    ))}
                </div>
                <Link className="mt-12 text-2xl hover:underline menu-button" to="/">
                    Home
                </Link>
            </div>
        </>
    );
}