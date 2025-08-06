import { useParams, Link } from 'react-router-dom';
import { levelsInfo } from "../services/levelsData.ts";

export default function LevelHome() {
    const { levelId } = useParams();
    const currentLevelId = Number(levelId);

    const levelData = levelsInfo.find(level => level.number === currentLevelId);

    if (!levelData) {
        return (
            <div className="text-center p-8">
                <h1 className="text-4xl font-bold">Level Not Found</h1>
                <Link className="mt-8 inline-block text-2xl" to="/game/levels">Back to Levels</Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-12 text-center p-8">
            <h1 className="text-6xl font-bold">Level {levelData.number}</h1>
            <div className="text-3xl text-red-600">
                <p>{levelData.description}</p>
            </div>
            <Link className="text-4xl" to={"/game/levels"}><button>Exit</button></Link>
        </div>
    );
}