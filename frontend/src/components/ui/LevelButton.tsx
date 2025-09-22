import { Link } from "react-router-dom";
import type { Level } from "../../services/types.ts";
import { useState } from "react";

function LevelTooltip({ level, show }: { level: Level; show: boolean }) {
  if (!show) return null;

  return (
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs rounded-lg pointer-events-none z-10"
         style={{
           background: 'rgba(0, 0, 0, 0.9)',
           border: '1px solid rgba(0, 255, 157, 0.3)',
           backdropFilter: 'blur(10px)',
           minWidth: '200px'
         }}>
      <div className="text-center">
        <div className="font-bold text-green-400 mb-1">Level {level.number}</div>
        <div className="text-gray-300 text-xs">{level.description}</div>
        {Object.keys(level.enemies).length > 0 && (
          <div className="mt-2 text-xs">
            <div className="text-yellow-400">Threats:</div>
            {Object.entries(level.enemies).map(([enemy, count]) => (
              <div key={enemy} className="text-gray-300">
                {enemy}: {count}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Arrow */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
    </div>
  );
}

export default function LevelButton(level: Level) {
  const [showTooltip, setShowTooltip] = useState(false);

  if (level.available) {
    return (
      <div className="relative">
        <Link
          to={`/game/level/${level.number}/home`}
          className="flex items-center justify-center h-20 w-20 rounded-xl border-2 text-2xl font-bold cursor-pointer transition-all duration-300 group relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0, 255, 157, 0.1), rgba(0, 149, 255, 0.1))',
            borderColor: 'rgba(0, 255, 157, 0.3)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <span className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                        {level.number}
                    </span>

          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style={{
                 boxShadow: '0 0 20px rgba(0, 255, 157, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
               }}>
          </div>
        </Link>

        <LevelTooltip level={level} show={showTooltip} />
      </div>
    );
  } else {
    return (
      <div className="relative">
        <div
          className="flex items-center justify-center h-20 w-20 rounded-xl border-2 text-2xl font-bold cursor-not-allowed relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.1), rgba(255, 0, 0, 0.1))',
            borderColor: 'rgba(255, 107, 157, 0.3)',
            color: '#ff6b9d',
            backdropFilter: 'blur(10px)',
            animation: 'pulse-glow 2s ease-in-out infinite',
            boxShadow: '0 4px 15px rgba(255, 107, 157, 0.2)'
          }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <span className="text-lg">🔒</span>
          </div>

          <span className="opacity-50">{level.number}</span>
        </div>

        <LevelTooltip
          level={{
            ...level,
            description: level.description + " (Complete previous levels to unlock)"
          }}
          show={showTooltip}
        />
      </div>
    );
  }
}