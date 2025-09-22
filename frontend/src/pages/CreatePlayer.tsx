import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../layouts/Layout.tsx";
import NavButton from "../components/ui/NavButton.tsx";
import {
  createPlayer,
  getErrorMessage,
} from "../services/helperFunctions.ts";
import {Loader} from "lucide-react";


function WelcomeMessage({ name }: { name: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      </div>

      <div className="relative backdrop-blur-xl bg-slate-800/30 border border-emerald-400/20 rounded-2xl p-8 text-center max-w-2xl shadow-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-blue-500/20 rounded-2xl blur opacity-75 animate-pulse"></div>

        <div className="relative place-items-center ">
          <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
            Welcome, {name}! 🎉
          </h2>

          <p className="text-xl mb-8 text-slate-300">
            Ready to dive into the world of cybersecurity? Test your skills and
            learn to defend against digital threats!
          </p>

          <NavButton to={"/profile"} label={"🎮 PLAY GAME"}></NavButton>
        </div>
      </div>
    </div>
  );
}

export default function CreatePlayer() {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() == "") {
      setStatus("error");
      setError("Please enter a name.");
      return;
    }
    setStatus("loading");
    try {
      await createPlayer(name);
      setStatus("success");
      setError("");

    } catch (error) {
      setError(getErrorMessage(error));
      setStatus("error");

    }
  }

  if (status === "success") {
    return (
      <WelcomeMessage name={name}/>
    )
  }

  return (
    <Layout showNav={true} className="justify-items-center pt-20">
      <div className="glass-container w-[50%]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <h2
            className="text-3xl font-bold text-center mb-4"
            style={{
              color: "#00ff9d",
              textShadow: "0 0 10px rgba(0, 255, 157, 0.3)",
            }}
          >
            🔐 Create Player
          </h2>

          <p className="text-center text-gray-300 mb-4">
            Enter your username to begin your cybersecurity journey
          </p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your hacker alias..."
            className="w-full rounded-lg border-2 p-4 text-white transition-all duration-300"
            style={{
              background: "rgba(0, 0, 0, 0.3)",
              borderColor:
                status === "error"
                  ? "rgba(255, 107, 157, 0.5)"
                  : "rgba(0, 255, 157, 0.3)",
              backdropFilter: "blur(5px)",
            }}
            disabled={status === "loading"}
            required
            autoFocus
          />

          <button
            type="submit"
            className="level-fight-button w-full text-lg"
            disabled={status === "loading"}
            style={{
              background:
                status === "loading"
                  ? "rgba(0, 255, 157, 0.3)"
                  : "linear-gradient(135deg, #00ff9d, #0095ff)",
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {status === "loading" && <Loader/> }
            {status === "loading" ? "Creating Profile..." : "✨ Create Profile"}
          </button>

          <Link to="/" className="home-button text-center">
            ← Back to Main Menu
          </Link>

          {status === "error" && (
            <div
              className="text-center p-3 rounded-lg"
              style={{
                background: "rgba(255, 107, 157, 0.1)",
                border: "1px solid rgba(255, 107, 157, 0.3)",
                color: "#ff6b9d",
              }}
            >
              ❌ {error || "An error occurred"}
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}

