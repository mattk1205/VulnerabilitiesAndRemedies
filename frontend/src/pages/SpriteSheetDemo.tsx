import { useState, useEffect } from 'react';

// Basic Sprite Component
export function Sprite({
                  src,
                  scale,
                  frameWidth,
                  frameHeight,
                  frameCount,
                  fps = 10,
                  loop = true,
                  playing = true
                }) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => {
        const nextFrame = prev + 1;
        if (nextFrame >= frameCount) {
          return loop ? 0 : prev;
        }
        return nextFrame;
      });
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [frameCount, fps, loop, playing]);

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        width: `${frameWidth}px`,
        height: `${frameHeight}px`,
        backgroundImage: `url(${src})`,
        backgroundPosition: `-${currentFrame * frameWidth}px 0px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
      }}
    />
  );
}

// Advanced Sprite with Multiple Animations
function AnimatedCharacter({ animations, currentAnimation = 'idle', scale = 2 }) {
  const anim = animations[currentAnimation];

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
      <Sprite
        src={anim.src}
        frameWidth={anim.frameWidth}
        frameHeight={anim.frameHeight}
        frameCount={anim.frameCount}
        fps={anim.fps || 10}
        loop={anim.loop !== false}
      />
    </div>
  );
}

// Demo Component
export default function SpriteSheetDemo() {
  const [currentAnim, setCurrentAnim] = useState('idle');

  // Example character with multiple animations
  const hackerAnimations = {
    idle: {
      src: '/sprites/hacker.png',
      frameWidth: 33.5,
      frameHeight: 32,
      frameCount: 4,
      fps: 2
    },
    attack: {
      src: 'https://placehold.co/192x32/dc2626/white?text=Attack+Frames',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 6,
      fps: 12,
      loop: false
    },
    hurt: {
      src: 'https://placehold.co/96x32/f59e0b/white?text=Hurt',
      frameWidth: 32,
      frameHeight: 32,
      frameCount: 3,
      fps: 8
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Sprite Sheet Animation</h1>
          <p className="text-gray-400">Pixel-perfect character animations for your game</p>
        </div>

        {/* Main Demo */}
        <div className="bg-slate-800 rounded-lg p-8">
          <div className="flex items-center justify-center h-64 bg-slate-700 rounded mb-6">
            <AnimatedCharacter
              animations={hackerAnimations}
              currentAnimation={currentAnim}
              scale={4}
            />
          </div>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setCurrentAnim('idle')}
              className={`px-4 py-2 rounded font-semibold transition ${
                currentAnim === 'idle'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Idle
            </button>
            <button
              onClick={() => setCurrentAnim('attack')}
              className={`px-4 py-2 rounded font-semibold transition ${
                currentAnim === 'attack'
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Attack
            </button>
            <button
              onClick={() => setCurrentAnim('hurt')}
              className={`px-4 py-2 rounded font-semibold transition ${
                currentAnim === 'hurt'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Hurt
            </button>
          </div>
        </div>

        {/* Simple Examples */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <h3 className="text-sm font-bold mb-4 text-gray-300">SLOW (6 FPS)</h3>
            <div className="flex justify-center mb-2">
              <Sprite
                src="https://placehold.co/128x32/3b82f6/white?text=Slow"
                frameWidth={32}
                frameHeight={32}
                frameCount={4}
                fps={6}
              />
            </div>
            <p className="text-xs text-gray-500">Good for idle animations</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <h3 className="text-sm font-bold mb-4 text-gray-300">MEDIUM (12 FPS)</h3>
            <div className="flex justify-center mb-2">
              <Sprite
                src="https://placehold.co/128x32/10b981/white?text=Medium"
                frameWidth={32}
                frameHeight={32}
                frameCount={4}
                fps={12}
              />
            </div>
            <p className="text-xs text-gray-500">Good for walking/standard</p>
          </div>

          <div className="bg-slate-800 rounded-lg p-6 text-center">
            <h3 className="text-sm font-bold mb-4 text-gray-300">FAST (24 FPS)</h3>
            <div className="flex justify-center mb-2">
              <Sprite
                src="https://placehold.co/128x32/ef4444/white?text=Fast"
                frameWidth={32}
                frameHeight={32}
                frameCount={4}
                fps={24}
              />
            </div>
            <p className="text-xs text-gray-500">Good for attacks/effects</p>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">How to Use</h3>
          <div className="bg-slate-900 rounded p-4 text-sm font-mono overflow-x-auto">
            <pre className="text-green-400">{`<Sprite
  src="/sprites/hacker.png"
  frameWidth={32}
  frameHeight={32}
  frameCount={4}
  fps={10}
  loop={true}
/>`}</pre>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-3 text-blue-400">💡 Tips</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Keep frames at 32×32 or 64×64 for pixel art</li>
            <li>• Use horizontal sprite sheets (easier to manage)</li>
            <li>• 6-8 FPS for idle, 10-15 FPS for actions</li>
            <li>• Always add <code className="bg-slate-700 px-2 py-1 rounded">imageRendering: 'pixelated'</code></li>
            <li>• Name files: character-action.png (e.g., hacker-attack.png)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}