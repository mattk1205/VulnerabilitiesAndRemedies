import { Link } from "react-router-dom";

export default function HowToPlay() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="glass-container max-w-4xl w-full">
        <h1 className="text-center mb-8" style={{
          color: '#00ff9d',
          textShadow: '0 0 20px rgba(0, 255, 157, 0.3)',
          fontSize: '3rem'
        }}>
          📖 How to Play
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg leading-relaxed">
          <div className="space-y-6">
            <div className="p-6 rounded-xl" style={{
              background: 'rgba(0, 255, 157, 0.05)',
              border: '1px solid rgba(0, 255, 157, 0.2)'
            }}>
              <h2 className="text-2xl font-bold text-green-400 mb-3 flex items-center">
                🎯 Objective
              </h2>
              <p className="text-gray-300">
                Master the art of cybersecurity by identifying vulnerabilities and applying the correct remedies.
                Each level presents unique security challenges that mirror real-world threats.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{
              background: 'rgba(0, 149, 255, 0.05)',
              border: '1px solid rgba(0, 149, 255, 0.2)'
            }}>
              <h2 className="text-2xl font-bold text-blue-400 mb-3 flex items-center">
                🔍 Gameplay
              </h2>
              <p className="text-gray-300">
                Navigate through different levels, each focusing on specific types of vulnerabilities.
                Analyze systems, identify weaknesses, and implement security measures to defend against attacks.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-xl" style={{
              background: 'rgba(255, 107, 157, 0.05)',
              border: '1px solid rgba(255, 107, 157, 0.2)'
            }}>
              <h2 className="text-2xl font-bold text-pink-400 mb-3 flex items-center">
                📈 Progression
              </h2>
              <p className="text-gray-300">
                Complete levels sequentially to unlock new challenges. Each level becomes progressively more
                complex, introducing advanced threat scenarios and sophisticated defense strategies.
              </p>
            </div>

            <div className="p-6 rounded-xl" style={{
              background: 'rgba(255, 193, 7, 0.05)',
              border: '1px solid rgba(255, 193, 7, 0.2)'
            }}>
              <h2 className="text-2xl font-bold text-yellow-400 mb-3 flex items-center">
                💡 Learning
              </h2>
              <p className="text-gray-300">
                Gain hands-on experience with common vulnerabilities like SQL injection, XSS, CSRF,
                and many others. Learn industry-standard remediation techniques and best practices.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-xl text-center" style={{
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <h3 className="text-xl font-bold text-white mb-3">🚀 Ready to Start?</h3>
          <p className="text-gray-300 mb-4">
            Create your player profile and begin your journey into the world of cybersecurity!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/enter-name"
              className="level-fight-button text-lg px-8 py-3"
              style={{
                background: 'linear-gradient(135deg, #00ff9d, #0095ff)',
                textDecoration: 'none'
              }}
            >
              🎮 Start Playing
            </Link>

            <Link
              to="/"
              className="home-button text-lg px-6 py-3"
            >
              ← Back to Main Menu
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <span>🔒</span>
              <span>Security Focused</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>🎓</span>
              <span>Educational</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>Interactive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}