import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../layouts/Layout';
import { useTypewriter } from "../hooks/useTypeWriter.ts";

const QUARANTINE_MESSAGES = [
  "Malicious activity detected...",
  "System integrity compromised. Bypasses ineffective.",
  "Initiating quarantine protocol.",
  "Your access has been temporarily revoked.",
  "Think about what you've done."
];

export default function Quarantine() {
  const [countdown, setCountdown] = useState(18);
  const [messageIndex, setMessageIndex] = useState(0);
  const typedMessage = useTypewriter(QUARANTINE_MESSAGES[messageIndex]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex(prevIndex => (prevIndex + 1) % QUARANTINE_MESSAGES.length);
    }, 4000);

    return () => clearInterval(messageTimer);
  }, []);

  const isButtonDisabled = countdown > 0;

  return (
    <Layout showNav={false}>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="glass-container w-full max-w-2xl text-center !border-red-500/50">

          <svg className="mx-auto mb-4 h-16 w-16 animate-pulse text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>

          <h1 className="mb-2 text-4xl font-bold text-red-500 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
            ACCESS DENIED
          </h1>
          <p className="font-mono text-lg text-slate-300">Quarantine Protocol P-1337 Initiated</p>

          <div className="my-8 h-15 rounded-md bg-black/30 pt-3.5 px-3 text-left">
            <span className="font-mono text-emerald-400">
              &gt; {typedMessage}
              <span className="animate-ping">_</span>
            </span>
          </div>

          <Link to="/"
                className={`
              mt-4 inline-block rounded-xl px-8 py-4 font-bold text-white transition-all
              ${isButtonDisabled ? 'cursor-not-allowed bg-slate-700 opacity-50' : 'bg-red-600 hover:bg-red-500'}
            `}
                style={{ pointerEvents: isButtonDisabled ? 'none' : 'auto' }}
          >
            {isButtonDisabled ? `Returning to Safety in ${countdown}...` : 'I Understand'}
          </Link>

        </div>
      </div>
    </Layout>
  );
}