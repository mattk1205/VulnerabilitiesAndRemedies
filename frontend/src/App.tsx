import './App.css'
import StartMenu from "./components/StartMenu.tsx";
import HowToPlay from "./components/HowToPlay.tsx";
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {useEffect} from "react";
import LevelsMenu from "./components/LevelsMenu.tsx";
import NameInput from "./components/NameInput.tsx";
import LevelHome from "./components/LevelHome.tsx";

const Content = () => {
    const location = useLocation();
    const isAnimatedPage = (location.pathname === "/" || location.pathname === "/game/levels" || location.pathname === "/how-to-play");

    // controls the background
    useEffect(() => {
        if (isAnimatedPage) {
            document.body.classList.add('animated-background');
        } else {
            document.body.classList.remove('animated-background');
        }
        return () => {
            document.body.classList.remove('animated-background');
        };
    }, [isAnimatedPage]);

    return (
        <Routes>
            <Route path={"/"} element={<StartMenu/>}/>
            <Route path={"/how-to-play"} element={<HowToPlay/>}/>
            <Route path={"/game/levels"} element={<LevelsMenu/>}/>
            <Route path={"/game/level/:levelId"} element={<LevelHome />}/>
            <Route path={"/enter-name"} element={<NameInput/>}/>
        </Routes>
    )
}

function App() {
    return (
        <Router>
            <Content/>
        </Router>
    )
}

export default App
