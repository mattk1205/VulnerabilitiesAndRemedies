import { useParams, Link } from "react-router-dom";
import { levelsInfo } from "../services/levelsData.ts";
import { ArrowLeft, Sword, Shield, AlertTriangle, Target, Zap } from 'lucide-react'
import { useState, useEffect } from "react";
import Layout from "../layouts/Layout.tsx";


function EnemyCard({ name, count }: { name: string; count: number }) {
  const getEnemyIcon = (enemyName: string) => {
    const lowercaseName = enemyName.toLowerCase();
    if (lowercaseName.includes('sql') || lowercaseName.includes('injection')) return '💉';
    if (lowercaseName.includes('xss') || lowercaseName.includes('script')) return '🚨';
    if (lowercaseName.includes('csrf') || lowercaseName.includes('forgery')) return '🎭';
    if (lowercaseName.includes('malware') || lowercaseName.includes('virus')) return '🦠';
    if (lowercaseName.includes('phishing')) return '🎣';
    if (lowercaseName.includes('ddos') || lowercaseName.includes('dos')) return '💥';
    if (lowercaseName.includes('brute')) return '🔨';
    return '⚠️';
  };

  return (
    <div className="bg-red-500/10 border border-pink-500/30 rounded-lg p-4 transition-all duration-300 hover:bg-red-500/20 hover:border-pink-500/60 hover:translate-x-1 hover:shadow-lg hover:shadow-pink-500/20 cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-125 transition-transform duration-300">
                        {getEnemyIcon(name)}
                    </span>
          <span className="font-semibold text-white group-hover:text-red-400 transition-colors">
                        {name}
                    </span>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-[2.5rem] text-center">
          {count}
        </div>
      </div>
    </div>
  );
}

// Difficulty indicator
function DifficultyIndicator({ level }: { level: number }) {
  const getDifficulty = (levelNum: number) => {
    if (levelNum <= 3) return { level: 'Beginner', colorClass: 'text-green-400', stars: 1 };
    if (levelNum <= 7) return { level: 'Intermediate', colorClass: 'text-yellow-400', stars: 2 };
    if (levelNum <= 12) return { level: 'Advanced', colorClass: 'text-pink-400', stars: 3 };
    return { level: 'Expert', colorClass: 'text-red-500', stars: 4 };
  };

  const difficulty = getDifficulty(level);

  return (
    <div className="inline-block p-4 bg-black/30 rounded-xl border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <Shield className={`w-5 h-5 ${difficulty.colorClass}`} />
        <span className={`font-semibold ${difficulty.colorClass}`}>
                    {difficulty.level}
                </span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < difficulty.stars
                ? difficulty.colorClass.replace('text-', 'bg-')
                : 'bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LevelHome() {
  const { levelId } = useParams();
  console.log(levelId);
  const levelData = levelsInfo.find((level) => level.number === Number(levelId));
  if (Number(levelId) == 10) {
    if (!levelData?.available) {
      location.pathname = "/game/quarantine";
    }
  }
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!levelData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="glass-container text-center max-w-md">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-red-400 mb-4">Level Not Found</h1>
          <p className="text-gray-300 mb-6">
            The requested level doesn't exist or hasn't been unlocked yet.
          </p>
          <Link
            to="/game/levels"
            className="home-button inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Levels
          </Link>
        </div>
      </div>
    );
  }

  const totalThreats = Object.values(levelData.enemies).reduce((sum, count) => sum + count, 0);

  return (
    <Layout showNav={true}>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className={`max-w-5xl w-full transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>

          <div className="text-center mb-8">
            <Target className="w-12 h-12 text-green-400 mx-auto mb-4 animate-pulse" />
            <h1
              className="text-6xl md:text-8xl font-black tracking-tight mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
              Level {levelData.number}
            </h1>
            <DifficultyIndicator level={levelData.number} />
          </div>

          <div className="glass-container mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-3">
                  <Zap className="w-6 h-6" />
                  Mission Brief
                </h2>
                <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                  {levelData.description.split("\n").map((line, i) => (
                    <p key={i} className="hover:text-white transition-colors duration-300">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="h-full">
                <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6" />
                  Threat Assessment
                </h2>

                {Object.keys(levelData.enemies).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(levelData.enemies).map(([enemy, count]) => (
                      <EnemyCard key={enemy} name={levelData.type} count={count} />
                    ))}

                    <div className="mt-6 p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
                      <p className="text-sm text-gray-300">
                        <span className="text-red-400 font-bold">Total Threats:</span> {totalThreats}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-lg text-center bg-green-500/10 border border-green-500/30">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <p className="text-green-400 font-semibold">No Active Threats</p>
                    <p className="text-sm text-gray-300 mt-1">This level focuses on learning fundamentals</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link
              to={`/game/level/${levelData.number}/combat`}
              className="level-fight-button text-xl flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 shadow-lg shadow-pink-500/40 hover:shadow-pink-500/60 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 min-w-[200px] justify-center"
            >
              <Sword className="w-6 h-6" />
              Enter Combat
            </Link>

            <Link
              to="/game/levels"
              className="home-button text-lg flex items-center gap-3 px-6 py-3 min-w-[150px] justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Levels
            </Link>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-block p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <p className="text-yellow-400 text-sm flex items-center gap-2 justify-center">
                <span>💡</span>
                <span><strong>Pro Tip:</strong> Study the threat assessment carefully before engaging!</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}