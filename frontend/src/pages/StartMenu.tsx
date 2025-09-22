import { Link } from 'react-router-dom';
import "../index.css";
import Layout from "../layouts/Layout.tsx";
import { getErrorMessage, getProfile } from "../services/helperFunctions.ts";
import React, { useEffect } from "react";



export default function StartMenu() {
  const [loaded, setLoaded] = React.useState(false);
  useEffect(() => {
    (async () => {
      try {
        const prof = await getProfile({ startMenu : true });
        if (prof && prof.player?.id) {
          setLoaded(true);
        }
      }
      catch (e) {
        getErrorMessage(e);
      }
    })();
  }, []);

  return (
    <Layout showNav={false}>
      <div className="menu-container">
        <h1 className="mb-10">Vulnerabilities & Remedies</h1>
        <div className="glass-container">
          <div className="menu-buttons">

            {loaded ? (
              <Link className="menu-button" to={"/profile"}>
                💾 Load Game
              </Link>
            ) :
              (
                <Link className="menu-button" to={"/enter-name"}>
                  🚀 Start Game
                </Link>
              )}
            <Link className="menu-button" to={"/how-to-play"}>
              📚 How to Play
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}