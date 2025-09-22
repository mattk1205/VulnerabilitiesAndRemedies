import "./App.css";
import StartMenu from "./pages/StartMenu.tsx";
import HowToPlay from "./pages/HowToPlay.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import LevelsMenu from "./pages/LevelsMenu.tsx";
import CreatePlayer from "./pages/CreatePlayer.tsx";
import LevelHome from "./pages/LevelHome.tsx";
import Combat from "./pages/Combat.tsx";
import Profile from "./pages/Profile.tsx";
import Quarantine from "./pages/Quarantine.tsx";
import InventoryPage from "./pages/InventoryPage.tsx";

const Content = () => {
  const location = useLocation();
  const isAnimatedPage =
    location.pathname === "/" ||
    location.pathname === "/game/levels" ||
    location.pathname === "/how-to-play";

  useEffect(() => {
    if (isAnimatedPage) {
      document.body.classList.add("animated-background");
    } else {
      document.body.classList.remove("animated-background");
    }
    return () => {
      document.body.classList.remove("animated-background");
    };
  }, [isAnimatedPage]);

  return (
      <Routes>
        <Route path={"/"} element={<StartMenu />} />
        <Route path={"/how-to-play"} element={<HowToPlay />} />
        <Route path={"/game/levels"} element={<LevelsMenu />} />
        <Route path={"/game/level/:levelId/home"} element={<LevelHome />} />
        <Route path={"/enter-name"} element={<CreatePlayer />} />
        <Route path={"/game/level/:levelId/combat"} element={<Combat />} />
        <Route path={"/game/quarantine"} element={<Quarantine />} />
        <Route path={"/profile"} element={<Profile />} />
        <Route path={"/inventory"} element={<InventoryPage />} />
      </Routes>
  );
};

function App() {
  return (
    <Router>
      <Content />
    </Router>
  );
}

export default App;
